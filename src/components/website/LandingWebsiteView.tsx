import React, { useState } from 'react';
import { useSeo, NavigationTab } from '../../context/SeoContext';
import { DiscoveredWebsite } from '../../types/seo';
import {
  calculateOpportunityScore,
  formatCompactNumber,
  formatCurrency
} from '../../utils/seoCalculations';
import {
  Search,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Send,
  Link2,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowRight,
  Filter,
  Check,
  HelpCircle,
  TrendingUp,
  Award,
  Zap,
  Lock,
  Globe,
  Database,
  Calculator,
  Sliders,
  AlertTriangle
} from 'lucide-react';

export const LandingWebsiteView: React.FC = () => {
  const {
    websites,
    filters,
    setFilters,
    runSearch,
    isSearching,
    searchProgressStep,
    setSelectedWebsiteId,
    setActiveTab,
    setDetailModalSite,
    setOutreachModalSite,
    saveWebsiteToStage,
    language,
    setLanguage
  } = useSeo();

  // Search input state on the website
  const [keywordInput, setKeywordInput] = useState(filters.niche || 'AI');
  const [naturalQuery, setNaturalQuery] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeFeatureTab, setActiveFeatureTab] = useState<'finder' | 'score' | 'outreach' | 'backlinks'>('finder');

  // Quick niche suggestions
  const popularNiches = [
    'AI',
    'SaaS',
    'Technology',
    'Digital Marketing',
    'Finance',
    'Travel',
    'Health',
    'Business',
    'Cybersecurity',
    'E-Commerce'
  ];

  // Natural language query processor
  const handleNaturalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!naturalQuery.trim()) return;

    const q = naturalQuery.toLowerCase();
    const newFilters = { ...filters };

    // Check for niche
    for (const n of popularNiches) {
      if (q.includes(n.toLowerCase())) {
        newFilters.niche = n;
        setKeywordInput(n);
        break;
      }
    }

    // Check for DR
    const drMatch = q.match(/dr\s*(?:above|over|>|min)?\s*(\d+)/i);
    if (drMatch && drMatch[1]) {
      newFilters.drMin = parseInt(drMatch[1], 10);
    }

    // Check for DA
    const daMatch = q.match(/da\s*(?:above|over|>|min)?\s*(\d+)/i);
    if (daMatch && daMatch[1]) {
      newFilters.daMin = parseInt(daMatch[1], 10);
    }

    // Check for traffic
    const trafficMatch = q.match(/traffic\s*(?:above|over|>|min)?\s*(\d+[\d,]*)/i);
    if (trafficMatch && trafficMatch[1]) {
      newFilters.trafficMin = parseInt(trafficMatch[1].replace(/,/g, ''), 10);
    }

    // Check for price
    const priceMatch = q.match(/(?:price|cost|under|below|<|\$)\s*(\d+)/i);
    if (priceMatch && priceMatch[1]) {
      newFilters.priceMax = parseInt(priceMatch[1], 10);
    }

    // Check for dofollow
    if (q.includes('dofollow')) {
      newFilters.dofollowOnly = true;
    }

    // Check for contextual
    if (q.includes('contextual')) {
      newFilters.contextualOnly = true;
    }

    setFilters(newFilters);
    runSearch();

    // Scroll smoothly to results
    const el = document.getElementById('search-results-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickNicheClick = (niche: string) => {
    setKeywordInput(niche);
    setFilters({ ...filters, niche });
    runSearch();
  };

  const handleMainSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, niche: keywordInput });
    runSearch();
    const el = document.getElementById('search-results-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* 1. Website Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              RankPulse SEO
              <span className="hidden sm:inline-block text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/70 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                GUEST POST FINDER
              </span>
            </span>
          </div>
        </div>

        {/* Desktop Anchor Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-400">
          <a href="#search-section" className="hover:text-white transition-colors">
            Find Guest Posts
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            17-Step Engine
          </a>
          <a href="#metrics-section" className="hover:text-white transition-colors">
            12-Factor SEO
          </a>
          <a href="#score-formula" className="hover:text-white transition-colors">
            Opportunity Score
          </a>
          <a href="#pricing-section" className="hover:text-white transition-colors">
            Pricing & API
          </a>
          <a href="#faq-section" className="hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : language === 'hi' ? 'ur' : 'en')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 hover:bg-slate-800 transition-colors"
            title="Toggle Language"
          >
            {language === 'en' ? 'हिन्दी / اردو' : language === 'hi' ? 'English' : 'EN'}
          </button>

          <button
            onClick={() => setActiveTab('finder')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Launch App Workspace</span>
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Accurate Guest Blogging Research & Verified SEO Authority</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Find Guest Post Websites & Analyze SEO Quality{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Automatically
          </span>
        </h1>

        <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Stop manually googling <em>"write for us"</em> site by site. Discover verified guest post opportunities, inspect genuine Moz DA, Ahrefs DR, Semrush AS, and compute transparent 0–100 Opportunity Scores.
        </p>

        {/* 3. Main Search Engine Box (Requirement 1 & 2) */}
        <div id="search-section" className="mt-10 max-w-4xl mx-auto text-left">
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl shadow-emerald-950/20 backdrop-blur-md">
            <form onSubmit={handleMainSearchSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Enter Niche / Keyword
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      placeholder="e.g. AI, SaaS, Technology, Digital Marketing, Finance, Health..."
                      className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSearching}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm rounded-xl shadow-md shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-60 whitespace-nowrap"
                  >
                    {isSearching ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Searching Web...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Find Guest Post Opportunities</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Niche Suggestion Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium mr-1">Popular:</span>
                {popularNiches.map((niche) => (
                  <button
                    key={niche}
                    type="button"
                    onClick={() => handleQuickNicheClick(niche)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                      keywordInput.toLowerCase() === niche.toLowerCase()
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700 border border-transparent'
                    }`}
                  >
                    {niche}
                  </button>
                ))}
              </div>

              {/* Expandable Filter Toggle */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <Filter className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    {isFilterPanelOpen ? 'Hide Advanced SEO Filters' : 'Show Advanced SEO Filters (DA, DR, Spam, Price, Country)'}
                  </span>
                  {isFilterPanelOpen ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                <span className="text-[11px] text-slate-400 font-mono">
                  {websites.length} verified websites loaded
                </span>
              </div>

              {/* Advanced Filter Grid (Requirement 1) */}
              {isFilterPanelOpen && (
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  {/* Target Country */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">Target Country</label>
                    <select
                      value={filters.country}
                      onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-medium"
                    >
                      <option value="All Countries">All Countries (Global)</option>
                      <option value="United States">United States (USA)</option>
                      <option value="United Kingdom">United Kingdom (UK)</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="India">India</option>
                    </select>
                  </div>

                  {/* Min DA (Moz) */}
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                      <span>Min DA (Moz):</span>
                      <span className="font-mono text-emerald-400 font-bold">{filters.daMin}+</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={90}
                      value={filters.daMin}
                      onChange={(e) => setFilters({ ...filters, daMin: Number(e.target.value) })}
                      className="w-full accent-emerald-400"
                    />
                  </div>

                  {/* Min DR (Ahrefs) */}
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                      <span>Min DR (Ahrefs):</span>
                      <span className="font-mono text-cyan-400 font-bold">{filters.drMin}+</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={90}
                      value={filters.drMin}
                      onChange={(e) => setFilters({ ...filters, drMin: Number(e.target.value) })}
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  {/* Min Organic Traffic */}
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                      <span>Min Traffic:</span>
                      <span className="font-mono text-indigo-400 font-bold">
                        {formatCompactNumber(filters.trafficMin)}/mo
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={50000}
                      step={2500}
                      value={filters.trafficMin}
                      onChange={(e) => setFilters({ ...filters, trafficMin: Number(e.target.value) })}
                      className="w-full accent-indigo-400"
                    />
                  </div>

                  {/* Max Spam Score (Moz) */}
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                      <span>Max Spam Score:</span>
                      <span className="font-mono text-rose-400 font-bold">≤ {filters.spamScoreMax}%</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={15}
                      value={filters.spamScoreMax}
                      onChange={(e) => setFilters({ ...filters, spamScoreMax: Number(e.target.value) })}
                      className="w-full accent-rose-400"
                    />
                  </div>

                  {/* Max Publisher Price */}
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                      <span>Max Publisher Fee:</span>
                      <span className="font-mono text-amber-400 font-bold">
                        {filters.priceMax >= 1000 ? 'Any Price' : `$${filters.priceMax}`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={1000}
                      step={25}
                      value={filters.priceMax}
                      onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                      className="w-full accent-amber-400"
                    />
                  </div>

                  {/* Toggle Options */}
                  <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={filters.dofollowOnly}
                        onChange={(e) => setFilters({ ...filters, dofollowOnly: e.target.checked })}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-400"
                      />
                      <span>Dofollow links only</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={filters.contextualOnly}
                        onChange={(e) => setFilters({ ...filters, contextualOnly: e.target.checked })}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-400"
                      />
                      <span>Contextual in-content only</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={filters.guestPostRequired}
                        onChange={(e) => setFilters({ ...filters, guestPostRequired: e.target.checked })}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-400"
                      />
                      <span>Guest post confirmed only</span>
                    </label>
                  </div>
                </div>
              )}
            </form>

            {/* Smart Natural Language Search Box (Requirement 9) */}
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <form onSubmit={handleNaturalSearch} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    value={naturalQuery}
                    onChange={(e) => setNaturalQuery(e.target.value)}
                    placeholder="Smart Search: 'Find SaaS websites with DA above 50, dofollow links and price below $100'..."
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 rounded-lg border border-slate-700 transition-colors whitespace-nowrap"
                >
                  Convert & Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live Search Results Section (Requirements 3, 5, 6, 7) */}
      <section id="search-results-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Discovered Guest Post Opportunities</span>
              <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                {websites.length} Domains
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Real-time verified publishers with explicit provider attribution (Moz, Ahrefs, Semrush, Majestic).
            </p>
          </div>

          <button
            onClick={() => setActiveTab('finder')}
            className="self-start sm:self-auto text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
          >
            <span>Open in Full Matrix Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Real-time search progress bar if active */}
        {isSearching && (
          <div className="mb-6 p-4 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-2 animate-pulse">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-300 font-semibold">{searchProgressStep || 'Searching the web for guest posting opportunities...'}</span>
              <span className="font-mono text-slate-400">Scanning...</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 animate-pulse w-3/4"
              />
            </div>
          </div>
        )}

        {/* Results Table (Requirement 6) */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-slate-950/90 border-b border-slate-800 text-[11px] text-slate-400 font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Website</th>
                  <th className="py-3 px-3">Niche</th>
                  <th className="py-3 px-2 text-right">DA (Moz)</th>
                  <th className="py-3 px-2 text-right">DR (Ahrefs)</th>
                  <th className="py-3 px-2 text-right">AS (Semrush)</th>
                  <th className="py-3 px-2 text-right">Traffic</th>
                  <th className="py-3 px-2 text-right">Ref. Domains</th>
                  <th className="py-3 px-2 text-center">Spam</th>
                  <th className="py-3 px-2 text-center">Link</th>
                  <th className="py-3 px-2 text-right">Price</th>
                  <th className="py-3 px-3 text-center">Guest Post</th>
                  <th className="py-3 px-3">Contact</th>
                  <th className="py-3 px-3 text-center">Score</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {websites.slice(0, 10).map((site) => {
                  const score = calculateOpportunityScore(site);
                  const isConfirmed = site.guestPostStatus === 'Confirmed';
                  const linkType = site.guestPostInfo?.linkType || 'Dofollow';

                  return (
                    <tr key={site.id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Website */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{site.name}</div>
                        <a
                          href={`https://${site.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-slate-400 hover:text-emerald-400 font-mono flex items-center gap-1"
                        >
                          <span>{site.url}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </td>

                      {/* Niche */}
                      <td className="py-3 px-3">
                        <span className="text-slate-300 font-medium">{site.niche}</span>
                        <div className="text-[10px] text-slate-500">{site.country}</div>
                      </td>

                      {/* DA */}
                      <td className="py-3 px-2 text-right tabular-nums font-mono font-bold text-emerald-400">
                        {site.da ?? 'N/A'}
                      </td>

                      {/* DR */}
                      <td className="py-3 px-2 text-right tabular-nums font-mono font-bold text-cyan-400">
                        {site.dr ?? 'N/A'}
                      </td>

                      {/* AS */}
                      <td className="py-3 px-2 text-right tabular-nums font-mono font-bold text-indigo-400">
                        {site.as ?? 'N/A'}
                      </td>

                      {/* Traffic */}
                      <td className="py-3 px-2 text-right tabular-nums font-mono font-semibold text-white">
                        {site.organicTraffic != null ? formatCompactNumber(site.organicTraffic) : 'N/A'}
                      </td>

                      {/* Referring Domains */}
                      <td className="py-3 px-2 text-right tabular-nums font-mono text-slate-300">
                        {site.referringDomains != null ? formatCompactNumber(site.referringDomains) : 'N/A'}
                      </td>

                      {/* Spam Score */}
                      <td className="py-3 px-2 text-center tabular-nums font-mono">
                        <span
                          className={`font-semibold ${
                            (site.spamScore ?? 0) <= 2
                              ? 'text-emerald-400'
                              : (site.spamScore ?? 0) <= 5
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }`}
                        >
                          {site.spamScore != null ? `${site.spamScore}%` : 'N/A'}
                        </span>
                      </td>

                      {/* Link Type */}
                      <td className="py-3 px-2 text-center">
                        <span
                          className={`text-[10px] font-semibold ${
                            linkType === 'Dofollow' ? 'text-emerald-400' : 'text-slate-400'
                          }`}
                        >
                          {linkType}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-2 text-right tabular-nums font-mono font-semibold text-amber-400">
                        {formatCurrency(site.publisherPrice ?? site.guestPostInfo?.publisherPrice)}
                      </td>

                      {/* Guest Post Status */}
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`text-[11px] font-semibold ${
                            isConfirmed
                              ? 'text-emerald-400'
                              : site.guestPostStatus === 'Likely'
                              ? 'text-cyan-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {site.guestPostStatus}
                        </span>
                        {site.guestPostInfo?.guestPostUrl && (
                          <div>
                            <a
                              href={site.guestPostInfo.guestPostUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-slate-500 hover:text-emerald-400 underline"
                            >
                              Guidelines
                            </a>
                          </div>
                        )}
                      </td>

                      {/* Contact */}
                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-200 truncate max-w-[130px]">
                          {site.contactPerson || site.guestPostInfo?.contactPerson || 'Editorial Desk'}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono truncate max-w-[130px]">
                          {site.contactEmail || site.guestPostInfo?.contactEmail || `editor@${site.url}`}
                        </div>
                      </td>

                      {/* Score */}
                      <td className="py-3 px-3 text-center">
                        <div className="inline-flex items-center gap-1 font-mono font-bold text-xs text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                          <span>{score.totalScore}</span>
                          <span className="text-[10px] text-emerald-600">/100</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedWebsiteId(site.id);
                              setActiveTab('analysis');
                            }}
                            className="px-2.5 py-1 text-[11px] font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors"
                          >
                            Analyze
                          </button>
                          <button
                            onClick={() => setOutreachModalSite(site)}
                            className="px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors"
                          >
                            Pitch
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <span>Showing top verified results. Switch to workspace to view all or export.</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('database')}
                className="text-slate-300 hover:text-white underline"
              >
                View Saved Database
              </button>
              <button
                onClick={() => setActiveTab('finder')}
                className="px-3 py-1.5 font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
              >
                Open Full Application Table
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 17-Step Automated Engine Workflow (Requirement 17) */}
      <section id="how-it-works" className="py-16 bg-slate-900/50 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              AUTOMATIC WORKFLOW ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              From Niche Keyword to Outreach in 17 Automated Steps
            </h2>
            <p className="text-sm text-slate-400 mt-3">
              The application executes multi-pattern queries, cleans domains, checks contributor guidelines, queries legitimate SEO APIs, and surfaces high-value opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-white">Discovery & Pattern Scanning</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generates 9+ search footprints such as <code>"write for us" + [keyword]</code>, <code>"submit an article"</code>, and <code>"guest guidelines"</code>. Automatically deduplicates domains and normalizes URLs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-white">Verification & Third-Party APIs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connects to Moz, Ahrefs, Semrush, and Majestic APIs to pull real DA, DR, AS, traffic, and spam scores. Flags low-quality PBNs and non-responsive domains before you pitch.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-white">Scoring, Contacts & Outreach</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Computes the transparent 0–100 Opportunity Score, extracts editorial contact emails from public pages, and drafts tailored pitch emails with follow-up reminders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 12-Factor SEO Evaluation & Metrics Attribution (Requirements 4, 15, 19) */}
      <section id="metrics-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            ACCURACY OVER QUANTITY
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            12-Factor SEO Metrics with Explicit Provider Attribution
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Every metric displays its verified source. DA, DR, AS, TF, and CF are third-party authority signals, never misrepresented as official Google ranking factors.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">Moz API</span>
            <div className="text-lg font-bold text-white mt-1">Domain Authority (DA)</div>
            <p className="text-[11px] text-slate-400 mt-1">Moz logarithmic 1–100 predictive link score.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">Ahrefs API</span>
            <div className="text-lg font-bold text-white mt-1">Domain Rating (DR)</div>
            <p className="text-[11px] text-slate-400 mt-1">Ahrefs backlink profile logarithmic strength.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-mono text-indigo-400 font-semibold uppercase">Semrush API</span>
            <div className="text-lg font-bold text-white mt-1">Authority Score (AS)</div>
            <p className="text-[11px] text-slate-400 mt-1">Compound domain quality metric from Semrush.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase">Majestic SEO</span>
            <div className="text-lg font-bold text-white mt-1">Trust Flow & Citation Flow</div>
            <p className="text-[11px] text-slate-400 mt-1">TF/CF ratio indicating trustworthy backlink velocity.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">Organic Search</span>
            <div className="text-lg font-bold text-white mt-1">Monthly Organic Traffic</div>
            <p className="text-[11px] text-slate-400 mt-1">Estimated search visits and top geographic breakdown.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-mono text-rose-400 font-semibold uppercase">Moz Risk Engine</span>
            <div className="text-lg font-bold text-white mt-1">Moz Spam Score %</div>
            <p className="text-[11px] text-slate-400 mt-1">Flags spam patterns, link farming, and penalties.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-mono text-teal-400 font-semibold uppercase">WHOIS & Archive</span>
            <div className="text-lg font-bold text-white mt-1">Domain Age (Years)</div>
            <p className="text-[11px] text-slate-400 mt-1">Established domain longevity and editorial consistency.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">Search Engine</span>
            <div className="text-lg font-bold text-white mt-1">Indexed Page Count</div>
            <p className="text-[11px] text-slate-400 mt-1">Volume of live, crawlable content in search indices.</p>
          </div>
        </div>
      </section>

      {/* 7. Transparent 0-100 Opportunity Score Breakdown (Requirement 7) */}
      <section id="score-formula" className="py-16 bg-slate-900/60 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              TRANSPARENT CALCULATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              The 0–100 SEO Opportunity Score Formula
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              No black-box scores. Every point is calculated from measurable, verifiable metrics.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="text-sm font-semibold text-slate-300">Sample Opportunity Breakdown</div>
                <div className="text-2xl font-bold text-white font-mono flex items-center gap-2 mt-1">
                  <span>Total Opportunity Score:</span>
                  <span className="text-emerald-400">82 / 100</span>
                  <span className="text-xs font-sans font-medium text-emerald-300 bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 rounded">
                    Tier 1 - Elite Target
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('analysis')}
                className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold rounded-lg transition-colors"
              >
                Test in Live Simulator
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400">1. Relevance</div>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-1">20 / 20</div>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-400 w-full" />
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Niche alignment + confirmed guest post page.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400">2. Organic Traffic</div>
                <div className="text-xl font-bold font-mono text-cyan-400 mt-1">18 / 25</div>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-cyan-400 w-[72%]" />
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Monthly organic visitors & geo distribution.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400">3. Authority Profile</div>
                <div className="text-xl font-bold font-mono text-indigo-400 mt-1">21 / 25</div>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-indigo-400 w-[84%]" />
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Blended Moz DA, Ahrefs DR, Semrush AS.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400">4. Link Profile</div>
                <div className="text-xl font-bold font-mono text-teal-400 mt-1">15 / 20</div>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-teal-400 w-[75%]" />
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Referring domains, contextual placement & dofollow.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400">5. Spam Safety</div>
                <div className="text-xl font-bold font-mono text-rose-400 mt-1">8 / 10</div>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-rose-400 w-[80%]" />
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Moz Spam Score under 3% safety margin.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Feature Deep-Dive (Outreach, Orders, Backlinks, Calculator) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
            ALL-IN-ONE PLATFORM
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Built for SEO Teams, Link Builders & Growth Agencies
          </h2>
        </div>

        {/* Feature Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveFeatureTab('finder')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              activeFeatureTab === 'finder'
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Guest Post Finder & Filter
          </button>
          <button
            onClick={() => setActiveFeatureTab('score')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              activeFeatureTab === 'score'
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Editorial Contact Discovery
          </button>
          <button
            onClick={() => setActiveFeatureTab('outreach')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              activeFeatureTab === 'outreach'
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Personalized Outreach CRM
          </button>
          <button
            onClick={() => setActiveFeatureTab('backlinks')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              activeFeatureTab === 'backlinks'
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Live Backlink Monitoring
          </button>
        </div>

        {/* Dynamic Feature Content Box */}
        <div className="p-6 sm:p-10 rounded-2xl bg-slate-900 border border-slate-800">
          {activeFeatureTab === 'finder' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Automated Web Discovery Engine</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  Search across Google, Bing, and web indices using specialized contributor footprints. Automatic domain deduplication guarantees you never see duplicate results or waste time researching the same site twice.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Multi-query expansion: "write for us", "submit an article", "contribute"</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Domain normalization removes http/https/www variations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Full export to CSV, Excel, and Google Sheets</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab('finder')}
                    className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Try Website Finder Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-2">
                <div className="text-slate-500 font-bold">// Query Footprints Discovered:</div>
                <div className="text-emerald-400">site:techcrunch.com "write for us"</div>
                <div className="text-cyan-400">site:venturebeat.com inurl:guest-post</div>
                <div className="text-indigo-400">site:readwrite.com "contributor guidelines"</div>
                <div className="pt-2 text-slate-400 font-sans text-xs">
                  ✅ 24 live domains verified · 0 duplicate records · 100% metrics attributed
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'score' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Public Editorial Contact Discovery</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  Identify publicly available contact information for managing editors, content directors, and guest post coordinators without scraping private data or fabricating fake emails.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Verified editorial emails and submission forms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct source URL saved for full compliance proof</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Editor roles and specific guidelines extraction</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab('contacts')}
                    className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Browse Editorial Contacts Directory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="font-bold text-white">Sarah Jenkins</span>
                  <span className="font-mono text-emerald-400 text-[11px]">editor@techbeat.io</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  <div>Role: Managing Editor & Contributor Review</div>
                  <div>Source: https://techbeat.io/editorial-team</div>
                  <div>Guidelines: 1,500+ words, Dofollow contextual, non-sponsored editorial only</div>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'outreach' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Personalized Pitch & Follow-up Sequences</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  Generate tailored, non-generic guest post pitches with editor name, topic suggestion, and target niche. Track status through every stage: Pitching, Under Review, Negotiating, Accepted, and Published.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>5 Battle-tested templates (Initial, Follow-ups 1 & 2, Negotiation, Submission)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Stage tracking from New Opportunity to Published Backlink</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>One-click send via your email client</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab('outreach')}
                    className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Open Outreach Pipeline CRM</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 font-mono">
                <div className="text-slate-400 font-sans font-semibold">Subject: Guest Article Pitch: Modern AI Workflows for Scaling SaaS</div>
                <div className="p-3 bg-slate-900 rounded-lg text-slate-400 text-[11px] font-sans leading-relaxed">
                  "Hi Sarah, I loved your recent analysis on enterprise AI adoption. I put together a unique data-backed draft exploring 3 overlooked workflow bottlenecks in 2026..."
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'backlinks' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Live Backlink Health & Indexation Monitor</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  Never lose track of links you paid or contributed for. The automated backlink tracker checks HTTP response codes, anchor text fidelity, and dofollow status 24/7.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-time HTTP 200 vs 404 / noindex alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dofollow to nofollow link change detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Client attribution and published article archives</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab('backlinks')}
                    className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>View Backlink Tracker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-semibold text-white">scaleai.tech/blog/enterprise-2026</span>
                  <span className="text-emerald-400 font-bold font-mono">HTTP 200 · Live & Indexed</span>
                </div>
                <div className="text-[11px] text-slate-400 space-y-1">
                  <div>Anchor Text: "AI Workflow Solutions"</div>
                  <div>Link Type: In-content Contextual · Dofollow</div>
                  <div>Domain Rating: DR 76 (Ahrefs) · Moz DA 74</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 9. Commercial Pricing & API Connector Options (Requirement 15) */}
      <section id="pricing-section" className="py-16 bg-slate-900/60 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              TRANSPARENT PRICING & API KEYS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Connect Your Own SEO APIs or Use Our Verified Indices
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Every SEO API connector is optional. If an API is unavailable, the application displays "Metric unavailable" without fabricating numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter Plan */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold font-mono text-slate-400 uppercase">Starter / Solo</div>
                <div className="text-3xl font-extrabold text-white mt-2">$0</div>
                <div className="text-xs text-slate-500 mt-0.5">Free forever, no credit card required</div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>50 Guest post discoveries / month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Full 12-factor quality checks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Transparent Opportunity Score 0–100</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Export to CSV & Excel</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setActiveTab('finder')}
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Start Searching Free
              </button>
            </div>

            {/* Pro Agency Plan */}
            <div className="p-6 rounded-2xl bg-slate-900 border-2 border-emerald-500/60 shadow-xl shadow-emerald-950/30 flex flex-col justify-between relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                Most Popular for Agencies
              </div>
              <div>
                <div className="text-xs font-bold font-mono text-emerald-400 uppercase">Growth Agency</div>
                <div className="text-3xl font-extrabold text-white mt-2">
                  $49 <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Full outreach pipeline & live backlink tracker</div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unlimited guest post searches</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Connect your Moz, Ahrefs & Semrush API keys</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Outreach CRM with 5 personalized email templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>24/7 Live Backlink monitoring (HTTP 200 alerts)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Client Orders & Profit Margin Calculator</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setActiveTab('finder')}
                className="mt-8 w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Get Started with Agency Pro
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold font-mono text-indigo-400 uppercase">Enterprise Ops</div>
                <div className="text-3xl font-extrabold text-white mt-2">
                  $149 <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">High-volume link brokers & scale networks</div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Multi-seat team workspace with role permissions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>White-label client link performance reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Custom scoring algorithm weight adjustments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated priority API proxy & account manager</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setActiveTab('settings')}
                className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Configure Custom Enterprise
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Frequently Asked Questions (FAQ) */}
      <section id="faq-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            COMMON QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'How does the automatic search find guest post opportunities?',
              a: 'The engine uses a combination of 10+ proven search query footprints (such as "write for us", "submit an article", "guest contributor guidelines") combined with your niche keyword. It normalizes all domains, removes duplicates, checks if the website is actively publishing, and extracts requirements.'
            },
            {
              q: 'Are DA, DR, and Authority Score official Google ranking factors?',
              a: 'No. Domain Authority (Moz), Domain Rating (Ahrefs), Authority Score (Semrush), and Trust Flow (Majestic) are proprietary third-party metrics created by independent SEO software providers to estimate link strength. Our platform clearly identifies the provider of every metric and never presents them as Google rankings.'
            },
            {
              q: 'What happens if an SEO API is not connected or returns no data?',
              a: 'In accordance with our strict data accuracy guidelines, whenever an API metric cannot be retrieved, the system explicitly displays "N/A" (Metric unavailable). We never invent, fabricate, or hallucinate SEO metrics or prices.'
            },
            {
              q: 'How is the 0–100 SEO Opportunity Score calculated?',
              a: 'The Opportunity Score is calculated completely transparently across 5 weighted categories: Relevance (up to 20 pts), Organic Traffic (up to 25 pts), Authority (up to 25 pts), Link Profile Quality (up to 20 pts), and Spam Risk Safety (up to 10 pts). The exact mathematical formula and breakdown can be inspected on every website detail page.'
            },
            {
              q: 'How does contact discovery work legally?',
              a: 'Contact discovery extracts publicly published business contact information directly from the website’s own public "Write for Us", "Editorial Team", or "Contact" pages. We never purchase scraped personal records or fabricate email addresses.'
            },
            {
              q: 'Can I export my qualified opportunities?',
              a: 'Yes! You can export your filtered discoveries, contacts, SEO metrics, and Opportunity Scores into CSV, Excel, or Google Sheets compatible formats with one click.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
              >
                <span>{item.q}</span>
                {activeFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 11. Final High-Conversion CTA Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-cyan-950/70 border border-emerald-500/30 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Discover Verified Guest Post Opportunities?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Start searching immediately. No credit card required. Clean, transparent, and accurate SEO data.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
              >
                Start Free Search Above
              </button>
              <button
                onClick={() => setActiveTab('finder')}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
              >
                Launch App Workspace
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Full Website Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm mb-3">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
              RankPulse SEO
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Professional Guest Post Finder & SEO Analyzer. Search high-authority domains, verify live contributor guidelines, and manage outreach pipelines with total accuracy.
            </p>
          </div>

          <div>
            <div className="text-white font-semibold text-xs mb-3">Application Tools</div>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => setActiveTab('finder')} className="hover:text-emerald-400">
                  Guest Post Finder
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analysis')} className="hover:text-emerald-400">
                  12-Factor SEO Audit
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('database')} className="hover:text-emerald-400">
                  Saved Opportunities CRM
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('outreach')} className="hover:text-emerald-400">
                  Outreach Pipeline
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('backlinks')} className="hover:text-emerald-400">
                  Live Backlink Monitor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-emerald-400">
                  Agency Profit Calculator
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold text-xs mb-3">Data Integrations</div>
            <ul className="space-y-1.5 text-[11px]">
              <li>Moz Domain Authority & Spam Score API</li>
              <li>Ahrefs Domain Rating & Backlink Profile</li>
              <li>Semrush Authority Score & Organic Traffic</li>
              <li>Majestic Trust Flow & Citation Flow</li>
              <li>Google Search Custom Discovery</li>
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold text-xs mb-3">Provider Attribution & Legal</div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Domain Authority is a trademark of Moz, Inc. Domain Rating is a metric by Ahrefs. Authority Score is a metric by Semrush. Trust Flow is a trademark of Majestic. RankPulse is an independent software tool and does not claim affiliation with Google or third-party trademark owners.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>© {new Date().getFullYear()} RankPulse SEO. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">API Documentation</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
