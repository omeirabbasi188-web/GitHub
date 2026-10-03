import { OutreachItem, OutreachTemplateType } from '../types/seo';

export interface EmailTemplate {
  id: string;
  type: OutreachTemplateType;
  name: string;
  category: string;
  subject: string;
  body: string;
}

export const OUTREACH_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tpl-initial',
    type: 'Initial Outreach',
    name: 'Initial Outreach',
    category: 'High-Converting Pitch',
    subject: 'Guest Post Pitch: "{{proposedTopic}}" for {{websiteName}}',
    body: `Hi {{contactName}},

I've been a regular reader of {{websiteName}} and love your rigorous editorial focus on {{niche}}.

I'd love to pitch an exclusive, in-depth guest contribution on:
"{{proposedTopic}}"

Key takeaways for your readers:
• Practical, step-by-step framework based on hands-on industry experience
• Zero generic platitudes — includes concrete benchmarks and actionable examples
• Formatted cleanly with H2/H3 subheadings, data citations, and custom visuals

I will adhere strictly to your contributor guidelines: 100% original content, unbiased perspective, and 1 natural contextual resource link.

Would you be open to reviewing a short 3-bullet outline?

Best regards,
Editorial Outreach Team`
  },
  {
    id: 'tpl-followup-1',
    type: 'Follow-up 1',
    name: 'Follow-up 1',
    category: 'Gentle Reminder (Day 3-5)',
    subject: 'Quick follow-up: Guest article idea for {{websiteName}}',
    body: `Hi {{contactName}},

Just wanted to follow up on my note from last week regarding a guest article on "{{proposedTopic}}" for {{websiteName}}.

I know your editorial desk is constantly swamped with submissions! 

If the topic aligns with your current content roadmap, I can send over a 200-word synopsis or draft right away. If you'd prefer an alternate angle in {{niche}}, I'm very flexible.

Thanks for your time!

Warmly,
Editorial Outreach Team`
  },
  {
    id: 'tpl-followup-2',
    type: 'Follow-up 2',
    name: 'Follow-up 2',
    category: 'Final Check-In (Day 8-10)',
    subject: 'Final follow-up regarding guest contribution on {{websiteName}}',
    body: `Hello {{contactName}},

Reaching out one last time regarding the guest post proposal for "{{proposedTopic}}".

I assume you're either fully booked for this quarter or this topic isn't a fit right now, which is completely understandable.

I'll keep this draft on hold for 48 hours before offering it elsewhere. If you'd like to reserve it for {{websiteName}}, just let me know!

Thanks for all your great work with {{websiteName}}.

Best,
Editorial Outreach Team`
  },
  {
    id: 'tpl-negotiation',
    type: 'Price Negotiation',
    name: 'Price Negotiation',
    category: 'Commercial & Budget Terms',
    subject: 'Re: Editorial review fee & publishing terms for {{websiteName}}',
    body: `Hi {{contactName}},

Thank you for getting back to me regarding our proposed guest article on "{{proposedTopic}}".

Regarding the editorial review fee of $\${proposedPrice}:
We work with multiple enterprise clients across {{niche}} and are looking to build a recurring monthly publishing partnership with {{websiteName}}. 

Could we agree on $\${agreedPrice} for this initial placement? If the collaboration goes smoothly, we have 2–3 additional well-researched pieces per quarter we can direct to your publication.

Please confirm if this works so we can finalize the draft for submission!

Best regards,
Editorial Outreach Team`
  },
  {
    id: 'tpl-submission',
    type: 'Article Submission',
    name: 'Article Submission',
    category: 'Final Draft Delivery',
    subject: 'Completed Draft for Review: "{{proposedTopic}}" - {{websiteName}}',
    body: `Hi {{contactName}},

Excited to share the completed first draft of "{{proposedTopic}}" for your editorial review!

Google Doc Draft Link: [Paste your Google Docs URL here - permissions set to "Anyone with link can comment"]

Draft summary:
• Word count: ~1,600 words
• Clean H2/H3 formatting and high-res diagram illustrations included
• 2 primary research references and 1 contextual resource link
• Author bio and headshot attached at the bottom

Please let me know if you'd like any revisions or adjustments to align with {{websiteName}}'s house style.

Looking forward to seeing this live!

Warm regards,
Editorial Outreach Team`
  }
];

