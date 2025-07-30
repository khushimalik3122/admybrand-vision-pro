import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CampaignTable } from "@/components/dashboard/campaign-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { marketingAnalyticsService, type AnalyticsData } from "@/lib/market-data"
import { Plus, Target, TrendingUp, Users, DollarSign, Download, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"

export default function Campaigns() {
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
      description: "Campaign data has been updated with the latest information",
    })
  }

  const handleExportCSV = () => {
    if (!analyticsData) return

    const csvData = [
      ['Campaign Name', 'Platform', 'Spend', 'Impressions', 'Clicks', 'Conversions', 'CTR (%)', 'CPC ($)', 'ROAS', 'Status'],
      ...analyticsData.campaigns.map(campaign => [
        campaign.name,
        campaign.platform,
        campaign.spend.toLocaleString(),
        campaign.impressions.toLocaleString(),
        campaign.clicks.toLocaleString(),
        campaign.conversions.toLocaleString(),
        (campaign.ctr * 100).toFixed(2),
        campaign.cpc.toFixed(2),
        campaign.roas.toFixed(1),
        campaign.status
      ])
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `campaigns-data-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: "Export Complete",
      description: "Campaign data has been exported to CSV",
    })
  }

  const totalSpend = analyticsData ? analyticsData.campaigns.reduce((sum, c) => sum + c.spend, 0) : 0
  const totalConversions = analyticsData ? analyticsData.campaigns.reduce((sum, c) => sum + c.conversions, 0) : 0
  const avgRoas = analyticsData ? analyticsData.campaigns.reduce((sum, c) => sum + c.roas, 0) / analyticsData.campaigns.length : 0
  const activeCampaigns = analyticsData ? analyticsData.campaigns.filter(c => c.status === 'active').length : 0

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Campaign Management</h1>
            <p className="text-muted-foreground">Monitor and optimize your marketing campaigns</p>
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
            <Button className="hover-glow">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
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
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCampaigns}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpend.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. ROAS</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgRoas.toFixed(1)}x</div>
              <p className="text-xs text-muted-foreground">Across all campaigns</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConversions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total this month</p>
            </CardContent>
          </Card>
        </div>

        <CampaignTable />
      </div>
    </DashboardLayout>
  )
}