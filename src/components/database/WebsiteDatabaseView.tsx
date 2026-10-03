import React, { useState, useMemo } from 'react';
import { useSeo } from '../../context/SeoContext';
import { Website } from '../../types/seo';
import {
  calculateOpportunityScore,
  formatCompactNumber,
  formatCurrency
} from '../../utils/seoCalculations';
import {
  Search,
  Download,
  Plus,
  ExternalLink,
  ArrowUpDown,
  Trash2,
  Send,
  Eye,
  Settings2,
  Edit3,
  LayoutGrid,
  List,
  Scale
} from 'lucide-react';

export const WebsiteDatabaseView: React.FC = () => {
  const {
    websites,
    deleteWebsite,
    setSelectedWebsiteId,
    setActiveTab,
    setDetailModalSite,
    setEditModalSite,
    setOutreachModalSite,
    toggleCompare,
    isInCompare,
    setIsAddModalOpen
  } = useSeo();

  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<keyof Website>('da');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showColumnPicker, setShowColumnPicker] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Column visibility state for table mode
  const [visibleColumns, setVisibleColumns] = useState({
    da: true,
    dr: true,
    as: true,
    tf: true,
    cf: true,
    traffic: true,
    topCountry: true,
    refDomains: true,
    backlinks: false,
    spam: true,
    age: true,
    indexedPages: false,
    dofollow: true,
    contextual: true,
    sponsored: true,
    publisherPrice: true,
    clientPrice: true,
    profit: true,
    contact: true
  });

  const handleSort = (field: keyof Website) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedWebsites = useMemo(() => {
    return websites
      .filter((s) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.url.toLowerCase().includes(q) ||
          s.niche.toLowerCase().includes(q) ||
          s.country.toLowerCase().includes(q) ||
          ((s.contactPerson || s.guestPostInfo?.contactPerson)?.toLowerCase().includes(q) ?? false) ||
          ((s.contactEmail || s.guestPostInfo?.contactEmail)?.toLowerCase().includes(q) ?? false)
        );
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortOrder === 'asc' ? valA - valB : valB - valA;
        }
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortOrder === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        return 0;
      });
  }, [websites, search, sortField, sortOrder]);

  const exportCsv = () => {
    const headers = [
      'Website Name',
      'URL',
      'Niche',
      'Country',
      'Moz DA',
      'Ahrefs DR',
      'Semrush AS',
      'Majestic TF',
      'Majestic CF',
      'Organic Traffic',
      'Referring Domains',
      'Total Backlinks',
      'Dofollow Links',
      'Nofollow Links',
      'Spam Score (%)',
      'Domain Age (Years)',
      'Indexed Pages',
      'Guest Post Available',
      'Contextual Link',
      'Author Bio Link',
      'Sponsored Tag',
      'Publisher Price ($)',
      'Client Price ($)',
      'Profit ($)',
      'Contact Person',
      'Contact Email',
      'Contact Page',
      'Write for Us Page',
      'Turnaround Time',
      'Word Count'
    ];

    const rows = filteredAndSortedWebsites.map((s) => [
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.url}"`,
      `"${s.niche}"`,
      `"${s.country}"`,
      s.da,
      s.dr,
      s.as,
      s.tf,
      s.cf,
      s.organicTraffic,
      s.referringDomains,
      s.backlinks,
      s.dofollowLinks,
      s.nofollowLinks,
      s.spamScore,
      s.domainAgeYears,
      s.indexedPages,
      s.guestPostAvailable ? 'Yes' : 'No',
      s.contextualLink ? 'Yes' : 'No',
      s.authorBioLink ? 'Yes' : 'No',
      `"${s.sponsoredTag}"`,
      s.publisherPrice ?? s.guestPostInfo?.publisherPrice ?? 0,
      s.clientPrice ?? s.guestPostInfo?.clientPrice ?? 0,
      (s.clientPrice ?? s.guestPostInfo?.clientPrice ?? 0) -
        (s.publisherPrice ?? s.guestPostInfo?.publisherPrice ?? 0),
      `"${(s.contactPerson || s.guestPostInfo?.contactPerson || '').replace(/"/g, '""')}"`,
      `"${s.contactEmail || s.guestPostInfo?.contactEmail || ''}"`,
      `"${s.contactPage || s.guestPostInfo?.contactPage || ''}"`,
      `"${s.writeForUsPage || s.guestPostInfo?.guestPostUrl || ''}"`,
      `"${s.turnaroundTime || s.guestPostInfo?.turnaroundTime || ''}"`,
      `"${s.wordCount || s.guestPostInfo?.minWordCount || ''}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `seo-websites-database-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            SEO Target Websites Master Database
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete database with 28+ metrics per website: authority metrics, organic traffic, referring links, spam scores, and publisher contacts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle: Cards vs Table */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'table' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Table View"
              aria-label="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'cards' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Mobile Cards View"
              aria-label="Mobile Cards View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {viewMode === 'table' && (
            <button
              onClick={() => setShowColumnPicker(!showColumnPicker)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Customize Columns</span>
            </button>
          )}

          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Website</span>
          </button>
        </div>
      </div>

      {/* Column picker popover */}
      {showColumnPicker && viewMode === 'table' && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="font-semibold text-white mb-2">Toggle Visible Columns:</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {Object.entries(visibleColumns).map(([key, isVis]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isVis}
                  onChange={(e) =>
                    setVisibleColumns((prev) => ({
                      ...prev,
                      [key]: e.target.checked
                    }))
                  }
                  className="rounded bg-slate-800 border-slate-700 text-emerald-400 focus:ring-0"
                />
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Search & Counter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search domain, contact, niche, country..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900/90 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="text-xs text-slate-400 flex items-center justify-between w-full sm:w-auto gap-3">
          <div>
            Showing <span className="font-mono text-white font-semibold">{filteredAndSortedWebsites.length}</span> of {websites.length} records
          </div>
          {/* Quick toggle indicator */}
          <span className="text-[11px] text-slate-500">
            {viewMode === 'cards' ? 'Card Deck Mode' : 'Table Mode (Scrollable)'}
          </span>
        </div>
      </div>

      {/* VIEW MODE 1: MOBILE-FRIENDLY CARD DECK */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedWebsites.map((site) => {
            const scoreData = calculateOpportunityScore(site);
            const pubPrice = site.guestPostInfo?.publisherPrice ?? site.publisherPrice ?? 100;
            const clPrice = site.guestPostInfo?.clientPrice ?? site.clientPrice ?? 200;
            const profit = clPrice - pubPrice;

            return (
              <div
                key={site.id}
                className="rounded-xl bg-slate-900/90 border border-slate-800 p-4 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  {/* Top: Name, URL, Opportunity Score */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-sm text-white truncate">{site.name}</h3>
                        <a
                          href={`https://${site.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white shrink-0"
                          title="Open website"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">{site.url}</div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 block font-mono">Score</span>
                      <span className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
                        {scoreData.totalScore}/100
                      </span>
                    </div>
                  </div>

                  {/* Metadata line */}
                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-400">
                    <span className="text-slate-300">{site.niche}</span>
                    <span aria-hidden="true">·</span>
                    <span>{site.country}</span>
                    <span aria-hidden="true">·</span>
                    <span>{site.domainAgeYears} yrs age</span>
                    <span aria-hidden="true">·</span>
                    <span>{(site.indexedPages ?? 0).toLocaleString()} pages</span>
                  </div>

                  {/* 5 Authority Metrics */}
                  <div className="mt-3 grid grid-cols-5 gap-1 py-1.5 px-2 rounded-lg bg-slate-950/70 border border-slate-800 text-center text-xs font-mono">
                    <div>
                      <div className="text-[9px] text-slate-400 font-sans">DA</div>
                      <div className="font-bold text-slate-200">{site.da}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 font-sans">DR</div>
                      <div className="font-bold text-slate-200">{site.dr}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 font-sans">AS</div>
                      <div className="font-bold text-slate-200">{site.as}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 font-sans">TF</div>
                      <div className="font-bold text-slate-200">{site.tf}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 font-sans">CF</div>
                      <div className="font-bold text-slate-400">{site.cf}</div>
                    </div>
                  </div>

                  {/* Traffic, Ref Domains, Backlinks, Spam */}
                  <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Organic Traffic:</span>
                      <span className="font-mono text-white font-medium">
                        {formatCompactNumber(site.organicTraffic)}/mo ({site.trafficCountries[0]?.country || 'US'})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Ref Domains / Backlinks:</span>
                      <span className="font-mono text-slate-300">
                        {(site.referringDomains ?? 0).toLocaleString()} / {formatCompactNumber(site.backlinks)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Dofollow Ratio & Link:</span>
                      <span className="font-mono text-emerald-400">
                        {Math.round(((site.dofollowLinks ?? 0) / (site.backlinks || 1)) * 100)}% ({site.contextualLink ? 'Contextual' : 'Bio'})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Moz Spam Score:</span>
                      <span className={`font-mono font-semibold ${(site.spamScore ?? 0) <= 2 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {site.spamScore ?? 0}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                      <span className="text-slate-400">Pub Cost / Client Price:</span>
                      <div className="font-mono text-right">
                        <span className="text-slate-300">${pubPrice}</span>
                        <span className="text-slate-500 mx-1">→</span>
                        <span className="text-white font-semibold">${clPrice}</span>
                        <span className="text-emerald-400 font-bold ml-1.5">(+${profit})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                      <span className="truncate">Contact: {site.contactPerson}</span>
                      <a
                        href={site.writeForUsPage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-0.5 shrink-0"
                      >
                        <span>Write For Us</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-1.5">
                  <button
                    onClick={() => {
                      setSelectedWebsiteId(site.id);
                      setActiveTab('analysis');
                    }}
                    className="flex-1 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors text-center"
                  >
                    Audit
                  </button>
                  <button
                    onClick={() => setDetailModalSite(site)}
                    className="flex-1 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 rounded-md transition-colors text-center"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setEditModalSite(site)}
                    className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-md transition-colors"
                    title="Edit metrics"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toggleCompare(site.id)}
                    className={`px-2 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                      isInCompare(site.id)
                        ? 'bg-cyan-950 border-cyan-500/50 text-cyan-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                    title={isInCompare(site.id) ? 'Remove compare' : 'Add to compare'}
                  >
                    <Scale className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setOutreachModalSite(site)}
                    className="px-2.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors"
                    title="Pitch"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 2: MASTER DATA TABLE */}
      {viewMode === 'table' && (
        <div className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-950/90 border-b border-slate-800 text-[11px] text-slate-400 font-medium">
              <tr>
                <th className="py-3 px-4 sticky left-0 z-10 bg-slate-950/95">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    <span>Website & URL</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3 px-3">
                  <button
                    onClick={() => handleSort('niche')}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    <span>Niche</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="py-3 px-2">Country</th>

                {visibleColumns.da && (
                  <th className="py-3 px-2 text-right">
                    <button
                      onClick={() => handleSort('da')}
                      className="flex items-center gap-1 ml-auto hover:text-white"
                      title="Moz Domain Authority"
                    >
                      <span>DA</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                )}

                {visibleColumns.dr && (
                  <th className="py-3 px-2 text-right">
                    <button
                      onClick={() => handleSort('dr')}
                      className="flex items-center gap-1 ml-auto hover:text-white"
                      title="Ahrefs Domain Rating"
                    >
                      <span>DR</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                )}

                {visibleColumns.as && (
                  <th className="py-3 px-2 text-right">
                    <button
                      onClick={() => handleSort('as')}
                      className="flex items-center gap-1 ml-auto hover:text-white"
                      title="Semrush Authority Score"
                    >
                      <span>AS</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                )}

                {visibleColumns.tf && (
                  <th className="py-3 px-2 text-right">
                    <button
                      onClick={() => handleSort('tf')}
                      className="flex items-center gap-1 ml-auto hover:text-white"
                      title="Majestic Trust Flow"
                    >
                      <span>TF</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                )}

                {visibleColumns.cf && (
                  <th className="py-3 px-2 text-right">
                    <button
                      onClick={() => handleSort('cf')}
                      className="flex items-center gap-1 ml-auto hover:text-white"
                      title="Majestic Citation Flow"
                    >
                      <span>CF</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                )}

                {visibleColumns.traffic && (
                  <th className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleSort('organicTraffic')}
                      className="flex items-center gap-1 ml-auto hover:text-white"
                    >
                      <span>Traffic</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                )}

                {visibleColumns.topCountry && (
                  <th className="py-3 px-2 text-right">Top Geo</th>
                )}

                {visibleColumns.refDomains && (
                  <th className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleSort('referringDomains')}
                      className="flex items-center gap-1 ml-auto hover:text-white"
                    >
                      <span>Ref Domains</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                )}

                {visibleColumns.backlinks && (
                  <th className="py-3 px-3 text-right">Backlinks</th>
                )}

                {visibleColumns.spam && (
                  <th className="py-3 px-2 text-right">
                    <button
                      onClick={() => handleSort('spamScore')}
                      className="flex items-center gap-1 ml-auto hover:text-white"
                    >
                      <span>Spam</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                )}

                {visibleColumns.age && (
                  <th className="py-3 px-2 text-right">Age</th>
                )}

                {visibleColumns.dofollow && (
                  <th className="py-3 px-2 text-center">Dofollow</th>
                )}

                {visibleColumns.contextual && (
                  <th className="py-3 px-2 text-center">Contextual</th>
                )}

                {visibleColumns.sponsored && (
                  <th className="py-3 px-2 text-center">Tag</th>
                )}

                {visibleColumns.publisherPrice && (
                  <th className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleSort('publisherPrice')}
                      className="flex items-center gap-1 ml-auto hover:text-white"
                    >
                      <span>Pub Price</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                )}

                {visibleColumns.clientPrice && (
                  <th className="py-3 px-3 text-right">Client Price</th>
                )}

                {visibleColumns.profit && (
                  <th className="py-3 px-3 text-right">Net Profit</th>
                )}

                {visibleColumns.contact && (
                  <th className="py-3 px-3">Contact</th>
                )}

                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono">
              {filteredAndSortedWebsites.map((site) => {
                const pubPrice = site.guestPostInfo?.publisherPrice ?? site.publisherPrice ?? 100;
                const clPrice = site.guestPostInfo?.clientPrice ?? site.clientPrice ?? 200;
                const profit = clPrice - pubPrice;

                return (
                  <tr key={site.id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Website & URL */}
                    <td className="py-3 px-4 font-sans font-medium text-white sticky left-0 z-10 bg-slate-900/95">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate max-w-[170px]">{site.name}</span>
                        <a
                          href={`https://${site.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white"
                          title="Open URL"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate max-w-[170px]">
                        {site.url}
                      </div>
                    </td>

                    {/* Niche */}
                    <td className="py-3 px-3 font-sans text-slate-400 truncate max-w-[130px]">
                      {site.niche}
                    </td>

                    {/* Country */}
                    <td className="py-3 px-2 font-sans text-slate-400">
                      {site.countryCode}
                    </td>

                    {/* DA */}
                    {visibleColumns.da && (
                      <td className="py-3 px-2 text-right tabular-nums">
                        <span className={(site.da ?? 0) >= 50 ? 'text-emerald-400 font-semibold' : ''}>
                          {site.da}
                        </span>
                      </td>
                    )}

                    {/* DR */}
                    {visibleColumns.dr && (
                      <td className="py-3 px-2 text-right tabular-nums">
                        <span className={(site.dr ?? 0) >= 50 ? 'text-emerald-400 font-semibold' : ''}>
                          {site.dr}
                        </span>
                      </td>
                    )}

                    {/* AS */}
                    {visibleColumns.as && (
                      <td className="py-3 px-2 text-right tabular-nums">
                        {site.as}
                      </td>
                    )}

                    {/* TF */}
                    {visibleColumns.tf && (
                      <td className="py-3 px-2 text-right tabular-nums">
                        {site.tf}
                      </td>
                    )}

                    {/* CF */}
                    {visibleColumns.cf && (
                      <td className="py-3 px-2 text-right tabular-nums text-slate-400">
                        {site.cf}
                      </td>
                    )}

                    {/* Traffic */}
                    {visibleColumns.traffic && (
                      <td className="py-3 px-3 text-right tabular-nums text-white font-medium">
                        {formatCompactNumber(site.organicTraffic)}
                      </td>
                    )}

                    {/* Top Country */}
                    {visibleColumns.topCountry && (
                      <td className="py-3 px-2 text-right tabular-nums text-slate-400 text-[11px]">
                        {site.trafficCountries[0]?.code} {site.trafficCountries[0]?.percentage}%
                      </td>
                    )}

                    {/* Ref Domains */}
                    {visibleColumns.refDomains && (
                      <td className="py-3 px-3 text-right tabular-nums text-slate-300">
                        {(site.referringDomains ?? 0).toLocaleString()}
                      </td>
                    )}

                    {/* Backlinks */}
                    {visibleColumns.backlinks && (
                      <td className="py-3 px-3 text-right tabular-nums text-slate-400">
                        {formatCompactNumber(site.backlinks)}
                      </td>
                    )}

                    {/* Spam */}
                    {visibleColumns.spam && (
                      <td className="py-3 px-2 text-right tabular-nums">
                        <span
                          className={
                            (site.spamScore ?? 0) <= 2
                              ? 'text-emerald-400'
                              : (site.spamScore ?? 0) <= 5
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }
                        >
                          {site.spamScore ?? 0}%
                        </span>
                      </td>
                    )}

                    {/* Age */}
                    {visibleColumns.age && (
                      <td className="py-3 px-2 text-right tabular-nums text-slate-400">
                        {site.domainAgeYears}y
                      </td>
                    )}

                    {/* Dofollow */}
                    {visibleColumns.dofollow && (
                      <td className="py-3 px-2 text-center font-sans">
                        <span className="text-emerald-400 text-[11px]">
                          {Math.round(((site.dofollowLinks ?? 0) / (site.backlinks || 1)) * 100)}%
                        </span>
                      </td>
                    )}

                    {/* Contextual */}
                    {visibleColumns.contextual && (
                      <td className="py-3 px-2 text-center font-sans text-[11px]">
                        {site.contextualLink ? (
                          <span className="text-emerald-400">Yes</span>
                        ) : (
                          <span className="text-slate-500">Bio</span>
                        )}
                      </td>
                    )}

                    {/* Sponsored Tag */}
                    {visibleColumns.sponsored && (
                      <td className="py-3 px-2 text-center font-sans text-[10px] text-slate-400">
                        {site.sponsoredTag === 'Non-Sponsored' ? 'Editorial' : site.sponsoredTag}
                      </td>
                    )}

                    {/* Publisher Price */}
                    {visibleColumns.publisherPrice && (
                      <td className="py-3 px-3 text-right tabular-nums text-emerald-400 font-semibold">
                        ${site.publisherPrice}
                      </td>
                    )}

                    {/* Client Price */}
                    {visibleColumns.clientPrice && (
                      <td className="py-3 px-3 text-right tabular-nums text-slate-200">
                        ${site.clientPrice}
                      </td>
                    )}

                    {/* Profit */}
                    {visibleColumns.profit && (
                      <td className="py-3 px-3 text-right tabular-nums text-emerald-400 font-bold">
                        +${profit}
                      </td>
                    )}

                    {/* Contact */}
                    {visibleColumns.contact && (
                      <td className="py-3 px-3 font-sans max-w-[140px] truncate">
                        <div className="text-white truncate">{site.contactPerson}</div>
                        <div className="text-[10px] text-slate-400 truncate">{site.contactEmail}</div>
                      </td>
                    )}

                    {/* Actions */}
                    <td className="py-3 px-4 font-sans text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setDetailModalSite(site)}
                          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
                          title="Inspect full guest post evaluation"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditModalSite(site)}
                          className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors"
                          title="Edit website metrics and prices"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedWebsiteId(site.id);
                            setActiveTab('analysis');
                          }}
                          className="px-2 py-1 text-[11px] text-emerald-400 hover:text-emerald-300 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                          title="Run 12-factor SEO quality analysis"
                        >
                          Audit
                        </button>
                        <button
                          onClick={() => setOutreachModalSite(site)}
                          className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors"
                          title="Start Outreach"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleCompare(site.id)}
                          className={`p-1.5 rounded transition-colors ${
                            isInCompare(site.id) ? 'text-cyan-400 bg-cyan-950/60' : 'text-slate-400 hover:text-slate-200'
                          }`}
                          title={isInCompare(site.id) ? 'Remove compare' : 'Add to compare'}
                        >
                          {isInCompare(site.id) ? '✓' : '+'}
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${site.name} from the database?`)) {
                              deleteWebsite(site.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                          title="Delete website"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
