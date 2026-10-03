# Complete XML Structure for RankPulse SEO Blogger Theme

def get_theme_xml(theme_css, theme_js):
    return f"""<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsversion='3' b:responsive='true' b:version='2' class='v2' expr:dir='data:blog.languageDirection' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
  <meta charset='utf-8'/>
  <meta content='width=device-width, initial-scale=1.0' name='viewport'/>
  
  <title>
    <b:if cond='data:view.isHomepage'>
      <data:blog.title/> - Find High-Authority Guest Posting Opportunities Faster
    <b:elseif cond='data:view.isPost or data:view.isPage'/>
      <data:view.title.escaped/> | <data:blog.title/>
    <b:else/>
      <data:blog.pageTitle/>
    </b:if>
  </title>

  <b:include data='blog' name='all-head-content'/>

  <!-- SEO Canonical & Meta -->
  <link expr:href='data:view.url.canonical' rel='canonical'/>
  <meta content='Discover high-authority guest posting sites, analyze comparative SEO metrics, verify contributor guidelines, and manage outreach pipelines.' name='description'/>
  <meta content='website' property='og:type'/>
  <meta expr:content='data:blog.title' property='og:title'/>
  <meta content='Discover high-authority guest posting sites, analyze comparative SEO metrics, verify contributor guidelines, and manage outreach pipelines.' property='og:description'/>
  <meta content='summary_large_image' name='twitter:card'/>

  <!-- Google Fonts: Plus Jakarta Sans & JetBrains Mono -->
  <link rel='preconnect' href='https://fonts.googleapis.com'/>
  <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin='anonymous'/>
  <link href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=JetBrains+Mono:wght@400;500;600;700&amp;display=swap' rel='stylesheet'/>

  <!-- Theme Stylesheet -->
  <b:skin version='2.0.0'><![CDATA[
{theme_css}
  ]]></b:skin>

  <!-- Blogger Template Layout Skin -->
  <b:template-skin><![CDATA[
/* Blogger Layout Template Styles */
body#layout {{
  background-color: #0b1120;
}}
  ]]></b:template-skin>
</head>

<body>
  <!-- 1. Header & Navigation -->
  <header class='site-header'>
    <div class='container'>
      <div class='brand-wrap'>
        <a class='brand-link' expr:href='data:blog.homepageUrl' style='display:flex; align-items:center; gap:0.75rem;'>
          <span class='brand-icon'><span class='brand-cube'/></span>
          <span class='brand-text'>
            <span class='brand-title'>GuestPost Intelligence</span>
            <span class='brand-tagline'>AUTOMATED DISCOVERY &amp; SEO CRM</span>
          </span>
        </a>
      </div>

      <!-- Desktop Nav Links -->
      <nav>
        <ul class='nav-menu'>
          <li><a class='nav-link' expr:href='data:blog.homepageUrl'>Home</a></li>
          <li><a class='nav-link' href='#finder'>Guest Post Finder</a></li>
          <li><a class='nav-link' href='#features'>Features</a></li>
          <li><a class='nav-link' href='#workflow'>How It Works</a></li>
          <li><a class='nav-link' href='#pricing'>Pricing</a></li>
          <li><a class='nav-link' href='#faq'>FAQ</a></li>
          <li><a class='nav-link' href='#blog'>Blog</a></li>
        </ul>
      </nav>

      <!-- Header Action Controls -->
      <div class='header-actions'>
        <button class='btn btn-secondary' onclick='window.GuestPostApp.openSavedSitesModal()' style='padding:0.4rem 0.75rem; font-size:0.75rem;' type='button'>
          Saved Sites (<span id='savedCountBadge'>0</span>)
        </button>
        <span class='demo-badge-nav' style='background:rgba(16,185,129,0.12); border-color:rgba(16,185,129,0.3); color:var(--accent-emerald);'>Live Discovery Engine</span>
        <button aria-label='Toggle Dark/Light Mode' class='theme-toggle-btn' id='themeToggleBtn' type='button'>
          ☀/☾
        </button>
        <a class='btn btn-primary' href='#finder' style='padding:0.45rem 0.9rem; font-size:0.8rem;'>
          Start Finding Sites
        </a>
        <button aria-label='Open Navigation Drawer' class='mobile-toggle' id='mobileToggleBtn' type='button'>
          ☰
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer Overlay -->
  <div class='mobile-drawer' id='mobileNavDrawer'>
    <div class='mobile-drawer-header'>
      <div class='brand-wrap'>
        <span class='brand-icon'><span class='brand-cube'/></span>
        <span class='brand-title' style='color:#fff;'>GuestPost Intelligence</span>
      </div>
      <button aria-label='Close Drawer' id='mobileDrawerCloseBtn' style='background:transparent; border:none; color:#fff; font-size:1.5rem; cursor:pointer;'>✕</button>
    </div>
    <ul class='mobile-nav-links'>
      <li><a expr:href='data:blog.homepageUrl' onclick='document.getElementById(&quot;mobileNavDrawer&quot;).classList.remove(&quot;active&quot;)'>Home</a></li>
      <li><a href='#finder' onclick='document.getElementById(&quot;mobileNavDrawer&quot;).classList.remove(&quot;active&quot;)'>Guest Post Finder</a></li>
      <li><a href='#features' onclick='document.getElementById(&quot;mobileNavDrawer&quot;).classList.remove(&quot;active&quot;)'>Platform Features</a></li>
      <li><a href='#workflow' onclick='document.getElementById(&quot;mobileNavDrawer&quot;).classList.remove(&quot;active&quot;)'>How It Works</a></li>
      <li><a href='#pricing' onclick='document.getElementById(&quot;mobileNavDrawer&quot;).classList.remove(&quot;active&quot;)'>Pricing Plans</a></li>
      <li><a href='#faq' onclick='document.getElementById(&quot;mobileNavDrawer&quot;).classList.remove(&quot;active&quot;)'>FAQ</a></li>
      <li><a href='#blog' onclick='document.getElementById(&quot;mobileNavDrawer&quot;).classList.remove(&quot;active&quot;)'>Blog &amp; Resources</a></li>
      <li><a href='javascript:void(0)' onclick='document.getElementById(&quot;mobileNavDrawer&quot;).classList.remove(&quot;active&quot;); window.GuestPostApp.openSavedSitesModal();'>Saved Opportunities CRM</a></li>
    </ul>
    <div style='margin-top:auto; padding-top:2rem; border-top:1px solid rgba(148,163,184,0.15);'>
      <a class='btn btn-primary' href='#finder' onclick='document.getElementById(&quot;mobileNavDrawer&quot;).classList.remove(&quot;active&quot;)' style='width:100%; text-align:center;'>Launch Finder</a>
    </div>
  </div>

  <!-- Blogger System Header Section -->
  <b:section id='header-section' maxwidgets='1' showaddelement='no'>
    <b:widget id='Header1' locked='true' title='GuestPost Intelligence Header' type='Header' version='2' visible='false'>
      <b:includable id='main'>
        <!-- Hidden header widget to satisfy Blogger engine requirement -->
      </b:includable>
    </b:widget>
  </b:section>

  <!-- 2. HOMEPAGE-ONLY SAAS WORKSPACE SECTIONS -->
  <b:if cond='data:view.isHomepage'>
    <!-- HERO SECTION -->
    <section class='hero-section' id='hero'>
      <div class='container'>
        <div class='hero-pill'>
          <span class='hero-pill-dot'/>
          <strong style='color:var(--accent-emerald);'>2026 Engine Update:</strong>
          <span>Automated Discovery &amp; Verified Evidence</span>
        </div>

        <h1 class='hero-title'>
          Find High-Authority Guest Posting Opportunities Faster
        </h1>

        <p class='hero-subtitle'>
          Discover relevant websites, analyze SEO metrics, identify guest post opportunities, and build your outreach list from one powerful platform.
        </p>

        <div class='hero-ctas'>
          <a class='btn btn-primary' href='#finder'>
            Start Finding Sites &rarr;
          </a>
          <a class='btn btn-secondary' href='#features'>
            Explore Features
          </a>
        </div>

        <!-- Quick Search Bar -->
        <div class='quick-search-box'>
          <input id='quickHeroInput' placeholder='Enter ANY niche or keyword (e.g. SaaS, AI, Health, Real Estate)...' type='text'/>
          <button class='btn btn-primary' onclick='var v = document.getElementById(&quot;quickHeroInput&quot;).value; if (v) window.GuestPostApp.quickNicheSearch(v);' style='padding:0.6rem 1.25rem; font-size:0.85rem;' type='button'>
            Discover Sites
          </button>
        </div>

        <!-- Quick Niche Chips -->
        <div class='niche-tags'>
          <span>Popular:</span>
          <button class='niche-tag-btn' onclick='window.GuestPostApp.quickNicheSearch(&quot;SaaS&quot;)' type='button'>SaaS</button>
          <button class='niche-tag-btn' onclick='window.GuestPostApp.quickNicheSearch(&quot;AI&quot;)' type='button'>AI</button>
          <button class='niche-tag-btn' onclick='window.GuestPostApp.quickNicheSearch(&quot;Technology&quot;)' type='button'>Technology</button>
          <button class='niche-tag-btn' onclick='window.GuestPostApp.quickNicheSearch(&quot;Digital Marketing&quot;)' type='button'>Digital Marketing</button>
          <button class='niche-tag-btn' onclick='window.GuestPostApp.quickNicheSearch(&quot;Finance&quot;)' type='button'>Finance</button>
          <button class='niche-tag-btn' onclick='window.GuestPostApp.quickNicheSearch(&quot;Cybersecurity&quot;)' type='button'>Cybersecurity</button>
          <button class='niche-tag-btn' onclick='window.GuestPostApp.quickNicheSearch(&quot;Health&quot;)' type='button'>Health</button>
          <button class='niche-tag-btn' onclick='window.GuestPostApp.quickNicheSearch(&quot;E-Commerce&quot;)' type='button'>E-Commerce</button>
          <button class='niche-tag-btn' onclick='window.GuestPostApp.quickNicheSearch(&quot;Real Estate&quot;)' type='button'>Real Estate</button>
          <button class='niche-tag-btn' onclick='window.GuestPostApp.quickNicheSearch(&quot;Travel&quot;)' type='button'>Travel</button>
        </div>

        <!-- Dashboard Preview Mockup -->
        <div class='mockup-wrap'>
          <div class='mockup-inner'>
            <div class='mockup-topbar'>
              <div style='display:flex; align-items:center; gap:0.5rem;'>
                <div class='mockup-dots'>
                  <span class='mockup-dot dot-red'/>
                  <span class='mockup-dot dot-amber'/>
                  <span class='mockup-dot dot-green'/>
                </div>
                <span style='font-family:var(--font-mono); margin-left:0.5rem; font-size:0.7rem;'>app.rankpulse.io/overview · AI &amp; SaaS Discovery</span>
              </div>
              <span style='color:var(--accent-emerald); font-family:var(--font-mono); font-size:0.7rem;'>● Live Session Active</span>
            </div>

            <div class='mockup-dashboard-preview'>
              <div class='mock-stat-card'>
                <div class='mock-stat-label'>Total Sites Found</div>
                <div class='mock-stat-val'>14,240</div>
              </div>
              <div class='mock-stat-card'>
                <div class='mock-stat-label'>Qualified Sites</div>
                <div class='mock-stat-val' style='color:var(--accent-emerald);'>3,890</div>
              </div>
              <div class='mock-stat-card'>
                <div class='mock-stat-label'>High Authority (AS 50+)</div>
                <div class='mock-stat-val' style='color:var(--accent-cyan);'>1,640</div>
              </div>
              <div class='mock-stat-card'>
                <div class='mock-stat-label'>Avg Organic Traffic</div>
                <div class='mock-stat-val' style='color:var(--accent-indigo);'>64.2k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUST KPI BAR -->
    <section class='trust-bar'>
      <div class='container'>
        <div class='trust-grid'>
          <div>
            <div class='trust-item-val'>14,200+</div>
            <div class='trust-item-label'>Verified Guest Post Opportunities</div>
          </div>
          <div>
            <div class='trust-item-val cyan'>5 Providers</div>
            <div class='trust-item-label'>Semrush, Ahrefs, Moz, Majestic, DataForSEO</div>
          </div>
          <div>
            <div class='trust-item-val indigo'>98.4%</div>
            <div class='trust-item-label'>Evidence Detection Accuracy</div>
          </div>
          <div>
            <div class='trust-item-val amber'>&lt; 2 hrs</div>
            <div class='trust-item-label'>Outreach Campaign Velocity</div>
          </div>
        </div>
      </div>
    </section>

    <!-- TOP ADSENSE PLACEMENT -->
    <div class='container'>
      <div class='ad-slot'>
        <b:section id='ad-top-section' maxwidgets='1' showaddelement='yes'>
          <b:widget id='HTML101' locked='false' title='Top Header Ad Placement' type='HTML' version='2' visible='true'>
            <b:includable id='main'>
              <div class='ad-placeholder'>
                <span>[Google AdSense Header Placement Slot - Replace via Blogger Layout]</span>
              </div>
            </b:includable>
          </b:widget>
        </b:section>
      </div>
    </div>

    <!-- CORE FEATURE: GUEST POST FINDER & 16-COLUMN TABLE -->
    <section class='finder-section' id='finder'>
      <div class='container'>
        <div class='section-head'>
          <div class='section-tag'>Core Feature Engine</div>
          <h2 class='section-title'>Guest Post Opportunity Finder</h2>
          <p class='section-desc'>
            Filter verified domains by niche, authority metrics, link placement rules, and verified contributor evidence.
          </p>
        </div>

        <!-- Filter Controls -->
        <div class='finder-box'>
          <div class='finder-filter-grid'>
            <div class='filter-group' style='grid-column: 1 / -1;'>
              <label for='finderSearchInput' style='font-size:0.8rem; font-weight:700;'>
                Dynamic Keyword &amp; Niche Discovery
              </label>
              <div style='display:flex; gap:0.5rem; align-items:center;'>
                <input id='finderSearchInput' placeholder='Search ANY keyword (e.g. SaaS, AI, Digital Marketing, Health, Finance, Real Estate)...' style='flex:1; padding:0.65rem 1rem;' type='text' value='SaaS'/>
                <button class='btn btn-primary' id='finderSearchSubmitBtn' style='padding:0.65rem 1.5rem; font-size:0.85rem; white-space:nowrap;' type='button'>
                  Discover Sites →
                </button>
              </div>
              <div style='font-size:0.72rem; color:var(--text-muted); margin-top:0.35rem;'>
                Automatically executes multi-pattern discovery searches including <em>"write for us"</em>, <em>"guest post"</em>, and <em>"contributor guidelines"</em>.
              </div>
            </div>

            <div class='filter-group'>
              <label for='finderNicheSelect'>Target Niche Filter</label>
              <select id='finderNicheSelect'>
                <option value='All'>All Niches</option>
                <option value='AI'>AI &amp; Machine Learning</option>
                <option value='SaaS' selected='selected'>B2B SaaS</option>
                <option value='Technology'>Technology &amp; Cloud</option>
                <option value='Digital Marketing'>Digital Marketing &amp; SEO</option>
                <option value='Finance'>Finance &amp; Fintech</option>
                <option value='Cybersecurity'>Cybersecurity &amp; IT</option>
                <option value='Health'>Health &amp; Wellness</option>
                <option value='E-Commerce'>E-Commerce &amp; Retail</option>
                <option value='Real Estate'>Real Estate</option>
                <option value='Travel'>Travel</option>
              </select>
            </div>

            <div class='filter-group'>
              <label for='finderCountrySelect'>Target Country</label>
              <select id='finderCountrySelect'>
                <option value='All'>All Countries</option>
                <option value='United States'>United States</option>
                <option value='United Kingdom'>United Kingdom</option>
                <option value='Canada'>Canada</option>
              </select>
            </div>

            <div class='filter-group'>
              <label for='finderStatusSelect'>Guest Post Status</label>
              <select id='finderStatusSelect'>
                <option value='All'>All Statuses</option>
                <option value='CONFIRMED'>Confirmed (Verified Page)</option>
                <option value='LIKELY'>Likely</option>
                <option value='UNCLEAR'>Unclear</option>
              </select>
            </div>

            <div class='filter-group'>
              <label for='finderLinkTypeSelect'>Link Type</label>
              <select id='finderLinkTypeSelect'>
                <option value='All'>All Link Types</option>
                <option value='Dofollow'>Dofollow Only</option>
                <option value='Nofollow'>Nofollow</option>
              </select>
            </div>

            <div class='filter-group'>
              <label for='finderPostTypeSelect'>Post Type</label>
              <select id='finderPostTypeSelect'>
                <option value='All'>All Types</option>
                <option value='Free'>Free / Editorial Only</option>
                <option value='Paid'>Paid / Sponsored</option>
                <option value='Contributor'>Contributor Column</option>
                <option value='Editorial'>Editorial Review</option>
              </select>
            </div>

            <div class='filter-group'>
              <label for='finderAsSlider'>
                Min Authority Score (AS): <span class='range-val-badge' id='asSliderVal'>0</span>
              </label>
              <input id='finderAsSlider' max='90' min='0' step='5' type='range' value='0'/>
            </div>

            <div class='filter-group'>
              <label for='finderDrSlider'>
                Min Domain Rating (DR): <span class='range-val-badge' id='drSliderVal'>0</span>
              </label>
              <input id='finderDrSlider' max='90' min='0' step='5' type='range' value='0'/>
            </div>

            <div class='filter-group'>
              <label for='finderTrafficSelect'>Min Organic Traffic</label>
              <select id='finderTrafficSelect'>
                <option value='0'>Any Traffic</option>
                <option value='10000'>10,000+ / mo</option>
                <option value='25000'>25,000+ / mo</option>
                <option value='50000'>50,000+ / mo</option>
                <option value='100000'>100,000+ / mo</option>
              </select>
            </div>

            <div class='filter-group'>
              <label for='finderSpamSelect'>Max Moz Spam Score</label>
              <select id='finderSpamSelect'>
                <option value='10'>Any Spam Score (&lt;= 10%)</option>
                <option value='5'>Clean (&lt;= 5%)</option>
                <option value='2'>Very Clean (&lt;= 2%)</option>
                <option value='1'>Ultra Clean (&lt;= 1%)</option>
              </select>
            </div>
          </div>

          <div class='finder-actions-row'>
            <div class='results-meta-pill' id='resultsCountEl'>
              Discovering live opportunities...
            </div>
            <div style='display:flex; gap:0.5rem; flex-wrap:wrap;'>
              <button class='btn btn-secondary' onclick='window.GuestPostApp.openSavedSitesModal()' style='padding:0.45rem 0.85rem; font-size:0.75rem;' type='button'>
                View Saved Opportunities (<span id='savedCountFinderBadge'>0</span>)
              </button>
              <button class='btn btn-secondary' onclick='window.GuestPostApp.openSettingsModal()' style='padding:0.45rem 0.85rem; font-size:0.75rem;' type='button'>
                ⚙ Connection &amp; API
              </button>
              <button class='btn btn-secondary' id='finderResetBtn' style='padding:0.45rem 0.85rem; font-size:0.75rem;' type='button'>
                Reset Filters
              </button>
              <button class='btn btn-primary' id='exportCsvBtn' style='padding:0.45rem 0.85rem; font-size:0.75rem;' type='button'>
                Export CSV
              </button>
            </div>
          </div>
        </div>

        <!-- Live Discovery Progress Box & Loading Stages -->
        <div class='discovery-progress-wrap' id='discoveryProgressWrap' style='display:none;'>
          <div class='discovery-progress-bar'>
            <div class='discovery-progress-fill' id='discoveryProgressFill' style='width: 20%;'></div>
          </div>
          <div class='discovery-progress-stage'>
            <span class='spinner-pulse'></span>
            <span id='discoveryStageText'>Searching for websites...</span>
          </div>
          <div class='discovery-queries-preview' id='discoveryQueriesPreview'>
            <!-- Dynamically populated with queries like "SaaS write for us", "SaaS guest post"... -->
          </div>
        </div>

        <!-- Fallback Warning Banner (shown only if backend is unreachable) -->
        <div class='fallback-warning-badge' id='discoveryFallbackBanner' style='display:none;'>
          <span>⚠️</span>
          <span>Live discovery backend offline. Running high-performance client-side discovery engine.</span>
        </div>

        <!-- Mandatory Third-Party SEO Disclaimer Banner -->
        <div class='demo-data-disclaimer'>
          <span>ℹ</span>
          <span><strong>Notice:</strong> Moz DA, Ahrefs DR, Semrush AS, and Majestic TF/CF are comparative third-party metrics, not official Google ranking factors. Displayed values are curated sample verification records. Connect an external SEO API for live refresh.</span>
        </div>

        <!-- 16-Column Results Table -->
        <div class='table-responsive-wrapper'>
          <table class='saas-table'>
            <thead>
              <tr>
                <th data-sort='name'>1. Website / Domain ↕</th>
                <th data-sort='status'>2. Guest Post Status ↕</th>
                <th>3. Evidence / Guidelines</th>
                <th data-sort='niche'>4. Niche / Category ↕</th>
                <th data-sort='da'>5. DA ↕</th>
                <th data-sort='dr'>6. DR ↕</th>
                <th data-sort='as'>7. AS ↕</th>
                <th data-sort='traffic'>8. Est. Traffic ↕</th>
                <th data-sort='spamScore'>9. Spam % ↕</th>
                <th>10. Link Type</th>
                <th>11. Post Type</th>
                <th data-sort='price'>12. Price / Fees ↕</th>
                <th>13. Guidelines Summary</th>
                <th>14. Contact / Form</th>
                <th data-sort='relevance'>15. Topical Relevance ↕</th>
                <th>16. Actions</th>
              </tr>
            </thead>
            <tbody id='finderTableBody'>
              <!-- Injected by Vanilla JavaScript -->
            </tbody>
          </table>
        </div>

        <!-- Dynamic Pagination & Load More Controls -->
        <div class='finder-pagination-bar' id='finderPaginationBar'>
          <div class='pagination-left'>
            <span>Per Page:</span>
            <select id='finderPageSizeSelect'>
              <option value='25' selected='selected'>25 per page</option>
              <option value='50'>50 per page</option>
              <option value='100'>100 per page</option>
            </select>
            <span id='paginationRangeText' style='margin-left:0.5rem;'>Showing opportunities...</span>
          </div>
          <div class='pagination-center'>
            <button class='btn btn-secondary' id='prevPageBtn' style='padding:0.4rem 0.85rem; font-size:0.75rem;' type='button'>← Previous</button>
            <span class='page-indicator' id='pageIndicatorText'>Page 1 of 1</span>
            <button class='btn btn-secondary' id='nextPageBtn' style='padding:0.4rem 0.85rem; font-size:0.75rem;' type='button'>Next →</button>
          </div>
          <div class='pagination-right'>
            <button class='btn btn-primary' id='loadMoreBtn' style='padding:0.45rem 1.15rem; font-size:0.8rem; display:none;' type='button'>
              Load More Opportunities ▾
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 8 CORE PILLARS SECTION -->
    <section class='features-section' id='features'>
      <div class='container'>
        <div class='section-head'>
          <div class='section-tag cyan'>Complete Architecture</div>
          <h2 class='section-title'>8 Powerful Pillars of Modern SEO Outreach</h2>
          <p class='section-desc'>
            Engineered to replace scattered spreadsheets with a single, verifiable SEO intelligence platform.
          </p>
        </div>

        <div class='features-grid'>
          <div class='feature-card'>
            <div>
              <div class='feature-icon-box'>🔍</div>
              <h3 class='feature-card-title'>1. Automated Site Discovery</h3>
              <p class='feature-card-desc'>
                Executes multi-pattern queries including "write for us", "submit an article", and "guest guidelines" with automatic domain deduplication.
              </p>
            </div>
            <a href='#finder' style='font-size:0.75rem; color:var(--accent-emerald); font-weight:700;'>Launch Search Engine &rarr;</a>
          </div>

          <div class='feature-card'>
            <div>
              <div class='feature-icon-box' style='background:var(--accent-cyan-bg); border-color:rgba(6,182,212,0.3); color:var(--accent-cyan);'>📊</div>
              <h3 class='feature-card-title'>2. Multi-Provider SEO Metrics</h3>
              <p class='feature-card-desc'>
                Evaluates Moz DA, Ahrefs DR, Semrush AS, and Majestic TF/CF with clear provider attribution to prevent single-metric bias.
              </p>
            </div>
            <a href='#metrics-explanation' style='font-size:0.75rem; color:var(--accent-cyan); font-weight:700;'>View Comparative Logic &rarr;</a>
          </div>

          <div class='feature-card'>
            <div>
              <div class='feature-icon-box' style='background:var(--accent-indigo-bg); border-color:rgba(99,102,241,0.3); color:var(--accent-indigo);'>🛡</div>
              <h3 class='feature-card-title'>3. Guest Post Detection</h3>
              <p class='feature-card-desc'>
                Verified, Likely, and Unclear evidence labeling with exact page citation. Does not claim acceptance without verifiable proof.
              </p>
            </div>
            <a href='#finder' style='font-size:0.75rem; color:var(--accent-indigo); font-weight:700;'>Inspect Evidence &rarr;</a>
          </div>

          <div class='feature-card'>
            <div>
              <div class='feature-icon-box'>⚖</div>
              <h3 class='feature-card-title'>4. 12-Factor Quality Audit</h3>
              <p class='feature-card-desc'>
                Transparent indicators examining Organic Traffic, Ref Domains, Indexation, and Spam Risk without arbitrary overall scoreboards.
              </p>
            </div>
            <a href='#finder' style='font-size:0.75rem; color:var(--accent-emerald); font-weight:700;'>Audit Opportunities &rarr;</a>
          </div>

          <div class='feature-card'>
            <div>
              <div class='feature-icon-box' style='background:var(--accent-amber-bg); border-color:rgba(245,158,11,0.3); color:var(--accent-amber);'>👥</div>
              <h3 class='feature-card-title'>5. Editorial Contact Hunter</h3>
              <p class='feature-card-desc'>
                Extracts publicly available editor names, roles, and verified business emails directly from editorial and write-for-us pages.
              </p>
            </div>
            <a href='#finder' style='font-size:0.75rem; color:var(--accent-amber); font-weight:700;'>View Editorial Contacts &rarr;</a>
          </div>

          <div class='feature-card'>
            <div>
              <div class='feature-icon-box'>📁</div>
              <h3 class='feature-card-title'>6. Saved Opportunities CRM</h3>
              <p class='feature-card-desc'>
                Tag, annotate, and advance prospects across stages: New Opportunities, Qualified, Contacted, Negotiating, Published.
              </p>
            </div>
            <a href='javascript:void(0)' onclick='window.RankPulseApp.openSavedSitesModal()' style='font-size:0.75rem; color:var(--accent-emerald); font-weight:700;'>Organize Outreach &rarr;</a>
          </div>

          <div class='feature-card'>
            <div>
              <div class='feature-icon-box'>✉</div>
              <h3 class='feature-card-title'>7. Outreach Pitch Generator</h3>
              <p class='feature-card-desc'>
                Generates personalized pitches and follow-up templates referencing target guidelines and editor names without automatic spamming.
              </p>
            </div>
            <a href='#finder' style='font-size:0.75rem; color:var(--accent-emerald); font-weight:700;'>Draft Pitch Template &rarr;</a>
          </div>

          <div class='feature-card'>
            <div>
              <div class='feature-icon-box' style='background:var(--accent-cyan-bg); border-color:rgba(6,182,212,0.3); color:var(--accent-cyan);'>🔗</div>
              <h3 class='feature-card-title'>8. Live Backlink Tracking</h3>
              <p class='feature-card-desc'>
                Monitors published guest posts with HTTP 200 checks, anchor text confirmation, and CSV reports for client billing.
              </p>
            </div>
            <a href='#pricing' style='font-size:0.75rem; color:var(--accent-cyan); font-weight:700;'>Monitor Backlinks &rarr;</a>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS 6-STEP WORKFLOW -->
    <section class='workflow-section' id='workflow'>
      <div class='container'>
        <div class='section-head'>
          <div class='section-tag'>Structured Workflow</div>
          <h2 class='section-title'>How It Works in 6 Simple Steps</h2>
          <p class='section-desc'>
            From discovering niche-specific publishers to sending personalized editorial pitches.
          </p>
        </div>

        <div class='steps-grid'>
          <div class='step-card'>
            <span class='step-number-tag'>Step 1</span>
            <h3 class='step-title'>Enter your niche</h3>
            <p class='step-desc'>Input your industry keyword like AI, SaaS, Health, or Digital Marketing along with authority and traffic minimums.</p>
          </div>
          <div class='step-card'>
            <span class='step-number-tag'>Step 2</span>
            <h3 class='step-title'>Discover relevant websites</h3>
            <p class='step-desc'>System executes multiple search patterns ("write for us", "guest post", "contribute") and removes duplicate domains automatically.</p>
          </div>
          <div class='step-card'>
            <span class='step-number-tag'>Step 3</span>
            <h3 class='step-title'>Analyze SEO metrics</h3>
            <p class='step-desc'>Inspect Moz Domain Authority, Ahrefs Domain Rating, Semrush Authority Score, organic traffic, and referring domains.</p>
          </div>
          <div class='step-card'>
            <span class='step-number-tag'>Step 4</span>
            <h3 class='step-title'>Verify guest posting opportunities</h3>
            <p class='step-desc'>Check detected contributor guidelines, word count rules, dofollow link placement, and turnaround times with source URLs.</p>
          </div>
          <div class='step-card'>
            <span class='step-number-tag'>Step 5</span>
            <h3 class='step-title'>Save qualified websites</h3>
            <p class='step-desc'>Organize prospects into campaigns across Qualified, Contacted, Negotiating, Accepted, and Published stages.</p>
          </div>
          <div class='step-card'>
            <span class='step-number-tag'>Step 6</span>
            <h3 class='step-title'>Contact website owners</h3>
            <p class='step-desc'>Generate tailored outreach pitches based on target editorial guidelines and track follow-up dates in the outreach CRM.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- METRICS EXPLANATION & API ARCHITECTURE -->
    <section class='workflow-section' id='metrics-explanation' style='background:rgba(15,23,42,0.4);'>
      <div class='container'>
        <div class='section-head'>
          <div class='section-tag indigo'>API Architecture &amp; Methodology</div>
          <h2 class='section-title'>Understanding Comparative SEO Metrics</h2>
          <p class='section-desc'>
            Why we never fabricate SEO data and how external API providers connect securely.
          </p>
        </div>

        <div style='display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem;'>
          <div class='step-card'>
            <h3 class='step-title' style='color:var(--accent-emerald);'>Third-Party Metric Philosophy</h3>
            <p class='step-desc'>
              Moz DA, Ahrefs DR, Semrush AS, and Majestic TF/CF are comparative indicators constructed by independent crawling bots. They are not official Google search signals. RankPulse displays each metric with its authentic provider label so your outreach team can make informed decisions based on genuine data.
            </p>
          </div>
          <div class='step-card'>
            <h3 class='step-title' style='color:var(--accent-cyan);'>Blogger Client-Side Security</h3>
            <p class='step-desc'>
              Because Blogger templates run on client-side browsers, secret API keys for Semrush, Ahrefs, Moz, and DataForSEO must <strong>never</strong> be stored inside a Blogger template. For live data refreshes, we provide an external serverless proxy architecture (Cloudflare Worker or Node.js) that keeps your credentials secure.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING SECTION -->
    <section class='pricing-section' id='pricing'>
      <div class='container'>
        <div class='section-head'>
          <div class='section-tag'>Transparent Plans</div>
          <h2 class='section-title'>Simple, Predictable Plans for Every Outreach Team</h2>
          <p class='section-desc'>
            No hidden fees or scraped low-quality link packages. Connect your own SEO API keys or utilize our pre-verified dataset.
          </p>
        </div>

        <!-- Cadence Switcher -->
        <div class='pricing-cadence-switch'>
          <button class='cadence-btn' data-cycle='monthly' onclick='window.RankPulseApp.setBillingCycle(&quot;monthly&quot;)' type='button'>Monthly Billing</button>
          <button class='cadence-btn active' data-cycle='annual' onclick='window.RankPulseApp.setBillingCycle(&quot;annual&quot;)' type='button'>Annual Billing (Save 20%)</button>
        </div>

        <div class='pricing-grid'>
          <!-- Free Plan -->
          <div class='pricing-card'>
            <div>
              <div class='pricing-plan-name'>Free Community</div>
              <p style='font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;'>For individual researchers &amp; solo bloggers</p>
              <div class='pricing-price-wrap'>
                <span class='pricing-price'>$0</span>
                <span style='font-size:0.8rem; color:var(--text-muted);'>/ month</span>
              </div>
              <ul class='pricing-features-list'>
                <li>25 domain searches / month</li>
                <li>Basic Moz DA &amp; Semrush AS metrics</li>
                <li>Guest post evidence verification</li>
                <li>CSV table export (up to 50 rows)</li>
                <li>Community support forum</li>
              </ul>
            </div>
            <a class='btn btn-secondary' href='#finder' style='width:100%; text-align:center;'>Start Free Search</a>
          </div>

          <!-- Starter Pro -->
          <div class='pricing-card'>
            <div>
              <div class='pricing-plan-name'>Starter Pro</div>
              <p style='font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;'>For freelance SEOs &amp; boutique consultants</p>
              <div class='pricing-price-wrap'>
                <span class='pricing-price' data-annual='39' data-monthly='49'>$39</span>
                <span style='font-size:0.8rem; color:var(--text-muted);'>/ month</span>
              </div>
              <ul class='pricing-features-list'>
                <li>250 domain searches / month</li>
                <li>Full Moz DA, Ahrefs DR &amp; Semrush AS</li>
                <li>Verified editorial contact discovery</li>
                <li>5 email pitch &amp; follow-up templates</li>
                <li>Standard email support (&lt; 24h SLA)</li>
              </ul>
            </div>
            <a class='btn btn-secondary' href='#finder' style='width:100%; text-align:center;'>Select Starter</a>
          </div>

          <!-- Professional Team -->
          <div class='pricing-card popular'>
            <span class='popular-badge'>MOST POPULAR</span>
            <div>
              <div class='pricing-plan-name'>Professional Team</div>
              <p style='font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;'>For growing marketing teams &amp; SEO agencies</p>
              <div class='pricing-price-wrap'>
                <span class='pricing-price' data-annual='79' data-monthly='99' style='color:var(--accent-emerald);'>$79</span>
                <span style='font-size:0.8rem; color:var(--text-muted);'>/ month</span>
              </div>
              <ul class='pricing-features-list'>
                <li>Unlimited domain discovery searches</li>
                <li>All 5 SEO API connectors enabled</li>
                <li>Automated editorial contact extraction</li>
                <li>Unlimited Kanban outreach campaigns</li>
                <li>Priority support (&lt; 2h SLA)</li>
              </ul>
            </div>
            <a class='btn btn-primary' href='#finder' style='width:100%; text-align:center;'>Start 14-Day Pro Trial</a>
          </div>

          <!-- Agency Enterprise -->
          <div class='pricing-card'>
            <div>
              <div class='pricing-plan-name'>Agency Enterprise</div>
              <p style='font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;'>For high-volume digital link building agencies</p>
              <div class='pricing-price-wrap'>
                <span class='pricing-price' data-annual='159' data-monthly='199'>$159</span>
                <span style='font-size:0.8rem; color:var(--text-muted);'>/ month</span>
              </div>
              <ul class='pricing-features-list'>
                <li>Everything in Professional Team</li>
                <li>Multi-seat team workspace (up to 10 users)</li>
                <li>Client white-label PDF executive reports</li>
                <li>Custom scoring formula calibration</li>
                <li>Dedicated account manager &amp; onboarding</li>
              </ul>
            </div>
            <a class='btn btn-secondary' href='#finder' style='width:100%; text-align:center;'>Contact Enterprise Sales</a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ ACCORDION -->
    <section class='faq-section' id='faq'>
      <div class='container'>
        <div class='section-head'>
          <div class='section-tag'>FAQ</div>
          <h2 class='section-title'>Frequently Asked Questions</h2>
          <p class='section-desc'>
            Everything you need to know about our data architecture, API connections, and outreach workflow.
          </p>
        </div>

        <div class='faq-item active'>
          <button class='faq-question' type='button'>
            <span>How does RankPulse verify if a website accepts guest posts?</span>
            <span>▾</span>
          </button>
          <div class='faq-answer'>
            RankPulse searches for active "Write for Us", contributor guidelines, editorial submission pages, and guest post guidelines. It checks if the domain is live, active, and retains the source URL proof where the submission guidelines were detected.
          </div>
        </div>

        <div class='faq-item'>
          <button class='faq-question' type='button'>
            <span>Where do the SEO authority metrics come from?</span>
            <span>▾</span>
          </button>
          <div class='faq-answer'>
            All authority metrics are clearly attributed to legitimate industry providers: Domain Authority (Moz), Domain Rating (Ahrefs), Authority Score (Semrush), and Trust/Citation Flow (Majestic). If an API is disconnected, the system clearly marks metrics as demo or unavailable rather than hallucinating fake data.
          </div>
        </div>

        <div class='faq-item'>
          <button class='faq-question' type='button'>
            <span>How does the transparent SEO Opportunity Score work?</span>
            <span>▾</span>
          </button>
          <div class='faq-answer'>
            The Opportunity Score calculates a transparent, unweighted or custom-weighted score composed of Niche Relevance (20 pts), Organic Traffic (25 pts), Authority Signals (25 pts), Link Profile Quality (20 pts), and Spam Risk Safety (10 pts). The complete mathematical explanation is viewable for every domain.
          </div>
        </div>

        <div class='faq-item'>
          <button class='faq-question' type='button'>
            <span>Can I export the discovered websites to CSV or Google Sheets?</span>
            <span>▾</span>
          </button>
          <div class='faq-answer'>
            Yes. All discovered domains, verification proofs, publisher prices, contact emails, and authority metrics can be exported in one click to standard CSV format compatible with Excel and Google Sheets.
          </div>
        </div>

        <div class='faq-item'>
          <button class='faq-question' type='button'>
            <span>Does RankPulse discover editorial contact information?</span>
            <span>▾</span>
          </button>
          <div class='faq-answer'>
            Where publicly and legally listed on contact and contributor pages, RankPulse extracts public editorial emails and editor names with direct citation of the source page.
          </div>
        </div>
      </div>
    </section>

    <!-- CONVERSION CTA BANNER -->
    <section class='cta-banner-section'>
      <div class='container'>
        <div class='cta-banner-card'>
          <h2 style='font-size:clamp(1.75rem, 3.5vw, 2.5rem); font-weight:800; color:#fff; margin-bottom:1rem;'>
            Ready to Accelerate Your Guest Posting Pipeline?
          </h2>
          <p style='color:var(--text-secondary); max-width:38rem; margin:0 auto 2rem; font-size:0.95rem;'>
            Stop wasting hours manually searching Google. Discover verified, high-DA publishers with live guidelines and direct editor contacts today.
          </p>
          <div style='display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;'>
            <a class='btn btn-primary' href='#finder'>Start Free Discovery &rarr;</a>
            <a class='btn btn-secondary' href='#pricing'>View Pricing Plans</a>
          </div>
        </div>
      </div>
    </section>
  </b:if>

  <!-- 3. BLOGGER EDITORIAL / POSTS SECTION (Always available for Blog & Articles) -->
  <section class='blog-section' id='blog'>
    <div class='container'>
      <b:if cond='data:view.isHomepage'>
        <div class='section-head'>
          <div class='section-tag'>Editorial &amp; Guides</div>
          <h2 class='section-title'>Latest SEO &amp; Outreach Insights</h2>
          <p class='section-desc'>
            Industry analysis, link building case studies, and publisher guidelines from our research desk.
          </p>
        </div>
      </b:if>

      <!-- Main Blog Widget Section -->
      <main id='main-content'>
        <b:section id='main-blog-section' showaddelement='yes'>
          <b:widget id='Blog1' locked='true' title='Editorial Posts' type='Blog' version='2' visible='true'>
            <b:includable id='main' var='this'>
              <!-- Post Listings (Multiple Items) -->
              <b:if cond='data:view.isMultipleItems'>
                <div class='blog-grid'>
                  <b:loop values='data:posts' var='post'>
                    <article class='blog-post-card'>
                      <b:if cond='data:post.firstImageUrl'>
                        <div class='post-thumbnail'>
                          <a expr:href='data:post.url'>
                            <img expr:alt='data:post.title' expr:src='data:post.firstImageUrl' loading='lazy'/>
                          </a>
                        </div>
                      </b:if>
                      <div class='post-content-wrap'>
                        <div class='post-meta-row'>
                          <span><data:post.date/></span>
                          <b:if cond='data:post.author.name'>
                            <span>· <data:post.author.name/></span>
                          </b:if>
                          <b:if cond='data:post.labels'>
                            <b:loop values='data:post.labels' var='label'>
                              <span class='badge' style='background:rgba(148,163,184,0.1); margin-left:0.25rem;'>
                                <data:label.name/>
                              </span>
                            </b:loop>
                          </b:if>
                        </div>
                        <h3 class='post-title'>
                          <a expr:href='data:post.url'><data:post.title/></a>
                        </h3>
                        <div class='post-snippet'>
                          <data:post.snippet/>
                        </div>
                        <div>
                          <a class='btn-readmore' expr:href='data:post.url'>Read Article &rarr;</a>
                        </div>
                      </div>
                    </article>
                  </b:loop>
                </div>

                <!-- Blog Pagination -->
                <b:if cond='data:olderPageUrl or data:newerPageUrl'>
                  <div class='blog-pagination'>
                    <b:if cond='data:newerPageUrl'>
                      <a class='btn btn-secondary' expr:href='data:newerPageUrl'>&larr; Newer Posts</a>
                    </b:if>
                    <b:if cond='data:olderPageUrl'>
                      <a class='btn btn-secondary' expr:href='data:olderPageUrl'>Older Posts &rarr;</a>
                    </b:if>
                  </div>
                </b:if>
              <b:else/>
                <!-- Single Post or Page View -->
                <article class='single-post-wrap'>
                  <div class='post-meta-row' style='margin-bottom:1rem;'>
                    <span>Published <data:post.date/></span>
                    <b:if cond='data:post.author.name'>
                      <span>by <data:post.author.name/></span>
                    </b:if>
                    <b:if cond='data:post.labels'>
                      <b:loop values='data:post.labels' var='label'>
                        <span class='badge badge-high-as' style='margin-left:0.25rem;'>
                          <data:label.name/>
                        </span>
                      </b:loop>
                    </b:if>
                  </div>
                  <h1 class='single-post-title'><data:post.title/></h1>

                  <b:if cond='data:post.firstImageUrl'>
                    <div style='margin:1.5rem 0; border-radius:var(--radius-lg); overflow:hidden;'>
                      <img expr:alt='data:post.title' expr:src='data:post.firstImageUrl' style='width:100%; max-height:400px; object-fit:cover;'/>
                    </div>
                  </b:if>

                  <div class='post-body-content'>
                    <data:post.body/>
                  </div>

                  <!-- In-Post Outreach CTA -->
                  <div style='margin-top:3rem; padding:1.5rem; border-radius:var(--radius-lg); background:var(--bg-dark); border:1px solid var(--border-highlight); text-align:center;'>
                    <h3 style='font-size:1.15rem; color:#fff; margin-bottom:0.5rem;'>Need High-Authority Guest Posts for Your Brand?</h3>
                    <p style='font-size:0.85rem; color:var(--text-secondary); margin-bottom:1rem;'>Use RankPulse to discover vetted editorial opportunities in your niche with verified contact details.</p>
                    <a class='btn btn-primary' expr:href='data:blog.homepageUrl + &quot;#finder&quot;'>Launch Guest Post Finder &rarr;</a>
                  </div>
                </article>
              </b:if>
            </b:includable>
          </b:widget>
        </b:section>
      </main>

      <!-- Sidebar Section -->
      <aside style='margin-top:3rem;'>
        <b:section id='sidebar-section' showaddelement='yes'>
          <b:widget id='PopularPosts1' locked='false' title='Trending Outreach Guides' type='PopularPosts' version='2' visible='true'>
            <b:includable id='main'>
              <div style='background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-xl); padding:1.5rem; margin-bottom:1.5rem;'>
                <b:if cond='data:title != &quot;&quot;'>
                  <h3 style='font-size:1rem; color:#fff; font-weight:700; margin-bottom:1rem;'><data:title/></h3>
                </b:if>
                <div style='display:flex; flex-direction:column; gap:0.75rem;'>
                  <b:loop values='data:posts' var='post'>
                    <div style='padding-bottom:0.75rem; border-bottom:1px solid rgba(148,163,184,0.08);'>
                      <a expr:href='data:post.url' style='font-size:0.85rem; font-weight:600; color:var(--text-primary); display:block; margin-bottom:0.25rem;'>
                        <data:post.title/>
                      </a>
                      <span style='font-size:0.7rem; color:var(--text-muted);'><data:post.date/></span>
                    </div>
                  </b:loop>
                </div>
              </div>
            </b:includable>
          </b:widget>

          <b:widget id='Label1' locked='false' title='Explore by Niche' type='Label' version='2' visible='true'>
            <b:includable id='main'>
              <div style='background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-xl); padding:1.5rem;'>
                <b:if cond='data:title != &quot;&quot;'>
                  <h3 style='font-size:1rem; color:#fff; font-weight:700; margin-bottom:1rem;'><data:title/></h3>
                </b:if>
                <div style='display:flex; flex-wrap:wrap; gap:0.4rem;'>
                  <b:loop values='data:labels' var='label'>
                    <a class='badge' expr:href='data:label.url' style='background:var(--bg-dark); color:var(--text-secondary); border:1px solid var(--border-color); padding:0.35rem 0.65rem;'>
                      <data:label.name/> (<data:label.count/>)
                    </a>
                  </b:loop>
                </div>
              </div>
            </b:includable>
          </b:widget>
        </b:section>
      </aside>
    </div>
  </section>

  <!-- BOTTOM ADSENSE PLACEMENT -->
  <div class='container'>
    <div class='ad-slot'>
      <b:section id='ad-bottom-section' maxwidgets='1' showaddelement='yes'>
        <b:widget id='HTML102' locked='false' title='Bottom Footer Ad Placement' type='HTML' version='2' visible='true'>
          <b:includable id='main'>
            <div class='ad-placeholder'>
              <span>[Google AdSense Footer Placement Slot - Replace via Blogger Layout]</span>
            </div>
          </b:includable>
        </b:widget>
      </b:section>
    </div>
  </div>

  <!-- 4. MODALS (Analyze, View, Contact, Saved Sites) -->
  <!-- Analyze Modal -->
  <div class='modal-overlay' id='analyzeModal'>
    <div class='modal-card'>
      <button class='modal-close-btn' onclick='window.GuestPostApp.closeModals()' type='button'>✕</button>
      <h3 class='modal-head-title' id='modalAnalyzeTitle'>Site Analysis</h3>
      <div class='modal-head-url' id='modalAnalyzeUrl'>domain.com</div>
      <div id='modalAnalyzeBody'>
        <!-- Injected by JS -->
      </div>
      <div style='margin-top:1.25rem; display:flex; justify-content:flex-end;'>
        <button class='btn btn-secondary' onclick='window.GuestPostApp.closeModals()' type='button'>Close Analysis</button>
      </div>
    </div>
  </div>

  <!-- View Details Modal -->
  <div class='modal-overlay' id='viewModal'>
    <div class='modal-card'>
      <button class='modal-close-btn' onclick='window.GuestPostApp.closeModals()' type='button'>✕</button>
      <h3 class='modal-head-title' id='modalViewTitle'>Website Overview</h3>
      <div id='modalViewBody' style='margin-top:1rem;'>
        <!-- Injected by JS -->
      </div>
      <div style='margin-top:1.25rem; display:flex; justify-content:flex-end;'>
        <button class='btn btn-secondary' onclick='window.GuestPostApp.closeModals()' type='button'>Close</button>
      </div>
    </div>
  </div>

  <!-- Contact / Pitch Modal -->
  <div class='modal-overlay' id='contactModal'>
    <div class='modal-card'>
      <button class='modal-close-btn' onclick='window.GuestPostApp.closeModals()' type='button'>✕</button>
      <h3 class='modal-head-title' id='modalContactTitle'>Editorial Pitch Composer</h3>
      <div id='modalContactBody' style='margin-top:1rem;'>
        <!-- Injected by JS -->
      </div>
    </div>
  </div>

  <!-- Saved Sites Modal / CRM Drawer -->
  <div class='modal-overlay' id='savedSitesModal'>
    <div class='modal-card'>
      <button class='modal-close-btn' onclick='window.GuestPostApp.closeModals()' type='button'>✕</button>
      <h3 class='modal-head-title'>Saved Guest Post Opportunities CRM</h3>
      <p style='font-size:0.75rem; color:var(--text-muted); margin-bottom:1rem;'>Your private saved outreach shortlist stored in browser local storage.</p>
      <div id='modalSavedSitesBody'>
        <!-- Injected by JS -->
      </div>
      <div style='margin-top:1.5rem; display:flex; justify-content:space-between; align-items:center;'>
        <button class='btn btn-secondary' onclick='window.GuestPostApp.closeModals()' type='button'>Close CRM</button>
        <button class='btn btn-primary' onclick='document.getElementById(&quot;exportCsvBtn&quot;).click()' type='button'>Export to CSV</button>
      </div>
    </div>
  </div>

  <!-- Settings & Custom Connection Modal -->
  <div class='modal-overlay' id='settingsModal'>
    <div class='modal-card'>
      <button class='modal-close-btn' onclick='window.GuestPostApp.closeModals()' type='button'>✕</button>
      <h3 class='modal-head-title'>API &amp; Live Discovery Configuration</h3>
      <p style='font-size:0.75rem; color:var(--text-muted); margin-bottom:1rem;'>Configure your backend discovery API endpoint or connect external SEO data providers.</p>
      <div style='display:flex; flex-direction:column; gap:1rem;'>
        <div>
          <label style='font-size:0.75rem; color:var(--text-secondary); font-weight:600; display:block; margin-bottom:0.25rem;'>Discovery Engine Endpoint (URL):</label>
          <input id='customApiEndpointInput' style='width:100%; background:var(--bg-dark); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.5rem 0.75rem; color:var(--text-primary); font-family:var(--font-mono); font-size:0.8rem;' type='text' placeholder='https://your-api-domain.com or leave default for smart hybrid mode'/>
          <span style='font-size:0.7rem; color:var(--text-muted); margin-top:0.25rem; display:block;'>By default, GuestPost Intelligence automatically uses hybrid discovery: connecting to live backend when available and utilizing the embedded client-side discovery engine seamlessly.</span>
        </div>
        <div>
          <label style='font-size:0.75rem; color:var(--text-secondary); font-weight:600; display:block; margin-bottom:0.25rem;'>External Live SEO API Key (Optional):</label>
          <input id='externalSeoApiKeyInput' style='width:100%; background:var(--bg-dark); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.5rem 0.75rem; color:var(--text-primary); font-family:var(--font-mono); font-size:0.8rem;' type='password' placeholder='Optional: Moz / DataForSEO / Semrush API Key'/>
          <span style='font-size:0.7rem; color:var(--text-muted); margin-top:0.25rem; display:block;'>Stored strictly in your local browser storage.</span>
        </div>
      </div>
      <div style='margin-top:1.5rem; display:flex; justify-content:space-between; align-items:center;'>
        <button class='btn btn-secondary' onclick='window.GuestPostApp.closeModals()' type='button'>Cancel</button>
        <button class='btn btn-primary' onclick='window.GuestPostApp.saveSettings()' type='button'>Save Settings</button>
      </div>
    </div>
  </div>

  <!-- 5. FOOTER -->
  <footer class='site-footer'>
    <div class='container'>
      <div class='footer-grid'>
        <div>
          <div class='brand-wrap' style='margin-bottom:1rem;'>
            <span class='brand-icon'><span class='brand-cube'/></span>
            <span class='brand-text'>
              <span class='brand-title' style='color:#fff;'>GuestPost Intelligence</span>
              <span class='brand-tagline'>AUTOMATED DISCOVERY &amp; SEO CRM</span>
            </span>
          </div>
          <p style='font-size:0.85rem; color:var(--text-muted); line-height:1.6; max-width:24rem;'>
            Professional SEO guest blogging research, dynamic website discovery, contributor evidence verification, outreach pipeline, and backlink management platform.
          </p>
          <div style='margin-top:1rem; font-size:0.75rem; color:var(--accent-amber);'>
            Notice: Moz, Ahrefs, Semrush, and Majestic metrics are comparative third-party signals.
          </div>
        </div>

        <div>
          <h4 class='footer-col-title'>Platform</h4>
          <ul class='footer-links'>
            <li><a href='#finder'>Guest Post Finder</a></li>
            <li><a href='#features'>Features</a></li>
            <li><a href='#workflow'>How It Works</a></li>
            <li><a href='#pricing'>Pricing Plans</a></li>
            <li><a href='#faq'>FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 class='footer-col-title'>Company &amp; Pages</h4>
          <ul class='footer-links'>
            <li><a expr:href='data:blog.homepageUrl + &quot;p/about.html&quot;'>About GuestPost Intelligence</a></li>
            <li><a expr:href='data:blog.homepageUrl + &quot;p/contact.html&quot;'>Contact &amp; Support</a></li>
            <li><a expr:href='data:blog.homepageUrl + &quot;p/features.html&quot;'>All Features</a></li>
            <li><a expr:href='data:blog.homepageUrl + &quot;p/pricing.html&quot;'>Plan Comparisons</a></li>
            <li><a href='#blog'>Editorial Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 class='footer-col-title'>Compliance &amp; Legal</h4>
          <ul class='footer-links'>
            <li><a expr:href='data:blog.homepageUrl + &quot;p/privacy-policy.html&quot;'>Privacy Policy</a></li>
            <li><a expr:href='data:blog.homepageUrl + &quot;p/terms.html&quot;'>Terms &amp; Conditions</a></li>
            <li><a expr:href='data:blog.homepageUrl + &quot;p/disclaimer.html&quot;'>SEO Disclaimer</a></li>
          </ul>
        </div>
      </div>

      <div class='footer-bottom'>
        <div>
          © <span id='footerYear'>2026</span> GuestPost Intelligence. All rights reserved.
        </div>
        <div style='display:flex; gap:1.5rem;'>
          <span>Blogger XML Dynamic SaaS Theme Engine v3.0</span>
          <span>Live API Discovery &amp; Evidence Engine</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- 6. THEME VANILLA JAVASCRIPT -->
  <script type='text/javascript'>
  //<![CDATA[
{theme_js}
  //]]>
  </script>
</body>
</html>
"""
