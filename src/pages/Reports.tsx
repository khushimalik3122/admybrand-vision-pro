import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { marketingAnalyticsService, type AnalyticsData } from "@/lib/market-data"
import { Calendar, Download, FileText, Clock, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
    case 'processing':
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20'
    case 'failed':
      return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'
    default:
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4" />
    case 'processing':
      return <Clock className="w-4 h-4" />
    case 'failed':
      return <AlertCircle className="w-4 h-4" />
    default:
      return <FileText className="w-4 h-4" />
  }
}

export default function Reports() {
  const { toast } = useToast()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Monthly Performance Report",
      description: "Comprehensive analysis of all marketing activities",
      status: "completed",
      date: new Date().toISOString().split('T')[0],
      format: "PDF",
      size: "2.4 MB"
    },
    {
      id: 2,
      title: "Campaign ROI Analysis",
      description: "Detailed ROI breakdown by campaign and channel",
      status: "processing",
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      format: "Excel",
      size: "1.8 MB"
    },
    {
      id: 3,
      title: "Audience Insights Report",
      description: "Demographics and behavior analysis",
      status: "completed",
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      format: "PDF",
      size: "3.1 MB"
    },
    {
      id: 4,
      title: "Channel Performance Summary",
      description: "Cross-channel performance comparison",
      status: "failed",
      date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
      format: "PDF",
      size: "1.2 MB"
    }
  ])

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
      description: "Reports data has been updated with the latest information",
    })
  }

  const handleGenerateReport = () => {
    const newReport = {
      id: reports.length + 1,
      title: "Real-time Analytics Report",
      description: "Current campaign performance and brand metrics",
      status: "processing",
      date: new Date().toISOString().split('T')[0],
      format: "PDF",
      size: "2.1 MB"
    }
    
    setReports([newReport, ...reports])
    
    // Simulate report generation
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === newReport.id ? { ...r, status: "completed" } : r
      ))
      toast({
        title: "Report Generated",
        description: "Your analytics report is ready for download",
      })
    }, 3000)
    
    toast({
      title: "Report Generation Started",
      description: "Your report is being generated and will be ready shortly",
    })
  }

  const handleDownloadReport = (reportId: number) => {
    if (!analyticsData) return

    const csvData = [
      ['Report Generated:', new Date().toLocaleString()],
      [''],
      ['CAMPAIGN PERFORMANCE'],
      ['Campaign Name', 'Platform', 'Spend', 'ROAS', 'Conversions', 'Status'],
      ...analyticsData.campaigns.map(campaign => [
        campaign.name,
        campaign.platform,
        `$${campaign.spend.toLocaleString()}`,
        `${campaign.roas.toFixed(1)}x`,
        campaign.conversions.toString(),
        campaign.status
      ]),
      [''],
      ['BRAND METRICS'],
      ['Metric', 'Value'],
      ['Brand Awareness', `${analyticsData.brandMetrics.brandAwareness.toFixed(1)}%`],
      ['Brand Sentiment', `${analyticsData.brandMetrics.brandSentiment.toFixed(1)}%`],
      ['Social Mentions', analyticsData.brandMetrics.socialMentions.toString()],
      ['Share of Voice', `${analyticsData.brandMetrics.shareOfVoice.toFixed(1)}%`],
      ['Engagement Rate', `${analyticsData.brandMetrics.engagementRate.toFixed(1)}%`],
      [''],
      ['SUMMARY'],
      ['Total Revenue', `$${analyticsData.campaignMetrics.revenue.toLocaleString()}`],
      ['Average ROAS', `${analyticsData.campaignMetrics.roas.toFixed(1)}x`],
      ['Conversion Rate', `${analyticsData.campaignMetrics.conversionRate.toFixed(2)}%`]
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-report-${reportId}-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: "Download Complete",
      description: "Analytics report has been downloaded",
    })
  }

  const completedReports = reports.filter(r => r.status === 'completed').length
  const processingReports = reports.filter(r => r.status === 'processing').length
  const totalDownloads = completedReports * 15 + Math.floor(Math.random() * 50)
  const scheduledReports = 8

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate and download detailed performance reports</p>
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
            <Button className="hover-glow" onClick={handleGenerateReport}>
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
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
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reports.length}</div>
              <p className="text-xs text-muted-foreground">Available reports</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDownloads}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduledReports}</div>
              <p className="text-xs text-muted-foreground">Auto-generated</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{processingReports}</div>
              <p className="text-xs text-muted-foreground">In queue</p>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
              Recent Reports
            </CardTitle>
            <CardDescription>
              Your latest generated reports and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{report.date}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{report.format}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline" 
                      className={`capitalize ${getStatusColor(report.status)}`}
                    >
                      <div className="flex items-center gap-1">
                        {getStatusIcon(report.status)}
                        {report.status}
                      </div>
                    </Badge>
                    {report.status === 'completed' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="hover-glow"
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}