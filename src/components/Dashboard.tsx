import { 
  Users, Package, CreditCard, Server, DollarSign, AlertTriangle, 
  TrendingUp, Clock, Activity, Bell, CheckCircle, XCircle, Calendar, 
  Laptop, UserCheck, ChevronRight, ArrowUp, ArrowDown, X, TrendingDown,
  UserX, AlertCircle, Cpu
} from 'lucide-react';
import { DashboardGlobalSearch } from './DashboardGlobalSearch';
import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  onNavigate?: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activityPanelOpen, setActivityPanelOpen] = useState(true);

  // Idle Hardware Data
  const idleHardwareData = [
    { category: 'Laptops', idle: 8, active: 145 },
    { category: 'Monitors', idle: 12, active: 198 },
    { category: 'Keyboards', idle: 15, active: 175 },
    { category: 'Docking Stations', idle: 6, active: 89 },
    { category: 'Headsets', idle: 18, active: 124 }
  ];

  // Unmapped Employees Timeline
  const unmappedEmployeesData = [
    { week: 'Week 1', count: 3 },
    { week: 'Week 2', count: 5 },
    { week: 'Week 3', count: 8 },
    { week: 'Week 4', count: 6 },
    { week: 'Current', count: 9 }
  ];

  // Offboarding Status
  const offboardingData = [
    { name: 'Completed', value: 45, color: '#10b981' },
    { name: 'In Progress', value: 12, color: '#f59e0b' },
    { name: 'Pending', value: 8, color: '#ef4444' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-6">
      <div className="flex gap-6">
        {/* Main Content Area */}
        <div className="flex-1 space-y-6 transition-all duration-300">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-slate-900 mb-1">Dashboard</h1>
              <p className="text-sm text-slate-600">Welcome back! Here&apos;s your enterprise overview</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Last 30 days</span>
              </button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* System Health - First KPI */}
            <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5 text-white shadow-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Activity className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Operational</span>
                </div>
              </div>
              <div className="text-2xl text-white mb-1">99.98%</div>
              <div className="text-xs text-slate-400">System Uptime</div>
              <div className="mt-3 flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-slate-300">
                  <CheckCircle className="w-3 h-3" />
                  <span>89/89 Services</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  <Clock className="w-3 h-3" />
                  <span>7 Tasks</span>
                </div>
              </div>
            </div>

            {/* Total Employees */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 p-5 hover:shadow-lg transition-all cursor-pointer shadow-sm" onClick={() => onNavigate?.('user-management')}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+8 this month</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">156</div>
              <div className="text-xs text-slate-600">Total Employees</div>
              <div className="mt-3 flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-green-600">
                  <UserCheck className="w-3 h-3" />
                  <span>142 Active</span>
                </div>
                <div className="flex items-center gap-1 text-amber-600">
                  <Clock className="w-3 h-3" />
                  <span>14 Pending</span>
                </div>
              </div>
            </div>

            {/* Total Assets */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 p-5 hover:shadow-lg transition-all cursor-pointer shadow-sm" onClick={() => onNavigate?.('inventory-management')}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">12 Unassigned</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">487</div>
              <div className="text-xs text-slate-600">Hardware Assets</div>
              <div className="mt-3 flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-3 h-3" />
                  <span>451 Active</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <Laptop className="w-3 h-3" />
                  <span>24 In Maintenance</span>
                </div>
              </div>
            </div>

            {/* Active Subscriptions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 p-5 hover:shadow-lg transition-all cursor-pointer shadow-sm" onClick={() => onNavigate?.('subscription-management')}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-cyan-600" />
                </div>
                <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">8 Expiring Soon</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">64</div>
              <div className="text-xs text-slate-600">Active Subscriptions</div>
              <div className="mt-3 flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-slate-700">
                  <DollarSign className="w-3 h-3" />
                  <span>₹20,48,400/mo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Global Search Bar with Quick Links */}
          <DashboardGlobalSearch 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onNavigate={onNavigate}
          />

          {/* Upcoming Renewals - Moved Up */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-slate-900">Upcoming Renewals</h2>
                  <p className="text-xs text-slate-600">Next 30 days • Total: ₹11,72,850/month</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate?.('subscription-management')}
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
              >
                View All Subscriptions
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { name: 'Microsoft 365 E5', details: '156 licenses', days: 2, amount: '₹3,90,000', color: 'red', priority: 'Urgent' },
                { name: 'AWS Infrastructure', details: 'Production env', days: 5, amount: '₹2,66,600', color: 'amber', priority: 'High' },
                { name: 'Slack Business+', details: '200 users', days: 12, amount: '₹2,00,000', color: 'blue', priority: 'Medium' },
                { name: 'GitHub Enterprise', details: '75 seats', days: 18, amount: '₹1,31,250', color: 'green', priority: 'Normal' },
                { name: 'Atlassian Suite', details: 'Jira + Confluence', days: 24, amount: '₹1,85,000', color: 'slate', priority: 'Normal' }
              ].map((renewal, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all cursor-pointer border border-slate-200">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-8 h-8 bg-${renewal.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Calendar className={`w-4 h-4 text-${renewal.color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-900 truncate">{renewal.name}</div>
                      <div className="text-xs text-slate-600">{renewal.details}</div>
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <div className={`text-xs text-${renewal.color}-600 mb-0.5`}>{renewal.days}d</div>
                    <div className="text-xs text-slate-600">{renewal.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Graphs Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Idle Hardware Utilization */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-slate-900">Idle Hardware Analysis</h2>
                    <p className="text-xs text-slate-600">Assets not assigned for 30+ days</p>
                  </div>
                </div>
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">59 Idle</span>
              </div>

              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={idleHardwareData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="active" fill="#10b981" name="Active" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="idle" fill="#f59e0b" name="Idle" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-600 mb-1">Total Idle Assets</div>
                  <div className="text-xl text-amber-600">59 units</div>
                  <div className="text-xs text-slate-600 mt-1">12% of inventory</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1">Estimated Value</div>
                  <div className="text-xl text-slate-900">₹8.45L</div>
                  <button className="text-xs text-blue-600 hover:underline mt-1">Reassign →</button>
                </div>
              </div>
            </div>

            {/* Unmapped Employees Trend */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <UserX className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-slate-900">Unmapped Employees</h2>
                    <p className="text-xs text-slate-600">Employees without asset assignments</p>
                  </div>
                </div>
                <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">9 Current</span>
              </div>

              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={unmappedEmployeesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    dot={{ fill: '#ef4444', r: 4 }}
                    name="Unmapped Employees"
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-600 mb-1">Current Unmapped</div>
                  <div className="text-xl text-red-600">9 employees</div>
                  <div className="text-xs text-red-600 mt-1">↑ 50% from last week</div>
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1">Avg Resolution Time</div>
                  <div className="text-xl text-slate-900">4.2 days</div>
                  <button className="text-xs text-blue-600 hover:underline mt-1">Assign Now →</button>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Graphs Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Offboarding Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <UserX className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-slate-900">Offboarding Status</h2>
                    <p className="text-xs text-slate-600">Last 90 days activity</p>
                  </div>
                </div>
                <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">8 Pending</span>
              </div>

              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={offboardingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {offboardingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-900">Completed</span>
                  </div>
                  <span className="text-sm text-slate-900">45 employees</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className="text-sm text-slate-900">In Progress</span>
                  </div>
                  <span className="text-sm text-slate-900">12 employees</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-slate-900">Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-900">8 employees</span>
                    <button className="text-xs text-red-600 hover:underline">Review →</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Critical Alerts - Compact */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-slate-900">Critical Alerts</h2>
                    <p className="text-xs text-slate-600">Requires immediate attention</p>
                  </div>
                </div>
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">4 Active</span>
              </div>

              <div className="space-y-3">
                <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-3 hover:bg-red-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <div className="text-sm text-red-900">5 Licenses Expired</div>
                    </div>
                    <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">Critical</span>
                  </div>
                  <div className="text-xs text-red-700 ml-6">Adobe Creative Cloud - 3 days overdue</div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-3 hover:bg-amber-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <div className="text-sm text-amber-900">8 Renewals Due Soon</div>
                    </div>
                    <span className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full">Warning</span>
                  </div>
                  <div className="text-xs text-amber-700 ml-6">Total: ₹9,88,850/mo within 7 days</div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-3 hover:bg-blue-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <div className="text-sm text-blue-900">4 Onboarding Pending</div>
                    </div>
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Action</span>
                  </div>
                  <div className="text-xs text-blue-700 ml-6">New employees awaiting setup (2-5 days)</div>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-3 hover:bg-purple-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <div className="text-sm text-purple-900">12 Assets Unassigned</div>
                    </div>
                    <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Info</span>
                  </div>
                  <div className="text-xs text-purple-700 ml-6">Value: ₹14,25,000 available</div>
                </div>
              </div>
            </div>
          </div>

          {/* IT Spend Overview - Compact Version - Moved Down */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-slate-900">Monthly IT Spend</h2>
                <p className="text-xs text-slate-600">₹43,10,100 total • 2.4% decrease vs last month</p>
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-700 hover:underline">View Details</button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-600">Subscriptions</div>
                  <div className="text-lg text-slate-900">₹20.48L</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <ArrowDown className="w-3 h-3" />
                    <span>3.2%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Server className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-600">Client Services</div>
                  <div className="text-lg text-slate-900">₹15.78L</div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <ArrowUp className="w-3 h-3" />
                    <span>12.5%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-600">Hardware</div>
                  <div className="text-lg text-slate-900">₹6.83L</div>
                  <div className="text-xs text-slate-600">One-time</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Activity Panel - Right Side - Starts from Top */}
        <div className={`transition-all duration-300 flex-shrink-0 ${activityPanelOpen ? 'w-80' : 'w-0 overflow-hidden'}`}>
          {activityPanelOpen && (
            <div className="w-80 bg-white rounded-xl border border-slate-200 overflow-hidden sticky top-6" style={{ maxHeight: 'calc(100vh - 48px)' }}>
              <div className="p-5 border-b border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-sm text-slate-900">Recent Activity</h2>
                      <p className="text-xs text-slate-600">Real-time updates</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActivityPanelOpen(false)}
                    className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="p-5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <div className="space-y-4">
                  {[
                    { color: 'green', title: 'New employee onboarded', detail: 'Sarah Johnson added to Engineering team', time: '2 hours ago', icon: UserCheck },
                    { color: 'blue', title: 'Asset assigned', detail: 'MacBook Pro 16" assigned to John Doe', time: '4 hours ago', icon: Package },
                    { color: 'purple', title: 'Subscription renewed', detail: 'Figma Professional renewed for 12 months', time: '6 hours ago', icon: CreditCard },
                    { color: 'amber', title: 'SSL Certificate expiring', detail: 'app.company.com SSL expires in 15 days', time: '1 day ago', icon: AlertTriangle },
                    { color: 'red', title: 'Employee offboarded', detail: 'Mike Wilson - Access revoked, assets collected', time: '2 days ago', icon: XCircle },
                    { color: 'cyan', title: 'License purchase approved', detail: '10 new Adobe CC licenses purchased', time: '2 days ago', icon: CheckCircle },
                    { color: 'green', title: 'Hardware deployed', detail: '5 Dell monitors assigned to Marketing', time: '3 days ago', icon: Laptop },
                    { color: 'blue', title: 'New service request', detail: 'IT support ticket #1247 opened', time: '3 days ago', icon: Bell }
                  ].map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex gap-3 group">
                        <div className={`w-7 h-7 bg-${activity.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-3.5 h-3.5 text-${activity.color}-600`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-slate-900 group-hover:text-slate-700">{activity.title}</div>
                          <div className="text-xs text-slate-600 mt-0.5 line-clamp-2">{activity.detail}</div>
                          <div className="text-xs text-slate-500 mt-1">{activity.time}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50">
                <button className="w-full text-xs text-blue-600 hover:text-blue-700 hover:underline">
                  View All Activity →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Collapsed Panel Toggle Button - Minimal Vertical Bar with Just Icon */}
        {!activityPanelOpen && (
          <button 
            onClick={() => setActivityPanelOpen(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-md hover:bg-slate-800/90 text-white p-4 rounded-l-xl shadow-2xl border-l border-t border-b border-slate-700/50 transition-all z-10 flex items-center justify-center"
          >
            <Activity className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}