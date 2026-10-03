/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SeoProvider, useSeo, PUBLIC_PAGES } from './context/SeoContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { WebsiteFinderView } from './components/finder/WebsiteFinderView';
import { SearchResultsTableView } from './components/finder/SearchResultsTableView';
import { WebsiteDatabaseView } from './components/database/WebsiteDatabaseView';
import { SeoAnalysisView } from './components/analysis/SeoAnalysisView';
import { WebsiteComparisonView } from './components/comparison/WebsiteComparisonView';
import { OutreachView } from './components/outreach/OutreachView';
import { FollowupsView } from './components/followups/FollowupsView';
import { PublishersView } from './components/publishers/PublishersView';
import { ContactsView } from './components/contacts/ContactsView';
import { CampaignsView } from './components/campaigns/CampaignsView';
import { SearchHistoryView } from './components/history/SearchHistoryView';
import { OrdersView } from './components/orders/OrdersView';
import { BacklinkTrackerView } from './components/backlinks/BacklinkTrackerView';
import { ProfitCalculatorView } from './components/calculator/ProfitCalculatorView';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';
import { WebsiteDetailModal } from './components/modals/WebsiteDetailModal';
import { EditWebsiteModal } from './components/modals/EditWebsiteModal';
import { AddWebsiteModal } from './components/modals/AddWebsiteModal';
import { OutreachModal } from './components/modals/OutreachModal';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { PublicWebsiteView } from './components/website/PublicWebsiteView';
import { X, CheckCircle2, AlertTriangle, Info, AlertOctagon } from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    activeTab,
    isAddModalOpen,
    setIsAddModalOpen,
    detailModalSite,
    setDetailModalSite,
    editModalSite,
    setEditModalSite,
    outreachModalSite,
    setOutreachModalSite,
    toasts,
    removeToast
  } = useSeo();

  // If activeTab belongs to public website pages, render PublicWebsiteView
  const isPublicPage = PUBLIC_PAGES.includes(activeTab);

  if (isPublicPage) {
    return (
      <div className="min-h-screen w-screen bg-slate-950 text-slate-100 flex flex-col overflow-y-auto">
        <PublicWebsiteView />

        {/* Global Modals for preview interactions */}
        {isAddModalOpen && (
          <AddWebsiteModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}
        {detailModalSite && (
          <WebsiteDetailModal
            site={detailModalSite}
            onClose={() => setDetailModalSite(null)}
          />
        )}
        {editModalSite && (
          <EditWebsiteModal
            site={editModalSite}
            onClose={() => setEditModalSite(null)}
          />
        )}
        {outreachModalSite && (
          <OutreachModal
            site={outreachModalSite}
            onClose={() => setOutreachModalSite(null)}
          />
        )}

        {/* Toast Notifications */}
        <div className="fixed bottom-5 right-3 sm:right-5 z-50 space-y-2 pointer-events-none max-w-sm w-full">
          {toasts.map((toast) => {
            let icon = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
            if (toast.type === 'error') {
              icon = <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />;
            } else if (toast.type === 'warning') {
              icon = <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
            } else if (toast.type === 'info') {
              icon = <Info className="w-4 h-4 text-cyan-400 shrink-0" />;
            }

            return (
              <div
                key={toast.id}
                className="flex items-center justify-between p-3.5 bg-slate-900/95 border border-slate-700/80 rounded-xl shadow-2xl backdrop-blur-md pointer-events-auto transition-all animate-slide-up"
              >
                <div className="flex items-center gap-2.5 mr-3">
                  {icon}
                  <div>
                    <span className="text-xs font-semibold text-slate-200 block">{toast.title}</span>
                    {toast.description && (
                      <span className="text-[11px] text-slate-400">{toast.description}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Dashboard Workspace Routing
  const renderActiveView = () => {
    switch (activeTab) {
      // 1. Overview
      case 'overview':
      case 'dashboard':
        return <DashboardView />;

      // 2. Find Guest Post Sites
      case 'finder':
        return <WebsiteFinderView />;

      // 3. Search Results
      case 'results':
        return <SearchResultsTableView />;

      // 4. Saved Sites
      case 'saved':
      case 'database':
        return <WebsiteDatabaseView />;

      // 5. Site Analysis
      case 'analysis':
        return <SeoAnalysisView />;

      // 6. Outreach / Contacts
      case 'outreach':
        return <OutreachView />;
      case 'contacts':
        return <ContactsView />;
      case 'publishers':
        return <PublishersView />;
      case 'followups':
        return <FollowupsView />;

      // 7. Campaigns
      case 'campaigns':
        return <CampaignsView />;

      // 8. Reports
      case 'reports':
        return <ReportsView />;

      // 9. Settings
      case 'settings':
        return <SettingsView />;

      // Supporting Tools
      case 'history':
        return <SearchHistoryView />;
      case 'backlinks':
        return <BacklinkTrackerView />;
      case 'orders':
        return <OrdersView />;
      case 'comparison':
        return <WebsiteComparisonView />;
      case 'calculator':
        return <ProfitCalculatorView />;

      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar />

        <main className="flex-1 overflow-y-auto bg-slate-950 pb-16 lg:pb-0">
          {renderActiveView()}
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>

      {/* Global Modals */}
      {isAddModalOpen && (
        <AddWebsiteModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {detailModalSite && (
        <WebsiteDetailModal
          site={detailModalSite}
          onClose={() => setDetailModalSite(null)}
        />
      )}

      {editModalSite && (
        <EditWebsiteModal
          site={editModalSite}
          onClose={() => setEditModalSite(null)}
        />
      )}

      {outreachModalSite && (
        <OutreachModal
          site={outreachModalSite}
          onClose={() => setOutreachModalSite(null)}
        />
      )}

      {/* Toast Notifications */}
      <div className="fixed bottom-18 lg:bottom-5 right-3 sm:right-5 z-50 space-y-2 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => {
          let icon = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
          let border = 'border-slate-800';
          if (toast.type === 'warning') {
            icon = <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
            border = 'border-amber-500/40';
          } else if (toast.type === 'error') {
            icon = <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />;
            border = 'border-rose-500/40';
          } else if (toast.type === 'info') {
            icon = <Info className="w-4 h-4 text-cyan-400 shrink-0" />;
            border = 'border-cyan-500/40';
          }

          return (
            <div
              key={toast.id}
              className={`p-3 bg-slate-900/95 border ${border} rounded-xl shadow-xl pointer-events-auto flex items-start gap-2.5 transition-all text-xs`}
            >
              {icon}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white truncate">{toast.title}</div>
                {toast.description && (
                  <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                    {toast.description}
                  </div>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <SeoProvider>
      <MainContent />
    </SeoProvider>
  );
}
