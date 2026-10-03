import React, { useState } from 'react';
import { useSeo, NavigationTab } from '../../../context/SeoContext';
import {
  Mail,
  MessageSquare,
  Building2,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: NavigationTab) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { addToast } = useSeo();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('Enterprise Plan Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitted(true);
    addToast({
      type: 'success',
      title: 'Message Dispatched',
      description: 'Ticket #RP-8491 registered. Our SEO engineering team will respond within 2 hours.'
    });
  };

  return (
    <div className="space-y-16 py-10 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <Mail className="w-3.5 h-3.5 text-emerald-400" />
          <span>Support & Partnerships</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Contact Our Team
        </h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Need a custom agency seat count, dedicated API crawl rate, or technical assistance? We respond to all inquiries within 2 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Direct Support</span>
            </div>
            <p className="text-xs text-slate-400">
              Technical inquiries & API integration support:
            </p>
            <div className="font-mono text-xs text-emerald-400 font-semibold">
              support@rankpulse.io
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Response Time SLA</span>
            </div>
            <p className="text-xs text-slate-400">
              Priority enterprise queue: <strong className="text-white">&lt; 2 hours</strong>
            </p>
            <p className="text-xs text-slate-400">
              Standard accounts: <strong className="text-white">&lt; 24 hours</strong>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span>Offices</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              RankPulse SEO Systems Inc.<br />
              548 Market Street, Suite 920<br />
              San Francisco, CA 94104
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Inquiry Received</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. A dedicated SEO solutions engineer has been assigned to ticket <strong className="font-mono text-emerald-400">#RP-8491</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@agency.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Company or Agency Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme SEO Consulting"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Inquiry Type</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Enterprise Plan Inquiry">Enterprise Plan Inquiry</option>
                    <option value="API Integration Support">API Integration Support</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Billing & Invoicing">Billing & Invoicing</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your team size, target verticals, or requirements..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
