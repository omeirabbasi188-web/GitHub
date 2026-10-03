import React, { useState } from 'react';
import { useSeo } from '../../context/SeoContext';
import { Website, NicheType } from '../../types/seo';
import { X, Edit3 } from 'lucide-react';

interface Props {
  site: Website | null;
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

export const EditWebsiteModal: React.FC<Props> = ({ site, onClose }) => {
  const { updateWebsite, addToast } = useSeo();

  if (!site) return null;

  const [name, setName] = useState(site.name);
  const [url, setUrl] = useState(site.url);
  const [niche, setNiche] = useState(site.niche);
  const [country, setCountry] = useState(site.country);
  const [da, setDa] = useState<number>(site.da ?? 40);
  const [dr, setDr] = useState<number>(site.dr ?? 40);
  const [as, setAs] = useState<number>(site.as ?? 40);
  const [tf, setTf] = useState<number>(site.tf ?? 30);
  const [cf, setCf] = useState<number>(site.cf ?? 30);
  const [organicTraffic, setOrganicTraffic] = useState<number>(site.organicTraffic ?? 10000);
  const [referringDomains, setReferringDomains] = useState<number>(site.referringDomains ?? 500);
  const [backlinks, setBacklinks] = useState<number>(site.backlinks ?? 5000);
  const [dofollowLinks, setDofollowLinks] = useState<number>(site.dofollowLinks ?? 4000);
  const [nofollowLinks, setNofollowLinks] = useState<number>(site.nofollowLinks ?? 1000);
  const [spamScore, setSpamScore] = useState<number>(site.spamScore ?? 1);
  const [domainAgeYears, setDomainAgeYears] = useState<number>(site.domainAgeYears ?? 5);
  const [indexedPages, setIndexedPages] = useState<number>(site.indexedPages ?? 2000);
  const [publisherPrice, setPublisherPrice] = useState<number>(site.guestPostInfo?.publisherPrice ?? site.publisherPrice ?? 100);
  const [clientPrice, setClientPrice] = useState<number>(site.guestPostInfo?.clientPrice ?? site.clientPrice ?? 250);
  const [contextualLink, setContextualLink] = useState(site.contextualLink ?? site.guestPostInfo?.contextualLink ?? true);
  const [authorBioLink, setAuthorBioLink] = useState(site.authorBioLink ?? site.guestPostInfo?.authorBio ?? true);
  const [sponsoredTag, setSponsoredTag] = useState(site.sponsoredTag ?? site.guestPostInfo?.sponsored ?? 'Non-Sponsored');
  const [turnaroundTime, setTurnaroundTime] = useState(site.turnaroundTime ?? site.guestPostInfo?.turnaroundTime ?? '3-5 days');
  const [wordCount, setWordCount] = useState(site.wordCount ?? (typeof site.guestPostInfo?.minWordCount === 'string' ? site.guestPostInfo.minWordCount : '1,500 words'));
  const [contactPerson, setContactPerson] = useState(site.contactPerson ?? site.guestPostInfo?.contactPerson ?? '');
  const [contactEmail, setContactEmail] = useState(site.contactEmail ?? site.guestPostInfo?.contactEmail ?? '');
  const [contactRole, setContactRole] = useState(site.contactRole ?? site.guestPostInfo?.contactRole ?? '');
  const [contactPage, setContactPage] = useState(site.contactPage || site.guestPostInfo?.contactPage || '');
  const [writeForUsPage, setWriteForUsPage] = useState(site.writeForUsPage || site.guestPostInfo?.writeForUsPage || '');
  const [editorialGuidelines, setEditorialGuidelines] = useState(site.editorialGuidelines || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateWebsite(site.id, {
      name,
      url,
      niche,
      country,
      da: Number(da),
      dr: Number(dr),
      as: Number(as),
      tf: Number(tf),
      cf: Number(cf),
      organicTraffic: Number(organicTraffic),
      referringDomains: Number(referringDomains),
      backlinks: Number(backlinks),
      dofollowLinks: Number(dofollowLinks),
      nofollowLinks: Number(nofollowLinks),
      spamScore: Number(spamScore),
      domainAgeYears: Number(domainAgeYears),
      indexedPages: Number(indexedPages),
      publisherPrice: Number(publisherPrice),
      clientPrice: Number(clientPrice),
      contextualLink,
      authorBioLink,
      sponsoredTag,
      turnaroundTime,
      wordCount,
      contactPerson,
      contactEmail,
      contactRole,
      contactPage,
      writeForUsPage,
      editorialGuidelines,
      guestPostInfo: {
        ...(site.guestPostInfo || {
          guestPostUrl: writeForUsPage || `https://${url}/write-for-us`,
          requirementsSummary: ['Original high-quality post'],
          allowedNiches: [niche],
          linkType: 'Dofollow',
          articleRequirements: 'Pitch topics first',
          contactSourceUrl: writeForUsPage || ''
        }),
        publisherPrice: Number(publisherPrice),
        clientPrice: Number(clientPrice),
        contactPerson: contactPerson || site.guestPostInfo?.contactPerson || '',
        contactEmail: contactEmail || site.guestPostInfo?.contactEmail || '',
        contactRole: contactRole || site.guestPostInfo?.contactRole || '',
        contactPage: contactPage || site.guestPostInfo?.contactPage || '',
        writeForUsPage: writeForUsPage || site.guestPostInfo?.writeForUsPage || '',
        turnaroundTime: turnaroundTime || site.guestPostInfo?.turnaroundTime || '',
        minWordCount: wordCount || site.guestPostInfo?.minWordCount || '1,000 words',
        contextualLink: Boolean(contextualLink),
        authorBio: Boolean(authorBioLink)
      }
    });

    addToast({
      type: 'success',
      title: 'Metrics Updated',
      description: `Updated metrics and pricing for ${name}.`
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
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate max-w-[240px] sm:max-w-none">
                Edit Metrics: {site.name}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">{site.url}</p>
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

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Website Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Domain URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Primary Niche</label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value as NicheType)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
              >
                {NICHES.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
              />
            </div>
          </div>

          {/* Third Party Authority Metrics */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-[11px] font-semibold text-slate-300 block">
              Third-Party Authority Scores
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center font-mono">
              <div>
                <label className="text-slate-400 block text-[10px] font-sans">Moz DA</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={da}
                  onChange={(e) => setDa(Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-center text-white text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[10px] font-sans">Ahrefs DR</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={dr}
                  onChange={(e) => setDr(Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-center text-white text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[10px] font-sans">Semrush AS</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={as}
                  onChange={(e) => setAs(Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-center text-white text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[10px] font-sans">Majestic TF</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={tf}
                  onChange={(e) => setTf(Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-center text-white text-xs"
                />
              </div>
              <div>
                <label className="text-slate-400 block text-[10px] font-sans">Majestic CF</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={cf}
                  onChange={(e) => setCf(Number(e.target.value))}
                  className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-center text-slate-400 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Traffic and Link profile */}
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
                value={spamScore}
                onChange={(e) => setSpamScore(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Domain Age (Years)</label>
              <input
                type="number"
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

          {/* Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Publisher Price ($)</label>
              <input
                type="number"
                value={publisherPrice}
                onChange={(e) => setPublisherPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Client Price ($)</label>
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
                <option value="Non-Sponsored">Non-Sponsored</option>
                <option value="Sponsored">Sponsored</option>
                <option value="Editorial">Editorial</option>
              </select>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Contact Editor</label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Contact Role</label>
              <input
                type="text"
                value={contactRole}
                onChange={(e) => setContactRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Write For Us Page</label>
              <input
                type="url"
                value={writeForUsPage}
                onChange={(e) => setWriteForUsPage(e.target.value)}
                placeholder="https://domain.com/write-for-us"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Contact Page</label>
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
            <label className="text-slate-400 block mb-1">Editorial Guidelines</label>
            <textarea
              rows={2}
              value={editorialGuidelines}
              onChange={(e) => setEditorialGuidelines(e.target.value)}
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
              Update Website
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
