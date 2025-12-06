import { useState } from 'react';
import { Lock, User, Shield, Zap, Server, Users, TrendingUp, CheckCircle } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
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

      {/* Right Side - Login Form */}
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
              <p className="text-slate-600">Sign in to access your workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-slate-700 mb-2 text-sm">Email</label>
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
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-slate-700 text-sm">Password</label>
                  <a href="#" className="text-slate-600 hover:text-slate-900 text-sm transition-colors">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-offset-0"
                  />
                  <span className="ml-2 text-sm">Keep me signed in</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-slate-600 text-sm text-center">
                Need help? <a href="#" className="text-slate-900 hover:text-blue-600 transition-colors">Contact support</a>
              </p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>Secure Login</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>256-bit Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}