/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserSession, ActivityLog } from './types';
import { seedLocalStorage, AI_MODELS_POOL } from './lib/mockData';

// Component imports
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LiveActivity from './components/LiveActivity';
import ModelSelector from './components/ModelSelector';

// View imports
import Login from './views/Login';
import Overview from './views/Overview';
import Accounts from './views/Accounts';
import Automation from './views/Automation';
import Targeting from './views/Targeting';
import Scheduler from './views/Scheduler';
import BlogCMS from './views/BlogCMS';
import SocialHub from './views/SocialHub';
import SEO from './views/SEO';
import Email from './views/Email';
import Campaigns from './views/Campaigns';
import Competitors from './views/Competitors';
import ProductsVisitors from './views/ProductsVisitors';
import Proxies from './views/Proxies';
import Admin from './views/Admin';

import { Toaster, toast } from 'sonner';

export default function App() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [activeSearch, setActiveSearch] = useState<string>('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedModelId, setSelectedModelId] = useState<string>(AI_MODELS_POOL[1].id); // Default NVIDIA Nemotron
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  // 1. Initial Seeding and Context recovery
  useEffect(() => {
    seedLocalStorage();
    
    // Recovery session state
    const savedUser = localStorage.getItem('nexus_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.isAuthenticated) {
          setSession({
            email: parsed.email,
            role: parsed.role,
            impersonatingClientUrl: parsed.impersonatingClientUrl || null
          });
        }
      } catch (e) {
        console.error('Session recovery failed', e);
      }
    }

    // Recover Theme setting
    const savedTheme = localStorage.getItem('nexus_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      updateDomTheme(savedTheme);
    } else {
      updateDomTheme('dark');
    }

    // Recover Model selection
    const savedModel = localStorage.getItem('nexus_active_model');
    if (savedModel) {
      setSelectedModelId(savedModel);
    }

    // Recover Activity Logs
    const initialLogs = localStorage.getItem('nexus_logs');
    if (initialLogs) {
      try {
        setLogs(JSON.parse(initialLogs));
      } catch (e) {
        setLogs([]);
      }
    }
  }, []);

  const updateDomTheme = (newTheme: 'dark' | 'light') => {
    const root = document.documentElement;
    if (newTheme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    updateDomTheme(nextTheme);
    localStorage.setItem('nexus_theme', nextTheme);
    toast.info(`Switched to ${nextTheme.toUpperCase()} mood profile`);
  };

  // 2. Logger Handler
  const handlePostNewLog = (
    message: string, 
    type: 'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'post_pub' | 'system' | 'seo', 
    status: 'success' | 'warning' | 'error' | 'info'
  ) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      timestamp: new Date().toISOString(),
      message,
      type,
      status
    };

    const currentLogs = [...logs, newLog].slice(-65); // Cap to 65 elements
    setLogs(currentLogs);
    localStorage.setItem('nexus_logs', JSON.stringify(currentLogs));
  };

  const handleClearLogs = () => {
    setLogs([]);
    localStorage.setItem('nexus_logs', JSON.stringify([]));
  };

  // 3. Authenticate Actions
  const handleLoginSuccess = (email: string, role: 'admin' | 'user') => {
    const userState = { email, role, isAuthenticated: true };
    localStorage.setItem('nexus_user', JSON.stringify(userState));
    setSession({ email, role, impersonatingClientUrl: null });
    setActiveSection('overview');
    handlePostNewLog(`Operator ${email} authenticated into workspace scope successfully.`, 'system', 'success');
  };

  const handleLogout = () => {
    const defaultState = { email: '', role: 'user', isAuthenticated: false };
    localStorage.setItem('nexus_user', JSON.stringify(defaultState));
    setSession(null);
    setActiveSection('overview');
  };

  // Impersonating Client Callback
  const handleImpersonate = (clientEmail: string) => {
    const userState = { 
      email: clientEmail, 
      role: 'user' as const, 
      isAuthenticated: true,
      impersonatingClientUrl: 'https://dietmaven.ca' 
    };
    localStorage.setItem('nexus_user', JSON.stringify(userState));
    setSession({ 
      email: clientEmail, 
      role: 'user', 
      impersonatingClientUrl: 'https://dietmaven.ca' 
    });
    setActiveSection('overview');
    handlePostNewLog(`Administrator triggered client impersonation mapping for: dietsmaven.ca`, 'system', 'warning');
  };

  const handleSelectModel = (modelId: string) => {
    setSelectedModelId(modelId);
    localStorage.setItem('nexus_active_model', modelId);
    const modelObj = AI_MODELS_POOL.find(m => m.id === modelId);
    if (modelObj) {
      toast.success(`Hotswapped active generative framework to ${modelObj.name}`);
      handlePostNewLog(`Selected system-wide active reasoning engine: ${modelObj.name}`, 'system', 'info');
    }
  };

  // 4. View Switcher Renderer
  const renderCurrentView = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview onNavigateTo={(s) => setActiveSection(s)} onPostNewLog={handlePostNewLog} />;
      case 'accounts':
        return <Accounts onPostNewLog={handlePostNewLog} />;
      case 'automation':
        return <Automation onPostNewLog={handlePostNewLog} />;
      case 'targeting':
        return <Targeting onPostNewLog={handlePostNewLog} />;
      case 'scheduler':
        return <Scheduler onPostNewLog={handlePostNewLog} />;
      case 'blogcms':
        return <BlogCMS selectedModelId={selectedModelId} onPostNewLog={handlePostNewLog} />;
      case 'socialhub':
        return <SocialHub onPostNewLog={handlePostNewLog} />;
      case 'seoaeogeo':
        return <SEO onPostNewLog={handlePostNewLog} />;
      case 'emailmarketing':
        return <Email onPostNewLog={handlePostNewLog} />;
      case 'campaigns':
        return <Campaigns />;
      case 'competitors':
        return <Competitors />;
      case 'productsvisitors':
        return <ProductsVisitors />;
      case 'proxies':
        return <Proxies onPostNewLog={handlePostNewLog} />;
      case 'adminpanel':
        if (session?.role !== 'admin') {
          return (
            <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400 font-sans" id="access-denied-node">
              <span className="text-xl font-bold text-rose-500 mb-2">Access Restriced</span>
              <p className="text-xs">You require administrative master privileges to view structural settings.</p>
            </div>
          );
        }
        return <Admin onPostNewLog={handlePostNewLog} onImpersonate={handleImpersonate} />;
      default:
        return <Overview onNavigateTo={(s) => setActiveSection(s)} onPostNewLog={handlePostNewLog} />;
    }
  };

  // If user is unauthenticated, bind Login View
  if (!session) {
    return (
      <div className="app-shell" id="app-landing-root">
        <Login onLoginSuccess={handleLoginSuccess} />
        <Toaster theme="dark" position="bottom-right" modal={false} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen text-slate-100 flex flex-col font-sans transition-colors duration-350 ${
      theme === 'dark' ? 'bg-[#0A0A0F]' : 'bg-slate-50 text-slate-900'
    }`} id="nexus-application-root">
      
      {/* Navbar segment */}
      <Navbar
        session={session}
        onLogout={handleLogout}
        activeSearch={activeSearch}
        onSearchChange={setActiveSearch}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onNavigateToSection={(s) => setActiveSection(s)}
      />

      <div className="flex flex-1 overflow-hidden" id="nexus-main-workspace-grid">
        
        {/* Sidebar segment */}
        <Sidebar
          session={session}
          activeSection={activeSection}
          onNavigate={(sectionId) => setActiveSection(sectionId)}
        />

        {/* Content workspace window */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-6 bg-slate-950/20" id="nexus-view-node">
          
          {/* Universal Model Selector element and statistics header */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4" id="universal-framework-panel">
            <div className="text-left">
              <span className="text-[10px] text-indigo-400 uppercase font-mono tracking-widest font-semibold block mb-0.5">Active Tenant Namespace</span>
              <h3 className="text-sm font-semibold text-slate-205 flex items-center space-x-1.5 leading-none">
                <span>Enterprise Host:</span>
                <strong className="text-slate-100">{session.email}</strong>
              </h3>
            </div>
            
            {/* Global generative model chooser */}
            <ModelSelector
              selectedModelId={selectedModelId}
              onSelectModel={handleSelectModel}
              className="w-full md:w-80"
            />
          </div>

          <div className="focus-target-view" id="active-route-viewport-mount">
            {renderCurrentView()}
          </div>
        </main>

        {/* Live Activity right-hand stream component (satisfies QA Bug 1) */}
        <LiveActivity
          logs={logs}
          onClearLogs={handleClearLogs}
          onRefreshLogs={() => {
            const initialLogs = localStorage.getItem('nexus_logs');
            if (initialLogs) {
              setLogs(JSON.parse(initialLogs));
            }
            toast.success('Pushed audit streams to sync state');
          }}
        />

      </div>

      <Toaster theme={theme === 'dark' ? 'dark' : 'light'} position="bottom-right" modal={false} />
    </div>
  );
}
