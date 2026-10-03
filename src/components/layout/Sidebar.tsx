import React from 'react';
import { useSeo, NavigationTab } from '../../context/SeoContext';
import {
  LayoutDashboard,
  Search,
  TableProperties,
  Bookmark,
  BarChart3,
  Send,
  FolderKanban,
  LineChart,
  Settings,
  Link2,
  History,
  Scale,
  FileCheck2,
  Users,
  Globe,
  LogOut,
  X
} from 'lucide-react';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    websites,
    outreachList,
    campaigns,
    backlinksList,
    searchHistory,
    mobileMenuOpen,
    setMobileMenuOpen,
    user,
    logout,
    navigateToPublic
  } = useSeo();

  const savedCount = websites.filter((s) => s.opportunityStage !== 'New Opportunities').length;
  const overdueFollowups = outreachList.filter(
    (o) =>
      o.nextFollowupDate &&
      new Date(o.nextFollowupDate) <= new Date() &&
      o.status !== 'Published' &&
      o.status !== 'Declined'
  ).length;

  const navSections: NavSection[] = [
    {
      title: 'CORE PLATFORM',
      items: [
        { id: 'dashboard', label: '1. Overview', icon: LayoutDashboard },
        { id: 'finder', label: '2. Find Guest Post Sites', icon: Search },
        { id: 'results', label: '3. Search Results', icon: TableProperties, badge: websites.length },
        { id: 'saved', label: '4. Saved Sites', icon: Bookmark, badge: savedCount > 0 ? savedCount : undefined },
        { id: 'analysis', label: '5. Site Analysis', icon: BarChart3 }
      ]
    },
    {
      title: 'OUTREACH & PIPELINE',
      items: [
        { id: 'outreach', label: '6. Outreach / Contacts', icon: Send, badge: overdueFollowups > 0 ? `${overdueFollowups} due` : undefined },
        { id: 'campaigns', label: '7. Campaigns', icon: FolderKanban, badge: campaigns.length },
        { id: 'reports', label: '8. Reports', icon: LineChart },
        { id: 'settings', label: '9. Settings', icon: Settings }
      ]
    },
    {
      title: 'TOOLS & MONITORING',
      items: [
        { id: 'backlinks', label: 'Backlink Tracker', icon: Link2, badge: backlinksList.length },
        { id: 'history', label: 'Search History', icon: History, badge: searchHistory.length },
        { id: 'comparison', label: 'Comparison Matrix', icon: Scale },
        { id: 'orders', label: 'Client Orders', icon: FileCheck2 }
      ]
    }
  ];

  const renderNavContent = (isMobile = false) => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100">
      {/* Brand Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between">
        <button
          onClick={() => navigateToPublic('home')}
          className="text-left group flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400"></span>
          </div>
          <div>
            <div className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              RankPulse SEO
            </div>
            <p className="text-[10px] text-slate-400 font-mono">WORKSPACE DASHBOARD</p>
          </div>
        </button>

        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="p-3 space-y-4 flex-1 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.title}>
            <div className="px-3 mb-1 text-[10px] font-semibold text-slate-400 tracking-wider">
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id || (item.id === 'dashboard' && activeTab === 'overview') || (item.id === 'saved' && activeTab === 'database');
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (isMobile) setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left min-h-[40px] ${
                      isActive
                        ? 'bg-slate-800 text-emerald-400 font-semibold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="font-mono text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 tabular-nums ml-2 shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User profile & public link bottom card */}
      <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={user.avatar || '/src/assets/images/avatar_seo_director_1790959770879.jpg'}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover border border-emerald-500/30 shrink-0"
            />
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{user.company}</div>
            </div>
          </div>
          <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950 border border-emerald-500/30 px-1.5 py-0.2 rounded shrink-0">
            PRO
          </span>
        </div>

        <div className="flex items-center gap-1.5 pt-1">
          <button
            onClick={() => {
              navigateToPublic('home');
              if (isMobile) setMobileMenuOpen(false);
            }}
            className="flex-1 py-1 px-2 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors flex items-center justify-center gap-1"
          >
            <Globe className="w-3 h-3 text-emerald-400" />
            <span>Public Site</span>
          </button>
          <button
            onClick={() => {
              logout();
              if (isMobile) setMobileMenuOpen(false);
            }}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors border border-transparent"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-950 border-r border-slate-800 flex-col shrink-0 overflow-hidden">
        {renderNavContent(false)}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-950 shadow-2xl border-r border-slate-800 z-50 animate-slide-right">
            {renderNavContent(true)}
          </div>
        </div>
      )}
    </>
  );
};
