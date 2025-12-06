import { useState } from 'react';
import { Send, Bot, X, Sparkles, Server, Key, CreditCard, RefreshCw, UserPlus, UserMinus } from 'lucide-react';

interface AIAssistantOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

export function AIAssistantOverlay({ isOpen, onClose, onNavigate }: AIAssistantOverlayProps) {
  const [input, setInput] = useState('');

  const stats = [
    { label: 'Hardware', count: 42 },
    { label: 'Licenses', count: 28 },
    { label: 'Subscriptions', count: 15 },
    { label: 'Team', count: 156 },
  ];

  const actions = [
    {
      id: '1',
      title: 'Hardware Manager',
      description: 'Allocate and track hardware assets across your organization',
      icon: Server,
      onClick: () => console.log('Hardware Manager clicked'),
    },
    {
      id: '2',
      title: 'License Manager',
      description: 'Provision and manage software licenses efficiently',
      icon: Key,
      onClick: () => console.log('License Manager clicked'),
    },
    {
      id: '3',
      title: 'Subscription Manager',
      description: 'Create and track SaaS subscriptions',
      icon: CreditCard,
      onClick: () => console.log('Subscription Manager clicked'),
    },
    {
      id: '4',
      title: 'Renewal Manager',
      description: 'Monitor and manage upcoming renewals',
      icon: RefreshCw,
      onClick: () => console.log('Renewal Manager clicked'),
    },
    {
      id: '5',
      title: 'Onboard Employees',
      description: 'Streamline employee onboarding workflows',
      icon: UserPlus,
      onClick: () => {
        onNavigate('user-management');
        onClose();
      },
    },
    {
      id: '6',
      title: 'Offboard Employees',
      description: 'Manage offboarding and asset recovery',
      icon: UserMinus,
      onClick: () => console.log('Offboard Employees clicked'),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Handle submission
    console.log('Submitted:', input);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* AI Assistant Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center pt-12 pb-6 px-8">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl text-slate-900 mb-2">Hey, I'm AI Operations Assistant</h2>
            <p className="text-slate-600">How can I help you today?</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 px-8 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-slate-50 rounded-xl p-4 text-center">
                <div className="text-2xl text-slate-900 mb-1">{stat.count}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-8 pb-6">
            <h3 className="text-slate-900 mb-4">Your AI Actions</h3>
            
            <div className="grid grid-cols-3 gap-4">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={action.onClick}
                    className="bg-white border border-slate-200 rounded-xl p-5 hover:bg-slate-50 transition-all text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-slate-100 transition-colors">
                        <Icon className="w-5 h-5 text-slate-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-slate-900 mb-1 text-sm">{action.title}</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">{action.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-6">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1 relative">
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="How can I help you today"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}