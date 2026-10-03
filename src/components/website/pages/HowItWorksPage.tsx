import React, { useState } from 'react';
import { useSeo, NavigationTab } from '../../../context/SeoContext';
import {
  Search,
  Filter,
  Layers,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Send,
  Link2,
  CheckCircle2,
  Cpu,
  FileCheck2,
  TrendingUp,
  Database
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (page: NavigationTab) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const { navigateToApp } = useSeo();
  const [selectedEngineStep, setSelectedEngineStep] = useState<number>(0);

  const seventeenSteps = [
    { num: '01', title: 'User Enters Niche', desc: 'Select or input target vertical (AI, SaaS, Technology, Finance, Travel, Health).' },
    { num: '02', title: 'Query Generator', desc: 'Synthesizes targeted boolean operators like "write for us" + [keyword] and "submit article".' },
    { num: '03', title: 'Web Discovery', desc: 'Queries search index APIs across Google and Bing compatible endpoints.' },
    { num: '04', title: 'Domain Extraction', desc: 'Parses raw URL candidates and extracts host root domain identities.' },
    { num: '05', title: 'Deduplication', desc: 'Normalizes subdomains and discards duplicate domains.' },
    { num: '06', title: 'Evidence Verification', desc: 'Crawls host page looking for active contributor guidelines, submission forms, and rules.' },
    { num: '07', title: 'Status Classification', desc: 'Labels opportunity as Confirmed, Likely, Unclear, or Not Found based on evidence.' },
    { num: '08', title: 'SEO API Bridges', desc: 'Queries Moz (DA), Ahrefs (DR), Semrush (AS), and Majestic (TF/CF) APIs.' },
    { num: '09', title: 'Traffic Estimation', desc: 'Records estimated monthly organic search visitors and top country distributions.' },
    { num: '10', title: 'Link Profile Analysis', desc: 'Audits dofollow vs nofollow allowances, contextual body placement, and referring domains.' },
    { num: '11', title: 'Spam Risk Check', desc: 'Evaluates Moz spam score and low-quality PBN network warning signs.' },
    { num: '12', title: 'Guideline Extraction', desc: 'Extracts minimum word count, turnaround times, and editorial fee structures.' },
    { num: '13', title: 'Contact Discovery', desc: 'Finds verified public editorial emails, managing editor names, and contact forms.' },
    { num: '14', title: 'Score Calculation', desc: 'Computes transparent 0–100 SEO Opportunity Score with step-by-step mathematical proof.' },
    { num: '15', title: 'Results Presentation', desc: 'Populates sortable 16-column matrix with badges, tags, and quick-pitch triggers.' },
    { num: '16', title: 'Pipeline Qualification', desc: 'User filters, compares, and saves high-value prospects to Kanban campaigns.' },
    { num: '17', title: 'Targeted Outreach', desc: 'User drafts personalized pitches with 5 email templates and schedules follow-up reminders.' }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-10 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span>System Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          How the 17-Step Discovery Engine Works
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          An end-to-end automated workflow that transforms a single niche keyword into qualified, verified guest posting partnerships.
        </p>
      </div>

      {/* High-Level 6-Step Visual Diagram */}
      <div className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-semibold text-emerald-400 tracking-wider">THE 6 CORE STAGES</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">High-Level User Journey</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { step: '01', title: 'Enter Target Niche', desc: 'Input your industry keyword and define quality thresholds (DA 40+, Traffic 10k+, Dofollow only).' },
            { step: '02', title: 'Automatic Web Crawl', desc: 'RankPulse searches the web across multiple footprints and deduplicates domains automatically.' },
            { step: '03', title: 'SEO Metric Gathering', desc: 'Fetches legitimate third-party authority metrics from Moz, Ahrefs, Semrush, and Majestic.' },
            { step: '04', title: 'Evidence & Guideline Check', desc: 'Verifies contributor guidelines, detects fees, turnaround times, and extracts contact emails.' },
            { step: '05', title: 'Score & Save to CRM', desc: 'Evaluates the transparent 0–100 Opportunity Score and organizes targets into Kanban campaigns.' },
            { step: '06', title: 'Personalized Outreach', desc: 'Generates customized email pitches matching the publisher’s requirements and tracks live backlinks.' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 rounded">
                  STAGE {item.step}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </div>
              <h3 className="text-base font-bold text-white pt-1">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 17-Step Technical Engine Deep Dive */}
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <span className="text-xs font-semibold text-cyan-400 tracking-wider">UNDER THE HOOD</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Detailed 17-Step Autonomous Processing Sequence
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any step to inspect the exact processing logic and data transformations.
            </p>
          </div>
          <button
            onClick={() => navigateToApp('finder')}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all whitespace-nowrap self-start md:self-auto"
          >
            Run Live Engine →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {seventeenSteps.map((step, idx) => {
            const isSelected = selectedEngineStep === idx;
            return (
              <div
                key={step.num}
                onClick={() => setSelectedEngineStep(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500/50 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400">{step.num}</span>
                  {isSelected && (
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.2 rounded">
                      Selected
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Step Explanation Banner */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-white">Active Step {seventeenSteps[selectedEngineStep].num}: {seventeenSteps[selectedEngineStep].title}</span>
            <p className="text-slate-400 mt-0.5">{seventeenSteps[selectedEngineStep].desc}</p>
          </div>
          <button
            onClick={() => navigateToApp('finder')}
            className="text-emerald-400 hover:underline font-semibold whitespace-nowrap shrink-0"
          >
            Launch in Workspace →
          </button>
        </div>
      </div>
    </div>
  );
};
