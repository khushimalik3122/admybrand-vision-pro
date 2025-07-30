import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useNavigate } from "react-router-dom"
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
import { User, Shield, Bell, Palette, Key, Download, Camera, Save, Check, Upload, LogOut, RefreshCw } from "lucide-react"

// Form validation schema
const profileFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  role: z.string().min(1, "Please select a role")
})

type ProfileForm = z.infer<typeof profileFormSchema>

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type PasswordForm = z.infer<typeof passwordFormSchema>

export default function Settings() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profileImage, setProfileImage] = useState("https://github.com/shadcn.png")
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Digital Agency Co.",
    role: "manager"
  })
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
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileData
  })

  // Update form when profile data changes
  useEffect(() => {
    profileForm.reset(profileData)
  }, [profileData, profileForm])

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  })

  const handleProfileSubmit = async (data: ProfileForm) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update the profile data state to persist changes
      setProfileData(data)
      
      // In a real app, you would send this data to your backend
      console.log('Profile data updated:', data)
      
      // Store in localStorage for persistence across sessions
      localStorage.setItem('userProfile', JSON.stringify(data))
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive"
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      })
      return
    }

    setIsUploading(true)
    
    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app, you would upload to your server/cloud storage
      setProfileImage(previewUrl)
      
      toast({
        title: "Photo Updated",
        description: "Your profile photo has been changed successfully",
      })
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handlePasswordUpdate = async (data: PasswordForm) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would verify current password and update
      console.log('Password update requested')
      
      passwordForm.reset()
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationSave = () => {
    // Store notification preferences in localStorage
    localStorage.setItem('notificationPreferences', JSON.stringify(notifications))
    
    toast({
      title: "Preferences Saved", 
      description: "Your notification preferences have been updated",
    })
  }

  const handleLogout = () => {
    // Clear user data and redirect
    localStorage.removeItem('userProfile')
    localStorage.removeItem('notificationPreferences')
    localStorage.removeItem('authToken')
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
      variant: "destructive"
    })
    
    // Simulate logout delay and redirect
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  const handleDataExport = () => {
    const exportData = {
      profile: profileData,
      notifications: notifications,
      integrations: integrations,
      exportDate: new Date().toISOString()
    }
    
    const csvData = [
      ['Settings Export', new Date().toLocaleString()],
      [''],
      ['PROFILE INFORMATION'],
      ['Field', 'Value'],
      ['First Name', profileData.firstName],
      ['Last Name', profileData.lastName],
      ['Email', profileData.email],
      ['Phone', profileData.phone],
      ['Company', profileData.company],
      ['Role', profileData.role],
      [''],
      ['NOTIFICATION PREFERENCES'],
      ['Setting', 'Enabled'],
      ...Object.entries(notifications).map(([key, value]) => [key, value ? 'Yes' : 'No']),
      [''],
      ['INTEGRATIONS'],
      ['Platform', 'Status'],
      ...Object.entries(integrations).map(([key, value]) => [key, value])
    ]
    
    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `settings-export-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    
    toast({
      title: "Export Complete",
      description: "Your settings have been exported to CSV",
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
    const apiKey = 'admybrand_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    navigator.clipboard.writeText(apiKey)
    
    // Store API key in localStorage
    localStorage.setItem('apiKey', apiKey)
    
    toast({
      title: "API Key Generated",
      description: "New API key generated and copied to clipboard",
    })
  }

  // Load saved data on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    const savedNotifications = localStorage.getItem('notificationPreferences')
    
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile)
      setProfileData(parsed)
    }
    
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and dashboard configuration</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDataExport}
              className="hover-glow"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Settings
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="hover-glow"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
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
                    <AvatarFallback className="bg-gradient-primary text-white text-lg">
                      {profileData.firstName.charAt(0).toUpperCase()}{profileData.lastName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={triggerFileInput}
                      disabled={isUploading}
                      className="hover-glow"
                    >
                      {isUploading ? (
                        <Upload className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4 mr-2" />
                      )}
                      {isUploading ? 'Uploading...' : 'Change Photo'}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max size 5MB.</p>
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
                    
                    <Button type="submit" className="hover-glow" disabled={isLoading}>
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      {isLoading ? 'Saving...' : 'Save Changes'}
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
                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)} className="space-y-4">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" variant="outline" className="hover-glow" disabled={isLoading}>
                        {isLoading ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Key className="w-4 h-4 mr-2" />
                        )}
                        {isLoading ? 'Updating...' : 'Update Password'}
                      </Button>
                    </form>
                  </Form>
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
                <Button className="hover-glow" onClick={handleNotificationSave} disabled={isLoading}>
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