/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BlogPost, KeywordMetric, ScheduledPost, SocialAccount } from '../types';
import { 
  FileEdit, 
  Sparkles, 
  Eye, 
  Trash2, 
  Search, 
  Plus, 
  Tv, 
  TrendingUp, 
  BadgeAlert, 
  CheckCircle,
  HelpCircle,
  Zap,
  Globe,
  Share2,
  BookmarkCheck,
  RefreshCw,
  Award
} from 'lucide-react';
import { toast } from 'sonner';
import { simulateAIRun, GeneratorStepLog } from '../lib/aiSimulator';

interface BlogCMSProps {
  selectedModelId: string;
  onPostNewLog: (message: string, type: 'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'post_pub' | 'system' | 'seo', status: 'success' | 'warning' | 'error' | 'info') => void;
}

export default function BlogCMS({ selectedModelId, onPostNewLog }: BlogCMSProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [keywords, setKeywords] = useState<KeywordMetric[]>([]);
  
  // Create / Edit Form State
  const [showEditor, setShowEditor] = useState(false);
  const [postTitle, setPostTitle] = useState('How to Calibrate Mobile Residential Proxies');
  const [postContent, setPostContent] = useState('Write your comprehensive technical content guide right here...');
  const [postKeyword, setPostKeyword] = useState('residential proxies');
  const [postMeta, setPostMeta] = useState('Configure multi-tenant proxy assignments and protect social reach scores safely.');
  const [postWordCount, setPostWordCount] = useState(650);

  // Viral Headline Solver State
  const [headlineScore, setHeadlineScore] = useState(72);
  const [aiHeadlineSuggestions, setAiHeadlineSuggestions] = useState<string[]>([]);

  // Daily 2 Posts State
  const [generatingDailyPosts, setGeneratingDailyPosts] = useState(false);
  const [dailyGenerationsLogs, setDailyGenerationsLogs] = useState<string[]>([]);
  const [generatedDailyArticles, setGeneratedDailyArticles] = useState<BlogPost[]>([]);

  // Keyword Research list Search Keyword Focus
  const [keywordQuery, setKeywordQuery] = useState('instagram SEO');
  const [isSearchingKeywords, setIsSearchingKeywords] = useState(false);

  useEffect(() => {
    setBlogPosts(JSON.parse(localStorage.getItem('nexus_blog') || '[]'));
    setKeywords(JSON.parse(localStorage.getItem('nexus_keywords') || '[]'));
  }, []);

  // Compute Viral Headline Score
  const triggerHeadlineOptimizationCheck = () => {
    if (!postTitle) {
      toast.error('Headline title coordinates are mandatory');
      return;
    }
    toast.info('Analysing emotional triggers and readability indices...');
    
    setTimeout(() => {
      const score = Math.floor(Math.random() * 20) + 78; // 78 - 98
      setHeadlineScore(score);
      setAiHeadlineSuggestions([
        `10 Proven Hacks to Optimize ${postTitle} Right Now`,
        `Definitive 2026 Blueprint: ${postTitle} Behind General Proxies`,
        `Why Your Social Campaigns Collapse Without ${postTitle}`
      ]);
      toast.success(`Headline scan completed! Readability Score: ${score}/100`);
    }, 800);
  };

  // Content Keyword Gap analysis list
  const gapSuggestions = [
    { page: ' competitor_a', missingTopic: 'Command line terminal steps for residency allocation', opportunityRating: 'High opportunity' },
    { page: ' competitor_b', missingTopic: 'Direct comparison charts between datacenters and residential ports', opportunityRating: 'Medium opportunity' }
  ];

  // Daily 2 Posts Pilot Runner
  const handleTriggerDailyPostsPilot = () => {
    setGeneratingDailyPosts(true);
    setDailyGenerationsLogs(['Connecting to Moonshot AI kimi-k2.6 cluster...']);
    
    setTimeout(() => {
      setDailyGenerationsLogs(prev => [...prev, 'Analyzing competitive content gaps and Wikidata entity structures...']);
    }, 1000);

    setTimeout(() => {
      setDailyGenerationsLogs(prev => [...prev, 'Enforcing similarity duplicate filters (Similarity score of 12% - Pristine unique values)...']);
    }, 2200);

    setTimeout(() => {
      // 2 finished posts
      const p1: BlogPost = {
        id: `gen-1-${Date.now()}`,
        title: 'Mastering Answer Engine Optimization: Crucial JSON-LD Entities',
        slug: 'mastering-aeo-json-ld-entities-guide',
        excerpt: 'How AI schemas assist generative crawlers in building citation backlinks frictionless.',
        content: '<p>AEO (Answer Engine Optimization) handles semantic structures differently than classical keyword crawls. Writing concise semantic headings is crucial to winning priority indexing references.</p>',
        featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        seoScore: 94,
        wordCount: 840,
        status: 'draft',
        metaDescription: 'Step-by-step masterclass explaining answer engine metadata guidelines.',
        focusKeyword: 'AEO schemas'
      };

      const p2: BlogPost = {
        id: `gen-2-${Date.now()}`,
        title: 'Automating Social Reach Loops Safely - Residential Calibration Protocols',
        slug: 'automating-social-reach-loops-residential-calibration',
        excerpt: 'Discover why datacenter IPs trigger rate blocks and how to setup residential jitter boundaries.',
        content: '<p>Direct mobile proxy binding ensures that your outreach activity patterns remain human-like. Keep your daily actions ramping smoothly over 30 days.</p>',
        featuredImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
        seoScore: 91,
        wordCount: 720,
        status: 'draft',
        metaDescription: 'Safe warm-up ramping strategies configured behind dedicated proxy nodes.',
        focusKeyword: 'mobile proxy binding'
      };

      setGeneratedDailyArticles([p1, p2]);
      setDailyGenerationsLogs(prev => [...prev, 'Completed dual-post CMS generations. Ready for editorial dispatch!']);
      setGeneratingDailyPosts(false);

      onPostNewLog('Daily automated 2-post AI blogging pipeline executed successfully.', 'seo', 'success');
      toast.success('Daily draft publications successfully generated! Dual review cards connected.');
    }, 4500);
  };

  const handleApproveDailyPost = (index: number) => {
    const post = generatedDailyArticles[index];
    if (!post) return;

    // Add to main blog lists
    const updatedBlog = [post, ...blogPosts];
    setBlogPosts(updatedBlog);
    localStorage.setItem('nexus_blog', JSON.stringify(updatedBlog));

    // Also schedule on the main content calendar
    const activePosts = JSON.parse(localStorage.getItem('nexus_posts') || '[]') as ScheduledPost[];
    const newScheduled: ScheduledPost = {
      id: `sched-blog-${Date.now()}`,
      title: post.title,
      type: 'blog',
      mediaUrls: [post.featuredImage],
      caption: post.excerpt,
      firstComment: '',
      scheduledTime: '2026-06-12 10:00', // auto scheduled
      platform: 'blog',
      status: 'scheduled',
      blogSlug: post.slug,
      blogMetaDesc: post.metaDescription
    };

    const updatedSched = [newScheduled, ...activePosts];
    localStorage.setItem('nexus_posts', JSON.stringify(updatedSched));

    // Filter approved post out of generated cards state
    setGeneratedDailyArticles(generatedDailyArticles.filter((_, i) => i !== index));
    
    onPostNewLog(`Approved AI daily post: "${post.title}". Published on CMS and cross-scheduled on Unified Calendar.`, 'post_pub', 'success');
    toast.success('Successfully published draft and cross-posted to platform calendar!');
  };

  const handleAddNewManualPost = () => {
    if (!postTitle || !postContent) {
      toast.error('Post title and rich workspace content required!');
      return;
    }

    const newPost: BlogPost = {
      id: `man-post-${Date.now()}`,
      title: postTitle,
      slug: postTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: postMeta ? postMeta.slice(0, 100) : 'Custom manual blog article addition.',
      content: postContent,
      featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      seoScore: headlineScore,
      wordCount: postWordCount,
      status: 'published',
      metaDescription: postMeta,
      focusKeyword: postKeyword
    };

    const updatedList = [newPost, ...blogPosts];
    setBlogPosts(updatedList);
    localStorage.setItem('nexus_blog', JSON.stringify(updatedList));

    setShowEditor(false);
    onPostNewLog(`Published manual article on CRM: "${newPost.title}"`, 'post_pub', 'success');
    toast.success('Manual article successfully cataloged!');
  };

  return (
    <div className="space-y-6" id="blog-cms-view-container">
      {/* Header View */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center space-x-2">
            <FileEdit className="h-5 w-5 text-indigo-400" />
            <span>AI Blogging Pilot & Content CMS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Publish viral SEO copy, analyze competitor content gaps, test readability triggers, and run the daily dual-post AI automation.
          </p>
        </div>

        <button
          onClick={() => setShowEditor(!showEditor)}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-505 text-xs text-white font-semibold transition-all cursor-pointer"
          type="button"
          id="trigger-post-editor-btn"
        >
          {showEditor ? 'Back to dashboard' : 'Compose Manual Article'}
        </button>
      </div>

      {/* Daily 2 SEO Posts Pilot banner */}
      <div className="p-5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-left relative overflow-hidden" id="daily-posts-pilot-panel">
        <div className="absolute top-0 right-0 p-3 text-indigo-500 opacity-20">
          <Zap className="h-24 w-24" />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative z-10">
          <div className="space-y-1 max-w-xl">
            <span className="text-[9px] tracking-wider uppercase font-mono px-2 py-0.5 rounded bg-indigo-600 text-white font-bold leading-none select-none">
              Featured Campaign: Daily 2 SEO Posts Pilot
            </span>
            <h4 className="text-sm font-bold text-slate-200 mt-2">Generate Today\'s 2 Fully SEO-Optimized Posts</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              This triggers a high-speed crawl of current industry keywords and competitor content profiles. It creates two completely original, highly informative articles calibrated behind the chosen AI engine with a checked similarity index.
            </p>
          </div>
          
          <button
            onClick={handleTriggerDailyPostsPilot}
            disabled={generatingDailyPosts}
            className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-slate-100 shadow-md shadow-indigo-950/20 disabled:opacity-50 flex-shrink-0 cursor-pointer"
            type="button"
            id="ignite-daily-posts-pilot"
          >
            {generatingDailyPosts ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                <span>Running AI reasoning loops...</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 animate-pulse-slow fill-white/80 text-white" />
                <span>Trigger SEO Article Generator</span>
              </>
            )}
          </button>
        </div>

        {generatingDailyPosts && (
          <div className="mt-4 p-3 rounded bg-slate-950 border border-slate-850 font-mono text-[10px] text-indigo-400 space-y-1" id="daily-posts-logs">
            {dailyGenerationsLogs.map((logStr, idx) => (
              <div key={idx} className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mr-2 animate-ping" />
                <span>{logStr}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display Drafts resulting from the daily pilot */}
      {generatedDailyArticles.length > 0 && (
        <div className="space-y-4" id="daily-posts-outbox-cards">
          <h4 className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest text-left">Generated SEO Drafts Review Area</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedDailyArticles.map((art, idx) => (
              <div key={art.id} className="p-5 rounded-xl border border-emerald-500/25 bg-emerald-500/5 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-1.5 rounded font-semibold">
                    Draft Article {idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Word count: {art.wordCount}</span>
                </div>

                <h5 className="text-xs font-bold text-slate-200">{art.title}</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed italic border-l-2 border-emerald-500/40 pl-3">
                  "{art.excerpt}"
                </p>

                <div className="text-[10px] text-slate-500 font-mono flex items-center space-x-1">
                  <span>Focus Keyword:</span>
                  <strong className="text-indigo-400">"{art.focusKeyword}"</strong>
                </div>

                <div className="flex justify-end space-x-2 pt-1 border-t border-slate-900">
                  <button
                    onClick={() => {
                      setGeneratedDailyArticles(generatedDailyArticles.filter((_, i) => i !== idx));
                      toast.info('Rejected daily draft');
                    }}
                    className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400"
                    type="button"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApproveDailyPost(idx)}
                    className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-[11px] text-white font-semibold flex items-center"
                    type="button"
                  >
                    <BookmarkCheck className="h-3.5 w-3.5 mr-1" />
                    <span>Approve & Dispatch</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showEditor ? (
        /* MANUAL WRITER INTERFACE PANEL */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="cms-editor-split-panel">
          
          {/* Main workspace (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4">
              <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono border-b border-slate-800 pb-2">
                Article Editor Workspace
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Headline/Title</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="flex-1 rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-200 outline-none focus:border-indigo-505"
                    />
                    <button
                      onClick={triggerHeadlineOptimizationCheck}
                      className="px-3 bg-slate-900 border border-slate-800 rounded text-xs hover:border-indigo-500"
                      type="button"
                    >
                      Check score
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">Article Body Content</label>
                  <textarea
                    value={postContent}
                    onChange={(e) => {
                      setPostContent(e.target.value);
                      setPostWordCount(e.target.value.split(/\s+/).filter(Boolean).length);
                    }}
                    rows={12}
                    className="w-full rounded bg-slate-950 border border-slate-800 p-2 text-xs text-slate-200 font-mono outline-none focus:border-indigo-505"
                  />
                  <div className="text-[10px] text-slate-500 font-mono text-right">
                    Word count total: {postWordCount}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowEditor(false)}
                  className="px-4 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-xs"
                  type="button"
                >
                  Discard
                </button>
                <button
                  onClick={handleAddNewManualPost}
                  className="px-5 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center space-x-1"
                  type="button"
                >
                  <Award className="h-3.5 w-3.5" />
                  <span>Publish manual post</span>
                </button>
              </div>
            </div>
          </div>

          {/* Headline checklist & Metadata sidebar (Right 1 col) */}
          <div className="space-y-6">
            
            {/* Viral Title Checker checklist */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-1">
                Headline optimization
              </h3>

              <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20 text-center font-mono space-y-1.5">
                <p className="text-[9px] text-slate-500 uppercase">Headline Score</p>
                <h4 className="text-2xl font-bold font-sans text-indigo-400">
                  {headlineScore} / 100
                </h4>
                <div className="text-[9.5px] text-slate-400 italic">
                  {headlineScore > 80 ? '🔥 Highly Conversational!' : '🌱 Steady - run check optimizer'}
                </div>
              </div>

              {aiHeadlineSuggestions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Suggested AI Variations</span>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    {aiHeadlineSuggestions.map((hl, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setPostTitle(hl);
                          toast.success('Adopted AI optimization variation!');
                        }}
                        className="w-full text-left p-1.5 rounded bg-slate-950 border border-slate-850 hover:border-slate-800 text-[11px] leading-snug"
                        type="button"
                      >
                        {hl}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Keyword seeds */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-3">
              <h3 className="text-xs font-bold text-slate-450 uppercase tracking-widest font-mono block mb-1">Target keywords</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-mono block mb-0.5">Focus Term</label>
                  <input
                    type="text"
                    value={postKeyword}
                    onChange={(e) => setPostKeyword(e.target.value)}
                    className="w-full rounded border border-slate-800 bg-slate-950 text-xs p-1.5 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-mono block mb-0.5">Meta Description Summary</label>
                  <textarea
                    value={postMeta}
                    onChange={(e) => setPostMeta(e.target.value)}
                    rows={2}
                    className="w-full rounded border border-slate-800 bg-slate-950 text-xs p-1.5 outline-none font-sans"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* CMS LISTING DASHBOARD */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* List of articles (Left 2 cols) */}
          <div className="lg:col-span-2">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left h-full min-h-[420px] flex flex-col">
              <h3 className="text-xs font-bold text-slate-405 uppercase tracking-widest font-mono border-b border-slate-850 pb-2 mb-3">
                Editorial CMS Library
              </h3>

              <div className="space-y-3 flex-1 overflow-y-auto pr-1" id="cms-editorial-scroller">
                {blogPosts.map((post) => {
                  const scoreColor = post.seoScore > 90 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' : 'text-amber-400 border-amber-500/20 bg-amber-500/5';
                  return (
                    <div
                      key={post.id}
                      className="p-4 rounded-lg bg-slate-950/60 border border-slate-850 hover:border-slate-800 transition-all text-left flex justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded border ${scoreColor}`}>
                            SEO Score: {post.seoScore}%
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">Word count: {post.wordCount}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200 leading-snug">{post.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed italic">{post.excerpt}</p>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Flush article "${post.title}"?`)) {
                            const updated = blogPosts.filter(b => b.id !== post.id);
                            setBlogPosts(updated);
                            localStorage.setItem('nexus_blog', JSON.stringify(updated));
                            toast.info('Cleared draft from database');
                          }
                        }}
                        className="text-slate-650 hover:text-rose-450 self-start p-1"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Keyword Search & Gaps (Right 1 col) */}
          <div className="space-y-6">
            
            {/* Embedded Keyword Research */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-4">
              <div className="flex items-center space-x-1 border-b border-slate-805 pb-2">
                <Search className="h-4 w-4 text-indigo-400" />
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Keyword research seeds</h3>
              </div>

              <div className="flex space-x-1.5">
                <input
                  type="text"
                  value={keywordQuery}
                  onChange={(e) => setKeywordQuery(e.target.value)}
                  className="flex-1 rounded border border-slate-800 bg-slate-950 p-1.5 text-xs text-slate-200 outline-none focus:border-indigo-505"
                />
                <button
                  onClick={() => {
                    setIsSearchingKeywords(true);
                    setTimeout(() => {
                      setIsSearchingKeywords(false);
                      toast.success('Indexed query parameters analyzed!');
                    }, 800);
                  }}
                  className="px-3 rounded bg-slate-800 text-xs hover:bg-slate-705"
                  type="button"
                >
                  Research
                </button>
              </div>

              <div className="space-y-2 text-xs font-mono" id="keyword-research-inline-results">
                {keywords.map(kw => (
                  <div key={kw.id} className="p-2 rounded bg-slate-950 border border-slate-850 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-slate-350 block leading-snug">{kw.keyword}</span>
                      <span className="text-[9px] text-slate-500">Volume: {kw.volume}/mo • difficulty: {kw.difficulty}%</span>
                    </div>
                    <button
                      onClick={() => {
                        setPostKeyword(kw.keyword);
                        toast.success(`Adopted focus keyword: "${kw.keyword}"`);
                      }}
                      className="text-[9px] p-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      type="button"
                    >
                      Use
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Gap suggestions */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left space-y-3">
              <h3 className="text-xs font-bold text-slate-540 uppercase tracking-widest font-mono border-b border-slate-850 pb-2">Competitor Content Gaps</h3>
              <div className="space-y-2.5 text-xs leading-relaxed text-slate-400">
                {gapSuggestions.map((g, idx) => (
                  <div key={idx} className="space-y-1 bg-slate-950/40 p-2 rounded border border-slate-900">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-indigo-450">{g.page}</span>
                      <span className="text-amber-400 font-bold">{g.opportunityRating}</span>
                    </div>
                    <p className="font-sans text-slate-300 leading-snug">"{g.missingTopic}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
