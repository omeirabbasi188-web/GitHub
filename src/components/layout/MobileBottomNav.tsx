import React from 'react';
import { useSeo, NavigationTab } from '../../context/SeoContext';
import {
  LayoutDashboard,
  Search,
  Database,
  BarChart3,
  Menu
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setMobileMenuOpen, language } = useSeo();

  const navItems: { id: NavigationTab; label: string; labelUr: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', labelUr: 'ڈیش بورڈ', icon: LayoutDashboard },
    { id: 'finder', label: 'Finder', labelUr: 'فائنڈر', icon: Search },
    { id: 'database', label: 'Database', labelUr: 'ڈیٹا بیس', icon: Database },
    { id: 'analysis', label: 'Audit', labelUr: 'آڈٹ', icon: BarChart3 }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 flex items-center justify-around safe-bottom">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg min-w-[56px] transition-colors ${
              isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[64px]">
              {language === 'ur' ? item.labelUr : item.label}
            </span>
          </button>
        );
      })}

      {/* More / All Tools Drawer Trigger */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="flex flex-col items-center justify-center py-1 px-3 rounded-lg min-w-[56px] text-slate-400 hover:text-slate-200 transition-colors"
      >
        <Menu className="w-5 h-5 text-slate-400" />
        <span className="text-[10px] mt-0.5 tracking-tight">
          {language === 'ur' ? 'مزید' : 'More'}
        </span>
      </button>
    </nav>
  );
};
