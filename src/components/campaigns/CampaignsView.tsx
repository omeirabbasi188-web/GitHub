import React, { useState } from 'react';
import { useSeo } from '../../context/SeoContext';
import { Campaign, CampaignWebsiteItem, DiscoveredWebsite } from '../../types/seo';
import { formatCompactNumber } from '../../utils/seoCalculations';
import {
  FolderKanban,
  Plus,
  ArrowRight,
  ExternalLink,
  Send,
  MoreVertical,
  CheckCircle2,
  Trash2,
  Layers,
  Globe,
  Sliders,
  Sparkles,
  X
} from 'lucide-react';

const KANBAN_STAGES: Array<{
  id: CampaignWebsiteItem['stage'];
  label: string;
  color: string;
  badgeBg: string;
}> = [
  { id: 'Researching', label: 'Researching', color: 'border-slate-700', badgeBg: 'bg-slate-800 text-slate-300' },
  { id: 'Contacted', label: 'Contacted', color: 'border-blue-500/40', badgeBg: 'bg-blue-950/60 text-blue-300' },
  { id: 'Follow-up', label: 'Follow-up', color: 'border-amber-500/40', badgeBg: 'bg-amber-950/60 text-amber-300' },
  { id: 'Negotiating', label: 'Negotiating', color: 'border-purple-500/40', badgeBg: 'bg-purple-950/60 text-purple-300' },
  { id: 'Accepted', label: 'Accepted', color: 'border-teal-500/40', badgeBg: 'bg-teal-950/60 text-teal-300' },
  { id: 'Published', label: 'Published', color: 'border-emerald-500/40', badgeBg: 'bg-emerald-950/60 text-emerald-300' },
  { id: 'Rejected', label: 'Rejected', color: 'border-rose-500/40', badgeBg: 'bg-rose-950/60 text-rose-300' }
];

