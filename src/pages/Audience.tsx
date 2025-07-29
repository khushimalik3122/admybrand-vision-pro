import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Calendar, Smartphone } from "lucide-react"

const audienceSegments = [
  { name: "Millennials (25-40)", count: 34521, percentage: 45, color: "bg-blue-500" },
  { name: "Gen Z (18-24)", count: 23456, percentage: 30, color: "bg-purple-500" },
  { name: "Gen X (41-56)", count: 15678, percentage: 20, color: "bg-green-500" },
  { name: "Baby Boomers (57+)", count: 3890, percentage: 5, color: "bg-orange-500" }
]

const topLocations = [
  { country: "United States", users: 28456, percentage: 37 },
  { country: "United Kingdom", users: 15234, percentage: 20 },
  { country: "Canada", users: 9876, percentage: 13 },
  { country: "Australia", users: 7654, percentage: 10 },
  { country: "Germany", users: 6543, percentage: 8.5 },
  { country: "Others", users: 9237, percentage: 11.5 }
]

const deviceBreakdown = [
  { device: "Mobile", percentage: 68, users: 52341 },
  { device: "Desktop", percentage: 28, users: 21567 },
  { device: "Tablet", percentage: 4, users: 3082 }
]

export default function Audience() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Audience Insights</h1>
            <p className="text-muted-foreground">Understand your audience demographics and behavior</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76,990</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4m 32s</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Country</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">US</div>
              <p className="text-xs text-muted-foreground">37% of all users</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mobile Users</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
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
              {audienceSegments.map((segment, index) => (
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
              {topLocations.map((location, index) => (
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
              {deviceBreakdown.map((device, index) => (
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