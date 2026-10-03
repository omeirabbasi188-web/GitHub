import React, { useState } from 'react';
import { useSeo } from '../../context/SeoContext';
import { DiscoveredWebsite, NicheType } from '../../types/seo';
import { calculateOpportunityScore } from '../../utils/seoCalculations';
import { X, Globe, DollarSign, ExternalLink } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NICHES: NicheType[] = [
  'Technology & SaaS',
  'Digital Marketing & SEO',
  'Finance & Fintech',
  'Health & Wellness',
  'E-Commerce & Retail',
  'Cybersecurity',
  'Travel & Hospitality',
  'Real Estate & Home',
  'Lifestyle & Business'
];

export const AddWebsiteModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addWebsite, addToast } = useSeo();

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [niche, setNiche] = useState<NicheType>('Technology & SaaS');
  const [country, setCountry] = useState('United States');
  const [da, setDa] = useState(50);
  const [dr, setDr] = useState(52);
  const [as, setAs] = useState(48);
  const [tf, setTf] = useState(32);
  const [cf, setCf] = useState(36);
  const [organicTraffic, setOrganicTraffic] = useState(45000);
  const [referringDomains, setReferringDomains] = useState(1600);
  const [backlinks, setBacklinks] = useState(24000);
  const [dofollowLinks, setDofollowLinks] = useState(18000);
  const [nofollowLinks, setNofollowLinks] = useState(6000);
  const [spamScore, setSpamScore] = useState(2);
  const [domainAgeYears, setDomainAgeYears] = useState(6);
  const [indexedPages, setIndexedPages] = useState(3200);
  const [publisherPrice, setPublisherPrice] = useState(85);
  const [clientPrice, setClientPrice] = useState(175);
  const [contextualLink, setContextualLink] = useState(true);
  const [authorBioLink, setAuthorBioLink] = useState(true);
  const [sponsoredTag, setSponsoredTag] = useState<'Non-Sponsored' | 'Sponsored' | 'Editorial'>('Non-Sponsored');
  const [turnaroundTime, setTurnaroundTime] = useState('3-5 business days');
  const [wordCount, setWordCount] = useState('1,200 - 2,000 words');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactRole, setContactRole] = useState('Editorial Lead');
  const [writeForUsPage, setWriteForUsPage] = useState('');
  const [contactPage, setContactPage] = useState('');
  const [editorialGuidelines, setEditorialGuidelines] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) {
      addToast({
        type: 'warning',
        title: 'Missing Required Fields',
        description: 'Please provide both Website Name and Domain URL.'
      });
      return;
    }

    const cleanUrl = url.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');

    const newSite: DiscoveredWebsite = {
      id: `gps-custom-${Date.now()}`,
      name: name.trim(),
      url: cleanUrl,
      niche,
      country: country.trim() || 'United States',
      countryCode: country.toLowerCase().includes('united states') ? 'US' : country.toLowerCase().includes('united kingdom') ? 'GB' : 'WW',
      domainAgeYears: Number(domainAgeYears) || 4,
      indexedPages: Number(indexedPages) || 1200,
      guestPostStatus: 'Confirmed',
      guestPostSourceUrl: writeForUsPage.trim() || `https://${cleanUrl}/write-for-us`,
      evidenceSnippet: `Verified contributor guidelines at ${writeForUsPage.trim() || `https://${cleanUrl}/write-for-us`}`,
      verification: {
        isLive: true,
        nicheRelevance: 'High',
        hasContributorPage: true,
        acceptsContributions: true,
        activePublishing: true,
        pbnRisk: 'Low'
      },
      da: Number(da) || 30,
      daProvider: 'Moz',
      dr: Number(dr) || 30,
      drProvider: 'Ahrefs',
      as: Number(as) || 30,
      asProvider: 'Semrush',
      tf: Number(tf) || 20,
      tfProvider: 'Majestic',
      cf: Number(cf) || 25,
      cfProvider: 'Majestic',
      organicTraffic: Number(organicTraffic) || 10000,
      trafficProvider: 'Semrush',
      trafficTrend: [
        Math.round((Number(organicTraffic) || 10000) * 0.75),
        Math.round((Number(organicTraffic) || 10000) * 0.8),
        Math.round((Number(organicTraffic) || 10000) * 0.86),
        Math.round((Number(organicTraffic) || 10000) * 0.91),
        Math.round((Number(organicTraffic) || 10000) * 0.96),
        Number(organicTraffic) || 10000
      ],
      trafficCountries: [
        { country: country.trim() || 'United States', code: 'US', percentage: 65 },
        { country: 'Other Global Regions', code: 'WW', percentage: 35 }
      ],
      referringDomains: Number(referringDomains) || 500,
      refDomainsProvider: 'Ahrefs',
      backlinks: Number(backlinks) || 5000,
      backlinksProvider: 'Ahrefs',
      dofollowLinks: Number(dofollowLinks) || Math.round((Number(backlinks) || 5000) * 0.75),
      nofollowLinks: Number(nofollowLinks) || Math.round((Number(backlinks) || 5000) * 0.25),
      spamScore: Number(spamScore) || 2,
      spamProvider: 'Moz',
      guestPostInfo: {
        guestPostUrl: writeForUsPage.trim() || `https://${cleanUrl}/write-for-us`,
        requirementsSummary: [
          `Minimum word count: ${wordCount.trim() || '1,200 words'}`,
          `Contextual placement: ${contextualLink ? 'Yes (in-content)' : 'Author bio only'}`,
          'Original, high quality article submissions'
        ],
        minWordCount: wordCount.trim() || '1,000 words',
        allowedNiches: [niche],
        linkType: contextualLink ? 'Dofollow' : 'Mixed',
        contextualLink,
        authorBio: authorBioLink,
        sponsored: sponsoredTag as any,
        publisherPrice: Number(publisherPrice) || 80,
        clientPrice: Number(clientPrice) || 150,
        turnaroundTime: turnaroundTime.trim() || '3-5 business days',
        articleRequirements: editorialGuidelines.trim() || 'Pitch topics before drafting.',
        contactPerson: contactPerson.trim() || 'Editorial Desk',
        contactRole: contactRole.trim() || 'Managing Editor',
        contactEmail: contactEmail.trim() || `editor@${cleanUrl}`,
        contactPage: contactPage.trim() || `https://${cleanUrl}/contact`,
        writeForUsPage: writeForUsPage.trim() || `https://${cleanUrl}/write-for-us`,
        contactSourceUrl: writeForUsPage.trim() || `https://${cleanUrl}/write-for-us`
      },
      publisherPrice: Number(publisherPrice) || 80,
      clientPrice: Number(clientPrice) || 150,
      profit: (Number(clientPrice) || 150) - (Number(publisherPrice) || 80),
      contactPerson: contactPerson.trim() || 'Editorial Desk',
      contactEmail: contactEmail.trim() || `editor@${cleanUrl}`,
      contactRole: contactRole.trim() || 'Managing Editor',
      contactPage: contactPage.trim() || `https://${cleanUrl}/contact`,
      writeForUsPage: writeForUsPage.trim() || `https://${cleanUrl}/write-for-us`,
      wordCount: wordCount.trim() || '1,000 - 1,500 words',
      turnaroundTime: turnaroundTime.trim() || '3-5 business days',
      sponsoredTag,
      contextualLink,
      authorBioLink,
      guestPostAvailable: true,
      editorialGuidelines: editorialGuidelines.trim(),
      opportunityStage: 'New Opportunities',
      dateDiscovered: new Date().toISOString().split('T')[0],
      notes: 'Manually entered into database.',
      opportunityScore: {
        totalScore: 78,
        rating: 'Tier 2 - Strong Target',
        breakdown: {
          relevance: { score: 18, max: 20, label: 'Niche Relevance', status: 'excellent' },
          traffic: { score: 15, max: 25, label: 'Organic Traffic', status: 'good' },
          authority: { score: 18, max: 25, label: 'Authority Metrics', status: 'good' },
          linkProfile: { score: 17, max: 20, label: 'Link Profile', status: 'excellent' },
          risk: { score: 10, max: 10, label: 'Spam Risk Safety', status: 'excellent' }
        },
        explanation: ['Manually registered target site.']
      }
    };

    newSite.opportunityScore = calculateOpportunityScore(newSite);
    addWebsite(newSite);

    addToast({
      type: 'success',
      title: 'Website Added Successfully',
      description: `${name} (${cleanUrl}) is now available in your database and research tools.`
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl my-auto overflow-hidden">
        {/* Modal Sticky Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 shrink-0 bg-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Add Target SEO Website
              </h3>
              <p className="text-[11px] text-slate-400">
                Register domain, 3rd-party authority scores, prices, and contacts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
          {/* General Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Website Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. TechPulse Magazine"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Website Domain URL *</label>
              <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. techpulsemag.com"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Primary Niche / Category</label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value as NicheType)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 text-xs"
              >
                {NICHES.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Target Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. United States"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 text-xs"
              />
            </div>
          </div>

          {/* Third-party Authority Metrics */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300">
                Third-Party Authority Signals
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">Moz / Ahrefs / Semrush / Majestic</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center">
              <div>
                <label className="text-slate-400 block text-[10px]">Moz DA</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={da}
                  onChange={(e) => setDa(Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-center text-white font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[10px]">Ahrefs DR</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={dr}
                  onChange={(e) => setDr(Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-center text-white font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[10px]">Semrush AS</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={as}
                  onChange={(e) => setAs(Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-center text-white font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[10px]">Majestic TF</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={tf}
                  onChange={(e) => setTf(Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-center text-white font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[10px]">Majestic CF</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={cf}
                  onChange={(e) => setCf(Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-center text-slate-400 font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Traffic, Ref Domains, Spam */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Monthly Organic Traffic</label>
              <input
                type="number"
                value={organicTraffic}
                onChange={(e) => setOrganicTraffic(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Referring Domains</label>
              <input
                type="number"
                value={referringDomains}
                onChange={(e) => setReferringDomains(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Total Backlinks</label>
              <input
                type="number"
                value={backlinks}
                onChange={(e) => setBacklinks(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Dofollow Links</label>
              <input
                type="number"
                value={dofollowLinks}
                onChange={(e) => setDofollowLinks(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Moz Spam Score (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={spamScore}
                onChange={(e) => setSpamScore(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Domain Age (Years)</label>
              <input
                type="number"
                min="0"
                value={domainAgeYears}
                onChange={(e) => setDomainAgeYears(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Indexed Pages</label>
              <input
                type="number"
                value={indexedPages}
                onChange={(e) => setIndexedPages(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
          </div>

          {/* Pricing & Commercial terms */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Publisher Wholesale Price ($)</label>
              <input
                type="number"
                value={publisherPrice}
                onChange={(e) => setPublisherPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Client Retail Price ($)</label>
              <input
                type="number"
                value={clientPrice}
                onChange={(e) => setClientPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Placement Type</label>
              <select
                value={sponsoredTag}
                onChange={(e) => setSponsoredTag(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
              >
                <option value="Non-Sponsored">Non-Sponsored (Editorial)</option>
                <option value="Sponsored">Sponsored Tag</option>
                <option value="Editorial">Editorial Contributor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 cursor-pointer">
              <input
                type="checkbox"
                checked={contextualLink}
                onChange={(e) => setContextualLink(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-emerald-400 focus:ring-0"
              />
              <span className="text-slate-200">Contextual In-Content Link Allowed</span>
            </label>
            <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 cursor-pointer">
              <input
                type="checkbox"
                checked={authorBioLink}
                onChange={(e) => setAuthorBioLink(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-emerald-400 focus:ring-0"
              />
              <span className="text-slate-200">Author Bio Link Allowed</span>
            </label>
          </div>

          {/* Contact & Outreach Pages */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Contact Editor Name</label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Sarah Miller"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="editor@domain.com"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Role / Position</label>
              <input
                type="text"
                value={contactRole}
                onChange={(e) => setContactRole(e.target.value)}
                placeholder="e.g. Content Lead"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Write For Us Page URL</label>
              <input
                type="url"
                value={writeForUsPage}
                onChange={(e) => setWriteForUsPage(e.target.value)}
                placeholder="https://domain.com/write-for-us"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Contact Page URL</label>
              <input
                type="url"
                value={contactPage}
                onChange={(e) => setContactPage(e.target.value)}
                placeholder="https://domain.com/contact"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Editorial Guidelines Note</label>
            <textarea
              rows={2}
              value={editorialGuidelines}
              onChange={(e) => setEditorialGuidelines(e.target.value)}
              placeholder="e.g. 1,500+ words, no promotional intros, minimum 2 primary research references."
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Sticky Modal Action Buttons */}
          <div className="pt-3 sticky bottom-0 bg-slate-900 border-t border-slate-800 flex items-center justify-end gap-2 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all active:scale-95"
            >
              Add Website to Database
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
