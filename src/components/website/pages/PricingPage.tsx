import React, { useState } from 'react';
import { useSeo, NavigationTab } from '../../../context/SeoContext';
import {
  Check,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Layers
} from 'lucide-react';

interface PricingPageProps {
  onNavigate: (page: NavigationTab) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const { navigateToApp } = useSeo();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      id: 'free',
      name: 'Free Community',
      target: 'For individual researchers & solo bloggers',
      priceMonthly: 0,
      priceAnnual: 0,
      badge: null,
      features: [
        '25 domain searches / month',
        'Basic Moz DA & Semrush AS metrics',
        'Guest post evidence verification',
        'CSV table export (up to 50 rows)',
        '1 active outreach campaign',
        'Community support forum'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      id: 'starter',
      name: 'Starter Pro',
      target: 'For freelance SEOs & boutique consultants',
      priceMonthly: 49,
      priceAnnual: 39,
      badge: null,
      features: [
        '250 domain searches / month',
        'Full Moz DA, Ahrefs DR & Semrush AS metrics',
        'Verified editorial contact discovery',
        '5 email pitch & follow-up templates',
        '3 active Kanban campaigns',
        'Live backlink HTTP status monitoring',
        'Standard email support (< 24h SLA)'
      ],
      cta: 'Select Starter Plan',
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional Team',
      target: 'For growing marketing teams & SEO agencies',
      priceMonthly: 99,
      priceAnnual: 79,
      badge: 'MOST POPULAR',
      features: [
        'Unlimited domain discovery searches',
        'All 5 SEO API connectors enabled',
        'Automated editorial contact extraction',
        'Unlimited Kanban outreach campaigns',
        '12-Factor SEO Opportunity Score simulator',
        'Live backlink tracker with dropped link alerts',
        'Client margin & profit calculator',
        'Priority support (< 2h SLA)'
      ],
      cta: 'Start 14-Day Pro Trial',
      popular: true
    },
    {
      id: 'agency',
      name: 'Agency Enterprise',
      target: 'For high-volume digital link building agencies',
      priceMonthly: 199,
      priceAnnual: 159,
      badge: 'ENTERPRISE',
      features: [
        'Everything in Professional Team',
        'Multi-seat team workspace (up to 10 users)',
        'Client white-label PDF executive reports',
        'Dedicated crawler crawl rate allocation',
        'Custom scoring formula weights customization',
        'Direct Google Sheets sync integration',
        'Dedicated account manager & onboarding'
      ],
      cta: 'Contact Enterprise Sales',
      popular: false
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-10 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header & Billing Cadence Toggle */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Transparent Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Simple, Predictable Plans for Every Outreach Team
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          No hidden fees or scraped low-quality link packages. Connect your own SEO API keys or utilize our pre-verified dataset.
        </p>

        {/* Cadence Switcher */}
        <div className="pt-2 flex items-center justify-center gap-3 text-xs">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-semibold ${
              billingCycle === 'monthly'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-semibold flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-emerald-400 text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded font-bold">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

          return (
            <div
              key={plan.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-slate-900/90 border-emerald-500/60 shadow-2xl shadow-emerald-500/5'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-400 text-slate-900 shadow-md">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.target}</p>
                </div>

                <div className="py-2 border-y border-slate-800/80">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold font-mono text-white">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">/ month</span>
                  </div>
                  {billingCycle === 'annual' && price > 0 && (
                    <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">
                      Billed annually (${price * 12}/year)
                    </span>
                  )}
                </div>

                <ul className="space-y-2 text-xs text-slate-300 pt-1">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigateToApp('finder')}
                  className={`w-full py-2.5 text-xs font-semibold rounded-xl transition-all ${
                    plan.popular
                      ? 'bg-emerald-400 text-slate-900 hover:bg-emerald-300 shadow-md'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">Detailed Feature Matrix</h2>
          <p className="text-xs text-slate-400 mt-0.5">Direct comparison of allowances, API connectors, and support levels across tiers.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="border-b border-slate-800 text-slate-400 font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Feature Capability</th>
                <th className="py-3 px-4 text-center">Free</th>
                <th className="py-3 px-4 text-center">Starter</th>
                <th className="py-3 px-4 text-center text-emerald-400">Pro (Popular)</th>
                <th className="py-3 px-4 text-center">Agency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              <tr>
                <td className="py-3 px-4 font-medium text-white">Domain Search Volume</td>
                <td className="py-3 px-4 text-center font-mono">25/mo</td>
                <td className="py-3 px-4 text-center font-mono">250/mo</td>
                <td className="py-3 px-4 text-center font-mono text-emerald-400">Unlimited</td>
                <td className="py-3 px-4 text-center font-mono text-emerald-400">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Moz DA / Semrush AS Bridges</td>
                <td className="py-3 px-4 text-center">Basic</td>
                <td className="py-3 px-4 text-center">Full</td>
                <td className="py-3 px-4 text-center text-emerald-400">Full + History</td>
                <td className="py-3 px-4 text-center text-emerald-400">Full + History</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Ahrefs DR & Referring Domains</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center">✓</td>
                <td className="py-3 px-4 text-center text-emerald-400">✓</td>
                <td className="py-3 px-4 text-center text-emerald-400">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Verified Contact Extraction</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center">✓</td>
                <td className="py-3 px-4 text-center text-emerald-400">✓</td>
                <td className="py-3 px-4 text-center text-emerald-400">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Kanban Campaign Pipeline</td>
                <td className="py-3 px-4 text-center font-mono">1</td>
                <td className="py-3 px-4 text-center font-mono">3</td>
                <td className="py-3 px-4 text-center font-mono text-emerald-400">Unlimited</td>
                <td className="py-3 px-4 text-center font-mono text-emerald-400">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Live Backlink Ping Monitoring</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center font-mono">5 links</td>
                <td className="py-3 px-4 text-center font-mono text-emerald-400">50 links</td>
                <td className="py-3 px-4 text-center font-mono text-emerald-400">500 links</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-white">Client White-Label PDF Reports</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center text-slate-600">—</td>
                <td className="py-3 px-4 text-center text-emerald-400">✓ Included</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
