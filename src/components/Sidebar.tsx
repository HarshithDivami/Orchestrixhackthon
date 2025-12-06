import { LayoutDashboard, BarChart3, Settings, ChevronLeft, ChevronRight, LogOut, UserCog, Package, FileText } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ currentView, onNavigate, collapsed, onToggleCollapse }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'user-management', label: 'Employee Management', icon: UserCog },
    { id: 'inventory-management', label: 'Inventory Management', icon: Package },
    { id: 'reports-audit', label: 'Reports and Audit', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div
      className={`bg-white text-slate-800 flex flex-col transition-all duration-300 border-r border-slate-200 ${
        collapsed ? 'w-20' : 'w-56'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">O</span>
            </div>
            <span className="text-slate-900">Orchestrix</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-white text-sm">O</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  } ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? item.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      {!collapsed && (
        <div className="px-3 py-4 border-t border-slate-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">DA</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 text-sm truncate">DevOps Admin</p>
              <p className="text-slate-600 text-xs truncate">Administrator</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-3 py-2 mt-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      )}

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-slate-200">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}