/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BookOpen, 
  PlusCircle, 
  TrendingUp, 
  DollarSign, 
  Server, 
  ExternalLink, 
  FileCheck2, 
  Trash2,
  Lock,
  Layers
} from 'lucide-react';
import { toast } from 'sonner';

interface AgencyClient {
  id: string;
  name: string;
  ownerCompany: string;
  industry: 'Fitness' | 'Tech' | 'Fashion' | 'Consulting';
   retainerFee: number;
  workspaceUrl: string;
  healthScore: number;
  status: 'active' | 'suspended' | 'paused';
}

const INITIAL_CLIENT_WORKSPACES: AgencyClient[] = [
  { id: 'cli-1', name: 'FitLife Premium', ownerCompany: 'Garrison Group LLC', industry: 'Fitness', retainerFee: 2500, workspaceUrl: 'https://fitlife-premium.com', healthScore: 94, status: 'active' },
  { id: 'cli-2', name: 'Urban Chic Apparel', ownerCompany: 'Amelie Fashion Co', industry: 'Fashion', retainerFee: 1800, workspaceUrl: 'https://urban-chic-apparel.co', healthScore: 88, status: 'active' },
  { id: 'cli-3', name: 'Apex Tech Blog', ownerCompany: 'Apex Tech Inc', industry: 'Tech', retainerFee: 4200, workspaceUrl: 'https://apex-tech-hq.io', healthScore: 72, status: 'paused' },
];

