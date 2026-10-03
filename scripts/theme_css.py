# Complete CSS for RankPulse SEO Blogger Theme

THEME_CSS = """
/* Reset & Base Variables */
:root {
  --bg-dark: #020617;
  --bg-card: #0f172a;
  --bg-card-hover: #1e293b;
  --bg-surface: #0b1120;
  --accent-emerald: #10b981;
  --accent-emerald-light: #34d399;
  --accent-emerald-bg: rgba(16, 185, 129, 0.12);
  --accent-cyan: #06b6d4;
  --accent-cyan-bg: rgba(6, 182, 212, 0.12);
  --accent-indigo: #6366f1;
  --accent-indigo-bg: rgba(99, 102, 241, 0.12);
  --accent-amber: #f59e0b;
  --accent-amber-bg: rgba(245, 158, 11, 0.12);
  --accent-rose: #f43f5e;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border-color: rgba(148, 163, 184, 0.14);
  --border-highlight: rgba(16, 185, 129, 0.35);
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}

[data-theme="light"], .light-theme {
  --bg-dark: #f8fafc;
  --bg-card: #ffffff;
  --bg-card-hover: #f1f5f9;
  --bg-surface: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #64748b;
  --border-color: rgba(15, 23, 42, 0.1);
  --border-highlight: rgba(16, 185, 129, 0.4);
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  background-color: var(--bg-dark);
  color: var(--text-primary);
  font-family: var(--font-sans);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

button, input, select, textarea {
  font-family: inherit;
}

/* Layout Container */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

/* Header & Navbar */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: rgba(2, 6, 23, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.3s ease;
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.25rem;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-icon {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-md);
  background: var(--accent-emerald-bg);
  border: 1px solid var(--border-highlight);
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-cube {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 2px;
  background: var(--accent-emerald);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.brand-tagline {
  font-size: 0.625rem;
  font-family: var(--font-mono);
  color: var(--accent-emerald);
  font-weight: 600;
  letter-spacing: 0.05em;
}

/* Desktop Navigation */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--accent-emerald);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.demo-badge-nav {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
  font-size: 0.7rem;
  font-family: var(--font-mono);
  color: var(--accent-amber);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.btn-primary {
  background: var(--accent-emerald);
  color: #020617;
}

.btn-primary:hover {
  background: var(--accent-emerald-light);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--bg-card);
  color: var(--text-primary);
  border-color: var(--border-color);
}

.btn-secondary:hover {
  background: var(--bg-card-hover);
  border-color: rgba(148, 163, 184, 0.3);
}

.theme-toggle-btn {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s;
}

.theme-toggle-btn:hover {
  color: var(--text-primary);
}

.mobile-toggle {
  display: none;
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
}

/* Mobile Drawer */
.mobile-drawer {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(2, 6, 23, 0.95);
  backdrop-filter: blur(12px);
  padding: 2rem 1.5rem;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-drawer.active {
  display: flex;
}

.mobile-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
}

.mobile-nav-links a {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* Hero Section */
.hero-section {
  padding: 4rem 0 3rem;
  text-align: center;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.hero-pill-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--accent-emerald);
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  line-height: 1.15;
  margin-bottom: 1.25rem;
  text-wrap: balance;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--text-secondary);
  max-width: 44rem;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.hero-ctas {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

/* Quick Search Bar */
.quick-search-box {
  max-width: 42rem;
  margin: 0 auto 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

.quick-search-box input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-size: 0.95rem;
  outline: none;
}

.quick-search-box input::placeholder {
  color: var(--text-muted);
}

.niche-tags {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 3rem;
}

.niche-tag-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s;
  padding: 0.2rem 0.4rem;
}

.niche-tag-btn:hover {
  color: var(--accent-emerald);
}

/* Browser Mockup */
.mockup-wrap {
  max-width: 68rem;
  margin: 0 auto;
  border-radius: var(--radius-xl);
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid var(--border-color);
  padding: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.mockup-inner {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #020617;
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.mockup-topbar {
  background: #0f172a;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.mockup-dots {
  display: flex;
  gap: 0.35rem;
}

.mockup-dot {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
}

.dot-red { background: #ef4444; }
.dot-amber { background: #f59e0b; }
.dot-green { background: #10b981; }

.mockup-dashboard-preview {
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  background: #090e1a;
}

.mock-stat-card {
  background: #0f172a;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1rem;
  text-align: left;
}

.mock-stat-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.mock-stat-val {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-mono);
  margin-top: 0.25rem;
}

/* Trust KPI Bar */
.trust-bar {
  padding: 2.5rem 0;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 1.75rem;
  text-align: center;
}

.trust-item-val {
  font-size: 2rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--accent-emerald);
}

.trust-item-val.cyan { color: var(--accent-cyan); }
.trust-item-val.indigo { color: var(--accent-indigo); }
.trust-item-val.amber { color: var(--accent-amber); }

.trust-item-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

/* Section Header */
.section-head {
  text-align: center;
  max-width: 48rem;
  margin: 0 auto 3rem;
}

.section-tag {
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--accent-emerald);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.section-tag.cyan { color: var(--accent-cyan); }
.section-tag.indigo { color: var(--accent-indigo); }

.section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.section-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

/* Guest Post Finder Section */
.finder-section {
  padding: 4rem 0;
}

.finder-box {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.finder-filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-align: left;
}

.filter-group label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.filter-group select,
.filter-group input[type="text"],
.filter-group input[type="range"] {
  background: var(--bg-dark);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.75rem;
  color: var(--text-primary);
  font-size: 0.85rem;
  outline: none;
}

.filter-group select:focus,
.filter-group input:focus {
  border-color: var(--accent-emerald);
}

.range-val-badge {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-emerald);
  font-weight: 600;
}

.finder-actions-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.results-meta-pill {
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: var(--text-secondary);
}

.demo-data-disclaimer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-md);
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.25);
  font-size: 0.8rem;
  color: var(--accent-amber);
  margin-bottom: 1.5rem;
}

/* 16-Column Results Table */
.table-responsive-wrapper {
  overflow-x: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
}

.saas-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.8rem;
  min-width: 1300px;
}

.saas-table th {
  background: #090e1a;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.saas-table th:hover {
  color: var(--accent-emerald);
}

.saas-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.08);
  vertical-align: middle;
  color: var(--text-secondary);
}

.saas-table tr:hover td {
  background: rgba(30, 41, 59, 0.5);
  color: var(--text-primary);
}

.site-cell-name {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 0.85rem;
  display: block;
}

.site-cell-domain {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
}

/* Badges */
.badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.72rem;
  font-weight: 600;
  font-family: var(--font-mono);
  white-space: nowrap;
}

.badge-high-as { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
.badge-mid-as { background: rgba(6, 182, 212, 0.15); color: #22d3ee; border: 1px solid rgba(6, 182, 212, 0.3); }
.badge-low-as { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }

.badge-confirmed { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
.badge-likely { background: rgba(99, 102, 241, 0.15); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.3); }
.badge-unclear { background: rgba(148, 163, 184, 0.15); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.3); }
.badge-notfound { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }

.badge-dofollow { background: rgba(16, 185, 129, 0.12); color: #34d399; }
.badge-nofollow { background: rgba(148, 163, 184, 0.12); color: #94a3b8; }

.relevance-cell {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 85px;
}

.relevance-pct {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent-emerald);
}

.relevance-bar {
  width: 100%;
  height: 4px;
  background: rgba(148, 163, 184, 0.15);
  border-radius: 9999px;
  overflow: hidden;
}

.relevance-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-emerald), var(--accent-cyan));
  border-radius: 9999px;
}

.guidelines-summary-cell {
  max-width: 220px;
  font-size: 0.72rem;
  color: var(--text-secondary);
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.evidence-link-cell {
  font-size: 0.75rem;
  color: var(--accent-cyan);
  text-decoration: none;
  font-family: var(--font-mono);
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.evidence-link-cell:hover {
  text-decoration: underline;
  color: #fff;
}

.table-btn-row {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.btn-xs {
  padding: 0.3rem 0.55rem;
  font-size: 0.7rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  cursor: pointer;
  border: 1px solid var(--border-color);
  background: var(--bg-dark);
  color: var(--text-secondary);
  transition: all 0.15s;
}

.btn-xs:hover {
  background: var(--bg-card-hover);
  color: var(--text-primary);
  border-color: var(--border-highlight);
}

.btn-xs.btn-analyze {
  color: var(--accent-cyan);
  border-color: rgba(6, 182, 212, 0.3);
}

.btn-xs.btn-contact {
  color: var(--accent-emerald);
  border-color: rgba(16, 185, 129, 0.3);
}

/* Discovery Engine Progress Box & Loading Stages */
.discovery-progress-wrap {
  background: var(--bg-card);
  border: 1px solid var(--border-highlight);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.15);
  animation: fadeIn 0.25s ease-in-out;
}

.discovery-progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(148, 163, 184, 0.15);
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.discovery-progress-fill {
  height: 100%;
  width: 15%;
  background: linear-gradient(90deg, var(--accent-emerald), var(--accent-cyan));
  border-radius: 9999px;
  transition: width 0.4s ease;
}

.discovery-progress-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
}

.spinner-pulse {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid var(--accent-emerald);
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.discovery-queries-preview {
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
}

.query-chip {
  padding: 0.2rem 0.5rem;
  background: var(--bg-dark);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--accent-cyan);
}

/* Pagination Bar Controls */
.finder-pagination-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1rem 1.25rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.pagination-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.pagination-left select {
  background: var(--bg-dark);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  padding: 0.35rem 0.6rem;
  font-size: 0.75rem;
}

.pagination-center {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.page-indicator {
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: var(--text-primary);
  font-weight: 600;
}

.pagination-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.fallback-warning-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.85rem;
  border-radius: var(--radius-md);
  background: rgba(244, 63, 94, 0.1);
  border: 1px solid rgba(244, 63, 94, 0.3);
  font-size: 0.75rem;
  color: #fda4af;
  margin-bottom: 1rem;
}

/* Modals */
.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(2, 6, 23, 0.85);
  backdrop-filter: blur(8px);
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-overlay.active {
  display: flex;
}

.modal-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  max-width: 44rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.75rem;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
}

.modal-close-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 1.25rem;
  cursor: pointer;
  transition: color 0.2s;
}

.modal-close-btn:hover {
  color: var(--text-primary);
}

.modal-head-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.modal-head-url {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent-emerald);
}

.metrics-audit-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin: 1.25rem 0;
}

.metric-audit-item {
  background: var(--bg-dark);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 0.75rem;
  text-align: center;
}

.audit-val {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--accent-emerald);
}

.audit-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

/* Feature Pillars Grid */
.features-section {
  padding: 4rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  transition: transform 0.2s, border-color 0.2s;
}

.feature-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-highlight);
}

.feature-icon-box {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-emerald-bg);
  border: 1px solid var(--border-highlight);
  color: var(--accent-emerald);
  margin-bottom: 0.5rem;
}

.feature-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.feature-card-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.55;
}

/* How It Works Steps */
.workflow-section {
  padding: 4rem 0;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.step-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  position: relative;
}

.step-number-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent-emerald);
  background: var(--accent-emerald-bg);
  border: 1px solid var(--border-highlight);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  display: inline-block;
  margin-bottom: 0.75rem;
}

.step-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.step-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.55;
}

/* Pricing Section */
.pricing-section {
  padding: 4rem 0;
  text-align: center;
}

.pricing-cadence-switch {
  display: inline-flex;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 0.25rem;
  margin-bottom: 2.5rem;
}

.cadence-btn {
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-md);
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.cadence-btn.active {
  background: var(--accent-emerald);
  color: #020617;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  text-align: left;
}

.pricing-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 2rem 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.pricing-card.popular {
  border-color: var(--accent-emerald);
  box-shadow: 0 0 30px -5px rgba(16, 185, 129, 0.2);
}

.popular-badge {
  position: absolute;
  top: -0.75rem;
  right: 1.5rem;
  background: var(--accent-emerald);
  color: #020617;
  font-size: 0.65rem;
  font-weight: 800;
  font-family: var(--font-mono);
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  letter-spacing: 0.05em;
}

.pricing-plan-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
}

.pricing-price-wrap {
  margin: 1.25rem 0;
}

.pricing-price {
  font-size: 2.5rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--text-primary);
}

.pricing-features-list {
  list-style: none;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.pricing-features-list li::before {
  content: "✔";
  color: var(--accent-emerald);
  margin-right: 0.5rem;
  font-weight: bold;
}

/* FAQ Accordion */
.faq-section {
  padding: 4rem 0;
  max-width: 52rem;
  margin: 0 auto;
}

.faq-item {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.faq-question {
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  text-align: left;
}

.faq-answer {
  display: none;
  padding: 0 1.5rem 1.25rem;
  color: var(--text-secondary);
  font-size: 0.88rem;
  line-height: 1.6;
}

.faq-item.active .faq-answer {
  display: block;
}

/* CTA Conversion Banner */
.cta-banner-section {
  padding: 3rem 0;
}

.cta-banner-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.9) 50%, rgba(6, 182, 212, 0.15) 100%);
  border: 1px solid var(--border-highlight);
  border-radius: var(--radius-xl);
  padding: 3.5rem 2rem;
  text-align: center;
}

/* Blogger Blog & Posts Layout */
.blog-section {
  padding: 4rem 0;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.blog-post-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, border-color 0.2s;
}

.blog-post-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-highlight);
}

.post-thumbnail img {
  width: 100%;
  height: 12.5rem;
  object-fit: cover;
  display: block;
}

.post-content-wrap {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-meta-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.35;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.post-title a:hover {
  color: var(--accent-emerald);
}

.post-snippet {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.25rem;
  flex: 1;
}

.btn-readmore {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent-emerald);
}

.blog-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
}

/* Single Post View */
.single-post-wrap {
  max-width: 52rem;
  margin: 3rem auto;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: 2.5rem 2rem;
}

.single-post-title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.post-body-content {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-top: 2rem;
}

.post-body-content p {
  margin-bottom: 1.5rem;
}

.post-body-content h2, .post-body-content h3 {
  color: var(--text-primary);
  margin: 2rem 0 1rem;
}

/* AdSense Placeholders */
.ad-slot {
  margin: 2rem 0;
  text-align: center;
}

.ad-placeholder {
  min-height: 90px;
  background: rgba(15, 23, 42, 0.4);
  border: 1px dashed rgba(148, 163, 184, 0.2);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 0.75rem;
  font-family: var(--font-mono);
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 300;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toast {
  background: var(--bg-card);
  border: 1px solid var(--border-highlight);
  border-radius: var(--radius-md);
  padding: 0.75rem 1.25rem;
  color: var(--text-primary);
  font-size: 0.85rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
  animation: slideUp 0.25s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Footer */
.site-footer {
  border-top: 1px solid var(--border-color);
  background: #01040f;
  padding: 4rem 0 2rem;
  margin-top: 4rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-col-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.footer-links a:hover {
  color: var(--accent-emerald);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(148, 163, 184, 0.08);
  padding-top: 1.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  flex-wrap: wrap;
  gap: 1rem;
}

/* Responsive Overrides */
@media (max-width: 1024px) {
  .nav-menu { display: none; }
  .mobile-toggle { display: block; }
  .mockup-dashboard-preview { grid-template-columns: repeat(2, 1fr); }
  .footer-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .trust-grid { grid-template-columns: repeat(2, 1fr); }
  .mockup-dashboard-preview { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
}
"""
