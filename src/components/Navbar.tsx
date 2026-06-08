/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserSession, ActivityLog } from '../types';
import { 
  Bell, 
  Search, 
  Sun, 
  Moon, 
  LogOut, 
  ShieldAlert, 
  User, 
  Trash2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface NavbarProps {
  session: UserSession;
  onLogout: () => void;
  activeSearch: string;
  onSearchChange: (val: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Navbar({
  session,
  onLogout,
  activeSearch,
  onSearchChange,
  theme,
  onToggleTheme,
  onNavigateToSection
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  // Periodically fetch notifications from logs
  useEffect(() => {
    const fetchLogs = () => {
      const stored = localStorage.getItem('nexus_logs');
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as ActivityLog[];
          // Filter warning/error log states as notifications or display recent logs
          setLogs(parsed.slice().reverse().slice(0, 8)); // Grab top 8 recent
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetchLogs();
    const interval = setInterval(fetchLogs, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleClearNotifications = () => {
    localStorage.setItem('nexus_logs', JSON.stringify([]));
    setLogs([]);
    toast.success('Notification feed cleared successfully');
    setShowNotifications(false);
  };

  const storedFlags = localStorage.getItem('nexus_feature_flags');
  const flags = storedFlags ? JSON.parse(storedFlags) : {};

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md" id="global-navbar-header">
      {/* Impersonation Banner */}
      {session.impersonatingClientUrl && (
        <div className="w-full bg-amber-500/10 border-b border-amber-500/20 text-amber-400 px-4 py-1.5 flex items-center justify-between text-xs font-mono" id="impersonation-alert-banner">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="h-4 w-4 text-amber-500 animate-pulse" />
            <span>
              Impersonating client space for: <strong className="underline text-slate-100">{session.impersonatingClientUrl}</strong>
            </span>
          </div>
          <button
            onClick={() => onLogout()} // Log out clears impersonation
            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-[10px]"
            type="button"
          >
            <span>Exit Impersonation</span>
            <ExternalLink className="h-2 w-2" />
          </button>
        </div>
      )}

      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigateToSection('overview')} id="navbar-brand-logo">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-slate-100 shadow glow-border-indigo">
            <Sparkles className="h-5 w-5" />
            <div className="absolute -bottom-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 border border-slate-950">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-ping" />
            </div>
          </div>
          <div>
            <h1 className="text-md font-bold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300">
              NexusForge <span className="text-xs text-indigo-400 font-mono">AI</span>
            </h1>
            <p className="text-[9px] text-slate-400 font-mono uppercase tracking-widest leading-none">Enterprise Suite</p>
          </div>
        </div>

        {/* Global Search bar */}
        <div className="hidden max-w-md flex-1 px-8 md:block relative" id="global-search-container">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={activeSearch}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search features, accounts, tools..."
              className="w-full rounded-lg border border-slate-800 bg-slate-900/60 py-1.5 pl-10 pr-4 text-xs text-slate-200 outline-none focus:border-indigo-500/80 focus:bg-slate-900/90 transition-all"
            />
            {activeSearch && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-2 text-[10px] text-slate-500 hover:text-slate-200"
                type="button"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3" id="navbar-control-actions">
          {/* Theme custom Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1 px-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 text-slate-300 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            type="button"
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 text-slate-300 transition-colors"
              type="button"
              id="notification-bell-btn"
            >
              <Bell className="h-4 w-4" />
              {logs.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2 rounded-full bg-indigo-500" />
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-800 bg-slate-950 p-4 shadow-2xl shadow-indigo-950/30 z-50"
                    id="notification-dropdown-panel"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                      <div className="flex items-center space-x-1">
                        <Bell className="h-4 w-4 text-indigo-400" />
                        <h4 className="text-xs font-bold text-slate-100">Live Notifications</h4>
                      </div>
                      {logs.length > 0 && (
                        <button
                          onClick={handleClearNotifications}
                          className="text-[10px] text-slate-400 hover:text-rose-400 flex items-center space-x-1"
                          type="button"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Clear All</span>
                        </button>
                      )}
                    </div>

                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1" id="notification-items-list">
                      {logs.length > 0 ? (
                        logs.map((log) => {
                          const isError = log.status === 'error';
                          const isWarning = log.status === 'warning';
                          const isSuccess = log.status === 'success';

                          return (
                            <div
                              key={log.id}
                              className={`p-2 rounded-lg text-[11px] leading-relaxed border ${
                                isError
                                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                                  : isWarning
                                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                                  : isSuccess
                                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                                  : 'bg-slate-900/50 border-slate-800 text-slate-300'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-[9px] uppercase opacity-75">
                                  {log.type} {log.platform ? `- ${log.platform}` : ''}
                                </span>
                                <span className="text-[8px] opacity-50 font-mono">
                                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="line-clamp-2">{log.message}</p>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-6 text-xs text-slate-500">
                          No notifications or warnings on file.
                        </div>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* User badge */}
          <div className="flex items-center space-x-2 border-l border-slate-800 pl-3 ml-2" id="navbar-user-menu-group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-indigo-400">
              <User className="h-4 w-4" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-slate-200 truncate max-w-[120px]" title={session.email}>
                {session.role === 'admin' ? '🔥 System Admin' : 'demo@nexusforge.ai'}
              </p>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider leading-none uppercase">
                {session.role} Workspace
              </p>
            </div>
            
            {/* Quick Logout Button */}
            <button
              onClick={() => {
                onLogout();
                toast.success('Logged out successfully');
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900/80 transition-colors"
              title="Sign Out of Session"
              type="button"
              id="navbar-logout-btn"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
