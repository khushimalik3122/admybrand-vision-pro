import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Bell, CheckCircle, AlertTriangle, Info, Settings } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Campaign Performance Alert",
    message: "Your 'Summer Sale' campaign has exceeded its ROAS target by 25%",
    time: "2 minutes ago",
    read: false
  },
  {
    id: 2,
    type: "warning",
    title: "Budget Threshold Reached",
    message: "Facebook Ads campaign has reached 80% of monthly budget",
    time: "15 minutes ago",
    read: false
  },
  {
    id: 3,
    type: "info",
    title: "Weekly Report Available",
    message: "Your weekly performance report is ready for download",
    time: "1 hour ago",
    read: true
  },
  {
    id: 4,
    type: "success",
    title: "Conversion Goal Achieved",
    message: "Congratulations! You've reached this month's conversion target",
    time: "3 hours ago",
    read: true
  },
  {
    id: 5,
    type: "warning",
    title: "Low Performing Keywords",
    message: "5 keywords in Google Ads have low quality scores",
    time: "1 day ago",
    read: true
  }
]

const notificationSettings = [
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
]

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
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your campaign alerts and system notifications</p>
          </div>
          <Button variant="outline" className="hover-glow">
            <Settings className="w-4 h-4 mr-2" />
            Preferences
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">New notifications</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">Total notifications</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Settings</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
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
                  <Button variant="ghost" size="sm">
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
                  <Switch checked={setting.enabled} />
                </div>
              ))}
              <Button className="w-full hover-glow">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}