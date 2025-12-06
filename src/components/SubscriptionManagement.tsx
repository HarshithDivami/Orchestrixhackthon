import { useState } from 'react';
import { Plus, Eye, Users, Monitor, AlertCircle, CheckCircle, Clock, XCircle, Calendar, DollarSign, Building2, User, FileText, History, Smartphone, Key, Cloud, CreditCard, Bell } from 'lucide-react';
import { SmartSearchBar } from './SmartSearchBar';

type SubscriptionType = 'SaaS' | 'Software' | 'Telecom';
type SubscriptionStatus = 'Active' | 'Expiring Soon' | 'Inactive' | 'Expired';

interface Subscription {
  id: string;
  name: string;
  type: SubscriptionType;
  vendor: string;
  departments: string[];
  seats: number;
  assignedSeats: number;
  simNumber?: string;
  billingCycle: string;
  renewalDate: string;
  costPerSeat?: string;
  planCost: string;
  totalCost: string;
  autoRenew: boolean;
  owner: string;
  linkedEmployees: string[];
  linkedDevices: string[];
  status: SubscriptionStatus;
  documents: number;
  notes?: string;
  lastUpdated: string;
}

interface FilterCounts {
  all: number;
  saas: number;
  software: number;
  telecom: number;
  active: number;
  expiring: number;
  inactive: number;
}

