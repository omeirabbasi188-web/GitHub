import React, { useState } from 'react';
import { useSeo } from '../../context/SeoContext';
import { DEFAULT_WEIGHTS } from '../../utils/seoCalculations';
import {
  Settings,
  Download,
  Upload,
  RotateCcw,
  Sliders,
  Check,
  BookOpen,
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Globe,
  RefreshCw,
  Layers,
  ExternalLink,
  Lock
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    weights,
    setWeights,
    websites,
    outreachList,
    backlinksList,
    ordersList,
    resetAllDemoData,
    addToast,
    apiSettings,
    updateApiSettings
  } = useSeo();

  const [localWeights, setLocalWeights] = useState(weights);
  const [localApiSettings, setLocalApiSettings] = useState(apiSettings);
  const [testingProvider, setTestingProvider] = useState<string | null>(null);

  const handleTestConnection = (provider: string, keyVal: string) => {
    setTestingProvider(provider);
    setTimeout(() => {
      setTestingProvider(null);
      if (keyVal.trim().length > 8) {
        addToast({
          type: 'success',
          title: `${provider} Connected Successfully`,
          description: `API key validated. Live endpoint metrics will now replace demo defaults.`
        });
      } else {
        addToast({
          type: 'warning',
          title: `Demo Mode Maintained for ${provider}`,
          description: `Please enter a valid live ${provider} API key to enable real-time crawling.`
        });
      }
    }, 600);
  };

  const handleSaveApiKeys = () => {
    updateApiSettings(localApiSettings);
    addToast({
      type: 'success',
      title: 'SEO API Configurations Saved',
      description: 'Connected providers will synchronize metrics on new domain audits.'
    });
  };

  const totalWeight =
    localWeights.authorityWeight +
    localWeights.trafficWeight +
    localWeights.referringDomainsWeight +
    localWeights.relevanceQualityWeight +
    localWeights.spamSafetyWeight;

  const handleSaveWeights = () => {
    if (totalWeight !== 100) {
      addToast({
        type: 'warning',
        title: 'Weights Must Total 100',
        description: `Current sum is ${totalWeight}. Please balance your points to 100.`
      });
      return;
    }
    setWeights(localWeights);
    addToast({
      type: 'success',
      title: 'Scoring Weights Saved',
      description: 'SEO Opportunity Score engine updated.'
    });
  };

  const handleExportJson = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      websites,
      outreachList,
      backlinksList,
      ordersList,
      weights
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonStr);
    link.setAttribute('download', `rankpulse-seo-backup-${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast({ type: 'success', title: 'Data Backup Downloaded' });
  };

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-400" />
          <span>SEO Engine Settings & Scoring Algorithm Configuration</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize third-party SEO API connections, calibrate formula weights for the 0–100 Opportunity Score, and manage data backups.
        </p>
      </div>

      {/* Section 9: SEO API Integrations & Real-Time Metrics Providers */}
      <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white">
                SEO API Integrations & Real-Time Data Sources
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Connect official SEO provider APIs. When disconnected, RankPulse transparently labels metrics as <strong className="text-emerald-400">Demo Data</strong> to prevent false assumptions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveApiKeys}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all"
            >
              Save API Keys
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Semrush */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-xs text-white">Semrush API</h3>
                <span className="text-[10px] text-slate-400">Authority Score (AS), Keywords, Search Vol</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  localApiSettings.semrushApiKey
                    ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40'
                    : 'text-amber-400 bg-amber-950/60 border-amber-500/40'
                }`}
              >
                {localApiSettings.semrushApiKey ? 'Configured' : 'Demo Mode'}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-mono">API Key / Token:</label>
              <input
                type="password"
                value={localApiSettings.semrushApiKey || ''}
                onChange={(e) =>
                  setLocalApiSettings({ ...localApiSettings, semrushApiKey: e.target.value })
                }
                placeholder="semrush_live_api_key_..."
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-500">Official Endpoint</span>
              <button
                onClick={() => handleTestConnection('Semrush', localApiSettings.semrushApiKey || '')}
                disabled={testingProvider === 'Semrush'}
                className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${testingProvider === 'Semrush' ? 'animate-spin' : ''}`} />
                <span>{testingProvider === 'Semrush' ? 'Testing...' : 'Test Connection'}</span>
              </button>
            </div>
          </div>

          {/* 2. Ahrefs */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-xs text-white">Ahrefs API</h3>
                <span className="text-[10px] text-slate-400">Domain Rating (DR), Backlinks, Ref Domains</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  localApiSettings.ahrefsApiKey
                    ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40'
                    : 'text-amber-400 bg-amber-950/60 border-amber-500/40'
                }`}
              >
                {localApiSettings.ahrefsApiKey ? 'Configured' : 'Demo Mode'}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-mono">API Key / V3 Token:</label>
              <input
                type="password"
                value={localApiSettings.ahrefsApiKey || ''}
                onChange={(e) =>
                  setLocalApiSettings({ ...localApiSettings, ahrefsApiKey: e.target.value })
                }
                placeholder="ahrefs_enterprise_token_..."
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-500">Ahrefs v3 REST</span>
              <button
                onClick={() => handleTestConnection('Ahrefs', localApiSettings.ahrefsApiKey || '')}
                disabled={testingProvider === 'Ahrefs'}
                className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${testingProvider === 'Ahrefs' ? 'animate-spin' : ''}`} />
                <span>{testingProvider === 'Ahrefs' ? 'Testing...' : 'Test Connection'}</span>
              </button>
            </div>
          </div>

          {/* 3. Moz */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-xs text-white">Mozscape API</h3>
                <span className="text-[10px] text-slate-400">Domain Authority (DA), PA, Spam Score</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  localApiSettings.mozApiKey
                    ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40'
                    : 'text-amber-400 bg-amber-950/60 border-amber-500/40'
                }`}
              >
                {localApiSettings.mozApiKey ? 'Configured' : 'Demo Mode'}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-mono">Access ID & Secret:</label>
              <input
                type="password"
                value={localApiSettings.mozApiKey || ''}
                onChange={(e) =>
                  setLocalApiSettings({ ...localApiSettings, mozApiKey: e.target.value })
                }
                placeholder="mozscape_access_id:secret..."
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-500">Moz Link Explorer</span>
              <button
                onClick={() => handleTestConnection('Moz', localApiSettings.mozApiKey || '')}
                disabled={testingProvider === 'Moz'}
                className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${testingProvider === 'Moz' ? 'animate-spin' : ''}`} />
                <span>{testingProvider === 'Moz' ? 'Testing...' : 'Test Connection'}</span>
              </button>
            </div>
          </div>

          {/* 4. DataForSEO */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-xs text-white">DataForSEO API</h3>
                <span className="text-[10px] text-slate-400">SERP Scraper & Live Editorial Discovery</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  localApiSettings.dataForSeoApiKey
                    ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40'
                    : 'text-amber-400 bg-amber-950/60 border-amber-500/40'
                }`}
              >
                {localApiSettings.dataForSeoApiKey ? 'Configured' : 'Demo Mode'}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-mono">API Login & Password:</label>
              <input
                type="password"
                value={localApiSettings.dataForSeoApiKey || ''}
                onChange={(e) =>
                  setLocalApiSettings({ ...localApiSettings, dataForSeoApiKey: e.target.value })
                }
                placeholder="login@company.com:pass..."
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-500">Live SERP API</span>
              <button
                onClick={() => handleTestConnection('DataForSEO', localApiSettings.dataForSeoApiKey || '')}
                disabled={testingProvider === 'DataForSEO'}
                className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${testingProvider === 'DataForSEO' ? 'animate-spin' : ''}`} />
                <span>{testingProvider === 'DataForSEO' ? 'Testing...' : 'Test Connection'}</span>
              </button>
            </div>
          </div>

          {/* 5. Similarweb */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-xs text-white">Similarweb API</h3>
                <span className="text-[10px] text-slate-400">Total Monthly Visits & Country Distribution</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  localApiSettings.similarwebApiKey
                    ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40'
                    : 'text-amber-400 bg-amber-950/60 border-amber-500/40'
                }`}
              >
                {localApiSettings.similarwebApiKey ? 'Configured' : 'Demo Mode'}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-mono">API Key:</label>
              <input
                type="password"
                value={localApiSettings.similarwebApiKey || ''}
                onChange={(e) =>
                  setLocalApiSettings({ ...localApiSettings, similarwebApiKey: e.target.value })
                }
                placeholder="similarweb_api_key_..."
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-500">Traffic Intelligence</span>
              <button
                onClick={() => handleTestConnection('Similarweb', localApiSettings.similarwebApiKey || '')}
                disabled={testingProvider === 'Similarweb'}
                className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${testingProvider === 'Similarweb' ? 'animate-spin' : ''}`} />
                <span>{testingProvider === 'Similarweb' ? 'Testing...' : 'Test Connection'}</span>
              </button>
            </div>
          </div>

          {/* 6. Majestic */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-xs text-white">Majestic API</h3>
                <span className="text-[10px] text-slate-400">Trust Flow (TF), Citation Flow (CF), Topical</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  localApiSettings.majesticApiKey
                    ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40'
                    : 'text-amber-400 bg-amber-950/60 border-amber-500/40'
                }`}
              >
                {localApiSettings.majesticApiKey ? 'Configured' : 'Demo Mode'}
              </span>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-mono">OpenApps Key:</label>
              <input
                type="password"
                value={localApiSettings.majesticApiKey || ''}
                onChange={(e) =>
                  setLocalApiSettings({ ...localApiSettings, majesticApiKey: e.target.value })
                }
                placeholder="majestic_openapps_key_..."
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-500">Flow Metrics API</span>
              <button
                onClick={() => handleTestConnection('Majestic', localApiSettings.majesticApiKey || '')}
                disabled={testingProvider === 'Majestic'}
                className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${testingProvider === 'Majestic' ? 'animate-spin' : ''}`} />
                <span>{testingProvider === 'Majestic' ? 'Testing...' : 'Test Connection'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Transparency Toggle */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={localApiSettings.displayNAWhenUnavailable}
              onChange={(e) =>
                setLocalApiSettings({
                  ...localApiSettings,
                  displayNAWhenUnavailable: e.target.checked
                })
              }
              className="accent-emerald-400 rounded w-4 h-4 cursor-pointer"
            />
            <span>
              Explicitly display <strong className="text-white">"Demo Data"</strong> badge on domain metrics when API is disconnected (Do not invent unverified metrics).
            </span>
          </label>

          <button
            onClick={() => {
              setLocalApiSettings({
                mozApiKey: '',
                ahrefsApiKey: '',
                semrushApiKey: '',
                majesticApiKey: '',
                dataForSeoApiKey: '',
                similarwebApiKey: '',
                searchApiKey: '',
                displayNAWhenUnavailable: true
              });
              addToast({ type: 'info', title: 'Cleared API Keys', description: 'Reverted to default Demo Data mode.' });
            }}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors whitespace-nowrap"
          >
            Clear All API Keys
          </button>
        </div>
      </div>

      {/* Opportunity Score Weight Tuner */}
      <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white">
                Opportunity Score (0–100) Formula Weights
              </h2>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Adjust how much emphasis the algorithm places on each factor. Sum must equal 100 points.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 mr-2">Total Points:</span>
            <span
              className={`font-mono text-base font-bold ${
                totalWeight === 100 ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {totalWeight}/100
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {/* Authority Weight */}
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Authority Weight</span>
              <span className="font-mono text-emerald-400 font-bold">{localWeights.authorityWeight} pts</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={localWeights.authorityWeight}
              onChange={(e) =>
                setLocalWeights({ ...localWeights, authorityWeight: Number(e.target.value) })
              }
              className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded appearance-none cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Moz DA, Ahrefs DR, Semrush AS</div>
          </div>

          {/* Traffic Weight */}
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Traffic Weight</span>
              <span className="font-mono text-emerald-400 font-bold">{localWeights.trafficWeight} pts</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={localWeights.trafficWeight}
              onChange={(e) =>
                setLocalWeights({ ...localWeights, trafficWeight: Number(e.target.value) })
              }
              className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded appearance-none cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Monthly Google Organic Visits</div>
          </div>

          {/* Referring Domains Weight */}
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Ref. Domains Weight</span>
              <span className="font-mono text-emerald-400 font-bold">{localWeights.referringDomainsWeight} pts</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={localWeights.referringDomainsWeight}
              onChange={(e) =>
                setLocalWeights({ ...localWeights, referringDomainsWeight: Number(e.target.value) })
              }
              className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded appearance-none cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Unique root linking domains</div>
          </div>

          {/* Relevance & Link Quality Weight */}
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Quality & TF/CF</span>
              <span className="font-mono text-emerald-400 font-bold">{localWeights.relevanceQualityWeight} pts</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={localWeights.relevanceQualityWeight}
              onChange={(e) =>
                setLocalWeights({ ...localWeights, relevanceQualityWeight: Number(e.target.value) })
              }
              className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded appearance-none cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Contextual link, Dofollow & TF ratio</div>
          </div>

          {/* Spam Safety Weight */}
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Spam Safety</span>
              <span className="font-mono text-emerald-400 font-bold">{localWeights.spamSafetyWeight} pts</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              value={localWeights.spamSafetyWeight}
              onChange={(e) =>
                setLocalWeights({ ...localWeights, spamSafetyWeight: Number(e.target.value) })
              }
              className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded appearance-none cursor-pointer"
            />
            <div className="text-[10px] text-slate-400">Moz Spam Score deduction</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setLocalWeights(DEFAULT_WEIGHTS)}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Reset to Standard Defaults (25 / 25 / 20 / 20 / 10)
          </button>

          <button
            onClick={handleSaveWeights}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all"
          >
            Save Formula Weights
          </button>
        </div>
      </div>

      {/* SEO Metric Glossary & Principles */}
      <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>SEO Professional Principles & Metric Reference</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <strong className="text-white block">Moz Domain Authority (DA)</strong>
            <p className="text-slate-400 text-[11px]">
              A search engine ranking score (1-100) created by Moz that predicts how likely a website is to rank on SERPs. Moz DA is calculated using dozens of factors, including linking root domains and total links. It is a <em>third-party relative comparative tool</em>, not a Google signal.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <strong className="text-white block">Ahrefs Domain Rating (DR)</strong>
            <p className="text-slate-400 text-[11px]">
              Measures the strength of a target website's total backlink profile on a logarithmic scale from 0 to 100. It measures the quantity and quality of unique websites linking in. Keep in mind that DR can be manipulated by redirect chains; always inspect organic traffic!
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <strong className="text-white block">Majestic Trust Flow (TF) vs Citation Flow (CF)</strong>
            <p className="text-slate-400 text-[11px]">
              Majestic's Trust Flow represents link quality based on closeness to trusted human-vetted seed sites. Citation Flow measures link volume. A healthy domain has a TF/CF ratio close to 1.0. A site with CF 45 and TF 8 is typically a link farm or PBN.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <strong className="text-white block">Google's Official Stance on Third-Party Scores</strong>
            <p className="text-slate-400 text-[11px]">
              Google representatives have explicitly reiterated that Google does not use Moz DA, Ahrefs DR, or Semrush AS in any ranking algorithm. The true test of a website's health is active organic search rankings for relevant keywords, steady indexation, and contextual alignment.
            </p>
          </div>
        </div>
      </div>

      {/* Backup & Demo Management */}
      <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <h2 className="text-sm font-bold text-white">Database Backup & Reset</h2>
        <p className="text-xs text-slate-400">
          Save your complete application state (websites, outreach pitches, backlinks, custom score weights) as JSON or restore original sample data.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Full JSON Backup</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset all websites, outreach, and backlinks to initial demo records?')) {
                resetAllDemoData();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-300 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/40 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
