import { MetricCard } from './MetricCard';
import { ChartCard } from './ChartCard';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';
import { TrendingUp, Users, FolderKanban, Clock } from 'lucide-react';
import { Plus } from 'lucide-react';

export function Dashboard() {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$847,392',
      change: '+12.5%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'cyan',
    },
    {
      title: 'Active Projects',
      value: '24',
      change: '+3',
      trend: 'up' as const,
      icon: FolderKanban,
      color: 'purple',
    },
    {
      title: 'Team Members',
      value: '156',
      change: '+8',
      trend: 'up' as const,
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Avg. Response Time',
      value: '2.4h',
      change: '-0.3h',
      trend: 'up' as const,
      icon: Clock,
      color: 'emerald',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 mb-1">Projects</h1>
          <p className="text-slate-600">Manage and track all your projects</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg">
          <Plus className="w-5 h-5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Revenue Overview"
          type="area"
        />
        <ChartCard
          title="Project Status"
          type="bar"
        />
      </div>

      {/* Activity and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}