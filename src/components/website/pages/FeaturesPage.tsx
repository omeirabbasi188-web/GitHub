import React from 'react';
import { useSeo, NavigationTab } from '../../../context/SeoContext';
import {
  Search,
  BarChart3,
  ShieldCheck,
  Send,
  Link2,
  Database,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Users,
  Layers,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';

interface FeaturesPageProps {
  onNavigate: (page: NavigationTab) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate }) => {
  const { navigateToApp } = useSeo();

  const featureSections = [
    {
      id: 'automated-discovery',
      title: 'Automated Guest Post Discovery Engine',
      subtitle: 'Scan and identify niche-relevant contributor pages without manual Google footprint searching.',
      image: '/src/assets/images/feature_guestpost_engine_1790959742242.jpg',
      alt: 'Automated guest post search engine scanning write-for-us pages',
      points: [
        'Executes 9 verified search patterns: "write for us", "guest post", "contribute", "submit an article", "editorial guidelines".',
        'Automatic domain normalization and deduplication eliminates redundant URLs.',
        'Target country, language, and niche filtering across 15+ industry verticals.',
        'Real-time crawling extracts published contributor guidelines and submission endpoints.'
      ],
      actionTab: 'finder' as NavigationTab,
      actionText: 'Launch Discovery Engine'
    },
    {
      id: 'seo-metrics',
      title: 'Multi-Provider SEO Metrics Architecture',
      subtitle: 'Authoritative data bridges directly citing Moz, Ahrefs, Semrush, and Majestic.',
      image: '/src/assets/images/feature_seo_metrics_1790959756314.jpg',
      alt: 'Multi-provider SEO authority metrics visualization',
      points: [
        'Domain Authority (Moz DA) and Page Authority (PA) with spam score safeguards.',
        'Domain Rating (Ahrefs DR) and referring domain volume metrics.',
        'Authority Score (Semrush AS) and organic monthly search traffic estimates.',
        'Transparent provider labeling ensures zero fabricated or hallucinated numbers.'
      ],
      actionTab: 'results' as NavigationTab,
      actionText: 'Inspect Master Table'
    },
    {
      id: 'quality-audit',
      title: '12-Factor Quality & Opportunity Evaluation',
      subtitle: 'Transparent, unweighted or custom-weighted scoring breakdown from 0 to 100.',
      image: null,
      points: [
        'Relevance scoring (20 pts): Contextual niche matching and active contributor page presence.',
        'Traffic strength (25 pts): Monthly organic search visitor tiers based on Semrush estimates.',
        'Authority signals (25 pts): Balanced average of Moz DA, Ahrefs DR, and Semrush AS.',
        'Link profile quality (20 pts): Dofollow vs nofollow ratio, contextual in-body placement, and referring domains.',
        'Spam risk safety (10 pts): Moz spam penalty analysis and low-quality PBN detection.'
      ],
      actionTab: 'analysis' as NavigationTab,
      actionText: 'Run 12-Factor Analysis'
    },
    {
      id: 'outreach-crm',
      title: 'Integrated Outreach Pipeline & Personalized Pitcher',
      subtitle: 'Transform verified prospect domains into published contextual backlinks.',
      image: null,
      points: [
        'Personalized email generator incorporates target editor name, website niche, and guidelines.',
        '5 tailored email templates: Initial Pitch, Follow-up 1, Follow-up 2, Price Negotiation, Article Submission.',
        'Follow-up date tracking and overdue reminder notifications.',
        'Stage tracking from Initial Pitching to Live Publication and Invoicing.'
      ],
      actionTab: 'outreach' as NavigationTab,
      actionText: 'Open Outreach CRM'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-10 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Enterprise Toolset</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Engineered for High-ROI SEO Outreach
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Every tool, metric dial, and CRM pipeline component designed specifically for digital agencies, in-house SEO teams, and link builders.
        </p>
      </div>

      {/* Feature Deep Dives */}
      <div className="space-y-16">
        {featureSections.map((feature, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={feature.id}
              className={`flex flex-col lg:flex-row items-center gap-10 p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Media Container */}
              <div className="w-full lg:w-1/2">
                {feature.image ? (
                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl group">
                    <img
                      src={feature.image}
                      alt={feature.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover max-h-[360px] group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl border border-slate-800 bg-slate-950 space-y-4 shadow-xl">
                    <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono">
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">Interactive Sandbox Feature</div>
                        <div className="text-xs text-slate-400">Live within the application workspace</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-300">Live API Attributions</span>
                        <span className="text-emerald-400 font-mono font-semibold">Moz / Ahrefs / Semrush</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-300">Opportunity Score Range</span>
                        <span className="text-cyan-400 font-mono font-semibold">0–100 Transparent Proof</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-300">Campaign Management</span>
                        <span className="text-purple-400 font-mono font-semibold">7-Stage Kanban Board</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Description */}
              <div className="w-full lg:w-1/2 space-y-5">
                <div className="space-y-2">
                  <div className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                    Feature 0{idx + 1}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {feature.title}
                  </h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feature.subtitle}
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  {feature.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <button
                    onClick={() => navigateToApp(feature.actionTab)}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95"
                  >
                    <span>{feature.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Experience All Features in the Workspace</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Test the automated discovery engine, check verified evidence, generate pitches, and monitor backlinks with our pre-populated verified dataset.
        </p>
        <button
          onClick={() => navigateToApp('finder')}
          className="px-6 py-3 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg transition-all"
        >
          Open Application Dashboard →
        </button>
      </div>
    </div>
  );
};