export const INITIAL_OUTREACH: OutreachItem[] = [
  {
    id: 'outreach-1',
    websiteId: 'gps-ai-1',
    websiteName: 'AI Breakthrough & Machine Intelligence',
    websiteUrl: 'aibreakthroughdaily.com',
    contactPerson: 'Elena Rostova',
    contactEmail: 'elena.editor@aibreakthroughdaily.com',
    templateType: 'Initial Outreach',
    subject: 'Guest Post Pitch: "Architecting Reliable Autonomous Agents" for AI Breakthrough',
    pitchTopic: 'Architecting Enterprise-Grade Autonomous AI Agents: Lessons from 100 Production Deployments',
    body: 'Hi Elena, I would love to pitch an exclusive guide on autonomous agent reliability...',
    status: 'Interested',
    proposedPrice: 0,
    agreedPrice: 0,
    clientName: 'AgentScale AI',
    sentDate: '2026-09-24',
    nextFollowupDate: '2026-10-02',
    followupCount: 0,
    notes: 'Elena approved the pitch! Free editorial placement. Draft due next week.'
  },
  {
    id: 'outreach-2',
    websiteId: 'gps-saas-1',
    websiteName: 'SaaS Growth & Product Ledger',
    websiteUrl: 'saasgrowthledger.io',
    contactPerson: 'Julian Briggs',
    contactEmail: 'julian@saasgrowthledger.io',
    templateType: 'Price Negotiation',
    subject: 'Content Collaboration & Terms for SaaS Growth Ledger',
    pitchTopic: 'Zero-Churn Playbook: How PLG Companies Retain 95%+ Net Revenue',
    body: 'Hi Julian, we would love to confirm terms for our B2B SaaS retention playbook...',
    status: 'Replied',
    proposedPrice: 95,
    agreedPrice: 80,
    clientName: 'CloudMetrics Platform',
    sentDate: '2026-09-26',
    nextFollowupDate: '2026-09-30',
    followupCount: 1,
    notes: 'Offered $80 package discount for 2 scheduled articles.'
  },
  {
    id: 'outreach-3',
    websiteId: 'gps-marketing-1',
    websiteName: 'GrowthEngine Marketing Journal',
    websiteUrl: 'growthenginemarketing.com',
    contactPerson: 'Rachel Simmons',
    contactEmail: 'rachel@growthenginemarketing.com',
    templateType: 'Initial Outreach',
    subject: 'Guest contribution on modern link velocity for GrowthEngine',
    pitchTopic: 'The 2026 Quality-First Backlink Playbook: What Actually Moves Google Rankings',
    body: 'Hi Rachel, noticed your coverage of modern search algorithms...',
    status: 'Contacted',
    proposedPrice: 0,
    agreedPrice: 0,
    clientName: 'RankPulse Client',
    sentDate: '2026-09-28',
    nextFollowupDate: '2026-10-03',
    followupCount: 0,
    notes: 'Initial pitch sent. Waiting on editorial response.'
  },
  {
    id: 'outreach-4',
    websiteId: 'gps-tech-1',
    websiteName: 'Enterprise Tech Weekly',
    websiteUrl: 'enterprisetechweekly.io',
    contactPerson: 'Marcus Vance',
    contactEmail: 'marcus@enterprisetechweekly.io',
    templateType: 'Follow-up 1',
    subject: 'Quick follow-up: Cloud Migration Roadmap for Enterprise Tech Weekly',
    pitchTopic: 'Decoupling Legacy Systems: Zero-Downtime Database Sharding',
    body: 'Hi Marcus, just following up on our pitch from Tuesday...',
    status: 'Follow-up',
    proposedPrice: 120,
    agreedPrice: 100,
    clientName: 'FinCloud Analytics',
    sentDate: '2026-09-25',
    nextFollowupDate: '2026-10-04',
    followupCount: 1,
    notes: 'Follow-up #1 dispatched with updated synopsis.'
  },
  {
    id: 'outreach-5',
    websiteId: 'gps-fin-1',
    websiteName: 'Fintech Daily Ledger',
    websiteUrl: 'fintechdailyledger.com',
    contactPerson: 'Sarah Jenkins',
    contactEmail: 's.jenkins@fintechdailyledger.com',
    templateType: 'Article Submission',
    subject: 'Published link live: Zero-Trust Fraud Prevention Architecture',
    pitchTopic: 'Zero-Trust Architecture for Cloud-Native Financial Systems',
    body: 'Article published live with dofollow anchor.',
    status: 'Published',
    proposedPrice: 150,
    agreedPrice: 150,
    clientName: 'FinCloud Analytics',
    sentDate: '2026-09-15',
    nextFollowupDate: '',
    followupCount: 2,
    notes: 'Article live, indexed in Google, contextual dofollow confirmed.'
  }
];
