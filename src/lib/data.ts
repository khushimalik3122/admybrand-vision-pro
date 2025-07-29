// Mock data for ADmyBRAND Insights Dashboard

export interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: string;
  description: string;
}

export interface ChartData {
  month: string;
  revenue: number;
  users: number;
  conversions: number;
}

export interface ChannelData {
  channel: string;
  value: number;
  color: string;
}

export interface TrafficSource {
  source: string;
  value: number;
  percentage: number;
  color: string;
}

export interface CampaignData {
  id: string;
  name: string;
  channel: string;
  status: 'active' | 'paused' | 'completed';
  spend: number;
  revenue: number;
  conversions: number;
  conversionRate: number;
  roas: number;
  clicks: number;
  impressions: number;
  ctr: number;
  cpc: number;
  startDate: string;
  endDate: string;
}

// Mock metrics data
export const metricsData: MetricCard[] = [
  {
    id: '1',
    title: 'Total Revenue',
    value: '$847,392',
    change: 12.5,
    trend: 'up',
    icon: 'DollarSign',
    description: 'Revenue generated this month'
  },
  {
    id: '2',
    title: 'Active Users',
    value: '23,847',
    change: 8.2,
    trend: 'up',
    icon: 'Users',
    description: 'Monthly active users'
  },
  {
    id: '3',
    title: 'Conversions',
    value: '1,247',
    change: -2.1,
    trend: 'down',
    icon: 'Target',
    description: 'Total conversions this month'
  },
  {
    id: '4',
    title: 'Growth Rate',
    value: '15.3%',
    change: 4.7,
    trend: 'up',
    icon: 'TrendingUp',
    description: 'Month-over-month growth'
  }
];

// Revenue trend data (12 months)
export const revenueData: ChartData[] = [
  { month: 'Jan', revenue: 450000, users: 18500, conversions: 920 },
  { month: 'Feb', revenue: 520000, users: 19200, conversions: 1050 },
  { month: 'Mar', revenue: 480000, users: 18800, conversions: 980 },
  { month: 'Apr', revenue: 620000, users: 21000, conversions: 1180 },
  { month: 'May', revenue: 580000, users: 20500, conversions: 1120 },
  { month: 'Jun', revenue: 720000, users: 22800, conversions: 1350 },
  { month: 'Jul', revenue: 680000, users: 22200, conversions: 1280 },
  { month: 'Aug', revenue: 750000, users: 23500, conversions: 1420 },
  { month: 'Sep', revenue: 820000, users: 24800, conversions: 1580 },
  { month: 'Oct', revenue: 790000, users: 24200, conversions: 1520 },
  { month: 'Nov', revenue: 880000, users: 25500, conversions: 1680 },
  { month: 'Dec', revenue: 847392, users: 23847, conversions: 1247 }
];

// Channel performance data
export const channelData: ChannelData[] = [
  { channel: 'Google Ads', value: 325000, color: '#4285F4' },
  { channel: 'Facebook Ads', value: 245000, color: '#1877F2' },
  { channel: 'LinkedIn Ads', value: 125000, color: '#0A66C2' },
  { channel: 'Instagram Ads', value: 98000, color: '#E4405F' },
  { channel: 'TikTok Ads', value: 54392, color: '#000000' }
];

// Traffic sources data
export const trafficSources: TrafficSource[] = [
  { source: 'Organic Search', value: 8547, percentage: 35.8, color: '#10B981' },
  { source: 'Paid Search', value: 6234, percentage: 26.1, color: '#3B82F6' },
  { source: 'Social Media', value: 4521, percentage: 18.9, color: '#8B5CF6' },
  { source: 'Direct', value: 3245, percentage: 13.6, color: '#F59E0B' },
  { source: 'Referral', value: 1300, percentage: 5.6, color: '#EF4444' }
];

