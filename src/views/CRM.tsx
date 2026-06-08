/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Contact, 
  Kanban, 
  TrendingUp, 
  PlusCircle, 
  Filter, 
  Flame, 
  Mail, 
  Phone, 
  DollarSign, 
  Award, 
  RefreshCw, 
  Trash2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface ContactItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  leadScore: number;
  source: 'Instagram' | 'LinkedIn' | 'Facebook' | 'Email' | 'Organic Search';
  stage: 'lead' | 'qualified' | 'proposal' | 'won' | 'lost';
  dealValue: number;
  assignedRep: string;
}

const INITIAL_CRM_CONTACTS: ContactItem[] = [
  { id: 'cnt-1', name: 'David Vance', email: 'vance@fitnessworld.com', phone: '+1 (555) 438-9210', company: 'FitLife Premium', category: 'Health & Nutrition', leadScore: 92, source: 'Instagram', stage: 'qualified', dealValue: 2500, assignedRep: 'Damian Vance' },
  { id: 'cnt-2', name: 'Sarah Smith', email: 'sarah@urbanchic.co', phone: '+1 (555) 912-3850', company: 'Urban Chic Apparel', category: 'E-commerce', leadScore: 78, source: 'LinkedIn', stage: 'proposal', dealValue: 4800, assignedRep: 'Sarah Smith' },
  { id: 'cnt-3', name: 'Marcus Aurelius', email: 'stoic@apex-tech-hq.io', phone: '+1 (555) 340-9111', company: 'Apex Tech Inc', category: 'Core Infrastructure', leadScore: 40, source: 'Email', stage: 'lead', dealValue: 7500, assignedRep: 'Unassigned' },
  { id: 'cnt-4', name: 'Emma Watson', email: 'emma@spellbound.com', phone: '+1 (555) 890-4321', company: 'Spellbind Marketing', category: 'Creative Production', leadScore: 98, source: 'Instagram', stage: 'won', dealValue: 12500, assignedRep: 'Damian Vance' },
  { id: 'cnt-5', name: 'Thomas Anderson', email: 'neo@matrix-labs.net', phone: '+1 (555) 101-0101', company: 'Matrix Consulting', category: 'Security & Automation', leadScore: 18, source: 'Organic Search', stage: 'lost', dealValue: 3500, assignedRep: 'Sarah Smith' }
];

