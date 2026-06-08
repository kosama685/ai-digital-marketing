/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Image, 
  Volume2, 
  FileEdit, 
  ArrowRightLeft, 
  CheckCircle2, 
  RefreshCw,
  Eye,
  ActivitySquare
} from 'lucide-react';
import { toast } from 'sonner';
import { AI_MODELS_POOL } from '../lib/mockData';

export default function AIStudio() {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'voice'>('text');
  const [selectedModel, setSelectedModel] = useState('kimi-k2.6');

  // Text generator states
  const [textPrompt, setTextPrompt] = useState('Write an organic promotional blueprint for a corporate LinkedIn workspace.');
  const [generatedText, setGeneratedText] = useState('');
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [textStreamLog, setTextStreamLog] = useState<string[]>([]);

  // Image studio states
  const [imgPrompt, setImgPrompt] = useState('A modular command dashboard overlooking solar server farms, cyberpunk design, dark mode, Unreal Engine render, hyper-detailed, 8k');
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [generatedImgUrl, setGeneratedImgUrl] = useState('');

  // Voice studio states
  const [ttsScript, setTtsScript] = useState('Welcome to NexusForge AI. We automate multi-platform organic SEO and compliance indexing to give your Saas operations absolute scale.');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesizedAudio, setSynthesizedAudio] = useState(false);

  const handleGenerateText = () => {
    if (!textPrompt) {
      toast.error('Write clear instruction parameters first!');
      return;
    }

    setIsGeneratingText(true);
    setGeneratedText('');
    setTextStreamLog([]);

    const steps = [
      'Acquiring neural token buffers from core routing index...',
      'Mapping prompt variables: corporate, organic, marketing blueprint...',
      'Conducting duplicate alignment check to verify zero-shadowban overlap...',
      'Executing contextual generation loop using active weights...'
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setTextStreamLog(prev => [...prev, step]);
      }, (idx + 1) * 600);
    });

    setTimeout(() => {
      setIsGeneratingText(false);
      const modelObj = AI_MODELS_POOL.find(m => m.id === selectedModel);
      const mName = modelObj ? modelObj.name : 'Maverick AI Core';
      setGeneratedText(`### 🚀 ORGANIC LINKEDIN MARKETING BLUEPRINT\n*Generated via ${mName}*\n\n1. **The Context hook:** Frontload conversational questions matching business owner frustrations in 2026. (e.g. "Is your multi-account Chrome profile trigger causing automated action-blocks? Here is why.")\n\n2. **The Value Core:** Share 3 detailed visual infographics illustrating residential proxy latencies and localized browser profiles. Detail how standard residential mobile IPs bypass generic checkpoints natively.\n\n3. **The Call-to-Action:** Direct readers to a complimentary white-labeled site diagnostic audit report. (e.g. "We checked 12 sites this morning. 50% are missing critical AEO/GEO citability metrics. Leave your site domain below, we are running audits live today!")\n\n*Optimized keyword constraints: Saas automation compliance, custom residential proxies, index SEO metrics.*`);
      toast.success('Generative text successfully completed & verified!');
    }, 3200);
  };

  const handleGenerateImage = () => {
    if (!imgPrompt) {
      toast.error('Provide image prompt descriptor parameters!');
      return;
    }

    setIsGeneratingImg(true);
    setTimeout(() => {
      setIsGeneratingImg(false);
      setGeneratedImgUrl('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80');
      toast.success('High-fidelity visual asset compiled and cataloged!');
    }, 2500);
  };

  const handleSynthesizeVoice = () => {
    if (!ttsScript) return;
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setSynthesizedAudio(true);
      toast.success('Synthesized zero-shot TTS wave output safely!');
    }, 1800);
  };

  const currentModelObject = AI_MODELS_POOL.find(m => m.id === selectedModel) || AI_MODELS_POOL[0];

  return (
    <div className="space-y-6 text-left" id="aistudio-view-layout">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-101 flex items-center space-x-2">
            <ActivitySquare className="h-5 w-5 text-indigo-400" />
            <span>AI Workspace Studio & Model Routing</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Toggle native edge reasoning models, generate contextual promotional briefs, build image visualizer creatives, and synthesize custom vocal narration.
          </p>
        </div>

        <div className="flex space-x-1 p-0.5 rounded-lg bg-slate-950 border border-slate-850">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'text' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-205'
            }`}
          >
            <FileEdit className="h-3.5 w-3.5 inline mr-1" />
            Text Studio
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'image' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-205'
            }`}
          >
            <Image className="h-3.5 w-3.5 inline mr-1" />
            Image Studio
          </button>
          <button
            onClick={() => setActiveTab('voice')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'voice' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-205'
            }`}
          >
            <Volume2 className="h-3.5 w-3.5 inline mr-1" />
            Voice Studio
          </button>
        </div>
      </div>

      {/* Model Selection Row */}
      <div className="p-4 rounded-xl border border-slate-850 bg-slate-950/40 text-xs text-slate-400 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Sparkles className="h-5 w-5 text-indigo-400 flex-shrink-0 animate-pulse" />
          <div className="text-left font-sans">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block">Bound Neural reasoning core</span>
            <div className="text-[13px] font-semibold text-slate-200 mt-0.5">
              {currentModelObject.name} <span className="text-[10px] text-slate-500 font-normal">({currentModelObject.provider})</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 leading-relaxed mt-0.5">
              Best for: {currentModelObject.description}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-mono text-[10px] uppercase font-bold text-slate-500">Router binds:</span>
          <select
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value);
              toast.success(`Hotswapped active reasoning node to: ${e.target.value}`);
            }}
            className="rounded bg-slate-900 border border-slate-800 p-2 text-xs font-bold text-slate-202 outline-none font-mono"
          >
            {AI_MODELS_POOL.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.ratingScore} score)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tab View Contents */}

      {/* 1. TEXT STUDIO */}
      {activeTab === 'text' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="text-studio-split-view">
          {/* Instructions Input (Left) */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4 flex flex-col justify-between h-[420px]">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-3">
                Instruct Generation Parameters
              </h3>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Text prompt / Instruction context</label>
                <textarea
                  value={textPrompt}
                  onChange={(e) => setTextPrompt(e.target.value)}
                  className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-202 outline-none h-44 resize-none leading-relaxed font-sans"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-850 mt-4">
              <span className="text-[10px] text-slate-500 font-mono">Maverick instructions optimized</span>
              <button
                onClick={handleGenerateText}
                disabled={isGeneratingText}
                className="px-5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white shadow shadow-indigo-600/20 flex items-center space-x-1"
                type="button"
              >
                <Send className="h-3 w-3 mr-0.5" />
                <span>{isGeneratingText ? 'Writing section...' : 'Generate Text'}</span>
              </button>
            </div>
          </div>

          {/* Results Output Screen (Right) */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left h-[420px] flex flex-col overflow-hidden">
            <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-3">
              Core Response outputs
            </h3>

            {isGeneratingText && (
              <div className="flex-1 flex flex-col justify-center items-center space-y-4 text-center p-6 bg-slate-955/35">
                <RefreshCw className="h-6 w-6 text-indigo-400 animate-spin" />
                <div className="space-y-1">
                  <p className="text-xs text-slate-310 font-bold font-mono">Neural generating text streaming...</p>
                  <p className="text-[10px] text-slate-500 font-mono">Running compliance duplicate checker index checks</p>
                </div>

                <div className="w-full max-w-xs space-y-1 bg-slate-950/70 p-3 rounded-lg text-left border border-slate-850 text-[10px] font-mono text-slate-500 h-28 overflow-y-auto">
                  {textStreamLog.map((log, index) => (
                    <div key={index} className="flex items-center space-x-1 capitalize text-slate-400">
                      <span className="text-emerald-400">✓</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!isGeneratingText && generatedText && (
              <div className="flex-1 overflow-y-auto p-4 rounded-lg bg-slate-950 border border-slate-850 text-xs font-sans text-slate-202 leading-relaxed whitespace-pre-line select-text" id="streamed-results-container">
                {generatedText}
              </div>
            )}

            {!isGeneratingText && !generatedText && (
              <div className="flex-1 flex flex-col justify-center items-center text-center text-slate-500 py-20 border border-dashed border-slate-850 rounded-lg">
                <Sparkles className="h-8 w-18 text-slate-600 mb-2" />
                <p className="text-xs font-semibold">Readying Edge reasoning Core context prompt buffers...</p>
                <p className="text-[10px] font-mono text-slate-500 mt-1">Press Generate Text to invoke live compile cycles</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. IMAGE STUDIO */}
      {activeTab === 'image' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="image-studio-split-view">
          {/* Controls */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4 flex flex-col justify-between h-[420px]">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-3">
                Creative Prompts Parameters
              </h3>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Visual descriptor properties</label>
                <textarea
                  value={imgPrompt}
                  onChange={(e) => setImgPrompt(e.target.value)}
                  className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-202 outline-none h-40 resize-none leading-relaxed font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Canvas aspect ratio</label>
                  <select className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-202 outline-none font-mono">
                    <option value="1:1">1:1 Square (IG standard)</option>
                    <option value="4:5">4:5 Portrait</option>
                    <option value="16:9">16:9 Landscape</option>
                    <option value="9:16">9:16 Story / Reel</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Sampling steps</label>
                  <select className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-202 outline-none font-mono">
                    <option value="30">30 Steps (standard)</option>
                    <option value="50">50 Steps (detail max)</option>
                    <option value="15">15 Steps (speed fast)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-850 mt-4">
              <button
                onClick={handleGenerateImage}
                disabled={isGeneratingImg}
                className="px-5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white shadow shadow-indigo-600/20 flex items-center space-x-1"
                type="button"
              >
                <Image className="h-3 w-3 mr-0.5" />
                <span>{isGeneratingImg ? 'Compiling pixels...' : 'Compile Creative'}</span>
              </button>
            </div>
          </div>

          {/* Compiled Canvas (Right) */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left h-[420px] flex flex-col justify-between overflow-hidden">
            <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-3">
              Compiled Visual asset
            </h3>

            {isGeneratingImg && (
              <div className="flex-1 flex flex-col justify-center items-center space-y-3 text-center">
                <RefreshCw className="h-6 w-6 text-indigo-400 animate-spin" />
                <div>
                  <p className="text-xs font-bold text-slate-202 font-mono">Diffusing latent pixel variables...</p>
                  <p className="text-[10px] text-slate-500 font-mono">Bypassing metadata overlap checkpoint checks</p>
                </div>
              </div>
            )}

            {!isGeneratingImg && generatedImgUrl && (
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex-1 flex items-center justify-center p-2 rounded bg-slate-950 border border-slate-850 overflow-hidden h-[260px]">
                  <img
                    src={generatedImgUrl}
                    alt="AI Generated"
                    className="max-h-full max-w-full rounded object-contain border border-slate-900/40"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="pt-3 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>Compiled: 1024x1024 PNG • DALL-E 3 config</span>
                  <button
                    onClick={() => {
                      toast.success('Successfully cataloged pixel to Media Gallery!');
                    }}
                    className="px-3 py-1 rounded bg-indigo-600/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 hover:bg-indigo-500 hover:text-white"
                    type="button"
                  >
                    Save to Media Gallery
                  </button>
                </div>
              </div>
            )}

            {!isGeneratingImg && !generatedImgUrl && (
              <div className="flex-1 flex flex-col justify-center items-center text-center text-slate-500 py-20 border border-dashed border-slate-850 rounded-lg">
                <Image className="h-8 w-18 text-slate-600 mb-2" />
                <p className="text-xs font-semibold">Pixel array viewport completely clear...</p>
                <p className="text-[10px] font-mono text-slate-500 mt-1">Press Compile Creative to execute latent diffusion</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. VOICE STUDIO */}
      {activeTab === 'voice' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="voice-studio-split-view">
          {/* Script Input (Left) */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4 flex flex-col justify-between h-[420px]">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-3">
                ZeroShot TTS vocal parameters
              </h3>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Voiceover Text Script</label>
                <textarea
                  value={ttsScript}
                  onChange={(e) => setTtsScript(e.target.value)}
                  className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-202 outline-none h-40 resize-none leading-relaxed font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Audio voice model preset</label>
                  <select className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-202 outline-none font-mono">
                    <option value="male_pro">NVIDIA Static Male (Pro)</option>
                    <option value="female_friendly">Magpie ZeroShot Female</option>
                    <option value="clone_vance">Sarah Smith cloned vocal</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Vocal emphasis spectrum</label>
                  <select className="w-full rounded bg-slate-950 border border-slate-850 p-2 text-xs text-slate-202 outline-none font-mono">
                    <option value="1.0">Standard 1.0x (Calm)</option>
                    <option value="1.2">1.2x (Enthusiastic)</option>
                    <option value="0.9">0.9x (Authoritative)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-850 mt-4">
              <button
                onClick={handleSynthesizeVoice}
                disabled={isSynthesizing}
                className="px-5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white shadow shadow-indigo-600/20 flex items-center space-x-1"
                type="button"
              >
                <Volume2 className="h-3 w-3 mr-0.5" />
                <span>{isSynthesizing ? 'Synthesizing voice waves...' : 'Synthesize WAV Output'}</span>
              </button>
            </div>
          </div>

          {/* WAV Player (Right) */}
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left h-[420px] flex flex-col justify-between overflow-hidden">
            <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-3">
              Wave output review
            </h3>

            {isSynthesizing && (
              <div className="flex-1 flex flex-col justify-center items-center space-y-3 text-center">
                <RefreshCw className="h-6 w-6 text-indigo-400 animate-spin" />
                <div>
                  <p className="text-xs font-bold text-slate-202 font-mono">Modulating sound wave intervals...</p>
                  <p className="text-[10px] text-slate-500 font-mono">Running zero-shot pitch allocation</p>
                </div>
              </div>
            )}

            {!isSynthesizing && synthesizedAudio && (
              <div className="flex-1 flex flex-col justify-between text-xs space-y-4">
                <div className="p-5 rounded-lg bg-slate-950 border border-slate-850 text-left space-y-4 flex flex-col justify-center h-48">
                  <div className="flex justify-between items-center text-[10px] text-slate-550 font-mono">
                    <span>magpie-zeroshot-tts output</span>
                    <span className="text-indigo-400 font-mono">00:08 WAV file ready</span>
                  </div>

                  {/* Pseudo soundwave bar chart */}
                  <div className="h-10 flex items-center justify-between space-x-0.5 px-3">
                    {[10, 40, 24, 60, 80, 10, 30, 48, 70, 95, 23, 41, 14, 55, 68, 12, 34, 49, 78, 92, 10, 40, 24, 60, 80].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="w-1 bg-indigo-500 rounded-full animate-pulse flex-1"
                      />
                    ))}
                  </div>

                  {/* Play controls */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => toast.info('Playing simulated zero-shot synthesized voice track...')}
                      className="px-4 py-1 rounded bg-indigo-600 font-bold hover:bg-indigo-500 text-[10px] text-white"
                      type="button"
                    >
                      ▶ Play Synthesized Audio Track
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-850 flex justify-between items-center text-[10px] text-slate-550 font-mono leading-none">
                  <span>Synthesized: 128kbps stereo MP3 output • Coqui ZeroShot model</span>
                  <button
                    onClick={() => toast.success('Audio track associated with active Campaign post!')}
                    className="px-3 py-1 rounded bg-indigo-600/10 border border-indigo-500/20 font-bold text-indigo-400 text-[10px] hover:text-white"
                    type="button"
                  >
                    Bind to Reels Campaign
                  </button>
                </div>
              </div>
            )}

            {!isSynthesizing && !synthesizedAudio && (
              <div className="flex-1 flex flex-col justify-center items-center text-center text-slate-500 py-20 border border-dashed border-slate-850 rounded-lg">
                <Volume2 className="h-8 w-18 text-slate-600 mb-2" />
                <p className="text-xs font-semibold">Wave buffer array currently empty...</p>
                <p className="text-[10px] font-mono text-slate-500 mt-1">Press Synthesize WAV Output to generate mock sound files</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
