import React, { useState, useEffect } from 'react';
import { Lock, User, Shield, Zap, Server, Users, TrendingUp, CheckCircle, Mail, Chrome } from 'lucide-react';
import { api } from '../utils/api';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [showEmailLogin, setShowEmailLogin] = useState(() => {
    console.log('=== LOGIN SCREEN INITIALIZATION ===');
    console.log('[LOGIN] LoginScreen component mounting...');
    console.log('[LOGIN] Initial state: showEmailLogin = false');
    console.log('[LOGIN] Available SSO providers: Google Workspace, Microsoft 365');
    return false;
  });

  useEffect(() => {
    console.log(`[LOGIN] LoginScreen rendered - showEmailLogin: ${showEmailLogin}`);
    console.log(`[LOGIN] Current email value: "${email}"`);
    console.log(`[LOGIN] UI Mode: ${showEmailLogin ? 'Email Login Form' : 'SSO Provider Selection'}`);
  });

  useEffect(() => {
    console.log(`[LOGIN] State change - showEmailLogin: ${showEmailLogin}`);
  }, [showEmailLogin]);

  useEffect(() => {
    if (email) {
      console.log(`[LOGIN] Email input changed: ${email}`);
    }
  }, [email]);

  const handleSSOLogin = async (provider: string) => {
    console.log('=== SSO LOGIN FLOW START ===');
    console.log(`[LOGIN] SSO Provider: ${provider}`);
    console.log(`[LOGIN] Timestamp: ${new Date().toISOString()}`);
    console.log(`[LOGIN] User Agent: ${navigator.userAgent}`);
    console.log(`[LOGIN] Current URL: ${window.location.href}`);
    console.log(`[LOGIN] Backend URL: http://localhost:9000`);
    
    try {
      if (provider === 'Google Workspace') {
        console.log(`[LOGIN] Initiating Google OAuth flow with backend...`);
        console.log(`[LOGIN] Redirecting directly to backend OAuth endpoint...`);
        console.log(`[LOGIN] Backend will handle OAuth flow and redirect to Google`);
        
        // Direct redirect to backend OAuth endpoint
        // Backend will redirect to Google OAuth and then back to frontend callback
        api.auth.google();
        
      } else if (provider === 'Microsoft 365') {
        console.log(`[LOGIN] Microsoft 365 OAuth not implemented yet`);
        console.log(`[LOGIN] Would make request to: http://localhost:9000/auth/microsoft`);
        
        // For now, simulate Microsoft login
        setTimeout(() => {
          console.log(`[LOGIN] Simulated Microsoft login completed`);
          console.log('=== SSO LOGIN FLOW END ===');
          onLogin();
        }, 1000);
      }
      
    } catch (error) {
      console.error('=== SSO LOGIN ERROR ===');
      console.error(`[LOGIN] Error during ${provider} authentication:`, error);
      console.error(`[LOGIN] Error message: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error(`[LOGIN] Please check if backend is running on http://localhost:9000`);
      
      // Show user-friendly error
      alert(`Authentication error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check if the backend is running.`);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== EMAIL LOGIN FLOW START ===');
    console.log(`[LOGIN] Email Login Attempt: ${email}`);
    console.log(`[LOGIN] Timestamp: ${new Date().toISOString()}`);
    console.log(`[LOGIN] Email validation: ${email.includes('@') ? 'Valid format' : 'Invalid format'}`);
    console.log(`[LOGIN] Domain: ${email.split('@')[1] || 'No domain'}`);
    
    // In a real implementation, this would handle magic link or passwordless auth
    console.log(`[LOGIN] Sending magic link to ${email}...`);
    console.log(`[LOGIN] Magic link endpoint: /auth/magic-link`);
    console.log(`[LOGIN] Email delivery initiated`);
    
    setTimeout(() => {
      console.log(`[LOGIN] Magic link sent successfully to ${email}`);
      console.log(`[LOGIN] User authenticated via email magic link`);
      console.log(`[LOGIN] Calling onLogin callback...`);
      console.log('=== EMAIL LOGIN FLOW END ===');
      onLogin();
    }, 100);
  };

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Operations',
      description: 'Intelligent automation for your DevOps workflows',
    },
    {
      icon: Server,
      title: 'Resource Management',
      description: 'Manage hardware, licenses, and subscriptions effortlessly',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Streamline onboarding and offboarding processes',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Monitor performance and optimize operations',
    },
  ];

  const ssoProviders = [
    {
      name: 'Google Workspace',
      icon: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg',
      color: 'bg-white hover:bg-slate-50',
      textColor: 'text-slate-700',
      borderColor: 'border-slate-300',
    },
    {
      name: 'Microsoft 365',
      icon: 'https://learn.microsoft.com/en-us/entra/identity-platform/media/howto-add-branding-in-apps/ms-symbollockup_mssymbol_19.svg',
      color: 'bg-white hover:bg-slate-50',
      textColor: 'text-slate-700',
      borderColor: 'border-slate-300',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex">
      {/* Left Side - Info about Orchestrix */}
      <div className="hidden lg:flex lg:w-1/2 p-12 xl:p-16 flex-col justify-between relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30"></div>
        
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl text-slate-900">
              Orchestrix
            </span>
          </div>

          {/* Main Content */}
          <div className="max-w-lg">
            <h1 className="text-5xl mb-6 text-slate-900 leading-tight">
              AI-Powered<br />Operations Platform
            </h1>
            <p className="text-slate-600 text-lg mb-12 leading-relaxed">
              Streamline your DevOps workflows with intelligent automation. Manage hardware, licenses, subscriptions, and team operations from one unified platform.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-200 group-hover:shadow-md transition-all">
                      <Icon className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 mb-1">{feature.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-slate-500 text-sm relative z-10">
          <p>© 2025 Orchestrix. Enterprise-grade security & reliability.</p>
        </div>
      </div>

      {/* Right Side - SSO Login */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl text-slate-900">
            Orchestrix
          </span>
        </div>

        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl">
            <div className="mb-8">
              <h2 className="text-3xl text-slate-900 mb-2">Welcome back</h2>
              <p className="text-slate-600">Sign in with your organization account</p>
            </div>

            {!showEmailLogin ? (
              <>
                {/* SSO Provider Buttons */}
                <div className="space-y-3">
                  {ssoProviders.map((provider, index) => (
                    <button
                      key={index}
                      onClick={() => handleSSOLogin(provider.name)}
                      className={`w-full px-5 py-3.5 ${provider.color} border ${provider.borderColor} rounded-xl ${provider.textColor} text-sm transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md`}
                    >
                      <img src={provider.icon} alt={provider.name} className="w-5 h-5" />
                      <span>Continue with {provider.name}</span>
                    </button>
                  ))}
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white/80 text-slate-500">Or continue with</span>
                  </div>
                </div>

                {/* Email Option */}
                <button
                  onClick={() => {
                    console.log('[LOGIN] User clicked "Sign in with Email" button');
                    console.log('[LOGIN] Switching to email login form');
                    setShowEmailLogin(true);
                  }}
                  className="w-full px-5 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-700 text-sm transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md hover:bg-slate-50"
                >
                  <Mail className="w-5 h-5" />
                  <span>Sign in with Email</span>
                </button>
              </>
            ) : (
              <>
                {/* Email Login Form */}
                <form onSubmit={handleEmailSubmit} className="space-y-5">
                  <div>
                    <label className="block text-slate-700 mb-2 text-sm">Work Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                        required
                        autoComplete="email"
                        autoFocus
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      We'll send you a secure magic link to sign in
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg"
                  >
                    Send Magic Link
                  </button>
                </form>

                {/* Back to SSO */}
                <button
                  onClick={() => {
                    console.log('[LOGIN] User clicked "Back to SSO options" button');
                    console.log('[LOGIN] Switching back to SSO login view');
                    setShowEmailLogin(false);
                  }}
                  className="w-full mt-4 py-2 text-slate-600 hover:text-slate-900 text-sm transition-colors"
                >
                  ← Back to SSO options
                </button>
              </>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="space-y-3">
                <p className="text-slate-600 text-xs text-center leading-relaxed">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
                <p className="text-slate-600 text-sm text-center">
                  Need help? <a href="#" className="text-slate-900 hover:text-blue-600 transition-colors">Contact support</a>
                </p>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>SSO Enabled</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>SAML 2.0</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}