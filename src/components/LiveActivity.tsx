/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActivityLog } from '../types';
import { 
  Terminal, 
  Trash2, 
  Filter, 
  CircleDot, 
  ArrowRight, 
  CircleAlert, 
  BadgeCheck, 
  HelpCircle,
  EyeOff,
  Eye,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface LiveActivityProps {
  logs: ActivityLog[];
  onClearLogs: () => void;
  onRefreshLogs?: () => void;
}

export default function LiveActivity({ logs, onClearLogs, onRefreshLogs }: LiveActivityProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isMinimized, setIsMinimized] = useState(false);

  const filterOptions = [
    { label: 'All Logs', value: 'all' },
    { label: 'System', value: 'system' },
    { label: 'Follow/Unfollow', value: 'follow' },
    { label: 'Engagements', value: 'like' },
    { label: 'Content CMS', value: 'post_pub' },
    { label: 'SEO Analytics', value: 'seo' }
  ];

  const filteredLogs = logs.filter((log) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'like') return log.type === 'like' || log.type === 'comment' || log.type === 'dm';
    return log.type === activeFilter;
  });

  return (
    <aside
      className={`border-l border-slate-800 bg-slate-950 flex flex-col transition-all duration-300 ${
        isMinimized ? 'w-12' : 'w-80'
      }`}
      id="live-activity-sidebar-container"
    >
      {/* Sidebar Header bar with collapse button */}
      <div className="h-14 border-b border-slate-800 px-3 flex items-center justify-between flex-shrink-0 bg-slate-950/60 backdrop-blur-sm">
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="p-1 rounded bg-slate-900 border border-slate-800 text-indigo-400 hover:text-indigo-200 mx-auto"
            title="Expand Activity Stream"
            type="button"
          >
            <Eye className="h-4.5 w-4.5" />
          </button>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <Terminal className="h-4.5 w-4.5 text-indigo-400 animate-pulse" />
              <span className="text-xs font-bold text-slate-100 font-display uppercase tracking-wider">Live Activity Stream</span>
            </div>
            
            <div className="flex items-center space-x-1.5">
              {onRefreshLogs && (
                <button
                  onClick={onRefreshLogs}
                  className="p-1 text-slate-500 hover:text-slate-300 transition-colors rounded"
                  title="Force Feed Refresh"
                  type="button"
                >
                  <RefreshCw className="h-3 w-3" />
                </button>
              )}
              {logs.length > 0 && (
                <button
                  onClick={() => {
                    onClearLogs();
                    toast.success('Activity audit log purged');
                  }}
                  className="p-1 text-slate-500 hover:text-rose-400 transition-colors rounded"
                  title="Purge Active Logs"
                  type="button"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 text-slate-500 hover:text-slate-300 transition-colors rounded"
                title="Minimize Log stream"
                type="button"
              >
                <EyeOff className="h-3.5 w-3.5" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Sidebar Main Content Panel */}
      {!isMinimized ? (
        <div className="flex-1 flex flex-col min-h-0 bg-slate-950">
          {/* Quick Filters */}
          <div className="p-3 border-b border-slate-900 flex-shrink-0">
            <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold block mb-1.5">
              Category Filter
            </label>
            <div className="flex flex-wrap gap-1">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setActiveFilter(opt.value)}
                  className={`text-[9px] px-2 py-0.5 rounded font-mono border transition-all ${
                    activeFilter === opt.value
                      ? 'bg-indigo-600 text-white border-indigo-500/30 font-semibold'
                      : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                  type="button"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scrolling Events Feed */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0" id="activity-log-infinite-stream">
            <AnimatePresence initial={false}>
              {filteredLogs.length > 0 ? (
                filteredLogs.slice().reverse().map((log) => {
                  const stamp = new Date(log.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  });

                  // Log status mapping: error, warning, success, info
                  const isError = log.status === 'error';
                  const isWarning = log.status === 'warning';
                  const isSuccess = log.status === 'success';

                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: 'auto', scale: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`p-2.5 rounded-lg border text-[11px] font-mono leading-relaxed group transition-all text-left ${
                        isError
                          ? 'bg-rose-500/5 border-rose-500/25 text-rose-300'
                          : isWarning
                          ? 'bg-amber-500/5 border-amber-500/25 text-amber-300'
                          : isSuccess
                          ? 'bg-emerald-500/5 border-emerald-500/25 text-emerald-300'
                          : 'bg-slate-900/30 border-slate-850 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1 opacity-75">
                        <span className="text-[9px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-indigo-300 flex items-center space-x-1">
                          <CircleDot className={`h-2 w-2 mr-1 animate-pulse-slow ${
                            isError ? 'text-rose-500' : isWarning ? 'text-amber-500' : isSuccess ? 'text-emerald-500' : 'text-indigo-400'
                          }`} />
                          {log.type.toUpperCase()} {log.platform ? `@${log.platform}` : ''}
                        </span>
                        <span>{stamp}</span>
                      </div>
                      
                      <p className="font-sans line-clamp-3 text-slate-300 leading-snug">{log.message}</p>
                      
                      {log.accountName && (
                        <div className="mt-1 flex items-center space-x-1 opacity-60">
                          <span className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700/60 font-medium">
                            {log.accountName}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-xs text-slate-600 font-sans" id="activity-empty-display">
                  <Cpu className="h-6 w-6 text-slate-800 mx-auto mb-1 animate-spin-slow" />
                  No events recorded under active filters
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Stream active ticker footprint */}
          <div className="p-2.5 border-t border-slate-900 flex items-center justify-between bg-slate-950/60 text-[9px] font-mono text-slate-500">
            <span>Core: Online</span>
            <div className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
              <span>Rotator sticky</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-start items-center space-y-4 pt-12 text-slate-600 bg-slate-950">
          <Terminal className="h-4.5 w-4.5 animate-pulse" />
          <div className="h-1 w-1 bg-indigo-500 rounded-full animate-ping" />
        </div>
      )}
    </aside>
  );
}