// Campaign performance data
export const campaignData: CampaignData[] = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    channel: 'Google Ads',
    status: 'active',
    spend: 12500,
    revenue: 48750,
    conversions: 125,
    conversionRate: 3.8,
    roas: 3.9,
    clicks: 3289,
    impressions: 45670,
    ctr: 7.2,
    cpc: 3.80,
    startDate: '2024-06-01',
    endDate: '2024-08-31'
  },
  {
    id: '2',
    name: 'Brand Awareness Campaign',
    channel: 'Facebook Ads',
    status: 'active',
    spend: 8900,
    revenue: 32150,
    conversions: 89,
    conversionRate: 2.9,
    roas: 3.6,
    clicks: 3067,
    impressions: 78450,
    ctr: 3.9,
    cpc: 2.90,
    startDate: '2024-07-15',
    endDate: '2024-09-15'
  },
  {
    id: '3',
    name: 'Product Launch Campaign',
    channel: 'LinkedIn Ads',
    status: 'completed',
    spend: 15200,
    revenue: 67800,
    conversions: 156,
    conversionRate: 5.2,
    roas: 4.5,
    clicks: 2998,
    impressions: 23890,
    ctr: 12.6,
    cpc: 5.07,
    startDate: '2024-05-01',
    endDate: '2024-07-31'
  },
  {
    id: '4',
    name: 'Holiday Special',
    channel: 'Instagram Ads',
    status: 'paused',
    spend: 6750,
    revenue: 18900,
    conversions: 67,
    conversionRate: 2.1,
    roas: 2.8,
    clicks: 3190,
    impressions: 89560,
    ctr: 3.6,
    cpc: 2.12,
    startDate: '2024-11-01',
    endDate: '2024-12-31'
  },
  {
    id: '5',
    name: 'Retargeting Campaign',
    channel: 'Google Ads',
    status: 'active',
    spend: 4200,
    revenue: 21800,
    conversions: 78,
    conversionRate: 6.8,
    roas: 5.2,
    clicks: 1147,
    impressions: 8920,
    ctr: 12.9,
    cpc: 3.66,
    startDate: '2024-08-01',
    endDate: '2024-12-31'
  },
  {
    id: '6',
    name: 'Video Ad Campaign',
    channel: 'TikTok Ads',
    status: 'active',
    spend: 3800,
    revenue: 11400,
    conversions: 45,
    conversionRate: 1.8,
    roas: 3.0,
    clicks: 2500,
    impressions: 125000,
    ctr: 2.0,
    cpc: 1.52,
    startDate: '2024-09-01',
    endDate: '2024-11-30'
  },
  {
    id: '7',
    name: 'Local Business Ads',
    channel: 'Facebook Ads',
    status: 'active',
    spend: 2100,
    revenue: 8950,
    conversions: 32,
    conversionRate: 4.2,
    roas: 4.3,
    clicks: 762,
    impressions: 18900,
    ctr: 4.0,
    cpc: 2.76,
    startDate: '2024-10-01',
    endDate: '2024-12-31'
  },
  {
    id: '8',
    name: 'Black Friday Campaign',
    channel: 'Google Ads',
    status: 'completed',
    spend: 18900,
    revenue: 94500,
    conversions: 234,
    conversionRate: 4.1,
    roas: 5.0,
    clicks: 5707,
    impressions: 67890,
    ctr: 8.4,
    cpc: 3.31,
    startDate: '2024-11-20',
    endDate: '2024-11-30'
  },
  {
    id: '9',
    name: 'Competitor Analysis',
    channel: 'LinkedIn Ads',
    status: 'paused',
    spend: 5600,
    revenue: 16800,
    conversions: 52,
    conversionRate: 3.5,
    roas: 3.0,
    clicks: 1486,
    impressions: 12450,
    ctr: 11.9,
    cpc: 3.77,
    startDate: '2024-06-15',
    endDate: '2024-08-15'
  },
  {
    id: '10',
    name: 'Influencer Collaboration',
    channel: 'Instagram Ads',
    status: 'active',
    spend: 7200,
    revenue: 28800,
    conversions: 96,
    conversionRate: 3.2,
    roas: 4.0,
    clicks: 3000,
    impressions: 156000,
    ctr: 1.9,
    cpc: 2.40,
    startDate: '2024-09-15',
    endDate: '2024-12-15'
  }
];

// Utility functions
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'text-success bg-success/10 border-success/20';
    case 'paused':
      return 'text-warning bg-warning/10 border-warning/20';
    case 'completed':
      return 'text-muted-foreground bg-muted border-muted-foreground/20';
    default:
      return 'text-muted-foreground bg-muted border-muted-foreground/20';
  }
};