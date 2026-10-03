import React from 'react';
import { useSeo } from '../../context/SeoContext';
import { formatCurrency, formatCompactNumber } from '../../utils/seoCalculations';
import {
  Building2,
  ExternalLink,
  DollarSign,
  Send,
  Eye
} from 'lucide-react';

export const PublishersView: React.FC = () => {
  const {
    websites,
    setDetailModalSite,
    setOutreachModalSite,
    setSelectedWebsiteId,
    setActiveTab
  } = useSeo();

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Publisher Directory & Commercial Partnerships
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain commercial agreements, standard rates, editorial turnaround times, and verified publisher contacts.
          </p>
        </div>
      </div>

      {/* Publishers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {websites.map((site) => (
          <div
            key={site.id}
            className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-white truncate">
                    {site.name}
                  </h3>
                  <a
                    href={`https://${site.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 mt-0.5 truncate"
                  >
                    <span>{site.url}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <span className="font-mono text-xs font-semibold text-emerald-400">
                  {formatCurrency(site.guestPostInfo?.publisherPrice ?? site.publisherPrice)}
                </span>
              </div>

              {/* Publisher Contact details */}
              <div className="mt-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Editor:</span>
                  <span className="font-medium text-white">{site.guestPostInfo?.contactPerson || site.contactPerson || 'Editorial Desk'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-mono text-emerald-400 text-[11px]">{site.guestPostInfo?.contactEmail || site.contactEmail || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Role:</span>
                  <span className="text-slate-400 text-[11px]">{site.guestPostInfo?.contactRole || site.contactRole || 'Managing Editor'}</span>
                </div>
              </div>

              {/* Terms */}
              <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Turnaround Time:</span>
                  <span className="font-mono text-slate-300">{site.guestPostInfo?.turnaroundTime || site.turnaroundTime || '3-5 days'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Word Count Target:</span>
                  <span className="font-mono text-slate-300">{typeof site.guestPostInfo?.minWordCount === 'string' ? site.guestPostInfo.minWordCount : site.wordCount || '1,200 words'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Placement Type:</span>
                  <span className="text-slate-300">
                    {site.guestPostInfo?.sponsored || site.sponsoredTag || 'Editorial'} · {(site.guestPostInfo?.contextualLink ?? site.contextualLink ?? true) ? 'Contextual' : 'Bio'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => setDetailModalSite(site)}
                className="flex-1 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors text-center"
              >
                Guidelines
              </button>
              <button
                onClick={() => setOutreachModalSite(site)}
                className="flex-1 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors flex items-center justify-center gap-1"
              >
                <Send className="w-3 h-3" />
                <span>Pitch</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
