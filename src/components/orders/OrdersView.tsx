import React, { useState } from 'react';
import { useSeo } from '../../context/SeoContext';
import { GuestPostOrder } from '../../types/seo';
import { formatCurrency } from '../../utils/seoCalculations';
import {
  Plus,
  ExternalLink,
  Link2,
  LayoutGrid,
  List,
  CheckCircle2,
  Clock,
  DollarSign
} from 'lucide-react';

const ORDER_STATUSES: GuestPostOrder['status'][] = [
  'Requirement Briefing',
  'Content In Production',
  'Editorial Review',
  'Published',
  'Paid'
];

export const OrdersView: React.FC = () => {
  const { ordersList, updateOrder, addOrder, addBacklink, websites, addToast } = useSeo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // New order form state
  const [clientName, setClientName] = useState('');
  const [websiteId, setWebsiteId] = useState(websites[0]?.id || '');
  const [targetUrl, setTargetUrl] = useState('');
  const [anchorText, setAnchorText] = useState('');
  const [articleTopic, setArticleTopic] = useState('');
  const [wordCount, setWordCount] = useState(1500);
  const [clientPrice, setClientPrice] = useState(200);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [assignedWriter, setAssignedWriter] = useState('In-House Editorial');

  const selectedSite = websites.find((s) => s.id === websiteId) || websites[0];

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !targetUrl.trim() || !anchorText.trim()) {
      addToast({
        type: 'warning',
        title: 'Missing Required Fields',
        description: 'Please specify Client Name, Target URL, and Exact Anchor Text.'
      });
      return;
    }

    const pubPrice = selectedSite.guestPostInfo?.publisherPrice ?? selectedSite.publisherPrice ?? 100;
    const clPrice = Number(clientPrice) || 200;

    addOrder({
      id: `gpo-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      orderNumber: `GPO-2026-${Math.floor(100 + Math.random() * 900)}`,
      clientName: clientName.trim(),
      websiteId: selectedSite.id,
      websiteName: selectedSite.name,
      websiteUrl: selectedSite.url,
      targetUrl: targetUrl.trim(),
      anchorText: anchorText.trim(),
      articleTopic: articleTopic.trim() || `${selectedSite.niche} Growth Guide`,
      wordCount: wordCount || 1500,
      wordCountTarget: wordCount || 1500,
      publisherPrice: pubPrice,
      clientPrice: clPrice,
      profit: clPrice - pubPrice,
      status: 'Requirement Briefing',
      dueDate,
      assignedWriter,
      createdDate: new Date().toISOString().split('T')[0]
    });

    setIsModalOpen(false);
    setClientName('');
    setTargetUrl('');
    setAnchorText('');
    setArticleTopic('');

    addToast({
      type: 'success',
      title: 'Order Created',
      description: `Guest post order booked for ${selectedSite.name}.`
    });
  };

  const handlePromoteToBacklink = (order: GuestPostOrder) => {
    const site = websites.find((s) => s.id === order.websiteId);
    addBacklink({
      id: `bl-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      publishedUrl: order.draftUrl || `https://${site?.url || 'domain.com'}/article-${Date.now()}`,
      targetUrl: order.targetUrl,
      anchorText: order.anchorText,
      linkType: 'Contextual',
      followType: 'Dofollow',
      datePublished: new Date().toISOString().split('T')[0],
      publisher: order.websiteName,
      client: order.clientName,
      article: order.articleTopic,
      status: 'Live & Indexed',
      lastChecked: new Date().toISOString().replace('T', ' ').substring(0, 16),
      httpStatus: 200
    });
    addToast({
      type: 'success',
      title: 'Promoted to Backlink Tracker',
      description: `Backlink record created for order ${order.orderNumber || order.id}.`
    });
  };

  const totalRevenue = ordersList.reduce((acc: number, o: GuestPostOrder) => acc + o.clientPrice, 0);
  const totalCost = ordersList.reduce((acc: number, o: GuestPostOrder) => acc + o.publisherPrice, 0);
  const totalProfit = totalRevenue - totalCost;

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Guest Post Client Orders & Deliverables
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track client guest post orders, word counts, target URLs, and agency profit margins.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'table' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'cards' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Client Order</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-3 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Total Orders</span>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
            {ordersList.length}
          </div>
          <span className="text-[10px] text-slate-500">In production & published</span>
        </div>
        <div className="p-3 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium">Pipeline Volume</span>
          <div className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono mt-1">
            {formatCurrency(totalRevenue)}
          </div>
          <span className="text-[10px] text-slate-500">Gross billed value</span>
        </div>
        <div className="p-3 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
          <span className="text-[11px] text-slate-400 font-medium">Projected Margin</span>
          <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono mt-1">
            +{formatCurrency(totalProfit)}
          </div>
          <span className="text-[10px] text-slate-500">
            {totalRevenue > 0 ? Math.round((totalProfit / totalRevenue) * 100) : 0}% net agency margin
          </span>
        </div>
      </div>

      {/* CARDS VIEW FOR MOBILE */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ordersList.map((order) => {
            const profit = order.clientPrice - order.publisherPrice;

            return (
              <div
                key={order.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-sm text-white font-mono">{order.orderNumber}</div>
                    <div className="text-xs text-slate-400">{order.clientName}</div>
                  </div>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrder(order.id, {
                        status: e.target.value as GuestPostOrder['status']
                      })
                    }
                    className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-emerald-400 font-semibold focus:outline-none"
                  >
                    {ORDER_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Target Publisher:</span>
                    <span className="font-semibold text-emerald-400">{order.websiteName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Anchor Text:</span>
                    <span className="font-medium text-white">"{order.anchorText}"</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Target URL:</span>
                    <a
                      href={order.targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[11px] truncate max-w-[180px]"
                    >
                      <span className="truncate">{order.targetUrl}</span>
                      <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Article Topic:</span>
                    <span className="text-slate-300 truncate max-w-[200px]">{order.articleTopic}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Client / Cost</span>
                    <span className="text-white font-medium">${order.clientPrice}</span>
                    <span className="text-slate-500 mx-1">/</span>
                    <span className="text-slate-400">${order.publisherPrice}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Net Profit</span>
                    <span className="text-emerald-400 font-bold">+${profit}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Due Date</span>
                    <span className="text-slate-300">{order.dueDate}</span>
                  </div>
                </div>

                {order.status === 'Published' && (
                  <button
                    onClick={() => handlePromoteToBacklink(order)}
                    className="w-full py-1.5 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-lg hover:bg-emerald-900/60 transition-colors flex items-center justify-center gap-1.5 font-medium"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    <span>Track Live Backlink</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-950/90 border-b border-slate-800 text-[11px] text-slate-400 font-medium">
              <tr>
                <th className="py-3 px-4">Order ID & Client</th>
                <th className="py-3 px-3">Target Domain</th>
                <th className="py-3 px-3">Anchor & Target URL</th>
                <th className="py-3 px-3">Article Topic</th>
                <th className="py-3 px-3 text-right">Words</th>
                <th className="py-3 px-3 text-right">Client Price</th>
                <th className="py-3 px-3 text-right">Pub. Cost</th>
                <th className="py-3 px-3 text-right">Profit</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Due Date</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono">
              {ordersList.map((order) => {
                const profit = order.clientPrice - order.publisherPrice;
                return (
                  <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-sans">
                      <div className="font-semibold text-white">{order.orderNumber}</div>
                      <div className="text-[11px] text-slate-400">{order.clientName}</div>
                    </td>
                    <td className="py-3 px-3 font-sans text-emerald-400 font-medium">
                      {order.websiteName}
                    </td>
                    <td className="py-3 px-3 font-sans max-w-[220px]">
                      <div className="text-white font-medium truncate">"{order.anchorText}"</div>
                      <a
                        href={order.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-slate-400 hover:text-slate-200 truncate flex items-center gap-1 mt-0.5"
                      >
                        <span className="truncate">{order.targetUrl}</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-400 max-w-[200px] truncate">
                      {order.articleTopic}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums">
                      {order.wordCountTarget}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums font-semibold text-white">
                      {formatCurrency(order.clientPrice)}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-slate-400">
                      {formatCurrency(order.publisherPrice)}
                    </td>
                    <td className="py-3 px-3 text-right tabular-nums text-emerald-400 font-bold">
                      +{formatCurrency(profit)}
                    </td>
                    <td className="py-3 px-3 font-sans">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrder(order.id, {
                            status: e.target.value as GuestPostOrder['status']
                          })
                        }
                        className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-emerald-400 font-semibold focus:outline-none"
                      >
                        {ORDER_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-3 text-slate-400">{order.dueDate}</td>
                    <td className="py-3 px-4 font-sans text-center">
                      {order.status === 'Published' && (
                        <button
                          onClick={() => handlePromoteToBacklink(order)}
                          className="px-2.5 py-1 text-[11px] text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded hover:bg-emerald-900/60 transition-colors flex items-center gap-1 mx-auto"
                        >
                          <Link2 className="w-3 h-3" />
                          <span>Track Link</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal to add new order */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl my-auto overflow-hidden">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 shrink-0 bg-slate-900">
              <h3 className="text-base font-bold text-white">Create New Guest Post Order</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Acme SaaS Technologies"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Target Publisher Website *</label>
                <select
                  value={websiteId}
                  onChange={(e) => {
                    setWebsiteId(e.target.value);
                    const chosen = websites.find((s) => s.id === e.target.value);
                    if (chosen) setClientPrice(chosen.guestPostInfo?.clientPrice ?? chosen.clientPrice ?? 200);
                  }}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                >
                  {websites.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.url}) - Pub Price: ${s.guestPostInfo?.publisherPrice ?? s.publisherPrice ?? 100}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Target Landing Page URL *</label>
                  <input
                    type="url"
                    required
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="https://client.com/page"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Exact Anchor Text *</label>
                  <input
                    type="text"
                    required
                    value={anchorText}
                    onChange={(e) => setAnchorText(e.target.value)}
                    placeholder="e.g. cloud security audit"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Article Topic / Title</label>
                <input
                  type="text"
                  value={articleTopic}
                  onChange={(e) => setArticleTopic(e.target.value)}
                  placeholder="e.g. 10 Critical Vulnerabilities in Cloud Architecture"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Word Target</label>
                  <input
                    type="number"
                    value={wordCount}
                    onChange={(e) => setWordCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Client Price ($)</label>
                  <input
                    type="number"
                    value={clientPrice}
                    onChange={(e) => setClientPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="pt-3 sticky bottom-0 bg-slate-900 border-t border-slate-800 flex items-center justify-end gap-2 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-1">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-slate-900 bg-emerald-400 hover:bg-emerald-300 font-semibold rounded-lg"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
