export type NicheType =
  | 'All Niches'
  | 'AI'
  | 'SaaS'
  | 'Technology'
  | 'Technology & SaaS'
  | 'Digital Marketing'
  | 'Digital Marketing & SEO'
  | 'Finance'
  | 'Finance & Fintech'
  | 'Travel'
  | 'Travel & Hospitality'
  | 'Health'
  | 'Health & Wellness'
  | 'Business'
  | 'Lifestyle & Business'
  | 'Cybersecurity'
  | 'E-Commerce'
  | 'E-Commerce & Retail'
  | 'Real Estate'
  | 'Real Estate & Home'
  | string;

export type GuestPostStatus = 'Confirmed' | 'Likely' | 'Unclear' | 'Not Found';

export type OpportunityStage =
  | 'New Opportunities'
  | 'Qualified'
  | 'Contacted'
  | 'Interested'
  | 'Negotiating'
  | 'Accepted'
  | 'Published'
  | 'Rejected';

export type WebsiteType =
  | 'Blog'
  | 'Magazine'
  | 'News'
  | 'SaaS'
  | 'Business'
  | 'Technology'
  | 'Agency'
  | 'Community';

export type GuestPostType =
  | 'Free'
  | 'Paid'
  | 'Sponsored'
  | 'Contributor'
  | 'Editorial'
  | 'Unknown';

export interface SeoMetricValue<T = number> {
  value: T | null;
  provider: string; // e.g. 'Moz', 'Ahrefs', 'Semrush', 'Majestic', 'Google Search'
  isAvailable: boolean;
  lastUpdated: string;
}

export interface WebsiteVerification {
  isLive: boolean;
  nicheRelevance: 'High' | 'Medium' | 'Low';
  hasContributorPage: boolean;
  acceptsContributions: boolean;
  activePublishing: boolean;
  pbnRisk: 'Low' | 'Moderate' | 'High';
}

export interface GuestPostInfo {
  guestPostUrl: string;
  requirementsSummary: string[];
  minWordCount: string | number;
  allowedNiches: string[];
  linkType: 'Dofollow' | 'Nofollow' | 'Mixed';
  contextualLink: boolean;
  authorBio: boolean;
  sponsored: 'Non-Sponsored' | 'Sponsored' | 'Editorial';
  publisherPrice: number;
  clientPrice: number;
  turnaroundTime: string;
  articleRequirements: string;
  contactPerson: string;
  contactRole: string;
  contactEmail: string;
  contactPage: string;
  writeForUsPage: string;
  contactSourceUrl: string;
}

export interface OpportunityScoreFactor {
  score: number;
  max: number;
  label: string;
  status: 'excellent' | 'good' | 'moderate' | 'poor';
}

export interface OpportunityScoreResult {
  totalScore: number;
  rating: string;
  breakdown: {
    relevance: OpportunityScoreFactor;
    traffic: OpportunityScoreFactor;
    authority: OpportunityScoreFactor;
    linkProfile: OpportunityScoreFactor;
    risk: OpportunityScoreFactor;
  };
  explanation: string[];
}

export interface DiscoveredWebsite {
  id: string;
  name: string;
  url: string;
  niche: string;
  country: string;
  countryCode: string;
  language?: string;
  domainAgeYears: number | null;
  indexedPages: number | null;
  websiteType?: WebsiteType;
  guestPostType?: GuestPostType;

  // Verification & Guest Post Status
  guestPostStatus: GuestPostStatus;
  guestPostSourceUrl: string;
  evidenceSnippet: string;
  verification: WebsiteVerification;

  // Third-Party Authority Signals (with explicit providers)
  da: number | null; // Moz DA
  daProvider: string;
  pa?: number | null; // Moz Page Authority
  paProvider?: string;
  dr: number | null; // Ahrefs DR
  drProvider: string;
  as: number | null; // Semrush AS
  asProvider: string;
  tf: number | null; // Majestic TF
  tfProvider: string;
  cf: number | null; // Majestic CF
  cfProvider: string;

  // Traffic
  organicTraffic: number | null;
  organicKeywords?: number | null;
  trafficProvider: string;
  trafficTrend: number[];
  trafficGrowthRate?: number;
  trafficCountries: { country: string; percentage: number; code: string }[];
  trafficHistory?: { month: string; traffic: number }[];
  trafficByCountry?: { country: string; percentage: number; code: string }[];

  // Link Profile
  referringDomains: number | null;
  refDomainsProvider: string;
  backlinks: number | null;
  backlinksProvider: string;
  dofollowLinks: number | null;
  nofollowLinks: number | null;

  // Risk & Spam
  spamScore: number | null;
  spamProvider: string;

  // Guest Post Specifics
  guestPostInfo: GuestPostInfo;

  // Convenient Flat Fields for backwards compatibility
  publisherPrice?: number;
  clientPrice?: number;
  profit?: number;
  contactPerson?: string;
  contactRole?: string;
  contactEmail?: string;
  contactPage?: string;
  writeForUsPage?: string;
  wordCount?: string;
  turnaroundTime?: string;
  sponsoredTag?: string;
  contextualLink?: boolean;
  authorBioLink?: boolean;
  guestPostAvailable?: boolean;
  topKeywords?: string[];
  editorialGuidelines?: string;
  savedInCrm?: boolean;
  dateAdded?: string;
  savedDate?: string;
  tags?: string[];
  contactSocial?: {
    twitter?: string;
    linkedin?: string;
  };

  // Transparent Opportunity Score
  opportunityScore: OpportunityScoreResult;