export default function Agency() {
  const [clients, setClients] = useState<AgencyClient[]>(INITIAL_CLIENT_WORKSPACES);
  const [showAdd, setShowAdd] = useState(false);

  // Form states
  const [newName, setNewName] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newIndustry, setNewIndustry] = useState<'Fitness' | 'Tech' | 'Fashion' | 'Consulting'>('Fitness');
  const [newRetainer, setNewRetainer] = useState(1500);

  // Invoice generator state
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<AgencyClient | null>(null);
  const [servicesBilled, setServicesBilled] = useState('Automated Outbound Loops + blogCMS SEO Pilot Custom Tuning Package');

  const handleRegisterClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newCompany) {
      toast.error('Client workspace brand and company name mandatory!');
      return;
    }

    const newCli: AgencyClient = {
      id: `cli-${Date.now()}`,
      name: newName,
      ownerCompany: newCompany,
      industry: newIndustry,
      retainerFee: newRetainer,
      workspaceUrl: `https://${newName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.nexus-white-labels.com`,
      healthScore: Math.floor(Math.random() * 15) + 80, // seeded score
      status: 'active'
    };

    setClients([newCli, ...clients]);
    setNewName('');
    setNewCompany('');
    setNewRetainer(1500);
    setShowAdd(false);
    toast.success('White-labeled multi-tenant Client Workspace created!');
  };

  const handleDeleteClient = (id: string, name: string) => {
    setClients(clients.filter(c => c.id !== id));
    toast.error(`Client ${name} purged from workspace directory.`);
  };

  const handleInvoiceClient = (cli: AgencyClient) => {
    setSelectedClient(cli);
    setShowInvoiceModal(true);
  };

  const handleSendInvoice = () => {
    if (!selectedClient) return;
    toast.success(`Branded Invoice successfully dispatched to ${selectedClient.ownerCompany}!`);
    setShowInvoiceModal(false);
  };

  // Financial summations
  const totalRetainerRevenue = clients.reduce((sum, c) => sum + (c.status === 'active' ? c.retainerFee : 0), 0);
  const averageClientHealth = clients.length > 0 ? Math.floor(clients.reduce((sum, c) => sum + c.healthScore, 0) / clients.length) : 0;

  return (
    <div className="space-y-6 text-left" id="agency-view-layout">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-101 flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            <span>Multi-Tenant Workspaces & Client Portals</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure white-labeled subdomains, track retainer cashflow, analyze client website health scores, and dispatch automated monthly report invoices.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow shadow-indigo-600/20 cursor-pointer"
          type="button"
        >
          <PlusCircle className="h-4 w-4" />
          <span>{showAdd ? 'Close' : 'Add Client Workspace'}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="agency-metrics">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Total Agency Monthly Retainers (MRR)</p>
              <h3 className="text-xl font-bold font-mono text-slate-101 mt-1">${totalRetainerRevenue.toLocaleString()} / mo</h3>
            </div>
            <div className="p-2 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 font-mono">Active retainer cashflow pool</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Client satisfaction average</p>
              <h3 className="text-xl font-bold font-mono text-emerald-400 mt-1">{averageClientHealth}% Health Index</h3>
            </div>
            <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 font-mono">Aggregated health factors checks</div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Allocated billing slots</p>
              <h3 className="text-xl font-bold font-mono text-slate-101 mt-1">{clients.length} / 100 max</h3>
            </div>
            <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Server className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 font-mono">Multi-tenant server instances assigned</div>
        </div>
      </div>

      {showAdd && (
        <form onSubmit={handleRegisterClient} className="p-5 rounded-xl border border-indigo-500/30 bg-slate-900/40 max-w-lg space-y-4" id="add-client-form">
          <h4 className="text-xs font-bold text-slate-101 font-mono uppercase tracking-widest">Connect Brand Workspace</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Company / Group Board</label>
              <input
                type="text"
                required
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                placeholder="Garrison Group LLC"
                className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-202 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Brand Name Prefix</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="FitLife Premium"
                className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-202 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Industry category</label>
              <select
                value={newIndustry}
                onChange={(e) => setNewIndustry(e.target.value as any)}
                className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-202 outline-none"
              >
                <option value="Fitness">Fitness</option>
                <option value="Tech">Tech</option>
                <option value="Fashion">Fashion</option>
                <option value="Consulting">Consulting</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Retainer MSRP Fee ($/mo)</label>
              <input
                type="number"
                value={newRetainer}
                onChange={(e) => setNewRetainer(Number(e.target.value))}
                className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs font-mono text-slate-202 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white"
            >
              Verify & Provision
            </button>
          </div>
        </form>
      )}

      {/* Directory Listings */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left flex flex-col min-h-[380px]">
        <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-4">
          Client Workspace Directory Index
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-sans text-slate-300">
            <thead>
              <tr className="border-b border-slate-850 font-mono text-[10px] text-slate-500 text-left uppercase">
                <th className="pb-3 pl-2">Brand Workspace / Company</th>
                <th className="pb-3 text-center">Industry</th>
                <th className="pb-3">Retainer Cache</th>
                <th className="pb-3 text-center">Health Indicator</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 text-right">Dedicated Endpoint</th>
                <th className="pb-3 pr-2 text-right">Portal Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {clients.map(cli => (
                <tr key={cli.id} className="hover:bg-slate-900/40">
                  <td className="py-3.5 pl-2">
                    <div className="font-semibold text-slate-100 flex items-center space-x-1.5">
                      <span>{cli.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-500">{cli.ownerCompany}</div>
                  </td>
                  <td className="py-3.5 text-center">
                    <span className="text-[10px] font-mono bg-slate-950 border border-slate-850 px-1.5 py-0.5 rounded text-slate-400">
                      {cli.industry}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-slate-300 font-medium">
                    ${cli.retainerFee.toLocaleString()}/mo
                  </td>
                  <td className="py-3.5 text-center">
                    <div className="flex items-center justify-center space-x-1.5">
                      <span className={`h-2 w-2 rounded-full ${cli.healthScore >= 85 ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      <span className="font-bold text-slate-202 font-mono">{cli.healthScore}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-center">
                    <span className={`text-[10px] uppercase font-mono px-1 rounded font-bold ${
                      cli.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {cli.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right font-mono text-[10px] text-slate-450 italic underline hover:text-indigo-400 transition-colors">
                    <a href={cli.workspaceUrl} target="_blank" rel="noreferrer" className="flex items-center justify-end space-x-1">
                      <span>Subdomain access</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td className="py-3.5 pr-2 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleInvoiceClient(cli)}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 hover:text-slate-205 cursor-pointer"
                        type="button"
                      >
                        Billed Invoices
                      </button>
                      <button
                        onClick={() => handleDeleteClient(cli.id, cli.name)}
                        className="text-slate-500 hover:text-rose-455 p-1 rounded"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoiceModal && selectedClient && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative">
            <h3 className="text-sm font-bold text-slate-101 font-mono uppercase tracking-widest border-b border-slate-800 pb-2 mb-4 flex items-center space-x-1.5">
              <FileCheck2 className="h-4.5 w-4.5 text-indigo-400" />
              <span>Provision Workspace Invoice PDF</span>
            </h3>

            <div className="space-y-4 text-xs font-sans">
              <div className="p-3 bg-slate-950 border border-slate-850 rounded-lg space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Deliverable Account</span>
                <div className="font-semibold text-slate-200">{selectedClient.ownerCompany}</div>
                <div className="font-mono text-slate-400 font-medium">Billed Retainer: ${selectedClient.retainerFee.toLocaleString()}</div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Detailed Service Items</label>
                <textarea
                  value={servicesBilled}
                  onChange={(e) => setServicesBilled(e.target.value)}
                  className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs font-sans text-slate-202 outline-none h-20 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-855 mt-4">
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="px-4 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-410 hover:text-slate-200"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSendInvoice}
                className="px-5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-505 text-xs font-bold text-white shadow shadow-indigo-600/20"
              >
                Dispatch Branded Invoice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
