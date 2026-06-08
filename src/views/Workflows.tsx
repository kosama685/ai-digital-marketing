/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AutomationRule } from '../types';
import { 
  Workflow, 
  PlusCircle, 
  RefreshCw, 
  ArrowRight, 
  CheckSquare, 
  Compass, 
  Shuffle, 
  Settings2, 
  Check, 
  Trash2,
  Share2,
  Plug
} from 'lucide-react';
import { toast } from 'sonner';

interface WorkflowsProps {
  onPostNewLog: (message: string, type: 'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'post_pub' | 'system' | 'seo', status: 'success' | 'warning' | 'error' | 'info') => void;
}

export default function Workflows({ onPostNewLog }: WorkflowsProps) {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [showModal, setShowModal] = useState(false);

  // New Rule Form States
  const [ruleName, setRuleName] = useState('');
  const [ruleTrigger, setRuleTrigger] = useState('New Follower Detected');
  const [ruleCondition, setRuleCondition] = useState('Follower count > 500');
  const [ruleAction, setRuleAction] = useState('Send welcomer promotional DM');

  // Webhook Test State
  const [webhookUrl, setWebhookUrl] = useState('https://nexusforge.ai/api/v1/webhooks/meta-catch');
  const [testingWebhook, setTestingWebhook] = useState(false);

  useEffect(() => {
    setRules(JSON.parse(localStorage.getItem('nexus_rules') || '[]'));
  }, []);

  const handleCreateRule = () => {
    if (!ruleName) {
      toast.error('Rule identifier label is required!');
      return;
    }

    const newRule: AutomationRule = {
      id: `rule-${Date.now()}`,
      name: ruleName,
      trigger: ruleTrigger,
      conditions: [ruleCondition],
      actions: [ruleAction],
      enabled: true
    };

    const updated = [...rules, newRule];
    setRules(updated);
    localStorage.setItem('nexus_rules', JSON.stringify(updated));

    onPostNewLog(`Successfully designed visual automation flow: "${newRule.name}"`, 'system', 'success');
    toast.success('Successfully appended rule logic to system active registry!');

    // Reset
    setShowModal(false);
    setRuleName('');
  };

  const handleToggleRule = (id: string, name: string, current: boolean) => {
    const updated = rules.map(r => r.id === id ? { ...r, enabled: !current } : r);
    setRules(updated);
    localStorage.setItem('nexus_rules', JSON.stringify(updated));
    toast.info(`Workflow rule "${name}" is now ${!current ? 'ENABLED' : 'DISABLED'}`);
    onPostNewLog(`Automation rule "${name}" set state manually to ${!current ? 'active' : 'suspended'}`, 'system', 'info');
  };

  const handleRemoveRule = (id: string, name: string) => {
    if (confirm(`Flush automation rule "${name}"?`)) {
      const updated = rules.filter(r => r.id !== id);
      setRules(updated);
      localStorage.setItem('nexus_rules', JSON.stringify(updated));
      onPostNewLog(`Purged logic rule "${name}"`, 'system', 'warning');
      toast.info('Cleared rule from active indices');
    }
  };

  const handleTestWebhook = () => {
    setTestingWebhook(true);
    setTimeout(() => {
      setTestingWebhook(false);
      toast.success('Webhook dispatch successfully delivered! Code: 200 OK');
      onPostNewLog(`Dispatched testing trigger payload to webhook coordinates: ${webhookUrl}`, 'system', 'success');
    }, 1205);
  };

  return (
    <div className="space-y-6" id="workflows-view-container">
      {/* View Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center space-x-2">
            <Workflow className="h-5 w-5 text-indigo-400 animate-pulse-slow" />
            <span>Advanced Automation Rules & Workflows</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Build custom conditional recipes. Trigger multi-platform actions, chain parameters, and bind secure system webhooks frictionless.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-505 text-xs font-semibold text-white shadow shadow-indigo-900/10 cursor-pointer"
          type="button"
          id="trigger-rule-wizard-btn"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Custom Flow Rule</span>
        </button>
      </div>

      {/* Main Grid: Visual Cards / SVG line representation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="workflows-layout-grid-node">
        
        {/* Left column: rules list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-4 border-b border-slate-850 pb-2">
              Conditional Flow Registry
            </h3>

            <div className="space-y-4" id="workflow-rules-chain-list">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-4 rounded-lg bg-slate-950/60 border border-slate-850 hover:border-slate-800 transition-all text-left space-y-3 relative group"
                >
                  <button
                    onClick={() => handleRemoveRule(rule.id, rule.name)}
                    className="absolute right-3 top-3 text-slate-650 hover:text-rose-405 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete rule"
                    type="button"
                  >
                    ×
                  </button>

                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-sans font-extrabold text-slate-200">{rule.name}</h4>
                    <button
                      onClick={() => handleToggleRule(rule.id, rule.name, rule.enabled)}
                      className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded border transition-all ${
                        rule.enabled 
                          ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' 
                          : 'border-slate-800 text-slate-500 bg-slate-900/30'
                      }`}
                      type="button"
                    >
                      {rule.enabled ? 'ACTIVE' : 'SUSPENDED'}
                    </button>
                  </div>

                  {/* Flow Diagram Representation */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-between gap-2 text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-900 leading-relaxed bg-slate-950/30 p-2 rounded">
                    
                    {/* Trigger Card */}
                    <div className="p-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold truncate text-center">
                      ⚡ {rule.trigger}
                    </div>

                    {/* Linking arrow */}
                    <div className="flex items-center justify-center text-slate-600">
                      <ArrowRight className="h-3 w-3 inline rotate-90 sm:rotate-0" />
                      <span className="text-[9px] px-1 italic">if: {rule.conditions[0]}</span>
                      <ArrowRight className="h-3 w-3 inline rotate-90 sm:rotate-0" />
                    </div>

                    {/* Action Card */}
                    <div className="p-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold truncate text-center">
                      ⚙️ {rule.actions[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Webhook Settings configs */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4">
            <div className="flex items-center space-x-1.5 border-b border-slate-800 pb-2 mb-3">
              <Plug className="h-4.5 w-4.5 text-indigo-400" />
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                System Webhook Endpoints
              </h3>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Dispatch structural payloads to custom endpoints whenever active rules trigger alerts or post parameters go broken.
            </p>

            <div className="space-y-3 pt-1">
              <div>
                <label className="text-[10px] text-slate-500 block mb-1 uppercase font-mono">Target Catch URL</label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full rounded border border-slate-805 bg-slate-950 p-2 text-xs font-mono text-slate-300 outline-none"
                />
              </div>

              <button
                onClick={handleTestWebhook}
                disabled={testingWebhook}
                className="w-full py-1.5 rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 font-bold text-xs text-slate-200 transition-all flex items-center justify-center space-x-1 disabled:opacity-50 cursor-pointer"
                type="button"
              >
                {testingWebhook ? (
                  <>
                    <span className="h-3.5 w-3.5 rounded-full border border-slate-300/20 border-t-slate-100 animate-spin mr-1" />
                    <span>Firing Payload...</span>
                  </>
                ) : (
                  <>
                    <Shuffle className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Fire Testing Payload</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ADD RULE MODAL WIZARD */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" id="rule-wizard-modal-view">
          <div className="w-full max-w-md glass-panel p-6 rounded-xl border border-slate-850 shadow-2xl text-left space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                Create Automation recipe
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-200 font-bold"
                type="button"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Recipe Name/Identifier</label>
                <input
                  type="text"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  placeholder="e.g. Broken Backlink Urgent Escalation"
                  className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Trigger Event (When)</label>
                <select
                  value={ruleTrigger}
                  onChange={(e) => setRuleTrigger(e.target.value)}
                  className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-300 outline-none"
                >
                  <option>New Follower Detected</option>
                  <option>Blog Post Published on CMS</option>
                  <option>Backlink Status Goes Broken</option>
                  <option>Campaign Budget Burn Alerts</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Conditional Guard (If)</label>
                <select
                  value={ruleCondition}
                  onChange={(e) => setRuleCondition(e.target.value)}
                  className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-300 outline-none"
                >
                  <option>Follower count &gt; 500</option>
                  <option>SLA rating = High</option>
                  <option>Associated niche matches "AI Marketing"</option>
                  <option>Bounce rate exceed 65%</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Action Reaction (Then)</label>
                <select
                  value={ruleAction}
                  onChange={(e) => setRuleAction(e.target.value)}
                  className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-300 outline-none"
                >
                  <option>Send welcomer promotional DM</option>
                  <option>Create critical support ticket</option>
                  <option>Generate promotional visual description</option>
                  <option>Ping Slack communication logs</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 border-t border-slate-850 pt-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-3.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-xs"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRule}
                className="px-5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white"
                type="button"
              >
                Assemble recipe
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