  // Stage Tracking
  opportunityStage: OpportunityStage;
  dateDiscovered: string;
  notes: string;
}

export type Website = DiscoveredWebsite;

export interface SearchFilterState {
  niche: string;
  country: string;
  language?: string;
  daMin: number;
  daMax?: number;
  drMin: number;
  drMax?: number;
  asMin: number;
  asMax?: number;
  tfMin?: number;
  tfMax?: number;
  cfMin?: number;
  cfMax?: number;
  trafficMin: number;
  referringDomainsMin?: number;
  spamScoreMax: number;
  dofollowOnly: boolean;
  contextualOnly: boolean;
  nonSponsoredOnly?: boolean;
  guestPostOnly?: boolean;
  guestPostRequired: boolean;
  sponsoredFilter: 'all' | 'non-sponsored' | 'sponsored';
  priceMax: number;
  searchPatternMode: 'all' | 'write_for_us' | 'guest_post' | 'contribute' | 'submit_article';
  searchQuery?: string;
  opportunityScoreMin?: number;
  linkTypeFilter?: 'all' | 'dofollow' | 'nofollow' | 'sponsored' | 'editorial';
  guestPostTypeFilter?: 'all' | 'free' | 'paid' | 'sponsored' | 'contributor' | 'editorial' | 'unknown';
  websiteTypeFilter?: 'all' | 'blog' | 'magazine' | 'news' | 'saas' | 'business' | 'technology' | 'agency' | 'community';
}

export interface ApiSettings {
  mozApiKey: string;
  ahrefsApiKey: string;
  semrushApiKey: string;
  majesticApiKey: string;
  dataForSeoApiKey?: string;
  similarwebApiKey?: string;
  searchApiKey: string;
  displayNAWhenUnavailable: boolean;
}

export type OutreachTemplateType =
  | 'Initial Outreach'
  | 'Follow-up 1'
  | 'Follow-up 2'
  | 'Price Negotiation'
  | 'Article Submission';

export interface OutreachItem {
  id: string;
  websiteId: string;
  websiteName: string;
  websiteUrl: string;
  contactPerson: string;
  contactEmail: string;
  templateType: OutreachTemplateType;
  subject: string;
  pitchTopic: string;
  body: string;
  status:
    | 'Not Contacted'
    | 'Contacted'
    | 'Pitching'
    | 'Under Review'
    | 'Follow-up'
    | 'Negotiating'
    | 'Replied'
    | 'Interested'
    | 'Accepted'
    | 'Writing'
    | 'Published'
    | 'Rejected'
    | 'Declined';
  proposedPrice: number;
  agreedPrice: number;
  clientPrice?: number;
  clientName: string;
  sentDate: string;
  nextFollowupDate?: string;
  followupCount: number;
  notes: string;
  contentDraftUrl?: string;
  paymentStatus?: 'Unpaid' | 'Pending Approval' | 'Paid' | 'Waived' | 'Invoiced';
}

export interface BacklinkItem {
  id: string;
  publisher: string;
  publishedUrl: string;
  publisherUrl?: string;
  targetUrl: string;
  anchorText: string;
  followType: 'Dofollow' | 'Nofollow';
  linkType: 'Contextual' | 'Author Bio';
  datePublished: string;
  status: 'Live & Indexed' | 'Under Review' | 'Lost / 404' | 'Noindex Found';
  httpStatus: number;
  lastChecked: string;
  client: string;
  article: string;
  articleTitle?: string;
  da?: number;
  dr?: number;
}

export interface GuestPostOrder {
  id: string;
  orderNumber?: string;
  clientName: string;
  websiteId: string;
  websiteName: string;
  websiteUrl: string;
  targetUrl: string;
  anchorText: string;
  articleTopic: string;
  wordCount: number;
  wordCountTarget?: number;
  publisherPrice: number;
  clientPrice: number;
  profit: number;
  draftUrl?: string;
  status: 'Requirement Briefing' | 'Content In Production' | 'Editorial Review' | 'Published' | 'Paid';
  dueDate: string;
  assignedWriter: string;
  createdDate: string;
}

export interface CampaignWebsiteItem {
  websiteId: string;
  stage: 'Researching' | 'Contacted' | 'Follow-up' | 'Negotiating' | 'Accepted' | 'Published' | 'Rejected';
  addedAt: string;
  notes?: string;
}

export interface Campaign {
  id: string;
  name: string;
  niche: string;
  targetCountries: string[];
  minAuthority: number;
  minTraffic: number;
  targetSitesCount: number;
  status: 'Active' | 'Paused' | 'Completed';
  createdAt: string;
  websites: CampaignWebsiteItem[];
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  niche: string;
  timestamp: string;
  filters: Partial<SearchFilterState>;
  resultsCount: number;
  savedCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company: string;
  role: string;
  plan: 'Free' | 'Starter' | 'Pro' | 'Agency';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'discovery' | 'outreach' | 'backlink' | 'system';
}

export type NavigationTab =
  // Public Website Pages
  | 'home'
  | 'features'
  | 'how-it-works'
  | 'pricing'
  | 'about'
  | 'contact'
  | 'login'
  | 'signup'
  // Application / Dashboard Sections
  | 'overview'
  | 'dashboard'
  | 'finder'
  | 'results'
  | 'saved'
  | 'database'
  | 'analysis'
  | 'outreach'
  | 'campaigns'
  | 'reports'
  | 'settings'
  | 'history'
  | 'contacts'
  | 'publishers'
  | 'backlinks'
  | 'orders'
  | 'comparison'
  | 'followups'
  | 'calculator';
