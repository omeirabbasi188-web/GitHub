import React from 'react';
import { useSeo } from '../../context/SeoContext';
import { SearchHistoryItem } from '../../types/seo';
import {
  History,
  RotateCcw,
  Trash2,
  Search,
  ExternalLink,
  Filter,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

export const SearchHistoryView: React.FC = () => {
  const {
    searchHistory,
    deleteSearchHistoryItem,
    clearSearchHistory,
    setFilters,
    runSearch,
    setActiveTab,
    addToast
  } = useSeo();

  const handleRerunSearch = (item: SearchHistoryItem) => {
    if (item.filters) {
      setFilters(item.filters as any);
    }
    setActiveTab('results');
    runSearch(item.filters as any);
    addToast({
      type: 'info',
      title: 'Re-running Discovery',
      description: `Executed query: ${item.query}`
    });
  };

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-400" />
            <span>Search & Discovery History</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Audit log of all past discovery runs, queries executed, and filter parameters applied.
          </p>
        </div>

        {searchHistory.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Clear all search query history?')) {
                clearSearchHistory();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-rose-400 hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {searchHistory.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-slate-800 rounded-xl space-y-3">
          <History className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-white">No search history recorded yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Once you execute discovery queries in the Find Guest Post Sites module, past runs will appear here for fast re-execution.
          </p>
          <button
            onClick={() => setActiveTab('finder')}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all"
          >
            Run First Search
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {searchHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-white bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    {item.query}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {item.niche}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{item.timestamp}</span>
                  </span>
                  <span>·</span>
                  <span>Results Discovered: <strong className="text-slate-200 font-mono">{item.resultsCount}</strong></span>
                  <span>·</span>
                  <span>
                    Min DA/DR: <strong className="text-slate-200 font-mono">{item.filters?.daMin ?? 40}+</strong>
                  </span>
                  <span>·</span>
                  <span>
                    Min Traffic: <strong className="text-slate-200 font-mono">{(item.filters?.trafficMin ?? 10000).toLocaleString()}+</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleRerunSearch(item)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-run Search</span>
                </button>
                <button
                  onClick={() => deleteSearchHistoryItem(item.id)}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                  title="Delete Entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
