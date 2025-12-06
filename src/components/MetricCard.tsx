import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'cyan' | 'purple' | 'blue' | 'emerald';
}

export function MetricCard({ title, value, change, trend, icon: Icon, color }: MetricCardProps) {
  const colorClasses = {
    cyan: 'bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-600 border-cyan-200',
    purple: 'bg-gradient-to-br from-purple-50 to-pink-50 text-purple-600 border-purple-200',
    blue: 'bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 border-blue-200',
    emerald: 'bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 border-emerald-200',
  };

  const trendColor = trend === 'up' ? 'text-emerald-600' : 'text-red-600';

  return (
    <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl border ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 ${trendColor}`}>
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm">{change}</span>
        </div>
      </div>
      <div>
        <p className="text-slate-600 text-sm mb-1">{title}</p>
        <p className="text-slate-800 text-3xl">{value}</p>
      </div>
    </div>
  );
}