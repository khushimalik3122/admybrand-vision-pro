import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RevenueChart } from "@/components/dashboard/charts/revenue-chart"
import { ChannelChart } from "@/components/dashboard/charts/channel-chart"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { marketingAnalyticsService, type AnalyticsData } from "@/lib/market-data"
import { TrendingUp, Target, Clock, Zap, Download, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent':
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
    case 'good':
      return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20'
    case 'warning':
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20'
    case 'poor':
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'
    default:
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20'
  }
}

export default function Performance() {
  const { toast } = useToast()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      const data = marketingAnalyticsService.getCurrentData()
      setAnalyticsData(data)
      setLastUpdated(new Date())
      setIsLoading(false)
    }

    loadData()

    // Subscribe to real-time updates
    const unsubscribe = marketingAnalyticsService.subscribe((data) => {
      setAnalyticsData(data)
      setLastUpdated(new Date())
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleRefresh = async () => {
    setIsLoading(true)
    const data = marketingAnalyticsService.getCurrentData()
    setAnalyticsData(data)
    setLastUpdated(new Date())
    setIsLoading(false)
    toast({
      title: "Data Refreshed",
      description: "Performance data has been updated with the latest information",
    })
  }

  const handleExportCSV = () => {
    if (!analyticsData) return

    const performanceMetrics = [
      {
        metric: "Page Load Speed",
        value: "1.2s",
        target: "< 2s",
        percentage: 85,
        status: "good",
        trend: "+15%"
      },
      {
        metric: "Bounce Rate",
        value: "24%",
        target: "< 30%",
        percentage: 78,
        status: "good",
        trend: "-8%"
      },
      {
        metric: "Conversion Rate",
        value: analyticsData ? `${analyticsData.campaignMetrics.conversionRate.toFixed(1)}%` : "4.8%",
        target: "> 4%",
        percentage: analyticsData ? Math.min(analyticsData.campaignMetrics.conversionRate * 20, 100) : 92,
        status: "excellent",
        trend: "+12%"
      },
      {
        metric: "Customer Satisfaction",
        value: "4.6/5",
        target: "> 4.5",
        percentage: 88,
        status: "good",
        trend: "+0.2"
      }
    ]

    const dynamicChannelPerformance = analyticsData ? analyticsData.campaigns.map(campaign => ({
      channel: `${campaign.platform} Ads`,
      roas: campaign.roas,
      spend: campaign.spend,
      revenue: Math.floor(campaign.spend * campaign.roas),
      efficiency: Math.min(Math.floor(campaign.roas * 20 + 15), 100)
    })) : [
      { channel: "Google Ads", roas: 4.2, spend: 25000, revenue: 105000, efficiency: 95 },
      { channel: "Facebook Ads", roas: 3.8, spend: 18000, revenue: 68400, efficiency: 88 },
      { channel: "Instagram Ads", roas: 3.1, spend: 12000, revenue: 37200, efficiency: 82 },
      { channel: "LinkedIn Ads", roas: 2.9, spend: 8000, revenue: 23200, efficiency: 76 },
      { channel: "Email Marketing", roas: 6.5, spend: 3000, revenue: 19500, efficiency: 98 }
    ]

    const csvData = [
      ['Performance Analytics Report', new Date().toLocaleString()],
      [''],
      ['PERFORMANCE METRICS'],
      ['Metric', 'Value', 'Target', 'Status', 'Trend'],
      ...performanceMetrics.map(metric => [
        metric.metric,
        metric.value,
        metric.target,
        metric.status,
        metric.trend
      ]),
      [''],
      ['CHANNEL PERFORMANCE'],
      ['Channel', 'ROAS', 'Spend', 'Revenue', 'Efficiency'],
      ...dynamicChannelPerformance.map(channel => [
        channel.channel,
        `${channel.roas}x`,
        `$${channel.spend.toLocaleString()}`,
        `$${channel.revenue.toLocaleString()}`,
        `${channel.efficiency}%`
      ]),
      [''],
      ['SUMMARY'],
      ['Overall Score', `${analyticsData ? Math.floor(analyticsData.campaignMetrics.roas * 20 + 7) : 87}/100`],
      ['Average ROAS', `${analyticsData ? analyticsData.campaignMetrics.roas.toFixed(1) : 4.1}x`],
      ['Response Time', "1.2s"],
      ['Efficiency', `${analyticsData ? Math.min(Math.floor(analyticsData.campaignMetrics.roas * 20 + 15), 100) : 92}%`]
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `performance-analytics-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: "Export Complete",
      description: "Performance analytics have been exported to CSV",
    })
  }

  // Generate dynamic performance data
  const avgRoas = analyticsData ? analyticsData.campaignMetrics.roas : 4.1
  const overallScore = Math.floor(avgRoas * 20 + 7)
  const responseTime = "1.2s"
  const efficiency = analyticsData ? Math.min(Math.floor(analyticsData.campaignMetrics.roas * 20 + 15), 100) : 92

  const performanceMetrics = [
    {
      metric: "Page Load Speed",
      value: "1.2s",
      target: "< 2s",
      percentage: 85,
      status: "good",
      trend: "+15%"
    },
    {
      metric: "Bounce Rate",
      value: "24%",
      target: "< 30%",
      percentage: 78,
      status: "good",
      trend: "-8%"
    },
    {
      metric: "Conversion Rate",
      value: analyticsData ? `${analyticsData.campaignMetrics.conversionRate.toFixed(1)}%` : "4.8%",
      target: "> 4%",
      percentage: analyticsData ? Math.min(analyticsData.campaignMetrics.conversionRate * 20, 100) : 92,
      status: "excellent",
      trend: "+12%"
    },
    {
      metric: "Customer Satisfaction",
      value: "4.6/5",
      target: "> 4.5",
      percentage: 88,
      status: "good",
      trend: "+0.2"
    }
  ]

  const dynamicChannelPerformance = analyticsData ? analyticsData.campaigns.map(campaign => ({
    channel: `${campaign.platform} Ads`,
    roas: campaign.roas,
    spend: campaign.spend,
    revenue: Math.floor(campaign.spend * campaign.roas),
    efficiency: Math.min(Math.floor(campaign.roas * 20 + 15), 100)
  })) : [
    { channel: "Google Ads", roas: 4.2, spend: 25000, revenue: 105000, efficiency: 95 },
    { channel: "Facebook Ads", roas: 3.8, spend: 18000, revenue: 68400, efficiency: 88 },
    { channel: "Instagram Ads", roas: 3.1, spend: 12000, revenue: 37200, efficiency: 82 },
    { channel: "LinkedIn Ads", roas: 2.9, spend: 8000, revenue: 23200, efficiency: 76 },
    { channel: "Email Marketing", roas: 6.5, spend: 3000, revenue: 19500, efficiency: 98 }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Performance Dashboard</h1>
            <p className="text-muted-foreground">Track and optimize your marketing performance</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="hover-glow"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              disabled={!analyticsData}
              className="hover-glow"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallScore}/100</div>
              <p className="text-xs text-muted-foreground">+5 points this month</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. ROAS</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgRoas.toFixed(1)}x</div>
              <p className="text-xs text-muted-foreground">+0.3x from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{responseTime}</div>
              <p className="text-xs text-muted-foreground">15% faster</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{efficiency}%</div>
              <p className="text-xs text-muted-foreground">+8% improvement</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
                Key Performance Indicators
              </CardTitle>
              <CardDescription>Essential metrics and their targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{metric.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{metric.value}</span>
                      <Badge variant="outline" className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Target: {metric.target}</span>
                    <span className="text-green-600 dark:text-green-400">{metric.trend}</span>
                  </div>
                  <Progress value={metric.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
                Channel Efficiency
              </CardTitle>
              <CardDescription>Performance breakdown by marketing channel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dynamicChannelPerformance.map((channel, index) => (
                <div key={index} className="p-4 rounded-lg border border-border/50 bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{channel.channel}</span>
                    <Badge variant="outline">{channel.roas}x ROAS</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-2">
                    <div>Spend: ${channel.spend.toLocaleString()}</div>
                    <div>Revenue: ${channel.revenue.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Efficiency</span>
                    <span className="text-xs font-medium">{channel.efficiency}%</span>
                  </div>
                  <Progress value={channel.efficiency} className="h-2 mt-1" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueChart />
          <ChannelChart />
        </div>
      </div>
    </DashboardLayout>
  )
}