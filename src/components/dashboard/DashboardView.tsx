import React from 'react';
import { useSeo, NavigationTab } from '../../context/SeoContext';
import {
  calculateOpportunityScore,
  formatCompactNumber,
  formatCurrency
} from '../../utils/seoCalculations';
import {
  Globe,
  TrendingUp,
  Link2,
  DollarSign,
  ArrowRight,
  ExternalLink,
  Send,
  Plus,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  BookmarkCheck,
  Sparkles,
  Layers,
  Settings,
  Flame,
  PieChart
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    websites,
    outreachList,
    backlinksList,
    ordersList,
    setActiveTab,
    setSelectedWebsiteId,
    setDetailModalSite,
    setOutreachModalSite,
    toggleCompare,
    isInCompare,
    setIsAddModalOpen,
    language
  } = useSeo();

  // 1. Metric Calculations for Section 4 Cards
  const totalSitesFound = websites.length;
  const qualifiedSites = websites.filter(
    (s) => s.opportunityStage === 'Qualified' || (s.da && s.da >= 40)
  ).length;
  const highAuthoritySites = websites.filter(
    (s) => (s.da ?? 0) >= 50 || (s.dr ?? 0) >= 50
  ).length;
  const guestPostOpportunities = websites.filter(
    (s) => s.guestPostStatus === 'Confirmed' || s.guestPostStatus === 'Likely'
  ).length;
  const sponsoredOpportunities = websites.filter(
    (s) => s.guestPostType === 'Sponsored' || s.guestPostInfo?.sponsored === 'Sponsored'
  ).length;
  const savedSitesCount = websites.filter(
    (s) => s.opportunityStage && s.opportunityStage !== 'New Opportunities'
  ).length;
  const totalTraffic = websites.reduce((acc, s) => acc + (s.organicTraffic ?? 0), 0);
  const avgTraffic = Math.round(totalTraffic / (websites.length || 1));
  const avgDa = Math.round(websites.reduce((acc, s) => acc + (s.da ?? 0), 0) / (websites.length || 1));
  const avgAs = Math.round(websites.reduce((acc, s) => acc + (s.as ?? 0), 0) / (websites.length || 1));
  const avgDr = Math.round(websites.reduce((acc, s) => acc + (s.dr ?? 0), 0) / (websites.length || 1));

  // Chart 1: Sites discovered over time (monthly trend)
  const discoveryOverTime = [
    { month: 'Nov', count: 18, cumulative: 18 },
    { month: 'Dec', count: 24, cumulative: 42 },
    { month: 'Jan', count: 35, cumulative: 77 },
    { month: 'Feb', count: 48, cumulative: 125 },
    { month: 'Mar', count: 62, cumulative: 187 },
    { month: 'Apr (Current)', count: Math.max(14, websites.length), cumulative: 201 + websites.length }
  ];
  const maxDiscovered = Math.max(...discoveryOverTime.map((d) => d.count));

  // Chart 2: Authority distribution (DA buckets)
  const daBuckets = [
    { label: 'DA 20–39', count: websites.filter((s) => (s.da ?? 0) < 40).length, color: 'bg-indigo-500' },
    { label: 'DA 40–59', count: websites.filter((s) => (s.da ?? 0) >= 40 && (s.da ?? 0) < 60).length, color: 'bg-emerald-400' },
    { label: 'DA 60–79', count: websites.filter((s) => (s.da ?? 0) >= 60 && (s.da ?? 0) < 80).length, color: 'bg-cyan-400' },
    { label: 'DA 80+', count: websites.filter((s) => (s.da ?? 0) >= 80).length, color: 'bg-purple-400' }
  ];

  // Chart 3: Traffic distribution
  const trafficBuckets = [
    { label: '< 10k', count: websites.filter((s) => (s.organicTraffic ?? 0) < 10000).length, color: 'bg-slate-500' },
    { label: '10k – 50k', count: websites.filter((s) => (s.organicTraffic ?? 0) >= 10000 && (s.organicTraffic ?? 0) < 50000).length, color: 'bg-cyan-500' },
    { label: '50k – 100k', count: websites.filter((s) => (s.organicTraffic ?? 0) >= 50000 && (s.organicTraffic ?? 0) < 100000).length, color: 'bg-emerald-400' },
    { label: '100k+', count: websites.filter((s) => (s.organicTraffic ?? 0) >= 100000).length, color: 'bg-amber-400' }
  ];

  // Chart 4: Niche distribution
  const nicheCounts: Record<string, number> = {};
  websites.forEach((s) => {
    nicheCounts[s.niche] = (nicheCounts[s.niche] || 0) + 1;
  });
  const nicheList = Object.entries(nicheCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Chart 5: Guest posting opportunities breakdown
  const statusCounts = [
    { label: 'Confirmed (Write for Us)', count: websites.filter((s) => s.guestPostStatus === 'Confirmed').length, color: 'bg-emerald-400', badge: 'text-emerald-400' },
    { label: 'Likely (Guidelines detected)', count: websites.filter((s) => s.guestPostStatus === 'Likely').length, color: 'bg-cyan-400', badge: 'text-cyan-400' },
    { label: 'Sponsored Options', count: sponsoredOpportunities, color: 'bg-amber-400', badge: 'text-amber-400' },
    { label: 'Under Review / Unclear', count: websites.filter((s) => s.guestPostStatus === 'Unclear' || s.guestPostStatus === 'Not Found').length, color: 'bg-slate-600', badge: 'text-slate-400' }
  ];

  // Top opportunities
  const opportunities = websites
    .map((site) => ({
      site,
      scoreData: calculateOpportunityScore(site)
    }))
    .sort((a, b) => b.scoreData.totalScore - a.scoreData.totalScore)
    .slice(0, 6);

  const workflowSteps: { step: string; tab: NavigationTab; desc: string }[] = [
    { step: '1. Find Website', tab: 'finder', desc: 'Filter by DA, DR, traffic & niche' },
    { step: '2. Analyze Metrics', tab: 'analysis', desc: '12-factor quality check & scores' },
    { step: '3. Compare Options', tab: 'comparison', desc: 'Side-by-side metric matrix' },
    { step: '4. Outreach & Negotiate', tab: 'outreach', desc: 'Pitch templates & follow-ups' },
    { step: '5. Track Backlink', tab: 'backlinks', desc: 'Monitor live index & anchors' },
    { step: '6. Realize Profit', tab: 'calculator', desc: 'Agency margins & client billing' }
  ];

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Welcome & Quick Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            {language === 'ur' ? 'ایس ای او گیسٹ بلاگنگ اور آؤٹ ریچ CRM' : 'SEO Guest Blogging & Research Dashboard'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'ur'
              ? 'مستند ویب سائٹس تلاش کریں، Moz DA، Ahrefs DR، آرگینک ٹریفک کی جانچ کریں، اور پچ سے لے کر لائیو بیک لنک تک پورا عمل ٹریک کریں۔'
              : 'Discover verified guest post publishers, inspect multi-provider SEO metrics, and manage outreach pipelines.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('finder')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
          >
            <span>Find Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Target Domain</span>
          </button>
        </div>
      </div>

      {/* Mandatory Transparent Demo / Sample Data Disclaimer Badge */}
      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
            Demo Data Mode
          </span>
          <span className="text-slate-300">
            Currently displaying sample data benchmarks. Live metrics from Semrush, Ahrefs, Moz, Majestic & DataForSEO can be plugged into Settings.
          </span>
        </div>
        <button
          onClick={() => setActiveTab('settings')}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-medium underline flex items-center gap-1 shrink-0"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Connect SEO API</span>
        </button>
      </div>

      {/* Section 4: All 8 Required Dashboard Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Total Sites Found */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">1. Total Sites Found</span>
            <Globe className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono tabular-nums">
            {totalSitesFound}
          </div>
          <div className="mt-1 text-[11px] text-slate-400 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold">100%</span>
            <span>indexed targets</span>
          </div>
        </div>

        {/* Card 2: Qualified Sites */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">2. Qualified Sites</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono tabular-nums">
            {qualifiedSites}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            <span>DA ≥ 40 & low spam risk</span>
          </div>
        </div>

        {/* Card 3: High Authority Sites */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">3. High Authority Sites</span>
            <Flame className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono tabular-nums">
            {highAuthoritySites}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            <span>DA or DR ≥ 50+</span>
          </div>
        </div>

        {/* Card 4: Guest Post Opportunities */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">4. Guest Post Opps</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono tabular-nums">
            {guestPostOpportunities}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            <span>Verified submission pages</span>
          </div>
        </div>

        {/* Card 5: Sponsored Opportunities */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">5. Sponsored Opps</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono tabular-nums">
            {sponsoredOpportunities}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            <span>Commercial & sponsored</span>
          </div>
        </div>

        {/* Card 6: Saved Sites */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">6. Saved Sites</span>
            <BookmarkCheck className="w-4 h-4 text-teal-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono tabular-nums">
            {savedSitesCount}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            <span>In CRM pipeline stages</span>
          </div>
        </div>

        {/* Card 7: Average Authority Score */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">7. Avg Authority Score</span>
            <BarChart3 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono tabular-nums">
            {avgAs || avgDa} <span className="text-xs font-normal text-slate-400">AS</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            <span>Moz DA: {avgDa} · Ahrefs DR: {avgDr}</span>
          </div>
        </div>

        {/* Card 8: Average Traffic */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">8. Average Traffic</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono tabular-nums">
            {formatCompactNumber(avgTraffic)}
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            <span>Monthly visits per domain</span>
          </div>
        </div>
      </div>

      {/* Section 4: All 5 Required Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart 1: Sites Discovered Over Time */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Chart 1: Sites Discovered Over Time</h3>
              <p className="text-[11px] text-slate-400">Monthly crawler volume & verified contributor detection</p>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              +{discoveryOverTime[discoveryOverTime.length - 1].count} this month
            </span>
          </div>

          <div className="pt-4 flex items-end gap-3 h-40">
            {discoveryOverTime.map((d, idx) => {
              const heightPct = Math.max(16, Math.round((d.count / maxDiscovered) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="text-[10px] text-slate-400 font-mono group-hover:text-emerald-400 transition-colors">
                    {d.count}
                  </div>
                  <div
                    className="w-full bg-emerald-500/30 group-hover:bg-emerald-400 rounded-t transition-all"
                    style={{ height: `${heightPct}%` }}
                  />
                  <div className="text-[10px] text-slate-400 font-mono">{d.month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Authority Distribution */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Chart 2: Authority Distribution</h3>
            <p className="text-[11px] text-slate-400">Distribution of Moz Domain Authority</p>
          </div>

          <div className="space-y-3 pt-1">
            {daBuckets.map((bucket) => {
              const pct = Math.round((bucket.count / (websites.length || 1)) * 100);
              return (
                <div key={bucket.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">{bucket.label}</span>
                    <span className="font-mono text-slate-400">{bucket.count} sites ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className={`${bucket.color} h-full rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 3: Traffic Distribution */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Chart 3: Traffic Distribution</h3>
            <p className="text-[11px] text-slate-400">Monthly organic visitors bracket breakdown</p>
          </div>

          <div className="space-y-3 pt-1">
            {trafficBuckets.map((bucket) => {
              const pct = Math.round((bucket.count / (websites.length || 1)) * 100);
              return (
                <div key={bucket.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">{bucket.label} visits</span>
                    <span className="font-mono text-slate-400">{bucket.count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className={`${bucket.color} h-full rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 4: Niche Distribution */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Chart 4: Niche Distribution</h3>
            <p className="text-[11px] text-slate-400">Top target categories in current search</p>
          </div>

          <div className="space-y-2.5 pt-1 text-xs">
            {nicheList.map(([niche, count]) => {
              const pct = Math.round((count / (websites.length || 1)) * 100);
              return (
                <div key={niche} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white truncate font-medium">{niche}</span>
                    <span className="font-mono text-cyan-400 font-bold">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 5: Guest Posting Opportunities */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Chart 5: Guest Post Opportunities</h3>
            <p className="text-[11px] text-slate-400">Verification statuses across indexed domains</p>
          </div>

          <div className="space-y-3 pt-1 text-xs">
            {statusCounts.map((item) => {
              const pct = Math.round((item.count / (websites.length || 1)) * 100);
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">{item.label}</span>
                    <span className={`font-mono font-bold ${item.badge}`}>{item.count}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Guided SEO Guest Blogging Workflow */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold text-white">
              End-to-End Guest Blogging Workflow
            </h2>
            <p className="text-[11px] text-slate-400">
              Structured pipeline: from prospect discovery to profitable indexed link.
            </p>
          </div>
          <span className="text-xs font-medium text-emerald-400">
            Interactive Roadmap
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
          {workflowSteps.map((ws, i) => (
            <button
              key={ws.step}
              onClick={() => setActiveTab(ws.tab)}
              className="p-3 text-left bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/60 hover:border-emerald-500/40 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-emerald-400">
                  Step 0{i + 1}
                </span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-1 truncate">
                {ws.step.replace(/^\d+\.\s*/, '')}
              </div>
              <div className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {ws.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Top SEO Opportunities + Live Outreach Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: High SEO Opportunity Websites */}
        <div className="lg:col-span-2 rounded-xl bg-slate-900/80 border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Highest SEO Opportunity Targets
              </h2>
              <p className="text-[11px] text-slate-400">
                Ranked by the transparent 0–100 SEO Opportunity Score algorithm.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('database')}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View all {websites.length} sites</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {opportunities.map(({ site, scoreData }) => (
              <div
                key={site.id}
                className="p-3.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white truncate">
                      {site.name}
                    </span>
                    <a
                      href={`https://${site.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-slate-200"
                      title="Open external website"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span>{site.niche}</span>
                    <span aria-hidden="true">·</span>
                    <span>{site.country}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-300">{site.turnaroundTime}</span>
                  </div>

                  {/* SEO Metrics Badges */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs mt-2 text-slate-300 font-mono">
                    <span title="Moz Domain Authority">
                      <span className="text-slate-400 text-[10px]">DA:</span> {site.da}
                    </span>
                    <span aria-hidden="true" className="text-slate-700">|</span>
                    <span title="Ahrefs Domain Rating">
                      <span className="text-slate-400 text-[10px]">DR:</span> {site.dr}
                    </span>
                    <span aria-hidden="true" className="text-slate-700">|</span>
                    <span title="Semrush Authority Score">
                      <span className="text-slate-400 text-[10px]">AS:</span> {site.as}
                    </span>
                    <span aria-hidden="true" className="text-slate-700">|</span>
                    <span title="Monthly Organic Visits">
                      <span className="text-slate-400 text-[10px]">Traffic:</span> {formatCompactNumber(site.organicTraffic)}
                    </span>
                    <span aria-hidden="true" className="text-slate-700">|</span>
                    <span title="Moz Spam Score">
                      <span className="text-slate-400 text-[10px]">Spam:</span> {site.spamScore}%
                    </span>
                  </div>
                </div>

                {/* Score & Actions */}
                <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:self-center shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Opportunity</div>
                    <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums">
                      {scoreData.totalScore}
                      <span className="text-xs font-normal text-slate-400">/100</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setSelectedWebsiteId(site.id);
                        setActiveTab('analysis');
                      }}
                      className="px-2.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-700/80 hover:bg-slate-700 rounded-md transition-colors"
                      title="Inspect 12-factor SEO quality analysis"
                    >
                      Audit
                    </button>
                    <button
                      onClick={() => setDetailModalSite(site)}
                      className="px-2.5 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 rounded-md transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => toggleCompare(site.id)}
                      className={`px-2 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                        isInCompare(site.id)
                          ? 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                      title={isInCompare(site.id) ? 'Remove from compare' : 'Add to compare'}
                    >
                      {isInCompare(site.id) ? '✓ Compare' : '+ Compare'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Active Outreach Funnel & Live Backlink Snapshot */}
        <div className="space-y-6">
          {/* Outreach Pipeline Status */}
          <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Outreach Pipeline</h3>
                <p className="text-[11px] text-slate-400">{outreachList.length} active pitch conversations</p>
              </div>
              <button
                onClick={() => setActiveTab('outreach')}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>CRM</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {outreachList.slice(0, 4).map((outreach) => (
                <div
                  key={outreach.id}
                  className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 truncate">
                      {outreach.websiteName}
                    </span>
                    <span className="font-mono text-[11px] text-emerald-400 font-medium">
                      {outreach.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {outreach.pitchTopic}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-700/40">
                    <span>Contact: {outreach.contactPerson}</span>
                    <span className="font-mono text-slate-300">
                      {outreach.agreedPrice > 0 ? formatCurrency(outreach.agreedPrice) : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                if (websites.length > 0) {
                  setOutreachModalSite(websites[0]);
                }
              }}
              className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span>Draft New Pitch</span>
            </button>
          </div>

          {/* Quick Third-Party Disclaimer Banner */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
            <span className="text-white font-semibold">Important SEO Principle:</span> Moz DA, Ahrefs DR, Semrush AS, and Majestic TF/CF are <strong className="text-slate-300 font-medium">third-party comparative metrics</strong>, not official Google ranking factors. RankPulse helps you evaluate multiple real signals (traffic, link ratios, indexation) to prevent single-metric bias.
          </div>
        </div>
      </div>
    </div>
  );
};
