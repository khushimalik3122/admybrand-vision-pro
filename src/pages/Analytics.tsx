import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RevenueChart } from "@/components/dashboard/charts/revenue-chart"
import { ChannelChart } from "@/components/dashboard/charts/channel-chart"
import { TrafficChart } from "@/components/dashboard/charts/traffic-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, DollarSign, Target, RefreshCw, Activity, ArrowUp, ArrowDown } from "lucide-react"
import { marketingAnalyticsService, type AnalyticsData } from "@/lib/market-data"

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    // Subscribe to real-time data updates
    const unsubscribe = marketingAnalyticsService.subscribe((data) => {
      setAnalyticsData(data)
      setLastUpdated(new Date())
    })

    // Cleanup subscription on unmount
    return unsubscribe
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      // Simulate manual refresh
      await new Promise(resolve => setTimeout(resolve, 1000))
      const currentData = marketingAnalyticsService.getCurrentData()
      setAnalyticsData(currentData)
      setLastUpdated(new Date())
    } finally {
      setIsRefreshing(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value: number, decimals = 0) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value)
  }

  if (!analyticsData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 animate-pulse" />
            <span>Loading real-time analytics...</span>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const { campaignMetrics, campaigns, brandMetrics, trafficSources } = analyticsData

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Analytics Overview</h1>
            <p className="text-muted-foreground">Real-time marketing performance metrics and market data</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="hover-glow"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Live Campaign Performance */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Live Campaign Performance
            </CardTitle>
            <CardDescription>Real-time performance data from your active marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {campaigns.map((campaign) => (
                <div key={campaign.platform} className="p-4 rounded-lg border border-border/50 bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{campaign.platform}</span>
                    <Badge variant={campaign.status === 'active' ? "default" : campaign.status === 'paused' ? "secondary" : "outline"}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold mb-1">{campaign.name}</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Spend:</span>
                      <span className="font-medium">{formatCurrency(campaign.spend)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ROAS:</span>
                      <span className={`font-medium ${campaign.roas >= 4 ? 'text-green-600' : campaign.roas >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {campaign.roas.toFixed(1)}x
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conversions:</span>
                      <span className="font-medium">{formatNumber(campaign.conversions)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Brand Metrics */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Brand Health Metrics
            </CardTitle>
            <CardDescription>Real-time brand awareness and sentiment tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{formatNumber(brandMetrics.brandAwareness, 1)}%</div>
                <div className="text-sm text-muted-foreground">Brand Awareness</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{formatNumber(brandMetrics.brandSentiment, 1)}%</div>
                <div className="text-sm text-muted-foreground">Brand Sentiment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{formatNumber(brandMetrics.socialMentions)}</div>
                <div className="text-sm text-muted-foreground">Social Mentions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{formatNumber(brandMetrics.shareOfVoice, 1)}%</div>
                <div className="text-sm text-muted-foreground">Share of Voice</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{formatNumber(brandMetrics.engagementRate, 1)}%</div>
                <div className="text-sm text-muted-foreground">Engagement Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(campaignMetrics.revenue)}</div>
              <p className="text-xs text-muted-foreground">Live campaign revenue</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(campaignMetrics.conversionRate, 1)}%</div>
              <p className="text-xs text-muted-foreground">Real-time conversion tracking</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(campaignMetrics.sessions)}</div>
              <p className="text-xs text-muted-foreground">Active user sessions</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{formatNumber(campaignMetrics.growthRate, 1)}%</div>
              <p className="text-xs text-muted-foreground">Month-over-month growth</p>
            </CardContent>
          </Card>
        </div>

        {/* Traffic Sources */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Traffic Sources Performance</CardTitle>
            <CardDescription>Real-time performance by traffic source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary/20 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{source.source}</h4>
                      <p className="text-sm text-muted-foreground">{formatNumber(source.visitors)} visitors</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(source.revenue)}</div>
                    <div className="text-sm text-muted-foreground">{formatNumber(source.conversions)} conversions</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueChart />
          <ChannelChart />
        </div>

        <TrafficChart />
      </div>
    </DashboardLayout>
  )
}