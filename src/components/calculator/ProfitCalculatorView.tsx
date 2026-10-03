import React, { useState } from 'react';
import { useSeo } from '../../context/SeoContext';
import { formatCurrency, formatCompactNumber } from '../../utils/seoCalculations';
import {
  Calculator,
  Copy,
  Plus,
  Trash2,
  Check
} from 'lucide-react';

export const ProfitCalculatorView: React.FC = () => {
  const { websites, addToast } = useSeo();

  // Package builder state: list of website IDs
  const [selectedSiteIds, setSelectedSiteIds] = useState<string[]>([
    websites[0]?.id || '',
    websites[1]?.id || '',
    websites[2]?.id || ''
  ].filter(Boolean));

  const [markupPercent, setMarkupPercent] = useState<number>(75);
  const [agencyManagementFee, setAgencyManagementFee] = useState<number>(250);
  const [copiedProposal, setCopiedProposal] = useState(false);

  const packageSites = websites.filter((s) => selectedSiteIds.includes(s.id));

  // Calculations
  const totalPublisherCost = packageSites.reduce(
    (sum, s) => sum + (s.publisherPrice ?? s.guestPostInfo?.publisherPrice ?? 150),
    0
  );
  const totalClientContentPrice = packageSites.reduce(
    (sum, s) =>
      sum +
      Math.round(
        (s.publisherPrice ?? s.guestPostInfo?.publisherPrice ?? 150) *
          (1 + markupPercent / 100)
      ),
    0
  );
  const totalBilledToClient = totalClientContentPrice + agencyManagementFee;
  const netAgencyProfit = totalBilledToClient - totalPublisherCost;
  const netProfitMarginPercent =
    totalBilledToClient > 0 ? Math.round((netAgencyProfit / totalBilledToClient) * 100) : 0;

  const totalMonthlyTraffic = packageSites.reduce((sum, s) => sum + (s.organicTraffic ?? 0), 0);
  const avgDa = Math.round(
    packageSites.reduce((sum, s) => sum + (s.da ?? 35), 0) / (packageSites.length || 1)
  );

  const toggleSiteInPackage = (siteId: string) => {
    if (selectedSiteIds.includes(siteId)) {
      setSelectedSiteIds(selectedSiteIds.filter((id) => id !== siteId));
    } else {
      setSelectedSiteIds([...selectedSiteIds, siteId]);
    }
  };

  const handleCopyProposal = () => {
    const text = `PROPOSED GUEST BLOGGING LINK PACKAGE
Package Overview:
• Total Placements: ${packageSites.length} verified websites
• Average Moz DA: ${avgDa}
• Aggregate Monthly Organic Traffic: ${formatCompactNumber(totalMonthlyTraffic)}
• Guaranteed Links: 100% In-Content Contextual Dofollow

Included Targets:
${packageSites.map((s, i) => `${i + 1}. ${s.name} (${s.url}) - DA ${s.da} / DR ${s.dr} (${formatCompactNumber(s.organicTraffic)} traffic/mo)`).join('\n')}

Commercial Terms:
• Total Package Price: ${formatCurrency(totalBilledToClient)} (Includes all editorial fees, writing & publisher placement)
• Turnaround: 7 - 14 business days
• Live Index Guarantee: 12 months replacement protection`;

    navigator.clipboard.writeText(text);
    setCopiedProposal(true);
    addToast({
      type: 'success',
      title: 'Proposal Copied',
      description: 'Client link package summary copied to clipboard.'
    });
    setTimeout(() => setCopiedProposal(false), 2000);
  };

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-400" />
          <span>Agency Guest Post Profit & Margin Calculator</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Model client guest blogging package pricing, estimate wholesale publisher expenses, and project gross profit and net margin.
        </p>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Bundle Builder */}
        <div className="lg:col-span-2 space-y-5">
          {/* Controls: Markup Slider & Fee */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h2 className="text-sm font-semibold text-white">Pricing Model & Markups</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span>Client Markup Percentage:</span>
                  <span className="font-mono text-emerald-400 font-bold">{markupPercent}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={markupPercent}
                  onChange={(e) => setMarkupPercent(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>20% (Conservative)</span>
                  <span>100% (2x Wholesale)</span>
                  <span>200% (Premium)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span>Agency Management / Strategy Fee ($):</span>
                  <span className="font-mono text-emerald-400 font-bold">${agencyManagementFee}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={agencyManagementFee}
                  onChange={(e) => setAgencyManagementFee(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>$0</span>
                  <span>$500</span>
                  <span>$1,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Websites in Package */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Included Package Websites ({packageSites.length})
                </h3>
                <p className="text-[11px] text-slate-400">
                  Select websites from your database to bundle for the client quote.
                </p>
              </div>

              <button
                onClick={() => setSelectedSiteIds(websites.map((s) => s.id))}
                className="text-xs text-emerald-400 hover:underline"
              >
                Select All
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {websites.map((site) => {
                const isSelected = selectedSiteIds.includes(site.id);
                const pubPrice = site.publisherPrice ?? site.guestPostInfo?.publisherPrice ?? 150;
                const clientPriceForSite = Math.round(pubPrice * (1 + markupPercent / 100));
                const profitForSite = clientPriceForSite - pubPrice;

                return (
                  <div
                    key={site.id}
                    onClick={() => toggleSiteInPackage(site.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-slate-800/90 border-emerald-500/40'
                        : 'bg-slate-950/40 border-slate-800 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="rounded bg-slate-800 border-slate-700 text-emerald-400 pointer-events-none"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">
                          {site.name}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>DA {site.da}</span>
                          <span aria-hidden="true">·</span>
                          <span>DR {site.dr}</span>
                          <span aria-hidden="true">·</span>
                          <span>{formatCompactNumber(site.organicTraffic)} traffic</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 text-xs font-mono">
                      <div className="text-slate-400 text-[10px]">
                        Wholesale: {formatCurrency(site.publisherPrice)}
                      </div>
                      <div className="font-bold text-emerald-400">
                        Client Quote: {formatCurrency(clientPriceForSite)}
                        <span className="text-[10px] text-emerald-400/80 ml-1">
                          (+${profitForSite})
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Profit Summary & Client Proposal Export */}
        <div className="space-y-5">
          <div className="p-6 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-4">
            <h2 className="text-sm font-bold text-white tracking-tight">
              Commercial Profit Summary
            </h2>

            <div className="space-y-2 text-xs divide-y divide-slate-800">
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Selected Websites:</span>
                <span className="font-mono font-semibold text-white">{packageSites.length}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Wholesale Publisher Cost:</span>
                <span className="font-mono text-slate-300">
                  {formatCurrency(totalPublisherCost)}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Content & Placement Billed:</span>
                <span className="font-mono text-slate-200">
                  {formatCurrency(totalClientContentPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Agency Strategy Fee:</span>
                <span className="font-mono text-slate-300">
                  {formatCurrency(agencyManagementFee)}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 text-sm font-semibold">
                <span className="text-white">Total Client Price:</span>
                <span className="font-mono text-white text-base">
                  {formatCurrency(totalBilledToClient)}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 text-sm font-bold">
                <span className="text-emerald-400">Net Agency Profit:</span>
                <span className="font-mono text-emerald-400 text-lg">
                  +{formatCurrency(netAgencyProfit)}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Profit Margin:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {netProfitMarginPercent}%
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyProposal}
              className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              {copiedProposal ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Proposal Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Client Proposal Quote</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">
              Package Aggregate Authority
            </div>
            <div className="grid grid-cols-2 gap-2 text-center pt-1 font-mono">
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Avg Moz DA</span>
                <span className="text-sm font-bold text-white">{avgDa}</span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Total Traffic</span>
                <span className="text-sm font-bold text-cyan-400">
                  {formatCompactNumber(totalMonthlyTraffic)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
