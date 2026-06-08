/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LineChart, BarChart, TrendingUp, Download, PieChart, Info, HelpCircle, Activity, Sparkles, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface AnalyticsProps {
  onPostNewLog: (message: string, type: 'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'post_pub' | 'system' | 'seo', status: 'success' | 'warning' | 'error' | 'info') => void;
}

export default function Analytics({ onPostNewLog }: AnalyticsProps) {
  const [calcFollowers, setCalcFollowers] = useState('24000');
  const [calcInteractions, setCalcInteractions] = useState('1200');
  const [selectedRange, setSelectedRange] = useState('30d');

  // Computed engagement
  const computedEr = parseFloat(calcFollowers) > 0 
    ? ((parseFloat(calcInteractions) / parseFloat(calcFollowers)) * 100).toFixed(2) 
    : '0';

  const triggerCSVReportDownload = () => {
    toast.info('Synthesizing active performance metrics...');
    setTimeout(() => {
      onPostNewLog('Successfully compiled and exported Monthly Growth PDF/CSV report tables.', 'system', 'success');
      toast.success('Successfully downloaded core channel CSV audits!');
    }, 1205);
  };

  return (
    <div className="space-y-6" id="analytics-view-container">
      {/* View Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4" id="analytics-header-group">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center space-x-2">
            <TrendingUp className="h-4.5 w-4.5 text-indigo-400" />
            <span>Outbound Growth Analytics & Performance</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time aggregate conversion ratios, platform comparison lists, engagement metrics, and PDF reporting capabilities.
          </p>
        </div>
        <button
          onClick={triggerCSVReportDownload}
          className="flex items-center space-x-1 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-505 text-xs font-semibold text-white shadow shadow-indigo-900/10 cursor-pointer"
          type="button"
          id="export-metrics-btn"
        >
          <Download className="h-4 w-4 mr-1" />
          <span>Export Workspace metrics</span>
        </button>
      </div>

      {/* Main Stats with charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Growth line Chart (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left">
            <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-4">
              <div className="flex items-center space-x-2">
                <LineChart className="h-4 w-4 text-indigo-400" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">Organic Subscriber Scaling</h4>
              </div>
              <div className="flex space-x-1">
                {['7d', '30d', '90d'].map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedRange(r)}
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${
                      selectedRange === r 
                        ? 'bg-indigo-600 text-white border-indigo-500/20' 
                        : 'bg-slate-950 border-slate-850 text-slate-400'
                    }`}
                    type="button"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom SVG line Chart */}
            <div className="relative pt-4" id="organic-growth-chart-slot">
              <svg className="w-full h-52 text-indigo-550" viewBox="0 0 500 150">
                {/* Grid guidelines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#1F2937" strokeLinecap="round" strokeDasharray="3" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="#1F2937" strokeLinecap="round" strokeDasharray="3" />
                <line x1="0" y1="120" x2="500" y2="120" stroke="#1F2937" strokeLinecap="round" strokeDasharray="3" />

                {/* Plot Area Gradient filling */}
                <defs>
                  <linearGradient id="indigo-chart-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,135 Q75,110 150,95 T300,60 T450,22 T500,10 L500,150 L0,150 Z" fill="url(#indigo-chart-fill)" />

                {/* Render path line */}
                <path d="M0,135 Q75,110 150,95 T300,60 T450,22 T500,10" fill="none" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />

                {/* Hover dots highlights */}
                <circle cx="150" cy="95" r="4" fill="#6366F1" stroke="#E2E8F0" strokeWidth="1.5" />
                <circle cx="300" cy="60" r="4" fill="#6366F1" stroke="#E2E8F0" strokeWidth="1.5" />
                <circle cx="450" cy="22" r="4" fill="#6366F1" stroke="#E2E8F0" strokeWidth="1.5" />
              </svg>

              <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono mt-2 uppercase">
                <span>Month Start</span>
                <span>Day 15 mid</span>
                <span>Current date</span>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Rate Calculator Sidebar (Right 1 col) */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4">
            <div className="flex items-center space-x-1.5 border-b border-slate-800 pb-2 mb-2">
              <Activity className="h-4.5 w-4.5 text-indigo-400 animate-pulse-slow" />
              <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono">
                Outbound Engagement Calculator
              </h3>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Real-time calculation tracking metrics based on core user actions. Let\'s evaluate our optimization coefficient.
            </p>

            <div className="space-y-3 pt-1 text-xs">
              <div>
                <label className="text-[10px] text-slate-500 block mb-1 uppercase font-mono">Total Followers Base</label>
                <input
                  type="number"
                  value={calcFollowers}
                  onChange={(e) => setCalcFollowers(e.target.value)}
                  className="w-full rounded border border-slate-850 bg-slate-950 p-2 focus:border-indigo-500 outlined-none font-mono text-slate-200"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 block mb-1 uppercase font-mono">Outbound Interactions (Likes/Clicks)</label>
                <input
                  type="number"
                  value={calcInteractions}
                  onChange={(e) => setCalcInteractions(e.target.value)}
                  className="w-full rounded border border-slate-850 bg-slate-950 p-2 focus:border-indigo-500 outlined-none font-mono text-slate-200"
                />
              </div>

              <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20 text-center font-mono space-y-1.5">
                <p className="text-[9px] text-slate-500 uppercase">Estimated Engagement Coefficient</p>
                <h4 className="text-2xl font-bold font-sans text-indigo-400">
                  {computedEr}%
                </h4>
                <div className="text-[9.5px] text-slate-400 italic">
                  {parseFloat(computedEr) > 5 ? '🎯 High Brand Velocity!' : '🌱 Steady Ramping state'}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
