import { CheckCircle2, AlertCircle, FileText, Users } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle2,
      title: 'Project Alpha completed',
      description: 'All tasks have been marked as complete',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'info',
      icon: FileText,
      title: 'New proposal submitted',
      description: 'Q4 Marketing Strategy proposal ready for review',
      time: '4 hours ago',
    },
    {
      id: 3,
      type: 'team',
      icon: Users,
      title: 'Team member added',
      description: 'John Miller joined the Development team',
      time: '6 hours ago',
    },
    {
      id: 4,
      type: 'warning',
      icon: AlertCircle,
      title: 'Deadline approaching',
      description: 'Project Beta is due in 2 days',
      time: '8 hours ago',
    },
    {
      id: 5,
      type: 'success',
      icon: CheckCircle2,
      title: 'Milestone achieved',
      description: 'Revenue target for Q2 reached',
      time: '1 day ago',
    },
  ];

  const iconColors = {
    success: 'bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 border-emerald-200',
    info: 'bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-600 border-cyan-200',
    team: 'bg-gradient-to-br from-purple-50 to-pink-50 text-purple-600 border-purple-200',
    warning: 'bg-gradient-to-br from-orange-50 to-amber-50 text-orange-600 border-orange-200',
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-slate-200">
      <h3 className="text-slate-800 mb-6">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex gap-4">
              <div className={`p-2 rounded-xl h-fit border ${iconColors[activity.type as keyof typeof iconColors]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-800">{activity.title}</p>
                <p className="text-slate-600 text-sm">{activity.description}</p>
                <p className="text-slate-400 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}