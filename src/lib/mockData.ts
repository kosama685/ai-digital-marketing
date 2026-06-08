/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  SocialAccount, 
  BlogPost, 
  ActivityLog, 
  TargetScrapedUser, 
  ScheduledPost, 
  AutomationRule, 
  ProxyServer, 
  KeywordMetric, 
  EmailCampaign, 
  MarketingCampaign, 
  CompetitorBrand, 
  ProductItem, 
  EscalationTicket, 
  ClientWebsite, 
  FeatureFlags,
  AIModelDetails
} from '../types';

export const AI_MODELS_POOL: AIModelDetails[] = [
  {
    id: 'kimi-k2.6',
    name: 'Kimi K2.6 Extended',
    provider: 'Moonshot AI',
    capability: ['Text', 'Reasoning', '1M Context'],
    description: 'Ultra-long-context model optimized for deep text-analysis and viral SEO narrative construction.',
    ratingScore: 9.2
  },
  {
    id: 'nemotron-3-nano-omni-30b-a3b-reasoning',
    name: 'Nemotron-3 Nano Omni 30B',
    provider: 'NVIDIA',
    capability: ['Text', 'Reasoning', 'Vision', 'Multimodal'],
    description: 'NVIDIA-accelerated reasoning model specialized in strategic marketing synthesis and image analytics.',
    ratingScore: 9.5
  },
  {
    id: 'riva-translate-4b-instruct-v1_1',
    name: 'Riva Translate 4B Instruct',
    provider: 'NVIDIA',
    capability: ['Translation', 'Text', 'TTS'],
    description: 'High-speed translation engine for localization and instant cross-posting translations.',
    ratingScore: 8.8
  },
  {
    id: 'mistral-large-3-675b-instruct-2512',
    name: 'Mistral Large 3 Instruct',
    provider: 'Mistral AI',
    capability: ['Text', 'Complex Math', 'Reasoning'],
    description: 'Flagship open-weight model calibrated for conversational storytelling and professional copywriting.',
    ratingScore: 9.4
  },
  {
    id: 'ministral-14b-instruct-2512',
    name: 'Ministral 14B v2512',
    provider: 'Mistral AI',
    capability: ['Edge-Text', 'Structured Data', 'Fast API'],
    description: 'Compact generative node optimized for sub-second structured metadata and hashtag recommendations.',
    ratingScore: 8.6
  },
  {
    id: 'nemotron-nano-12b-v2-vl',
    name: 'Nemotron Nano 12B VL',
    provider: 'NVIDIA',
    capability: ['Vision', 'Text', 'OCR'],
    description: 'Visual intelligence model for analyzing Instagram creatives, captions, and product screenshot auditing.',
    ratingScore: 9.0
  },
  {
    id: 'llama-4-maverick-17b-128e-instruct',
    name: 'Llama 4 Maverick 17B',
    provider: 'Meta',
    capability: ['Text', 'Code', 'Speed'],
    description: 'Ultra-fast instructions model trained for click-bait headlines, caption optimization and customer DMs.',
    ratingScore: 9.1
  },
  {
    id: 'phi-4-multimodal-instruct',
    name: 'Phi-4 Multimodal',
    provider: 'Microsoft',
    capability: ['Text', 'Vision', 'Reasoning'],
    description: 'Lightweight visual and text solver, perfect for side-by-side content auditing and SEO checks.',
    ratingScore: 8.9
  },
  {
    id: 'llama-3.2-90b-vision-instruct',
    name: 'Llama 3.2 90B Vision',
    provider: 'Meta',
    capability: ['Vision', 'High-Reasoning', 'Multimodal'],
    description: 'State-of-the-art vision reasoning for evaluating website layout audits and competitor visual trends.',
    ratingScore: 9.6
  },
  {
    id: 'magpie-tts-zeroshot',
    name: 'Magpie TTS ZeroShot',
    provider: 'Coqui Community',
    capability: ['TTS', 'Audio', 'Clone'],
    description: 'Zero-shot voice synthesizers for automated Reels voiceovers, podcast highlights, and campaign videos.',
    ratingScore: 8.7
  }
];

export const INITIAL_WEBSITES: ClientWebsite[] = [
  { id: 'site_1', url: 'https://fitlife-premium.com', name: 'FitLife Premium', blogEnabled: true, dailyAutoPostsEnabled: true, clientName: 'Garrison Group LLC' },
  { id: 'site_2', url: 'https://urban-chic-apparel.co', name: 'Urban Chic Apparel', blogEnabled: true, dailyAutoPostsEnabled: false, clientName: 'Amelie Fashion' },
  { id: 'site_3', url: 'https://apex-tech-hq.io', name: 'Apex Tech Blog', blogEnabled: false, dailyAutoPostsEnabled: false, clientName: 'Apex Tech Inc' }
];

