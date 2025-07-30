import { Moon, Sun, Bell, Search, User, Settings, LogOut, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useTheme } from "@/components/theme-provider"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [notificationCount, setNotificationCount] = useState(3)

  const handleNotificationClick = () => {
    navigate('/notifications')
    setNotificationCount(0)
    toast({
      title: "Notifications",
      description: "Navigated to notifications page",
    })
  }

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Settings",
      description: "Profile update feature will be available soon",
    })
  }

  const handleLogout = () => {
    toast({
      title: "Logout Successful",
      description: "You have been logged out successfully",
      variant: "destructive"
    })
    // Simulate logout - in real app, clear auth tokens and redirect
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  const handleDownloadReport = () => {
    toast({
      title: "Download Started",
      description: "Your analytics report is being prepared for download",
    })
    
    // Simulate CSV download
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Campaign,Impressions,Clicks,Conversions,Revenue\n" +
      "Facebook Ads,45000,1200,156,$3200\n" +
      "Google Ads,38000,1100,189,$4100\n" +
      "Instagram,28000,850,98,$2400\n"
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "admybrand-analytics-report.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <header className="h-16 border-b border-border/50 glass-card flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns, reports..."
            className="pl-10 w-80 bg-muted/50 border-border/50 focus:bg-background transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="relative hover-glow"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover-glow"
          onClick={handleNotificationClick}
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>

        {/* Download Report */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover-glow"
          onClick={handleDownloadReport}
        >
          <Download className="h-5 w-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover-glow">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/avatars/user.jpg" alt="User" />
                <AvatarFallback className="bg-gradient-primary text-white">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 glass-card" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john@admybrand.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleProfileUpdate}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}