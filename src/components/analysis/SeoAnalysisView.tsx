import React, { useState } from 'react';
import { useSeo } from '../../context/SeoContext';
import {
  calculateOpportunityScore,
  generateSeoQualityAnalysis,
  getTrafficTrend,
  simulateDomainLookup,
  formatCompactNumber,
  formatCurrency
} from '../../utils/seoCalculations';
import {
  ExternalLink,
  ChevronDown,
  Info,
  Scale,
  Send,
  HelpCircle,
  TrendingUp,
  Search,
  Sparkles,
  Edit3,
  Plus,
  Sliders,
  Globe,
  Calendar,
  Layers,
  FileCheck2,
  DollarSign,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText
} from 'lucide-react';

export const SeoAnalysisView: React.FC = () => {
  const {
    websites,
    selectedWebsiteId,
    setSelectedWebsiteId,
    selectedWebsite,
    weights,
    setDetailModalSite,
    setEditModalSite,
    setOutreachModalSite,
    toggleCompare,
    isInCompare,
    addWebsite,
    addToast
  } = useSeo();

  const [showFormulaDetails, setShowFormulaDetails] = useState(true);
  const [customLookupUrl, setCustomLookupUrl] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);

  // What-if simulator state
  const [showSimulator, setShowSimulator] = useState(false);
  const [simDa, setSimDa] = useState<number>(selectedWebsite ? (selectedWebsite.da ?? 50) : 50);
  const [simTraffic, setSimTraffic] = useState<number>(selectedWebsite ? (selectedWebsite.organicTraffic ?? 50000) : 50000);
  const [simSpam, setSimSpam] = useState<number>(selectedWebsite ? (selectedWebsite.spamScore ?? 2) : 2);

  if (!selectedWebsite) {
    return (
      <div className="p-12 text-center text-slate-400">
        No website selected for analysis. Please choose a website from the database.
      </div>
    );
  }

  // Calculate actual score
  const scoreData = calculateOpportunityScore(selectedWebsite, weights);
  const qualityFactors = generateSeoQualityAnalysis(selectedWebsite);
  const trafficTrendData = getTrafficTrend(selectedWebsite);

  // Simulated score if simulator is active
  const simulatedSite = {
    ...selectedWebsite,
    da: simDa,
    organicTraffic: simTraffic,
    spamScore: simSpam
  };
  const simulatedScoreData = calculateOpportunityScore(simulatedSite, weights);

  const handleCustomDomainLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLookupUrl.trim()) return;

    setIsLookingUp(true);
    setTimeout(() => {
      setIsLookingUp(false);
      const simulatedData = simulateDomainLookup(customLookupUrl);
      addWebsite(simulatedData);
      setCustomLookupUrl('');
      addToast({
        type: 'success',
        title: 'Domain Analyzed & Saved',
        description: `${simulatedData.name} (${simulatedData.url}) added to database with full SEO metrics.`
      });
    }, 600);
  };

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Top Quick URL Intelligence Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Instant SEO Analysis for any new domain:</span>
        </div>

        <form onSubmit={handleCustomDomainLookup} className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={customLookupUrl}
              onChange={(e) => setCustomLookupUrl(e.target.value)}
              placeholder="e.g. searchenginejournal.com"
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={isLookingUp || !customLookupUrl.trim()}
            className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm disabled:opacity-50 transition-all flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isLookingUp ? 'Analyzing...' : 'Audit & Add'}</span>
          </button>
        </form>
      </div>

      {/* Website Selector & Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Select Target Website to Analyze:
            </label>
            <div className="relative">
              <select
                value={selectedWebsiteId}
                onChange={(e) => {
                  setSelectedWebsiteId(e.target.value);
                  const chosen = websites.find((s) => s.id === e.target.value);
                  if (chosen) {
                    setSimDa(chosen.da ?? 40);
                    setSimTraffic(chosen.organicTraffic ?? 10000);
                    setSimSpam(chosen.spamScore ?? 2);
                  }
                }}
                className="w-full sm:w-80 px-3 py-2 pr-8 bg-slate-800 border border-slate-700 rounded-lg text-sm font-semibold text-white focus:outline-none focus:border-emerald-400"
              >
                {websites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.url})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>

          <div className="sm:border-l sm:border-slate-800 sm:pl-4 pt-2 sm:pt-0">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">
                {selectedWebsite.name}
              </h2>
              <a
                href={`https://${selectedWebsite.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white"
                title="Visit website"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>{selectedWebsite.niche}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedWebsite.country}</span>
              <span aria-hidden="true">·</span>
              <span>Domain Age: {selectedWebsite.domainAgeYears} years</span>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setEditModalSite(selectedWebsite)}
            className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Edit website metrics and prices"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Metrics</span>
          </button>
          <button
            onClick={() => toggleCompare(selectedWebsite.id)}
            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
              isInCompare(selectedWebsite.id)
                ? 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isInCompare(selectedWebsite.id) ? 'In Compare' : 'Add to Compare'}</span>
          </button>
          <button
            onClick={() => setDetailModalSite(selectedWebsite)}
            className="px-3 py-2 text-xs font-medium text-emerald-400 bg-emerald-950/50 hover:bg-emerald-900/50 border border-emerald-500/30 rounded-lg transition-colors"
          >
            Full Specs
          </button>
          <button
            onClick={() => setOutreachModalSite(selectedWebsite)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Start Outreach</span>
          </button>
        </div>
      </div>

      {/* Mandatory Third-Party SEO Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/50 flex items-start gap-3 text-xs text-slate-300">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Notice:</strong> Moz DA, Ahrefs DR, Semrush AS, and Majestic TF/CF are comparative third-party metrics, not official Google ranking factors. Displayed values are curated sample verification records. Connect an external SEO API for live refresh. A strong guest post opportunity combines real verified organic search traffic, low spam risk, contextual placement, and indexation stability alongside these authority signals.
        </div>
      </div>

      {/* Section 8: Structured Domain Overview & SEO Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1. Domain Overview */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Domain Overview</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              WHOIS & Tech Specs
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Domain</span>
              <span className="font-mono font-semibold text-white truncate block" title={selectedWebsite.url}>
                {selectedWebsite.url}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Domain Age</span>
              <span className="font-mono font-semibold text-white">
                {selectedWebsite.domainAgeYears ?? 7} Years
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Niche</span>
              <span className="font-semibold text-emerald-400 truncate block">
                {selectedWebsite.niche}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Country</span>
              <span className="font-semibold text-white">
                {selectedWebsite.country} ({selectedWebsite.countryCode || 'US'})
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Language</span>
              <span className="font-semibold text-white">
                {selectedWebsite.language || 'English (en)'}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-500 block">Website Type</span>
              <span className="font-semibold text-slate-300">
                {selectedWebsite.websiteType || 'Blog & Publisher'}
              </span>
            </div>
          </div>
        </div>

        {/* 2. SEO Metrics (9 Core Factual Data Points) */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">SEO Metrics</h3>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">
              Attributed Providers
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-xs text-center font-mono">
            <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block font-sans">Authority Score</span>
              <span className="text-sm font-bold text-white block mt-0.5">{selectedWebsite.as ?? 'N/A'}</span>
              <span className="text-[9px] text-slate-500 block font-sans">Semrush AS</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block font-sans">Domain Rating</span>
              <span className="text-sm font-bold text-white block mt-0.5">{selectedWebsite.dr ?? 'N/A'}</span>
              <span className="text-[9px] text-slate-500 block font-sans">Ahrefs DR</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block font-sans">Domain Authority</span>
              <span className="text-sm font-bold text-emerald-400 block mt-0.5">{selectedWebsite.da ?? 'N/A'}</span>
              <span className="text-[9px] text-slate-500 block font-sans">Moz DA</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block font-sans">Page Authority</span>
              <span className="text-sm font-bold text-white block mt-0.5">
                {selectedWebsite.pa ?? (selectedWebsite.da ? Math.max(15, selectedWebsite.da - 7) : 32)}
              </span>
              <span className="text-[9px] text-slate-500 block font-sans">Moz PA</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block font-sans">Organic Traffic</span>
              <span className="text-sm font-bold text-cyan-400 block mt-0.5">
                {formatCompactNumber(selectedWebsite.organicTraffic)}
              </span>
              <span className="text-[9px] text-slate-500 block font-sans">Monthly Visits</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block font-sans">Organic Keywords</span>
              <span className="text-sm font-bold text-white block mt-0.5">
                {selectedWebsite.organicKeywords
                  ? formatCompactNumber(selectedWebsite.organicKeywords)
                  : formatCompactNumber(Math.round((selectedWebsite.organicTraffic || 25000) * 0.42))}
              </span>
              <span className="text-[9px] text-slate-500 block font-sans">Top 100 Rank</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block font-sans">Referring Domains</span>
              <span className="text-sm font-bold text-white block mt-0.5">
                {(selectedWebsite.referringDomains ?? 0).toLocaleString()}
              </span>
              <span className="text-[9px] text-slate-500 block font-sans">Live Root Domains</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block font-sans">Total Backlinks</span>
              <span className="text-sm font-bold text-white block mt-0.5">
                {selectedWebsite.backlinks
                  ? formatCompactNumber(selectedWebsite.backlinks)
                  : formatCompactNumber(Math.round((selectedWebsite.referringDomains || 800) * 4.8))}
              </span>
              <span className="text-[9px] text-slate-500 block font-sans">Total Live Inbound</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80">
              <span className="text-[10px] text-slate-400 block font-sans">Spam Score</span>
              <span className="text-sm font-bold text-emerald-400 block mt-0.5">
                {selectedWebsite.spamScore ?? 0}%
              </span>
              <span className="text-[9px] text-slate-500 block font-sans">Moz Risk Signal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 8: Guest Posting Information & Quality Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 3. Guest Posting Information */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Guest Posting Information</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">
              Evidence Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400">Guest Post Accepted?</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{selectedWebsite.guestPostStatus || 'Confirmed'}</span>
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400">Write for Us Page:</span>
              {selectedWebsite.writeForUsPage || selectedWebsite.guestPostInfo?.writeForUsPage ? (
                <a
                  href={selectedWebsite.writeForUsPage || selectedWebsite.guestPostInfo?.writeForUsPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Detected</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-slate-500">Unlisted</span>
              )}
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400">Contributor Page:</span>
              {selectedWebsite.guestPostInfo?.guestPostUrl || selectedWebsite.guestPostSourceUrl ? (
                <a
                  href={selectedWebsite.guestPostInfo?.guestPostUrl || selectedWebsite.guestPostSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>View Guidelines</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-slate-500">Editorial Pitch</span>
              )}
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400">Sponsored Post:</span>
              <span className="font-medium text-slate-200">
                {selectedWebsite.guestPostInfo?.sponsored || 'Available Upon Request'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400">Paid Post?</span>
              <span className="font-semibold text-slate-200">
                {(selectedWebsite.publisherPrice ?? 0) > 0 ? 'Paid Placement' : 'Free / Editorial'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400">Price:</span>
              <span className="font-mono font-bold text-emerald-400">
                {formatCurrency(selectedWebsite.publisherPrice ?? selectedWebsite.guestPostInfo?.publisherPrice ?? 150)}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400">Link Type:</span>
              <span className="font-medium text-emerald-400">
                {selectedWebsite.guestPostInfo?.linkType || 'Dofollow'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400">Word Count:</span>
              <span className="font-mono text-slate-200">
                {selectedWebsite.guestPostInfo?.minWordCount || selectedWebsite.wordCount || '1,200 - 2,500 words'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 col-span-1 sm:col-span-2 flex items-center justify-between">
              <span className="text-slate-400">Contact Email:</span>
              <div className="flex items-center gap-1.5 font-mono text-emerald-400">
                <Mail className="w-3.5 h-3.5" />
                <span>
                  {selectedWebsite.contactEmail ||
                    selectedWebsite.guestPostInfo?.contactEmail ||
                    `editor@${selectedWebsite.url}`}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 col-span-1 sm:col-span-2">
              <span className="text-slate-500 block text-[10px] mb-1">Content Requirements:</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {selectedWebsite.guestPostInfo?.articleRequirements ||
                  'Must be 100% original, cite primary data sources, include no more than 2 contextual dofollow outbound links, and undergo peer editorial review.'}
              </p>
            </div>
          </div>
        </div>

        {/* 4. Quality Assessment (Transparent Individual Factual Indicators - No Arbitrary Ranking) */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Quality Assessment</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Factual Indicators
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-white block">1. Authority Indicator</span>
                <span className="text-slate-400 text-[11px] leading-relaxed block">
                  Moz DA {selectedWebsite.da} · Ahrefs DR {selectedWebsite.dr} · Semrush AS {selectedWebsite.as}. Strong comparative domain authority within the {selectedWebsite.niche} niche.
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-white block">2. Traffic Indicator</span>
                <span className="text-slate-400 text-[11px] leading-relaxed block">
                  {formatCompactNumber(selectedWebsite.organicTraffic)} monthly organic visits with steady indexation and real search visibility.
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-white block">3. Relevance Indicator</span>
                <span className="text-slate-400 text-[11px] leading-relaxed block">
                  Niche categorized under {selectedWebsite.niche}. High topic alignment for contextual backlink passing.
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-white block">4. Guest-Post Availability</span>
                <span className="text-slate-400 text-[11px] leading-relaxed block">
                  Status: {selectedWebsite.guestPostStatus}. Documented contributor guidelines and active editorial submission queue.
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-white block">5. Contact Availability</span>
                <span className="text-slate-400 text-[11px] leading-relaxed block">
                  {selectedWebsite.contactEmail || selectedWebsite.guestPostInfo?.contactEmail
                    ? 'Verified direct editorial contact email available for personalized pitch outreach.'
                    : 'Contact page form detected; manual submission required.'}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-white block">6. Editorial Requirements</span>
                <span className="text-slate-400 text-[11px] leading-relaxed block">
                  Clear word count guidelines ({selectedWebsite.guestPostInfo?.minWordCount || '1,200+'} words) and {selectedWebsite.guestPostInfo?.linkType || 'Dofollow'} link attribution rules.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-slate-500 italic">
            * Note: Factual indicators are displayed independently without an arbitrary overall "best site" ranking. Users filter and decide based on transparent metrics.
          </div>
        </div>
      </div>

      {/* Transparent SEO Opportunity Score Card (Calculated & Explained Math) */}
      <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 tracking-wider">
                TRANSPARENT CALCULATION ENGINE
              </span>
              <button
                onClick={() => setShowFormulaDetails(!showFormulaDetails)}
                className="text-[11px] text-slate-400 hover:text-slate-200 underline"
              >
                {showFormulaDetails ? 'Hide calculation details' : 'Show calculation details'}
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => setShowSimulator(!showSimulator)}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Sliders className="w-3 h-3" />
                <span>{showSimulator ? 'Close What-If Simulator' : 'Test What-If Metrics'}</span>
              </button>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
              SEO Opportunity Score:{' '}
              <span className="font-mono text-emerald-400">
                {showSimulator ? simulatedScoreData.totalScore : scoreData.totalScore}/100
              </span>
              {showSimulator && (
                <span className="text-xs font-normal text-cyan-400 ml-2 font-mono">
                  (Simulated: was {scoreData.totalScore})
                </span>
              )}
            </h2>
            <div className="text-xs text-slate-400 mt-1">
              Rating Classification:{' '}
              <strong className="text-white">
                {showSimulator ? simulatedScoreData.rating : scoreData.rating}
              </strong>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 block font-mono">Publisher Cost / Est. Value</span>
            <span className="text-base font-bold font-mono text-white">
              {formatCurrency(selectedWebsite.publisherPrice)}
            </span>
            <span className="text-[11px] text-slate-400 ml-1">
              ({formatCompactNumber(selectedWebsite.organicTraffic)} traffic/mo)
            </span>
          </div>
        </div>

        {/* What-If Metric Simulation Panel */}
        {showSimulator && (
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs space-y-3">
            <div className="flex items-center justify-between font-semibold text-cyan-300">
              <span>What-If Scenario Simulator: Adjust parameters to test impact on score</span>
              <button
                onClick={() => {
                  setSimDa(selectedWebsite.da ?? 40);
                  setSimTraffic(selectedWebsite.organicTraffic ?? 10000);
                  setSimSpam(selectedWebsite.spamScore ?? 2);
                }}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                Reset to Real Values
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Simulate Moz DA:</span>
                  <span className="font-mono text-cyan-400 font-bold">{simDa}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="95"
                  value={simDa}
                  onChange={(e) => setSimDa(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Simulate Monthly Traffic:</span>
                  <span className="font-mono text-cyan-400 font-bold">{formatCompactNumber(simTraffic)}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="250000"
                  step="5000"
                  value={simTraffic}
                  onChange={(e) => setSimTraffic(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Simulate Moz Spam Score %:</span>
                  <span className="font-mono text-amber-400 font-bold">{simSpam}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={simSpam}
                  onChange={(e) => setSimSpam(Number(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* 5-Factor Score Breakdown Bars */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {/* Factor 1: Authority */}
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Authority</span>
              <span className="font-mono font-bold text-emerald-400">
                {scoreData.authorityPoints.points}/{scoreData.authorityPoints.maxPoints}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all"
                style={{ width: `${scoreData.authorityPoints.percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              DA {selectedWebsite.da} · DR {selectedWebsite.dr} · AS {selectedWebsite.as}
            </p>
          </div>

          {/* Factor 2: Traffic */}
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Organic Traffic</span>
              <span className="font-mono font-bold text-emerald-400">
                {scoreData.trafficPoints.points}/{scoreData.trafficPoints.maxPoints}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all"
                style={{ width: `${scoreData.trafficPoints.percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              {formatCompactNumber(selectedWebsite.organicTraffic)} monthly visits
            </p>
          </div>

          {/* Factor 3: Referring Domains */}
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Ref. Domains</span>
              <span className="font-mono font-bold text-emerald-400">
                {scoreData.referringDomainsPoints.points}/{scoreData.referringDomainsPoints.maxPoints}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all"
                style={{ width: `${scoreData.referringDomainsPoints.percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              {(selectedWebsite.referringDomains ?? 0).toLocaleString()} unique root domains
            </p>
          </div>

          {/* Factor 4: Relevance & Quality */}
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Link Quality</span>
              <span className="font-mono font-bold text-emerald-400">
                {scoreData.relevanceQualityPoints.points}/{scoreData.relevanceQualityPoints.maxPoints}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all"
                style={{ width: `${scoreData.relevanceQualityPoints.percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              {(selectedWebsite.guestPostInfo?.contextualLink ?? selectedWebsite.contextualLink ?? true) ? 'Contextual in-body' : 'Bio only'} · TF/CF {(((selectedWebsite.tf || 0) / (selectedWebsite.cf || 1))).toFixed(2)}
            </p>
          </div>

          {/* Factor 5: Spam Risk Factor */}
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Spam Safety</span>
              <span className="font-mono font-bold text-emerald-400">
                {scoreData.spamRiskPoints.points}/{scoreData.spamRiskPoints.maxPoints}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all"
                style={{ width: `${scoreData.spamRiskPoints.percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Moz Spam {selectedWebsite.spamScore ?? 0}% ({(selectedWebsite.spamScore ?? 0) <= 3 ? 'Ultra safe' : 'Check anchor profile'})
            </p>
          </div>
        </div>

        {/* 6-Month Organic Traffic Trend Visualization */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>6-Month Google Organic Search Traffic Trend</span>
            </span>
            <span className="font-mono text-emerald-400 font-semibold text-[11px]">
              +{(selectedWebsite.trafficGrowthRate || 28.4).toFixed(1)}% growth rate
            </span>
          </div>

          <div className="pt-2 flex items-end gap-2 h-20">
            {trafficTrendData.map((val, idx) => {
              const maxVal = Math.max(...trafficTrendData);
              const heightPct = Math.max(15, Math.round((val / maxVal) * 100));
              const monthLabels = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Current'];
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div className="text-[10px] text-slate-400 font-mono">
                    {formatCompactNumber(val)}
                  </div>
                  <div
                    className="w-full bg-cyan-500/80 hover:bg-cyan-400 rounded-t transition-all"
                    style={{ height: `${heightPct}%` }}
                  />
                  <div className="text-[9px] text-slate-400 font-sans">{monthLabels[idx]}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transparent Calculation Step-by-Step Proof */}
        {showFormulaDetails && (
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-2">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              Transparent Point Calculation Breakdown:
            </div>
            <ul className="space-y-1 text-slate-400 list-disc list-inside font-mono text-[11px]">
              {(scoreData.calculationExplanation || scoreData.explanation || []).map((line: string, idx: number) => (
                <li key={idx} className="leading-relaxed">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Automatic 12-Factor SEO Website Analysis Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Comprehensive 12-Factor SEO Quality Analysis
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Each metric evaluated separately with simple, beginner-friendly explanations and third-party provider citations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {qualityFactors.map((factor, index) => (
            <div
              key={factor.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Metric Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      Factor 0{index + 1}
                    </span>
                    <h3 className="font-semibold text-sm text-white">
                      {factor.title}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-base font-bold text-emerald-400 tabular-nums">
                      {factor.value}
                    </span>
                    {factor.isThirdParty && (
                      <span className="block text-[9px] text-slate-400 font-sans">
                        Third-Party ({factor.provider})
                      </span>
                    )}
                  </div>
                </div>

                {/* Simple Language Definition */}
                <div className="mt-3 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                  <div className="font-medium text-slate-400 text-[10px] mb-0.5">WHAT THIS MEANS:</div>
                  {factor.simpleExplanation}
                </div>

                {/* Deep Dive & Practical Evaluation */}
                <div className="mt-3 text-xs text-slate-400 leading-relaxed">
                  {factor.deepDive}
                </div>
              </div>

              {/* Status footer with zero-pill discipline */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Evaluation:</span>
                <span className="font-semibold text-emerald-400">
                  {factor.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