export const CampaignsView: React.FC = () => {
  const {
    campaigns,
    addCampaign,
    deleteCampaign,
    moveWebsiteInCampaign,
    websites,
    setDetailModalSite,
    setOutreachModalSite,
    addToast
  } = useSeo();

  const [activeCampaignId, setActiveCampaignId] = useState<string>(
    campaigns[0]?.id || ''
  );
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isAddSiteModalOpen, setIsAddSiteModalOpen] = useState(false);

  // New campaign form state
  const [name, setName] = useState('');
  const [niche, setNiche] = useState('AI & Technology');
  const [countries, setCountries] = useState('United States, United Kingdom');
  const [minAuthority, setMinAuthority] = useState<number>(40);
  const [minTraffic, setMinTraffic] = useState<number>(15000);
  const [targetSitesCount, setTargetSitesCount] = useState<number>(12);

  // Add site form state
  const [selectedSiteToAdd, setSelectedSiteToAdd] = useState<string>(websites[0]?.id || '');
  const [initialStage, setInitialStage] = useState<CampaignWebsiteItem['stage']>('Researching');
  const [siteNotes, setSiteNotes] = useState('');

  const currentCampaign = campaigns.find((c) => c.id === activeCampaignId) || campaigns[0];

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCampaign({
      name,
      niche,
      targetCountries: countries.split(',').map((c) => c.trim()).filter(Boolean),
      minAuthority,
      minTraffic,
      targetSitesCount,
      status: 'Active',
      websites: []
    });

    setName('');
    setIsNewModalOpen(false);
  };

  const handleAddSiteToCurrentCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCampaign || !selectedSiteToAdd) return;

    moveWebsiteInCampaign(currentCampaign.id, selectedSiteToAdd, initialStage);
    setIsAddSiteModalOpen(false);
  };

  // Metrics for current campaign
  const campaignWebsites = currentCampaign?.websites || [];
  const publishedCount = campaignWebsites.filter((w) => w.stage === 'Published').length;
  const progressPercent = currentCampaign
    ? Math.min(100, Math.round((campaignWebsites.length / currentCampaign.targetSitesCount) * 100))
    : 0;

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header and Campaign Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-emerald-400" />
            <span>Outreach Campaigns Kanban</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track and advance target websites through your guest blogging acquisition funnel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {campaigns.length > 0 && (
            <select
              value={activeCampaignId}
              onChange={(e) => setActiveCampaignId(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-emerald-400"
            >
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.niche})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => setIsNewModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {currentCampaign ? (
        <>
          {/* Campaign Details & KPI Ribbon */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{currentCampaign.name}</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {currentCampaign.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-2">
                  <span>Niche: {currentCampaign.niche}</span>
                  <span>·</span>
                  <span>Min DA/DR: {currentCampaign.minAuthority}+</span>
                  <span>·</span>
                  <span>Min Traffic: {currentCampaign.minTraffic.toLocaleString()}</span>
                  <span>·</span>
                  <span>Countries: {currentCampaign.targetCountries.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddSiteModalOpen(true)}
                  className="px-3 py-1 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3 text-emerald-400" />
                  <span>Add Site to Campaign</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete campaign "${currentCampaign.name}"?`)) {
                      deleteCampaign(currentCampaign.id);
                      if (campaigns[0]) setActiveCampaignId(campaigns[0].id);
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                  title="Delete Campaign"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Progress Bar & Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-400">Target Fulfillment</span>
                <div className="font-mono font-bold text-white text-sm mt-0.5">
                  {campaignWebsites.length} / {currentCampaign.targetSitesCount} sites ({progressPercent}%)
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <span className="text-slate-400">Published Backlinks</span>
                <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">
                  {publishedCount} live posts
                </div>
              </div>

              <div>
                <span className="text-slate-400">In Active Pipeline</span>
                <div className="font-mono font-bold text-cyan-400 text-sm mt-0.5">
                  {campaignWebsites.filter((w) => ['Contacted', 'Follow-up', 'Negotiating', 'Accepted'].includes(w.stage)).length} sites
                </div>
              </div>

              <div>
                <span className="text-slate-400">Created Date</span>
                <div className="font-mono text-slate-300 text-sm mt-0.5">
                  {currentCampaign.createdAt}
                </div>
              </div>
            </div>
          </div>

          {/* Kanban Board Container (Horizontally Scrollable) */}
          <div className="overflow-x-auto pb-4">
            <div className="flex items-start gap-3 min-w-[1200px]">
              {KANBAN_STAGES.map((col) => {
                const sitesInStage = campaignWebsites.filter((w) => w.stage === col.id);

                return (
                  <div
                    key={col.id}
                    className="flex-1 min-w-[200px] max-w-[240px] bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 flex flex-col space-y-2.5"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between px-1 py-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-white">{col.label}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${col.badgeBg}`}>
                          {sitesInStage.length}
                        </span>
                      </div>
                    </div>

                    {/* Column Cards */}
                    <div className="space-y-2 min-h-[300px]">
                      {sitesInStage.length === 0 ? (
                        <div className="p-3 text-center border border-dashed border-slate-800 rounded-lg text-[11px] text-slate-500">
                          No sites in {col.label}
                        </div>
                      ) : (
                        sitesInStage.map((item) => {
                          const site = websites.find((s) => s.id === item.websiteId);
                          if (!site) return null;

                          return (
                            <div
                              key={item.websiteId}
                              className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition-all space-y-2 shadow-sm"
                            >
                              <div className="flex items-start justify-between gap-1">
                                <button
                                  onClick={() => setDetailModalSite(site)}
                                  className="text-left font-semibold text-xs text-white hover:text-emerald-400 transition-colors line-clamp-1"
                                >
                                  {site.name}
                                </button>
                                <a
                                  href={`https://${site.url}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-500 hover:text-white shrink-0"
                                >
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              </div>

                              <div className="text-[10px] text-slate-400 font-mono truncate">
                                {site.url}
                              </div>

                              {/* Metric Pills */}
                              <div className="flex items-center gap-2 text-[10px] font-mono">
                                <span className="text-emerald-400">DA {site.da || 35}</span>
                                <span>·</span>
                                <span className="text-cyan-400">DR {site.dr || 40}</span>
                                <span>·</span>
                                <span className="text-slate-300">{formatCompactNumber(site.organicTraffic)}/mo</span>
                              </div>

                              {item.notes && (
                                <p className="text-[10px] text-slate-400 italic line-clamp-2 bg-slate-900/60 p-1.5 rounded">
                                  "{item.notes}"
                                </p>
                              )}

                              {/* Card Action Controls */}
                              <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                                <button
                                  onClick={() => setOutreachModalSite(site)}
                                  className="text-emerald-400 hover:underline flex items-center gap-1 text-[10px]"
                                >
                                  <Send className="w-2.5 h-2.5" />
                                  <span>Pitch</span>
                                </button>

                                {/* Stage Mover Dropdown */}
                                <select
                                  value={item.stage}
                                  onChange={(e) =>
                                    moveWebsiteInCampaign(
                                      currentCampaign.id,
                                      site.id,
                                      e.target.value as CampaignWebsiteItem['stage']
                                    )
                                  }
                                  className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-[9px] text-slate-300 focus:outline-none focus:border-emerald-400"
                                >
                                  {KANBAN_STAGES.map((s) => (
                                    <option key={s.id} value={s.id}>
                                      → {s.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="p-12 text-center border border-dashed border-slate-800 rounded-xl space-y-3">
          <FolderKanban className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">No campaigns created yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Create your first guest blogging campaign to organize target domains, set acquisition goals, and move prospects through the outreach pipeline.
          </p>
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all"
          >
            Create First Campaign
          </button>
        </div>
      )}

      {/* New Campaign Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-emerald-400" />
                <span>Create New Outreach Campaign</span>
              </h3>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Campaign Name:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. AI SaaS Guest Posting Campaign"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Target Niche:</label>
                <input
                  type="text"
                  required
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. AI, SaaS, Cloud Security"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Target Countries (comma separated):</label>
                <input
                  type="text"
                  value={countries}
                  onChange={(e) => setCountries(e.target.value)}
                  placeholder="United States, United Kingdom, Canada"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Min Authority (DA/DR):</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={minAuthority}
                    onChange={(e) => setMinAuthority(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Min Organic Traffic:</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={minTraffic}
                    onChange={(e) => setMinTraffic(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Target Number of Qualified Sites:</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={targetSitesCount}
                  onChange={(e) => setTargetSitesCount(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-400 text-slate-900 font-semibold hover:bg-emerald-300"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Site to Campaign Modal */}
      {isAddSiteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Add Domain to Campaign</h3>
              <button
                onClick={() => setIsAddSiteModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSiteToCurrentCampaign} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Select Domain:</label>
                <select
                  value={selectedSiteToAdd}
                  onChange={(e) => setSelectedSiteToAdd(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                >
                  {websites.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.url}) - DA {s.da || 'N/A'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Initial Kanban Stage:</label>
                <select
                  value={initialStage}
                  onChange={(e) => setInitialStage(e.target.value as CampaignWebsiteItem['stage'])}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                >
                  {KANBAN_STAGES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddSiteModalOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-400 text-slate-900 font-semibold hover:bg-emerald-300"
                >
                  Add to Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
