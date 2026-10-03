import React from 'react';
import { NavigationTab } from '../../context/SeoContext';
import { Layers, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';

interface PublicFooterProps {
  onNavigate: (page: NavigationTab) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-xs text-slate-400 pt-12 pb-8 px-4 sm:px-8 mt-auto">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <span>RankPulse SEO</span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Professional guest blogging research, domain quality evaluation, and outreach pipeline platform. Verified discovery with zero fabricated metrics.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All 5 SEO API Connectors Operational</span>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-semibold text-slate-200 tracking-wider">PLATFORM</div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('features')} className="hover:text-white transition-colors">
                  Features Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">
                  Pricing & Plans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('finder')} className="hover:text-white transition-colors">
                  Guest Post Finder
                </button>
              </li>
            </ul>
          </div>

          {/* Research tools */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-semibold text-slate-200 tracking-wider">RESEARCH TOOLS</div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('analysis')} className="hover:text-white transition-colors">
                  12-Factor Quality Audit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('results')} className="hover:text-white transition-colors">
                  Search Results Table
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('outreach')} className="hover:text-white transition-colors">
                  Outreach CRM Pipeline
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('campaigns')} className="hover:text-white transition-colors">
                  Kanban Campaigns
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-semibold text-slate-200 tracking-wider">COMPANY</div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Platform
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Support & Contact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('login')} className="hover:text-white transition-colors">
                  Account Sign In
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('signup')} className="hover:text-white transition-colors">
                  Create Free Account
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} RankPulse SEO. Enterprise SaaS Platform. Built with verifiable API architecture.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">API Agreement</span>
            <span>·</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white">
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
