import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { TrendingUp, Users, Package, CreditCard, FileDown, Calendar, Shield, Server } from 'lucide-react';
import { useState } from 'react';

export function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');

  // Employee Trends Data
  const employeeTrendsData = [
    { month: 'Jan', headcount: 142, onboarded: 8, offboarded: 3 },
    { month: 'Feb', headcount: 148, onboarded: 9, offboarded: 3 },
    { month: 'Mar', headcount: 151, onboarded: 6, offboarded: 3 },
    { month: 'Apr', headcount: 154, onboarded: 7, offboarded: 4 },
    { month: 'May', headcount: 156, onboarded: 5, offboarded: 3 },
    { month: 'Jun', headcount: 158, onboarded: 6, offboarded: 4 },
  ];

  // Subscription Costs Data
  const subscriptionCostsData = [
    { month: 'Jan', saas: 785000, software: 245000, telecom: 185000 },
    { month: 'Feb', saas: 810000, software: 245000, telecom: 190000 },
    { month: 'Mar', saas: 845000, software: 267000, telecom: 185000 },
    { month: 'Apr', saas: 890000, software: 267000, telecom: 195000 },
    { month: 'May', saas: 925000, software: 289000, telecom: 190000 },
    { month: 'Jun', saas: 982000, software: 312000, telecom: 194000 },
  ];

  // Department Distribution
  const departmentData = [
    { name: 'Engineering', value: 52, count: 52 },
    { name: 'Operations', value: 38, count: 38 },
    { name: 'Sales & Marketing', value: 28, count: 28 },
    { name: 'Product', value: 22, count: 22 },
    { name: 'HR & Admin', value: 18, count: 18 },
  ];

  // Asset Utilization
  const assetUtilizationData = [
    { category: 'Laptops', allocated: 142, available: 14, maintenance: 8 },
    { category: 'Monitors', allocated: 156, available: 22, maintenance: 5 },
    { category: 'Peripherals', allocated: 128, available: 35, maintenance: 3 },
    { category: 'Networking', allocated: 89, available: 12, maintenance: 7 },
  ];

  // Client Services Revenue
  const clientServicesData = [
    { month: 'Jan', hosting: 485000, domains: 125000, ssl: 78000, managed: 890000 },
    { month: 'Feb', hosting: 502000, domains: 132000, ssl: 82000, managed: 925000 },
    { month: 'Mar', hosting: 518000, domains: 128000, ssl: 85000, managed: 967000 },
    { month: 'Apr', hosting: 535000, domains: 135000, ssl: 88000, managed: 1012000 },
    { month: 'May', hosting: 548000, domains: 142000, ssl: 91000, managed: 1045000 },
    { month: 'Jun', hosting: 562000, domains: 138000, ssl: 94000, managed: 1084000 },
  ];

  const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  const kpis = [
    { label: 'Total Employees', value: '158', change: '+2.6%', icon: Users, color: 'blue', trend: 'up' },
    { label: 'Active Assets', value: '475', change: '+5.3%', icon: Package, color: 'purple', trend: 'up' },
    { label: 'Monthly Subscriptions', value: '₹20.48L', change: '+8.2%', icon: CreditCard, color: 'cyan', trend: 'up' },
    { label: 'Client Services MRR', value: '₹18.78L', change: '+6.8%', icon: Server, color: 'emerald', trend: 'up' },
  ];

  const exportReport = (reportName: string) => {
    // In a real app, this would generate and download a CSV/PDF
    console.log(`Exporting ${reportName} report...`);
    alert(`Exporting ${reportName} report... (Demo)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-slate-900 mb-1">Analytics & Reports</h1>
              <p className="text-sm text-slate-600">Comprehensive insights across all platform modules</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Period Selector */}
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
                {[
                  { id: '1m', label: '1M' },
                  { id: '3m', label: '3M' },
                  { id: '6m', label: '6M' },
                  { id: '1y', label: '1Y' },
                ].map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      selectedPeriod === period.id
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => exportReport('All Analytics')}
                className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <FileDown className="w-4 h-4" />
                Export All Reports
              </button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              const colorClasses = {
                blue: 'bg-blue-50 text-blue-600',
                purple: 'bg-purple-50 text-purple-600',
                cyan: 'bg-cyan-50 text-cyan-600',
                emerald: 'bg-emerald-50 text-emerald-600',
              };
              return (
                <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[kpi.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      kpi.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-1">{kpi.label}</p>
                  <p className="text-2xl text-slate-900">{kpi.value}</p>
                </div>
              );
            })}
          </div>

          {/* Employee Analytics */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg text-slate-900 mb-1">Employee Trends</h2>
                <p className="text-xs text-slate-600">Headcount growth and turnover analysis</p>
              </div>
              <button
                onClick={() => exportReport('Employee Trends')}
                className="px-3 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <FileDown className="w-3.5 h-3.5" />
                Export
              </button>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={employeeTrendsData}>
                <defs>
                  <linearGradient id="colorHeadcount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="headcount" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorHeadcount)" strokeWidth={2} />
                <Line type="monotone" dataKey="onboarded" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="offboarded" stroke="#ef4444" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Two Column Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Distribution */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg text-slate-900 mb-1">Department Distribution</h2>
                  <p className="text-xs text-slate-600">Employee allocation by department</p>
                </div>
                <button
                  onClick={() => exportReport('Department Distribution')}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  Export
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Asset Utilization */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg text-slate-900 mb-1">Asset Utilization</h2>
                  <p className="text-xs text-slate-600">Hardware allocation and availability</p>
                </div>
                <button
                  onClick={() => exportReport('Asset Utilization')}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  Export
                </button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={assetUtilizationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="category" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="allocated" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="available" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="maintenance" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subscription Costs */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg text-slate-900 mb-1">Subscription Costs Analysis</h2>
                <p className="text-xs text-slate-600">Monthly recurring costs across subscription types</p>
              </div>
              <button
                onClick={() => exportReport('Subscription Costs')}
                className="px-3 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <FileDown className="w-3.5 h-3.5" />
                Export
              </button>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={subscriptionCostsData}>
                <defs>
                  <linearGradient id="colorSaas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSoftware" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTelecom" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="saas" stackId="1" stroke="#0ea5e9" fill="url(#colorSaas)" strokeWidth={2} />
                <Area type="monotone" dataKey="software" stackId="1" stroke="#8b5cf6" fill="url(#colorSoftware)" strokeWidth={2} />
                <Area type="monotone" dataKey="telecom" stackId="1" stroke="#10b981" fill="url(#colorTelecom)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Client Services Revenue */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg text-slate-900 mb-1">Client Services Revenue</h2>
                <p className="text-xs text-slate-600">Monthly recurring revenue by service type</p>
              </div>
              <button
                onClick={() => exportReport('Client Services Revenue')}
                className="px-3 py-1.5 text-xs bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <FileDown className="w-3.5 h-3.5" />
                Export
              </button>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={clientServicesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="hosting" stroke="#0ea5e9" strokeWidth={2} />
                <Line type="monotone" dataKey="domains" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="ssl" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="managed" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <Calendar className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-xs text-slate-600 mb-1">Avg. Employee Tenure</p>
              <p className="text-xl text-slate-900 mb-1">3.2 years</p>
              <p className="text-xs text-emerald-600">+0.4 years vs last period</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <Shield className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-xs text-slate-600 mb-1">Assets Under Warranty</p>
              <p className="text-xl text-slate-900 mb-1">89%</p>
              <p className="text-xs text-emerald-600">24 expiring in 90 days</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-cyan-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-xs text-slate-600 mb-1">License Utilization Rate</p>
              <p className="text-xl text-slate-900 mb-1">94%</p>
              <p className="text-xs text-emerald-600">Optimal allocation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
