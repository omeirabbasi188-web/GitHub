import React, { useState } from 'react';
import { useSeo, NavigationTab } from '../../context/SeoContext';
import {
  Layers,
  Plus,
  RotateCcw,
  Scale,
  Menu,
  Globe,
  Search,
  Bell,
  HelpCircle,
  Sun,
  Moon,
  User,
  LogOut,
  Settings,
  ChevronDown,
  X,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const TAB_TITLES: Record<NavigationTab, string> = {
  home: 'Platform Website',
  features: 'Platform Features',
  'how-it-works': 'How It Works',
  pricing: 'Pricing Plans',
  about: 'About Platform',
  contact: 'Support & Contact',
  login: 'Sign In',
  signup: 'Create Account',
  overview: 'Executive Overview',
  dashboard: 'Executive Overview',
  finder: 'SEO Website Finder',
  results: 'Search Results Table',
  database: 'Website Database',
  saved: 'Saved Opportunities',
  analysis: 'SEO Quality Analysis',
  comparison: 'Website Comparison',
  publishers: 'Publishers Directory',
  contacts: 'Editorial Contacts',
  outreach: 'Outreach CRM Pipeline',
  campaigns: 'Kanban Campaigns',
  history: 'Search History',
  followups: 'Follow-ups & Reminders',
  orders: 'Guest Post Orders',
  backlinks: 'Backlink Tracker',
  calculator: 'Agency Profit Calculator',
  reports: 'Performance Reports',
  settings: 'Settings & API Keys'
};

const TAB_TITLES_HI: Record<NavigationTab, string> = {
  home: 'प्लेटफ़ॉर्म वेबसाइट',
  features: 'सुविधाएँ',
  'how-it-works': 'यह कैसे काम करता है',
  pricing: 'मूल्य निर्धारण',
  about: 'हमारे बारे में',
  contact: 'संपर्क',
  login: 'साइन इन',
  signup: 'खाता बनाएँ',
  overview: 'डैशबोर्ड अवलोकन',
  dashboard: 'डैशबोर्ड अवलोकन',
  finder: 'एसईओ वेबसाइट खोजें',
  results: 'खोज परिणाम तालिका',
  database: 'वेबसाइट मास्टर डेटाबेस',
  saved: 'सेव किए गए अवसर',
  analysis: '12-फैक्टर एसईओ गुणवत्ता विश्लेषण',
  comparison: 'वेबसाइट तुलना मैट्रिक्स',
  publishers: 'प्रकाशक डायरेक्टरी',
  contacts: 'संपादकीय संपर्क',
  outreach: 'आउटरीच सीआरएम पाइपलाइन',
  campaigns: 'कैनबन अभियान',
  history: 'खोज इतिहास',
  followups: 'फॉलो-अप और रिमाइंडर',
  orders: 'गेस्ट पोस्ट क्लाइंट ऑर्डर',
  backlinks: 'लाइव बैकलिंक ट्रैकर',
  calculator: 'लाभ व मार्जिन कैलकुलेटर',
  reports: 'प्रदर्शन रिपोर्ट',
  settings: 'स्कोरिंग और एपीआई सेटिंग्स'
};

const TAB_TITLES_UR: Record<NavigationTab, string> = {
  home: 'پلیٹ فارم ویب سائٹ',
  features: 'خصوصیات',
  'how-it-works': 'طریقہ کار',
  pricing: 'قیمتیں',
  about: 'ہمارے بارے میں',
  contact: 'رابطہ',
  login: 'لاگ ان',
  signup: 'رجسٹر کریں',
  overview: 'ڈیش بورڈ جائزہ',
  dashboard: 'ڈیش بورڈ جائزہ',
  finder: 'ایس ای او ویب سائٹ تلاش کنندہ',
  results: 'تلاش کے نتائج ٹیبل',
  database: 'ویب سائٹ ماسٹر ڈیٹا بیس',
  saved: 'محفوظ شدہ مواقع',
  analysis: '12-فیکٹر ایس ای او کوالٹی تجزیہ',
  comparison: 'ویب سائٹ موازنہ میٹرکس',
  publishers: 'پبلشرز ڈائریکٹری',
  contacts: 'ادارتی رابطے',
  outreach: 'آؤٹ ریچ پائپ لائن CRM',
  campaigns: 'کینبن مہمات',
  history: 'تلاش کی تاریخ',
  followups: 'فالو اپس اور یاد دہانیاں',
  orders: 'گیسٹ پوسٹ کلائنٹ آرڈرز',
  backlinks: 'لائیو بیک لنکس ٹریکر',
  calculator: 'منافع و مارجن کیلکولیٹر',
  reports: 'کارکردگی کی رپورٹیں',
  settings: 'اسکورنگ فارمولا سیٹنگز'
};

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    compareList,
    setIsAddModalOpen,
    resetAllDemoData,
    language,
    setLanguage,
    setMobileMenuOpen,
    theme,
    toggleTheme,
    user,
    logout,
    navigateToPublic,
    notifications,
    dismissNotification,
    markAllNotificationsRead,
    websites,
    setSelectedWebsiteId
  } = useSeo();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const getTitle = () => {
    if (language === 'hi') return TAB_TITLES_HI[activeTab] || TAB_TITLES[activeTab];
    if (language === 'ur') return TAB_TITLES_UR[activeTab] || TAB_TITLES[activeTab];
    return TAB_TITLES[activeTab] || 'Workspace';
  };

  const cycleLanguage = () => {
    if (language === 'en') setLanguage('hi');
    else if (language === 'hi') setLanguage('ur');
    else setLanguage('en');
  };

  const getLangBadge = () => {
    if (language === 'hi') return 'हिन्दी';
    if (language === 'ur') return 'اردو';
    return 'EN';
  };

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const matchedSites = quickSearch.trim()
    ? websites
        .filter(
          (s) =>
            s.name.toLowerCase().includes(quickSearch.toLowerCase()) ||
            s.url.toLowerCase().includes(quickSearch.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-3 sm:px-6 bg-slate-900 border-b border-slate-800 shrink-0 transition-colors">
      {/* Zone 1: Hamburger for mobile + Breadcrumb */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <span className="text-sm sm:text-base font-semibold tracking-tight text-white flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
          <span className="hidden sm:inline">RankPulse SEO</span>
        </span>
        <span className="text-slate-600 hidden sm:inline">/</span>
        <span className="text-xs sm:text-sm font-medium text-slate-300 truncate max-w-[120px] sm:max-w-none">
          {getTitle()}
        </span>
      </div>

      {/* Zone 2: Quick Search Input (Requirement 4) */}
      <div className="hidden md:flex items-center relative flex-1 max-w-xs mx-4">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            placeholder="Quick search target domain..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-sans"
          />
          {quickSearch && (
            <button
              onClick={() => setQuickSearch('')}
              className="absolute right-2.5 top-2 text-slate-500 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Quick Search Dropdown results */}
        {isSearchFocused && matchedSites.length > 0 && (
          <div className="absolute top-10 left-0 right-0 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 space-y-1">
            {matchedSites.map((site) => (
              <button
                key={site.id}
                onClick={() => {
                  setSelectedWebsiteId(site.id);
                  setActiveTab('analysis');
                  setQuickSearch('');
                }}
                className="w-full text-left p-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-white">{site.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{site.url}</div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  DA {site.da || 'N/A'}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zone 3: Primary Actions (Search, Notifications, Help, User Profile) */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Public Website Switcher */}
        <button
          onClick={() => navigateToPublic('home')}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          title="Visit Public Website"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" />
          <span>Website</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
        </button>

        {/* Notifications (Requirement 4) */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors relative"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 top-11 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                <span className="font-bold text-white">Notifications ({unreadNotifs})</span>
                {unreadNotifs > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[10px] text-emerald-400 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-4 text-center text-xs text-slate-500">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl border text-xs transition-colors flex items-start justify-between gap-2 ${
                        n.read ? 'bg-slate-950/40 border-slate-800/60 text-slate-400' : 'bg-slate-950 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="font-semibold text-white truncate">{n.title}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-2">{n.message}</div>
                        <span className="text-[9px] text-slate-500 font-mono block">{n.time}</span>
                      </div>
                      <button
                        onClick={() => dismissNotification(n.id)}
                        className="text-slate-500 hover:text-white shrink-0 p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Help Drawer Trigger (Requirement 4) */}
        <button
          onClick={() => setIsHelpOpen(true)}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Help & Shortcuts"
          aria-label="Help and documentation"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Compare quick link */}
        <button
          onClick={() => setActiveTab('comparison')}
          className={`flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
            compareList.length > 0
              ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60'
              : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
          title="Compare selected websites"
        >
          <Scale className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Compare</span>
          {compareList.length > 0 && (
            <span className="font-mono text-emerald-400 font-semibold">({compareList.length})</span>
          )}
        </button>

        {/* Add Website primary button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="whitespace-nowrap">Add Website</span>
        </button>

        {/* User Profile Dropdown (Requirement 4) */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="User profile options"
          >
            <img
              src={user.avatar || '/src/assets/images/avatar_seo_director_1790959770879.jpg'}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover border border-emerald-500/40"
            />
            <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-11 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1 text-xs">
              <div className="p-2 border-b border-slate-800">
                <div className="font-bold text-white">{user.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                <span className="mt-1 inline-block text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                  {user.plan} PLAN
                </span>
              </div>

              <button
                onClick={() => {
                  navigateToPublic('home');
                  setIsProfileOpen(false);
                }}
                className="w-full text-left p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Public Website</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('settings');
                  setIsProfileOpen(false);
                }}
                className="w-full text-left p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Account & API Settings</span>
              </button>

              <div className="pt-1 border-t border-slate-800">
                <button
                  onClick={() => {
                    logout();
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-lg text-rose-400 hover:bg-rose-950/30 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Platform Help & Quick Navigation</span>
              </h3>
              <button onClick={() => setIsHelpOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-white mb-1">Keyboard & Fast Workflow</h4>
                <ul className="space-y-1 text-slate-400">
                  <li>• <strong className="text-slate-200">Find Sites:</strong> Use the search box above to jump to any indexed domain.</li>
                  <li>• <strong className="text-slate-200">Analyze:</strong> Click the bar chart icon on any table row to see its 12-factor quality audit.</li>
                  <li>• <strong className="text-slate-200">Compare:</strong> Click '+' on up to 4 domains to see side-by-side metric comparison.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-1">API Integrations</h4>
                <p className="text-slate-400 leading-relaxed">
                  To view live metrics instead of demo data, enter your Moz, Ahrefs, Semrush, or Majestic API keys in <button onClick={() => { setActiveTab('settings'); setIsHelpOpen(false); }} className="text-emerald-400 underline">Settings</button>.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsHelpOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
