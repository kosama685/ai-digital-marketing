/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  PlusCircle, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  UserPlus, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface EscalationTicket {
  id: string;
  subject: string;
  source: 'system-alert' | 'user-reported' | 'sla-breach';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  assignedTo: string;
  createdAt: string;
  convo: { sender: string; text: string; time: string }[];
}

const INITIAL_ESCALATION_TICKETS: EscalationTicket[] = [
  {
    id: 'tkt-1',
    subject: 'Meta Session Token Refreshes Failing on Node Client',
    source: 'system-alert',
    priority: 'high',
    status: 'investigating',
    assignedTo: 'Damian Vance',
    createdAt: '2026-06-08 12:00',
    convo: [
      { sender: 'System Node Scheduler', text: 'Alert: cron job [meta-sync] threw exception "Unauthorized OAuth token: Token expired" continuously for account: @nexusforge_ai', time: '2026-06-08 12:00' },
      { sender: 'Engineer Damian', text: 'Inspecting proxy pool logs. Latency was spikey during Meta server verification checks.', time: '2026-06-08 12:15' }
    ]
  },
  {
    id: 'tkt-2',
    subject: 'Daily Auto Posts Skipped for Apex Tech Blog',
    source: 'user-reported',
    priority: 'medium',
    status: 'open',
    assignedTo: 'Sarah Smith',
    createdAt: '2026-06-08 14:10',
    convo: [
      { sender: 'Client Amelie', text: 'Our custom Apex Tech blog dashboard is completely enabled, but today\'s automated double-article was skipped. Help.', time: '2026-06-08 14:10' }
    ]
  }
];

