/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Cpu, Play, Square, Settings, Sliders, MessageSquare, Heart, UserPlus, Eye, Clock, CheckCircle, Smartphone, Sparkles, Users, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface AutomationProps {
  onPostNewLog: (message: string, type: 'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'post_pub' | 'system' | 'seo', status: 'success' | 'warning' | 'error' | 'info') => void;
}

export default function Automation({ onPostNewLog }: AutomationProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'agentic'>('agentic');

  // Agentic Autopilot states (Task 4.7 / Phase 16.1)
  const [agenticMasterState, setAgenticMasterState] = useState(true);
  const [agentConfidenceThreshold, setAgentConfidenceThreshold] = useState(85);
  const [selectedAgentModel, setSelectedAgentModel] = useState('kimi-k2.6');
  const [agentPersonality, setAgentPersonality] = useState<'professional' | 'friendly' | 'witty'>('friendly');
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 'app-1', type: 'Comment Reply', targetUser: '@gains_guru', context: 'Asked: "What are your subscription features?"', proposedReply: 'Hey! We offer residential proxies, automated Maverick sequence pipelines, and organic content calendars. Standard starts at $29/mo! 🌟', confidence: 92 },
    { id: 'app-2', type: 'DM Lead Qualify', targetUser: '@fit_brand_xo', context: 'Sent: "Interested in collaboration. Do you support Shopify blog posting?"', proposedReply: 'Hello! Yes, our CRM + BlogCMS supports Shopify, dietmaven.ca, and active custom endpoints. Let\'s schedule a brief 10 min audit call! 📅', confidence: 81 },
    { id: 'app-3', type: 'Group Share Adapt', targetUser: 'LinkedIn Group: Growth Hackers', context: 'Action: Share newly compiled blog post to 12 active channels', proposedReply: '🚀 Unleashing Maverick tactics in 2026! How automated micro-campaign lead filters can grow your conversion coefficients by 5.2x.', confidence: 88 }
  ]);
  const [agentDecisionsLog, setAgentDecisionsLog] = useState([
    { id: 'dec-1', timestamp: '14:32:10', stage: 'Observe', desc: 'Detected high-intent comment mentioning "pricing" on post #SEO-202' },
    { id: 'dec-2', timestamp: '14:32:11', stage: 'Think', desc: 'Confidence score calculated: 92/100, above approval threshold (85). Personality set to friendly.' },
    { id: 'dec-3', timestamp: '14:32:12', stage: 'Act', desc: 'Dispatched automated contextual reply to comment and queued welcome DM' }
  ]);

  // Input States
  const [hashtags, setHashtags] = useState('#fitness, #organic, #workout');
  const [competitors, setCompetitors] = useState('@fitlife_pro, @dietcoach');
  const [maxFollowsPerDay, setMaxFollowsPerDay] = useState(250);
  const [maxLikesPerDay, setMaxLikesPerDay] = useState(400);
  
  // Spintax test parameters
  const [spintaxInput, setSpintaxInput] = useState('{Amazing|Stunning|Outstanding} {content|story|photography}! 🔥 Keep it up.');
  const [spintaxOutput, setSpintaxOutput] = useState('');

  // Auto comments library
  const [commentsList, setCommentsList] = useState([
    'Inspirational layout! 🙌 Let\'s collab.',
    'Pristine visual balance. Love this.',
    'Saved to our growth board!'
  ]);
  const [newCommentInput, setNewCommentInput] = useState('');

  // Daily scheduler times
  const [nightMode, setNightMode] = useState(true);
  const [startHour, setStartHour] = useState('09:00');
  const [endHour, setEndHour] = useState('22:00');

  // Simulate background tasks when active
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // Pick a random action
      const actionsPool = [
        { type: 'follow', msg: 'Automatically processed check on competitor follower: @organic_athlete. Followed account.', status: 'success' },
        { type: 'like', msg: 'Dispatched outbound engagement: Liked hashtag post under focus #fitnessmotivation.', status: 'success' },
        { type: 'comment', msg: 'Outbound comment published: "Stunning story! 🔥 Keep it up" on @yoga_with_melody recent post.', status: 'success' },
        { type: 'dm', msg: 'Dispatched automated Maverick outreach queue draft to: @keto.mommy_ca.', status: 'success' },
        { type: 'story_view', msg: 'Outbound trigger resolved: Simulated stories view on target profile David Vance.', status: 'success' }
      ] as const;

      const randomAction = actionsPool[Math.floor(Math.random() * actionsPool.length)];
      onPostNewLog(randomAction.msg, randomAction.type, randomAction.status);
    }, 10000); // Pulse an automation activity log entry every 10 seconds

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleToggleEngine = () => {
    const nextState = !isRunning;
    setIsRunning(nextState);
    if (nextState) {
      toast.success('Omni-Automation engine is officially ignited!');
      onPostNewLog('Omni-Automation engine master switch ignited. Dispatching threads...', 'system', 'success');
    } else {
      toast.info('Omni-Automation engine suspended');
      onPostNewLog('Omni-Automation engine suspended by operator coordinate.', 'system', 'warning');
    }
  };

  const handleTestSpintax = () => {
    // Parse spintax like {A|B} {X|Y}
    const regex = /\{([^{}]+)\}/g;
    let text = spintaxInput;
    let match;

    while ((match = regex.exec(spintaxInput)) !== null) {
      const choices = match[1].split('|');
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      text = text.replace(match[0], randomChoice);
    }

    setSpintaxOutput(text);
    toast.success('Spintax dictionary successfully parsed!');
  };

  const handleAddComment = () => {
    if (!newCommentInput) return;
    setCommentsList([...commentsList, newCommentInput]);
    setNewCommentInput('');
    toast.success('Outbound commentary draft appended successfully');
  };

  return (
    <div className="space-y-6" id="automation-view-container">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center space-x-2">
            <Cpu className="h-5 w-5 text-indigo-400" />
            <span>Outbound Automated Engagement Engine</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure organic behavior routines, daily quotas, safe sleeping periods, and multi-threaded spintax variations.
          </p>
        </div>

        {/* Master Control switch */}
        <button
          onClick={handleToggleEngine}
          className={`px-5 py-2.5 rounded-lg font-bold text-sm flex items-center space-x-2 transition-all shadow-md cursor-pointer ${
            isRunning
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/20'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/20'
          }`}
          type="button"
          id="automation-master-switch-btn"
        >
          {isRunning ? (
            <>
              <Square className="h-4 w-4 fill-white" />
              <span>Suspend Outreach Engine</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-white animate-pulse" />
              <span>Ignite Outreach Engine</span>
            </>
          )}
        </button>
      </div>

      {isRunning && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono animate-pulse flex items-center justify-between">
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-emerald-400 mr-2" />
            <span>ENGINE STATUS: OPERATIONAL. OUTBOUND THREADS DISPATCHING EVERY 10S...</span>
          </div>
          <span>ROTATOR AT INDEPENDENT MOBILE IPs</span>
        </div>
      )}

      {/* Primary configuration split-up panels */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Navigation Sidebar/Rail */}
        <div className="lg:col-span-1 space-y-2">
          <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/20">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono mb-2 px-1">Functional Triggers</p>
            <nav className="space-y-1">
              {[
                { id: 'agentic', name: 'Agentic AI Autopilot 🤖', icon: Sparkles },
                { id: 'follow', name: 'Auto Follow/Unfollow', icon: UserPlus },
                { id: 'like', name: 'Auto Like Engagements', icon: Heart },
                { id: 'comment', name: 'Comment Spintax', icon: MessageSquare },
                { id: 'dm', name: 'Maverick DM Outreach', icon: Smartphone },
                { id: 'story_view', name: 'Stories Viewer', icon: Eye }
              ].map(item => {
                const Icon = item.icon;
                const isActive = selectedTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTab(item.id as any)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                    type="button"
                  >
                    <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Dynamic Parameter Settings Node */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/20 space-y-6 text-left">
            
            {/* OPTION 0: Agentic AI Autopilot configurations (Task 4.7 / Phase 16) */}
            {selectedTab === 'agentic' && (
              <div className="space-y-6" id="automation-tab-agentic">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-100 uppercase tracking-widest font-mono">Agentic AI Autopilot Control Center</h3>
                      <p className="text-[10px] text-slate-400">Autonomous observation, intent analysis, copy adaptation, and queue sharing.</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setAgenticMasterState(!agenticMasterState);
                      toast.success(`Autonomous Autopilot set to ${!agenticMasterState ? 'ENABLED' : 'DISABLED'}`);
                      onPostNewLog(`Agentic Autopilot Master Mode altered: ${!agenticMasterState}`, 'system', 'info');
                    }}
                    className={`px-3 py-1 rounded text-xs font-mono font-bold tracking-tight cursor-pointer border ${
                      agenticMasterState 
                        ? 'border-emerald-500/25 text-emerald-400 bg-emerald-500/5' 
                        : 'border-slate-800 text-slate-500 bg-slate-900/30'
                    }`}
                  >
                    {agenticMasterState ? '● AUTOPILOT ACTIVE' : '○ AUTOPILOT STANDBY'}
                  </button>
                </div>

                {/* Grid model + threshold controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded-lg border border-slate-850 bg-slate-950/40 space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block">Reasoning Core Model</span>
                    <select
                      value={selectedAgentModel}
                      onChange={(e) => {
                        setSelectedAgentModel(e.target.value);
                        toast.success(`Agent context router bound to ${e.target.value}`);
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-slate-200"
                    >
                      <option value="kimi-k2.6">kimi-k2.6 (Auto)</option>
                      <option value="nemotron-3-nano-omni-30b-a3b-reasoning">nemotron-3-nano-omni</option>
                      <option value="llama-4-maverick-17b-128e-instruct">llama-4-maverick-17b</option>
                      <option value="gemini-2.5-flash">gemini-2.5-flash-pro</option>
                    </select>
                  </div>

                  <div className="p-3.5 rounded-lg border border-slate-850 bg-slate-950/40 space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block">Personality Spectrum</span>
                    <div className="flex space-x-1.5 pt-0.5">
                      {(['professional', 'friendly', 'witty'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => {
                            setAgentPersonality(p);
                            toast.info(`Personality set to ${p.toUpperCase()}`);
                          }}
                          className={`flex-1 text-[9px] font-mono py-1 rounded border capitalize ${
                            agentPersonality === p 
                              ? 'border-indigo-500/30 text-indigo-400 bg-indigo-500/5 font-semibold' 
                              : 'border-slate-800 text-slate-500 hover:text-slate-350'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg border border-slate-850 bg-slate-950/40 space-y-1">
                    <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase font-mono">
                      <span>Human Review Gate</span>
                      <span className="text-amber-500 font-semibold font-mono">&lt; {agentConfidenceThreshold}%</span>
                    </div>
                    <input
                      type="range"
                      min={60}
                      max={95}
                      step={5}
                      value={agentConfidenceThreshold}
                      onChange={(e) => setAgentConfidenceThreshold(Number(e.target.value))}
                      className="w-full h-1 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-indigo-500 mt-2"
                    />
                  </div>
                </div>

                {/* Human-in-the-Loop review & Approval workflow queue */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-1.5">
                    <h4 className="text-xs font-bold text-amber-505 uppercase tracking-widest font-mono flex items-center space-x-1">
                      <span>Pending Autopilot Actions Approved Index</span>
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-[9px] border border-amber-500/25 font-bold">{pendingApprovals.length} Enqueued</span>
                    </h4>
                    <span className="text-[10px] text-slate-500">Confidence below threshold triggers human review.</span>
                  </div>

                  {pendingApprovals.length === 0 ? (
                    <div className="p-8 rounded-lg border border-dashed border-slate-850 text-center text-xs text-slate-500">
                      No enqueued actions in human guard index. Autopilot satisfies all margin outputs perfectly!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingApprovals.map((app) => (
                        <div key={app.id} className="p-4 rounded-xl border border-slate-850 bg-slate-950/50 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition-all hover:border-slate-800">
                          <div className="space-y-1.5 text-xs flex-1 text-left">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-400 px-1.5 py-0.2 rounded font-semibold border border-indigo-500/20">
                                {app.type}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400 font-mono">{app.targetUser}</span>
                              <span className={`text-[9px] font-mono px-1 rounded font-extrabold ${
                                app.confidence >= agentConfidenceThreshold 
                                  ? 'bg-emerald-500/10 text-emerald-400' 
                                  : 'bg-amber-500/10 text-amber-500 animate-pulse'
                              }`}>
                                {app.confidence}% Confidence
                              </span>
                            </div>

                            <p className="text-slate-450 italic font-medium">"{app.context}"</p>
                            
                            <div className="p-2.5 rounded bg-slate-900 border border-slate-850 font-sans text-slate-200 leading-relaxed text-[11px] relative mt-2">
                              <span className="absolute -top-1.5 left-2 px-1 text-[8px] font-mono uppercase text-slate-500 bg-slate-900">Adapted Counsel Copy</span>
                              "{app.proposedReply}"
                            </div>
                          </div>

                          {/* Approval Actions bar */}
                          <div className="flex items-center space-x-2 w-full md:w-auto flex-shrink-0 justify-end pt-2 md:pt-0">
                            <button
                              onClick={() => {
                                setPendingApprovals(pendingApprovals.filter(p => p.id !== app.id));
                                toast.error('Autonomous copy rejected and deleted');
                                onPostNewLog(`Operator rejected proposed autonomous action: ${app.type} targetting ${app.targetUser}. Deleted.`, 'system', 'warning');
                              }}
                              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-450 hover:border-rose-500/35 text-[11px] font-mono transition-colors cursor-pointer"
                              type="button"
                            >
                              Reject
                            </button>

                            <button
                              onClick={() => {
                                setPendingApprovals(pendingApprovals.filter(p => p.id !== app.id));
                                toast.success('Autonomous action successfully executed & published!');
                                onPostNewLog(`Autonomous Action Dispatched: Accepted and published ${app.type} to social index.`, 'system', 'success');
                              }}
                              className="px-3.5 py-1 rounded bg-indigo-600 text-slate-100 hover:bg-indigo-500 text-[11px] font-bold font-mono transition-all cursor-pointer"
                              type="button"
                            >
                              Approve & Dispatch
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Observe Think Act visual loop state */}
                <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-3 text-xs">
                  <h4 className="font-bold text-indigo-400 uppercase font-mono text-[10px] tracking-widest flex items-center space-x-1">
                    <span>Active Decision State Engine (Observe - Think - Act)</span>
                    <RefreshCw className="h-3 w-3 animate-spin text-indigo-400" />
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Observe', 'Think', 'Act'].map((stage, i) => {
                      const latestStep = agentDecisionsLog.find(lg => lg.stage === stage);
                      return (
                        <div key={stage} className="p-3 rounded-lg border border-slate-850 bg-slate-950/40 text-left space-y-1">
                          <div className="flex justify-between items-center text-[10px] uppercase font-mono font-bold text-slate-450">
                            <span>Step 0{i+1}: {stage}</span>
                            <span className="text-slate-600 font-normal">{latestStep?.timestamp}</span>
                          </div>
                          <p className="font-semibold text-slate-300 leading-relaxed text-[11px]">
                            {latestStep ? latestStep.desc : 'Readying sensory buffer logs...'}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* OPTION 1: Follow configurations */}
            {selectedTab === 'follow' && (
              <div className="space-y-4" id="automation-tab-follow">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <UserPlus className="h-4.5 w-4.5 text-indigo-400" />
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display">Auto Follow / Unfollow Rules</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Target Niche Hashtag Seeds</label>
                    <input
                      type="text"
                      value={hashtags}
                      onChange={(e) => setHashtags(e.target.value)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-xs text-slate-200 focus:border-indigo-505"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Competitor Reference Handles</label>
                    <input
                      type="text"
                      value={competitors}
                      onChange={(e) => setCompetitors(e.target.value)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-xs text-slate-200 focus:border-indigo-505"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-slate-350 mb-1 font-semibold">
                    <span>Daily Outbound Follow Quota Quotas</span>
                    <span className="font-mono text-indigo-400">{maxFollowsPerDay} profiles</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={800}
                    step={25}
                    value={maxFollowsPerDay}
                    onChange={(e) => setMaxFollowsPerDay(Number(e.target.value))}
                    className="w-full h-1 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-850 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-semibold text-slate-200">Automatically unfollow non-followers</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Cleans up following arrays after 7 days elapsed.</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-indigo-500 focus:ring-0"
                  />
                </div>
              </div>
            )}

            {/* OPTION 2: Like Configurations */}
            {selectedTab === 'like' && (
              <div className="space-y-4" id="automation-tab-like">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <Heart className="h-4.5 w-4.5 text-indigo-400 animate-pulse" />
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display">Auto Like Outbound Engagements</h3>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs text-slate-350 mb-1 font-semibold">
                    <span>Daily Like Engagements Pool</span>
                    <span className="font-mono text-indigo-400">{maxLikesPerDay} posts</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={1000}
                    step={50}
                    value={maxLikesPerDay}
                    onChange={(e) => setMaxLikesPerDay(Number(e.target.value))}
                    className="w-full h-1 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1.5">
                    <h5 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">Target Priority Filters</h5>
                    <div className="space-y-1 text-[11px] text-slate-400">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-slate-800 focus:ring-0" />
                        <span>Exclude Private accounts</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-slate-800 focus:ring-0" />
                        <span>Require profile picture attached</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-slate-800 focus:ring-0" />
                        <span>Filter out verified accounts (protection)</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1.5">
                    <h5 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">Simulated delays</h5>
                    <div className="text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
                      <p>• Random block interval: <strong className="text-indigo-400">14s - 28s</strong></p>
                      <p>• Human simulation jitter rate: <strong className="text-indigo-400">8.4%</strong></p>
                      <p>This avoids basic browser fingerprint matching patterns entirely.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* OPTION 3: Comment Spintax dictionary configs */}
            {selectedTab === 'comment' && (
              <div className="space-y-4" id="automation-tab-comment">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <MessageSquare className="h-4.5 w-4.5 text-indigo-400" />
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display">Spintax Outbound Comment Tool</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Raw Spintax Text</label>
                    <textarea
                      value={spintaxInput}
                      onChange={(e) => setSpintaxInput(e.target.value)}
                      rows={2}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-xs text-slate-200 outline-none focus:border-indigo-500 font-sans leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-between items-center bg-slate-950 border border-slate-850 p-3 rounded-lg">
                    <button
                      onClick={handleTestSpintax}
                      className="px-3.5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow shadow-indigo-900/10 cursor-pointer"
                      type="button"
                    >
                      Test Parser Output
                    </button>
                    {spintaxOutput && (
                      <div className="text-xs text-indigo-400 italic font-medium truncate max-w-[320px]">
                        Parsed draft: "{spintaxOutput}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h5 className="text-xs font-semibold text-slate-200">Active Commentary Outbox Pool</h5>
                  <div className="space-y-1.5" id="automation-comments-outbound-pool">
                    {commentsList.map((c, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-950/40 border border-slate-850 text-xs font-sans text-slate-300">
                        <span>"{c}"</span>
                        <button
                          onClick={() => {
                            setCommentsList(commentsList.filter((_, i) => i !== idx));
                            toast.info('Comment option cleared');
                          }}
                          className="text-[10px] text-slate-500 hover:text-rose-400"
                          type="button"
                        >
                          Clear
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2 pt-1">
                    <input
                      type="text"
                      value={newCommentInput}
                      onChange={(e) => setNewCommentInput(e.target.value)}
                      placeholder="Add custom response string..."
                      className="flex-1 rounded-lg border border-slate-800 bg-slate-950 p-2 text-xs text-slate-200"
                    />
                    <button
                      onClick={handleAddComment}
                      className="px-3 py-1.5 rounded bg-slate-800 border border-slate-705 text-xs text-slate-200 hover:bg-slate-700"
                      type="button"
                    >
                      Append
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* OPTION 4: DM Outreach */}
            {selectedTab === 'dm' && (
              <div className="space-y-4" id="automation-tab-dm">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <Smartphone className="h-4.5 w-4.5 text-indigo-400" />
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display">Maverick Direct Message Outreach</h3>
                </div>

                <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/10 space-y-2">
                  <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono">DMs Dispatch Settings</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Trigger outbound welcome DMs on custom parameters, like automatic delay triggers (e.g. 10 mins post follow), or parsing recipient's first names from biography descriptors using the Maverick AI engine!
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <label className="flex items-center space-x-2 text-xs text-slate-300">
                      <input type="checkbox" defaultChecked className="rounded border-slate-800" />
                      <span>Welcome New Followers</span>
                    </label>
                    <label className="flex items-center space-x-2 text-xs text-slate-300">
                      <input type="checkbox" defaultChecked className="rounded border-slate-800" />
                      <span>Send Coupon on product DMs</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* OPTION 5: Story View Configs */}
            {selectedTab === 'story_view' && (
              <div className="space-y-4" id="automation-tab-story">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                  <Eye className="h-4.5 w-4.5 text-indigo-400" />
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display">Simulated Stories Viewer</h3>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950/40 text-xs text-slate-300 leading-relaxed">
                  <p className="font-semibold text-slate-200 mb-1">Mass Story Aggregation</p>
                  Simulates random feed actions during normal hours, viewing up to 400 targeted stories daily. This triggers profile back-checks and organic clicks from brand enthusiasts, driving up conversion counts frictionless.
                </div>
              </div>
            )}

            {/* Global bedtime Pause / Night Mode Scheduler panel */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4.5 w-4.5 text-amber-500" />
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Bedtime Jitter & Sleep Planner</h4>
                </div>
                <button
                  onClick={() => {
                    setNightMode(!nightMode);
                    toast.info(`Bedtime Planner now: ${!nightMode ? 'ENABLED' : 'DISABLED'}`);
                  }}
                  className={`h-5 w-10 rounded-full flex items-center transition-all ${
                    nightMode ? 'bg-indigo-600 justify-end' : 'bg-slate-850 justify-start'
                  }`}
                  type="button"
                >
                  <span className="h-4 w-4 rounded-full bg-slate-200" />
                </button>
              </div>

              {nightMode && (
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Outbound Ignition Hour</label>
                    <input
                      type="time"
                      value={startHour}
                      onChange={(e) => setStartHour(e.target.value)}
                      className="w-full rounded border border-slate-800 bg-slate-900 p-1.5 focus:border-indigo-500 outline-none text-slate-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Bedtime Suspension Hour</label>
                    <input
                      type="time"
                      value={endHour}
                      onChange={(e) => setEndHour(e.target.value)}
                      className="w-full rounded border border-slate-800 bg-slate-900 p-1.5 focus:border-indigo-500 outline-none text-slate-300 font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
