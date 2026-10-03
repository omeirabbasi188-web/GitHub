import React from 'react';
import { useSeo } from '../../context/SeoContext';
import {
  calculateOpportunityScore,
  formatCompactNumber,
  formatCurrency
} from '../../utils/seoCalculations';
import {
  Scale,
  Plus,
  Trash2,
  Send,
  ExternalLink
} from 'lucide-react';

export const WebsiteComparisonView: React.FC = () => {
  const {
    websites,
    compareList,
    toggleCompare,
    clearCompare,
    setSelectedWebsiteId,
    setActiveTab,
    setOutreachModalSite
  } = useSeo();

  const comparedSites = websites.filter((w) => compareList.includes(w.id));

  // If no websites are selected for comparison
  if (comparedSites.length === 0) {
    return (
      <div className="p-12 max-w-xl mx-auto text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-slate-800 text-emerald-400 mx-auto flex items-center justify-center">
          <Scale className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-white">No Websites in Comparison</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Select 2 to 4 websites from the SEO Finder or Website Database to compare DA, DR, AS, Trust Flow, organic traffic, spam scores, and publisher pricing side-by-side.
        </p>
        <button
          onClick={() => setActiveTab('finder')}
          className="px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all"
        >
          Explore Websites to Compare
        </button>
      </div>
    );
  }

  // Find winners for key metrics
  const maxDa = Math.max(...comparedSites.map((s) => s.da ?? 0));
  const maxDr = Math.max(...comparedSites.map((s) => s.dr ?? 0));
  const maxAs = Math.max(...comparedSites.map((s) => s.as ?? 0));
  const maxTf = Math.max(...comparedSites.map((s) => s.tf ?? 0));
  const maxTraffic = Math.max(...comparedSites.map((s) => s.organicTraffic ?? 0));
  const maxRefDomains = Math.max(...comparedSites.map((s) => s.referringDomains ?? 0));
  const minSpam = Math.min(...comparedSites.map((s) => s.spamScore ?? 0));
  const minPrice = Math.min(...comparedSites.map((s) => s.publisherPrice ?? s.guestPostInfo?.publisherPrice ?? 0));
  const maxOpportunity = Math.max(
    ...comparedSites.map((s) => calculateOpportunityScore(s).totalScore)
  );

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header and Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Website Comparison Matrix</span>
            <span className="font-mono text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              {comparedSites.length} of 4 sites
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Compare domain authority, traffic strength, link profile safety, and publisher costs side-by-side. Top values highlighted.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {comparedSites.length < 4 && (
            <div className="flex items-center gap-1.5">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    toggleCompare(e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
                className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
              >
                <option value="" disabled>
                  + Add site to matrix...
                </option>
                {websites
                  .filter((w) => !compareList.includes(w.id))
                  .map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} (DA {w.da} · ${w.publisherPrice})
                    </option>
                  ))}
              </select>
            </div>
          )}

          <button
            onClick={clearCompare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Matrix</span>
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-950/90 border-b border-slate-800">
            <tr>
              <th className="py-4 px-5 text-slate-400 font-medium w-48 bg-slate-950/60 sticky left-0 z-10">
                Metric / Signal
              </th>
              {comparedSites.map((site) => {
                const score = calculateOpportunityScore(site).totalScore;
                return (
                  <th key={site.id} className="py-4 px-5 text-slate-200 font-sans min-w-[200px]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate text-sm">
                          {site.name}
                        </div>
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
                      <button
                        onClick={() => toggleCompare(site.id)}
                        className="text-slate-400 hover:text-rose-400 p-1 rounded"
                        title="Remove from comparison"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mt-2 text-[11px] font-mono text-emerald-400 font-semibold">
                      Score: {score}/100
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono">
            {/* SEO Opportunity Score */}
            <tr className="bg-slate-950/40">
              <td className="py-3 px-5 font-sans font-semibold text-white bg-slate-950/60 sticky left-0 z-10">
                SEO Opportunity Score
              </td>
              {comparedSites.map((site) => {
                const score = calculateOpportunityScore(site).totalScore;
                const isBest = score === maxOpportunity;
                return (
                  <td key={site.id} className="py-3 px-5 text-base font-bold tabular-nums">
                    <span className={isBest ? 'text-emerald-400' : 'text-slate-200'}>
                      {score}/100
                    </span>
                    {isBest && (
                      <span className="ml-2 text-[10px] font-sans font-medium text-emerald-400">
                        (Best Score)
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Moz DA */}
            <tr>
              <td className="py-3 px-5 font-sans text-slate-400 bg-slate-950/60 sticky left-0 z-10">
                Domain Authority (Moz DA)
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-5 tabular-nums">
                  <span className={site.da === maxDa ? 'text-emerald-400 font-bold' : ''}>
                    {site.da}
                  </span>
                  {site.da === maxDa && <span className="ml-2 text-[10px] font-sans text-emerald-400">★</span>}
                </td>
              ))}
            </tr>

            {/* Ahrefs DR */}
            <tr>
              <td className="py-3 px-5 font-sans text-slate-400 bg-slate-950/60 sticky left-0 z-10">
                Domain Rating (Ahrefs DR)
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-5 tabular-nums">
                  <span className={site.dr === maxDr ? 'text-emerald-400 font-bold' : ''}>
                    {site.dr}
                  </span>
                  {site.dr === maxDr && <span className="ml-2 text-[10px] font-sans text-emerald-400">★</span>}
                </td>
              ))}
            </tr>

            {/* Semrush AS */}
            <tr>
              <td className="py-3 px-5 font-sans text-slate-400 bg-slate-950/60 sticky left-0 z-10">
                Authority Score (Semrush AS)
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-5 tabular-nums">
                  <span className={site.as === maxAs ? 'text-emerald-400 font-bold' : ''}>
                    {site.as}
                  </span>
                  {site.as === maxAs && <span className="ml-2 text-[10px] font-sans text-emerald-400">★</span>}
                </td>
              ))}
            </tr>

            {/* Majestic TF */}
            <tr>
              <td className="py-3 px-5 font-sans text-slate-400 bg-slate-950/60 sticky left-0 z-10">
                Trust Flow (Majestic TF)
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-5 tabular-nums">
                  <span className={site.tf === maxTf ? 'text-emerald-400 font-bold' : ''}>
                    {site.tf}
                  </span>
                </td>
              ))}
            </tr>

            {/* Majestic CF */}
            <tr>
              <td className="py-3 px-5 font-sans text-slate-400 bg-slate-950/60 sticky left-0 z-10">
                Citation Flow (Majestic CF)
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-5 tabular-nums text-slate-400">
                  {site.cf}
                </td>
              ))}
            </tr>

            {/* Organic Traffic */}
            <tr className="bg-slate-950/20">
              <td className="py-3 px-5 font-sans text-slate-300 bg-slate-950/60 sticky left-0 z-10">
                Monthly Organic Traffic
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-5 tabular-nums font-semibold">
                  <span className={site.organicTraffic === maxTraffic ? 'text-cyan-400' : 'text-white'}>
                    {site.organicTraffic != null ? `${site.organicTraffic.toLocaleString()}/mo` : 'N/A'}
                  </span>
                  {site.organicTraffic === maxTraffic && (
                    <span className="ml-2 text-[10px] font-sans text-cyan-400">(Top Traffic)</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Referring Domains */}
            <tr>
              <td className="py-3 px-5 font-sans text-slate-400 bg-slate-950/60 sticky left-0 z-10">
                Referring Domains
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-5 tabular-nums">
                  <span className={site.referringDomains === maxRefDomains ? 'text-emerald-400 font-bold' : ''}>
                    {site.referringDomains != null ? site.referringDomains.toLocaleString() : 'N/A'}
                  </span>
                </td>
              ))}
            </tr>

            {/* Spam Score */}
            <tr>
              <td className="py-3 px-5 font-sans text-slate-400 bg-slate-950/60 sticky left-0 z-10">
                Moz Spam Score
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-5 tabular-nums">
                  <span className={site.spamScore === minSpam ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>
                    {site.spamScore}%
                  </span>
                </td>
              ))}
            </tr>

            {/* Niche & Country */}
            <tr>
              <td className="py-3 px-5 font-sans text-slate-400 bg-slate-950/60 sticky left-0 z-10">
                Niche & Primary Country
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-5 font-sans text-slate-300">
                  <div>{site.niche}</div>
                  <div className="text-[11px] text-slate-400">{site.country}</div>
                </td>
              ))}
            </tr>

            {/* Placement Link Type */}
            <tr>
              <td className="py-3 px-5 font-sans text-slate-400 bg-slate-950/60 sticky left-0 z-10">
                Contextual In-Body Link
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-5 font-sans">
                  {site.contextualLink ? (
                    <span className="text-emerald-400 font-semibold">Yes (Dofollow)</span>
                  ) : (
                    <span className="text-amber-400">Author Bio Only</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Turnaround Time */}
            <tr>
              <td className="py-3 px-5 font-sans text-slate-400 bg-slate-950/60 sticky left-0 z-10">
                Turnaround Time
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-5 font-sans text-slate-300">
                  {site.turnaroundTime}
                </td>
              ))}
            </tr>

            {/* Publisher Price */}
            <tr className="bg-slate-950/40">
              <td className="py-3 px-5 font-sans font-semibold text-white bg-slate-950/60 sticky left-0 z-10">
                Publisher Price
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-3 px-5 text-sm font-bold tabular-nums">
                  <span className={site.publisherPrice === minPrice ? 'text-emerald-400' : 'text-slate-200'}>
                    {formatCurrency(site.publisherPrice)}
                  </span>
                  {site.publisherPrice === minPrice && (
                    <span className="ml-2 text-[10px] font-sans font-medium text-emerald-400">
                      (Lowest Cost)
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Cost Efficiency per 1k Visitors */}
            <tr>
              <td className="py-3 px-5 font-sans text-slate-400 bg-slate-950/60 sticky left-0 z-10">
                Cost per 1,000 Traffic Visits
              </td>
              {comparedSites.map((site) => {
                const pubPrice = site.publisherPrice ?? site.guestPostInfo?.publisherPrice ?? 0;
                const traffic = site.organicTraffic ?? 0;
                const costPer1k = traffic > 0 ? (pubPrice / (traffic / 1000)).toFixed(2) : 'N/A';
                return (
                  <td key={site.id} className="py-3 px-5 tabular-nums text-slate-300 font-sans text-xs">
                    ${costPer1k} / 1k visits
                  </td>
                );
              })}
            </tr>

            {/* Actions Row */}
            <tr className="bg-slate-950/70">
              <td className="py-4 px-5 font-sans text-slate-400 bg-slate-950/60 sticky left-0 z-10">
                Actions
              </td>
              {comparedSites.map((site) => (
                <td key={site.id} className="py-4 px-5 font-sans">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedWebsiteId(site.id);
                        setActiveTab('analysis');
                      }}
                      className="px-2.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                    >
                      Audit
                    </button>
                    <button
                      onClick={() => setOutreachModalSite(site)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Pitch</span>
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
