/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TargetScrapedUser } from '../types';
import { 
  Target, 
  Search, 
  Trash2, 
  ShieldCheck, 
  ShieldAlert, 
  Plus, 
  UserMinus, 
  Send, 
  Sparkles, 
  UserCheck, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

interface TargetingProps {
  onPostNewLog: (message: string, type: 'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'post_pub' | 'system' | 'seo', status: 'success' | 'warning' | 'error' | 'info') => void;
}

export default function Targeting({ onPostNewLog }: TargetingProps) {
  const [scrapedUsers, setScrapedUsers] = useState<TargetScrapedUser[]>([]);
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [blacklist, setBlacklist] = useState<string[]>([]);
  const [isScraping, setIsScraping] = useState(false);

  // Scraper inputs
  const [scrapeType, setScrapeType] = useState<'hashtag' | 'competitor' | 'location'>('hashtag');
  const [scrapeInput, setScrapeInput] = useState('#fitnessmotivation');
  
  // Whitelist/Blacklist text field appends
  const [appWh, setAppWh] = useState('');
  const [appBl, setAppBl] = useState('');

  useEffect(() => {
    setScrapedUsers(JSON.parse(localStorage.getItem('nexus_scraped') || '[]'));
    const wb = JSON.parse(localStorage.getItem('nexus_whitelist_blacklist') || '{"whitelist":[],"blacklist":[]}');
    setWhitelist(wb.whitelist || []);
    setBlacklist(wb.blacklist || []);
  }, []);

  const triggerLeadScrape = () => {
    if (!scrapeInput) {
      toast.error('Scrape criteria or keyword seed required!');
      return;
    }

    setIsScraping(true);
    onPostNewLog(`Crawling Instagram servers resolving lead criteria: ${scrapeInput}`, 'system', 'info');

    setTimeout(() => {
      setIsScraping(false);
      // Create a couple of new lead items dynamically
      const newLeads: TargetScrapedUser[] = [
        {
          id: `lead-${Date.now()}-1`,
          username: `@health_maven_${Math.floor(Math.random() * 100)}`,
          fullName: 'Sienna Ross (Nutritionist)',
          followerCount: Math.floor(Math.random() * 8000) + 1200,
          followingCount: Math.floor(Math.random() * 400) + 12,
          postCount: 142,
          bio: 'Functional organic diet strategies. Helping you eat healthy and feel stunning! Austin, TX.',
          externalLink: 'https://dietmaven.io/free',
          engagementRate: 5.4,
          category: 'Nutrition',
          source: `${scrapeType === 'hashtag' ? '#' : '@'}${scrapeInput}`,
          status: 'scraped'
        },
        {
          id: `lead-${Date.now()}-2`,
          username: `@apex_trainer_${Math.floor(Math.random() * 100)}`,
          fullName: 'Marcus Finch (Trainer)',
          followerCount: Math.floor(Math.random() * 15000) + 4000,
          followingCount: Math.floor(Math.random() * 90) + 10,
          postCount: 412,
          bio: 'Strength coach & conditioning instructor. Austin, TX 🧘‍♂️ Custom plans inside.',
          externalLink: 'https://fitlife-apex.io',
          engagementRate: 6.8,
          category: 'Fitness Coach',
          source: `${scrapeType === 'hashtag' ? '#' : '@'}${scrapeInput}`,
          status: 'scraped'
        }
      ];

      const updated = [...newLeads, ...scrapedUsers];
      setScrapedUsers(updated);
      localStorage.setItem('nexus_scraped', JSON.stringify(updated));

      onPostNewLog(`Extracted 2 active high-engagement leads from query: ${scrapeInput}`, 'system', 'success');
      toast.success('Lead extraction complete. Check updated results table.');
    }, 2000);
  };

  const handleApplyRowAction = (id: string, action: 'whitelist' | 'blacklist' | 'queue_dm') => {
    const updated = scrapedUsers.map(usr => {
      if (usr.id === id) {
        if (action === 'whitelist') {
          setWhitelist([...whitelist, usr.username]);
          toast.success(`${usr.username} added to whitelists`);
          return { ...usr, status: 'whitelisted' as const };
        } else if (action === 'blacklist') {
          setBlacklist([...blacklist, usr.username]);
          toast.error(`${usr.username} moved to blacklists`);
          return { ...usr, status: 'blacklisted' as const };
        } else if (action === 'queue_dm') {
          toast.info(`Welcomer outreach DM scheduled for ${usr.username}`);
          return { ...usr, status: 'queued_dm' as const };
        }
      }
      return usr;
    });

    setScrapedUsers(updated);
    localStorage.setItem('nexus_scraped', JSON.stringify(updated));

    // Update whitelist/blacklist storage
    const wb = { whitelist, blacklist };
    if (action === 'whitelist') wb.whitelist = [...whitelist, scrapedUsers.find(u => u.id === id)?.username || ''];
    if (action === 'blacklist') wb.blacklist = [...blacklist, scrapedUsers.find(u => u.id === id)?.username || ''];
    localStorage.setItem('nexus_whitelist_blacklist', JSON.stringify(wb));
  };

  const handleAppendTerm = (type: 'white' | 'black') => {
    if (type === 'white' && appWh) {
      const updated = [...whitelist, appWh];
      setWhitelist(updated);
      setAppWh('');
      localStorage.setItem('nexus_whitelist_blacklist', JSON.stringify({ whitelist: updated, blacklist }));
      toast.success(`Appended whitelist seed term: ${appWh}`);
    } else if (type === 'black' && appBl) {
      const updated = [...blacklist, appBl];
      setBlacklist(updated);
      setAppBl('');
      localStorage.setItem('nexus_whitelist_blacklist', JSON.stringify({ whitelist, blacklist: updated }));
      toast.info(`Appended blacklist exclusion term: ${appBl}`);
    }
  };

  const handleRemoveTermFromList = (term: string, type: 'white' | 'black') => {
    if (type === 'white') {
      const updated = whitelist.filter(t => t !== term);
      setWhitelist(updated);
      localStorage.setItem('nexus_whitelist_blacklist', JSON.stringify({ whitelist: updated, blacklist }));
    } else {
      const updated = blacklist.filter(t => t !== term);
      setBlacklist(updated);
      localStorage.setItem('nexus_whitelist_blacklist', JSON.stringify({ whitelist, blacklist: updated }));
    }
    toast.info('Term removed from checklist');
  };

  return (
    <div className="space-y-6" id="targeting-view-container">
      {/* View Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center space-x-2">
            <Target className="h-5 w-5 text-indigo-400" />
            <span>Outbound Targeting & Scraper Engine</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Extract high-potential audiences from targeted locations, reference accounts or competitor followers, and update CRM channels.
          </p>
        </div>
      </div>

      {/* Target Scraper Setup panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Scrape Controls (Left) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-800 pb-1.5">Extraction Parameters</h3>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Extract Source Coordinates</label>
              <div className="grid grid-cols-3 gap-1">
                {(['hashtag', 'competitor', 'location'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setScrapeType(t);
                      setScrapeInput(t === 'hashtag' ? '#fitnessmotivation' : t === 'competitor' ? '@saas_marketer' : 'Austin, TX');
                    }}
                    className={`text-[10px] p-1.5 rounded border text-center uppercase font-mono font-bold ${
                      scrapeType === t 
                        ? 'bg-indigo-600 border-indigo-500/20 text-white' 
                        : 'bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-900'
                    }`}
                    type="button"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase font-mono block mb-1">Target Keyword Query</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  value={scrapeInput}
                  onChange={(e) => setScrapeInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded bg-slate-950 text-xs border border-slate-800 text-slate-200 outline-none"
                />
              </div>
            </div>

            <button
              onClick={triggerLeadScrape}
              disabled={isScraping}
              className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-all font-semibold text-xs text-white flex items-center justify-center space-x-1 shadow disabled:opacity-50 cursor-pointer"
              type="button"
            >
              {isScraping ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin mr-1" />
                  <span>Harvesting Leads...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Initiate Lead Harvest</span>
                </>
              )}
            </button>
          </div>

          {/* CRM lists management (Whitelist/Blacklists) */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-800 pb-1.5">Target Whitelist & Blacklist</h3>
            
            {/* Whitelist */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-emerald-400 uppercase font-mono">Channel Whitelist</label>
              <div className="flex flex-wrap gap-1" id="whitelist-tags-container">
                {whitelist.map((t, i) => (
                  <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center">
                    <span>{t}</span>
                    <button onClick={() => handleRemoveTermFromList(t, 'white')} className="ml-1 text-[8px] hover:text-rose-400">×</button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-1.5">
                <input
                  type="text"
                  value={appWh}
                  onChange={(e) => setAppWh(e.target.value)}
                  placeholder="e.g. @vip_partner"
                  className="flex-1 rounded border border-slate-850 bg-slate-950 text-[10px] p-1 text-slate-200 outline-none"
                />
                <button onClick={() => handleAppendTerm('white')} className="p-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-200 hover:bg-slate-700">+</button>
              </div>
            </div>

            {/* Blacklist */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-rose-400 uppercase font-mono">Channel Blacklist</label>
              <div className="flex flex-wrap gap-1" id="blacklist-tags-container">
                {blacklist.map((t, i) => (
                  <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center">
                    <span>{t}</span>
                    <button onClick={() => handleRemoveTermFromList(t, 'black')} className="ml-1 text-[8px] hover:text-emerald-400">×</button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-1.5">
                <input
                  type="text"
                  value={appBl}
                  onChange={(e) => setAppBl(e.target.value)}
                  placeholder="e.g. #spam"
                  className="flex-1 rounded border border-slate-850 bg-slate-950 text-[10px] p-1 text-slate-200 outline-none"
                />
                <button onClick={() => handleAppendTerm('black')} className="p-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-200 hover:bg-slate-700">+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Table Results (Right) */}
        <div className="lg:col-span-2">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left flex flex-col h-full min-h-[480px]">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-800 pb-1.5 mb-3 flex-shrink-0">
              Harvested Targets Feed
            </h3>

            {/* Leads list table */}
            <div className="flex-1 overflow-x-auto min-h-0" id="leads-harvested-table-scroller">
              <table className="w-full text-xs font-sans text-slate-350">
                <thead>
                  <tr className="border-b border-slate-850 font-mono text-[10px] text-slate-400 text-left uppercase">
                    <th className="pb-2">Profile</th>
                    <th className="pb-2 hidden sm:table-cell">Followers</th>
                    <th className="pb-2 text-center">Source</th>
                    <th className="pb-2 text-right">Outreach Options</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900" id="leads-table-rows">
                  {scrapedUsers.map((usr) => {
                    return (
                      <tr key={usr.id} className="group hover:bg-slate-900/30">
                        <td className="py-2.5">
                          <div className="font-semibold text-slate-200">{usr.username}</div>
                          <div className="text-[10px] text-slate-500 leading-snug line-clamp-1 max-w-[180px]" title={usr.bio}>
                            {usr.bio}
                          </div>
                        </td>
                        <td className="py-2.5 hidden sm:table-cell font-mono text-[11px] text-slate-400">
                          {usr.followerCount.toLocaleString()}
                        </td>
                        <td className="py-2.5 text-center font-mono text-[10px] text-slate-500 italic">
                          {usr.source}
                        </td>
                        <td className="py-2.5 text-right space-y-1 sm:space-y-0 sm:space-x-1 flex flex-col sm:flex-row items-end sm:items-center justify-end">
                          {usr.status === 'scraped' ? (
                            <>
                              <button
                                onClick={() => handleApplyRowAction(usr.id, 'whitelist')}
                                className="text-[9px] px-2 py-0.5 rounded border border-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 font-medium"
                                type="button"
                              >
                                Whitelist
                              </button>
                              <button
                                onClick={() => handleApplyRowAction(usr.id, 'blacklist')}
                                className="text-[9px] px-2 py-0.5 rounded border border-rose-500/10 text-rose-400 hover:bg-rose-500/10 font-medium"
                                type="button"
                              >
                                Block
                              </button>
                            </>
                          ) : (
                            <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-950 border border-slate-850 text-slate-500 font-semibold">
                              {usr.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