export const INITIAL_FEATURE_FLAGS: FeatureFlags = {
  blogCmsEnabled: true,
  dailyAutoPostsEnabled: true,
  advancedAutomationEnabled: true,
  emailMarketingEnabled: true,
  campaignIntelligenceEnabled: true,
  seoAeoToolsEnabled: true
};

export const INITIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: 'acc-1',
    platform: 'instagram',
    username: '@nexusforge_ai',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    followers: 24890,
    following: 341,
    postsCount: 156,
    engagementRate: 5.84,
    status: 'connected',
    warmupSettings: { enabled: true, dailyLimit: 200, currentRampDay: 12, targetDays: 30 },
    tag: 'Main Brand'
  },
  {
    id: 'acc-2',
    platform: 'facebook',
    username: 'NexusForge Studio',
    avatarUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=150&auto=format&fit=crop&q=80',
    followers: 43210,
    following: 0,
    postsCount: 221,
    engagementRate: 3.21,
    status: 'connected',
    tag: 'Main Brand'
  },
  {
    id: 'acc-3',
    platform: 'linkedin',
    username: 'NexusForge AI Corp',
    avatarUrl: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=150&auto=format&fit=crop&q=80',
    followers: 12900,
    following: 45,
    postsCount: 88,
    engagementRate: 7.12,
    status: 'connected',
    tag: 'Enterprise'
  },
  {
    id: 'acc-4',
    platform: 'pinterest',
    username: 'NexusForge Design Co',
    avatarUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&auto=format&fit=crop&q=80',
    followers: 89000,
    following: 98,
    postsCount: 1042,
    engagementRate: 9.34,
    status: 'connected',
    tag: 'Design Board'
  },
  {
    id: 'acc-5',
    platform: 'tiktok',
    username: '@nexusforge.shorts',
    avatarUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&auto=format&fit=crop&q=80',
    followers: 142500,
    following: 110,
    postsCount: 412,
    engagementRate: 11.45,
    status: 'disconnected',
    tag: 'Viral Hub'
  }
];

export const INITIAL_SCRAPED_USERS: TargetScrapedUser[] = [
  {
    id: 'usrc_1',
    username: '@organic_athlete',
    fullName: 'David Vance',
    followerCount: 18450,
    followingCount: 923,
    postCount: 421,
    bio: 'Professional Triathlete | Sharing organic fuel tips in Austin 🌿 Custom codes in bio.',
    externalLink: 'https://fitlife.organic-athlete.com',
    engagementRate: 6.2,
    category: 'Athletes',
    source: '#fitnessmotivation post likers',
    status: 'scraped'
  },
  {
    id: 'usrc_2',
    username: '@keto.mommy_ca',
    fullName: 'Clara Jenkins (Keto Coach)',
    followerCount: 22800,
    followingCount: 1450,
    postCount: 618,
    bio: 'Wife, Mother of 3, Food blogger. Helping busy parents stay in Ketosis! 🥑 Direct DMs open.',
    externalLink: 'https://claraketo.com/freebook',
    engagementRate: 4.8,
    category: 'Food & Nutrition',
    source: 'Competitor followers: @gold_level_nutrition',
    status: 'whitelisted'
  },
  {
    id: 'usrc_3',
    username: '@spam_bot_unlimited',
    fullName: 'Free Cash Daily Fast',
    followerCount: 120,
    followingCount: 8400,
    postCount: 3,
    bio: 'GET FREE BITCOIN TODAY NO SCAM CLIK LINK RIGHT NOW!!!',
    externalLink: 'http://cashoutfaster.ru',
    engagementRate: 0.05,
    category: 'Inspirational',
    source: '#gym post comments',
    status: 'blacklisted'
  },
  {
    id: 'usrc_4',
    username: '@yoga_with_melody',
    fullName: 'Melody Zhang',
    followerCount: 84100,
    followingCount: 654,
    postCount: 1045,
    bio: 'E-RYT Yoga instructor. Grounding down in Vancouver. Let\'s practice together. ⚡️🧘‍♀️',
    externalLink: 'https://melodyzen.ca/schedule',
    engagementRate: 7.9,
    category: 'Yoga & Mindfulness',
    source: '#yogapractice explore page',
    status: 'scraped'
  }
];

