/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProxyServer, SocialAccount } from '../types';
import { Globe, Plus, Network, RefreshCw, Radio, HardDrive, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProxiesProps {
  onPostNewLog: (message: string, type: 'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'post_pub' | 'system' | 'seo', status: 'success' | 'warning' | 'error' | 'info') => void;
}

export default function Proxies({ onPostNewLog }: ProxiesProps) {
  const [proxies, setProxies] = useState<ProxyServer[]>([]);
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // New Proxy state
  const [newIp, setNewIp] = useState('');
  const [newPort, setNewPort] = useState('8080');
  const [newType, setNewType] = useState<'residential' | 'mobile' | 'datacenter'>('residential');
  const [newLocation, setNewLocation] = useState('United States (Los Angeles)');

  // Toggle option states
  const [rotateSticky, setRotateSticky] = useState(true);
  const [fingerprintRand, setFingerprintRand] = useState(true);

  useEffect(() => {
    setProxies(JSON.parse(localStorage.getItem('nexus_proxies') || '[]'));
    setAccounts(JSON.parse(localStorage.getItem('nexus_accounts') || '[]'));
  }, []);

  const handleCreateProxy = () => {
    if (!newIp) {
      toast.error('Proxy IP address coordinates are required!');
      return;
    }

    const newPrx: ProxyServer = {
      id: `proxy-${Date.now()}`,
      ip: newIp,
      port: newPort,
      type: newType,
      location: newLocation,
      latencyMs: 0,
      status: 'untested',
      assignedAccountIds: []
    };

    const updated = [...proxies, newPrx];
    setProxies(updated);
    localStorage.setItem('nexus_proxies', JSON.stringify(updated));

    onPostNewLog(`Registered new ${newType.toUpperCase()} proxy server node: ${newIp}`, 'system', 'success');
    toast.success('Added proxy endpoint successfully!');
    
    // reset
    setNewIp('');
    setIsAdding(false);
  };

  const handleTestLatency = (id: string, ip: string) => {
    toast.info(`Auditing latency route to proxy ${ip}...`);
    
    // Simulate latency checks
    setTimeout(() => {
      const randomLatency = Math.floor(Math.random() * 180) + 70; // 70-250 ms
      const updated = proxies.map(p => {
        if (p.id === id) {
          return { ...p, latencyMs: randomLatency, status: 'online' as const };
        }
        return p;
      });

      setProxies(updated);
      localStorage.setItem('nexus_proxies', JSON.stringify(updated));

      onPostNewLog(`Proxy connection resolved for: ${ip}. Latency: ${randomLatency}ms. Status: Online`, 'system', 'success');
      toast.success(`Check verified! Connection resolved at response: ${randomLatency}ms`);
    }, 1000);
  };

  const handleTestAllProxies = () => {
    toast.info('Initiating multi-node connection diagnostic...');
    setTimeout(() => {
      const updated = proxies.map(p => ({
        ...p,
        latencyMs: Math.floor(Math.random() * 120) + 80,
        status: 'online' as const
      }));
      setProxies(updated);
      localStorage.setItem('nexus_proxies', JSON.stringify(updated));
      onPostNewLog('Global proxy pool latency checks concluded successfully.', 'system', 'success');
      toast.success('Pool diagnostic complete. All residential tunnels report online !');
    }, 1200);
  };

  const handleRemoveProxy = (id: string, ip: string) => {
    if (confirm(`Remove proxy tunnel ${ip} from workspace allocation pools?`)) {
      const updated = proxies.filter(p => p.id !== id);
      setProxies(updated);
      localStorage.setItem('nexus_proxies', JSON.stringify(updated));
      toast.info('Proxy tunnel removed');
    }
  };

  return (
    <div className="space-y-6" id="proxies-view-container">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center space-x-2">
            <Globe className="h-5 w-5 text-indigo-400" />
            <span>Dedicated Proxy & IP Tunnel Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Bypass social rate scopes, route API calls securely, randomize browser headers, and test dynamic coordinator latencies.
          </p>
        </div>
        
        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleTestAllProxies}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-804 text-xs text-slate-300 font-semibold hover:border-indigo-500/30 transition-all font-mono"
            type="button"
          >
            <Radio className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
            <span>Audit Tunnels Connection</span>
          </button>
          
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center space-x-1 py-1.5 px-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow shadow-indigo-900/10 transition-all"
            type="button"
          >
            <Plus className="h-4 w-4" />
            <span>{isAdding ? 'Close form' : 'Register Proxy'}</span>
          </button>
        </div>
      </div>

      {isAdding && (
        /* REGISTER FORM PANEL */
        <div className="p-5 rounded-xl border border-indigo-500/30 bg-slate-900/30 text-left space-y-4 max-w-xl" id="register-proxy-panel">
          <div className="border-b border-slate-800 pb-2 flex justify-between">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono">Register Proxy Tunnel</h4>
            <span className="text-[10px] text-slate-500">Dedicated crawler ports</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">IP Coordinates</label>
              <input
                type="text"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                placeholder="45.138.8.12"
                className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-200 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Port</label>
              <input
                type="text"
                value={newPort}
                onChange={(e) => setNewPort(e.target.value)}
                placeholder="8080"
                className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-200 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Network Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-300 outline-none"
              >
                <option value="residential">Residential Node</option>
                <option value="mobile">Mobile Port (4G/5G)</option>
                <option value="datacenter">Datacenter (Static IP)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1 font-sans">Geographical Location</label>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="United States (New York)"
                className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-200 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleCreateProxy}
              className="px-5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white"
              type="button"
            >
              Verify & Register Tunnel
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Proxies Table (Left) & Controls/Parameters (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Table of active servers */}
        <div className="lg:col-span-2">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left h-full min-h-[420px] flex flex-col">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-3">
              Proxy Routing Nodes Pool
            </h3>

            <div className="flex-1 overflow-x-auto min-h-0" id="proxy-nodes-table-scroller">
              <table className="w-full text-xs font-sans text-slate-350">
                <thead>
                  <tr className="border-b border-slate-850 font-mono text-[10px] text-slate-400 text-left uppercase">
                    <th className="pb-2">Tunnel Coordinates</th>
                    <th className="pb-2">Location</th>
                    <th className="pb-2 text-center">Type</th>
                    <th className="pb-2 text-center">Latency</th>
                    <th className="pb-2 text-right">Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900" id="proxy-table-rows">
                  {proxies.map(p => {
                    const isOnline = p.status === 'online';
                    const hasTested = p.status !== 'untested';

                    return (
                      <tr key={p.id} className="group hover:bg-slate-900/30">
                        <td className="py-3">
                          <div className="font-semibold text-slate-200 font-mono">{p.ip}:{p.port}</div>
                          <div className="text-[10px] text-slate-500">
                            Assigned brands: {accounts.filter(a => a.proxyId === p.id).map(a => a.username).join(', ') || 'none'}
                          </div>
                        </td>
                        <td className="py-3 text-slate-400 text-[11px]">
                          {p.location}
                        </td>
                        <td className="py-3 text-center">
                          <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-950 border border-slate-850 text-slate-400">
                            {p.type}
                          </span>
                        </td>
                        <td className="py-3 text-center font-mono">
                          {hasTested ? (
                            <span className={p.latencyMs < 150 ? 'text-emerald-400' : 'text-amber-400'}>
                              {p.latencyMs} ms
                            </span>
                          ) : (
                            <span className="text-slate-600 italic">untested</span>
                          )}
                        </td>
                        <td className="py-3 text-right space-y-1 sm:space-y-0 sm:space-x-1 flex flex-col sm:flex-row items-end sm:items-center justify-end">
                          <button
                            onClick={() => handleTestLatency(p.id, p.ip)}
                            className="text-[10px] px-2 py-0.5 rounded border border-slate-800 text-slate-400 hover:text-slate-100"
                            type="button"
                          >
                            Ping check
                          </button>
                          <button
                            onClick={() => handleRemoveProxy(p.id, p.ip)}
                            className="text-[10px] text-slate-600 hover:text-rose-450 opacity-0 group-hover:opacity-100 transition-opacity"
                            type="button"
                          >
                            Flush
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Global IP settings */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-1">
              Safety Tunnels parameters
            </h3>

            {/* Rotation Sticky switch */}
            <div className="p-3.5 rounded-lg bg-slate-950/40 border border-slate-850 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-slate-300">Sticky Session Rotation</h5>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">Auto-rotate proxy IP tunnels every 15 mins to mitigate network sweeps.</p>
              </div>
              <button
                onClick={() => setRotateSticky(!rotateSticky)}
                className={`h-5 w-10 rounded-full flex items-center transition-all flex-shrink-0 ml-3 ${
                  rotateSticky ? 'bg-indigo-600 justify-end' : 'bg-slate-850 justify-start'
                }`}
                type="button"
              >
                <span className="h-4 w-4 rounded-full bg-slate-200" />
              </button>
            </div>

            {/* Fingerprint Random */}
            <div className="p-3.5 rounded-lg bg-slate-950/40 border border-slate-850 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-slate-300 font-sans">Full Device Jitter</h5>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">Randomize browser Canvas/WebGL fingerprint seeds on each Outbound engagement step.</p>
              </div>
              <button
                onClick={() => setFingerprintRand(!fingerprintRand)}
                className={`h-5 w-10 rounded-full flex items-center transition-all flex-shrink-0 ml-3 ${
                  fingerprintRand ? 'bg-indigo-600 justify-end' : 'bg-slate-850 justify-start'
                }`}
                type="button"
              >
                <span className="h-4 w-4 rounded-full bg-slate-200" />
              </button>
            </div>

            {/* Tunnel alert check */}
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[10px] text-amber-400 leading-relaxed font-mono flex items-center space-x-1.5 justify-start">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0 animate-pulse" />
              <span>CAUTION: Over-utilization of datacenter endpoints might degrade brand reach profiles. Prefer Residential mobil ports!</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
