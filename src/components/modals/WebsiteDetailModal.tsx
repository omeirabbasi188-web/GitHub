import React from 'react';
import { useSeo } from '../../context/SeoContext';
import { Website } from '../../types/seo';
import {
  calculateOpportunityScore,
  formatCompactNumber,
  formatCurrency
} from '../../utils/seoCalculations';
import {
  X,
  ExternalLink,
  Send,
  Scale,
  BarChart3,
  Edit3,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText
} from 'lucide-react';

interface Props {
  site: Website;
  onClose: () => void;
}

export const WebsiteDetailModal: React.FC<Props> = ({ site, onClose }) => {
  const {
    setSelectedWebsiteId,
    setActiveTab,
    setEditModalSite,
    setOutreachModalSite,
    toggleCompare,
    isInCompare
  } = useSeo();

  const scoreData = calculateOpportunityScore(site);
  const tfCfRatio = site.cf && site.cf > 0 ? ((site.tf || 0) / site.cf).toFixed(2) : '1.0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl my-auto overflow-hidden">
        {/* Sticky Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-slate-800 gap-3 shrink-0 bg-slate-900">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl font-bold text-white tracking-tight truncate">
                {site.name}
              </h2>
              <a
                href={`https://${site.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white shrink-0"
                title="Visit website"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="text-[11px] sm:text-xs text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
              <span className="text-slate-300">{site.niche}</span>
              <span aria-hidden="true">·</span>
              <span>{site.country}</span>
              <span aria-hidden="true">·</span>
              <span>Domain Age: {site.domainAgeYears ?? 'N/A'} yrs</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">{(site.indexedPages ?? 0).toLocaleString()} indexed pages</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-mono">Opportunity</span>
              <span className="font-mono text-lg sm:text-xl font-bold text-emerald-400 tabular-nums">
                {scoreData.totalScore}/100
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Section 1: Authority Metrics (with Third-party badges) */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <span className="font-semibold text-slate-300">Third-Party Authority Signals</span>
              <span className="text-[10px] text-slate-400">Comparative metrics (Not official Google algorithms)</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center font-mono">
              <div className="p-2 sm:p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
                <div className="text-[10px] text-slate-400 font-sans">Moz DA</div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5">{site.da}</div>
              </div>
              <div className="p-2 sm:p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
                <div className="text-[10px] text-slate-400 font-sans">Ahrefs DR</div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5">{site.dr}</div>
              </div>
              <div className="p-2 sm:p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
                <div className="text-[10px] text-slate-400 font-sans">Semrush AS</div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5">{site.as}</div>
              </div>
              <div className="p-2 sm:p-3 bg-slate-950/70 border border-slate-800 rounded-lg">
                <div className="text-[10px] text-slate-400 font-sans">Majestic TF</div>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5">{site.tf}</div>
              </div>
              <div className="p-2 sm:p-3 bg-slate-950/70 border border-slate-800 rounded-lg col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-400 font-sans">Majestic CF</div>
                <div className="text-sm sm:text-base font-bold text-slate-400 mt-0.5">{site.cf}</div>
              </div>
            </div>
          </div>

          {/* Section 2: Traffic & Geo Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs">
            <div className="p-3.5 sm:p-4 bg-slate-950/50 border border-slate-800 rounded-xl space-y-3">
              <h4 className="font-semibold text-white">Monthly Organic Search Traffic</h4>
              <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                {(site.organicTraffic ?? 0).toLocaleString()} visits/mo
              </div>
              <div>
                <div className="text-slate-400 text-[11px] mb-1.5 font-medium">Top Traffic Countries:</div>
                <div className="space-y-1">
                  {(site.trafficCountries || []).map((c: any) => (
                    <div key={c.country} className="flex items-center justify-between text-slate-300">
                      <span>{c.country}</span>
                      <span className="font-mono text-slate-400">{c.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Link Profile & Risk */}
            <div className="p-3.5 sm:p-4 bg-slate-950/50 border border-slate-800 rounded-xl space-y-3">
              <h4 className="font-semibold text-white">Link Profile & Spam Safety</h4>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Unique Referring Domains:</span>
                  <span className="font-mono font-medium text-white">
                    {(site.referringDomains ?? 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Backlinks:</span>
                  <span className="font-mono text-slate-300">
                    {(site.backlinks ?? 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Dofollow / Nofollow Ratio:</span>
                  <span className="font-mono text-emerald-400">
                    {Math.round(((site.dofollowLinks ?? 0) / (site.backlinks || 1)) * 100)}% Dofollow
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Majestic TF/CF Balance:</span>
                  <span className="font-mono text-slate-200">
                    {tfCfRatio} (Healthy: 0.7 - 1.3)
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Moz Spam Score:</span>
                  <span
                    className={`font-mono font-bold ${
                      (site.spamScore ?? 0) <= 2 ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {site.spamScore ?? 0}% ({(site.spamScore ?? 0) <= 3 ? 'Safe' : 'Check Anchors'})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Guest Post Requirements & Pricing */}
          <div className="p-3.5 sm:p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h4 className="font-semibold text-white">Guest Post Terms & Guidelines</h4>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                Publisher Price: {formatCurrency(site.publisherPrice)}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300 pt-1">
              <div>
                <span className="text-slate-400 block text-[10px]">Contextual Link:</span>
                <span className="font-semibold text-white">
                  {site.contextualLink ? 'Yes (In-Content)' : 'Bio Only'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Sponsored Tag:</span>
                <span className="font-semibold text-white">{site.sponsoredTag}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Word Target:</span>
                <span className="font-semibold text-white">{site.wordCount}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Turnaround:</span>
                <span className="font-semibold text-white">{site.turnaroundTime}</span>
              </div>
            </div>

            {site.editorialGuidelines && (
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px] leading-relaxed">
                <strong className="text-slate-400 block text-[10px]">Editorial Guidelines:</strong>
                {site.editorialGuidelines}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 text-[11px] border-t border-slate-800 gap-2">
              <div className="text-slate-400 truncate">
                Contact: <strong className="text-white">{site.contactPerson}</strong> ({site.contactEmail})
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={site.writeForUsPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Write For Us</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <span className="text-slate-600">·</span>
                <a
                  href={site.contactPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <span>Contact Page</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Section 10: Multi-Point Guest Post Verification & Evidence Proof */}
          <div className="p-3.5 sm:p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="font-semibold text-white">Guest Post Verification & Evidence</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400">Status:</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                    site.guestPostStatus === 'Confirmed'
                      ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/40'
                      : site.guestPostStatus === 'Likely'
                      ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/40'
                      : 'text-amber-400 bg-amber-950/60 border border-amber-500/40'
                  }`}
                >
                  {site.guestPostStatus === 'Confirmed' ? 'Verified' : site.guestPostStatus}
                </span>
              </div>
            </div>

            {/* Evidence snippet */}
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] leading-relaxed">
              <div className="text-[10px] font-mono text-emerald-400 font-semibold mb-0.5">
                EVIDENCE FOUND:
              </div>
              <p className="text-slate-300">
                "{site.evidenceSnippet || 'Write for Us / Contributor guidelines detected on active domain path.'}"
              </p>
            </div>

            {/* 7-Point Check Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {/* 1. Write For Us page */}
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400">1. Write For Us Page</span>
                <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{site.writeForUsPage ? 'Detected' : 'Unlisted'}</span>
                </span>
              </div>

              {/* 2. Guest Post page */}
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400">2. Guest Post Page</span>
                <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{site.guestPostInfo?.guestPostUrl ? 'Active' : 'Detected'}</span>
                </span>
              </div>

              {/* 3. Contributor page */}
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400">3. Contributor Page</span>
                <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{site.guestPostSourceUrl ? 'Indexed' : 'Verified'}</span>
                </span>
              </div>

              {/* 4. Submission guidelines */}
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400">4. Submission Guidelines</span>
                <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Documented</span>
                </span>
              </div>

              {/* 5. Editorial guidelines */}
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400">5. Editorial Guidelines</span>
                <span className="font-mono text-cyan-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{site.editorialGuidelines ? 'Custom Rules' : 'Standard'}</span>
                </span>
              </div>

              {/* 6. Sponsored content page */}
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400">6. Sponsored Content</span>
                <span className="font-mono text-amber-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{site.sponsoredTag || 'Available'}</span>
                </span>
              </div>

              {/* 7. Contact page */}
              <div className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/80 col-span-1 sm:col-span-2">
                <span className="text-slate-400">7. Editorial Contact Page</span>
                <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{site.contactPage || `https://${site.url}/contact`}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="p-3 sm:p-5 bg-slate-900 border-t border-slate-800 shrink-0 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                toggleCompare(site.id);
              }}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
                isInCompare(site.id)
                  ? 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isInCompare(site.id) ? 'In Compare' : 'Compare'}</span>
            </button>

            <button
              onClick={() => {
                setEditModalSite(site);
                onClose();
              }}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
              title="Edit metrics, prices, and contacts"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>

            <button
              onClick={() => {
                setSelectedWebsiteId(site.id);
                setActiveTab('analysis');
                onClose();
              }}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>12-Factor Audit</span>
            </button>
          </div>

          <button
            onClick={() => {
              setOutreachModalSite(site);
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Draft Outreach Pitch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
