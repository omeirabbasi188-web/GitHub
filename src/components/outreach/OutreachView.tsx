import React, { useState } from 'react';
import { useSeo } from '../../context/SeoContext';
import { OutreachItem } from '../../types/seo';
import { formatCurrency } from '../../utils/seoCalculations';
import {
  Plus,
  Send,
  Calendar,
  DollarSign,
  FileText,
  ExternalLink,
  Trash2,
  Edit3,
  Link2
} from 'lucide-react';

const STATUS_COLUMNS: OutreachItem['status'][] = [
  'Not Contacted',
  'Contacted',
  'Follow-up',
  'Replied',
  'Interested',
  'Published',
  'Rejected'
];

export const OutreachView: React.FC = () => {
  const {
    outreachList,
    updateOutreach,
    deleteOutreach,
    addBacklink,
    websites,
    setOutreachModalSite,
    addToast
  } = useSeo();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [filterClient, setFilterClient] = useState<string>('All Clients');

  const clients = Array.from(
    new Set(outreachList.map((o) => o.clientName).filter(Boolean))
  );

  const filteredOutreach = outreachList.filter((item) => {
    if (filterClient !== 'All Clients' && item.clientName !== filterClient) {
      return false;
    }
    return true;
  });

  const handleStatusChange = (id: string, newStatus: OutreachItem['status']) => {
    updateOutreach(id, { status: newStatus });
  };

  const handlePromoteToBacklink = (item: OutreachItem) => {
    addBacklink({
      id: `bl-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      publishedUrl: item.contentDraftUrl || `https://${item.websiteUrl}/guest-post-${Date.now()}`,
      targetUrl: 'https://client-landing-page.com',
      anchorText: item.pitchTopic.split(':')[0] || 'strategic link',
      linkType: 'Contextual',
      followType: 'Dofollow',
      datePublished: new Date().toISOString().split('T')[0],
      publisher: item.websiteName,
      client: item.clientName,
      article: item.pitchTopic,
      status: 'Live & Indexed',
      lastChecked: new Date().toISOString().replace('T', ' ').substring(0, 16),
      httpStatus: 200
    });
    addToast({
      type: 'success',
      title: 'Promoted to Backlink Tracker',
      description: `Backlink tracked for ${item.websiteName}.`
    });
  };

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Guest Post Outreach & Pipeline CRM
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage editorial pitch lifecycles: draft personalized emails, negotiate publisher fees, track writing progress, and convert published articles into monitored backlinks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Client Filter */}
          <select
            value={filterClient}
            onChange={(e) => setFilterClient(e.target.value)}
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400"
          >
            <option value="All Clients">All Clients</option>
            {clients.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1 rounded-md transition-colors ${
                viewMode === 'kanban' ? 'bg-slate-700 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-md transition-colors ${
                viewMode === 'table' ? 'bg-slate-700 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Table
            </button>
          </div>

          <button
            onClick={() => {
              if (websites.length > 0) {
                setOutreachModalSite(websites[0]);
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Pitch</span>
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 overflow-x-auto pb-4">
          {STATUS_COLUMNS.map((colStatus) => {
            const itemsInCol = filteredOutreach.filter((i) => i.status === colStatus);
            return (
              <div
                key={colStatus}
                className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3 flex flex-col min-w-[210px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="text-xs font-semibold text-slate-200 truncate">
                    {colStatus}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 font-bold">
                    {itemsInCol.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-2.5 flex-1">
                  {itemsInCol.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all space-y-2 group"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div className="font-semibold text-xs text-white truncate">
                          {item.websiteName}
                        </div>
                        <a
                          href={`https://${item.websiteUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-slate-200"
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>

                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed font-sans">
                        {item.pitchTopic}
                      </p>

                      <div className="text-[10px] text-slate-400 space-y-0.5">
                        <div className="truncate">Contact: {item.contactPerson}</div>
                        <div className="truncate text-slate-400">Client: {item.clientName}</div>
                      </div>

                      {/* Pricing and Payment badge */}
                      <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-700/60 font-mono">
                        <div className="flex items-center gap-1">
                          <span className="text-slate-400">Agreed:</span>
                          <span className="font-semibold text-emerald-400">
                            {item.agreedPrice > 0 ? formatCurrency(item.agreedPrice) : 'Negotiating'}
                          </span>
                        </div>
                        <select
                          value={item.paymentStatus || 'Unpaid'}
                          onChange={(e) =>
                            updateOutreach(item.id, {
                              paymentStatus: e.target.value as any
                            })
                          }
                          className={`text-[9px] px-1.5 py-0.5 rounded border ${
                            item.paymentStatus === 'Paid'
                              ? 'bg-emerald-950 border-emerald-500/40 text-emerald-400'
                              : item.paymentStatus === 'Invoiced'
                              ? 'bg-cyan-950 border-cyan-500/40 text-cyan-300'
                              : 'bg-slate-900 border-slate-700 text-slate-400'
                          }`}
                        >
                          <option value="Unpaid">Unpaid</option>
                          <option value="Invoiced">Invoiced</option>
                          <option value="Paid">Paid</option>
                        </select>
                      </div>

                      {/* Status Selector & Actions */}
                      <div className="pt-2 flex items-center justify-between gap-1 border-t border-slate-700/50">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value as OutreachItem['status'])
                          }
                          className="text-[10px] bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-slate-300 focus:outline-none"
                        >
                          {STATUS_COLUMNS.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>

                        <div className="flex items-center gap-1">
                          {item.status === 'Published' && (
                            <button
                              onClick={() => handlePromoteToBacklink(item)}
                              className="p-1 text-emerald-400 hover:bg-slate-700 rounded"
                              title="Track Live Backlink"
                            >
                              <Link2 className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteOutreach(item.id)}
                            className="p-1 text-slate-400 hover:text-rose-400 rounded"
                            title="Delete pitch"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {itemsInCol.length === 0 && (
                    <div className="p-4 text-center text-[11px] text-slate-400 border border-dashed border-slate-800/80 rounded-lg">
                      No pitches
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-950/90 border-b border-slate-800 text-[11px] text-slate-400 font-medium">
              <tr>
                <th className="py-3 px-4">Website</th>
                <th className="py-3 px-3">Pitch Subject / Topic</th>
                <th className="py-3 px-3">Contact Person</th>
                <th className="py-3 px-3">Client</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Agreed Fee</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Outreach Date</th>
                <th className="py-3 px-3">Next Follow-up</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono">
              {filteredOutreach.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-white">
                    {item.websiteName}
                    <div className="text-[10px] text-slate-400">{item.websiteUrl}</div>
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-200 max-w-[240px] truncate">
                    {item.pitchTopic}
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-300">
                    <div>{item.contactPerson}</div>
                    <div className="text-[10px] text-slate-400">{item.contactEmail}</div>
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-400">{item.clientName}</td>
                  <td className="py-3 px-3 font-sans">
                    <span className="font-semibold text-emerald-400">{item.status}</span>
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-emerald-400 font-semibold">
                    {item.agreedPrice > 0 ? formatCurrency(item.agreedPrice) : '—'}
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <select
                      value={item.paymentStatus || 'Unpaid'}
                      onChange={(e) =>
                        updateOutreach(item.id, {
                          paymentStatus: e.target.value as any
                        })
                      }
                      className={`text-[10px] px-2 py-0.5 rounded border ${
                        item.paymentStatus === 'Paid'
                          ? 'bg-emerald-950 border-emerald-500/40 text-emerald-400 font-semibold'
                          : item.paymentStatus === 'Invoiced'
                          ? 'bg-cyan-950 border-cyan-500/40 text-cyan-300'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      <option value="Unpaid">Unpaid</option>
                      <option value="Invoiced">Invoiced</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </td>
                  <td className="py-3 px-3 text-slate-400">{item.sentDate}</td>
                  <td className="py-3 px-3 text-slate-300">
                    {item.nextFollowupDate || '—'}
                  </td>
                  <td className="py-3 px-4 font-sans text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {item.status === 'Published' && (
                        <button
                          onClick={() => handlePromoteToBacklink(item)}
                          className="px-2 py-1 text-[11px] text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded"
                          title="Track Live Backlink"
                        >
                          Track Link
                        </button>
                      )}
                      <button
                        onClick={() => deleteOutreach(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-400 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
