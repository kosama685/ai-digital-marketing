/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SocialAccount, ScheduledPost, ActivityLog } from '../types';
import { 
  TrendingUp, 
  Users, 
  Cpu, 
  Sparkles, 
  Calendar, 
  Activity, 
  AlertCircle, 
  ArrowUpRight, 
  CheckCircle, 
  MousePointer, 
  BadgeCheck, 
  RefreshCw,
  PlusCircle,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface OverviewProps {
  onNavigateTo: (section: string) => void;
  onPostNewLog: (message: string, type: 'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'post_pub' | 'system' | 'seo', status: 'success' | 'warning' | 'error' | 'info') => void;
}

export default function Overview({ onNavigateTo, onPostNewLog }: OverviewProps) {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [safetyRate, setSafetyRate] = useState(98);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const activeAccounts = JSON.parse(localStorage.getItem('nexus_accounts') || '[]') as SocialAccount[];
    const activePosts = JSON.parse(localStorage.getItem('nexus_posts') || '[]') as ScheduledPost[];
    setAccounts(activeAccounts);
    setPosts(activePosts);
  }, []);

  const totalFollowers = accounts.reduce((acc, curr) => acc + curr.followers, 0);
  const activeAutomationsCount = 3; // Mocked active automation engines on.

  const triggerDiagnostic = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setSafetyRate(Math.floor(Math.random() * 3) + 97); // 97-100
      onPostNewLog('Global system status diagnostic successfully completed.', 'system', 'success');
      toast.success('Pristine status verified across all proxies and active tokens!');
    }, 1200);
  };

  const handleToggleAccountStatus = (id: string, username: string) => {
    const updated = accounts.map(acc => {
      if (acc.id === id) {
        const nextStatus = acc.status === 'connected' ? 'disconnected' : 'connected';
        toast.info(`${username} is now ${nextStatus.toUpperCase()}`);
        onPostNewLog(`Account ${username} state switched manually to ${nextStatus}`, 'system', 'info');
        return { ...acc, status: nextStatus };
      }
      return acc;
    });
    setAccounts(updated);
    localStorage.setItem('nexus_accounts', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6" id="overview-view-container">
      {/* Top Banner / Welcome header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" id="overview-header-group">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-100 flex items-center space-x-2">
            <span>SaaS Business Command Center</span>
            <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Persisting automated multi-network growth metrics, SEO blogging models, and backlink safety parameters.
          </p>
        </div>
        <div className="flex items-center space-x-2.5">
          <button
            onClick={triggerDiagnostic}
            disabled={isRefreshing}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:border-indigo-500/30 transition-all font-mono"
            type="button"
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Diagnosing...' : 'System Diagnostic'}</span>
          </button>
          <button
            onClick={() => onNavigateTo('scheduler')}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg hover:shadow-indigo-500/20 transition-all cursor-pointer"
            type="button"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Schedule Campaign Post</span>
          </button>
        </div>
      </div>

      {/* Main Stats Widgets with Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="overview-metrics-grid">
        {/* Metric Card 1 */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-slate-700/60 transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Gross Audience Reach</p>
              <h3 className="text-2xl font-bold font-display text-slate-100 mt-1">{totalFollowers.toLocaleString()}</h3>
            </div>
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-emerald-400 flex items-center font-semibold">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              <span>+14.8%</span>
            </span>
            {/* Sparkline */}
            <svg className="w-20 h-6 text-emerald-400" viewBox="0 0 100 20">
              <path d="M0,15 L15,12 L30,14 L45,9 L60,8 L75,12 L90,5 L100,2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-slate-700/60 transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Outbound Automation Rates</p>
              <h3 className="text-2xl font-bold font-display text-slate-100 mt-1">450 / hr</h3>
            </div>
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Cpu className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-400">3 Engines active</span>
            {/* Sparkline */}
            <svg className="w-20 h-6 text-cyan-400" viewBox="0 0 100 20">
              <path d="M0,18 L15,10 L30,12 L45,11 L60,5 L75,8 L90,3 L100,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-slate-700/60 transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Organic SEO Health Index</p>
              <h3 className="text-2xl font-bold font-display text-slate-100 mt-1">94 / 100</h3>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-emerald-400 flex items-center font-semibold">
              <span>+2.4% this week</span>
            </span>
            {/* Sparkline */}
            <svg className="w-20 h-6 text-emerald-400" viewBox="0 0 100 20">
              <path d="M0,12 L20,10 L40,8 L60,6 L80,3 L100,2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Metric Card 4 */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-slate-700/60 transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Endpoint Security Index</p>
              <h3 className="text-2xl font-bold font-display text-slate-100 mt-1">{safetyRate}%</h3>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <AlertCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-slate-400">Proxies binding active</span>
            {/* Sparkline */}
            <svg className="w-20 h-6 text-amber-400" viewBox="0 0 100 20">
              <path d="M0,10 L25,10 L50,11 L75,10 L100,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Grid: Connected Brand channels & Next Scheduled items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="overview-content-layout-grid">
        
        {/* Left Column - Connected Channels */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="text-indigo-400 h-4.5 w-4.5 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display">Connected Core Channels</h3>
              </div>
              <button
                onClick={() => onNavigateTo('accounts')}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center"
                type="button"
              >
                <span>Add Channel</span>
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="home-account-channels-list">
              {accounts.map((acc) => {
                const isConnected = acc.status === 'connected';
                return (
                  <div
                    key={acc.id}
                    className="p-3.5 rounded-lg border border-slate-800 bg-slate-950/60 flex items-center justify-between hover:border-slate-750 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={acc.avatarUrl}
                          alt={acc.username}
                          className="h-9 w-9 rounded-full object-cover border border-slate-800"
                          referrerPolicy="no-referrer"
                        />
                        <span className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border border-slate-950 flex items-center justify-center ${
                          isConnected ? 'bg-emerald-500' : 'bg-slate-700'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs font-bold text-slate-200">{acc.username}</span>
                          <span className="text-[8px] uppercase px-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                            {acc.platform}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{acc.followers.toLocaleString()} subscribers</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleAccountStatus(acc.id, acc.username)}
                      className={`text-[10px] px-2 py-1 rounded font-semibold border ${
                        isConnected
                          ? 'border-rose-500/20 text-rose-400 bg-rose-500/5 hover:bg-rose-500/10'
                          : 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10'
                      }`}
                      type="button"
                    >
                      {isConnected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Upcoming drafts countdown */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="text-cyan-400 h-4.5 w-4.5" />
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display">Upcoming Calendar Queue</h3>
              </div>
              <button
                onClick={() => onNavigateTo('scheduler')}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center"
                type="button"
              >
                <span>Full Calendar</span>
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </button>
            </div>

            <div className="space-y-3" id="home-scheduled-posts-list">
              {posts.map((post) => {
                return (
                  <div
                    key={post.id}
                    className="p-3 rounded-lg bg-slate-950/40 border border-slate-850 hover:border-slate-800 transition-all text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono text-cyan-400 uppercase bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20">
                        {post.platform} - {post.type}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {post.scheduledTime}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-200 leading-snug line-clamp-1">{post.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed italic">
                      "{post.caption}"
                    </p>
                  </div>
                );
              })}
              {posts.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-500">
                  No upcoming publications scheduled.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
