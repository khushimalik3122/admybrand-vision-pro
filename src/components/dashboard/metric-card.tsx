import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: string
  description: string
  className?: string
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  description,
  className 
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState('0')
  const [isVisible, setIsVisible] = useState(false)

  // Get the icon component dynamically
  const IconComponent = Icons[icon as keyof typeof Icons] as React.ComponentType<any>

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Animate the number counting up
    const finalValue = value
    const numericValue = parseFloat(finalValue.replace(/[^0-9.-]+/g, ''))
    const hasSymbol = finalValue.match(/[^0-9.-]/)
    
    if (isNaN(numericValue)) {
      setDisplayValue(finalValue)
      return
    }

    const duration = 1500
    const steps = 60
    const increment = numericValue / steps
    let currentValue = 0

    const timer = setInterval(() => {
      currentValue += increment
      if (currentValue >= numericValue) {
        setDisplayValue(finalValue)
        clearInterval(timer)
      } else {
        const formattedValue = hasSymbol 
          ? finalValue.replace(/[0-9.-]+/, Math.floor(currentValue).toLocaleString())
          : Math.floor(currentValue).toLocaleString()
        setDisplayValue(formattedValue)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <Card 
      className={cn(
        "glass-card hover-lift animate-fade-in transition-all duration-300",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="p-2 rounded-lg bg-gradient-primary/10">
          {IconComponent && (
            <IconComponent className="h-4 w-4 text-primary" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold gradient-text">
            {displayValue}
          </div>
          <div className="flex items-center space-x-2">
            <div className={cn(
              "flex items-center text-xs font-medium",
              trend === 'up' ? "text-success" : "text-destructive"
            )}>
              {trend === 'up' ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {Math.abs(change)}%
            </div>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}