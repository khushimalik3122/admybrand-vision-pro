import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { trafficSources } from "@/lib/data"

export function TrafficChart() {
  const COLORS = [
    'hsl(var(--success))',
    'hsl(var(--primary))',
    'hsl(var(--accent))',
    'hsl(var(--warning))',
    'hsl(var(--destructive))'
  ]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="glass-card p-3 border border-border/50">
          <p className="text-sm font-medium">{data.source}</p>
          <p className="text-sm text-primary">
            Users: {data.value.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            {data.percentage}% of total traffic
          </p>
        </div>
      )
    }
    return null
  }

  const CustomLabel = ({ value, percentage }: any) => {
    return `${percentage.toFixed(1)}%`
  }

  return (
    <Card className="glass-card hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
          Traffic Sources
        </CardTitle>
        <CardDescription>
          Distribution of website traffic by source
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {trafficSources.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span style={{ color: entry.color }} className="text-sm">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Traffic breakdown */}
        <div className="mt-4 space-y-2">
          {trafficSources.map((source, index) => (
            <div key={source.source} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-muted-foreground">{source.source}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">{source.value.toLocaleString()}</span>
                <span className="text-muted-foreground">{source.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}