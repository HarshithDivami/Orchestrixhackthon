import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { Projects } from './components/Projects';
import { Team } from './components/Team';
import { Settings } from './components/Settings';
import { UserManagement } from './components/UserManagement';
import { InventoryManagement } from './components/InventoryManagement';
import { AIAssistantOverlay } from './components/AIAssistantOverlay';
import { Bot, Sparkles } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => {
      setIsAuthenticated(true);
      setIsAIAssistantOpen(true); // Open AI Assistant on login
    }} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'user-management':
        return <UserManagement />;
      case 'inventory-management':
        return <InventoryManagement />;
      case 'reports-audit':
        return <div className="p-8"><h1 className="text-2xl text-slate-900">Reports and Audit</h1><p className="text-sm text-slate-600 mt-2">Coming soon...</p></div>;
      case 'analytics':
        return <Analytics />;
      case 'projects':
        return <Projects />;
      case 'team':
        return <Team />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>

      {/* Floating AI Assistant Button */}
      <button
        onClick={() => setIsAIAssistantOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 text-white rounded-full shadow-2xl hover:shadow-slate-900/30 hover:scale-110 transition-all duration-300 flex items-center justify-center group z-50"
        aria-label="Open AI Assistant"
      >
        <Bot className="w-7 h-7 group-hover:scale-110 transition-transform" />
        <Sparkles className="w-3 h-3 absolute top-2 right-2 text-blue-300 animate-pulse" />
      </button>

      {/* AI Assistant Overlay */}
      <AIAssistantOverlay
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onNavigate={setCurrentView}
      />
    </div>
  );
}