import { MetricCard } from "@/components/dashboard/metric-card"
import { RevenueChart } from "@/components/dashboard/charts/revenue-chart"
import { ChannelChart } from "@/components/dashboard/charts/channel-chart"
import { TrafficChart } from "@/components/dashboard/charts/traffic-chart"
import { CampaignTable } from "@/components/dashboard/campaign-table"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { marketingAnalyticsService, type AnalyticsData } from "@/lib/market-data"
import { Download, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"
import heroImage from "@/assets/dashboard-hero.jpg"

const Index = () => {
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
      description: "Overview data has been updated with the latest information",
    })
  }

  const handleExportCSV = () => {
    if (!analyticsData) return

    const csvData = [
      ['Metric', 'Value', 'Change', 'Last Updated'],
      ['Total Revenue', `$${analyticsData.campaignMetrics.revenue.toLocaleString()}`, '+12.5%', lastUpdated.toLocaleString()],
      ['Total Spend', `$${analyticsData.campaigns.reduce((sum, c) => sum + c.spend, 0).toLocaleString()}`, '+8.3%', lastUpdated.toLocaleString()],
      ['Average ROAS', `${analyticsData.campaignMetrics.roas.toFixed(1)}x`, '+15.2%', lastUpdated.toLocaleString()],
      ['Conversions', analyticsData.campaigns.reduce((sum, c) => sum + c.conversions, 0).toLocaleString(), '+23.1%', lastUpdated.toLocaleString()],
      ['Brand Awareness', `${analyticsData.brandMetrics.brandAwareness.toFixed(1)}%`, '+5.8%', lastUpdated.toLocaleString()],
      ['Brand Sentiment', `${analyticsData.brandMetrics.brandSentiment.toFixed(1)}%`, '+2.3%', lastUpdated.toLocaleString()],
      ['Social Mentions', analyticsData.brandMetrics.socialMentions.toLocaleString(), '+18.7%', lastUpdated.toLocaleString()],
      ...analyticsData.campaigns.map(campaign => [
        `${campaign.name} (${campaign.platform})`,
        `$${campaign.spend.toLocaleString()}`,
        `${campaign.roas.toFixed(1)}x ROAS`,
        `${campaign.conversions} conversions`
      ])
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `overview-analytics-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: "Export Complete",
      description: "Overview analytics data has been exported to CSV",
    })
  }

  const metricsData = analyticsData ? [
    {
      id: 1,
      title: "Total Revenue",
      value: `$${analyticsData.campaignMetrics.revenue.toLocaleString()}`,
      change: 12.5,
      trend: "up" as const,
      icon: "dollar-sign",
      description: "Total revenue generated from campaigns"
    },
    {
      id: 2,
      title: "Total Spend",
      value: `$${analyticsData.campaigns.reduce((sum, c) => sum + c.spend, 0).toLocaleString()}`,
      change: 8.3,
      trend: "up" as const,
      icon: "trending-up",
      description: "Total advertising spend across all campaigns"
    },
    {
      id: 3,
      title: "Average ROAS",
      value: `${analyticsData.campaignMetrics.roas.toFixed(1)}x`,
      change: 15.2,
      trend: "up" as const,
      icon: "target",
      description: "Return on advertising spend"
    },
    {
      id: 4,
      title: "Conversions",
      value: analyticsData.campaigns.reduce((sum, c) => sum + c.conversions, 0).toLocaleString(),
      change: 23.1,
      trend: "up" as const,
      icon: "users",
      description: "Total conversions across all campaigns"
    }
  ] : []

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div 
          className="relative h-48 rounded-2xl glass-card overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2 animate-fade-in">
              ADmyBRAND Insights
            </h1>
            <p className="text-xl opacity-90 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Your Digital Marketing Command Center
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => (
            <div 
              key={metric.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <MetricCard {...metric} />
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <ChannelChart />
          <TrafficChart />
        </div>

        {/* Campaign Table */}
        <CampaignTable />
      </div>
    </DashboardLayout>
  );
};

export default Index;
