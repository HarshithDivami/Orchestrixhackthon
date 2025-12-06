import { useState, useEffect } from 'react';
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
import { api } from './utils/api';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    console.log('=== ORCHESTRIX APP INITIALIZATION ===');
    console.log('[APP] App component initializing...');
    console.log('[APP] Checking authentication state...');
    
    // Check if user is already authenticated (e.g., token in localStorage)
    const token = localStorage.getItem('auth_token');
    console.log(`[APP] Stored auth token: ${token ? 'Present' : 'Not found'}`);
    
    const authenticated = !!token;
    console.log(`[APP] Authentication state: ${authenticated}`);
    return authenticated;
  });
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // Handle Google OAuth callback
  useEffect(() => {
    const handleOAuthCallback = async () => {
      console.log('=== OAUTH CALLBACK HANDLER ===');
      console.log(`[APP] Current URL: ${window.location.href}`);
      console.log(`[APP] Current pathname: ${window.location.pathname}`);
      console.log(`[APP] Current search params: ${window.location.search}`);
      console.log(`[APP] Current hash: ${window.location.hash}`);
      
      const urlParams = new URLSearchParams(window.location.search);
      
      // Also check hash params (some OAuth flows use hash)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      
      const code = urlParams.get('code');
      const token = urlParams.get('token') || hashParams.get('token');
      const state = urlParams.get('state');
      const error = urlParams.get('error');
      const errorMessage = urlParams.get('message');
      
      console.log(`[APP] All URL params:`, Object.fromEntries(urlParams.entries()));
      console.log(`[APP] All hash params:`, Object.fromEntries(hashParams.entries()));
      console.log(`[APP] Checking URL parameters...`);
      console.log(`[APP] Code: ${code ? 'Present' : 'Not found'}`);
      console.log(`[APP] Token: ${token ? 'Present' : 'Not found'}`);
      console.log(`[APP] State: ${state || 'Not found'}`);
      console.log(`[APP] Error: ${error || 'None'}`);
      console.log(`[APP] Error Message: ${errorMessage || 'None'}`);

      // Handle error from backend redirect
      if (error || errorMessage) {
        const displayError = errorMessage || error;
        console.error(`[APP] OAuth error from backend: ${displayError}`);
        alert(`Authentication failed: ${displayError}`);
        // Clean up URL and redirect to home
        window.history.replaceState({}, document.title, '/');
        return;
      }

      // If token is directly provided in URL (backend already exchanged the code)
      if (token) {
        console.log(`[APP] Token received directly from backend!`);
        console.log(`[APP] Backend already exchanged OAuth code`);
        
        try {
          console.log(`[APP] Storing auth token...`);
          localStorage.setItem('auth_token', token);
          
          // Try to decode JWT to extract user info
          try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            
            const tokenData = JSON.parse(jsonPayload);
            console.log(`[APP] Decoded JWT token:`, tokenData);
            
            // Extract user info from token
            const userInfo = {
              id: tokenData.sub,
              email: tokenData.email,
              name: tokenData.name,
              picture: tokenData.picture
            };
            
            console.log(`[APP] User info from token:`, userInfo);
            localStorage.setItem('user_info', JSON.stringify(userInfo));
          } catch (decodeError) {
            console.warn(`[APP] Could not decode JWT token:`, decodeError);
            
            // Try to fetch user info from backend as fallback
            try {
              console.log(`[APP] Fetching user info from backend...`);
              const userResponse = await api.auth.me();
              
              if (userResponse.ok) {
                const userData = await userResponse.json();
                console.log(`[APP] User info from backend:`, userData);
                localStorage.setItem('user_info', JSON.stringify(userData));
              }
            } catch (fetchError) {
              console.warn(`[APP] Could not fetch user info from backend:`, fetchError);
            }
          }

          console.log('==============================================');
          console.log('✅ LOGGED IN SUCCESSFULLY!');
          console.log('==============================================');
          console.log(`[APP] Authentication successful!`);
          console.log(`[APP] Setting authenticated state to true`);
          setIsAuthenticated(true);
          setIsAIAssistantOpen(true); // Open AI Assistant on successful login
          
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
          
        } catch (error) {
          console.error(`[APP] Error processing token:`, error);
          alert(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
          
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        return;
      }

      // If code is provided but no token, redirect to backend
      if (code) {
        console.log(`[APP] OAuth authorization code detected in URL`);
        console.log(`[APP] Google redirected to frontend with code`);
        console.log(`[APP] Redirecting to backend to exchange code for token...`);
        
        // Redirect browser to backend - backend will redirect back with token
        // Try /auth/callback endpoint
        const backendCallbackUrl = `http://localhost:9000/api/auth/callback?code=${encodeURIComponent(code)}${state ? `&state=${encodeURIComponent(state)}` : ''}`;
        console.log(`[APP] Redirecting to: ${backendCallbackUrl}`);
        window.location.href = backendCallbackUrl;
        return;
      }
    };

    handleOAuthCallback();
  }, []);

  console.log(`[APP] Current authentication state: ${isAuthenticated}`);

  // Logout function
  const handleLogout = async () => {
    console.log('=== LOGOUT FLOW ===');
    console.log('[APP] Logging out user...');
    
    try {
      // Call backend logout endpoint
      console.log('[APP] Calling backend logout endpoint...');
      const response = await api.auth.logout();
      
      if (response.ok) {
        const data = await response.json();
        console.log('[APP] Backend logout response:', data);
        
        // Clear all items specified by backend
        if (data.data?.clearItems) {
          data.data.clearItems.forEach((item: string) => {
            localStorage.removeItem(item);
            console.log(`[APP] Cleared ${item} from localStorage`);
          });
        }
      }
    } catch (error) {
      console.error('[APP] Backend logout error:', error);
    }
    
    // Ensure all auth-related items are cleared regardless
    const authItems = ['auth_token', 'user_info', 'refresh_token', 'user_id', 'user_secret'];
    authItems.forEach(item => {
      localStorage.removeItem(item);
    });
    
    console.log('[APP] All authentication data cleared');
    console.log('[APP] Setting authenticated state to false');
    setIsAuthenticated(false);
    
    // Reset other states
    setCurrentView('dashboard');
    setIsAIAssistantOpen(false);
    
    console.log('[APP] Logout completed successfully');
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    console.log('[APP] User not authenticated, showing login screen');
    return <LoginScreen onLogin={() => {
      console.log('=== APP AUTHENTICATION FLOW ===');
      console.log('[APP] Login callback received from LoginScreen');
      console.log('[APP] This callback is used for non-OAuth logins (like magic link)');
      console.log('[APP] Setting authentication state to true');
      console.log('[APP] Opening AI Assistant on successful login');
      console.log('[APP] Authentication flow completed');
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
          onLogout={handleLogout}
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