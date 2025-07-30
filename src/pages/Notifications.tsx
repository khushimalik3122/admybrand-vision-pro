import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Bell, CheckCircle, AlertTriangle, Info, Settings, RefreshCw, Activity } from "lucide-react"
import { marketingAnalyticsService, type AnalyticsData } from "@/lib/market-data"

interface Notification {
  id: number
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  time: string
  read: boolean
  campaign?: string
  metric?: string
  value?: number
}

const generateNotifications = (data: AnalyticsData): Notification[] => {
  const notifications: Notification[] = []
  let id = 1

  // Check campaign performance
  data.campaigns.forEach(campaign => {
    if (campaign.roas > 5) {
      notifications.push({
        id: id++,
        type: 'success',
        title: 'Excellent ROAS Performance',
        message: `${campaign.name} on ${campaign.platform} has achieved ${campaign.roas.toFixed(1)}x ROAS`,
        time: '2 minutes ago',
        read: false,
        campaign: campaign.name,
        metric: 'ROAS',
        value: campaign.roas
      })
    } else if (campaign.roas < 2) {
      notifications.push({
        id: id++,
        type: 'warning',
        title: 'Low ROAS Alert',
        message: `${campaign.name} on ${campaign.platform} has low ROAS of ${campaign.roas.toFixed(1)}x`,
        time: '5 minutes ago',
        read: false,
        campaign: campaign.name,
        metric: 'ROAS',
        value: campaign.roas
      })
    }

    if (campaign.spend > 10000) {
      notifications.push({
        id: id++,
        type: 'warning',
        title: 'High Spend Alert',
        message: `${campaign.platform} campaign spend has reached $${campaign.spend.toLocaleString()}`,
        time: '15 minutes ago',
        read: false,
        campaign: campaign.name,
        metric: 'Spend',
        value: campaign.spend
      })
    }
  })

  // Brand metrics notifications
  if (data.brandMetrics.brandSentiment > 85) {
    notifications.push({
      id: id++,
      type: 'success',
      title: 'Positive Brand Sentiment',
      message: `Brand sentiment is at an excellent ${data.brandMetrics.brandSentiment.toFixed(1)}%`,
      time: '30 minutes ago',
      read: true,
      metric: 'Brand Sentiment',
      value: data.brandMetrics.brandSentiment
    })
  }

  if (data.brandMetrics.socialMentions > 1200) {
    notifications.push({
      id: id++,
      type: 'info',
      title: 'High Social Engagement',
      message: `Your brand has ${data.brandMetrics.socialMentions} social mentions this week`,
      time: '1 hour ago',
      read: true,
      metric: 'Social Mentions',
      value: data.brandMetrics.socialMentions
    })
  }

  // Revenue notifications
  if (data.campaignMetrics.revenue > 35000) {
    notifications.push({
      id: id++,
      type: 'success',
      title: 'Revenue Target Exceeded',
      message: `Monthly revenue has reached $${data.campaignMetrics.revenue.toLocaleString()}`,
      time: '2 hours ago',
      read: true,
      metric: 'Revenue',
      value: data.campaignMetrics.revenue
    })
  }

  return notifications.sort((a, b) => (a.read ? 1 : 0) - (b.read ? 1 : 0))
}



const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-500" />
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />
    case 'error':
      return <AlertTriangle className="w-5 h-5 text-red-500" />
    default:
      return <Info className="w-5 h-5 text-blue-500" />
  }
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'border-l-green-500'
    case 'warning':
      return 'border-l-yellow-500'
    case 'error':
      return 'border-l-red-500'
    default:
      return 'border-l-blue-500'
  }
}

export default function Notifications() {
  const { toast } = useToast()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [notificationSettings, setNotificationSettings] = useState([
    {
      category: "Campaign Alerts",
      description: "Get notified about campaign performance changes",
      enabled: true
    },
    {
      category: "Budget Warnings",
      description: "Receive alerts when budgets reach thresholds",
      enabled: true
    },
    {
      category: "Weekly Reports",
      description: "Automatic weekly performance summaries",
      enabled: false
    },
    {
      category: "Goal Achievements",
      description: "Celebrate when targets are reached",
      enabled: true
    },
    {
      category: "System Updates",
      description: "Important platform and feature updates",
      enabled: false
    }
  ])
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    // Subscribe to real-time data updates
    const unsubscribe = marketingAnalyticsService.subscribe((data) => {
      setAnalyticsData(data)
      const newNotifications = generateNotifications(data)
      setNotifications(newNotifications)
      setLastUpdated(new Date())
    })

    return unsubscribe
  }, [])

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    toast({
      title: "Notifications Updated",
      description: "All notifications marked as read",
    })
  }

  const handleNotificationClick = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    )
  }

  const handleSettingToggle = (index: number) => {
    setNotificationSettings(prev => 
      prev.map((setting, i) => 
        i === index ? { ...setting, enabled: !setting.enabled } : setting
      )
    )
    toast({
      title: "Settings Updated",
      description: "Notification preferences have been saved",
    })
  }

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your notification settings have been updated",
    })
  }

  const unreadCount = notifications.filter(n => !n.read).length
  const thisWeekCount = notifications.length
  const alertsCount = notifications.filter(n => n.type === 'warning' || n.type === 'error').length
  const activeSettingsCount = notificationSettings.filter(s => s.enabled).length

  if (!analyticsData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 animate-pulse" />
            <span>Loading notifications...</span>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Notifications</h1>
            <p className="text-muted-foreground">Real-time campaign alerts and system notifications</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <Button variant="outline" className="hover-glow" onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">New notifications</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{thisWeekCount}</div>
              <p className="text-xs text-muted-foreground">Total notifications</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alertsCount}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Settings</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSettingsCount}</div>
              <p className="text-xs text-muted-foreground">Active categories</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="glass-card hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
                      Recent Notifications
                    </CardTitle>
                    <CardDescription>Your latest alerts and updates</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                    Mark all as read
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg border-l-4 ${getNotificationColor(notification.type)} ${
                        notification.read ? 'bg-muted/20' : 'bg-muted/40'
                      } hover:bg-muted/50 transition-colors cursor-pointer`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{notification.title}</h4>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                              )}
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
                Notification Settings
              </CardTitle>
              <CardDescription>Customize your alert preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationSettings.map((setting, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20">
                  <div className="flex-1">
                    <div className="font-medium">{setting.category}</div>
                    <div className="text-xs text-muted-foreground">{setting.description}</div>
                  </div>
                  <Switch 
                    checked={setting.enabled} 
                    onCheckedChange={() => handleSettingToggle(index)}
                  />
                </div>
              ))}
              <Button className="w-full hover-glow" onClick={handleSavePreferences}>
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}