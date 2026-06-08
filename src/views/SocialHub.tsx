/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SocialAccount } from '../types';
import { Share2, Plus, RefreshCw, X, ShieldCheck, Sparkles, ChevronRight, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';

interface SocialHubProps {
  onPostNewLog: (message: string, type: 'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'post_pub' | 'system' | 'seo', status: 'success' | 'warning' | 'error' | 'info') => void;
}

export default function SocialHub({ onPostNewLog }: SocialHubProps) {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [showOauthModal, setShowOauthModal] = useState(false);
  const [selectedOAuthPlatform, setSelectedOauthPlatform] = useState<string>('instagram');

  const platformsPool = [
    { name: 'instagram', iconColor: 'text-indigo-400', bannerBg: 'from-indigo-900/10 to-transparent' },
    { name: 'facebook', iconColor: 'text-blue-400', bannerBg: 'from-blue-900/10 to-transparent' },
    { name: 'linkedin', iconColor: 'text-sky-400', bannerBg: 'from-sky-900/10 to-transparent' },
    { name: 'pinterest', iconColor: 'text-rose-400', bannerBg: 'from-rose-900/10 to-transparent' },
    { name: 'twitter', iconColor: 'text-slate-400', bannerBg: 'from-slate-900/10 to-transparent' },
    { name: 'tiktok', iconColor: 'text-teal-400', bannerBg: 'from-teal-900/10 to-transparent' }
  ];

  useEffect(() => {
    setAccounts(JSON.parse(localStorage.getItem('nexus_accounts') || '[]'));
  }, []);

  const handleDisconnect = (id: string, name: string) => {
    if (confirm(`Sever API access token link for brand channel: ${name}?`)) {
      const updated = accounts.map(a => a.id === id ? { ...a, status: 'disconnected' as const } : a);
      setAccounts(updated);
      localStorage.setItem('nexus_accounts', JSON.stringify(updated));
      onPostNewLog(`Disconnected platform access token for channel: ${name}`, 'system', 'warning');
      toast.info(`Severed token handshake for ${name}`);
    }
  };

  const handleConnectOauthFlow = (platform: string) => {
    setSelectedOauthPlatform(platform);
    setShowOauthModal(true);
  };

  const triggerOAuthVerificationHandshake = () => {
    setShowOauthModal(false);
    toast.info(`Handshaking with ${selectedOAuthPlatform.toUpperCase()} validation clusters...`);

    setTimeout(() => {
      // Find matching item and hook status connected
      const existing = accounts.find(a => a.platform === selectedOAuthPlatform);
      let updated;
      if (existing) {
        updated = accounts.map(a => a.platform === selectedOAuthPlatform ? { ...a, status: 'connected' as const } : a);
        setAccounts(updated);
        localStorage.setItem('nexus_accounts', JSON.stringify(updated));
        toast.success(`Successfully handshaked and re-allocated: ${existing.username}`);
      } else {
        // Create new account entry
        const nameNode = selectedOAuthPlatform === 'tiktok' ? '@nexus_shorts_operator' : `@nexus_${selectedOAuthPlatform}_node`;
        const newAcc: SocialAccount = {
          id: `acc-oauth-${Date.now()}`,
          platform: selectedOAuthPlatform as any,
          username: nameNode,
          avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
          followers: Math.floor(Math.random() * 40000) + 2500,
          following: 15,
          postsCount: 14,
          engagementRate: parseFloat((Math.random() * 6 + 1).toFixed(2)),
          status: 'connected',
          tag: 'Direct API Connect'
        };
        updated = [...accounts, newAcc];
        setAccounts(updated);
        localStorage.setItem('nexus_accounts', JSON.stringify(updated));
        toast.success(`Registered direct verified credentials node: ${newAcc.username}`);
      }

      onPostNewLog(`Successfully established secure API OAuth token connection with: ${selectedOAuthPlatform.toUpperCase()}`, 'system', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6" id="social-hub-view-container">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center space-x-2">
            <Share2 className="h-5 w-5 text-indigo-400" />
            <span>Social API Hub & Channels Connection</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Activate visual OAuth handshakes, authorize API capability scopes, manage connected profiles, and evaluate platform statistics.
          </p>
        </div>
      </div>

      {/* Connection Buttons Grid (Top) */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4">
        <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono border-b border-slate-850 pb-2">
          Authorize direct platform channels
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" id="oauth-connector-trigger-grid">
          {platformsPool.map((plat) => {
            const hasConnectedItem = accounts.some(a => a.platform === plat.name && a.status === 'connected');
            
            return (
              <button
                key={plat.name}
                onClick={() => handleConnectOauthFlow(plat.name)}
                className={`p-3 rounded-lg border text-center transition-all flex flex-col justify-between items-center h-24 cursor-pointer outline-none ${
                  hasConnectedItem 
                    ? 'border-emerald-500/25 bg-emerald-500/5 text-emerald-400' 
                    : 'border-slate-808 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-150'
                }`}
                type="button"
              >
                <span className={`text-[10px] font-bold font-mono uppercase tracking-wider ${plat.iconColor}`}>
                  {plat.name}
                </span>
                
                <span className="text-[9px] uppercase font-semibold leading-none mt-2 font-mono">
                  {hasConnectedItem ? '✓ AUTHORIZED' : 'Link profile'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Account Profiles summary listings (Bottom) */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left">
        <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-4">
          Linked Social brand entities
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="social-authorized-channels-list">
          {accounts.map((acc) => {
            const isConnected = acc.status === 'connected';
            return (
              <div 
                key={acc.id} 
                className={`p-4 rounded-xl border bg-slate-950/60 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all ${
                  isConnected ? 'border-indigo-500/10' : 'border-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className="relative">
                    <img
                      src={acc.avatarUrl}
                      alt={acc.username}
                      className="h-11 w-11 rounded-full object-cover border border-slate-800"
                      referrerPolicy="no-referrer"
                    />
                    <span className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border border-slate-950 ${
                      isConnected ? 'bg-emerald-500' : 'bg-slate-700'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                      <span className="text-xs font-bold text-slate-200">{acc.username}</span>
                      <span className="text-[9px] uppercase font-mono px-1.5 rounded bg-slate-900 border border-slate-850 text-slate-405">
                        {acc.platform}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 font-mono">Followers: {acc.followers.toLocaleString()} • Engage: {acc.engagementRate}%</p>
                  </div>
                </div>

                <div className="self-end sm:self-center">
                  {isConnected ? (
                    <button
                      onClick={() => handleDisconnect(acc.id, acc.username)}
                      className="text-[10px] px-2.5 py-1 rounded bg-slate-900 hover:bg-rose-500/10 hover:text-rose-405 text-slate-450 border border-slate-805"
                      type="button"
                    >
                      Clear Link
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnectOauthFlow(acc.platform)}
                      className="text-[10px] px-2.5 py-1 rounded bg-indigo-600 text-white font-bold"
                      type="button"
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* POPUP OAUTH INTERACTIVE HANDSHAKE DIALOG */}
      {showOauthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" id="oauth-popup-window-container">
          <div className="w-full max-w-sm glass-panel p-6 rounded-xl border border-slate-800 shadow-2xl space-y-4 text-center">
            
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white mx-auto flex items-center justify-center shadow">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-display">
                API Handshake Authorization
              </h3>
              <p className="text-[11px] text-slate-405 leading-relaxed mt-1.5">
                NexusForge AI requests capability scopes to manage posts, read analytics reports and dispatch outreach loops on your: <strong className="text-indigo-400 uppercase font-mono">{selectedOAuthPlatform}</strong> account.
              </p>
            </div>

            {/* Scope details */}
            <div className="p-3 bg-slate-950/60 rounded border border-slate-900 text-left text-[10px] font-mono text-slate-450 space-y-1">
              <div className="flex items-center space-x-1.5">
                <CheckSquare className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                <span>read_brand_insights</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckSquare className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                <span>publish_media_carousel</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckSquare className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                <span>manage_outbox_replies</span>
              </div>
            </div>

            {/* Action Handshakers */}
            <div className="flex space-x-2 pt-1.5">
              <button
                onClick={() => setShowOauthModal(false)}
                className="flex-1 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-450 hover:bg-slate-800 text-xs font-semibold"
                type="button"
              >
                Deny access
              </button>
              <button
                onClick={triggerOAuthVerificationHandshake}
                className="flex-1 py-1.5 rounded bg-indigo-650 hover:bg-indigo-554 text-slate-100 text-xs font-extrabold"
                type="button"
              >
                Authorize & Link
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
