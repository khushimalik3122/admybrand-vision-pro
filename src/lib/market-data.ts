// Marketing Analytics API Service
// This service provides real-time marketing campaign and brand analytics data

export interface CampaignData {
  platform: string
  name: string
  spend: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  roas: number
  status: 'active' | 'paused' | 'completed'
  timestamp: number
}

export interface CampaignMetrics {
  revenue: number
  conversionRate: number
  sessions: number
  growthRate: number
  ctr: number
  cpc: number
  roas: number
  timestamp: number
}

export interface AnalyticsData {
  campaigns: CampaignData[]
  campaignMetrics: CampaignMetrics
  brandMetrics: {
    brandAwareness: number
    brandSentiment: number
    socialMentions: number
    shareOfVoice: number
    engagementRate: number
    timestamp: number
  }
  trafficSources: Array<{
    source: string
    visitors: number
    conversions: number
    revenue: number
  }>
  revenueData: Array<{
    date: string
    revenue: number
    profit: number
  }>
}

// Simulated real-time marketing data (in production, this would connect to real APIs)
class MarketingAnalyticsService {
  private static instance: MarketingAnalyticsService
  private subscribers: Set<(data: AnalyticsData) => void> = new Set()
  private intervalId: NodeJS.Timeout | null = null
  private currentData: AnalyticsData

  constructor() {
    this.currentData = this.generateInitialData()
  }

  static getInstance(): MarketingAnalyticsService {
    if (!MarketingAnalyticsService.instance) {
      MarketingAnalyticsService.instance = new MarketingAnalyticsService()
    }
    return MarketingAnalyticsService.instance
  }

  private generateInitialData(): AnalyticsData {
    return {
      campaigns: [
        {
          platform: 'Google Ads',
          name: 'Summer Sale Campaign',
          spend: 12500,
          impressions: 450000,
          clicks: 14400,
          conversions: 432,
          ctr: 3.2,
          cpc: 0.87,
          roas: 4.8,
          status: 'active',
          timestamp: Date.now()
        },
        {
          platform: 'Facebook Ads',
          name: 'Brand Awareness Drive',
          spend: 8900,
          impressions: 380000,
          clicks: 11400,
          conversions: 285,
          ctr: 3.0,
          cpc: 0.78,
          roas: 3.6,
          status: 'active',
          timestamp: Date.now()
        },
        {
          platform: 'Instagram Ads',
          name: 'Product Launch',
          spend: 6200,
          impressions: 280000,
          clicks: 8400,
          conversions: 210,
          ctr: 3.0,
          cpc: 0.74,
          roas: 5.2,
          status: 'active',
          timestamp: Date.now()
        }
      ],
      campaignMetrics: {
        revenue: 34521,
        conversionRate: 4.8,
        sessions: 145892,
        growthRate: 18.2,
        ctr: 3.2,
        cpc: 1.45,
        roas: 4.8,
        timestamp: Date.now()
      },
      brandMetrics: {
        brandAwareness: 78.5,
        brandSentiment: 82.3,
        socialMentions: 1247,
        shareOfVoice: 15.8,
        engagementRate: 6.4,
        timestamp: Date.now()
      },
      trafficSources: [
        { source: 'Google Ads', visitors: 45000, conversions: 2160, revenue: 12500 },
        { source: 'Facebook Ads', visitors: 38000, conversions: 1824, revenue: 10800 },
        { source: 'Instagram', visitors: 28000, conversions: 1120, revenue: 8200 },
        { source: 'LinkedIn', visitors: 15000, conversions: 750, revenue: 5500 },
        { source: 'Organic', visitors: 52000, conversions: 1560, revenue: 9200 }
      ],
      revenueData: this.generateRevenueData()
    }
  }

  private generateRevenueData() {
    const data = []
    const now = new Date()
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      
      const baseRevenue = 1000 + Math.random() * 500
      const seasonality = Math.sin((i / 30) * Math.PI * 2) * 200
      const trend = i * 10
      const revenue = Math.round(baseRevenue + seasonality + trend)
      
      data.push({
        date: date.toISOString().split('T')[0],
        revenue,
        profit: Math.round(revenue * 0.3)
      })
    }
    
