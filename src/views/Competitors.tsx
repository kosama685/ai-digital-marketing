/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Swords, Plus, RefreshCw, BarChart2, ShieldCheck, Check } from 'lucide-react';
import { toast } from 'sonner';

interface CompetitorProfile {
  id: string;
  handle: string;
  followers: number;
  avgEngagement: number;
  postFrequencyWeekly: number;
  gapDiscovered: string;
}

export default function Competitors() {
  const [competitors, setCompetitors] = useState<CompetitorProfile[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newHandle, setNewHandle] = useState('');
  const [newGap, setNewGap] = useState('They neglect long-tail technical SEO keywords.');

  useEffect(() => {
    const stored = localStorage.getItem('nexus_competitors');
    if (stored) {
      setCompetitors(JSON.parse(stored));
    } else {
      const initial: CompetitorProfile[] = [
        { id: '1', handle: '@fitlife_pro', followers: 125000, avgEngagement: 3.2, postFrequencyWeekly: 5, gapDiscovered: 'Over-indexing on generic reels, lacks technical wellness blogs.' },
        { id: '2', handle: '@organic_athlete', followers: 45000, avgEngagement: 5.6, postFrequencyWeekly: 3, gapDiscovered: 'Does not write SEO schema metadata on recipe landing pages.' }
      ];
      setCompetitors(initial);
      localStorage.setItem('nexus_competitors', JSON.stringify(initial));
    }
  }, []);

  const handleRegisterCompetitor = () => {
    if (!newHandle) {
      toast.error('Competitor profile reference handle is required!');
      return;
    }

    const cleanHandle = newHandle.startsWith('@') ? newHandle : `@${newHandle}`;
    const newComp: CompetitorProfile = {
      id: `comp-${Date.now()}`,
      handle: cleanHandle,
      followers: Math.floor(Math.random() * 80000) + 10000,
      avgEngagement: parseFloat((Math.random() * 4 + 2).toFixed(1)),
      postFrequencyWeekly: Math.floor(Math.random() * 6) + 2,
      gapDiscovered: newGap
    };

    const updated = [...competitors, newComp];
    setCompetitors(updated);
    localStorage.setItem('nexus_competitors', JSON.stringify(updated));

    setNewHandle('');
    setIsAdding(false);
    toast.success('Successfully registered competitor intel handle!');
  };

  const handleTriggerIntelAudit = () => {
    toast.info('Initiating comparative back-scan crawl on targeted profiles...');
    setTimeout(() => {
      toast.success('Benchmark analysis generated successfully!');
    }, 1200);
  };

  return (
    <div className="space-y-6" id="competitors-view-container">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center space-x-2">
            <Swords className="h-5 w-5 text-indigo-400" />
            <span>Outbound Competitor Marketing Intelligence</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track reference profiles, compare average post velocity rhythms, evaluate brand conversion niches, and locate organic SEO content opportunities.
          </p>
        </div>
        
        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleTriggerIntelAudit}
            className="flex items-center space-x-1 py-1.5 px-3 bg-slate-900 border border-slate-800 text-slate-305 text-xs font-semibold rounded-lg hover:border-indigo-500/30 transition-all font-mono"
            type="button"
          >
            <RefreshCw className="h-3.5 w-3.5 animate-pulse text-indigo-400" />
            <span>Benchmark Index Audit</span>
          </button>
          
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center space-x-1 py-1.5 px-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-slate-100 shadow transition-all"
            type="button"
          >
            <Plus className="h-4 w-4" />
            <span>{isAdding ? 'Close Builder' : 'Register Handle'}</span>
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="p-5 rounded-xl border border-indigo-500/30 bg-slate-900/30 text-left space-y-4 max-w-xl" id="competitor-form-panel">
          <div className="border-b border-slate-800 pb-1.5 flex justify-between">
            <h4 className="text-xs font-bold text-slate-205 font-mono uppercase tracking-widest">Register Competitor Profile</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Social Handle</label>
              <input
                type="text"
                value={newHandle}
                onChange={(e) => setNewHandle(e.target.value)}
                placeholder="@saasgrowth_com"
                className="w-full rounded bg-slate-905 border border-slate-850 p-2 text-xs text-slate-202 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Identified Content Gap</label>
              <input
                type="text"
                value={newGap}
                onChange={(e) => setNewGap(e.target.value)}
                className="w-full rounded bg-slate-905 border border-slate-850 p-2 text-xs text-slate-202 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={handleRegisterCompetitor}
              className="px-5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 font-bold text-[11px] text-white"
              type="button"
            >
              Verify & Add Competitor
            </button>
          </div>
        </div>
      )}

      {/* Competitor list Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="competitor-list-grid">
        {competitors.map(comp => (
          <div key={comp.id} className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-3 relative group">
            <button
              onClick={() => {
                setCompetitors(competitors.filter(c => c.id !== comp.id));
                localStorage.setItem('nexus_competitors', JSON.stringify(competitors.filter(c => c.id !== comp.id)));
                toast.info('Competitor handle removed');
              }}
              className="absolute right-4 top-4 text-slate-600 hover:text-rose-405 group-hover:block sm:hidden flex"
              type="button"
            >
              ×
            </button>
            
            <div className="flex items-center space-x-2">
              <h4 className="text-xs font-bold text-slate-100 font-mono">{comp.handle}</h4>
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-b border-slate-900 py-3 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block mb-1">Followers</span>
                <strong className="text-slate-300">{(comp.followers / 1000).toFixed(0)}k</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block mb-1">Engagement</span>
                <strong className="text-slate-300">{comp.avgEngagement}%</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block mb-1">Post Speed</span>
                <strong className="text-slate-300">{comp.postFrequencyWeekly} / wk</strong>
              </div>
            </div>

            <div className="space-y-1.5 pt-1 text-xs">
              <span className="text-[10px] font-bold text-indigo-400 uppercase font-mono block">Identified Content Gap:</span>
              <p className="text-slate-350 leading-relaxed italic">
                "{comp.gapDiscovered}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
