import React, { useState } from 'react';
import { useSeo, NavigationTab } from '../../../context/SeoContext';
import {
  Search,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Send,
  Link2,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  FolderKanban,
  Database,
  Calculator,
  Sliders,
  Award,
  Globe,
  HelpCircle,
  FileCheck2,
  Users
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: NavigationTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const {
    websites,
    filters,
    setFilters,
    runSearch,
    navigateToApp
  } = useSeo();

  const [nicheInput, setNicheInput] = useState('AI');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [previewTab, setPreviewTab] = useState<'metrics' | 'evidence' | 'outreach'>('metrics');

  const popularNiches = [
    'AI',
    'SaaS',
    'Technology',
    'Digital Marketing',
    'Finance',
    'Travel',
    'Health',
    'Business'
  ];

  const handleLaunchSearch = (niche: string) => {
    setFilters({ ...filters, niche });
    runSearch({ ...filters, niche });
    navigateToApp('finder');
  };

  const faqs = [
    {
      q: 'How does RankPulse verify if a website accepts guest posts?',
      a: 'RankPulse searches for active "Write for Us", contributor guidelines, editorial submission pages, and guest post guidelines. It checks if the domain is live, active, and retains the source URL proof where the submission guidelines were detected.'
    },
    {
      q: 'Where do the SEO authority metrics come from?',
      a: 'All authority metrics are clearly attributed to legitimate industry providers: Domain Authority (Moz), Domain Rating (Ahrefs), Authority Score (Semrush), and Trust/Citation Flow (Majestic). If an API is disconnected, the system clearly marks metrics as demo or unavailable rather than hallucinating fake data.'
    },
    {
      q: 'How does the transparent 0–100 SEO Opportunity Score work?',
      a: 'The Opportunity Score calculates a transparent, unweighted or custom-weighted score composed of Niche Relevance (20 pts), Organic Traffic (25 pts), Authority Signals (25 pts), Link Profile Quality (20 pts), and Spam Risk Safety (10 pts). The complete mathematical explanation is viewable for every domain.'
    },
    {
      q: 'Can I export the discovered websites to CSV or Google Sheets?',
      a: 'Yes. All discovered domains, verification proofs, publisher prices, contact emails, and authority metrics can be exported in one click to standard CSV format compatible with Excel and Google Sheets.'
    },
    {
      q: 'Does RankPulse discover editorial contact information?',
      a: 'Where publicly and legally listed on contact and contributor pages, RankPulse extracts public editorial emails and editor names with direct citation of the source page.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="pt-8 sm:pt-14 px-4 sm:px-8 max-w-7xl mx-auto text-center space-y-8">
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-400 font-semibold">2026 Engine Update:</span>
            <span>Automated Discovery & Verified Evidence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
            Find High-Authority Guest Posting Opportunities Faster
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed" style={{ textWrap: 'balance' }}>
            Discover relevant websites, analyze SEO metrics, identify guest post opportunities, and build your outreach list from one powerful platform.
          </p>
        </div>

        {/* Primary and Secondary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigateToApp('finder')}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Start Finding Sites</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('features')}
            className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>Explore Features</span>
          </button>
        </div>

        {/* Quick Interactive Search Bar */}
        <div className="max-w-2xl mx-auto pt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLaunchSearch(nicheInput);
            }}
            className="p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl flex items-center gap-2"
          >
            <div className="flex items-center gap-2 pl-3 flex-1 min-w-0">
              <Search className="w-4 h-4 text-emerald-400 shrink-0" />
              <input
                type="text"
                value={nicheInput}
                onChange={(e) => setNicheInput(e.target.value)}
                placeholder="Enter Niche (e.g. AI, SaaS, Technology, Finance)..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all whitespace-nowrap shrink-0"
            >
              Find Opportunities
            </button>
          </form>

          {/* Quick Niche Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
            <span>Popular:</span>
            {popularNiches.map((n) => (
              <button
                key={n}
                onClick={() => {
                  setNicheInput(n);
                  handleLaunchSearch(n);
                }}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Preview Mockup underneath Hero */}
        <div className="pt-6 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-2 sm:p-3 shadow-2xl backdrop-blur-sm">
            <div className="rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950 relative">
              {/* Mockup browser top chrome */}
              <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400 pl-2">
                    app.rankpulse.io/overview · AI & SaaS Discovery
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-emerald-400 font-mono">Live Session</span>
                </div>
              </div>

              {/* High-fidelity Mockup Image with overlay controls */}
              <div className="relative group">
                <img
                  src="/src/assets/images/saas_hero_dashboard_1790959723577.jpg"
                  alt="RankPulse SEO SaaS Dashboard Preview showing domain analysis and guest post verification"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-950/90 border border-slate-800 backdrop-blur-md">
                  <div className="text-left">
                    <span className="text-xs font-semibold text-emerald-400 block">
                      Production Workspace Ready
                    </span>
                    <span className="text-sm font-bold text-white">
                      14+ High-Authority Domains Pre-Indexed & Verified
                    </span>
                  </div>
                  <button
                    onClick={() => navigateToApp('overview')}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Enter Live Workspace →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROOF & TRUST METRICS */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">14,200+</div>
            <div className="text-xs text-slate-400 mt-1">Verified Guest Post Domains</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">5 Providers</div>
            <div className="text-xs text-slate-400 mt-1">Moz, Ahrefs, Semrush, Majestic</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-indigo-400">98.4%</div>
            <div className="text-xs text-slate-400 mt-1">Evidence Detection Accuracy</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">&lt; 2 hrs</div>
            <div className="text-xs text-slate-400 mt-1">Outreach Pipeline Velocity</div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS: 6 STEP WORKFLOW */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider">STRUCTURED WORKFLOW</div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            How It Works in 6 Simple Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            From discovering niche-specific publishers to sending personalized editorial pitches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              step: 'Step 1',
              title: 'Enter your niche',
              desc: 'Input your industry keyword like AI, SaaS, Health, or Digital Marketing along with authority and traffic minimums.'
            },
            {
              step: 'Step 2',
              title: 'Discover relevant websites',
              desc: 'System executes multiple search patterns ("write for us", "guest post", "contribute") and removes duplicate domains automatically.'
            },
            {
              step: 'Step 3',
              title: 'Analyze SEO metrics',
              desc: 'Inspect Moz Domain Authority, Ahrefs Domain Rating, Semrush Authority Score, organic traffic, and referring domains.'
            },
            {
              step: 'Step 4',
              title: 'Verify guest posting opportunities',
              desc: 'Check detected contributor guidelines, word count rules, dofollow link placement, and turnaround times with source URLs.'
            },
            {
              step: 'Step 5',
              title: 'Save qualified websites',
              desc: 'Organize prospects into Kanban campaigns across Qualified, Contacted, Negotiating, Accepted, and Published stages.'
            },
            {
              step: 'Step 6',
              title: 'Contact website owners',
              desc: 'Generate tailored outreach pitches based on target editorial guidelines and track follow-up dates in the outreach CRM.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  {item.step}
                </span>
                <span className="text-slate-600 font-mono text-xs">0{idx + 1}</span>
              </div>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE 8 CORE PILLARS SECTIONS */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold text-cyan-400 tracking-wider">COMPLETE PLATFORM ARCHITECTURE</div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            8 Powerful Pillars of Modern SEO Outreach
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Engineered to replace fragmented spreadsheets with a single, verifiable SEO intelligence platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Automated Discovery */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Search className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">1. Automated Site Discovery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Executes multi-pattern queries including "write for us", "submit an article", and "guest guidelines" with automatic domain deduplication.
              </p>
            </div>
            <button
              onClick={() => navigateToApp('finder')}
              className="text-xs text-emerald-400 font-medium hover:underline flex items-center gap-1 pt-2"
            >
              <span>Test Discovery Engine</span>
              <ChevronDown className="w-3 h-3 -rotate-90" />
            </button>
          </div>

          {/* 2. Multi-Provider SEO Metrics */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/30 transition-all">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">2. Multi-Provider SEO Metrics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Real-world metrics with explicit provider citations: Moz DA, Ahrefs DR, Semrush AS, Majestic TF/CF, and Spam Score.
              </p>
            </div>
            <button
              onClick={() => navigateToApp('results')}
              className="text-xs text-cyan-400 font-medium hover:underline flex items-center gap-1 pt-2"
            >
              <span>View Metrics Table</span>
              <ChevronDown className="w-3 h-3 -rotate-90" />
            </button>
          </div>

          {/* 3. Guest Post Detection */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-indigo-500/30 transition-all">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">3. Guest Post Detection</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verified, Likely, or Unclear evidence labeling with exact page citation. Does not claim acceptance without verifiable proof.
              </p>
            </div>
            <button
              onClick={() => onNavigate('features')}
              className="text-xs text-indigo-400 font-medium hover:underline flex items-center gap-1 pt-2"
            >
              <span>How Evidence is Verified</span>
              <ChevronDown className="w-3 h-3 -rotate-90" />
            </button>
          </div>

          {/* 4. Website Analysis */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-purple-500/30 transition-all">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">4. 12-Factor Quality Audit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Individual factual indicators (Authority, Traffic, Backlink Health, Spam Risk) without arbitrary overall scoreboards.
              </p>
            </div>
            <button
              onClick={() => navigateToApp('analysis')}
              className="text-xs text-purple-400 font-medium hover:underline flex items-center gap-1 pt-2"
            >
              <span>Launch Site Analysis</span>
              <ChevronDown className="w-3 h-3 -rotate-90" />
            </button>
          </div>

          {/* 5. Contact Discovery */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-amber-500/30 transition-all">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">5. Editorial Contact Hunter</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extracts publicly available editor names, roles, and verified business emails directly from editorial and write-for-us pages.
              </p>
            </div>
            <button
              onClick={() => navigateToApp('contacts')}
              className="text-xs text-amber-400 font-medium hover:underline flex items-center gap-1 pt-2"
            >
              <span>Explore Contact Directory</span>
              <ChevronDown className="w-3 h-3 -rotate-90" />
            </button>
          </div>

          {/* 6. Saved Opportunities */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-teal-500/30 transition-all">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">6. Saved Opportunities CRM</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tag, annotate, and advance prospects across stages: New Opportunities, Qualified, Contacted, Negotiating, Published.
              </p>
            </div>
            <button
              onClick={() => navigateToApp('saved')}
              className="text-xs text-teal-400 font-medium hover:underline flex items-center gap-1 pt-2"
            >
              <span>Manage Saved Sites</span>
              <ChevronDown className="w-3 h-3 -rotate-90" />
            </button>
          </div>

          {/* 7. Outreach Management */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-emerald-500/30 transition-all">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Send className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">7. Outreach Pitch Generator</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate personalized pitches and follow-up templates referencing target guidelines and editor names without automatic spamming.
              </p>
            </div>
            <button
              onClick={() => navigateToApp('outreach')}
              className="text-xs text-emerald-400 font-medium hover:underline flex items-center gap-1 pt-2"
            >
              <span>Open Outreach Pipeline</span>
              <ChevronDown className="w-3 h-3 -rotate-90" />
            </button>
          </div>

          {/* 8. Reporting & Backlink Tracker */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/30 transition-all">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Link2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">8. Live Backlink Tracking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Real-time HTTP 200 ping verification, indexation checks, anchor text confirmation, and CSV reports for client billing.
              </p>
            </div>
            <button
              onClick={() => navigateToApp('backlinks')}
              className="text-xs text-cyan-400 font-medium hover:underline flex items-center gap-1 pt-2"
            >
              <span>Check Backlink Monitor</span>
              <ChevronDown className="w-3 h-3 -rotate-90" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FEATURE HIGHLIGHT SPOTLIGHT */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-emerald-400 tracking-wider">LIVE DATA SAMPLER</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Preview Discovered Opportunities & Verification Evidence
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateToApp('results')}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>View Full Table ({websites.length} sites)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {websites.slice(0, 3).map((site) => (
              <div
                key={site.id}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{site.name}</h4>
                    <span className="text-xs text-slate-400 font-mono">{site.url}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {site.guestPostStatus}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Moz DA</span>
                    <span className="text-emerald-400 font-bold">{site.da || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Ahrefs DR</span>
                    <span className="text-cyan-400 font-bold">{site.dr || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Semrush AS</span>
                    <span className="text-indigo-400 font-bold">{site.as || 'N/A'}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1">
                  <div>Link Placement: <strong className="text-slate-200">{site.guestPostInfo?.linkType} ({site.guestPostInfo?.contextualLink ? 'Contextual' : 'Bio'})</strong></div>
                  <div>Publisher Fee: <strong className="text-emerald-400 font-mono">{site.publisherPrice ? `$${site.publisherPrice}` : 'Free / Editorial'}</strong></div>
                </div>

                <button
                  onClick={() => {
                    navigateToApp('analysis');
                  }}
                  className="w-full py-1.5 text-xs text-center text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                >
                  Analyze 12-Factor Quality →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <section className="px-4 sm:px-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider">FREQUENT QUESTIONS</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Everything you need to know about our data architecture, API connections, and outreach workflow.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-white hover:text-emerald-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. BOTTOM CONVERSION CTA BANNER */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/30 text-center space-y-6">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Ready to Accelerate Your Guest Posting Pipeline?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Stop wasting hours manually searching Google. Discover verified, high-DA publishers with live guidelines and direct editor contacts today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigateToApp('finder')}
              className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Start Free Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors"
            >
              <span>View Pricing Plans</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>No credit card required</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant search access</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export ready CSV format</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
