import React, { useState, useEffect } from 'react';
import { useSeo } from '../../context/SeoContext';
import { Website } from '../../types/seo';
import { OUTREACH_TEMPLATES, EmailTemplate } from '../../data/initialOutreach';
import { X, Send, Copy, Sparkles, Check } from 'lucide-react';

interface Props {
  site: Website | null;
  onClose: () => void;
}

export const OutreachModal: React.FC<Props> = ({ site, onClose }) => {
  const { addOutreach, addToast } = useSeo();

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(OUTREACH_TEMPLATES[0].id);
  const [clientName, setClientName] = useState('Acme Growth Client');
  const [proposedTopic, setProposedTopic] = useState('Comprehensive 2026 Industry Benchmark & Framework');
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [agreedPrice, setAgreedPrice] = useState(site ? site.publisherPrice : 90);
  const [copied, setCopied] = useState(false);

  // Apply template with token replacement
  useEffect(() => {
    if (!site) return;
    const template = OUTREACH_TEMPLATES.find((t) => t.id === selectedTemplateId) || OUTREACH_TEMPLATES[0];

    const replacedSubject = template.subject
      .replace(/{{contactName}}/g, site.contactPerson || 'Editor')
      .replace(/{{websiteName}}/g, site.name)
      .replace(/{{niche}}/g, site.niche)
      .replace(/{{nicheTopic}}/g, site.niche)
      .replace(/{{proposedTopic}}/g, proposedTopic);

    const replacedBody = template.body
      .replace(/{{contactName}}/g, site.contactPerson || 'Editor')
      .replace(/{{websiteName}}/g, site.name)
      .replace(/{{niche}}/g, site.niche)
      .replace(/{{proposedTopic}}/g, proposedTopic);

    setSubject(replacedSubject);
    setEmailBody(replacedBody);
  }, [selectedTemplateId, site, proposedTopic]);

  if (!site) return null;

  const handleSendPitch = (e: React.FormEvent) => {
    e.preventDefault();

    const template =
      OUTREACH_TEMPLATES.find((t) => t.id === selectedTemplateId) || OUTREACH_TEMPLATES[0];

    addOutreach({
      id: `outreach-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      websiteId: site.id,
      websiteName: site.name,
      websiteUrl: site.url,
      contactPerson: site.contactPerson || site.guestPostInfo?.contactPerson || 'Editorial Team',
      contactEmail: site.contactEmail || site.guestPostInfo?.contactEmail || '',
      templateType: (template?.name || 'Initial Outreach') as any,
      subject,
      pitchTopic: proposedTopic,
      body: emailBody,
      status: 'Pitching',
      proposedPrice: site.publisherPrice ?? site.guestPostInfo?.publisherPrice ?? 0,
      agreedPrice: Number(agreedPrice) || 0,
      clientPrice: site.clientPrice ?? site.guestPostInfo?.clientPrice ?? 0,
      clientName,
      sentDate: new Date().toISOString().split('T')[0],
      nextFollowupDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      followupCount: 0,
      notes: `Sent initial pitch to ${site.contactEmail || 'editor'}. Follow-up scheduled in 5 days.`
    });

    addToast({
      type: 'success',
      title: 'Pitch Sent & Logged',
      description: `Pitch to ${site.name} added to Outreach Pipeline CRM.`
    });

    onClose();
  };

  const handleCopyEmail = () => {
    const fullText = `Subject: ${subject}\n\nTo: ${site.contactEmail}\n\n${emailBody}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    addToast({
      type: 'info',
      title: 'Email Copied',
      description: 'Ready to paste into your email client.'
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl my-auto overflow-hidden">
        {/* Sticky Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 shrink-0 bg-slate-900">
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 truncate">
              <Send className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">Draft Outreach Pitch: {site.name}</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">
              To: {site.contactPerson} &lt;{site.contactEmail}&gt;
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSendPitch} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
          {/* Template Selection */}
          <div>
            <label className="text-slate-400 block mb-1 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Select High-Converting Outreach Template:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {OUTREACH_TEMPLATES.map((tmpl) => (
                <button
                  type="button"
                  key={tmpl.id}
                  onClick={() => setSelectedTemplateId(tmpl.id)}
                  className={`p-2.5 text-left rounded-lg border transition-colors ${
                    selectedTemplateId === tmpl.id
                      ? 'bg-slate-800 border-emerald-500/50 text-white font-semibold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs">{tmpl.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 truncate">{tmpl.category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Client & Topic Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Target Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Negotiated / Offered Price ($)</label>
              <input
                type="number"
                value={agreedPrice}
                onChange={(e) => setAgreedPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Proposed Pitch Topic / Headline</label>
            <input
              type="text"
              value={proposedTopic}
              onChange={(e) => setProposedTopic(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs"
            />
          </div>

          {/* Subject Line */}
          <div>
            <label className="text-slate-400 block mb-1">Email Subject Line</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-xs"
            />
          </div>

          {/* Email Body */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-400">Personalized Message Body</label>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-[11px]"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>
            </div>
            <textarea
              rows={8}
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono text-xs leading-relaxed focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Sticky Modal Footer Actions */}
          <div className="pt-3 sticky bottom-0 bg-slate-900 border-t border-slate-800 flex items-center justify-end gap-2 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-3.5 py-2 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send & Save to Pipeline</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