export const INITIAL_SCHEDULED_POSTS: ScheduledPost[] = [
  {
    id: 'sched-1',
    title: 'The Future of AI Automation in 2026',
    type: 'carousel',
    mediaUrls: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80'
    ],
    caption: 'How is AI changing your workspace in 2026? 🚀 Slashing manual labor by 85% means more time to focus on strategic vision and creative execution. What tools are in your tech stack? Let us know in the comments! #AIEngine #MachineLearning #NexusForge',
    firstComment: '#AIModern #FutureOfWork #WorkspaceCustomization #NexusForgeAI #SaaSLife',
    scheduledTime: '2026-06-11 14:00',
    platform: 'instagram',
    status: 'scheduled',
    autoDeleteDays: 30
  },
  {
    id: 'sched-2',
    title: '5 Ultimate Copywriting Rules (Highly Conversational)',
    type: 'photo',
    mediaUrls: ['https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=600&auto=format&fit=crop&q=80'],
    caption: 'Great copy doesn\'t sell product. It speaks directly to a localized problem, presenting a pristine and undeniable vision of the solution. Keep it readable, remove empty fluff, and frontload conversational hooks. 📚✍️',
    firstComment: '#CopywritingSkills #MarketerCommunity #BlogGrowth #NexusForge',
    scheduledTime: '2026-06-15 09:30',
    platform: 'linkedin',
    status: 'scheduled'
  },
  {
    id: 'sched-3',
    title: 'Optimizing organic search footprints',
    type: 'blog',
    mediaUrls: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80'],
    caption: 'Full research into AEO (Answer Engine Optimization) patterns and how generative engines construct citability.',
    firstComment: '',
    scheduledTime: '2026-06-09 10:00',
    platform: 'blog',
    status: 'scheduled',
    blogMetaDesc: 'Learn the core algorithms powering AEO and Generative Search Footprints in this 2026 definitive masterclass.',
    blogSlug: 'optimizing-organic-search-footprints'
  }
];

export const INITIAL_RULE_SETS: AutomationRule[] = [
  { id: 'rule_1', name: 'New Follower Welcome Outreach', trigger: 'New Follower Detected', conditions: ['Follower count > 200', 'Not labeled spam'], actions: ['Wait 30 minutes', 'Generate custom welcome DM via Maverick 17B', 'Send direct message'], enabled: true },
  { id: 'rule_2', name: 'Self-Promotion Post Boosting', trigger: 'Blog Post Published on CMS', conditions: ['Niche matches "AI Marketing"'], actions: ['Generate promotional visual description', 'Schedule Instagram Carousel', 'Cross-publish to LinkedIn Corp Profile'], enabled: true },
  { id: 'rule_3', name: 'Broken Link Self-Correction', trigger: 'Backlink Status Goes Broken', conditions: ['SLA rating = High'], actions: ['Create critical support ticket', 'Email team notifications', 'Flag in dashboard alerts'], enabled: true }
];

