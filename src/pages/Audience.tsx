import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { marketingAnalyticsService, type AnalyticsData } from "@/lib/market-data"
import { Users, MapPin, Calendar, Smartphone, Download, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"



export default function Audience() {
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
      description: "Audience data has been updated with the latest information",
    })
  }

  const handleExportCSV = () => {
    if (!analyticsData) return

    const csvData = [
      ['Audience Analytics Report', new Date().toLocaleString()],
      [''],
      ['AUDIENCE SEGMENTS'],
      ['Age Group', 'Count', 'Percentage'],
      ...dynamicAudienceSegments.map(segment => [
        segment.name,
        segment.count.toString(),
        `${segment.percentage}%`
      ]),
      [''],
      ['TOP LOCATIONS'],
      ['Country', 'Users', 'Percentage'],
      ...dynamicTopLocations.map(location => [
        location.country,
        location.users.toString(),
        `${location.percentage}%`
      ]),
      [''],
      ['DEVICE BREAKDOWN'],
      ['Device Type', 'Users', 'Percentage'],
      ...dynamicDeviceBreakdown.map(device => [
        device.device,
        device.users.toString(),
        `${device.percentage}%`
      ]),
      [''],
      ['SUMMARY'],
      ['Total Users', totalUsers.toString()],
      ['Average Session Duration', avgSessionDuration],
      ['Top Country', topCountry],
      ['Mobile Users Percentage', `${mobilePercentage}%`]
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audience-insights-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: "Export Complete",
      description: "Audience insights have been exported to CSV",
    })
  }

  // Generate dynamic audience data based on campaign performance
  const totalUsers = analyticsData ? 
    Math.floor(analyticsData.campaigns.reduce((sum, c) => sum + c.impressions, 0) * 0.15) : 76990
  
  const avgSessionDuration = "4m 32s"
  const topCountry = "US"
  const mobilePercentage = 68

  const dynamicAudienceSegments = [
    { name: "Millennials (25-40)", count: Math.floor(totalUsers * 0.45), percentage: 45, color: "bg-blue-500" },
    { name: "Gen Z (18-24)", count: Math.floor(totalUsers * 0.30), percentage: 30, color: "bg-purple-500" },
    { name: "Gen X (41-56)", count: Math.floor(totalUsers * 0.20), percentage: 20, color: "bg-green-500" },
    { name: "Baby Boomers (57+)", count: Math.floor(totalUsers * 0.05), percentage: 5, color: "bg-orange-500" }
  ]

  const dynamicTopLocations = [
    { country: "United States", users: Math.floor(totalUsers * 0.37), percentage: 37 },
    { country: "United Kingdom", users: Math.floor(totalUsers * 0.20), percentage: 20 },
    { country: "Canada", users: Math.floor(totalUsers * 0.13), percentage: 13 },
    { country: "Australia", users: Math.floor(totalUsers * 0.10), percentage: 10 },
    { country: "Germany", users: Math.floor(totalUsers * 0.085), percentage: 8.5 },
    { country: "Others", users: Math.floor(totalUsers * 0.115), percentage: 11.5 }
  ]

  const dynamicDeviceBreakdown = [
    { device: "Mobile", percentage: 68, users: Math.floor(totalUsers * 0.68) },
    { device: "Desktop", percentage: 28, users: Math.floor(totalUsers * 0.28) },
    { device: "Tablet", percentage: 4, users: Math.floor(totalUsers * 0.04) }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Audience Insights</h1>
            <p className="text-muted-foreground">Understand your audience demographics and behavior</p>
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
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgSessionDuration}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Country</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{topCountry}</div>
              <p className="text-xs text-muted-foreground">37% of all users</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mobile Users</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mobilePercentage}%</div>
              <p className="text-xs text-muted-foreground">Primary device</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
                Age Demographics
              </CardTitle>
              <CardDescription>User distribution by age groups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dynamicAudienceSegments.map((segment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{segment.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{segment.count.toLocaleString()}</span>
                      <Badge variant="outline">{segment.percentage}%</Badge>
                    </div>
                  </div>
                  <Progress value={segment.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
                Geographic Distribution
              </CardTitle>
              <CardDescription>Top countries by user count</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dynamicTopLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary/20 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{location.country}</div>
                      <div className="text-xs text-muted-foreground">{location.users.toLocaleString()} users</div>
                    </div>
                  </div>
                  <Badge variant="outline">{location.percentage}%</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
              Device Breakdown
            </CardTitle>
            <CardDescription>User distribution by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {dynamicDeviceBreakdown.map((device, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary/20 flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{device.percentage}%</div>
                    <div className="font-medium">{device.device}</div>
                    <div className="text-sm text-muted-foreground">{device.users.toLocaleString()} users</div>
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