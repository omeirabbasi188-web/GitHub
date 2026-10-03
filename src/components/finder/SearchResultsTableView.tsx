import React, { useState, useMemo } from 'react';
import { useSeo } from '../../context/SeoContext';
import { DiscoveredWebsite, GuestPostStatus, OpportunityStage } from '../../types/seo';
import {
  calculateOpportunityScore,
  formatCompactNumber,
  formatCurrency
} from '../../utils/seoCalculations';
import {
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  Eye,
  BarChart3,
  Bookmark,
  Send,
  Download,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

type SortField =
  | 'name'
  | 'as'
  | 'dr'
  | 'da'
  | 'organicTraffic'
  | 'referringDomains'
  | 'backlinks'
  | 'spamScore'
  | 'publisherPrice'
  | 'opportunityScore';

export const SearchResultsTableView: React.FC = () => {
  const {
    websites,
    setDetailModalSite,
    setSelectedWebsiteId,
    setActiveTab,
    setOutreachModalSite,
    saveWebsiteToStage,
    toggleCompare,
    isInCompare,
    addToast
  } = useSeo();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedLinkType, setSelectedLinkType] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('as');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Extract unique niches
  const niches = useMemo(() => {
    const list = Array.from(new Set(websites.map((s) => s.niche))).filter(Boolean);
    return ['All', ...list];
  }, [websites]);

  // Sorting helper
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Filter and sort
  const filteredAndSortedWebsites = useMemo(() => {
    return websites
      .filter((site) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = site.name.toLowerCase().includes(q);
          const matchUrl = site.url.toLowerCase().includes(q);
          const matchContact = (site.contactPerson || site.guestPostInfo?.contactPerson || '')
            .toLowerCase()
            .includes(q);
          if (!matchName && !matchUrl && !matchContact) return false;
        }

        if (selectedNiche !== 'All' && site.niche !== selectedNiche) {
          return false;
        }

        if (selectedStatus !== 'All' && site.guestPostStatus !== selectedStatus) {
          return false;
        }

        if (selectedLinkType !== 'All') {
          const linkType = site.guestPostInfo?.linkType || 'Dofollow';
          if (linkType !== selectedLinkType) return false;
        }

        return true;
      })
      .sort((a, b) => {
        let valA: number | string = 0;
        let valB: number | string = 0;

        switch (sortField) {
          case 'name':
            valA = a.name.toLowerCase();
            valB = b.name.toLowerCase();
            return sortOrder === 'asc'
              ? (valA as string).localeCompare(valB as string)
              : (valB as string).localeCompare(valA as string);
          case 'as':
            valA = a.as ?? 0;
            valB = b.as ?? 0;
            break;
          case 'dr':
            valA = a.dr ?? 0;
            valB = b.dr ?? 0;
            break;
          case 'da':
            valA = a.da ?? 0;
            valB = b.da ?? 0;
            break;
          case 'organicTraffic':
            valA = a.organicTraffic ?? 0;
            valB = b.organicTraffic ?? 0;
            break;
          case 'referringDomains':
            valA = a.referringDomains ?? 0;
            valB = b.referringDomains ?? 0;
            break;
          case 'backlinks':
            valA = a.backlinks ?? 0;
            valB = b.backlinks ?? 0;
            break;
          case 'spamScore':
            valA = a.spamScore ?? 0;
            valB = b.spamScore ?? 0;
            break;
          case 'publisherPrice':
            valA = a.publisherPrice ?? a.guestPostInfo?.publisherPrice ?? 0;
            valB = b.publisherPrice ?? b.guestPostInfo?.publisherPrice ?? 0;
            break;
          case 'opportunityScore':
            valA = calculateOpportunityScore(a).totalScore;
            valB = calculateOpportunityScore(b).totalScore;
            break;
        }

        return sortOrder === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
  }, [websites, searchQuery, selectedNiche, selectedStatus, selectedLinkType, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedWebsites.length / itemsPerPage) || 1;
  const paginatedWebsites = filteredAndSortedWebsites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Authority badge helper
  const getAuthorityBadge = (da: number | null, dr: number | null, as: number | null) => {
    const avg = ((da || 30) + (dr || 30) + (as || 30)) / 3;
    if (avg >= 60) {
      return (
        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded whitespace-nowrap">
          High Authority
        </span>
      );
    }
    if (avg >= 40) {
      return (
        <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-1.5 py-0.5 rounded whitespace-nowrap">
          Medium Authority
        </span>
      );
    }
    return (
      <span className="text-[10px] font-semibold text-slate-400 bg-slate-800/60 border border-slate-700/50 px-1.5 py-0.5 rounded whitespace-nowrap">
        Low Authority
      </span>
    );
  };

  // Guest Post status badge helper
  const getGuestPostBadge = (site: DiscoveredWebsite) => {
    const status = site.guestPostStatus;
    const isSponsored = site.guestPostInfo?.sponsored === 'Sponsored';
    const price = site.publisherPrice ?? site.guestPostInfo?.publisherPrice ?? 0;

    let text = 'Guest Post Available';
    let colorClass = 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30';

    if (status === 'Confirmed') {
      if (price > 0 || isSponsored) {
        text = 'Paid / Sponsored';
        colorClass = 'text-amber-300 bg-amber-950/60 border-amber-500/30';
      } else {
        text = 'Free / Editorial';
        colorClass = 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30';
      }
    } else if (status === 'Likely') {
      text = 'Likely Contributor';
      colorClass = 'text-cyan-300 bg-cyan-950/60 border-cyan-500/30';
    } else if (status === 'Unclear') {
      text = 'Possible / Unclear';
      colorClass = 'text-slate-400 bg-slate-800 border-slate-700';
    } else {
      text = 'Not Found';
      colorClass = 'text-slate-500 bg-slate-900 border-slate-800';
    }

    return (
      <span className={`text-[10px] font-medium border px-1.5 py-0.5 rounded whitespace-nowrap ${colorClass}`}>
        {text}
      </span>
    );
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'Website',
      'Niche',
      'Authority Score (Semrush)',
      'Domain Rating (Ahrefs)',
      'Domain Authority (Moz)',
      'Organic Traffic',
      'Referring Domains',
      'Backlinks',
      'Spam Score',
      'Guest Post Status',
      'Link Type',
      'Publisher Price',
      'Contact Person',
      'Contact Email',
      'Guest Post URL',
      'Stage'
    ];

    const rows = filteredAndSortedWebsites.map((s) => [
      `"${s.name}"`,
      `"${s.niche}"`,
      s.as ?? 'N/A',
      s.dr ?? 'N/A',
      s.da ?? 'N/A',
      s.organicTraffic ?? 'N/A',
      s.referringDomains ?? 'N/A',
      s.backlinks ?? 'N/A',
      s.spamScore !== null ? `${s.spamScore}%` : 'N/A',
      s.guestPostStatus,
      s.guestPostInfo?.linkType || 'Dofollow',
      s.publisherPrice ?? s.guestPostInfo?.publisherPrice ?? 0,
      `"${(s.contactPerson || s.guestPostInfo?.contactPerson || '').replace(/"/g, '""')}"`,
      `"${s.contactEmail || s.guestPostInfo?.contactEmail || ''}"`,
      `"${s.guestPostInfo?.guestPostUrl || s.guestPostSourceUrl || ''}"`,
      s.opportunityStage
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `rankpulse-search-results-${new Date().toISOString().substring(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      title: 'CSV Export Generated',
      description: `Exported ${filteredAndSortedWebsites.length} website rows with full provider metrics.`
    });
  };

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Search Results Master Table</span>
            <span className="font-mono text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              {filteredAndSortedWebsites.length} Verified Domains
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Sortable 16-column matrix detailing multi-provider SEO signals, guest post evidence, link types, and publisher contacts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setActiveTab('finder')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>New Search</span>
          </button>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Quick search input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search domain, title, or editor..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Niche selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">Niche:</span>
            <select
              value={selectedNiche}
              onChange={(e) => {
                setSelectedNiche(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              {niches.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Status selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="All">All Guest Post Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Likely">Likely</option>
              <option value="Unclear">Unclear</option>
              <option value="Not Found">Not Found</option>
            </select>
          </div>

          {/* Link Type */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">Link:</span>
            <select
              value={selectedLinkType}
              onChange={(e) => {
                setSelectedLinkType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="All">All Link Types</option>
              <option value="Dofollow">Dofollow Only</option>
              <option value="Nofollow">Nofollow</option>
              <option value="Mixed">Mixed / Editorial</option>
            </select>
          </div>
        </div>
      </div>

      {/* Master 16-Column Table */}
      <div className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-950/95 border-b border-slate-800 text-[11px] text-slate-400 font-semibold tracking-wider">
              <tr>
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-4 cursor-pointer hover:text-white sticky left-0 bg-slate-950 z-10"
                >
                  <div className="flex items-center gap-1">
                    <span>1. Website</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3 px-3">2. Niche</th>
                <th
                  onClick={() => handleSort('as')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-white"
                  title="Authority Score (Semrush)"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>3. AS</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('dr')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-white"
                  title="Domain Rating (Ahrefs)"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>4. DR</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('da')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-white"
                  title="Domain Authority (Moz)"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>5. DA</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('organicTraffic')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-white"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>6. Traffic</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('referringDomains')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-white"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>7. Ref. Dom</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right">8. Backlinks</th>
                <th
                  onClick={() => handleSort('spamScore')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-white"
                  title="Spam Score (Moz)"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>9. Spam</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3 px-3">10. Guest Post Status</th>
                <th className="py-3 px-3">11. Link Type</th>
                <th
                  onClick={() => handleSort('publisherPrice')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-white"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>12. Price</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                <th className="py-3 px-3">13. Contact</th>
                <th className="py-3 px-3">14. Guidelines URL</th>
                <th className="py-3 px-3">15. Stage</th>
                <th className="py-3 px-4 text-center sticky right-0 bg-slate-950 z-10">
                  16. Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-300">
              {paginatedWebsites.length === 0 ? (
                <tr>
                  <td colSpan={16} className="py-12 text-center text-slate-400">
                    <div className="max-w-md mx-auto space-y-2">
                      <HelpCircle className="w-8 h-8 text-slate-600 mx-auto" />
                      <div className="text-sm font-semibold text-slate-300">
                        No websites match current search criteria.
                      </div>
                      <p className="text-xs text-slate-500">
                        Try resetting filters or search for another niche like AI, SaaS, or Technology.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedWebsites.map((site) => {
                  const score = calculateOpportunityScore(site);
                  const isCompared = isInCompare(site.id);
                  const pubPrice = site.publisherPrice ?? site.guestPostInfo?.publisherPrice ?? 0;
                  const contactName =
                    site.contactPerson || site.guestPostInfo?.contactPerson || 'Editorial Team';
                  const contactEmail =
                    site.contactEmail || site.guestPostInfo?.contactEmail || `editor@${site.url}`;
                  const guidelinesUrl =
                    site.guestPostInfo?.guestPostUrl || site.guestPostSourceUrl || site.writeForUsPage;

                  return (
                    <tr
                      key={site.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* 1. Website */}
                      <td className="py-3 px-4 font-semibold text-white sticky left-0 bg-slate-900 group-hover:bg-slate-800/90 transition-colors z-10">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleCompare(site.id)}
                            className={`p-1 rounded text-[10px] font-mono transition-colors ${
                              isCompared
                                ? 'text-emerald-400 bg-emerald-950 border border-emerald-500/40'
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                            title="Compare website"
                          >
                            {isCompared ? '✓' : '+'}
                          </button>
                          <div>
                            <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                              <span>{site.name}</span>
                              <a
                                href={`https://${site.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 hover:text-emerald-400 transition-colors"
                              >
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
                              <span>{site.url}</span>
                              <span>·</span>
                              <span>{site.country}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Niche */}
                      <td className="py-3 px-3">
                        <span className="text-slate-300">{site.niche}</span>
                      </td>

                      {/* 3. AS (Semrush) */}
                      <td className="py-3 px-3 text-right font-mono font-bold text-cyan-400 tabular-nums">
                        {site.as !== null ? site.as : <span className="text-slate-500">N/A</span>}
                      </td>

                      {/* 4. DR (Ahrefs) */}
                      <td className="py-3 px-3 text-right font-mono font-bold text-indigo-400 tabular-nums">
                        {site.dr !== null ? site.dr : <span className="text-slate-500">N/A</span>}
                      </td>

                      {/* 5. DA (Moz) */}
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400 tabular-nums">
                        {site.da !== null ? site.da : <span className="text-slate-500">N/A</span>}
                      </td>

                      {/* 6. Traffic */}
                      <td className="py-3 px-3 text-right font-mono text-slate-200 tabular-nums">
                        {formatCompactNumber(site.organicTraffic)}
                      </td>

                      {/* 7. Ref. Domains */}
                      <td className="py-3 px-3 text-right font-mono text-slate-300 tabular-nums">
                        {formatCompactNumber(site.referringDomains)}
                      </td>

                      {/* 8. Backlinks */}
                      <td className="py-3 px-3 text-right font-mono text-slate-400 tabular-nums">
                        {formatCompactNumber(site.backlinks)}
                      </td>

                      {/* 9. Spam Score */}
                      <td className="py-3 px-3 text-right font-mono tabular-nums">
                        <span
                          className={
                            (site.spamScore ?? 0) <= 2
                              ? 'text-emerald-400'
                              : (site.spamScore ?? 0) <= 5
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }
                        >
                          {site.spamScore !== null ? `${site.spamScore}%` : 'N/A'}
                        </span>
                      </td>

                      {/* 10. Guest Post Status */}
                      <td className="py-3 px-3">
                        <div className="flex flex-col gap-1">
                          {getGuestPostBadge(site)}
                          {getAuthorityBadge(site.da, site.dr, site.as)}
                        </div>
                      </td>

                      {/* 11. Link Type */}
                      <td className="py-3 px-3">
                        <span className="text-[11px] font-medium text-slate-300">
                          {site.guestPostInfo?.linkType || 'Dofollow'}
                        </span>
                        {site.guestPostInfo?.contextualLink && (
                          <span className="block text-[9px] text-emerald-400">Contextual</span>
                        )}
                      </td>

                      {/* 12. Price */}
                      <td className="py-3 px-3 text-right font-mono tabular-nums">
                        <span className={pubPrice === 0 ? 'text-emerald-400 font-semibold' : 'text-slate-200'}>
                          {formatCurrency(pubPrice)}
                        </span>
                      </td>

                      {/* 13. Contact */}
                      <td className="py-3 px-3">
                        <div className="text-slate-200 font-medium">{contactName}</div>
                        <div className="text-[10px] text-slate-400 font-mono truncate max-w-[130px]">
                          {contactEmail}
                        </div>
                      </td>

                      {/* 14. Guidelines URL */}
                      <td className="py-3 px-3">
                        {guidelinesUrl ? (
                          <a
                            href={guidelinesUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px]"
                          >
                            <span>Guidelines</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="text-slate-500 text-[11px]">Unlisted</span>
                        )}
                      </td>

                      {/* 15. Status */}
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded">
                          {site.opportunityStage}
                        </span>
                      </td>

                      {/* 16. Actions */}
                      <td className="py-3 px-4 text-center sticky right-0 bg-slate-900 group-hover:bg-slate-800/90 transition-colors z-10">
                        <div className="flex items-center justify-center gap-1">
                          {/* View */}
                          <button
                            onClick={() => setDetailModalSite(site)}
                            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
                            title="View Full Domain Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Analyze */}
                          <button
                            onClick={() => {
                              setSelectedWebsiteId(site.id);
                              setActiveTab('analysis');
                            }}
                            className="p-1.5 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/60 rounded transition-colors"
                            title="Run 12-Factor SEO Analysis"
                          >
                            <BarChart3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Save */}
                          <button
                            onClick={() => saveWebsiteToStage(site.id, 'Qualified')}
                            className="p-1.5 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/60 rounded transition-colors"
                            title="Save to Qualified Opportunities"
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                          </button>

                          {/* Contact */}
                          <button
                            onClick={() => setOutreachModalSite(site)}
                            className="p-1.5 text-amber-400 hover:text-amber-300 hover:bg-amber-950/60 rounded transition-colors"
                            title="Generate Outreach Pitch"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, filteredAndSortedWebsites.length)} of{' '}
            {filteredAndSortedWebsites.length} sites
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 text-white"
            >
              Previous
            </button>
            <span className="font-mono text-slate-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
