/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScheduledPost } from '../types';
import { 
  Calendar, 
  PlusCircle, 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  CheckCircle,
  Clock, 
  Sparkles, 
  Trash2, 
  Smile, 
  FileSpreadsheet,
  Image,
  Pin
} from 'lucide-react';
import { toast } from 'sonner';

interface SchedulerProps {
  onPostNewLog: (message: string, type: 'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'post_pub' | 'system' | 'seo', status: 'success' | 'warning' | 'error' | 'info') => void;
}

export default function Scheduler({ onPostNewLog }: SchedulerProps) {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [activeDate, setActiveDate] = useState<number>(11); // default focused day June

  // Composer Form States
  const [postTitle, setPostTitle] = useState('');
  const [postType, setPostType] = useState<'photo' | 'video' | 'carousel' | 'reel' | 'story'>('photo');
  const [postPlatform, setPostPlatform] = useState('instagram');
  const [postCaption, setPostCaption] = useState('');
  const [postFirstComment, setPostFirstComment] = useState('');
  const [postHour, setPostHour] = useState('14:00');
  const [postAutoDelete, setPostAutoDelete] = useState(false);
  const [postDeleteDays, setPostDeleteDays] = useState(30);

  // CSV State
  const [csvFileUploaded, setCsvFileUploaded] = useState(false);

  useEffect(() => {
    setPosts(JSON.parse(localStorage.getItem('nexus_posts') || '[]'));
  }, []);

  const handleCreatePost = () => {
    if (!postTitle || !postCaption) {
      toast.error('Post title and caption criteria are mandatory!');
      return;
    }

    const scheduledDateStr = `2026-06-${activeDate < 10 ? `0${activeDate}` : activeDate} ${postHour}`;

    const newPost: ScheduledPost = {
      id: `post-${Date.now()}`,
      title: postTitle,
      type: postType,
      mediaUrls: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'],
      caption: postCaption,
      firstComment: postFirstComment,
      scheduledTime: scheduledDateStr,
      platform: postPlatform,
      status: 'scheduled',
      autoDeleteDays: postAutoDelete ? postDeleteDays : undefined
    };

    const updated = [...posts, newPost];
    setPosts(updated);
    localStorage.setItem('nexus_posts', JSON.stringify(updated));

    onPostNewLog(`Successfully scheduled campaign publication: "${newPost.title}" for ${newPost.scheduledTime}`, 'post_pub', 'success');
    toast.success('Successfully added publication draft to visual timeline calendar!');

    // Close Modal and resets
    setShowModal(false);
    setPostTitle('');
    setPostCaption('');
    setPostFirstComment('');
  };

  const handleRemovePost = (id: string, name: string) => {
    if (confirm(`Remove scheduled post "${name}" from editorial calendar?`)) {
      const updated = posts.filter(p => p.id !== id);
      setPosts(updated);
      localStorage.setItem('nexus_posts', JSON.stringify(updated));
      onPostNewLog(`Cleared scheduled draft: "${name}"`, 'post_pub', 'warning');
      toast.info('Cleared draft from timeline');
    }
  };

  const triggerBulkCSVImport = () => {
    setCsvFileUploaded(true);
    setTimeout(() => {
      setCsvFileUploaded(false);

      const parsedBulkPosts: ScheduledPost[] = [
        {
          id: `bulk-${Date.now()}-1`,
          title: 'Bulk Post A: Master Content Pillars',
          type: 'photo',
          mediaUrls: [''],
          caption: 'Consistency wins index ranking points. Structure your weekly pillars under solid content guidelines! 🧱 #NexusForge',
          firstComment: '#SaaSStrategy',
          scheduledTime: '2026-06-18 10:00',
          platform: 'linkedin',
          status: 'scheduled'
        },
        {
          id: `bulk-${Date.now()}-2`,
          title: 'Bulk Post B: Organic Backlink Slashes',
          type: 'photo',
          mediaUrls: [''],
          caption: 'Why generic link aggregation collapses SEO. Maintain high-authority mentions with clean residential logs. 🔗 #SEOTips',
          firstComment: '#MarketingLife',
          scheduledTime: '2026-06-22 15:30',
          platform: 'twitter',
          status: 'scheduled'
        }
      ];

      const updated = [...posts, ...parsedBulkPosts];
      setPosts(updated);
      localStorage.setItem('nexus_posts', JSON.stringify(updated));

      onPostNewLog('Parsed CSV bulk payload. Imported 2 posts to organic campaign lists.', 'post_pub', 'success');
      toast.success('Omni bulk payload successfully checked and imported!');
    }, 1500);
  };

  // Helper: map posts to specific days in June 2026
  // June 1, 2026 starts on a Monday. June has 30 days.
  const juneCalendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-6" id="scheduler-view-container">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-100 flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-indigo-400" />
            <span>Editorial Schedule & Unified Calendar</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visual publication scheduler. Drags draft elements across June 2026, parse post structures, configure DMs and trigger bulk CSV lists.
          </p>
        </div>
        
        <div className="flex items-center space-x-2.5">
          {/* CSV Trigger button */}
          <button
            onClick={triggerBulkCSVImport}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/30 text-xs text-slate-300 font-semibold transition-all cursor-pointer"
            type="button"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
            <span>Bulk CSV Import</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Visual Monthly Calendar (left/middle) & List Sidebar (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Visual Calendar Grid (Left 3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/20 text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display">June 2026 Timeline</h3>
              <div className="flex items-center space-x-2 text-xs text-slate-450 font-mono">
                <ChevronLeft className="h-4 w-4 cursor-pointer hover:text-slate-200" />
                <span className="font-semibold text-slate-100">June 2026</span>
                <ChevronRight className="h-4 w-4 cursor-pointer hover:text-slate-200" />
              </div>
            </div>

            {/* Days Week labels */}
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono pb-2 border-b border-slate-850">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>

            {/* June Days grid */}
            <div className="grid grid-cols-7 gap-2 pt-2.5" id="june-2026-days-gridn">
              {juneCalendarDays.map((day) => {
                const dayPosts = posts.filter(p => p.scheduledTime.includes(`2026-06-${day < 10 ? `0${day}` : day}`));
                const isSelected = activeDate === day;

                return (
                  <div
                    key={day}
                    onClick={() => {
                      setActiveDate(day);
                      setShowModal(true);
                    }}
                    className={`min-h-[92px] p-1.5 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-indigo-500 bg-indigo-500/5' 
                        : 'border-slate-900 bg-slate-950/40 hover:border-slate-800 hover:bg-slate-900/10'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold text-slate-500">{day}</span>
                    
                    {/* Visual cards/indicator of daily draft counts */}
                    <div className="space-y-1 mt-1">
                      {dayPosts.map((p) => {
                        const isIg = p.platform === 'instagram';
                        const isCms = p.platform === 'blog';
                        const isLi = p.platform === 'linkedin';

                        return (
                          <div
                            key={p.id}
                            className={`text-[8px] font-mono p-1 rounded border leading-none truncate ${
                              isIg 
                                ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' 
                                : isCms 
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                                : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                            }`}
                            title={p.title}
                          >
                            {p.title}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Scheduled list (Right 1 col) */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/20 text-left h-full flex flex-col min-h-[420px]">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-800 pb-1.5 mb-3">
              Outbox Pipeline
            </h3>

            <div className="flex-1 overflow-y-auto space-y-3 min-h-0 pr-1" id="scheduler-pipeline-list">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-3 rounded-lg bg-slate-950 border border-slate-850 hover:border-slate-800 transition-all flex flex-col justify-between relative"
                >
                  <button
                    onClick={() => handleRemovePost(post.id, post.title)}
                    className="absolute right-2 top-2 text-slate-600 hover:text-rose-450"
                    title="Delete publication draft"
                    type="button"
                  >
                    ×
                  </button>
                  <div className="text-[9px] font-mono text-indigo-400 mb-1">{post.platform.toUpperCase()} - {post.type.toUpperCase()}</div>
                  <h4 className="text-xs font-semibold text-slate-200 line-clamp-1 pr-4">{post.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>
                  <div className="mt-2.5 flex items-center text-[9px] text-slate-500 font-mono">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{post.scheduledTime}</span>
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <div className="text-center py-12 text-xs text-slate-600">
                  Timeline empty. Click any date on June grid to compose outbound content.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* COMPOSER WIZARD INTERACTIVE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" id="post-composition-modal-shadow">
          <div className="w-full max-w-xl glass-panel p-6 rounded-xl border border-slate-800 shadow-2xl text-left space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-display flex items-center space-x-1.5">
                <Sparkles className="text-indigo-400 h-4.5 w-4.5" />
                <span>Schedule Campaign Post - June {activeDate}, 2026</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-250 text-sm font-bold"
                type="button"
              >
                ×
              </button>
            </div>

            {/* Platform Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Target Account Platform</label>
                <select
                  value={postPlatform}
                  onChange={(e) => setPostPlatform(e.target.value)}
                  className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs text-slate-300 outline-none focus:border-indigo-500"
                >
                  <option value="instagram">Instagram Campaign (Main)</option>
                  <option value="linkedin">LinkedIn Corp Network</option>
                  <option value="twitter">X/Twitter Pitch</option>
                  <option value="blog">Website Blog CMS</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Creative Publication Format</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['photo', 'carousel', 'reel'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setPostType(f)}
                      className={`p-1.5 rounded border text-[9px] font-mono uppercase font-bold text-center ${
                        postType === f ? 'bg-indigo-600 outline-none text-white' : 'bg-slate-950 border-slate-850 text-slate-400'
                      }`}
                      type="button"
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Campaign Title & Attach layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Campaign Title Coordinate</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Summer launch slide overview"
                  className="w-full rounded border border-slate-850 bg-slate-950 p-2 text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              {/* Media file uploader mockup */}
              <div className="sm:col-span-1">
                <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Creative Attach (1:1 / 4:5)</label>
                <div className="border border-dashed border-slate-800 rounded bg-slate-950/45 p-2 text-center text-[10px] text-slate-500 cursor-pointer hover:border-slate-700">
                  <Image className="h-4.5 w-4.5 mx-auto mb-1 text-indigo-400 animate-pulse" />
                  <span>Ready to attach</span>
                </div>
              </div>
            </div>

            {/* Caption & First Comment widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-[10px] text-slate-400 uppercase font-mono mb-1">
                  <span>Main Publication Copy</span>
                  <span className={postCaption.length > 2200 ? 'text-rose-405' : ''}>{postCaption.length}/2200 char</span>
                </div>
                <textarea
                  value={postCaption}
                  onChange={(e) => setPostCaption(e.target.value)}
                  rows={3}
                  placeholder="Enter your campaign wording with spintax choices..."
                  className="w-full rounded border border-slate-850 bg-slate-950 p-2 text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">First-Comment Hashtags Set</label>
                <textarea
                  value={postFirstComment}
                  onChange={(e) => setPostFirstComment(e.target.value)}
                  rows={3}
                  placeholder="e.g. #growth #marketing #design #branding"
                  className="w-full rounded border border-slate-850 bg-slate-950 p-2 text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Hours selection & Auto Deletion checks */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-850 pt-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Schedule Hour Slot</label>
                <input
                  type="time"
                  value={postHour}
                  onChange={(e) => setPostHour(e.target.value)}
                  className="w-full rounded border border-slate-850 bg-slate-950 p-1.5 focus:border-indigo-500 text-xs font-mono text-slate-200"
                />
              </div>

              <div className="p-2 rounded border border-slate-850 bg-slate-950/40 flex items-center justify-between">
                <div>
                  <h5 className="text-[10px] font-semibold text-slate-300">Auto-delete after X days</h5>
                  <p className="text-[8px] text-slate-500 leading-none mt-1">Clears landing footprint</p>
                </div>
                <input
                  type="checkbox"
                  checked={postAutoDelete}
                  onChange={(e) => setPostAutoDelete(e.target.checked)}
                  className="rounded border-slate-800 text-indigo-500 focus:ring-0 h-4 w-4"
                />
              </div>
            </div>

            {/* Create Action buttons */}
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-xs hover:bg-slate-800"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="px-5 py-2 rounded bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white flex items-center space-x-1 shadow shadow-indigo-900/10 cursor-pointer"
                type="button"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Confirm Outbound Draft</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
