import React, { useState } from 'react';
import { useSeo, NavigationTab } from '../../../context/SeoContext';
import {
  Lock,
  Mail,
  User,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';

interface SignUpPageProps {
  onNavigate: (page: NavigationTab) => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
  const { login, addToast } = useSeo();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Simple password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { text: 'Empty', color: 'bg-slate-800', width: '0%' };
    if (password.length < 6) return { text: 'Weak', color: 'bg-rose-500', width: '25%' };
    if (password.length < 10) return { text: 'Fair', color: 'bg-amber-500', width: '60%' };
    return { text: 'Strong', color: 'bg-emerald-400', width: '100%' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) return;

    login(email, fullName);
    addToast({
      type: 'success',
      title: 'Account Initialized',
      description: `Welcome ${fullName}. 14-day Pro trial enabled.`
    });
  };

  return (
    <div className="py-12 px-4 sm:px-8 max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
          <Layers className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Create Your Free RankPulse Account
        </h1>
        <p className="text-xs text-slate-400">
          Get instant access to automated guest blogging research and domain authority evaluation.
        </p>
      </div>

      {/* 1-Click Fast Trial Box */}
      <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2 text-center">
        <div className="text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Instant Evaluator Mode</span>
        </div>
        <p className="text-[11px] text-slate-300">
          Want to test the full SaaS dashboard immediately without typing credentials?
        </p>
        <button
          onClick={() => login('alex.vance@rankpulse.io', 'Alex Vance')}
          className="w-full py-2.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md active:scale-95"
        >
          Initialize Instant Workspace Now →
        </button>
      </div>

      {/* Registration Form */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="text-slate-400 block mb-1 font-medium">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Vance"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-medium">Work Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@agency.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-medium">Company or Agency Name</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Growth Agency"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-medium">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
            {/* Visual Password Strength */}
            {password && (
              <div className="mt-1.5 space-y-1">
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: strength.width }}></div>
                </div>
                <div className="text-[10px] text-slate-500 font-mono text-right">
                  Strength: <span className="text-slate-300 font-semibold">{strength.text}</span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2 cursor-pointer text-slate-400 leading-relaxed">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-800 bg-slate-950 text-emerald-400 focus:ring-emerald-400"
              />
              <span>
                I agree to the <span className="text-slate-300 underline">Terms of Service</span> and <span className="text-slate-300 underline">Privacy Policy</span>. No credit card required.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <span>Already have an account? </span>
          <button
            onClick={() => onNavigate('login')}
            className="text-emerald-400 font-semibold hover:underline"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};
