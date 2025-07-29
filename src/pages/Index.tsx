import { MetricCard } from "@/components/dashboard/metric-card"
import { RevenueChart } from "@/components/dashboard/charts/revenue-chart"
import { ChannelChart } from "@/components/dashboard/charts/channel-chart"
import { TrafficChart } from "@/components/dashboard/charts/traffic-chart"
import { CampaignTable } from "@/components/dashboard/campaign-table"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { metricsData } from "@/lib/data"
import heroImage from "@/assets/dashboard-hero.jpg"

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div 
          className="relative h-48 rounded-2xl glass-card overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2 animate-fade-in">
              ADmyBRAND Insights
            </h1>
            <p className="text-xl opacity-90 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Your Digital Marketing Command Center
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => (
            <div 
              key={metric.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <MetricCard {...metric} />
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <ChannelChart />
          <TrafficChart />
        </div>

        {/* Campaign Table */}
        <CampaignTable />
      </div>
    </DashboardLayout>
  );
};

export default Index;