    return data
  }

  private updateData(): void {
    // Simulate real-time updates
    this.currentData.campaignMetrics = {
      ...this.currentData.campaignMetrics,
      revenue: this.currentData.campaignMetrics.revenue + (Math.random() - 0.5) * 100,
      conversionRate: Math.max(0, this.currentData.campaignMetrics.conversionRate + (Math.random() - 0.5) * 0.2),
      sessions: this.currentData.campaignMetrics.sessions + Math.floor((Math.random() - 0.5) * 50),
      growthRate: Math.max(0, this.currentData.campaignMetrics.growthRate + (Math.random() - 0.5) * 1),
      timestamp: Date.now()
    }

    // Update campaign data
    this.currentData.campaigns = this.currentData.campaigns.map(campaign => ({
      ...campaign,
      spend: Math.max(0, campaign.spend + (Math.random() - 0.5) * 100),
      impressions: Math.max(0, campaign.impressions + Math.floor((Math.random() - 0.5) * 5000)),
      clicks: Math.max(0, campaign.clicks + Math.floor((Math.random() - 0.5) * 200)),
      conversions: Math.max(0, campaign.conversions + Math.floor((Math.random() - 0.5) * 10)),
      ctr: Math.max(0, campaign.ctr + (Math.random() - 0.5) * 0.2),
      cpc: Math.max(0.1, campaign.cpc + (Math.random() - 0.5) * 0.1),
      roas: Math.max(0, campaign.roas + (Math.random() - 0.5) * 0.5),
      timestamp: Date.now()
    }))

    // Update brand metrics
    this.currentData.brandMetrics = {
      ...this.currentData.brandMetrics,
      brandAwareness: Math.max(0, Math.min(100, this.currentData.brandMetrics.brandAwareness + (Math.random() - 0.5) * 2)),
      brandSentiment: Math.max(0, Math.min(100, this.currentData.brandMetrics.brandSentiment + (Math.random() - 0.5) * 1.5)),
      socialMentions: Math.max(0, this.currentData.brandMetrics.socialMentions + Math.floor((Math.random() - 0.5) * 50)),
      shareOfVoice: Math.max(0, Math.min(100, this.currentData.brandMetrics.shareOfVoice + (Math.random() - 0.5) * 1)),
      engagementRate: Math.max(0, Math.min(20, this.currentData.brandMetrics.engagementRate + (Math.random() - 0.5) * 0.3)),
      timestamp: Date.now()
    }

    // Update traffic sources with small variations
    this.currentData.trafficSources = this.currentData.trafficSources.map(source => ({
      ...source,
      visitors: Math.max(0, source.visitors + Math.floor((Math.random() - 0.5) * 100)),
      conversions: Math.max(0, source.conversions + Math.floor((Math.random() - 0.5) * 10)),
      revenue: Math.max(0, source.revenue + Math.floor((Math.random() - 0.5) * 50))
    }))

    // Notify all subscribers
    this.subscribers.forEach(callback => callback(this.currentData))
  }

  subscribe(callback: (data: AnalyticsData) => void): () => void {
    this.subscribers.add(callback)
    
    // Send initial data
    callback(this.currentData)
    
    // Start updates if this is the first subscriber
    if (this.subscribers.size === 1) {
      this.startUpdates()
    }
    
    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback)
      if (this.subscribers.size === 0) {
        this.stopUpdates()
      }
    }
  }

  private startUpdates(): void {
    if (this.intervalId) return
    
    // Update every 5 seconds
    this.intervalId = setInterval(() => {
      this.updateData()
    }, 5000)
  }

  private stopUpdates(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  // Method to get current data without subscribing
  getCurrentData(): AnalyticsData {
    return this.currentData
  }

  // Method to fetch external marketing data (placeholder for real API integration)
  async fetchRealCampaignData(platforms: string[]): Promise<CampaignData[]> {
    // In a real implementation, this would call external APIs like:
    // - Google Ads API
    // - Facebook Marketing API
    // - Instagram Graph API
    // - LinkedIn Campaign Manager API
    // - Twitter Ads API
    // - TikTok Marketing API
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return platforms.map(platform => ({
        platform,
        name: `${platform} Campaign`,
        spend: Math.floor(Math.random() * 20000),
        impressions: Math.floor(Math.random() * 500000),
        clicks: Math.floor(Math.random() * 15000),
        conversions: Math.floor(Math.random() * 500),
        ctr: 2 + Math.random() * 3,
        cpc: 0.5 + Math.random() * 1.5,
        roas: 2 + Math.random() * 4,
        status: Math.random() > 0.8 ? 'paused' : 'active',
        timestamp: Date.now()
      }))
    } catch (error) {
      console.error('Failed to fetch campaign data:', error)
      return []
    }
  }

  // Method to fetch campaign data from marketing platforms
  async fetchCampaignData(): Promise<CampaignMetrics> {
    // In a real implementation, this would integrate with:
    // - Google Ads API
    // - Facebook Marketing API
    // - LinkedIn Campaign Manager API
    // - Twitter Ads API
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      return {
        revenue: 30000 + Math.random() * 10000,
        conversionRate: 3 + Math.random() * 3,
        sessions: 100000 + Math.random() * 100000,
        growthRate: 10 + Math.random() * 20,
        ctr: 2 + Math.random() * 3,
        cpc: 1 + Math.random() * 2,
        roas: 3 + Math.random() * 4,
        timestamp: Date.now()
      }
    } catch (error) {
      console.error('Failed to fetch campaign data:', error)
      return this.currentData.campaignMetrics
    }
  }
}

export const marketingAnalyticsService = MarketingAnalyticsService.getInstance()
export default marketingAnalyticsService
