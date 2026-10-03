import React, { useState } from 'react';
import { useSeo, NavigationTab } from '../../context/SeoContext';
import {
  Layers,
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface PublicNavbarProps {
  currentPage: NavigationTab;
  onNavigate: (page: NavigationTab) => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ currentPage, onNavigate }) => {
  const { theme, toggleTheme, isAuthenticated, navigateToApp } = useSeo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Array<{ id: NavigationTab; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
            <Layers className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              RankPulse SEO
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`py-1 transition-colors relative ${
                  isActive
                    ? 'text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          {/* Dark/Light mode toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
          </button>

          {isAuthenticated ? (
            <button
              onClick={() => navigateToApp('overview')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap"
            >
              <span>Go to App</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <>
              <button
                onClick={() => onNavigate('login')}
                className="hidden sm:inline-flex px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all active:scale-95 whitespace-nowrap"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bg-slate-950/98 border-b border-slate-800 px-4 py-6 space-y-4 shadow-2xl backdrop-blur-xl animate-slide-down">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 text-left rounded-lg text-sm transition-colors flex items-center justify-between ${
                  currentPage === link.id
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                navigateToApp('overview');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-xs font-semibold text-slate-900 bg-emerald-400 rounded-lg flex items-center justify-center gap-1.5"
            >
              <span>Launch Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            {!isAuthenticated && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg text-center"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    onNavigate('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 rounded-lg text-center"
                >
                  Sign Up Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
