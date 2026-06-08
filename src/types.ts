/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserSession {
  email: string;
  role: 'admin' | 'user';
  isAuthenticated: boolean;
  impersonatingClientUrl?: string; // For Admin impersonation
}

export interface FeatureFlags {
  blogCmsEnabled: boolean;
  dailyAutoPostsEnabled: boolean;
  advancedAutomationEnabled: boolean;
  emailMarketingEnabled: boolean;
  campaignIntelligenceEnabled: boolean;
  seoAeoToolsEnabled: boolean;
}

export interface ClientWebsite {
  id: string;
  url: string;
  name: string;
  blogEnabled: boolean;
  dailyAutoPostsEnabled: boolean;
  clientName: string;
}

export interface SocialAccount {
  id: string;
  platform: 'instagram' | 'facebook' | 'pinterest' | 'linkedin' | 'twitter' | 'tiktok' | 'snapchat';
  username: string;
  avatarUrl: string;
  followers: number;
  following: number;
  postsCount: number;
  engagementRate: number;
  status: 'connected' | 'disconnected' | 'challenge' | 'warmup';
  warmupSettings?: {
    enabled: boolean;
    dailyLimit: number;
    currentRampDay: number;
    targetDays: number;
  };
  proxyId?: string;
  tag?: string; // 'Client A', 'Niche'
}

export interface ActivityLog {
  id: string;
  timestamp: string; // ISO String
  platform?: string;
  accountName?: string;
  type: 'follow' | 'like' | 'comment' | 'dm' | 'story_view' | 'post_pub' | 'system' | 'seo' | 'email' | 'campaign';
  message: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export interface TargetScrapedUser {
  id: string;
  username: string;
  fullName: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  bio: string;
  externalLink: string;
  engagementRate: number;
  category: string;
  source: string; // e.g. '#fitness post likers'
  status: 'scraped' | 'whitelisted' | 'blacklisted' | 'queued_dm';
}

export interface ScheduledPost {
  id: string;
  title: string;
  type: 'photo' | 'video' | 'carousel' | 'reel' | 'story' | 'blog';
  mediaUrls: string[];
  caption: string;
  firstComment: string;
  scheduledTime: string; // YYYY-MM-DD HH:MM
  platform: string; // 'instagram' | 'facebook' | 'linkedin' | 'pinterest' | 'blog' | 'all'
  status: 'scheduled' | 'published' | 'draft';
  autoDeleteDays?: number;
  blogMetaDesc?: string;
  blogSlug?: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  conditions: string[];
  actions: string[];
  enabled: boolean;
}

export interface ProxyServer {
  id: string;
  ip: string;
  port: string;
  type: 'residential' | 'mobile' | 'datacenter';
  location: string;
  latencyMs: number;
  status: 'online' | 'offline' | 'untested';
  assignedAccountIds: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  seoScore: number;
  wordCount: number;
  status: 'published' | 'draft' | 'scheduled';
  metaDescription: string;
  focusKeyword: string;
  publishedAt?: string;
}

export interface KeywordMetric {
  id: string;
  keyword: string;
  volume: number;
  difficulty: number; // 0-100
  cpc: number;
  competition: 'High' | 'Medium' | 'Low';
  trend: number[]; // mock monthly data
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  previewText: string;
  status: 'draft' | 'sending' | 'completed' | 'scheduled';
  recipientsCount: number;
  openRate: number;
  clickRate: number;
  sentAt?: string;
  content: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  lifecycle: 'idea' | 'planning' | 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  roi: number;
  clicks: number;
  conversions: number;
  channels: string[];
}

export interface CompetitorBrand {
  id: string;
  handle: string;
  name: string;
  followers: number;
  engagementRate: number;
  postingFrequencyMonthly: number;
  strength: string;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  posMap: { x: number; y: number }; // x=Price (1-100), y=Quality (1-100)
}

export interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
  salesCount: number;
  stock: number;
  categories: string[];
}

export interface EscalationTicket {
  id: string;
  subject: string;
  source: 'system_alert' | 'user_reported' | 'sla_breach';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  assignedTo: string;
  createdAt: string;
  convo: { sender: string; text: string; time: string }[];
}

export interface AIModelDetails {
  id: string;
  name: string;
  provider: string;
  capability: string[];
  description: string;
  ratingScore: number;
}