export const INITIAL_PROXIES: ProxyServer[] = [
  { id: 'p_1', ip: '185.220.101.44', port: '8080', type: 'residential', location: 'United States (New York)', latencyMs: 145, status: 'online', assignedAccountIds: ['acc-1', 'acc-2'] },
  { id: 'p_2', ip: '45.138.83.189', port: '1080', type: 'mobile', location: 'United Kingdom (London)', latencyMs: 210, status: 'online', assignedAccountIds: ['acc-3'] },
  { id: 'p_3', ip: '95.211.231.5', port: '3128', type: 'datacenter', location: 'Germany (Frankfurt)', latencyMs: 88, status: 'online', assignedAccountIds: [] },
  { id: 'p_4', ip: '185.193.18.23', port: '80', type: 'residential', location: 'Canada (Toronto)', latencyMs: 340, status: 'untested', assignedAccountIds: [] }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post_1',
    title: 'The Ultimate Guide to Generative Search Optimization (AEO/GEO) in 2026',
    slug: 'generative-search-aeo-geo-guide-2026',
    excerpt: 'How AI answers engines like Gemini, Copilot and Perplexity extract data, build citations, and rank multi-tenant footprints.',
    content: '<h2>Introduction</h2>\n<p>In 2026, standard search algorithms (SEO) have heavily shifted to AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization). AI models do not just match matching lists of keywords; they crawl semantic databases, evaluate authority nodes, and synthesize cohesive summaries with inline index-linked citations.</p>\n<h2>Core Mechanics of Citability</h2>\n<p>To guarantee your business is referenced when customers ask AI models "What is the best automation suite for social marketing?", you must align with key structural requirements:</p>\n<ul>\n<li><strong>Structured JSON-LD Data:</strong> Generative models ingest structured schema markups natively to fetch operational scopes.</li>\n<li><strong>AEO-Friendly Formatting:</strong> Write with bold headers that directly mimic high-frequency natural language questions.</li>\n<li><strong>Entity Association:</strong> Establish clear linked records connecting your brand name to high-authority external articles.</li>\n</ul>\n<h2>Conclusion</h2>\n<p>Optimizing for AEO/GEO guarantees your SaaS enters the reference pool of generative AI models during organic evaluation loops.</p>',
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    seoScore: 92,
    wordCount: 840,
    status: 'published',
    metaDescription: 'A comprehensive guide mapping the transition of search engines to answer engines under structural AEO guidelines.',
    focusKeyword: 'AEO guidelines'
  },
  {
    id: 'post_2',
    title: 'Establishing Frictionless Instagram Warm-Up Patterns for Multi-Account Teams',
    slug: 'instagram-multi-account-warmup-routines',
    excerpt: 'Why raw automation crashes accounts and how to schedule a flawless 15-day residential proxy activity ramp up.',
    content: '<h2>The Dangers of Immediate Bot Activity</h2>\n<p>Social media algorithms employ deep behavioral pattern profiling, identifying abrupt, computerized, non-human actions. Throwing a brand new profile immediately into 500 likes, 200 comments, and 150 follow loops triggers mandatory checkpoint triggers.</p>\n<h2>The NexusForge 15-Day Calibration Ladder</h2>\n<p>Multi-account managers must employ the automated warm-up ramping cycle:</p>\n<ul>\n<li><strong>Days 1-5:</strong> Read only. Scrapers simulate random feed scrolls, viewing stories, and liking exactly 10 high-niche posts.</li>\n<li><strong>Days 6-10:</strong> Slow outbound triggers. Introduce exactly 3-5 gentle comments using spintax dictionaries.</li>\n<li><strong>Days 11-15:</strong> Steady amplification. Bind clean, mobile-allocated residential proxies and unlock full follow outbound targets.</li>\n</ul>',
    featuredImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    seoScore: 88,
    wordCount: 650,
    status: 'published',
    metaDescription: 'Discover the automated step-by-step warm-up calendar designed to keep high-speed marketing profiles completely safe.',
    focusKeyword: 'warm-up ramping cycle'
  }
];

export const INITIAL_KEYWORDS: KeywordMetric[] = [
  { id: 'k_1', keyword: 'generative engine optimization', volume: 8400, difficulty: 41, cpc: 8.42, competition: 'Medium', trend: [1200, 1800, 2400, 3100, 4200, 5000, 5800, 6400, 7100, 7800, 8100, 8400] },
  { id: 'k_2', keyword: 'answer engine seo formatting', volume: 4600, difficulty: 28, cpc: 6.12, competition: 'Low', trend: [800, 1100, 1400, 1900, 2500, 2800, 3100, 3400, 3800, 4100, 4400, 4600] },
  { id: 'k_3', keyword: 'instagram automation proxies', volume: 14200, difficulty: 72, cpc: 4.80, competition: 'High', trend: [11000, 11500, 12000, 12500, 13000, 12800, 13100, 13400, 13600, 13900, 14100, 14200] },
  { id: 'k_4', keyword: 'automated content localization', volume: 3800, difficulty: 35, cpc: 5.50, competition: 'Low', trend: [500, 800, 1200, 1500, 1800, 2200, 2500, 2800, 3100, 3400, 3600, 3800] }
];

export const INITIAL_EMAILS: EmailCampaign[] = [
  { id: 'e_1', name: 'SaaS Platform Summer Launch Invitation', subject: 'Your automated workflow engine is live! 🛠️🚀', previewText: 'Claim 30 days of complimentary Maverick 17B generation inside.', status: 'completed', recipientsCount: 4500, openRate: 46.85, clickRate: 14.12, sentAt: '2026-06-05', content: 'Hey {{first_name}},\n\nYour brand new automated outreach pipeline is primed and waiting. We have updated your server clusters with high-speed residential proxies and the top reasoning AI models.\n\nClick below to claim your 30-day complimentary trial.\n\nBest,\nNexusForge Team' },
  { id: 'e_2', name: 'A/B Newsletter: Copywriting Secrets', subject: 'A/B Test: Avoid these 5 copywriting traps', previewText: 'Uncover why your landing pages fail to convert active leads.', status: 'scheduled', recipientsCount: 1200, openRate: 0, clickRate: 0, sentAt: '2026-06-12', content: 'Hello {{first_name}},\n\nDid you know that 87% of SaaS landing pages describe software modules rather than customer solutions? Today we break down how to optimize your vocabulary.\n\nWarmly,\nNexusForge AI' }
];

