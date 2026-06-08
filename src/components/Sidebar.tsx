/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserSession } from '../types';
import { 
  LayoutDashboard, 
  Contact, 
  Cpu, 
  Target, 
  Calendar, 
  FileEdit, 
  Share2, 
  SearchCode, 
  Mail, 
  Kanban, 
  Swords, 
  Package, 
  Globe, 
  ShieldAlert, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  ActivitySquare
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  session: UserSession;
  activeSection: string;
  onNavigate: (section: string) => void;
  collapsed?: boolean;
}

export default function Sidebar({ session, activeSection, onNavigate }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuGroups = [
    {
      title: 'Core Engine',
      items: [
        { id: 'overview', name: 'Dashboard Overview', icon: LayoutDashboard },
        { id: 'accounts', name: 'Social Accounts', icon: Contact },
        { id: 'automation', name: 'Automation Engine', icon: Cpu }
      ]
    },
    {
      title: 'Growth & Planning',
      items: [
        { id: 'targeting', name: 'Targeting & Scraper', icon: Target },
        { id: 'scheduler', name: 'Unified Calendar', icon: Calendar }
      ]
    },
    {
      title: 'CMS & Organic SEO',
      items: [
        { id: 'blogcms', name: 'Blog CMS AI Pilot', icon: FileEdit },
        { id: 'socialhub', name: 'Social Platform Hub', icon: Share2 },
        { id: 'seoaeogeo', name: 'SEO/AEO Site Analyzer', icon: SearchCode }
      ]
    },
    {
      title: 'Marketing Systems',
      items: [
        { id: 'emailmarketing', name: 'Email Workflows', icon: Mail },
        { id: 'campaigns', name: 'Campaign Tracker', icon: Kanban },
        { id: 'competitors', name: 'Competitor Intel', icon: Swords }
      ]
    },
    {
      title: 'Infrastructure',
      items: [
        { id: 'productsvisitors', name: 'Products & Visitors', icon: Package },
        { id: 'proxies', name: 'Proxy & Latencies', icon: Globe }
      ]
    }
  ];

  const adminGroup = {
    title: 'Governance',
    items: [
      { id: 'adminpanel', name: 'Admin Console', icon: ShieldAlert }
    ]
  };

  return (
    <aside
      className={`relative h-[calc(100vh-64px)] border-r border-slate-800 bg-slate-950 transition-all duration-300 flex flex-col flex-shrink-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      id="global-sidebar-panel"
    >
      {/* Scrollable menu slots */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 pt-4 select-none">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!isCollapsed && (
              <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase px-2 py-1 font-mono">
                {group.title}
              </p>
            )}
            <nav className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center rounded-lg px-2.5 py-2 text-xs font-medium transition-all duration-200 outline-none ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/10'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                    type="button"
                    title={isCollapsed ? item.name : ''}
                  >
                    <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-2.5'}`} />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}

        {/* Conditional Admin Area */}
        {session.role === 'admin' && (
          <div className="space-y-1 pt-2 border-t border-slate-800/60">
            {!isCollapsed && (
              <p className="text-[10px] font-bold text-amber-500 tracking-wider uppercase px-2 py-1 font-mono">
                {adminGroup.title}
              </p>
            )}
            <nav className="space-y-0.5 animate-pulse-slow">
              {adminGroup.items.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center rounded-lg px-2.5 py-2 text-xs font-semibold transition-all duration-200 outline-none border ${
                      isActive
                        ? 'bg-amber-500 border-amber-600 text-slate-950 hover:bg-amber-400'
                        : 'text-amber-400 border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10'
                    }`}
                    type="button"
                    title={isCollapsed ? item.name : ''}
                  >
                    <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-2.5'}`} />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Collapse Action triggers */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800 transition-colors"
          type="button"
          id="sidebar-collapse-trigger-btn"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : (
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200">
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse Sidebar</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
