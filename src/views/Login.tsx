/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserSession } from '../types';
import { Shield, Sparkles, Mail, Lock, CheckCircle2, UserCheck } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

interface LoginProps {
  onLoginSuccess: (email: string, role: 'admin' | 'user') => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in both email and password credentials.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Admin matching
      if (email === 'admin@nexusforge.ai' && password === 'admin2026') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        toast.success('Admin privileges successfully authenticated!');
        onLoginSuccess(email, 'admin');
      } 
      // User matching
      else if (email === 'demo@nexusforge.ai' && password === 'demo2026') {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        toast.success('Welcome back to NexusForge AI Workspace');
        onLoginSuccess(email, 'user');
      } else {
        toast.error('Invalid credentials! Hint: Use admin@nexusforge.ai / admin2026 or demo@nexusforge.ai / demo2026');
      }
    }, 1000);
  };

  const fillCredentials = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      setEmail('admin@nexusforge.ai');
      setPassword('admin2026');
    } else {
      setEmail('demo@nexusforge.ai');
      setPassword('demo2026');
    }
    toast.info(`Filled credentials for: ${role}`);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 bg-radial from-slate-900 to-[#0A0A0F] overflow-hidden" id="login-layout-wrapper">
      {/* Absolute floating background shapes */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel p-8 rounded-2xl border border-slate-800 shadow-2xl relative z-10"
        id="login-card-container"
      >
        {/* Card Logo header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 text-slate-100 shadow-lg mb-3">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-slate-100">
            NexusForge <span className="text-indigo-400">AI</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Multi-Platform Automated Social & SEO Intelligence Suite
          </p>
        </div>

        {/* Authenticate Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Coordinates</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@nexusforge.ai"
                className="w-full rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 pl-10 text-sm text-slate-200 outline-none focus:border-indigo-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Password Phrase</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 pl-10 text-sm text-slate-200 outline-none focus:border-indigo-500 transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-all font-semibold text-sm text-white flex items-center justify-center space-x-2 shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] cursor-pointer disabled:opacity-50"
            id="login-submit-btn"
          >
            {isLoading ? (
              <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>
                <Shield className="h-4 w-4" />
                <span>Decrypt & Login</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Assist Coordinates */}
        <div className="mt-8 border-t border-slate-850 pt-5 text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Operator Access Hotkeys
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => fillCredentials('user')}
              className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-indigo-500/40 text-xs hover:text-indigo-300 transition-all"
              type="button"
              id="quick-fill-user-btn"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Co-Operator</span>
            </button>
            <button
              onClick={() => fillCredentials('admin')}
              className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-amber-500/40 text-xs hover:text-amber-400 transition-all"
              type="button"
              id="quick-fill-admin-btn"
            >
              <Shield className="h-3.5 w-3.5" />
              <span>Full Admin</span>
            </button>
          </div>
          <div className="text-[10px] text-slate-500 mt-4 leading-relaxed bg-slate-900/30 py-1.5 rounded border border-slate-850 font-mono">
            Credentials survive session reload locally.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