export default function CRM() {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'contacts'>('pipeline');
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [newName, setNewName] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newNiche, setNewNiche] = useState('Athletes');
  const [newValue, setNewValue] = useState(1500);
  const [newSource, setNewSource] = useState<'Instagram' | 'LinkedIn' | 'Facebook' | 'Email' | 'Organic Search'>('Instagram');

  useEffect(() => {
    const stored = localStorage.getItem('nexusforge_crm_contacts');
    if (stored) {
      setContacts(JSON.parse(stored));
    } else {
      setContacts(INITIAL_CRM_CONTACTS);
      localStorage.setItem('nexusforge_crm_contacts', JSON.stringify(INITIAL_CRM_CONTACTS));
    }
  }, []);

  const saveContacts = (updated: ContactItem[]) => {
    setContacts(updated);
    localStorage.setItem('nexusforge_crm_contacts', JSON.stringify(updated));
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) {
      toast.error('Lead name and email are mandatory!');
      return;
    }

    const newContact: ContactItem = {
      id: `cnt-${Date.now()}`,
      name: newName,
      company: newCompany || 'Freelancer / Individual',
      email: newEmail,
      phone: newPhone || '+1 (555) 000-0000',
      category: newNiche,
      leadScore: Math.floor(Math.random() * 40) + 15, // seeded score
      source: newSource,
      stage: 'lead',
      dealValue: newValue,
      assignedRep: 'Unassigned'
    };

    const updated = [newContact, ...contacts];
    saveContacts(updated);
    toast.success('Prisitine CRM Lead record cataloged successfully!');

    // Reset Form
    setNewName('');
    setNewCompany('');
    setNewEmail('');
    setNewPhone('');
    setNewValue(1500);
    setShowAddModal(false);
  };

  const updateLeadStage = (id: string, stage: 'lead' | 'qualified' | 'proposal' | 'won' | 'lost') => {
    const updated = contacts.map(c => {
      if (c.id === id) {
        let finalScore = c.leadScore;
        if (stage === 'won') finalScore = 100;
        else if (stage === 'lost') finalScore = 5;
        else if (stage === 'qualified') finalScore = Math.max(c.leadScore, 75);
        else if (stage === 'proposal') finalScore = Math.max(c.leadScore, 85);
        
        toast.success(`Advanced ${c.name} in sales cycle to ${stage.toUpperCase()}`);
        return { ...c, stage, leadScore: finalScore, assignedRep: c.assignedRep === 'Unassigned' ? 'Damian Vance' : c.assignedRep };
      }
      return c;
    });
    saveContacts(updated);
  };

  const deleteLead = (id: string) => {
    const updated = contacts.filter(c => c.id !== id);
    saveContacts(updated);
    toast.error('Lead record purged permanently from workspace.');
  };

  // Funnel calculations
  const totalPipeline = contacts.reduce((sum, c) => sum + c.dealValue, 0);
  const weightedPipeline = contacts.reduce((sum, c) => {
    const prob: Record<string, number> = { lead: 0.1, qualified: 0.35, proposal: 0.7, won: 1.0, lost: 0 };
    return sum + (c.dealValue * (prob[c.stage] || 0));
  }, 0);

  const averageDealSize = contacts.length > 0 ? Math.floor(totalPipeline / contacts.length) : 0;
  const wonDealsCount = contacts.filter(c => c.stage === 'won').length;
  const closedCount = contacts.filter(c => c.stage === 'won' || c.stage === 'lost').length;
  const winRate = closedCount > 0 ? Math.floor((wonDealsCount / closedCount) * 100) : 0;

  // Search and filters
  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === 'all' || c.source.toLowerCase() === sourceFilter.toLowerCase();
    return matchesSearch && matchesSource;
  });

  return (
    <div className="space-y-6 text-left" id="crm-view-layout">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-100 flex items-center space-x-2">
            <Contact className="h-5 w-5 text-indigo-400" />
            <span>Interactive CRM & Sales Pipeline</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate customer deal sizes, automate scoring markers based on social triggers, and monitor conversion metrics.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow shadow-indigo-500/20 cursor-pointer"
            type="button"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Lead / Contact</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="crm-metrics-panel">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Gross Pipeline Value</p>
              <h3 className="text-xl font-bold font-mono text-slate-100 mt-1">${totalPipeline.toLocaleString()}</h3>
            </div>
            <div className="p-2 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 font-mono">Based on active workspace deal ratios</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Weighted Forecast</p>
              <h3 className="text-xl font-bold font-mono text-emerald-400 mt-1">${weightedPipeline.toLocaleString()}</h3>
            </div>
            <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 font-mono">Probability adjusted calibration</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Average Deal sizing</p>
              <h3 className="text-xl font-bold font-mono text-slate-100 mt-1">${averageDealSize.toLocaleString()}</h3>
            </div>
            <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <RefreshCw className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 font-mono">Blended mean of all open SKUs</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Pipeline Conversion Win-rate</p>
              <h3 className="text-xl font-bold font-mono text-indigo-400 mt-1">{winRate}%</h3>
            </div>
            <div className="p-2 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 font-mono">Closed won vs closed lost ratio</div>
        </div>
      </div>

      {/* Tabs / Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-850">
        <div className="flex space-x-1 p-0.5 rounded-lg bg-slate-950 border border-slate-850 self-start">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'pipeline' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-205'
            }`}
          >
            <Kanban className="h-3.5 w-3.5" />
            <span>Interactive Sales Pipeline</span>
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'contacts' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-205'
            }`}
          >
            <Contact className="h-3.5 w-3.5" />
            <span>Contacts & Leads Directory</span>
          </button>
        </div>

        {/* Global Directory filter tools (used by both sections but primarily contacts) */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Search CRM..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-xs text-slate-300 outline-none w-44"
          />
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="rounded bg-slate-950 border border-slate-800 px-2 py-1.5 text-xs text-slate-300 outline-none"
          >
            <option value="all">All Sources</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="email">Email</option>
            <option value="organic search">Organic</option>
          </select>
        </div>
      </div>

      {/* VIEW SECTION 1: Interactive Sales cycle Kanban Board */}
      {activeTab === 'pipeline' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4" id="crm-kanban-board">
          
          {/* Column 1: Lead pool */}
          <div className="rounded-xl border border-slate-850 p-3 bg-slate-900/10 text-left flex flex-col min-h-[450px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">01. Leads</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-950 text-[10px] font-semibold text-slate-400 font-mono">
                {contacts.filter(c => c.stage === 'lead').length}
              </span>
            </div>
            
            <div className="space-y-3 flex-1 overflow-y-auto">
              {contacts.filter(c => c.stage === 'lead').map(c => (
                <div key={c.id} className="p-3.5 rounded-lg bg-slate-950 border border-slate-850 hover:border-slate-700 transition-all space-y-2 text-xs relative">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-slate-200">{c.name}</span>
                    <span className="text-[10px] font-mono font-bold text-amber-500 flex items-center">
                      <Flame className="h-3 w-3 mr-0.5" />
                      {c.leadScore}pt
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">{c.company}</div>
                  <div className="font-bold font-mono text-indigo-400">${c.dealValue}</div>
                  <div className="flex justify-end pt-1 gap-1">
                    <button
                      onClick={() => updateLeadStage(c.id, 'qualified')}
                      className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-bold text-indigo-400 font-mono cursor-pointer"
                    >
                      Qualify →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Qualified pool */}
          <div className="rounded-xl border border-slate-850 p-3 bg-slate-900/10 text-left flex flex-col min-h-[450px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">02. Qualified</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-950 text-[10px] font-semibold text-slate-400 font-mono">
                {contacts.filter(c => c.stage === 'qualified').length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {contacts.filter(c => c.stage === 'qualified').map(c => (
                <div key={c.id} className="p-3.5 rounded-lg bg-slate-950 border border-slate-850 hover:border-slate-700 transition-all space-y-2 text-xs relative">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-slate-200">{c.name}</span>
                    <span className="text-[10px] font-mono font-bold text-amber-500 flex items-center">
                      <Flame className="h-3 w-3 mr-0.5" />
                      {c.leadScore}pt
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">{c.company}</div>
                  <div className="font-bold font-mono text-indigo-400">${c.dealValue}</div>
                  <div className="flex justify-between pt-1 gap-1">
                    <button
                      onClick={() => updateLeadStage(c.id, 'lead')}
                      className="text-slate-500 text-[9px] font-mono hover:text-slate-300"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => updateLeadStage(c.id, 'proposal')}
                      className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-bold text-indigo-400 font-mono cursor-pointer"
                    >
                      Propose →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Proposal sent */}
          <div className="rounded-xl border border-slate-850 p-3 bg-slate-900/10 text-left flex flex-col min-h-[450px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">03. Proposal</span>
              <span className="px-1.5 py-0.2 rounded bg-slate-950 text-[10px] font-semibold text-slate-400 font-mono">
                {contacts.filter(c => c.stage === 'proposal').length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {contacts.filter(c => c.stage === 'proposal').map(c => (
                <div key={c.id} className="p-3.5 rounded-lg bg-slate-950 border border-slate-850 hover:border-slate-700 transition-all space-y-2 text-xs relative">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-slate-200">{c.name}</span>
                    <span className="text-[10px] font-mono font-bold text-amber-500 flex items-center">
                      <Flame className="h-3 w-3 mr-0.5" />
                      {c.leadScore}pt
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">{c.company}</div>
                  <div className="font-bold font-mono text-indigo-400">${c.dealValue}</div>
                  <div className="flex justify-between pt-1 gap-1">
                    <button
                      onClick={() => updateLeadStage(c.id, 'lost')}
                      className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-[9px] font-bold text-rose-450 hover:bg-rose-500/20 cursor-pointer"
                    >
                      Lost ✗
                    </button>
                    <button
                      onClick={() => updateLeadStage(c.id, 'won')}
                      className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 hover:bg-emerald-500/20 cursor-pointer"
                    >
                      Won ✓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Won Deald Index */}
          <div className="rounded-xl border border-slate-850 p-3 bg-emerald-950/10 text-left flex flex-col min-h-[450px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">04. Won ✓</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-[10px] font-bold text-emerald-400 font-mono border border-emerald-500/20">
                {contacts.filter(c => c.stage === 'won').length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {contacts.filter(c => c.stage === 'won').map(c => (
                <div key={c.id} className="p-3.5 rounded-lg bg-slate-950 border border-emerald-500/20 space-y-2 text-xs relative">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-205">{c.name}</span>
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">{c.company}</div>
                  <div className="font-extrabold font-mono text-emerald-400">${c.dealValue}</div>
                  <div className="text-[9px] text-slate-500 font-medium font-mono">Assigned Rep: {c.assignedRep}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 5: Lost Deald Index */}
          <div className="rounded-xl border border-slate-850 p-3 bg-rose-950/10 text-left flex flex-col min-h-[450px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest font-mono">05. Lost ✗</span>
              <span className="px-1.5 py-0.2 rounded bg-rose-950 text-[10px] font-semibold text-rose-450 font-mono">
                {contacts.filter(c => c.stage === 'lost').length}
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {contacts.filter(c => c.stage === 'lost').map(c => (
                <div key={c.id} className="p-3.5 rounded-lg bg-slate-950 border border-slate-900 opacity-60 space-y-2 text-xs relative">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-400">{c.name}</span>
                    <AlertCircle className="h-3.5 w-3.5 text-slate-500" />
                  </div>
                  <div className="text-[10px] text-slate-650 line-through">${c.dealValue}</div>
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => updateLeadStage(c.id, 'lead')}
                      className="text-slate-500 hover:text-slate-400 text-[9px] font-mono cursor-pointer"
                    >
                      Re-open
                    </button>
                    <button
                      onClick={() => deleteLead(c.id)}
                      className="text-rose-500 hover:text-rose-450 p-0.5 rounded cursor-pointer"
                      title="Purge permanently"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* VIEW SECTION 2: Compact tabular Contacts list */}
      {activeTab === 'contacts' && (
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left flex flex-col min-h-[400px]">
          <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-4">
            Audited Leads & Contact Persons Directory
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-sans text-slate-300">
              <thead>
                <tr className="border-b border-slate-850 font-mono text-[10px] text-slate-500 text-left uppercase">
                  <th className="pb-3 pl-2">Lead Name / Company</th>
                  <th className="pb-3">Contact Params</th>
                  <th className="pb-3">Niche Category</th>
                  <th className="pb-3 text-center">Trigger Source</th>
                  <th className="pb-3 text-center">Lead Strength</th>
                  <th className="pb-3 text-center">Calibration Stage</th>
                  <th className="pb-3 text-right">SKU Value</th>
                  <th className="pb-3 pr-2 text-right">Outbox Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {filteredContacts.map(c => (
                  <tr key={c.id} className="hover:bg-slate-900/40">
                    <td className="py-3.5 pl-2">
                      <div className="font-semibold text-slate-100">{c.name}</div>
                      <div className="text-[10px] text-slate-500">{c.company}</div>
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <Mail className="h-3 w-3" />
                        <span>{c.email}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] mt-0.5">
                        <Phone className="h-3 w-3" />
                        <span>{c.phone}</span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className="text-[10px] font-mono bg-slate-950 border border-slate-850 px-1.5 py-0.5 rounded text-slate-350">
                        {c.category}
                      </span>
                    </td>
                    <td className="py-3.5 text-center">
                      <span className="font-semibold text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded text-[10px] border border-indigo-500/10">
                        {c.source}
                      </span>
                    </td>
                    <td className="py-3.5 text-center">
                      <div className="flex items-center justify-center space-x-1 font-mono">
                        <Flame className="h-3.5 w-3.5 text-orange-500" />
                        <span className="font-bold text-slate-202">{c.leadScore}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-center">
                      <span className={`text-[10px] uppercase font-mono px-1.5 rounded font-bold ${
                        c.stage === 'won' ? 'bg-emerald-500/10 text-emerald-400' :
                        c.stage === 'lost' ? 'bg-rose-500/10 text-rose-400' :
                        'bg-slate-950 text-slate-400 border border-slate-850'
                      }`}>
                        {c.stage}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-mono font-semibold text-slate-100">
                      ${c.dealValue.toLocaleString()}
                    </td>
                    <td className="py-3.5 pr-2 text-right">
                      <button
                        onClick={() => deleteLead(c.id)}
                        className="text-slate-500 hover:text-rose-450 p-1 rounded transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Leads Onboarding Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 overflow-hidden">
            <h3 className="text-sm font-bold text-slate-101 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">
              Add New Lead Record
            </h3>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Marcus Aurelius"
                    className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-202 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Company Entity</label>
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="Stoic Labs Inc"
                    className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-202 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="marcus@apex.io"
                    className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-202 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+1 (555) 340-9111"
                    className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-202 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Estimated SKU Contract Value ($)</label>
                  <input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(Number(e.target.value))}
                    className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs font-mono text-slate-202 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Marketing Source</label>
                  <select
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value as any)}
                    className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-202 outline-none"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Email">Email</option>
                    <option value="Organic Search">Organic Search</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-850 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow shadow-indigo-600/20 cursor-pointer"
                >
                  Create & Onboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
