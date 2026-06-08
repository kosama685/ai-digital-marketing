/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AI_MODELS_POOL } from '../lib/mockData';
import { AIModelDetails } from '../types';
import { Sparkles, Search, Check, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

interface ModelSelectorProps {
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
  className?: string;
}

export default function ModelSelector({ selectedModelId, onSelectModel, className = '' }: ModelSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const selectedModel = AI_MODELS_POOL.find((m) => m.id === selectedModelId) || AI_MODELS_POOL[0];

  const filteredModels = AI_MODELS_POOL.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.capability.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`relative ${className}`} id="global-model-selector-container">
      <label className="block text-xs font-medium text-slate-400 mb-1">Active AI Generative Engine</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-900 transition-colors text-left"
        id="model-selector-dropdown-btn"
        type="button"
      >
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-sm font-semibold text-slate-200">{selectedModel.name}</span>
              <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60 font-mono">
                {selectedModel.provider}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[220px]">{selectedModel.description}</p>
          </div>
        </div>
        <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse flex-shrink-0 ml-2" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop lock */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
            id="model-selector-backdrop"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-0 right-0 mt-2 p-3 rounded-xl border border-slate-800 bg-slate-950/95 shadow-2x shadow-indigo-950/40 backdrop-blur-md z-50 max-h-[360px] overflow-y-auto"
            id="model-selector-dropdown-panel"
          >
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search AI models, providers, credentials..."
                className="w-full pl-8 pr-3 py-1.5 rounded-md border border-slate-800 bg-slate-900/50 text-xs focus:outline-none focus:border-indigo-500/80 text-slate-100"
              />
            </div>

            <div className="space-y-1.5" id="model-pool-list">
              {filteredModels.length > 0 ? (
                filteredModels.map((model) => {
                  const isSelected = model.id === selectedModelId;
                  return (
                    <button
                      key={model.id}
                      onClick={() => {
                        onSelectModel(model.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-start justify-between p-2 rounded-lg text-left transition-colors border ${
                        isSelected
                          ? 'bg-indigo-505/10 border-indigo-500/30 text-indigo-300'
                          : 'bg-slate-900/30 border-transparent hover:bg-slate-900/80 text-slate-300'
                      }`}
                      type="button"
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                          <span className="text-xs font-semibold text-slate-200">{model.name}</span>
                          <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700/60 text-slate-400">
                            {model.provider}
                          </span>
                          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded ml-auto">
                            ★ {model.ratingScore}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{model.description}</p>
                        
                        <div className="flex items-center space-x-1 mt-1.5 flex-wrap gap-y-1">
                          {model.capability.map((cap, i) => (
                            <span
                              key={i}
                              className="text-[8px] tracking-wide px-1 rounded bg-slate-900 text-indigo-400 border border-slate-800"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="h-4 w-4 text-indigo-400 flex-shrink-0 self-center ml-1" />
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-4 text-xs text-slate-500">No AI models match this query</div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
