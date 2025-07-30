import { useState } from "react"
import { useForm } from "react-hook-form"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "@/components/theme-provider"
import { User, Shield, Bell, Palette, Key, Download, Camera, Save, Check } from "lucide-react"

interface ProfileForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  role: string
}

export default function Settings() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [profileImage, setProfileImage] = useState("https://github.com/shadcn.png")
  const [notifications, setNotifications] = useState({
    campaignPerformance: true,
    budgetWarnings: true,
    weeklyReports: false,
    goalAchievements: true,
    systemUpdates: false,
    marketingTips: false
  })
  const [integrations, setIntegrations] = useState({
    googleAds: 'Connected',
    facebookAds: 'Connected', 
    instagramAds: 'Connected',
    linkedinAds: 'Disconnected',
    twitterAds: 'Pending',
    tiktokAds: 'Disconnected'
  })

  const profileForm = useForm<ProfileForm>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe", 
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      company: "Digital Agency Co.",
      role: "manager"
    }
  })

  const handleProfileSubmit = (data: ProfileForm) => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    })
  }

  const handlePhotoChange = () => {
    // Simulate photo upload
    const photos = [
      "https://github.com/shadcn.png",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    ]
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)]
    setProfileImage(randomPhoto)
    toast({
      title: "Photo Updated",
      description: "Your profile photo has been changed",
    })
  }

  const handlePasswordUpdate = () => {
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully",
    })
  }

  const handleNotificationSave = () => {
    toast({
      title: "Preferences Saved", 
      description: "Your notification preferences have been updated",
    })
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as "light" | "dark" | "system")
    toast({
      title: "Theme Changed",
      description: `Switched to ${newTheme} theme`,
    })
  }

  const handleIntegrationToggle = (platform: string) => {
    setIntegrations(prev => ({
      ...prev,
      [platform]: prev[platform as keyof typeof prev] === 'Connected' ? 'Disconnected' : 'Connected'
    }))
    toast({
      title: "Integration Updated",
      description: `${platform} integration has been toggled`,
    })
  }

  const generateApiKey = () => {
    const apiKey = 'admybrand_' + Math.random().toString(36).substring(2, 15)
    navigator.clipboard.writeText(apiKey)
    toast({
      title: "API Key Generated",
      description: "New API key copied to clipboard",
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and dashboard configuration</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20 ring-2 ring-primary/20">
                    <AvatarImage src={profileImage} />
                    <AvatarFallback className="bg-gradient-primary text-white text-lg">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePhotoChange}
                      className="hover-glow"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>
                
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={profileForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="admin">Administrator</SelectItem>
                                <SelectItem value="manager">Marketing Manager</SelectItem>
                                <SelectItem value="analyst">Data Analyst</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="hover-glow">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Get notified of suspicious login attempts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Session Timeout</h4>
                      <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-border/50">
                  <h4 className="font-medium">Change Password</h4>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  <Button variant="outline" className="hover-glow" onClick={handlePasswordUpdate}>
                    <Key className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
{[
                  { key: 'campaignPerformance', title: "Campaign Performance", desc: "Alerts about significant changes in campaign performance" },
                  { key: 'budgetWarnings', title: "Budget Warnings", desc: "Notifications when budgets reach specified thresholds" },
                  { key: 'weeklyReports', title: "Weekly Reports", desc: "Automated weekly performance summaries" },
                  { key: 'goalAchievements', title: "Goal Achievements", desc: "Celebrations when you reach your targets" },
                  { key: 'systemUpdates', title: "System Updates", desc: "Important platform updates and new features" },
                  { key: 'marketingTips', title: "Marketing Tips", desc: "Helpful tips and best practices" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch 
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, [item.key]: checked }))
                      }
                    />
                  </div>
                ))}
                <Button className="hover-glow" onClick={handleNotificationSave}>
                  <Check className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance Settings
                </CardTitle>
                <CardDescription>Customize the look and feel of your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Theme</h4>
                    <div className="grid gap-3 grid-cols-3">
                      {['light', 'dark', 'system'].map((themeOption) => (
                        <Card 
                          key={themeOption} 
                          className={`cursor-pointer hover:ring-2 hover:ring-primary transition-all ${
                            theme === themeOption ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => handleThemeChange(themeOption)}
                        >
                          <CardContent className="p-4 text-center">
                            <div className={`w-12 h-8 rounded mx-auto mb-2 ${
                              themeOption === 'light' ? 'bg-white border' : 
                              themeOption === 'dark' ? 'bg-gray-900' : 
                              'bg-gradient-to-r from-white to-gray-900'
                            }`}></div>
                            <p className="text-sm font-medium capitalize">{themeOption}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Density</h4>
                    <Select defaultValue="comfortable">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Animations</h4>
                      <p className="text-sm text-muted-foreground">Enable smooth transitions and animations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Button className="hover-glow" onClick={() => toast({ title: "Settings Applied", description: "Appearance settings have been updated" })}>
                  <Palette className="w-4 h-4 mr-2" />
                  Apply Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Connected Integrations
                </CardTitle>
                <CardDescription>Manage your connected marketing platforms and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
{[
                  { key: 'googleAds', name: "Google Ads" },
                  { key: 'facebookAds', name: "Facebook Ads" },
                  { key: 'instagramAds', name: "Instagram Ads" },
                  { key: 'linkedinAds', name: "LinkedIn Ads" },
                  { key: 'twitterAds', name: "Twitter Ads" },
                  { key: 'tiktokAds', name: "TikTok Ads" }
                ].map((integration, index) => {
                  const status = integrations[integration.key as keyof typeof integrations]
                  const color = status === 'Connected' ? 'green' : status === 'Pending' ? 'yellow' : 'red'
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-primary/20 flex items-center justify-center">
                          <Key className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{integration.name}</h4>
                          <Badge 
                            variant="outline" 
                            className={`capitalize ${
                              color === 'green' ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20' :
                              color === 'red' ? 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20' :
                              'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20'
                            }`}
                          >
                            {status}
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="hover-glow"
                        onClick={() => handleIntegrationToggle(integration.key)}
                      >
                        {status === 'Connected' ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  )
                })}
                
                <div className="pt-6 border-t border-border/50">
                  <h4 className="font-medium mb-4">API Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">API Key</h5>
                        <p className="text-sm text-muted-foreground">Your unique API key for integrations</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="hover-glow"
                        onClick={generateApiKey}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Generate
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Webhook URL</h5>
                        <p className="text-sm text-muted-foreground">Endpoint for receiving real-time updates</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="hover-glow"
                        onClick={() => toast({ title: "Webhook Configured", description: "Webhook URL has been set up successfully" })}
                      >
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}