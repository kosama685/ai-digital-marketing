/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Kanban, PlusCircle, CheckCircle, Clock, Info, BarChart2, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface SaaSAdCampaign {
  id: string;
  name: string;
  budget: number;
  spent: number;
  leadsScraped: number;
  status: 'running' | 'paused' | 'completed';
  platform: 'instagram' | 'linkedin' | 'facebook' | 'all';
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<SaaSAdCampaign[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [budget, setBudget] = useState(1500);
  const [plat, setPlat] = useState<'instagram' | 'linkedin' | 'facebook' | 'all'>('instagram');

  useEffect(() => {
    const stored = localStorage.getItem('nexus_campaign_tracker');
    if (stored) {
      setCampaigns(JSON.parse(stored));
    } else {
      const initial: SaaSAdCampaign[] = [
        { id: '1', name: 'Summer Solstice Lead Generation', budget: 3500, spent: 1420, leadsScraped: 412, status: 'running', platform: 'all' },
        { id: '2', name: 'LinkedIn Executive Branding', budget: 1200, spent: 650, leadsScraped: 92, status: 'running', platform: 'linkedin' },
        { id: '3', name: 'Micro-Targeted Reel Placement', budget: 2000, spent: 2000, leadsScraped: 580, status: 'completed', platform: 'instagram' }
      ];
      setCampaigns(initial);
      localStorage.setItem('nexus_campaign_tracker', JSON.stringify(initial));
    }
  }, []);

  const handleCreateCampaign = () => {
    if (!name) {
      toast.error('Campaign label coordinate is required!');
      return;
    }

    const newCamp: SaaSAdCampaign = {
      id: `camp-${Date.now()}`,
      name,
      budget,
      spent: 0,
      leadsScraped: 0,
      status: 'running',
      platform: plat
    };

    const updated = [...campaigns, newCamp];
    setCampaigns(updated);
    localStorage.setItem('nexus_campaign_tracker', JSON.stringify(updated));

    setShowModal(false);
    setName('');
    toast.success('Omni outreach campaign successfully compiled!');
  };

  const handleToggleState = (id: string, current: 'running' | 'paused' | 'completed') => {
    const nextStatus = current === 'running' ? 'paused' as const : 'running' as const;
    const updated = campaigns.map(c => c.id === id ? { ...c, status: nextStatus } : c);
    setCampaigns(updated);
    localStorage.setItem('nexus_campaign_tracker', JSON.stringify(updated));
    toast.info(`Campaign target is now: ${nextStatus.toUpperCase()}`);
  };

  return (
    <div className="space-y-6" id="campaigns-view-container">
      {/* View Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center space-x-2">
            <Kanban className="h-5 w-5 text-indigo-400" />
            <span>Ad Campaigns & Lead Budgets Tracker</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure target media budgets, audit client billing scopes, calculate aggregate acquisition CPM coefficients, and pause runs.
          </p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-1 py-1.5 px-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-slate-100 shadow shadow-indigo-900/10 cursor-pointer"
          type="button"
          id="add-campaign-trigger-btn"
        >
          <PlusCircle className="h-4 w-4 mr-0.5" />
          <span>Add Target Campaign</span>
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="campaigns-listings-grid">
        {campaigns.map((camp) => {
          const isCompleted = camp.status === 'completed';
          const isRunning = camp.status === 'running';

          return (
            <div key={camp.id} className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4 relative flex flex-col justify-between">
              <span className={`absolute top-4 right-4 text-[9px] font-mono uppercase px-1.5 rounded font-extrabold ${
                isRunning 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 animate-pulse-slow' 
                  : isCompleted 
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/25' 
                  : 'bg-slate-950 border border-slate-850 text-slate-500'
              }`}>
                {camp.status}
              </span>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-indigo-405 font-bold">{camp.platform} Placement</span>
                <h4 className="text-sm font-semibold text-slate-200 line-clamp-1 pr-14" title={camp.name}>{camp.name}</h4>
              </div>

              {/* Progress metrics */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Spend Profile</span>
                  <span className="font-mono text-slate-200">${camp.spent} / ${camp.budget}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-855 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${Math.min((camp.spent / camp.budget) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* CRM output totals */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-3 text-xs leading-none">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">Acquired Leads</span>
                  <strong className="text-slate-100 font-mono">{camp.leadsScraped}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">Cost Per Lead</span>
                  <strong className="text-slate-100 font-mono">
                    ${camp.spent > 0 ? (camp.spent / camp.leadsScraped).toFixed(2) : '0.00'}
                  </strong>
                </div>
              </div>

              <div className="pt-3.5 border-t border-slate-900 flex justify-end">
                {!isCompleted && (
                  <button
                    onClick={() => handleToggleState(camp.id, camp.status)}
                    className="text-[10px] px-3 py-1 rounded bg-slate-950 border border-slate-850 text-slate-300 hover:bg-slate-900"
                    type="button"
                  >
                    {isRunning ? 'Pause Loop' : 'Resume Loop'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD CAMPAIGN MODAL DIALOG */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" id="campaign-wizard-modal">
          <div className="w-full max-w-sm glass-panel p-6 rounded-xl border border-slate-850 shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">Create target campaign</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-450 hover:text-slate-200 font-bold" type="button">×</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Campaign Label</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Q4 Growth Acquisition Pitch"
                  className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Allocation Budget ($)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs font-mono text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Target Platform Placement</label>
                <select
                  value={plat}
                  onChange={(e) => setPlat(e.target.value as any)}
                  className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-300 outline-none"
                >
                  <option value="instagram">Instagram Ads Network</option>
                  <option value="linkedin">LinkedIn Corp Placements</option>
                  <option value="facebook">Facebook Feed Carousel</option>
                  <option value="all">Cross-Platform (Unified)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="px-3.5 py-1.5 rounded bg-slate-900 border border-slate-850 text-slate-450 text-xs" type="button">Cancel</button>
              <button onClick={handleCreateCampaign} className="px-5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 font-bold text-white text-xs" type="button">Add Campaign</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
