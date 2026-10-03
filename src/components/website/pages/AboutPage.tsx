import React from 'react';
import { NavigationTab } from '../../../context/SeoContext';
import {
  ShieldCheck,
  Award,
  Layers,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: NavigationTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 py-10 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Our Engineering Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Prioritizing Accuracy Over Quantity in SEO Outreach
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Why we built RankPulse: The SEO industry was broken by dirty spreadsheets, fake domain metrics, and unverified contributor claims.
        </p>
      </div>

      {/* The Problem & Our Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
            The Industry Problem
          </div>
          <h3 className="text-lg font-bold text-white">The Cost of Blind Outreach</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Link builders traditionally buy opaque lists of "1,000 guest post sites" only to discover that 60% are abandoned PBNs, 25% have closed submissions, and the metrics were scraped two years ago. Sending pitches to stale lists damages sender reputation and wastes hundreds of hours.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-emerald-500/30 space-y-4">
          <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            The RankPulse Standard
          </div>
          <h3 className="text-lg font-bold text-white">Verifiable Proof First</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            RankPulse operates on a zero-hallucination policy. We check for active contributor guidelines, extract real submission endpoints, cite the exact source URL, and clearly attribute Moz DA, Ahrefs DR, Semrush AS, and Majestic metrics to their legitimate providers.
          </p>
        </div>
      </div>

      {/* 4 Core Guarantees */}
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-white text-center">Our 4 Core Operating Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>1. Zero Fabricated Metrics</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              If an API metric cannot be fetched, we explicitly show "N/A" or "Demo Data" instead of inventing fake authority numbers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>2. Evidence-Backed Opportunities</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A domain is never labeled as accepting guest posts without an actual live contributor or submission page to back it up.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>3. Transparent Mathematical Scoring</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our 0–100 Opportunity Score displays the exact point calculations across Relevance, Traffic, Authority, Link Profile, and Risk.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>4. Respectful Public Crawling</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              We respect robots.txt, adhere to reasonable rate limits, and never bypass paywalls or access controls.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership & Contact prompt */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Have questions about our data architecture?</h3>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-2.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all inline-flex items-center gap-2"
        >
          <span>Contact Our Engineering Team</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
