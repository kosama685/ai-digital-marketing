/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Send, Award, Users, FileText, CheckCircle, RefreshCw, BarChart2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface EmailProps {
  onPostNewLog: (message: string, type: 'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'post_pub' | 'system' | 'seo', status: 'success' | 'warning' | 'error' | 'info') => void;
}

export default function Email({ onPostNewLog }: EmailProps) {
  const [subjectLine, setSubjectLine] = useState('Build Organic Brand Reach Safely in 2026 🚀');
  const [subjectScore, setSubjectScore] = useState(78);
  const [subjectSuggestions, setSubjectSuggestions] = useState<string[]>([]);
  const [sendingNewsletter, setSendingNewsletter] = useState(false);

  // Template copy
  const [mailContent, setMailContent] = useState('Hi [First Name], discover structural social outreach strategies designed without risk of network blocks...');

  // Subscribers mock list
  const [subscribers, setSubscribers] = useState([
    { email: 'founder@organic-fitness.co', name: 'Leah Vance', status: 'subscribed' },
    { email: 'marketing@saasmetric-io.com', name: 'Derrick Vance', status: 'subscribed' },
    { email: 'sienna@dietmaven.ca', name: 'Sienna Ross', status: 'subscribed' }
  ]);
  const [newSubEmail, setNewSubEmail] = useState('');
  const [newSubName, setNewSubName] = useState('');

  const optimizeSubjectLine = () => {
    if (!subjectLine) return;
    toast.info('Analyzing headline emotion ratios and open coefficients...');
    setTimeout(() => {
      const score = Math.floor(Math.random() * 20) + 80; // 80 - 100
      setSubjectScore(score);
      setSubjectSuggestions([
        `🔥 Why Your Brand Collapses Without Dynamic Proxy Warmups`,
        `Definitive Blueprint: 10x Your Outbound Social Scaling Under SLA`,
        `Unveiled: How We Cleared Social Blocks Safely (Detailed Guide)`
      ]);
      toast.success(`Analysis finalized. Score: ${score}/100!`);
    }, 800);
  };

  const handleDispatchCampaign = () => {
    if (!subjectLine || !mailContent) {
      toast.error('Campaign subject and newsletter body coordinates required!');
      return;
    }

    setSendingNewsletter(true);
    onPostNewLog(`Queueing massive campaign dispatch: "${subjectLine}" targeting ${subscribers.length} active leads.`, 'dm', 'info');

    setTimeout(() => {
      setSendingNewsletter(false);
      onPostNewLog(`Successfully dispatched newsletter: "${subjectLine}". Delivery Status: 100% Resolved.`, 'dm', 'success');
      toast.success('Campaign newsletter successfully dispatched to lead registries!');
    }, 2000);
  };

  const handleAppendSubscriber = () => {
    if (!newSubEmail || !newSubName) {
      toast.error('Subscriber profile coordinates required!');
      return;
    }
    setSubscribers([...subscribers, { email: newSubEmail, name: newSubName, status: 'subscribed' }]);
    setNewSubEmail('');
    setNewSubName('');
    toast.success('Appended recipient profile successfully!');
  };

  return (
    <div className="space-y-6" id="email-view-container">
      {/* View Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center space-x-2">
            <Mail className="h-5 w-5 text-indigo-400" />
            <span>Interactive Email Marketing & Leads Campaigns</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Build bespoke automated newsletters, optimize subject open ratios, curate segment criteria, and track global deliverability metrics.
          </p>
        </div>
      </div>

      {/* Main split: newsletter design (Left) & subject optimization/list (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Newsletter composer */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-850 pb-2">
              Newsletter Designer & Composer Workspace
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-slate-500 uppercase font-mono block mb-1">Subject Line</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={subjectLine}
                    onChange={(e) => setSubjectLine(e.target.value)}
                    className="flex-1 rounded border border-slate-800 bg-slate-950 p-2 text-xs text-slate-200 outline-none"
                  />
                  <button
                    onClick={optimizeSubjectLine}
                    className="px-3 bg-slate-900 border border-slate-800 text-slate-400 rounded hover:text-slate-100 font-semibold"
                    type="button"
                  >
                    Optimize Score
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase font-mono block mb-1">HTML Body</label>
                <textarea
                  value={mailContent}
                  onChange={(e) => setMailContent(e.target.value)}
                  rows={8}
                  className="w-full rounded border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200 outline-none"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleDispatchCampaign}
                  disabled={sendingNewsletter}
                  className="px-5 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center shadow disabled:opacity-50 cursor-pointer"
                  type="button"
                >
                  {sendingNewsletter ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin mr-1.5" />
                      <span>Sending emails...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-1.5" />
                      <span>Dispatch Broadcast Campaign</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar subject scores / list segment */}
        <div className="space-y-6">
          
          {/* Subject analyzer details */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-850 pb-2">
              Audits open statistics
            </h3>
            
            <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20 text-center font-mono space-y-1.5">
              <p className="text-[9px] text-slate-500 uppercase">Subject Open Coefficient</p>
              <h4 className="text-2xl font-bold font-sans text-indigo-400">
                {subjectScore} %
              </h4>
              <p className="text-[9.5px] text-slate-405 italic">
                {subjectScore > 85 ? '🎯 Outstanding Click Likelihood!' : '🌱 Steady - check recommendations'}
              </p>
            </div>

            {subjectSuggestions.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] text-slate-500 uppercase block font-mono">Suggested AI Variations</span>
                <div className="space-y-1.5 text-[11px] text-slate-350">
                  {subjectSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSubjectLine(s);
                        toast.success('Adopted AI optimization subject line!');
                      }}
                      className="w-full text-left p-1.5 rounded bg-slate-950 border border-slate-850 hover:bg-slate-900 leading-snug"
                      type="button"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Subscribers segmented CRM list */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-850 pb-2">
              Leads List segment
            </h3>

            <div className="space-y-2 overflow-y-auto max-h-[160px] pr-1">
              {subscribers.map((sub, i) => (
                <div key={i} className="flex justify-between items-center text-xs p-1.5 rounded border border-slate-900 bg-slate-950/40">
                  <div>
                    <span className="text-slate-200 block font-semibold leading-none">{sub.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">{sub.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSubscribers(subscribers.filter((_, idx) => idx !== i));
                      toast.info('Lead unsubscribed');
                    }}
                    className="text-[10px] text-slate-600 hover:text-rose-455 p-1"
                    type="button"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Append Lead subscriber form */}
            <div className="space-y-2 border-t border-slate-900 pt-3">
              <span className="text-[9px] text-slate-550 uppercase tracking-widest font-mono block">Append target subscriber</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  placeholder="Name"
                  className="rounded border border-slate-850 bg-slate-950 p-1 text-slate-200 outline-none"
                />
                <input
                  type="email"
                  value={newSubEmail}
                  onChange={(e) => setNewSubEmail(e.target.value)}
                  placeholder="Email"
                  className="rounded border border-slate-850 bg-slate-950 p-1 text-slate-200 outline-none"
                />
              </div>
              <button
                onClick={handleAppendSubscriber}
                className="w-full py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-704 font-bold text-xs"
                type="button"
              >
                Add Recipient
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
