export type GuestPostStatus = 'CONFIRMED' | 'LIKELY' | 'UNCLEAR' | 'NOT FOUND';

export interface DiscoveredResult {
  id: string;
  domain: string;
  title: string;
  name: string; // for backward compatibility with existing UI
  url: string;  // domain or full root url
  niche: string;
  country: string;
  language: string;
  websiteType: string;
  guestPostStatus: GuestPostStatus;
  status: string; // 'Confirmed' | 'Likely' | 'Unclear' | 'Not Found' for UI compatibility
  guestPostAccepted: string;
  evidenceUrl: string;
  guidelinesUrl: string;
  evidenceType: string;
  evidence: string;
  
  // SEO Metrics (attributed to real providers)
  authorityScore: number | null; // Semrush AS
  as: number | null;
  domainRating: number | null;   // Ahrefs DR
  dr: number | null;
  domainAuthority: number | null;// Moz DA
  da: number | null;
  pageAuthority: number | null;  // Moz PA
  pa: number | null;
  organicTraffic: number | null;
  traffic: number | null;
  organicKeywords: number | null;
  referringDomains: number | null;
  backlinks: number | null;
  spamScore: number | null;      // Moz Spam %
  trustFlow: number | null;      // Majestic TF
  citationFlow: number | null;   // Majestic CF
  
  // Commercial & Guidelines
  linkType: 'Dofollow' | 'Nofollow';
  postType: 'Free' | 'Editorial' | 'Paid' | 'Sponsored' | 'Contributor';
  sponsored: string;
  price: number;
  priceText: string;
  publisherPrice?: number;
  contactPerson: string;
  contactRole: string;
  contactEmail: string;
  minWordCount: number;
  contentRequirements: string;
  oppStatus: string;
  domainAgeYears?: number;
  indexedPages?: number;
  discoveredAt?: string;
  isLiveDiscovered?: boolean;
}

export interface DiscoveryResponse {
  query: string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  isLive: boolean;
  searchPatterns: string[];
  stages: string[];
  results: DiscoveredResult[];
  cached?: boolean;
}

export interface DiscoveryQueryOptions {
  query?: string;
  niche?: string;
  country?: string;
  status?: string;
  linkType?: string;
  postType?: string;
  minAs?: number;
  minDr?: number;
  minDa?: number;
  minTraffic?: number;
  maxSpam?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
