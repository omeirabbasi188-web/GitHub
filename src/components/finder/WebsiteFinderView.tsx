import React, { useState, useMemo } from 'react';
import { useSeo } from '../../context/SeoContext';
import { SearchFilterState } from '../../types/seo';
import {
  calculateOpportunityScore,
  formatCompactNumber,
  formatCurrency
} from '../../utils/seoCalculations';
import {
  Search,
  Filter,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  LayoutGrid,
  List,
  Sparkles,
  Edit3
} from 'lucide-react';

export const WebsiteFinderView: React.FC = () => {
  const {
    websites,
    filters,
    setFilters,
    resetFilters,
    setSelectedWebsiteId,
    setActiveTab,
    setDetailModalSite,
    setEditModalSite,
    setOutreachModalSite,
    toggleCompare,
    isInCompare
  } = useSeo();

  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Extract unique niches and countries
  const niches = useMemo(() => {
    const list = Array.from(new Set(websites.map((s) => s.niche)));
    return ['All Niches', ...list];
  }, [websites]);

  const countries = useMemo(() => {
    const list = Array.from(new Set(websites.map((s) => s.country)));
    return ['All Countries', ...list];
  }, [websites]);

  // Apply filters
  const filteredWebsites = useMemo(() => {
    return websites.filter((site) => {
      // Text search
      if (filters.searchQuery && filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchName = site.name.toLowerCase().includes(q);
        const matchUrl = site.url.toLowerCase().includes(q);
        const matchNiche = site.niche.toLowerCase().includes(q);
        const matchKeywords = (site.topKeywords || []).some((k) => k.toLowerCase().includes(q));
        if (!matchName && !matchUrl && !matchNiche && !matchKeywords) return false;
      }

      // Niche & Country
      if (filters.niche && filters.niche !== 'All Niches' && site.niche !== filters.niche) return false;
      if (filters.country && filters.country !== 'All Countries' && site.country !== filters.country) return false;

      // Metrics ranges
      const da = site.da ?? 0;
      const dr = site.dr ?? 0;
      const as = site.as ?? 0;
      const tf = site.tf ?? 0;
      const cf = site.cf ?? 0;
      const traffic = site.organicTraffic ?? 0;
      const refDomains = site.referringDomains ?? 0;
      const spam = site.spamScore ?? 0;
      const pubPrice = site.guestPostInfo?.publisherPrice ?? site.publisherPrice ?? 0;

      if (da < filters.daMin || (filters.daMax !== undefined && da > filters.daMax)) return false;
      if (dr < filters.drMin || (filters.drMax !== undefined && dr > filters.drMax)) return false;
      if (as < filters.asMin || (filters.asMax !== undefined && as > filters.asMax)) return false;
      if (tf < (filters.tfMin ?? 0) || (filters.tfMax !== undefined && tf > filters.tfMax)) return false;
      if (cf < (filters.cfMin ?? 0) || (filters.cfMax !== undefined && cf > filters.cfMax)) return false;
      if (traffic < filters.trafficMin) return false;
      if (refDomains < (filters.referringDomainsMin ?? 0)) return false;
      if (spam > filters.spamScoreMax) return false;
      if (pubPrice > filters.priceMax) return false;

      // Quality toggles
      if (filters.dofollowOnly && ((site.dofollowLinks ?? 0) <= (site.nofollowLinks ?? 0))) return false;
      if (filters.contextualOnly && !(site.guestPostInfo?.contextualLink ?? site.contextualLink ?? true)) return false;
      if (filters.nonSponsoredOnly && (site.guestPostInfo?.sponsored === 'Sponsored' || site.sponsoredTag === 'Sponsored')) return false;
      if (filters.guestPostOnly && !(site.guestPostStatus === 'Confirmed' || site.guestPostStatus === 'Likely' || site.guestPostAvailable)) return false;

      // Opportunity Score filter
      if (filters.opportunityScoreMin && filters.opportunityScoreMin > 0) {
        const score = calculateOpportunityScore(site).totalScore;
        if (score < filters.opportunityScoreMin) return false;
      }

      return true;
    });
  }, [websites, filters]);

  // Preset Filters
  const applyPreset = (preset: 'high_da' | 'budget' | 'low_spam' | 'high_traffic' | 'top_score') => {
    resetFilters();
    switch (preset) {
      case 'high_da':
        setFilters((prev: SearchFilterState) => ({ ...prev, daMin: 55, drMin: 55 }));
        break;
      case 'budget':
        setFilters((prev: SearchFilterState) => ({ ...prev, priceMax: 100 }));
        break;
      case 'low_spam':
        setFilters((prev: SearchFilterState) => ({ ...prev, spamScoreMax: 2 }));
        break;
      case 'high_traffic':
        setFilters((prev: SearchFilterState) => ({ ...prev, trafficMin: 50000 }));
        break;
      case 'top_score':
        setFilters((prev: SearchFilterState) => ({ ...prev, opportunityScoreMin: 75 }));
        break;
    }
  };

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header & Preset Filter Chips */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            SEO Website Finder & Prospector
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Filter target websites by Moz DA, Ahrefs DR, Semrush AS, Majestic Trust Flow, organic traffic, and pricing.
          </p>
        </div>

        {/* View toggles & filter expansion */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              isFilterExpanded
                ? 'bg-slate-800 text-white border-slate-700'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{isFilterExpanded ? 'Hide Filters' : 'Show Filters'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isFilterExpanded ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-slate-700 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-slate-700 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Preset Filter Buttons (Swipable on mobile) */}
      <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1 scrollbar-none whitespace-nowrap">
        <span className="text-slate-400 font-medium mr-1 flex items-center gap-1 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Quick Presets:
        </span>
        <button
          onClick={() => applyPreset('top_score')}
          className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-md border border-slate-700/80 transition-colors shrink-0"
        >
          Top Opportunity (Score &ge; 75)
        </button>
        <button
          onClick={() => applyPreset('high_da')}
          className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-md border border-slate-700/80 transition-colors shrink-0"
        >
          High Authority (DA & DR &ge; 55)
        </button>
        <button
          onClick={() => applyPreset('high_traffic')}
          className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-md border border-slate-700/80 transition-colors shrink-0"
        >
          High Traffic (&ge; 50K/mo)
        </button>
        <button
          onClick={() => applyPreset('budget')}
          className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-md border border-slate-700/80 transition-colors shrink-0"
        >
          Budget Friendly (&le; $100)
        </button>
        <button
          onClick={() => applyPreset('low_spam')}
          className="px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-md border border-slate-700/80 transition-colors shrink-0"
        >
          Ultra Safe (Spam &le; 2%)
        </button>
        <button
          onClick={resetFilters}
          className="px-2 py-1 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 shrink-0"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Advanced Collapsible Filter Panel */}
      {isFilterExpanded && (
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
          {/* Row 1: Search & Categorical Selects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={filters.searchQuery || ''}
                onChange={(e) => setFilters((prev: SearchFilterState) => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Search domain, niche, keyword..."
                className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>

            <div>
              <select
                value={filters.niche}
                onChange={(e) => setFilters((prev: SearchFilterState) => ({ ...prev, niche: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                {niches.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={filters.country}
                onChange={(e) => setFilters((prev: SearchFilterState) => ({ ...prev, country: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Sliders & Thresholds */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2 text-xs">
            {/* Moz DA Min */}
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span>Min DA (Moz)</span>
                <span className="font-mono text-emerald-400 font-semibold">{filters.daMin}</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                value={filters.daMin}
                onChange={(e) => setFilters((prev: SearchFilterState) => ({ ...prev, daMin: Number(e.target.value) }))}
                className="w-full accent-emerald-400 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Ahrefs DR Min */}
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span>Min DR (Ahrefs)</span>
                <span className="font-mono text-emerald-400 font-semibold">{filters.drMin}</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                value={filters.drMin}
                onChange={(e) => setFilters((prev: SearchFilterState) => ({ ...prev, drMin: Number(e.target.value) }))}
                className="w-full accent-emerald-400 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Semrush AS Min */}
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span>Min AS (Semrush)</span>
                <span className="font-mono text-emerald-400 font-semibold">{filters.asMin}</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                value={filters.asMin}
                onChange={(e) => setFilters((prev: SearchFilterState) => ({ ...prev, asMin: Number(e.target.value) }))}
                className="w-full accent-emerald-400 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Majestic TF Min */}
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span>Min TF (Majestic)</span>
                <span className="font-mono text-emerald-400 font-semibold">{filters.tfMin ?? 0}</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={filters.tfMin ?? 0}
                onChange={(e) => setFilters((prev: SearchFilterState) => ({ ...prev, tfMin: Number(e.target.value) }))}
                className="w-full accent-emerald-400 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Max Spam Score */}
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span>Max Spam Score</span>
                <span className="font-mono text-amber-400 font-semibold">{filters.spamScoreMax}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={filters.spamScoreMax}
                onChange={(e) => setFilters((prev: SearchFilterState) => ({ ...prev, spamScoreMax: Number(e.target.value) }))}
                className="w-full accent-amber-400 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Max Price */}
            <div>
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span>Max Price ($)</span>
                <span className="font-mono text-emerald-400 font-semibold">${filters.priceMax}</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={filters.priceMax}
                onChange={(e) => setFilters((prev: SearchFilterState) => ({ ...prev, priceMax: Number(e.target.value) }))}
                className="w-full accent-emerald-400 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Row 3: Boolean Toggles */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-800 text-xs text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.dofollowOnly}
                onChange={(e) => setFilters((prev: SearchFilterState) => ({ ...prev, dofollowOnly: e.target.checked }))}
                className="rounded bg-slate-800 border-slate-700 text-emerald-400 focus:ring-0"
              />
              <span>Dofollow Links Primary</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.contextualOnly}
                onChange={(e) => setFilters((prev: SearchFilterState) => ({ ...prev, contextualOnly: e.target.checked }))}
                className="rounded bg-slate-800 border-slate-700 text-emerald-400 focus:ring-0"
              />
              <span>In-Content Contextual Link Required</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={Boolean(filters.nonSponsoredOnly)}
                onChange={(e) => setFilters((prev: SearchFilterState) => ({ ...prev, nonSponsoredOnly: e.target.checked }))}
                className="rounded bg-slate-800 border-slate-700 text-emerald-400 focus:ring-0"
              />
              <span>Non-Sponsored / Editorial Placement</span>
            </label>
          </div>
        </div>
      )}

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div>
          Showing <span className="font-semibold text-white font-mono">{filteredWebsites.length}</span> of{' '}
          <span className="font-mono">{websites.length}</span> target websites
        </div>
        <div className="text-[11px] text-slate-400">
          DA, DR, AS, TF & CF are third-party comparative metrics
        </div>
      </div>

      {/* View: Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWebsites.map((site) => {
            const scoreData = calculateOpportunityScore(site);
            return (
              <div
                key={site.id}
                className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-sm text-white truncate">
                          {site.name}
                        </h3>
                        <a
                          href={`https://${site.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-slate-200 shrink-0"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                        {site.url}
                      </div>
                    </div>

                    {/* Opportunity Score Pill */}
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 block">Score</span>
                      <span className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
                        {scoreData.totalScore}/100
                      </span>
                    </div>
                  </div>

                  {/* Clean unboxed metadata (zero-pill discipline) */}
                  <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-400">
                    <span className="truncate">{site.niche}</span>
                    <span aria-hidden="true">·</span>
                    <span>{site.country}</span>
                    <span aria-hidden="true">·</span>
                    <span>{site.domainAgeYears} yrs age</span>
                  </div>

                  {/* Third-Party Metrics Grid */}
                  <div className="mt-3.5 grid grid-cols-5 gap-1 py-2 px-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-center text-xs font-mono">
                    <div>
                      <div className="text-[10px] text-slate-400 font-sans">DA</div>
                      <div className="font-bold text-slate-200 tabular-nums">{site.da}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-sans">DR</div>
                      <div className="font-bold text-slate-200 tabular-nums">{site.dr}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-sans">AS</div>
                      <div className="font-bold text-slate-200 tabular-nums">{site.as}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-sans">TF</div>
                      <div className="font-bold text-slate-200 tabular-nums">{site.tf}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-sans">CF</div>
                      <div className="font-bold text-slate-200 tabular-nums">{site.cf}</div>
                    </div>
                  </div>

                  {/* Secondary Metrics */}
                  <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Monthly Traffic:</span>
                      <span className="font-mono font-medium text-white">
                        {(site.organicTraffic ?? 0).toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Referring Domains:</span>
                      <span className="font-mono text-slate-300">
                        {(site.referringDomains ?? 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Spam Score:</span>
                      <span className={`font-mono ${(site.spamScore ?? 0) <= 2 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {site.spamScore ?? 0}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Link Type:</span>
                      <span className="text-slate-300">
                        {site.contextualLink ? 'Contextual In-Body' : 'Author Bio'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                      <span className="text-slate-400">Publisher Price:</span>
                      <span className="font-mono font-semibold text-emerald-400">
                        {formatCurrency(site.publisherPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-1.5">
                  <button
                    onClick={() => {
                      setSelectedWebsiteId(site.id);
                      setActiveTab('analysis');
                    }}
                    className="flex-1 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors text-center"
                  >
                    Analyze
                  </button>
                  <button
                    onClick={() => setDetailModalSite(site)}
                    className="flex-1 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/50 hover:bg-emerald-900/50 border border-emerald-500/30 rounded-md transition-colors text-center"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setEditModalSite(site)}
                    className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-md transition-colors"
                    title="Edit metrics and prices"
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
                    title={isInCompare(site.id) ? 'Remove from compare' : 'Add to compare'}
                  >
                    {isInCompare(site.id) ? '✓' : '+'}
                  </button>
                  <button
                    onClick={() => setOutreachModalSite(site)}
                    className="px-2.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors"
                    title="Send Outreach Pitch"
                  >
                    Pitch
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View: Table Mode */}
      {viewMode === 'table' && (
        <div className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] text-slate-400 font-medium">
              <tr>
                <th className="py-3 px-4">Website</th>
                <th className="py-3 px-3">Niche</th>
                <th className="py-3 px-2 text-right">DA</th>
                <th className="py-3 px-2 text-right">DR</th>
                <th className="py-3 px-2 text-right">AS</th>
                <th className="py-3 px-2 text-right">TF</th>
                <th className="py-3 px-3 text-right">Traffic</th>
                <th className="py-3 px-3 text-right">Ref. Dom</th>
                <th className="py-3 px-2 text-right">Spam</th>
                <th className="py-3 px-3 text-right">Price</th>
                <th className="py-3 px-3 text-right">Opportunity</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono">
              {filteredWebsites.map((site) => {
                const score = calculateOpportunityScore(site).totalScore;
                return (
                  <tr key={site.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-sans font-medium text-white">
                      <div className="truncate max-w-[180px]">{site.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{site.url}</div>
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-400 truncate max-w-[140px]">
                      {site.niche}
                    </td>
                    <td className="py-3 px-2 text-right tabular-nums">{site.da}</td>
                    <td className="py-3 px-2 text-right tabular-nums">{site.dr}</td>
                    <td className="py-3 px-2 text-right tabular-nums">{site.as}</td>
                    <td className="py-3 px-2 text-right tabular-nums">{site.tf}</td>
                    <td className="py-3 px-3 text-right tabular-nums text-white">
                      {formatCompactNumber(site.organicTraffic)}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums">
                      {(site.referringDomains ?? 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-right tabular-nums">
                      <span className={(site.spamScore ?? 0) <= 2 ? 'text-emerald-400' : 'text-amber-400'}>
                        {site.spamScore ?? 0}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-emerald-400 font-semibold">
                      ${site.guestPostInfo?.publisherPrice ?? site.publisherPrice ?? 0}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums">
                      <span className="font-bold text-emerald-400">{score}</span>
                      <span className="text-[10px] text-slate-400 font-normal">/100</span>
                    </td>
                    <td className="py-3 px-4 font-sans text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => {
                            setSelectedWebsiteId(site.id);
                            setActiveTab('analysis');
                          }}
                          className="px-2 py-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                        >
                          Audit
                        </button>
                        <button
                          onClick={() => setDetailModalSite(site)}
                          className="px-2 py-1 text-[11px] text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => setEditModalSite(site)}
                          className="p-1 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 rounded transition-colors"
                          title="Edit metrics"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => toggleCompare(site.id)}
                          className={`px-1.5 py-1 text-[11px] rounded border transition-colors ${
                            isInCompare(site.id) ? 'bg-cyan-950 border-cyan-500/50 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          {isInCompare(site.id) ? '✓' : '+'}
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
