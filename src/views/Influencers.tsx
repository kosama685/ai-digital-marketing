/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  DollarSign, 
  FileText, 
  Send,
  Heart,
  TrendingUp,
  Tag
} from 'lucide-react';
import { toast } from 'sonner';

interface InfluencerItem {
  id: string;
  handle: string;
  name: string;
  niche: string;
  platform: 'instagram' | 'tiktok' | 'youtube';
  followers: number;
  engagementRate: number;
  authenticityScore: number; // 0-100%
  estPostCost: number;
  avatarUrl: string;
  status: 'discovered' | 'shortlisted' | 'contacted' | 'contracted';
}

const INITIAL_INFLUENCERS: InfluencerItem[] = [
  { id: 'inf-1', handle: '@fit_nutrition_julia', name: 'Melody Julia', niche: 'Fitness & Health', platform: 'instagram', followers: 45000, engagementRate: 5.4, authenticityScore: 94, estPostCost: 450, avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', status: 'shortlisted' },
  { id: 'inf-2', handle: '@diet_coach_sam', name: 'Sam Thorne', niche: 'Keto Coach', platform: 'tiktok', followers: 125000, engagementRate: 8.2, authenticityScore: 89, estPostCost: 850, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', status: 'discovered' },
  { id: 'inf-3', handle: '@zen_growth_yoga', name: 'Lia Zhang', niche: 'Yoga & Mindfulness', platform: 'instagram', followers: 8200, engagementRate: 11.2, authenticityScore: 98, estPostCost: 150, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', status: 'contracted' },
  { id: 'inf-4', handle: '@tech_guy_max', name: 'Max Tech review', niche: 'Gadgets & SaaS', platform: 'youtube', followers: 320000, engagementRate: 3.1, authenticityScore: 85, estPostCost: 2200, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', status: 'contacted' }
];

export default function Influencers() {
  const [influencers, setInfluencers] = useState<InfluencerItem[]>(INITIAL_INFLUENCERS);
  const [search, setSearch] = useState('');
  const [nicheFilter, setNicheFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'discover' | 'campaigns'>('discover');

  // Brief Generator states
  const [showBriefModal, setShowBriefModal] = useState(false);
  const [selectedInf, setSelectedInf] = useState<InfluencerItem | null>(null);
  const [briefObjective, setBriefObjective] = useState('Brand Awareness & High CTR');
  const [hashtags, setHashtags] = useState('#fitlife, #autonomousSaaS, #nexusforge');
  const [paymentTerms, setPaymentTerms] = useState('$500 flat fee upon draft review approval');

  const filtered = influencers.filter(inf => {
    const matchesSearch = inf.handle.toLowerCase().includes(search.toLowerCase()) || 
                          inf.name.toLowerCase().includes(search.toLowerCase());
    const matchesNiche = nicheFilter === 'all' || inf.niche === nicheFilter;
    return matchesSearch && matchesNiche;
  });

  const handleUpdateStatus = (id: string, status: 'discovered' | 'shortlisted' | 'contacted' | 'contracted') => {
    const updated = influencers.map(inf => {
      if (inf.id === id) {
        toast.info(`Updated status for ${inf.handle} to ${status.toUpperCase()}`);
        return { ...inf, status };
      }
      return inf;
    });
    setInfluencers(updated);
  };

  const handleCreateBrief = (inf: InfluencerItem) => {
    setSelectedInf(inf);
    setShowBriefModal(true);
  };

  const handleDispatchBrief = () => {
    if (!selectedInf) return;
    toast.success(`Collaboration Brief successfully dispatched to ${selectedInf.handle}!`);
    setShowBriefModal(false);
  };

  return (
    <div className="space-y-6 text-left" id="influencers-view-layout">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-101 flex items-center space-x-2">
            <Users className="h-5 w-5 text-indigo-400" />
            <span>Influencer Network Discovery & Campaign Briefing</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Conduct multi-platform influencer audits, verify authenticity scores (fake follower checks), and dispatch automated partnerships.
          </p>
        </div>

        <div className="flex space-x-1 p-0.5 rounded-lg bg-slate-950 border border-slate-850">
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'discover' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-205'
            }`}
          >
            Niche Discovery
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'campaigns' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-205'
            }`}
          >
            Campaign Board ({influencers.filter(i => i.status !== 'discovered').length})
          </button>
        </div>
      </div>

      {activeTab === 'discover' && (
        <>
          {/* Discovery filters */}
          <div className="flex flex-col sm:flex-row gap-3 bg-slate-900/40 p-4 rounded-xl border border-slate-850 justify-between items-center">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search handles or names..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-slate-300 outline-none w-60"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400">Niche:</span>
              <select
                value={nicheFilter}
                onChange={(e) => setNicheFilter(e.target.value)}
                className="rounded bg-slate-950 border border-slate-800 px-2 py-1.5 text-xs text-slate-300 outline-none"
              >
                <option value="all">All Niches</option>
                <option value="Fitness & Health">Fitness & Health</option>
                <option value="Keto Coach">Keto Coach</option>
                <option value="Yoga & Mindfulness">Yoga & Mindfulness</option>
                <option value="Gadgets & SaaS">Gadgets & SaaS</option>
              </select>
            </div>
          </div>

          {/* Grid display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" id="influencer-cards-grid">
            {filtered.map(inf => (
              <div key={inf.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900/20 hover:border-slate-700/60 transition-all flex flex-col justify-between space-y-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={inf.avatarUrl}
                    alt={inf.name}
                    className="h-11 w-11 rounded-full object-cover border border-slate-800 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-201 truncate leading-tight">{inf.name}</h4>
                    <span className="text-[10px] font-mono text-indigo-400 block mt-0.5">{inf.handle}</span>
                    <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block mt-1">{inf.niche}</span>
                  </div>
                </div>

                {/* Audit specifications */}
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-850 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-[10px] uppercase font-mono">Followers</span>
                    <span className="font-bold text-slate-205 font-mono">{inf.followers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-[10px] uppercase font-mono">ER Engagement</span>
                    <span className="font-bold text-slate-205 font-mono text-indigo-400">{inf.engagementRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-[10px] uppercase font-mono">Audited Authenticity</span>
                    <span className="font-bold font-mono text-emerald-400 flex items-center">
                      <ShieldCheck className="h-3 w-3 mr-0.5" />
                      {inf.authenticityScore}% Authentic
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-[10px] uppercase font-mono">Est Post MSRP</span>
                    <span className="font-semibold font-mono text-slate-350">${inf.estPostCost}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(inf.id, 'shortlisted')}
                    className="flex-1 text-[10px] py-1.5 rounded bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all font-semibold font-mono"
                    type="button"
                  >
                    Shortlist
                  </button>
                  <button
                    onClick={() => handleCreateBrief(inf)}
                    className="flex-1 text-[10px] py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-slate-100 transition-all font-semibold font-mono shadow shadow-indigo-600/20"
                    type="button"
                  >
                    Brief Collab
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'campaigns' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="influencer-campaign-phases">
          {/* Columns matching lifecycle pipeline */}
          {(['discovered', 'shortlisted', 'contacted', 'contracted'] as const).map(stage => {
            const list = influencers.filter(i => i.status === stage);
            return (
              <div key={stage} className="p-3 rounded-xl border border-slate-850 bg-slate-900/10 flex flex-col min-h-[400px]">
                <div className="flex justify-between items-center border-b border-slate-850 pb-2 mb-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono capitalize">{stage}</span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-950 text-[10px] font-mono text-slate-500 font-bold">{list.length}</span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {list.map(i => (
                    <div key={i.id} className="p-3.5 rounded-lg bg-slate-950 border border-slate-850 text-xs text-left space-y-2 relative">
                      <div className="flex items-center space-x-2">
                        <img src={i.avatarUrl} alt={i.name} className="h-6 w-6 rounded-full object-cover" />
                        <span className="font-semibold text-slate-101 truncate">{i.name}</span>
                      </div>
                      <div className="text-[9px] font-mono text-indigo-400 leading-none">{i.handle}</div>
                      <div className="text-[10px] text-slate-500 font-mono">Followers: {(i.followers / 1000).toFixed(1)}k</div>
                      
                      <div className="flex justify-between pt-1">
                        <select
                          value={i.status}
                          onChange={(e) => handleUpdateStatus(i.id, e.target.value as any)}
                          className="bg-slate-900 text-slate-400 text-[10px] border border-slate-800 rounded p-1 outline-none font-mono"
                        >
                          <option value="discovered">Discovered</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="contacted">Contacted</option>
                          <option value="contracted">Contracted</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Campaign Brief Generator Modal */}
      {showBriefModal && selectedInf && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative">
            <h3 className="text-sm font-bold text-slate-101 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center space-x-1.5">
              <FileText className="h-4.5 w-4.5 text-indigo-400 animate-pulse" />
              <span>Generate Brand Brief: {selectedInf.handle}</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Collaboration Objective</label>
                <input
                  type="text"
                  value={briefObjective}
                  onChange={(e) => setBriefObjective(e.target.value)}
                  className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-202 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Required Hashtags & Tags</label>
                <input
                  type="text"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs font-mono text-slate-202 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Payment & Compensation Terms</label>
                <textarea
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs font-sans text-slate-202 outline-none h-18 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-850 mt-4">
              <button
                type="button"
                onClick={() => setShowBriefModal(false)}
                className="px-4 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-404 hover:text-slate-200"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleDispatchBrief}
                className="px-5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-505 text-xs font-bold text-white shadow shadow-indigo-600/20 flex items-center space-x-1"
              >
                <Send className="h-3 w-3 mr-0.5" />
                <span>Dispatch Terms</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
