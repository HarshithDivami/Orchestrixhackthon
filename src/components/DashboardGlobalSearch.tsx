import { Search, Sparkles, Users, Package, CreditCard, Server, BarChart3, Settings } from 'lucide-react';

interface QuickLink {
  id: string;
  label: string;
  icon: React.ReactNode;
  view: string;
}

interface DashboardGlobalSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigate?: (view: string) => void;
}

export function DashboardGlobalSearch({ searchQuery, onSearchChange, onNavigate }: DashboardGlobalSearchProps) {
  const quickLinks: QuickLink[] = [
    { id: 'employees', label: 'Employees', icon: <Users className="w-3 h-3" />, view: 'user-management' },
    { id: 'assets', label: 'Assets', icon: <Package className="w-3 h-3" />, view: 'inventory-management' },
    { id: 'subscriptions', label: 'Subscriptions', icon: <CreditCard className="w-3 h-3" />, view: 'subscription-management' },
    { id: 'clients', label: 'Client Services', icon: <Server className="w-3 h-3" />, view: 'client-services-management' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-3 h-3" />, view: 'analytics' },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-3 h-3" />, view: 'settings' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search employees, assets, subscriptions..."
            className="w-full pl-10 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span className="text-xs text-slate-500">AI</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Quick:</span>
          {quickLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate?.(link.view)}
              className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-700 transition-all flex items-center gap-1.5 hover:shadow-sm"
              title={link.label}
            >
              {link.icon}
              <span className="hidden xl:inline">{link.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
