/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Shield, Plus, ToggleLeft, ToggleRight, CheckSquare, Sparkles, RefreshCw, UserCheck, AlertOctagon } from 'lucide-react';
import { toast } from 'sonner';

interface ClientSite {
  id: string;
  url: string;
  niche: string;
  autoPostEnabled: boolean;
  crawlStatus: 'active' | 'suspended';
}

interface AdminProps {
  onPostNewLog: (message: string, type: 'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'post_pub' | 'system' | 'seo', status: 'success' | 'warning' | 'error' | 'info') => void;
  onImpersonate: (userEmail: string) => void;
}

export default function Admin({ onPostNewLog, onImpersonate }: AdminProps) {
  const [featureFlags, setFeatureFlags] = useState({
    enableDeepResearch: true,
    enableSelfHealingProxies: false,
    enableAeoIntegration: true,
    enableMaverickDmSequence: true
  });

  const [clientSites, setClientSites] = useState<ClientSite[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [newNiche, setNewNiche] = useState('Organic Gymwear');

  useEffect(() => {
    // Seed and restore client sites
    const stored = localStorage.getItem('nexus_client_sites');
    if (stored) {
      setClientSites(JSON.parse(stored));
    } else {
      const initial: ClientSite[] = [
        { id: '1', url: 'https://dietmaven.ca', niche: 'Health & Nutrition', autoPostEnabled: true, crawlStatus: 'active' },
        { id: '2', url: 'https://fitlife-apex.io', niche: 'Strength Coaching', autoPostEnabled: false, crawlStatus: 'suspended' }
      ];
      setClientSites(initial);
      localStorage.setItem('nexus_client_sites', JSON.stringify(initial));
    }
  }, []);

  const handleToggleFlag = (flagName: keyof typeof featureFlags) => {
    const updated = {
      ...featureFlags,
      [flagName]: !featureFlags[flagName]
    };
    setFeatureFlags(updated);
    const flagStr = flagName as string;
    toast.info(`System Flag ${flagStr.replace(/([A-Z])/g, ' $1')} set to ${updated[flagName] ? 'ENABLED' : 'DISABLED'}`);
    onPostNewLog(`System administrator adjusted global feature flag: ${flagStr} to ${updated[flagName]}`, 'system', 'info');
  };

  const handleAddSite = () => {
    if (!newUrl) {
      toast.error('Website URL coordinate is required!');
      return;
    }

    const newSite: ClientSite = {
      id: `site-${Date.now()}`,
      url: newUrl,
      niche: newNiche,
      autoPostEnabled: true,
      crawlStatus: 'active'
    };

    const updated = [...clientSites, newSite];
    setClientSites(updated);
    localStorage.setItem('nexus_client_sites', JSON.stringify(updated));
    setNewUrl('');
    
    onPostNewLog(`Registered new client site boundary under admin allocation: ${newUrl}`, 'system', 'success');
    toast.success('Successfully registered client site!');
  };

  const handleToggleSiteAutoPost = (id: string, current: boolean) => {
    const updated = clientSites.map(s => s.id === id ? { ...s, autoPostEnabled: !current } : s);
    setClientSites(updated);
    localStorage.setItem('nexus_client_sites', JSON.stringify(updated));
    toast.info(`Auto positioning set to ${!current ? 'ENABLED' : 'DISABLED'} for target URL.`);
  };

  const handleTriggerDailyAutoPostRun = () => {
    toast.info('Initiating pilot crawlers across active client sites...');
    onPostNewLog('System execution check: Dispatching manual Daily Auto Posts run...', 'system', 'info');

    setTimeout(() => {
      onPostNewLog('Finished site crawl audits. Generated scheduled outputs for connected content loops.', 'post_pub', 'success');
      toast.success('Daily auto posts successfully dispatched to connected indices!');
    }, 1500);
  };

  const handleImpersonateUser = () => {
    toast.success('Impersonation token invoked! Routing to target workspace...');
    onImpersonate('demo@nexusforge.ai');
  };

  return (
    <div className="space-y-6" id="admin-view-node-container">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center space-x-2">
            <Shield className="h-5 w-5 text-rose-500 animate-pulse-slow" />
            <span>Master System Administrative Panel</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Global toggle flags, client site crawl arrays, immediate publication triggers, cluster health states, and impersonation handshakes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Feature Flags Node (Left) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-5 rounded-xl border border-slate-850 bg-slate-900/20 text-left space-y-4">
            <h3 className="text-xs font-bold text-rose-450 uppercase tracking-widest font-mono border-b border-slate-800 pb-2">
              System Feature Overlays
            </h3>

            <div className="space-y-4 text-xs">
              {[
                { name: 'enableDeepResearch', desc: 'Enable multi-agent deep research crawls using selected model reasoning tokens.' },
                { name: 'enableSelfHealingProxies', desc: 'Auto re-wrap broken proxy tunnels behind Cloudflare gateways.' },
                { name: 'enableAeoIntegration', desc: 'Direct mapping of tech schema coordinates in CMS templates.' },
                { name: 'enableMaverickDmSequence', desc: 'Automated welcome and check-back sequences targeting social leads.' }
              ].map(flag => {
                const isEnabled = featureFlags[flag.name as keyof typeof featureFlags];
                return (
                  <div key={flag.name} className="flex justify-between items-start gap-4">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-slate-200 block font-mono">
                        {flag.name.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        {flag.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleFlag(flag.name as any)}
                      className="text-slate-500 hover:text-slate-300 flex-shrink-0"
                      type="button"
                    >
                      {isEnabled ? (
                        <ToggleRight className="h-6 w-6 text-indigo-500" />
                      ) : (
                        <ToggleLeft className="h-6 w-6 text-slate-700" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Impersonate client button */}
          <div className="p-5 rounded-xl border border-amber-500/25 bg-amber-500/5 text-left space-y-3">
            <div className="flex items-center space-x-1 max-w-full">
              <AlertOctagon className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />
              <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">
                Operator Impersonation
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Instantly hot-swap active JWT tokens and sessions array to mimic normal client level workspace permissions (demo@nexusforge.ai) for diagnostic audits.
            </p>
            <button
              onClick={handleImpersonateUser}
              className="w-full py-2 rounded bg-amber-600 hover:bg-amber-500 transition-all text-xs font-bold text-slate-100 flex items-center justify-center space-x-1 cursor-pointer"
              type="button"
            >
              <UserCheck className="h-4 w-4" />
              <span>Impersonate demo@nexusforge.ai</span>
            </button>
          </div>
        </div>

        {/* Websites & Client Sites crawl directory (Right) */}
        <div className="lg:col-span-2">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left h-full min-h-[420px] flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-850 pb-2 mb-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                Website Client crawl array
              </h3>
              
              <button
                onClick={handleTriggerDailyAutoPostRun}
                className="text-[10px] px-3 py-1 bg-slate-900 border border-slate-800 rounded font-bold hover:text-indigo-400 transition-colors cursor-pointer"
                type="button"
              >
                Trigger Daily Auto Posts Now
              </button>
            </div>

            {/* List Table of sites */}
            <div className="flex-1 overflow-x-auto min-h-0" id="admin-client-sites-scroller">
              <table className="w-full text-xs font-sans text-slate-350">
                <thead>
                  <tr className="border-b border-slate-850 font-mono text-[10px] text-slate-400 text-left uppercase">
                    <th className="pb-2">Client URL</th>
                    <th className="pb-2">Niche Domain</th>
                    <th className="pb-2 text-center">Status</th>
                    <th className="pb-2 text-right">Auto Post</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900" id="admin-client-sites-rows">
                  {clientSites.map(site => (
                    <tr key={site.id} className="group hover:bg-slate-900/30">
                      <td className="py-3 pr-2 font-semibold text-slate-200">
                        {site.url}
                      </td>
                      <td className="py-3 text-slate-400">
                        {site.niche}
                      </td>
                      <td className="py-3 text-center">
                        <span className={`text-[9px] uppercase font-mono px-1.5 py-0.2 rounded font-semibold ${
                          site.crawlStatus === 'active' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-slate-950 border border-slate-850 text-slate-500'
                        }`}>
                          {site.crawlStatus}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleToggleSiteAutoPost(site.id, site.autoPostEnabled)}
                          className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                            site.autoPostEnabled 
                              ? 'border-indigo-500/20 text-indigo-400 bg-indigo-500/5' 
                              : 'border-slate-800 text-slate-500 bg-slate-900/30'
                          }`}
                          type="button"
                        >
                          {site.autoPostEnabled ? 'ENABLED' : 'DISABLED'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add sites form */}
            <div className="border-t border-slate-850 pt-4 mt-3 space-y-3">
              <span className="text-[10px] font-bold text-slate-450 uppercase font-mono block">Register new client domain boundary</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://clientbrand.io"
                  className="rounded border border-slate-850 bg-slate-950 p-2 text-slate-200 outline-none"
                />
                <input
                  type="text"
                  value={newNiche}
                  onChange={(e) => setNewNiche(e.target.value)}
                  placeholder="Niche domain (e.g. Health)"
                  className="rounded border border-slate-850 bg-slate-950 p-2 text-slate-200 outline-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleAddSite}
                  className="px-5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-505 font-bold text-xs text-white"
                  type="button"
                >
                  Register site crawl
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
