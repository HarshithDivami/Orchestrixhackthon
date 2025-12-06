import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, DollarSign, Activity, Target } from 'lucide-react';

export function Analytics() {
  const performanceData = [
    { month: 'Jan', revenue: 42000, expenses: 28000, profit: 14000 },
    { month: 'Feb', revenue: 45000, expenses: 29500, profit: 15500 },
    { month: 'Mar', revenue: 53000, expenses: 31000, profit: 22000 },
    { month: 'Apr', revenue: 58000, expenses: 32500, profit: 25500 },
    { month: 'May', revenue: 61000, expenses: 34000, profit: 27000 },
    { month: 'Jun', revenue: 67000, expenses: 35500, profit: 31500 },
  ];

  const distributionData = [
    { name: 'Development', value: 35 },
    { name: 'Marketing', value: 25 },
    { name: 'Design', value: 20 },
    { name: 'Operations', value: 20 },
  ];

  const COLORS = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'];

  const kpis = [
    { label: 'Revenue Growth', value: '24.5%', icon: TrendingUp, color: 'cyan' },
    { label: 'Profit Margin', value: '47.1%', icon: DollarSign, color: 'emerald' },
    { label: 'Efficiency Rate', value: '89.3%', icon: Activity, color: 'purple' },
    { label: 'Goal Achievement', value: '92.8%', icon: Target, color: 'blue' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-800 mb-1">Analytics</h1>
        <p className="text-slate-600">Deep dive into your business metrics and performance</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const colorClasses = {
            cyan: 'bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-600 border-cyan-200',
            emerald: 'bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 border-emerald-200',
            purple: 'bg-gradient-to-br from-purple-50 to-pink-50 text-purple-600 border-purple-200',
            blue: 'bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 border-blue-200',
          };
          return (
            <div key={kpi.label} className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-slate-200">
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${colorClasses[kpi.color as keyof typeof colorClasses]}`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-slate-600 text-sm mb-1">{kpi.label}</p>
              <p className="text-slate-800 text-3xl">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Performance Chart */}
      <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-slate-200">
        <h3 className="text-slate-800 mb-6">Financial Performance</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                color: '#1e293b',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2} />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
            <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-slate-200">
          <h3 className="text-slate-800 mb-6">Resource Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-slate-200">
          <h3 className="text-slate-800 mb-6">Performance Metrics</h3>
          <div className="space-y-6">
            {[
              { label: 'Customer Satisfaction', value: 94, color: 'bg-emerald-500' },
              { label: 'Project Completion Rate', value: 87, color: 'bg-cyan-500' },
              { label: 'Team Productivity', value: 91, color: 'bg-purple-500' },
              { label: 'Budget Efficiency', value: 78, color: 'bg-blue-500' },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-700">{metric.label}</span>
                  <span className="text-slate-800">{metric.value}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${metric.color}`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}