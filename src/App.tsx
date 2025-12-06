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
          onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>

      {/* AI Assistant Overlay */}
      <AIAssistantOverlay
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        onNavigate={setCurrentView}
      />
    </div>
  );
}