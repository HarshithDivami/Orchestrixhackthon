import { Plus, UserPlus, FileText, Calendar } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      id: 1,
      icon: Plus,
      label: 'New Project',
      color: 'cyan',
    },
    {
      id: 2,
      icon: UserPlus,
      label: 'Add Team Member',
      color: 'purple',
    },
    {
      id: 3,
      icon: FileText,
      label: 'Create Report',
      color: 'blue',
    },
    {
      id: 4,
      icon: Calendar,
      label: 'Schedule Meeting',
      color: 'emerald',
    },
  ];

  const colorClasses = {
    cyan: 'bg-slate-900 hover:bg-slate-800 transition-all',
    purple: 'bg-slate-900 hover:bg-slate-800 transition-all',
    blue: 'bg-slate-900 hover:bg-slate-800 transition-all',
    emerald: 'bg-slate-900 hover:bg-slate-800 transition-all',
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-slate-200">
      <h3 className="text-slate-800 mb-6">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white shadow-lg ${colorClasses[action.color as keyof typeof colorClasses]}`}
            >
              <Icon className="w-5 h-5" />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}