export default function Escalations() {
  const [tickets, setTickets] = useState<EscalationTicket[]>([]);
  const [activeTicket, setActiveTabTicket] = useState<EscalationTicket | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  // Form states
  const [newSubject, setNewSubject] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [newSource, setNewSource] = useState<'system-alert' | 'user-reported' | 'sla-breach'>('user-reported');
  const [newMsg, setNewMsg] = useState('');

  // Conversation input state
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('nexus_tickets');
    if (stored) {
      setTickets(JSON.parse(stored));
    } else {
      setTickets(INITIAL_ESCALATION_TICKETS);
      localStorage.setItem('nexus_tickets', JSON.stringify(INITIAL_ESCALATION_TICKETS));
    }
  }, []);

  const saveTickets = (updated: EscalationTicket[]) => {
    setTickets(updated);
    localStorage.setItem('nexus_tickets', JSON.stringify(updated));
    if (activeTicket) {
      const live = updated.find(t => t.id === activeTicket.id);
      if (live) setActiveTabTicket(live);
    }
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject || !newMsg) {
      toast.error('Ticket subject and instruction message mandatory!');
      return;
    }

    const newTkt: EscalationTicket = {
      id: `tkt-${Date.now()}`,
      subject: newSubject,
      source: newSource,
      priority: newPriority,
      status: 'open',
      assignedTo: 'Unassigned Host',
      createdAt: '2026-06-08 14:30',
      convo: [
        { sender: 'Operator', text: newMsg, time: '14:30:10' }
      ]
    };

    const updated = [newTkt, ...tickets];
    saveTickets(updated);
    
    setNewSubject('');
    setNewMsg('');
    setShowAdd(false);
    toast.success('Pristine Support Ticket / Escalation created successfully!');
  };

  const handleUpdateStatus = (id: string, status: 'open' | 'investigating' | 'resolved') => {
    const updated = tickets.map(t => {
      if (t.id === id) {
        toast.info(`Updated status for ticket to ${status.toUpperCase()}`);
        return { ...t, status };
      }
      return t;
    });
    saveTickets(updated);
  };

  const handleAssignTicket = (id: string) => {
    const updated = tickets.map(t => {
      if (t.id === id) {
        toast.success(`Assigned ticket to Damian Vance`);
        return { ...t, assignedTo: 'Damian Vance', status: 'investigating' as const };
      }
      return t;
    });
    saveTickets(updated);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText || !activeTicket) return;

    const reply = {
      sender: 'Operator Panel',
      text: replyText,
      time: '14:32:05'
    };

    const updated = tickets.map(t => {
      if (t.id === activeTicket.id) {
        return { ...t, convo: [...t.convo, reply] };
      }
      return t;
    });

    saveTickets(updated);
    setReplyText('');
    toast.success('Reply successfully appended to active issue timeline thread!');
  };

  const deleteTicket = (id: string) => {
    const updated = tickets.filter(t => t.id !== id);
    saveTickets(updated);
    if (activeTicket?.id === id) {
      setActiveTabTicket(null);
    }
    toast.error('Support escalation record deleted form database.');
  };

  return (
    <div className="space-y-6 text-left" id="escalations-view-layout">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-101 flex items-center space-x-2">
            <ShieldAlert className="h-5 w-5 text-indigo-400" />
            <span>Escalation Tickets & Support Helpdesk</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Resolve automated critical system warning alerts (e.g. Proxy blacklists, API rate block warnings) and track live SLA compliance parameters.
          </p>
        </div>

        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-505 text-xs font-semibold text-white shadow shadow-indigo-600/20 cursor-pointer"
          type="button"
        >
          <PlusCircle className="h-4 w-4" />
          <span>{showAdd ? 'Close form' : 'Open Ticket'}</span>
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreateTicket} className="p-5 rounded-xl border border-indigo-500/30 bg-slate-900/40 max-w-lg space-y-4" id="ticket-generator-form">
          <h4 className="text-xs font-bold text-slate-101 font-mono uppercase tracking-widest">Generate Support Ticket / Escalation</h4>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Alert Subject</label>
            <input
              type="text"
              required
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="E.g. Residential Gateway IP Limit Breach detected on acc-2"
              className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-202 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Issue Priority</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-202 outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Trigger Source</label>
              <select
                value={newSource}
                onChange={(e) => setNewSource(e.target.value as any)}
                className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-202 outline-none font-mono"
              >
                <option value="system-alert">system-alert (cron)</option>
                <option value="user-reported">user-reported</option>
                <option value="sla-breach">sla-breach</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Diagnostic Log details</label>
            <textarea
              required
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Paste exception dump or custom requirements..."
              className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-202 outline-none h-18 resize-none font-sans"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-505 font-bold text-xs text-white"
            >
              Verify & Dispatch Ticket
            </button>
          </div>
        </form>
      )}

      {/* Main split viewport Grid: Tickets List (Left 1 col) & Active Thread (Right 2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="tickets-conversations-split">
        
        {/* Ticket List directory (Left) */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left h-[450px] flex flex-col">
            <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-3">
              Helpdesk Inbox ({tickets.length})
            </h3>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1" id="tickets-scroll-container">
              {tickets.length === 0 ? (
                <div className="text-center py-20 text-slate-500 font-sans text-xs">
                  No support records currently enqueued.
                </div>
              ) : (
                tickets.map(tkt => (
                  <div
                    key={tkt.id}
                    onClick={() => setActiveTabTicket(tkt)}
                    className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all space-y-2 ${
                      activeTicket?.id === tkt.id 
                        ? 'bg-slate-950 border-indigo-500/40 shadow shadow-indigo-900/10' 
                        : 'bg-slate-950/40 border-slate-850 hover:border-slate-805'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-500">{tkt.createdAt}</span>
                      <span className={`px-1 rounded font-bold uppercase ${
                        tkt.priority === 'critical' ? 'bg-rose-500/15 text-rose-400' :
                        tkt.priority === 'high' ? 'bg-orange-500/15 text-orange-400' :
                        'bg-slate-900 text-slate-400'
                      }`}>
                        {tkt.priority}
                      </span>
                    </div>

                    <h4 className="font-semibold text-slate-101 text-xs leading-snug line-clamp-1">
                      {tkt.subject}
                    </h4>

                    <div className="flex justify-between items-center pt-1 text-[10px] uppercase font-mono text-slate-500 font-bold leading-none">
                      <span>{tkt.status}</span>
                      <span className="text-indigo-400">{tkt.assignedTo}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Selected Ticket Conversation Thread (Right 2 cols) */}
        <div className="lg:col-span-2">
          {activeTicket ? (
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left h-[450px] flex flex-col justify-between overflow-hidden" id="active-ticket-timeline-panel">
              {/* Top Details Action strip */}
              <div className="border-b border-slate-850 pb-2 mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="font-bold text-slate-101 text-xs truncate max-w-md">
                    {activeTicket.subject}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-500 mt-1 uppercase font-bold leading-none">
                    <span>Source: {activeTicket.source}</span>
                    <span>•</span>
                    <span>Assigned: {activeTicket.assignedTo}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  {activeTicket.assignedTo === 'Unassigned Host' && (
                    <button
                      onClick={() => handleAssignTicket(activeTicket.id)}
                      className="px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 font-mono hover:bg-indigo-600 hover:text-white"
                      type="button"
                    >
                      Assign Rep
                    </button>
                  )}
                  <select
                    value={activeTicket.status}
                    onChange={(e) => handleUpdateStatus(activeTicket.id, e.target.value as any)}
                    className="bg-slate-950 text-slate-400 text-[10px] border border-slate-800 rounded p-1 outline-none font-mono font-bold"
                  >
                    <option value="open">Open</option>
                    <option value="investigating">Investigating</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <button
                    onClick={() => deleteTicket(activeTicket.id)}
                    className="text-slate-500 hover:text-rose-455 p-1 rounded"
                    type="button"
                    title="Delete Ticket"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto space-y-3.5 p-3 rounded-lg bg-slate-955 border border-slate-855 h-64 mb-3" id="active-ticket-comments-scroller">
                {activeTicket.convo.map((comment, index) => {
                  const isSys = comment.sender.includes('System') || comment.sender.includes('Scheduler');
                  const isOps = comment.sender.includes('Operator');
                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-xl max-w-lg space-y-1.5 text-xs text-left ${
                        isSys ? 'bg-amber-950/15 border border-amber-500/10 text-amber-201 mr-auto' :
                        isOps ? 'bg-indigo-950/15 border border-indigo-500/10 text-indigo-201 ml-auto' :
                        'bg-slate-900 border border-slate-850 text-slate-300 mr-auto'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[9px] font-mono uppercase font-bold text-slate-500 leading-none">
                        <span>{comment.sender}</span>
                        <span>{comment.time}</span>
                      </div>
                      <p className="font-sans leading-relaxed text-xs">{comment.text}</p>
                    </div>
                  );
                })}
              </div>

              {/* Dispatch reply form */}
              <form onSubmit={handleSendReply} className="flex gap-2 pt-2 border-t border-slate-850">
                <input
                  type="text"
                  required
                  placeholder="Type diagnostic suggestion or instructions reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-202 outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-505 text-xs font-bold text-white shadow shadow-indigo-600/20"
                >
                  Send Reply
                </button>
              </form>
            </div>
          ) : (
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left h-[450px] flex flex-col justify-center items-center text-center text-slate-500 border-dashed border-slate-855">
              <MessageSquare className="h-9 w-18 text-slate-600 mb-2 animate-bounce-slow" />
              <p className="text-xs font-semibold">Active Escalation chat timeline thread completely clear...</p>
              <p className="text-[10px] font-mono text-slate-500 mt-1">Select any ticket from helpdesk list to inspect operational logs</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