export const INITIAL_CAMPAIGNS: MarketingCampaign[] = [
  { id: 'cmp_1', name: 'Summer Product Growth Hack', lifecycle: 'active', budget: 12500, spent: 7840, roi: 364, clicks: 14850, conversions: 1210, channels: ['Instagram Ads', 'Email Newsletter', 'LinkedIn Influencer Pulse'] },
  { id: 'cmp_2', name: 'SEO Footprint Expansion 2026', lifecycle: 'active', budget: 8000, spent: 2400, roi: 188, clicks: 5200, conversions: 440, channels: ['Blog Articles', 'Backlink Outreach', 'Generative Search Grounding'] },
  { id: 'cmp_3', name: 'Autumn Apparel Campaign', lifecycle: 'planning', budget: 15000, spent: 0, roi: 0, clicks: 0, conversions: 0, channels: ['TikTok Video Challenge', 'Snapchat Custom Filters'] }
];

export const INITIAL_COMPETITORS: CompetitorBrand[] = [
  {
    id: 'comp_1',
    handle: '@saas_outreach_pro',
    name: 'AutoReach Suite Inc',
    followers: 68100,
    engagementRate: 3.42,
    postingFrequencyMonthly: 28,
    strength: 'Ultra-high posting volume on LinkedIn & X.',
    swot: {
      strengths: ['High frequency posts', 'Integrated chrome utilities', 'Large community group'],
      weaknesses: ['Generic repetitive text style', 'Poor custom proxy routing', 'No Instagram Reels adaptation'],
      opportunities: ['We can exploit their custom account blocking patterns', 'Partner with disappointed clients'],
      threats: ['Large financial marketing seed funding']
    },
    posMap: { x: 75, y: 55 }
  },
  {
    id: 'comp_2',
    handle: '@instaboot_grow',
    name: 'InstaBoost Automation',
    followers: 32400,
    engagementRate: 4.9,
    postingFrequencyMonthly: 12,
    strength: 'Exceptional visually detailed infographics.',
    swot: {
      strengths: ['Beautiful branding assets', 'Strong customer support base'],
      weaknesses: ['Closed APIs', 'Manual CAPTCHA prompts', 'Poor SEO blogging content'],
      opportunities: ['Integrate multi-model reasoning AI for captions', 'Provide high-speed residential proxies'],
      threats: ['Automated browser emulator adaptation']
    },
    posMap: { x: 45, y: 75 }
  }
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  { id: 'prd_1', name: 'NexusForge Enterprise API Key', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=150&auto=format&fit=crop&q=80', price: 299, salesCount: 142, stock: 950, categories: ['Enterprise', 'API Keys'] },
  { id: 'prd_2', name: 'Ultra-Residential Proxy Bundle (10 Ports)', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&auto=format&fit=crop&q=80', price: 79, salesCount: 521, stock: 120, categories: ['Hardware', 'Proxies'] },
  { id: 'prd_3', name: 'Maverick Copywriter Full Access License', image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=150&auto=format&fit=crop&q=80', price: 149, salesCount: 289, stock: 1500, categories: ['Software', 'AI Add-ons'] }
];

export const INITIAL_TICKETS: EscalationTicket[] = [
  {
    id: 'tkt_1',
    subject: 'Meta Session Token Refreshes Failing on Node Client',
    source: 'system_alert',
    priority: 'high',
    status: 'investigating',
    assignedTo: 'Damian Vance',
    createdAt: '2026-06-08 12:00',
    convo: [
      { sender: 'System Node Scheduler', text: 'Alert: cron job [meta-sync] threw exception "Unauthorized OAuth token: Token expired" continuously for account: @nexusforge_ai', time: '2026-06-08 12:00' },
      { sender: 'Engineer Damian', text: 'Inspecting proxy pool logs. Latency was spikey during Meta server verification checks.', time: '2026-06-08 12:15' }
    ]
  },
  {
    id: 'tkt_2',
    subject: 'Daily Auto Posts Skipped forApex Tech Blog',
    source: 'user_reported',
    priority: 'medium',
    status: 'open',
    assignedTo: 'Sarah Smith',
    createdAt: '2026-06-08 14:10',
    convo: [
      { sender: 'Client Amelie', text: 'Our custom Apex Tech blog dashboard is completely enabled, but today\'s automated double-article was skipped. Help.', time: '2026-06-08 14:10' }
    ]
  }
];

export const INITIAL_LIVESTREAMS: ActivityLog[] = [
  { id: 'act-init-1', timestamp: '2026-06-08T06:30:00Z', type: 'system', message: 'NexusForge AI Core v2.0 Initialization completed. Connected to proxy clusters.', status: 'success' },
  { id: 'act-init-2', timestamp: '2026-06-08T06:35:00Z', type: 'system', message: 'Loaded 5 multi-network branding profiles, verifying cookies.', status: 'info' },
  { id: 'act-init-3', timestamp: '2026-06-08T06:40:00Z', platform: 'Instagram', accountName: '@nexusforge_ai', type: 'follow', message: 'Simulating warm-up scroll. Viewed 5 stories, liked 2 recent hashtags.', status: 'success' }
];

export function seedLocalStorage() {
  if (!localStorage.getItem('nexus_user')) {
    // Session
    localStorage.setItem('nexus_user', JSON.stringify({ email: '', role: 'user', isAuthenticated: false }));
  }
  if (!localStorage.getItem('nexus_feature_flags')) {
    localStorage.setItem('nexus_feature_flags', JSON.stringify(INITIAL_FEATURE_FLAGS));
  }
  if (!localStorage.getItem('nexus_websites')) {
    localStorage.setItem('nexus_websites', JSON.stringify(INITIAL_WEBSITES));
  }
  if (!localStorage.getItem('nexus_accounts')) {
    localStorage.setItem('nexus_accounts', JSON.stringify(INITIAL_ACCOUNTS));
  }
  if (!localStorage.getItem('nexus_scraped')) {
    localStorage.setItem('nexus_scraped', JSON.stringify(INITIAL_SCRAPED_USERS));
  }
  if (!localStorage.getItem('nexus_posts')) {
    localStorage.setItem('nexus_posts', JSON.stringify(INITIAL_SCHEDULED_POSTS));
  }
  if (!localStorage.getItem('nexus_rules')) {
    localStorage.setItem('nexus_rules', JSON.stringify(INITIAL_RULE_SETS));
  }
  if (!localStorage.getItem('nexus_proxies')) {
    localStorage.setItem('nexus_proxies', JSON.stringify(INITIAL_PROXIES));
  }
  if (!localStorage.getItem('nexus_blog')) {
    localStorage.setItem('nexus_blog', JSON.stringify(INITIAL_BLOG_POSTS));
  }
  if (!localStorage.getItem('nexus_keywords')) {
    localStorage.setItem('nexus_keywords', JSON.stringify(INITIAL_KEYWORDS));
  }
  if (!localStorage.getItem('nexus_emails')) {
    localStorage.setItem('nexus_emails', JSON.stringify(INITIAL_EMAILS));
  }
  if (!localStorage.getItem('nexus_campaigns')) {
    localStorage.setItem('nexus_campaigns', JSON.stringify(INITIAL_CAMPAIGNS));
  }
  if (!localStorage.getItem('nexus_competitors')) {
    localStorage.setItem('nexus_competitors', JSON.stringify(INITIAL_COMPETITORS));
  }
  if (!localStorage.getItem('nexus_products')) {
    localStorage.setItem('nexus_products', JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem('nexus_tickets')) {
    localStorage.setItem('nexus_tickets', JSON.stringify(INITIAL_TICKETS));
  }
  if (!localStorage.getItem('nexus_whitelist_blacklist')) {
    localStorage.setItem('nexus_whitelist_blacklist', JSON.stringify({ whitelist: ['#fitness', '@organic_athlete', 'AEO tools'], blacklist: ['#spam', '@spam_bot_unlimited', 'cryptoseller'] }));
  }
  if (!localStorage.getItem('nexus_logs')) {
    localStorage.setItem('nexus_logs', JSON.stringify(INITIAL_LIVESTREAMS));
  }
  if (!localStorage.getItem('nexus_theme')) {
    localStorage.setItem('nexus_theme', 'dark');
  }
}