export function SubscriptionManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilters, setQuickFilters] = useState<string[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderNote, setReminderNote] = useState('');
  const [showAddSubscription, setShowAddSubscription] = useState(false);
  const [selectedType, setSelectedType] = useState<SubscriptionType>('SaaS');
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [selectedSubscriptionForAllocation, setSelectedSubscriptionForAllocation] = useState<Subscription | null>(null);
  const [allocationStep, setAllocationStep] = useState<'select-subscription' | 'select-employee'>('select-subscription');

  const [subscriptions] = useState<Subscription[]>([
    {
      id: 'SUB-001',
      name: 'Google Workspace Business',
      type: 'SaaS',
      vendor: 'Google',
      departments: ['Engineering', 'Product', 'Marketing'],
      seats: 50,
      assignedSeats: 45,
      billingCycle: 'Monthly',
      renewalDate: '2024-12-15',
      costPerSeat: '$12',
      planCost: '$12/user/month',
      totalCost: '$600',
      autoRenew: true,
      owner: 'IT Department',
      linkedEmployees: ['John Doe', 'Jane Smith', 'Mike Johnson', '+42 more'],
      linkedDevices: [],
      status: 'Active',
      documents: 3,
      notes: 'Enterprise plan with unlimited storage',
      lastUpdated: '2024-11-25',
    },
    {
      id: 'SUB-002',
      name: 'Slack Enterprise Grid',
      type: 'SaaS',
      vendor: 'Slack',
      departments: ['Engineering', 'Product', 'Design'],
      seats: 100,
      assignedSeats: 87,
      billingCycle: 'Annual',
      renewalDate: '2024-12-20',
      costPerSeat: '$12.50',
      planCost: '$12.50/user/month',
      totalCost: '$15,000',
      autoRenew: true,
      owner: 'Engineering',
      linkedEmployees: ['All Engineering', 'All Product', '+67 more'],
      linkedDevices: [],
      status: 'Expiring Soon',
      documents: 5,
      notes: 'Annual contract renewing soon',
      lastUpdated: '2024-11-20',
    },
    {
      id: 'SUB-003',
      name: 'Adobe Creative Cloud',
      type: 'Software',
      vendor: 'Adobe',
      departments: ['Design', 'Marketing'],
      seats: 15,
      assignedSeats: 15,
      billingCycle: 'Annual',
      renewalDate: '2025-03-10',
      costPerSeat: '$54.99',
      planCost: '$54.99/user/month',
      totalCost: '$9,898.20',
      autoRenew: true,
      owner: 'Design Department',
      linkedEmployees: ['Design Team', 'Marketing Designers'],
      linkedDevices: ['DSGN-MAC-01', 'DSGN-MAC-02', '+13 more'],
      status: 'Active',
      documents: 2,
      lastUpdated: '2024-10-15',
    },
    {
      id: 'SUB-004',
      name: 'Airtel Corporate SIM Plan',
      type: 'Telecom',
      vendor: 'Airtel',
      departments: ['Sales', 'Engineering', 'Marketing'],
      seats: 30,
      assignedSeats: 28,
      simNumber: 'AIRTEL-CORP-30',
      billingCycle: 'Monthly',
      renewalDate: '2024-12-10',
      planCost: '$25/SIM',
      totalCost: '$750',
      autoRenew: true,
      owner: 'IT Department',
      linkedEmployees: ['Sales Team', 'Field Engineers'],
      linkedDevices: ['iPhone 15 Pro', 'Samsung Galaxy S24', '+26 more'],
      status: 'Expiring Soon',
      documents: 4,
      notes: 'Unlimited data plan for field employees',
      lastUpdated: '2024-11-22',
    },
    {
      id: 'SUB-005',
      name: 'GitHub Enterprise',
      type: 'SaaS',
      vendor: 'GitHub',
      departments: ['Engineering'],
      seats: 75,
      assignedSeats: 68,
      billingCycle: 'Annual',
      renewalDate: '2025-02-15',
      costPerSeat: '$21',
      planCost: '$21/user/month',
      totalCost: '$18,900',
      autoRenew: true,
      owner: 'Engineering',
      linkedEmployees: ['All Engineering'],
      linkedDevices: [],
      status: 'Active',
      documents: 3,
      lastUpdated: '2024-09-20',
    },
    {
      id: 'SUB-006',
      name: 'Jio Corporate Connection',
      type: 'Telecom',
      vendor: 'Jio',
      departments: ['Sales'],
      seats: 15,
      assignedSeats: 12,
      simNumber: 'JIO-CORP-15',
      billingCycle: 'Monthly',
      renewalDate: '2024-12-05',
      planCost: '$20/SIM',
      totalCost: '$300',
      autoRenew: false,
      owner: 'Sales Department',
      linkedEmployees: ['Sales Representatives'],
      linkedDevices: ['Mobile devices'],
      status: 'Expiring Soon',
      documents: 2,
      notes: 'Contract up for renewal',
      lastUpdated: '2024-11-18',
    },
    {
      id: 'SUB-007',
      name: 'Microsoft 365 E5',
      type: 'Software',
      vendor: 'Microsoft',
      departments: ['All'],
      seats: 150,
      assignedSeats: 142,
      billingCycle: 'Annual',
      renewalDate: '2025-01-20',
      costPerSeat: '$38',
      planCost: '$38/user/month',
      totalCost: '$68,400',
      autoRenew: true,
      owner: 'IT Department',
      linkedEmployees: ['All Employees'],
      linkedDevices: [],
      status: 'Active',
      documents: 6,
      notes: 'Company-wide license',
      lastUpdated: '2024-11-01',
    },
  ]);

  // Calculate filter counts
  const filterCounts: FilterCounts = {
    all: subscriptions.length,
    saas: subscriptions.filter(s => s.type === 'SaaS').length,
    software: subscriptions.filter(s => s.type === 'Software').length,
    telecom: subscriptions.filter(s => s.type === 'Telecom').length,
    active: subscriptions.filter(s => s.status === 'Active').length,
    expiring: subscriptions.filter(s => s.status === 'Expiring Soon').length,
    inactive: subscriptions.filter(s => s.status === 'Inactive' || s.status === 'Expired').length,
  };

  // Filter subscriptions based on search and quick filters
  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = searchQuery === '' || 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.departments.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilters = quickFilters.length === 0 || quickFilters.every(filter => {
      const lowerFilter = filter.toLowerCase();
      if (lowerFilter === 'saas') return sub.type === 'SaaS';
      if (lowerFilter === 'software') return sub.type === 'Software';
      if (lowerFilter === 'telecom') return sub.type === 'Telecom';
      if (lowerFilter === 'active') return sub.status === 'Active';
      if (lowerFilter === 'expiring soon') return sub.status === 'Expiring Soon';
      if (lowerFilter === 'inactive') return sub.status === 'Inactive' || sub.status === 'Expired';
      if (lowerFilter === 'auto-renew') return sub.autoRenew;
      if (lowerFilter === 'underutilized') return (sub.assignedSeats / sub.seats) < 0.7;
      return false;
    });

    return matchesSearch && matchesFilters;
  });

  const getTypeIcon = (type: SubscriptionType) => {
    switch (type) {
      case 'SaaS': return <Cloud className="w-4 h-4" />;
      case 'Software': return <Key className="w-4 h-4" />;
      case 'Telecom': return <Smartphone className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: SubscriptionStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
            <CheckCircle className="w-3 h-3" />
            Active
          </span>
        );
      case 'Expiring Soon':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
            <Clock className="w-3 h-3" />
            Expiring Soon
          </span>
        );
      case 'Inactive':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
            <XCircle className="w-3 h-3" />
            Inactive
          </span>
        );
      case 'Expired':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
            <AlertCircle className="w-3 h-3" />
            Expired
          </span>
        );
    }
  };

  const handleViewDetails = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setShowDetailView(true);
  };

  const seatUtilization = (sub: Subscription) => {
    const percentage = (sub.assignedSeats / sub.seats) * 100;
    return percentage;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl text-slate-900 mb-1">Subscriptions & Licensing Management</h1>
              <p className="text-sm text-slate-600">Manage internal SaaS subscriptions, software licenses, and telecom plans</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  setShowAllocateModal(true);
                  setAllocationStep('select-subscription');
                  setSelectedSubscriptionForAllocation(null);
                }}
                className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Allocate Subscription
              </button>
              <button 
                onClick={() => setShowAddSubscription(true)}
                className="px-4 py-2 text-sm text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Subscription
              </button>
            </div>
          </div>

          {/* Smart Search Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <SmartSearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              quickFilters={[
                { id: 'saas', label: 'SaaS', count: filterCounts.saas },
                { id: 'software', label: 'Software', count: filterCounts.software },
                { id: 'telecom', label: 'Telecom', count: filterCounts.telecom },
                { id: 'active', label: 'Active', count: filterCounts.active },
                { id: 'expiring soon', label: 'Expiring Soon', count: filterCounts.expiring },
                { id: 'inactive', label: 'Inactive', count: filterCounts.inactive },
                { id: 'auto-renew', label: 'Auto-Renew', count: subscriptions.filter(s => s.autoRenew).length },
                { id: 'underutilized', label: 'Underutilized', count: subscriptions.filter(s => (s.assignedSeats / s.seats) < 0.7).length },
              ]}
              activeFilters={quickFilters}
              onFilterToggle={(filterId) => {
                setQuickFilters(prev => 
                  prev.includes(filterId) 
                    ? prev.filter(f => f !== filterId)
                    : [...prev, filterId]
                );
              }}
              placeholder="Search by name, vendor, department, or owner..."
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs text-slate-600">Total Subscriptions</span>
              </div>
              <div className="text-slate-900 mb-1">{subscriptions.length}</div>
              <div className="text-xs text-green-600">Active & managed</div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-xs text-slate-600">Expiring Soon</span>
              </div>
              <div className="text-slate-900 mb-1">{filterCounts.expiring}</div>
              <div className="text-xs text-orange-600">Within 30 days</div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-xs text-slate-600">Monthly Spend</span>
              </div>
              <div className="text-slate-900 mb-1">$32,450</div>
              <div className="text-xs text-slate-600">Recurring costs</div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-xs text-slate-600">Total Seats</span>
              </div>
              <div className="text-slate-900 mb-1">
                {subscriptions.reduce((sum, s) => sum + s.assignedSeats, 0)}/{subscriptions.reduce((sum, s) => sum + s.seats, 0)}
              </div>
              <div className="text-xs text-slate-600">Seats utilized</div>
            </div>
          </div>

          {/* Subscriptions Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Subscription</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Type</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Vendor</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Departments</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Seats/Usage</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Renewal Date</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Cost</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Status</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredSubscriptions.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                            {getTypeIcon(subscription.type)}
                          </div>
                          <div>
                            <div className="text-sm text-slate-900">{subscription.name}</div>
                            <div className="text-xs text-slate-500">{subscription.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                          {subscription.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">{subscription.vendor}</div>
                        <div className="text-xs text-slate-500">{subscription.owner}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {subscription.departments.slice(0, 2).map((dept, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                              {dept}
                            </span>
                          ))}
                          {subscription.departments.length > 2 && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                              +{subscription.departments.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">
                          {subscription.assignedSeats}/{subscription.seats}
                        </div>
                        <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              seatUtilization(subscription) >= 90 ? 'bg-red-500' :
                              seatUtilization(subscription) >= 70 ? 'bg-green-500' :
                              'bg-orange-500'
                            }`}
                            style={{ width: `${seatUtilization(subscription)}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">{subscription.renewalDate}</div>
                        <div className="text-xs text-slate-500">{subscription.billingCycle}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">{subscription.totalCost}</div>
                        <div className="text-xs text-slate-500">{subscription.planCost}</div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(subscription.status)}
                        {subscription.autoRenew && (
                          <div className="text-xs text-green-600 mt-1">Auto-renew</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleViewDetails(subscription)}
                          className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-slate-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredSubscriptions.length === 0 && (
                <div className="text-center py-12">
                  <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <div className="text-sm text-slate-900 mb-1">No subscriptions found</div>
                  <div className="text-xs text-slate-500">Try adjusting your search or filters</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail View Overlay */}
      {showDetailView && selectedSubscription && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/50 z-50"
            onClick={() => setShowDetailView(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
            <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Detail Header */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    {getTypeIcon(selectedSubscription.type)}
                  </div>
                  <div>
                    <h2 className="text-lg text-slate-900">{selectedSubscription.name}</h2>
                    <p className="text-xs text-slate-600">{selectedSubscription.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDetailView(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Detail Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* Left Column - Overview */}
                  <div className="col-span-2 space-y-6">
                    {/* Billing & Renewal */}
                    <div className="bg-slate-50 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-slate-600" />
                        <h3 className="text-sm text-slate-900">Billing & Renewal</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Billing Cycle</div>
                          <div className="text-sm text-slate-900">{selectedSubscription.billingCycle}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Renewal Date</div>
                          <div className="text-sm text-slate-900">{selectedSubscription.renewalDate}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Auto-Renew</div>
                          <div className="text-sm text-slate-900">
                            {selectedSubscription.autoRenew ? (
                              <span className="text-green-600">Enabled</span>
                            ) : (
                              <span className="text-red-600">Disabled</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="bg-slate-50 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="w-4 h-4 text-slate-600" />
                        <h3 className="text-sm text-slate-900">Cost Breakdown</h3>
                      </div>
                      <div className="space-y-3">
                        {selectedSubscription.costPerSeat && (
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-600">Cost per Seat</span>
                            <span className="text-sm text-slate-900">{selectedSubscription.costPerSeat}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-600">Plan Cost</span>
                          <span className="text-sm text-slate-900">{selectedSubscription.planCost}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-slate-200">
                          <span className="text-sm text-slate-900">Total Cost</span>
                          <span className="text-base text-slate-900">{selectedSubscription.totalCost}</span>
                        </div>
                      </div>
                    </div>

                    {/* Seat/SIM Allocation */}
                    <div className="bg-slate-50 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="w-4 h-4 text-slate-600" />
                        <h3 className="text-sm text-slate-900">
                          {selectedSubscription.type === 'Telecom' ? 'SIM Allocation' : 'Seat Allocation'}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-600">Assigned / Total</span>
                          <span className="text-sm text-slate-900">
                            {selectedSubscription.assignedSeats} / {selectedSubscription.seats}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              seatUtilization(selectedSubscription) >= 90 ? 'bg-red-500' :
                              seatUtilization(selectedSubscription) >= 70 ? 'bg-green-500' :
                              'bg-orange-500'
                            }`}
                            style={{ width: `${seatUtilization(selectedSubscription)}%` }}
                          />
                        </div>
                        <div className="text-xs text-slate-600">
                          {Math.round(seatUtilization(selectedSubscription))}% utilized
                          {seatUtilization(selectedSubscription) < 70 && (
                            <span className="text-orange-600"> - Underutilized</span>
                          )}
                        </div>
                        {selectedSubscription.simNumber && (
                          <div className="pt-3 border-t border-slate-200">
                            <span className="text-xs text-slate-600">SIM Number: </span>
                            <span className="text-sm text-slate-900 font-mono">{selectedSubscription.simNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Assigned Employees */}
                    <div className="bg-slate-50 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-600" />
                          <h3 className="text-sm text-slate-900">Assigned Employees</h3>
                        </div>
                        <button className="text-xs text-blue-600 hover:text-blue-700">Manage</button>
                      </div>
                      <div className="space-y-2">
                        {selectedSubscription.linkedEmployees.map((employee, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center">
                              <User className="w-3 h-3 text-slate-600" />
                            </div>
                            {employee}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Linked Devices */}
                    {selectedSubscription.linkedDevices.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-slate-600" />
                            <h3 className="text-sm text-slate-900">Linked Devices</h3>
                          </div>
                          <button className="text-xs text-blue-600 hover:text-blue-700">Manage</button>
                        </div>
                        <div className="space-y-2">
                          {selectedSubscription.linkedDevices.map((device, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                              <Monitor className="w-4 h-4 text-slate-500" />
                              {device}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {selectedSubscription.notes && (
                      <div className="bg-slate-50 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-4 h-4 text-slate-600" />
                          <h3 className="text-sm text-slate-900">Notes</h3>
                        </div>
                        <p className="text-sm text-slate-700">{selectedSubscription.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Metadata */}
                  <div className="space-y-6">
                    {/* Status */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="text-xs text-slate-600 mb-2">Status</div>
                      {getStatusBadge(selectedSubscription.status)}
                    </div>

                    {/* Vendor & Owner */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-slate-600 mb-1">Vendor</div>
                          <div className="text-sm text-slate-900">{selectedSubscription.vendor}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600 mb-1">Owner</div>
                          <div className="text-sm text-slate-900">{selectedSubscription.owner}</div>
                        </div>
                      </div>
                    </div>

                    {/* Departments */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="text-xs text-slate-600 mb-3">Departments</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubscription.departments.map((dept, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                            <Building2 className="w-3 h-3 inline mr-1" />
                            {dept}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xs text-slate-600">Documents</div>
                        <button className="text-xs text-blue-600 hover:text-blue-700">Upload</button>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-900">{selectedSubscription.documents} files</span>
                      </div>
                    </div>

                    {/* Activity */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <History className="w-4 h-4 text-slate-600" />
                        <div className="text-xs text-slate-600">Last Updated</div>
                      </div>
                      <div className="text-sm text-slate-900">{selectedSubscription.lastUpdated}</div>
                      <button className="text-xs text-blue-600 hover:text-blue-700 mt-3">View Activity Log</button>
                    </div>

                    {/* Set Reminder */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Bell className="w-4 h-4 text-blue-600" />
                        <div className="text-xs text-slate-700">Renewal Reminder</div>
                      </div>
                      <button 
                        onClick={() => setShowReminderModal(true)}
                        className="w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Set Reminder
                      </button>
                      <p className="text-xs text-slate-600 mt-2">Get notified before renewal date</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Footer Actions */}
              <div className="border-t border-slate-200 bg-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <button className="flex-1 px-4 py-2.5 text-sm text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
                    Edit Subscription
                  </button>
                  <button className="flex-1 px-4 py-2.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    Manage Assignments
                  </button>
                  <button className="flex-1 px-4 py-2.5 text-sm text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                    Archive Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Reminder Modal */}
      {showReminderModal && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/50 z-50"
            onClick={() => setShowReminderModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
            <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-lg text-slate-900">Set Renewal Reminder</h2>
                <button 
                  onClick={() => setShowReminderModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Date Picker */}
                  <div className="bg-slate-50 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-4 h-4 text-slate-600" />
                      <h3 className="text-sm text-slate-900">Reminder Date</h3>
                    </div>
                    <input
                      type="date"
                      value={reminderDate}
                      onChange={(e) => setReminderDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Notes */}
                  <div className="bg-slate-50 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-4 h-4 text-slate-600" />
                      <h3 className="text-sm text-slate-900">Notes</h3>
                    </div>
                    <textarea
                      value={reminderNote}
                      onChange={(e) => setReminderNote(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Add any additional notes or instructions..."
                    />
                  </div>
                </div>
              </div>

              {/* Sticky Footer Actions */}
              <div className="border-t border-slate-200 bg-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <button className="flex-1 px-4 py-2.5 text-sm text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
                    Set Reminder
                  </button>
                  <button 
                    onClick={() => setShowReminderModal(false)}
                    className="flex-1 px-4 py-2.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add Subscription Modal */}
      {showAddSubscription && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/50 z-50"
            onClick={() => setShowAddSubscription(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
            <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-lg text-slate-900">Add New Subscription</h2>
                  <p className="text-xs text-slate-600 mt-1">Add a new SaaS, software license, or telecom subscription</p>
                </div>
                <button 
                  onClick={() => setShowAddSubscription(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Subscription Type */}
                  <div className="bg-slate-50 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <CreditCard className="w-4 h-4 text-slate-600" />
                      <h3 className="text-sm text-slate-900">Subscription Type</h3>
                      <span className="text-red-500">*</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <button 
                        className={`flex flex-col items-center gap-2 p-4 ${
                          selectedType === 'SaaS' ? 'bg-white border-2 border-blue-500' : 'bg-white border border-slate-200'
                        } rounded-lg hover:bg-blue-50 transition-colors`}
                        onClick={() => setSelectedType('SaaS')}
                      >
                        <Cloud className="w-6 h-6 text-blue-600" />
                        <span className="text-sm text-slate-900">SaaS</span>
                      </button>
                      <button 
                        className={`flex flex-col items-center gap-2 p-4 ${
                          selectedType === 'Software' ? 'bg-white border-2 border-blue-500' : 'bg-white border border-slate-200'
                        } rounded-lg hover:bg-blue-50 transition-colors`}
                        onClick={() => setSelectedType('Software')}
                      >
                        <Key className="w-6 h-6 text-slate-600" />
                        <span className="text-sm text-slate-900">Software License</span>
                      </button>
                      <button 
                        className={`flex flex-col items-center gap-2 p-4 ${
                          selectedType === 'Telecom' ? 'bg-white border-2 border-blue-500' : 'bg-white border border-slate-200'
                        } rounded-lg hover:bg-blue-50 transition-colors`}
                        onClick={() => setSelectedType('Telecom')}
                      >
                        <Smartphone className="w-6 h-6 text-slate-600" />
                        <span className="text-sm text-slate-900">Telecom</span>
                      </button>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="bg-slate-50 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-4 h-4 text-slate-600" />
                      <h3 className="text-sm text-slate-900">Basic Information</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-600 mb-2 block">
                          Subscription Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Google Workspace Business"
                          className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-600 mb-2 block">
                          Vendor/Provider <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Google"
                          className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Billing & Cost */}
                  <div className="bg-slate-50 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <DollarSign className="w-4 h-4 text-slate-600" />
                      <h3 className="text-sm text-slate-900">Billing & Cost</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-slate-600 mb-2 block">
                          Billing Cycle <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Monthly</option>
                          <option>Quarterly</option>
                          <option>Annual</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-slate-600 mb-2 block">
                          Cost per Seat/Unit
                        </label>
                        <input
                          type="text"
                          placeholder="₹1,200"
                          className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-600 mb-2 block">
                          Total Cost <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="₹60,000"
                          className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Seats & Renewal */}
                  <div className="bg-slate-50 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-4 h-4 text-slate-600" />
                      <h3 className="text-sm text-slate-900">
                        {selectedType === 'Telecom' ? 'SIM Cards & Renewal' : 'Seats & Renewal'}
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs text-slate-600 mb-2 block">
                          {selectedType === 'Telecom' ? 'Total SIM Cards' : 'Total Seats'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          placeholder={selectedType === 'Telecom' ? '30' : '50'}
                          className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-600 mb-2 block">
                          Renewal Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-600 mb-2 block">
                          Auto-Renew
                        </label>
                        <div className="flex items-center gap-3 h-full pt-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500" />
                            <span className="text-sm text-slate-700">Enable</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Software License Details - Only for Software type */}
                  {selectedType === 'Software' && (
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-5 border border-purple-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Key className="w-4 h-4 text-purple-600" />
                        <h3 className="text-sm text-slate-900">License Details</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-600 mb-2 block">
                            License Key/Serial
                          </label>
                          <input
                            type="text"
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 mb-2 block">
                            License Type
                          </label>
                          <select className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Perpetual License</option>
                            <option>Subscription License</option>
                            <option>Volume License</option>
                            <option>Enterprise License</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="text-xs text-slate-600 mb-2 block">
                          Activation/Installation Instructions
                        </label>
                        <textarea
                          placeholder="Add installation steps, activation URLs, or special instructions..."
                          className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                        />
                      </div>
                    </div>
                  )}

                  {/* Telecom Plan Details - Only for Telecom type */}
                  {selectedType === 'Telecom' && (
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-5 border border-green-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Smartphone className="w-4 h-4 text-green-600" />
                        <h3 className="text-sm text-slate-900">Telecom Plan Details</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-600 mb-2 block">
                            SIM Series/Batch Number
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., AIRTEL-CORP-30"
                            className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 mb-2 block">
                            Plan Type
                          </label>
                          <select className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Postpaid Corporate</option>
                            <option>Prepaid Bulk</option>
                            <option>Data Only</option>
                            <option>Voice + Data</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <label className="text-xs text-slate-600 mb-2 block">
                            Data Limit
                          </label>
                          <input
                            type="text"
                            placeholder="Unlimited / 100GB"
                            className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 mb-2 block">
                            Voice Minutes
                          </label>
                          <input
                            type="text"
                            placeholder="Unlimited / 1000 mins"
                            className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 mb-2 block">
                            SMS Limit
                          </label>
                          <input
                            type="text"
                            placeholder="Unlimited / 500"
                            className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Department & Owner */}
                  <div className="bg-slate-50 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Building2 className="w-4 h-4 text-slate-600" />
                      <h3 className="text-sm text-slate-900">Department & Owner</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-600 mb-2 block">
                          Departments <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Engineering, Product, Marketing"
                          className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-slate-500 mt-1">Separate multiple departments with commas</p>
                      </div>
                      <div>
                        <label className="text-xs text-slate-600 mb-2 block">
                          Owner <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="IT Department"
                          className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="bg-slate-50 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-4 h-4 text-slate-600" />
                      <h3 className="text-sm text-slate-900">Additional Notes</h3>
                    </div>
                    <textarea
                      placeholder="Add any additional details about this subscription..."
                      className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Sticky Footer Actions */}
              <div className="border-t border-slate-200 bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    <span className="text-red-500">*</span> Required fields
                  </p>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowAddSubscription(false)}
                      className="px-6 py-2.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="px-6 py-2.5 text-sm text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Subscription
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Allocate Subscription Modal */}
      {showAllocateModal && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/50 z-50"
            onClick={() => {
              setShowAllocateModal(false);
              setAllocationStep('select-subscription');
              setSelectedSubscriptionForAllocation(null);
            }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
            <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-lg text-slate-900">Allocate Subscription</h2>
                  <p className="text-xs text-slate-600 mt-1">
                    {allocationStep === 'select-subscription' 
                      ? 'Select a subscription to allocate' 
                      : `Allocating: ${selectedSubscriptionForAllocation?.name}`}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setShowAllocateModal(false);
                    setAllocationStep('select-subscription');
                    setSelectedSubscriptionForAllocation(null);
                  }}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Step Indicator */}
              <div className="px-6 py-3 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 ${allocationStep === 'select-subscription' ? 'text-blue-600' : 'text-green-600'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${allocationStep === 'select-subscription' ? 'bg-blue-100' : 'bg-green-100'}`}>
                      {allocationStep === 'select-employee' ? '✓' : '1'}
                    </div>
                    <span className="text-xs">Select Subscription</span>
                  </div>
                  <div className="flex-1 h-px bg-slate-300" />
                  <div className={`flex items-center gap-2 ${allocationStep === 'select-employee' ? 'text-blue-600' : 'text-slate-400'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${allocationStep === 'select-employee' ? 'bg-blue-100' : 'bg-slate-200'}`}>
                      2
                    </div>
                    <span className="text-xs">Select Employee</span>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Step 1: Select Subscription */}
                {allocationStep === 'select-subscription' && (
                  <div className="space-y-3">
                    <div className="text-sm text-slate-600 mb-4">
                      Choose a subscription with available seats/licenses to allocate
                    </div>
                    {subscriptions.filter(sub => sub.assignedSeats < sub.seats).map((subscription) => (
                      <button
                        key={subscription.id}
                        onClick={() => {
                          setSelectedSubscriptionForAllocation(subscription);
                          setAllocationStep('select-employee');
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50/30 transition-all text-left"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {getTypeIcon(subscription.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-sm text-slate-900 mb-1">{subscription.name}</h3>
                                <p className="text-xs text-slate-600">{subscription.vendor} • {subscription.id}</p>
                              </div>
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                                subscription.type === 'SaaS' ? 'bg-blue-100 text-blue-700' :
                                subscription.type === 'Software' ? 'bg-purple-100 text-purple-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {subscription.type}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <div className="text-xs text-slate-500">Available Seats</div>
                                <div className="text-sm text-slate-900">
                                  {subscription.seats - subscription.assignedSeats} of {subscription.seats}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-slate-500">Owner</div>
                                <div className="text-sm text-slate-900">{subscription.owner}</div>
                              </div>
                              <div>
                                <div className="text-xs text-slate-500">Renewal</div>
                                <div className="text-sm text-slate-900">{subscription.renewalDate}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}

                    {subscriptions.filter(sub => sub.assignedSeats < sub.seats).length === 0 && (
                      <div className="text-center py-12">
                        <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <div className="text-sm text-slate-900 mb-1">No subscriptions available</div>
                        <div className="text-xs text-slate-500">All subscriptions are fully allocated</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Select Employee */}
                {allocationStep === 'select-employee' && selectedSubscriptionForAllocation && (
                  <div className="space-y-6">
                    {/* Selected Subscription Summary */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          {getTypeIcon(selectedSubscriptionForAllocation.type)}
                        </div>
                        <div>
                          <h3 className="text-sm text-slate-900">{selectedSubscriptionForAllocation.name}</h3>
                          <p className="text-xs text-slate-600">{selectedSubscriptionForAllocation.vendor}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white rounded-lg p-3">
                          <div className="text-xs text-slate-500 mb-1">Available</div>
                          <div className="text-base text-green-600">
                            {selectedSubscriptionForAllocation.seats - selectedSubscriptionForAllocation.assignedSeats} seats
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <div className="text-xs text-slate-500 mb-1">Cost per Seat</div>
                          <div className="text-base text-slate-900">{selectedSubscriptionForAllocation.costPerSeat || 'N/A'}</div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <div className="text-xs text-slate-500 mb-1">Renewal</div>
                          <div className="text-base text-slate-900">{selectedSubscriptionForAllocation.renewalDate}</div>
                        </div>
                      </div>
                    </div>

                    {/* Employee Selection */}
                    <div className="bg-slate-50 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <User className="w-4 h-4 text-slate-600" />
                        <h3 className="text-sm text-slate-900">Select Employee(s)</h3>
                        <span className="text-red-500">*</span>
                      </div>
                      
                      {/* Search Employee */}
                      <div className="mb-4">
                        <input
                          type="text"
                          placeholder="Search employees by name, email, or department..."
                          className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Employee List */}
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {[
                          { id: 'EMP-001', name: 'John Doe', email: 'john.doe@company.com', department: 'Engineering', avatar: 'JD' },
                          { id: 'EMP-002', name: 'Jane Smith', email: 'jane.smith@company.com', department: 'Product', avatar: 'JS' },
                          { id: 'EMP-003', name: 'Mike Johnson', email: 'mike.j@company.com', department: 'Engineering', avatar: 'MJ' },
                          { id: 'EMP-004', name: 'Sarah Williams', email: 'sarah.w@company.com', department: 'Design', avatar: 'SW' },
                          { id: 'EMP-005', name: 'David Brown', email: 'david.b@company.com', department: 'Marketing', avatar: 'DB' },
                          { id: 'EMP-006', name: 'Emily Davis', email: 'emily.d@company.com', department: 'Sales', avatar: 'ED' },
                        ].map((employee) => (
                          <label 
                            key={employee.id}
                            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50/30 cursor-pointer transition-all"
                          >
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs">{employee.avatar}</span>
                            </div>
                            <div className="flex-1">
                              <div className="text-sm text-slate-900">{employee.name}</div>
                              <div className="text-xs text-slate-600">{employee.email}</div>
                            </div>
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                              {employee.department}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Allocation Details */}
                    <div className="bg-slate-50 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-slate-600" />
                        <h3 className="text-sm text-slate-900">Allocation Details</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-600 mb-2 block">
                            Start Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 mb-2 block">
                            End Date (Optional)
                          </label>
                          <input
                            type="date"
                            className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="text-xs text-slate-600 mb-2 block">
                          Allocation Notes
                        </label>
                        <textarea
                          placeholder="Add any notes about this allocation..."
                          className="w-full px-4 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky Footer Actions */}
              <div className="border-t border-slate-200 bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                  {allocationStep === 'select-subscription' ? (
                    <>
                      <p className="text-xs text-slate-500">
                        Select a subscription to continue
                      </p>
                      <button 
                        onClick={() => {
                          setShowAllocateModal(false);
                          setAllocationStep('select-subscription');
                          setSelectedSubscriptionForAllocation(null);
                        }}
                        className="px-6 py-2.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => {
                          setAllocationStep('select-subscription');
                          setSelectedSubscriptionForAllocation(null);
                        }}
                        className="px-6 py-2.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Back
                      </button>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => {
                            setShowAllocateModal(false);
                            setAllocationStep('select-subscription');
                            setSelectedSubscriptionForAllocation(null);
                          }}
                          className="px-6 py-2.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button className="px-6 py-2.5 text-sm text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Allocate Subscription
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}