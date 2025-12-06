import { Search, Bell, Menu, User, LogOut } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onLogout?: () => void;
}

export function Header({ onToggleSidebar, onLogout }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');
  const userName = userInfo.name || userInfo.email || 'User';
  const userEmail = userInfo.email || '';
  const userAvatar = userInfo.picture || userInfo.avatar || '';

  return (
    <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects, tasks, team members..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-slate-50 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
              {userAvatar ? (
                <img 
                  src={userAvatar} 
                  alt={userName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to User icon if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                  }}
                />
              ) : (
                <User className="w-4 h-4 text-slate-600" />
              )}
            </div>
            <span className="text-sm text-slate-700 hidden sm:block">{userName}</span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-12 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                  {userAvatar ? (
                    <img 
                      src={userAvatar} 
                      alt={userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-slate-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{userName}</p>
                  {userEmail && <p className="text-xs text-slate-500 truncate">{userEmail}</p>}
                </div>
              </div>
              
              {onLogout && (
                <button
                  onClick={() => {
                    console.log('[HEADER] Logout button clicked');
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Backdrop to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
}