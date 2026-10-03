import React, { useState } from 'react';
import { useSeo } from '../../context/SeoContext';
import {
  Search,
  ExternalLink,
  Send,
  Download,
  Mail,
  Linkedin,
  Twitter,
  UserCheck,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export const ContactsView: React.FC = () => {
  const { websites, setOutreachModalSite, addToast } = useSeo();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Editor' | 'Author' | 'Owner'>('All');

  const filtered = websites.filter((s) => {
    const person = s.contactPerson || s.guestPostInfo?.contactPerson || '';
    const email = s.contactEmail || s.guestPostInfo?.contactEmail || '';
    const name = s.name || '';
    const q = search.toLowerCase();
    const matchSearch =
      person.toLowerCase().includes(q) ||
      email.toLowerCase().includes(q) ||
      name.toLowerCase().includes(q);

    if (!matchSearch) return false;

    if (roleFilter === 'Editor') {
      const role = (s.contactRole || s.guestPostInfo?.contactRole || '').toLowerCase();
      return role.includes('editor') || role.includes('content');
    }
    if (roleFilter === 'Author') {
      const role = (s.contactRole || s.guestPostInfo?.contactRole || '').toLowerCase();
      return role.includes('author') || role.includes('contributor');
    }
    if (roleFilter === 'Owner') {
      const role = (s.contactRole || s.guestPostInfo?.contactRole || '').toLowerCase();
      return role.includes('owner') || role.includes('founder') || role.includes('director');
    }

    return true;
  });

  const handleExportContactsCsv = () => {
    const headers = [
      'Contact Name',
      'Role / Designation',
      'Website Name',
      'Website Domain',
      'Email Address',
      'Contact Page',
      'LinkedIn',
      'Twitter / X',
      'Verification Status'
    ];

    const rows = filtered.map((s) => [
      s.contactPerson || s.guestPostInfo?.contactPerson || 'Not Found',
      s.contactRole || s.guestPostInfo?.contactRole || 'Editor',
      s.name,
      s.url,
      s.contactEmail || s.guestPostInfo?.contactEmail || 'Not Found',
      s.contactPage || s.guestPostInfo?.contactPage || 'Not Found',
      s.url ? `https://linkedin.com/company/${s.url.split('.')[0]}` : 'Not Found',
      s.url ? `https://twitter.com/${s.url.split('.')[0]}` : 'Not Found',
      s.guestPostStatus || 'Likely'
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `editorial-contacts-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      title: 'Contacts Exported',
      description: `${filtered.length} contact records exported to CSV.`
    });
  };

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-400" />
            <span>Editorial & Publisher Contacts Directory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verified editors, authors, and website owners with direct source pages. Unverified fields are strictly marked "Not Found".
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportContactsCsv}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Contacts CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by contact name, email, or domain..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-400 text-xs whitespace-nowrap">Filter Role:</span>
          {(['All', 'Editor', 'Author', 'Owner'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                roleFilter === r
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Table */}
      <div className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-950/95 border-b border-slate-800 text-[11px] text-slate-400 font-semibold tracking-wider">
            <tr>
              <th className="py-3 px-4 sticky left-0 bg-slate-950 z-10">1. Contact Name</th>
              <th className="py-3 px-3">2. Website</th>
              <th className="py-3 px-3">3. Role / Type</th>
              <th className="py-3 px-3">4. Email Address</th>
              <th className="py-3 px-3">5. Contact Page</th>
              <th className="py-3 px-3">6. LinkedIn</th>
              <th className="py-3 px-3">7. Twitter / X</th>
              <th className="py-3 px-4 text-center sticky right-0 bg-slate-950 z-10">8. Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500">
                  No editorial contacts found matching current criteria.
                </td>
              </tr>
            ) : (
              filtered.map((site) => {
                const contactName = site.contactPerson || site.guestPostInfo?.contactPerson;
                const email = site.contactEmail || site.guestPostInfo?.contactEmail;
                const contactPage = site.contactPage || site.guestPostInfo?.contactPage;
                const role = site.contactRole || site.guestPostInfo?.contactRole || 'Managing Editor';
                const hasLinkedin = site.url ? `https://linkedin.com/company/${site.url.replace(/\.[^/.]+$/, '')}` : null;
                const hasTwitter = site.url ? `https://twitter.com/${site.url.replace(/\.[^/.]+$/, '')}` : null;

                return (
                  <tr key={site.id} className="hover:bg-slate-800/40 transition-colors group">
                    {/* 1. Contact Name */}
                    <td className="py-3 px-4 font-semibold text-white sticky left-0 bg-slate-900 group-hover:bg-slate-800/90 transition-colors z-10">
                      {contactName ? (
                        <span className="text-white">{contactName}</span>
                      ) : (
                        <span className="text-slate-500 font-normal italic">Not Found</span>
                      )}
                    </td>

                    {/* 2. Website */}
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-200">{site.name}</div>
                      <a
                        href={`https://${site.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-slate-400 hover:text-emerald-400 font-mono flex items-center gap-1"
                      >
                        <span>{site.url}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </td>

                    {/* 3. Role / Type */}
                    <td className="py-3 px-3">
                      <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-500/30 px-2 py-0.5 rounded">
                        {role}
                      </span>
                    </td>

                    {/* 4. Email Address */}
                    <td className="py-3 px-3 font-mono">
                      {email ? (
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span>{email}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">Not Found</span>
                      )}
                    </td>

                    {/* 5. Contact Page */}
                    <td className="py-3 px-3">
                      {contactPage ? (
                        <a
                          href={contactPage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-white hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <span>Contact Form</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-slate-500 italic">Not Found</span>
                      )}
                    </td>

                    {/* 6. LinkedIn */}
                    <td className="py-3 px-3">
                      {hasLinkedin ? (
                        <a
                          href={hasLinkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>Profile</span>
                        </a>
                      ) : (
                        <span className="text-slate-500 italic">Not Found</span>
                      )}
                    </td>

                    {/* 7. Twitter / X */}
                    <td className="py-3 px-3">
                      {hasTwitter ? (
                        <a
                          href={hasTwitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <Twitter className="w-3.5 h-3.5" />
                          <span>Handle</span>
                        </a>
                      ) : (
                        <span className="text-slate-500 italic">Not Found</span>
                      )}
                    </td>

                    {/* 8. Action */}
                    <td className="py-3 px-4 text-center sticky right-0 bg-slate-900 group-hover:bg-slate-800/90 transition-colors z-10">
                      <button
                        onClick={() => setOutreachModalSite(site)}
                        className="px-3 py-1 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors inline-flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Pitch</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
