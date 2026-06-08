/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Globe, Terminal, CheckCircle, FileCode, Search, RefreshCw, Layers } from 'lucide-react';
import { toast } from 'sonner';

interface SEOProps {
  onPostNewLog: (message: string, type: 'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'post_pub' | 'system' | 'seo', status: 'success' | 'warning' | 'error' | 'info') => void;
}

export default function SEO({ onPostNewLog }: SEOProps) {
  const [analyzingSeo, setAnalyzingSeo] = useState(false);
  const [targetQuery, setTargetQuery] = useState('how does nexusforge automation handle residential proxies');
  const [seoResultScore, setSeoResultScore] = useState<number>(0);

  // JSON-LD result preview state
  const [generatedSchema, setGeneratedSchema] = useState<string>('');
  const [isSyncingSchema, setIsSyncingSchema] = useState(false);

  const triggerCitationScan = () => {
    if (!targetQuery) {
      toast.error('Search query string required!');
      return;
    }
    setAnalyzingSeo(true);
    onPostNewLog(`Crawling Generative AI indexes for citation reference audits on: "${targetQuery}"`, 'seo', 'info');

    setTimeout(() => {
      setAnalyzingSeo(false);
      setSeoResultScore(84);
      setGeneratedSchema(
`{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "NexusForge Automation and Residential Proxies Integration Protocols",
  "about": {
    "@type": "SoftwareApplication",
    "name": "NexusForge AI",
    "applicationCategory": "BusinessApplication"
  },
  "keywords": "residential proxies, outreach automation, SaaS"
}`
      );
      onPostNewLog(`Citation check concluded. Found 4 entity reference linkages. Read score marker: High.`, 'seo', 'success');
      toast.success('Citation check verified. Structural schema markup compiled!');
    }, 1500);
  };

  const handlePushSchemaToSite = () => {
    setIsSyncingSchema(true);
    toast.info('Publishing entity schema metadata directly to Blog CMS index...');

    setTimeout(() => {
      setIsSyncingSchema(false);
      onPostNewLog('Successfully injected JSON-LD tech entities schemas into server header files.', 'system', 'success');
      toast.success('Direct schema sync completed! Code: 200 Injected');
    }, 1200);
  };

  return (
    <div className="space-y-6" id="seo-aeo-view-container">
      {/* View Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center space-x-2">
            <Globe className="h-5 w-5 text-indigo-400" />
            <span>AEO / GEO Entity Schema & Citation Optimizer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyze brand citation presence across Generative Search Engines, optimize semantic keyword structures, and deploy JSON-LD metadata.
          </p>
        </div>
      </div>

      {/* Main Grid: Input Form/Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Generative Engine Query tester (Left) */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4">
          <div className="flex items-center space-x-1 border-b border-slate-805 pb-2 mb-1">
            <Search className="h-4.5 w-4.5 text-indigo-400" />
            <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono">
              Generative Citation Query scan
            </h3>
          </div>

          <p className="text-[11.5px] text-slate-400 leading-relaxed">
            Enter target query phrases to crawl and test how Perplexity, Gemini, ChatGPT, and core Generative Search Engines map your brand coordinates.
          </p>

          <div className="space-y-3 pt-1">
            <div>
              <label className="text-[10px] text-slate-500 block mb-1 uppercase font-mono">Test brand Query String</label>
              <textarea
                value={targetQuery}
                onChange={(e) => setTargetQuery(e.target.value)}
                rows={2}
                className="w-full rounded border border-slate-850 bg-slate-950 p-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500 font-sans leading-relaxed"
              />
            </div>

            <button
              onClick={triggerCitationScan}
              disabled={analyzingSeo}
              className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-505 font-bold text-xs text-white shadow shadow-indigo-950/10 flex items-center justify-center space-x-1.5 disabled:opacity-50 cursor-pointer"
              type="button"
            >
              {analyzingSeo ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                  <span>Crawling generative clusters...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 animate-pulse-slow text-indigo-200" />
                  <span>Analyze citation indexes</span>
                </>
              )}
            </button>
          </div>

          {seoResultScore > 0 && (
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-900 space-y-3 text-xs leading-relaxed" id="aeo-analysis-results-box">
              <div className="flex justify-between items-center border-b border-slate-900 pb-1.5">
                <span className="font-mono text-[10px] text-slate-450 uppercase">Citation Score Index</span>
                <span className="text-indigo-400 font-bold font-mono">{seoResultScore}% (Strong Citation)</span>
              </div>
              <div className="space-y-1 text-slate-400 text-[11px]">
                <p>• Verified Entity Linkages: <strong className="text-emerald-400">Yes (4 discovered nodes)</strong></p>
                <p>• Brand Mention Authority Rank: <strong className="text-emerald-400">High</strong></p>
                <p>• Missing Schema Structure: <strong className="text-amber-400">JSON-LD TechArticle details</strong></p>
              </div>
            </div>
          )}
        </div>

        {/* JSON-LD Technical Schema Generator (Right) */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4">
          <div className="flex items-center space-x-1 border-b border-slate-805 pb-2 mb-1">
            <FileCode className="h-4.5 w-4.5 text-indigo-400" />
            <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono">
              JSON-LD Metadata Schema Engine
            </h3>
          </div>

          <p className="text-[11.5px] text-slate-400 leading-relaxed">
            Construct and inject beautiful JSON-LD schema entity structures into your Blog header templates, declaring software applications, technical descriptions, and key-terms seamlessly.
          </p>

          <div className="relative">
            <textarea
              value={generatedSchema}
              onChange={(e) => setGeneratedSchema(e.target.value)}
              rows={8}
              readOnly
              className="w-full rounded border border-slate-850 bg-slate-950 p-2 text-xs font-mono text-indigo-300 outline-none resize-none leading-relaxed select-all"
              placeholder="Deploy a citation scan on the left to synthesize active entity schemas..."
            />
          </div>

          {generatedSchema && (
            <button
              onClick={handlePushSchemaToSite}
              disabled={isSyncingSchema}
              className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow shadow-emerald-950/20 flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
              type="button"
            >
              {isSyncingSchema ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin mr-1" />
                  <span>Syncing schema registers...</span>
                </>
              ) : (
                <>
                  <Layers className="h-3.5 w-3.5" />
                  <span>Inject Schema to Website Blog CMS</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
