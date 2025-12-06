import { useState } from 'react';
import { Plus, Eye, Users, Globe, AlertCircle, CheckCircle, Clock, XCircle, Calendar, DollarSign, Building2, User, FileText, History, Server, Shield, Cloud, CreditCard, Bell } from 'lucide-react';
import { SmartSearchBar } from './SmartSearchBar';

type ServiceType = 'Web Hosting' | 'Domain' | 'SSL Certificate' | 'Managed Services' | 'Cloud Infrastructure';
type ServiceStatus = 'Active' | 'Expiring Soon' | 'Inactive' | 'Expired';

interface ClientService {
  id: string;
  serviceName: string;
  type: ServiceType;
  clientName: string;
  clientContact: string;
  domain?: string;
  plan: string;
  billingCycle: string;
  renewalDate: string;
  monthlyCost: string;
  totalCost: string;
  autoRenew: boolean;
  accountManager: string;
  status: ServiceStatus;
  documents: number;
  notes?: string;
  lastUpdated: string;
  setupDate: string;
  bandwidth?: string;
  storage?: string;
}

interface FilterCounts {
  all: number;
  webHosting: number;
  domain: number;
  ssl: number;
  managed: number;
  cloud: number;
  active: number;
  expiring: number;
  inactive: number;
}

export function ClientServicesManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [quickFilters, setQuickFilters] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<ClientService | null>(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderNote, setReminderNote] = useState('');

  const [clientServices] = useState<ClientService[]>([
    {
      id: 'CS-001',
      serviceName: 'Premium Web Hosting',
      type: 'Web Hosting',
      clientName: 'Acme Corporation',
      clientContact: 'john@acmecorp.com',
      domain: 'acmecorp.com',
      plan: 'Business Pro',
      billingCycle: 'Annual',
      renewalDate: '2025-03-15',
      monthlyCost: '$149',
      totalCost: '$1,788',
      autoRenew: true,
      accountManager: 'Sarah Johnson',
      status: 'Active',
      documents: 4,
      notes: 'High-performance hosting with 99.9% uptime SLA',
      lastUpdated: '2024-11-28',
      setupDate: '2023-03-15',
      bandwidth: '1TB/month',
      storage: '100GB SSD',
    },
    {
      id: 'CS-002',
      serviceName: 'Domain Registration',
      type: 'Domain',
      clientName: 'TechStart Inc',
      clientContact: 'admin@techstart.io',
      domain: 'techstart.io',
      plan: 'Premium Domain',
      billingCycle: 'Annual',
      renewalDate: '2024-12-20',
      monthlyCost: '$12',
      totalCost: '$144',
      autoRenew: true,
      accountManager: 'Mike Chen',
      status: 'Expiring Soon',
      documents: 2,
      notes: '.io domain with privacy protection',
      lastUpdated: '2024-11-25',
      setupDate: '2022-12-20',
    },
    {
      id: 'CS-003',
      serviceName: 'Wildcard SSL Certificate',
      type: 'SSL Certificate',
      clientName: 'Acme Corporation',
      clientContact: 'john@acmecorp.com',
      domain: '*.acmecorp.com',
      plan: 'Wildcard SSL',
      billingCycle: 'Annual',
      renewalDate: '2025-02-10',
      monthlyCost: '$25',
      totalCost: '$300',
      autoRenew: true,
      accountManager: 'Sarah Johnson',
      status: 'Active',
      documents: 3,
      notes: '256-bit encryption, covers all subdomains',
      lastUpdated: '2024-10-15',
      setupDate: '2023-02-10',
    },
    {
      id: 'CS-004',
      serviceName: 'Managed WordPress Hosting',
      type: 'Managed Services',
      clientName: 'Creative Agency LLC',
      clientContact: 'contact@creativeagency.com',
      domain: 'creativeagency.com',
      plan: 'Managed WordPress Pro',
      billingCycle: 'Monthly',
      renewalDate: '2024-12-15',
      monthlyCost: '$89',
      totalCost: '$89',
      autoRenew: true,
      accountManager: 'Lisa Martinez',
      status: 'Active',
      documents: 6,
      notes: 'Includes daily backups, security monitoring, and updates',
      lastUpdated: '2024-11-20',
      setupDate: '2024-01-15',
      bandwidth: '500GB/month',
      storage: '50GB SSD',
    },
    {
      id: 'CS-005',
      serviceName: 'AWS Cloud Infrastructure',
      type: 'Cloud Infrastructure',
      clientName: 'DataFlow Systems',
      clientContact: 'ops@dataflow.com',
      plan: 'Custom Cloud Setup',
      billingCycle: 'Monthly',
      renewalDate: '2024-12-31',
      monthlyCost: '$2,450',
      totalCost: '$2,450',
      autoRenew: true,
      accountManager: 'David Park',
      status: 'Active',
      documents: 8,
      notes: 'Multi-region deployment with load balancing and auto-scaling',
      lastUpdated: '2024-11-29',
      setupDate: '2024-06-01',
      bandwidth: 'Unlimited',
      storage: '2TB',
    },
    {
      id: 'CS-006',
      serviceName: 'Domain & Email Hosting',
      type: 'Domain',
      clientName: 'Global Consulting Group',
      clientContact: 'it@globalconsult.com',
      domain: 'globalconsult.com',
      plan: 'Business Domain + Email',
      billingCycle: 'Annual',
      renewalDate: '2024-12-08',
      monthlyCost: '$29',
      totalCost: '$348',
      autoRenew: false,
      accountManager: 'Sarah Johnson',
      status: 'Expiring Soon',
      documents: 3,
      notes: 'Includes 50 email accounts',
      lastUpdated: '2024-11-18',
      setupDate: '2021-12-08',
    },
    {
      id: 'CS-007',
      serviceName: 'E-commerce Hosting',
      type: 'Web Hosting',
      clientName: 'ShopWell Online',
      clientContact: 'admin@shopwell.store',
      domain: 'shopwell.store',
      plan: 'E-commerce Enterprise',
      billingCycle: 'Annual',
      renewalDate: '2025-04-20',
      monthlyCost: '$299',
      totalCost: '$3,588',
      autoRenew: true,
      accountManager: 'Mike Chen',
      status: 'Active',
      documents: 7,
      notes: 'PCI-compliant hosting with CDN and DDoS protection',
      lastUpdated: '2024-11-22',
      setupDate: '2023-04-20',
      bandwidth: '2TB/month',
      storage: '200GB SSD',
    },
    {
      id: 'CS-008',
      serviceName: '24/7 Managed Support',
      type: 'Managed Services',
      clientName: 'HealthTech Solutions',
      clientContact: 'support@healthtech.io',
      domain: 'healthtech.io',
      plan: 'Premium Managed Services',
      billingCycle: 'Monthly',
      renewalDate: '2024-12-10',
      monthlyCost: '$499',
      totalCost: '$499',
      autoRenew: true,
      accountManager: 'Lisa Martinez',
      status: 'Expiring Soon',
      documents: 5,
      notes: 'HIPAA-compliant infrastructure management',
      lastUpdated: '2024-11-15',
      setupDate: '2024-03-10',
    },
  ]);

  // Calculate filter counts
  const filterCounts: FilterCounts = {
    all: clientServices.length,
    webHosting: clientServices.filter(s => s.type === 'Web Hosting').length,
    domain: clientServices.filter(s => s.type === 'Domain').length,
    ssl: clientServices.filter(s => s.type === 'SSL Certificate').length,
    managed: clientServices.filter(s => s.type === 'Managed Services').length,
    cloud: clientServices.filter(s => s.type === 'Cloud Infrastructure').length,
    active: clientServices.filter(s => s.status === 'Active').length,
    expiring: clientServices.filter(s => s.status === 'Expiring Soon').length,
    inactive: clientServices.filter(s => s.status === 'Inactive' || s.status === 'Expired').length,
  };

  // Filter services based on search and quick filters
  const filteredServices = clientServices.filter(service => {
    const matchesSearch = searchQuery === '' || 
      service.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.accountManager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.domain?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = quickFilters.length === 0 || quickFilters.every(filter => {
      const lowerFilter = filter.toLowerCase();
      if (lowerFilter === 'web hosting') return service.type === 'Web Hosting';
      if (lowerFilter === 'domain') return service.type === 'Domain';
      if (lowerFilter === 'ssl') return service.type === 'SSL Certificate';
      if (lowerFilter === 'managed services') return service.type === 'Managed Services';
      if (lowerFilter === 'cloud') return service.type === 'Cloud Infrastructure';
      if (lowerFilter === 'active') return service.status === 'Active';
      if (lowerFilter === 'expiring soon') return service.status === 'Expiring Soon';
      if (lowerFilter === 'inactive') return service.status === 'Inactive' || service.status === 'Expired';
      if (lowerFilter === 'auto-renew') return service.autoRenew;
      return false;
    });

    return matchesSearch && matchesFilters;
  });

  const getTypeIcon = (type: ServiceType) => {
    switch (type) {
      case 'Web Hosting': return <Server className="w-4 h-4" />;
      case 'Domain': return <Globe className="w-4 h-4" />;
      case 'SSL Certificate': return <Shield className="w-4 h-4" />;
      case 'Managed Services': return <Users className="w-4 h-4" />;
      case 'Cloud Infrastructure': return <Cloud className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: ServiceStatus) => {
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

  const handleViewDetails = (service: ClientService) => {
    setSelectedService(service);
    setShowDetailView(true);
  };

  const totalMonthlyRevenue = clientServices
    .filter(s => s.status === 'Active')
    .reduce((sum, s) => sum + parseFloat(s.monthlyCost.replace('$', '').replace(',', '')), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl text-slate-900 mb-1">Client Services Management</h1>
              <p className="text-sm text-slate-600">Manage client hosting, domains, SSL certificates, and managed services</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Client Service
              </button>
            </div>
          </div>

          {/* Smart Search Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <SmartSearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              quickFilters={[
                { id: 'web hosting', label: 'Web Hosting', count: filterCounts.webHosting },
                { id: 'domain', label: 'Domain', count: filterCounts.domain },
                { id: 'ssl', label: 'SSL', count: filterCounts.ssl },
                { id: 'managed services', label: 'Managed Services', count: filterCounts.managed },
                { id: 'cloud', label: 'Cloud', count: filterCounts.cloud },
                { id: 'active', label: 'Active', count: filterCounts.active },
                { id: 'expiring soon', label: 'Expiring Soon', count: filterCounts.expiring },
                { id: 'inactive', label: 'Inactive', count: filterCounts.inactive },
                { id: 'auto-renew', label: 'Auto-Renew', count: clientServices.filter(s => s.autoRenew).length },
              ]}
              activeFilters={quickFilters}
              onFilterToggle={(filterId) => {
                setQuickFilters(prev => 
                  prev.includes(filterId) 
                    ? prev.filter(f => f !== filterId)
                    : [...prev, filterId]
                );
              }}
              placeholder="Search by service, client, domain, or account manager..."
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs text-slate-600">Total Services</span>
              </div>
              <div className="text-slate-900 mb-1">{clientServices.length}</div>
              <div className="text-xs text-green-600">Active clients</div>
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
                <span className="text-xs text-slate-600">Monthly Revenue</span>
              </div>
              <div className="text-slate-900 mb-1">${totalMonthlyRevenue.toLocaleString()}</div>
              <div className="text-xs text-slate-600">From active services</div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-xs text-slate-600">Active Clients</span>
              </div>
              <div className="text-slate-900 mb-1">
                {new Set(clientServices.filter(s => s.status === 'Active').map(s => s.clientName)).size}
              </div>
              <div className="text-xs text-slate-600">Unique clients</div>
            </div>
          </div>

          {/* Services Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Service</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Type</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Client</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Domain</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Plan</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Renewal Date</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Cost</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Status</th>
                    <th className="px-6 py-3 text-left text-xs text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                            {getTypeIcon(service.type)}
                          </div>
                          <div>
                            <div className="text-sm text-slate-900">{service.serviceName}</div>
                            <div className="text-xs text-slate-500">{service.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                          {service.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">{service.clientName}</div>
                        <div className="text-xs text-slate-500">{service.accountManager}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900 font-mono">{service.domain || '-'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">{service.plan}</div>
                        <div className="text-xs text-slate-500">{service.billingCycle}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">{service.renewalDate}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">{service.totalCost}</div>
                        <div className="text-xs text-slate-500">{service.monthlyCost}/mo</div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(service.status)}
                        {service.autoRenew && (
                          <div className="text-xs text-green-600 mt-1">Auto-renew</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleViewDetails(service)}
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

              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <Server className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <div className="text-sm text-slate-900 mb-1">No services found</div>
                  <div className="text-xs text-slate-500">Try adjusting your search or filters</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail View Overlay */}
      {showDetailView && selectedService && (
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
                    {getTypeIcon(selectedService.type)}
                  </div>
                  <div>
                    <h2 className="text-lg text-slate-900">{selectedService.serviceName}</h2>
                    <p className="text-xs text-slate-600">{selectedService.id}</p>
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
                    {/* Client Information */}
                    <div className="bg-slate-50 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Building2 className="w-4 h-4 text-slate-600" />
                        <h3 className="text-sm text-slate-900">Client Information</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Client Name</div>
                          <div className="text-sm text-slate-900">{selectedService.clientName}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Contact Email</div>
                          <div className="text-sm text-slate-900">{selectedService.clientContact}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Account Manager</div>
                          <div className="text-sm text-slate-900">{selectedService.accountManager}</div>
                        </div>
                        {selectedService.domain && (
                          <div>
                            <div className="text-xs text-slate-500 mb-1">Domain</div>
                            <div className="text-sm text-slate-900 font-mono">{selectedService.domain}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="bg-slate-50 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Server className="w-4 h-4 text-slate-600" />
                        <h3 className="text-sm text-slate-900">Service Details</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Plan</div>
                          <div className="text-sm text-slate-900">{selectedService.plan}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Setup Date</div>
                          <div className="text-sm text-slate-900">{selectedService.setupDate}</div>
                        </div>
                        {selectedService.bandwidth && (
                          <div>
                            <div className="text-xs text-slate-500 mb-1">Bandwidth</div>
                            <div className="text-sm text-slate-900">{selectedService.bandwidth}</div>
                          </div>
                        )}
                        {selectedService.storage && (
                          <div>
                            <div className="text-xs text-slate-500 mb-1">Storage</div>
                            <div className="text-sm text-slate-900">{selectedService.storage}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Billing & Renewal */}
                    <div className="bg-slate-50 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-slate-600" />
                        <h3 className="text-sm text-slate-900">Billing & Renewal</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Billing Cycle</div>
                          <div className="text-sm text-slate-900">{selectedService.billingCycle}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Renewal Date</div>
                          <div className="text-sm text-slate-900">{selectedService.renewalDate}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Auto-Renew</div>
                          <div className="text-sm text-slate-900">
                            {selectedService.autoRenew ? (
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
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-600">Monthly Cost</span>
                          <span className="text-sm text-slate-900">{selectedService.monthlyCost}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-slate-200">
                          <span className="text-sm text-slate-900">Total Cost ({selectedService.billingCycle})</span>
                          <span className="text-base text-slate-900">{selectedService.totalCost}</span>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {selectedService.notes && (
                      <div className="bg-slate-50 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-4 h-4 text-slate-600" />
                          <h3 className="text-sm text-slate-900">Notes</h3>
                        </div>
                        <p className="text-sm text-slate-700">{selectedService.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Metadata */}
                  <div className="space-y-6">
                    {/* Status */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="text-xs text-slate-600 mb-2">Status</div>
                      {getStatusBadge(selectedService.status)}
                    </div>

                    {/* Service Type */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="text-xs text-slate-600 mb-1">Service Type</div>
                      <div className="text-sm text-slate-900">{selectedService.type}</div>
                    </div>

                    {/* Documents */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xs text-slate-600">Documents</div>
                        <button className="text-xs text-blue-600 hover:text-blue-700">Upload</button>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-900">{selectedService.documents} files</span>
                      </div>
                    </div>

                    {/* Activity */}
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <History className="w-4 h-4 text-slate-600" />
                        <div className="text-xs text-slate-600">Last Updated</div>
                      </div>
                      <div className="text-sm text-slate-900">{selectedService.lastUpdated}</div>
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
                    Edit Service
                  </button>
                  <button className="flex-1 px-4 py-2.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    Contact Client
                  </button>
                  <button className="flex-1 px-4 py-2.5 text-sm text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                    Cancel Service
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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-lg text-slate-900">Set Reminder</h2>
                <button 
                  onClick={() => setShowReminderModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-600">Reminder Date</label>
                    <input
                      type="date"
                      value={reminderDate}
                      onChange={(e) => setReminderDate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-600">Reminder Note</label>
                    <textarea
                      value={reminderNote}
                      onChange={(e) => setReminderNote(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Sticky Footer Actions */}
              <div className="border-t border-slate-200 bg-white px-6 py-4">
                <div className="flex items-center gap-3">
                  <button className="flex-1 px-4 py-2.5 text-sm text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
                    Save Reminder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}