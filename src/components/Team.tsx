import { Search, Filter, Plus, Mail, Phone, MoreVertical } from 'lucide-react';

export function Team() {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Anderson',
      role: 'Project Manager',
      department: 'Management',
      email: 'sarah.a@orchestrix.com',
      phone: '+1 (555) 123-4567',
      avatar: 'SA',
      status: 'online',
      projects: 8,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Senior Developer',
      department: 'Engineering',
      email: 'michael.c@orchestrix.com',
      phone: '+1 (555) 234-5678',
      avatar: 'MC',
      status: 'online',
      projects: 5,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      department: 'Design',
      email: 'emily.r@orchestrix.com',
      phone: '+1 (555) 345-6789',
      avatar: 'ER',
      status: 'away',
      projects: 6,
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'DevOps Engineer',
      department: 'Engineering',
      email: 'david.k@orchestrix.com',
      phone: '+1 (555) 456-7890',
      avatar: 'DK',
      status: 'online',
      projects: 4,
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Marketing Lead',
      department: 'Marketing',
      email: 'lisa.t@orchestrix.com',
      phone: '+1 (555) 567-8901',
      avatar: 'LT',
      status: 'offline',
      projects: 7,
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Full Stack Developer',
      department: 'Engineering',
      email: 'james.w@orchestrix.com',
      phone: '+1 (555) 678-9012',
      avatar: 'JW',
      status: 'online',
      projects: 6,
    },
    {
      id: 7,
      name: 'Anna Martinez',
      role: 'Product Designer',
      department: 'Design',
      email: 'anna.m@orchestrix.com',
      phone: '+1 (555) 789-0123',
      avatar: 'AM',
      status: 'away',
      projects: 5,
    },
    {
      id: 8,
      name: 'Robert Taylor',
      role: 'Data Analyst',
      department: 'Analytics',
      email: 'robert.t@orchestrix.com',
      phone: '+1 (555) 890-1234',
      avatar: 'RT',
      status: 'online',
      projects: 3,
    },
  ];

  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    offline: 'bg-slate-400',
  };

  const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Management', 'Analytics'];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 mb-1">Team Members</h1>
          <p className="text-slate-600">Manage your team and collaborate effectively</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg">
          <Plus className="w-5 h-5" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur-xl p-4 rounded-2xl border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-50 transition-all"
              >
                {dept}
              </button>
            ))}
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search team members..."
                className="w-full lg:w-64 pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Filter className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/20">
                  {member.avatar}
                </div>
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${statusColors[member.status as keyof typeof statusColors]}`}></div>
              </div>
              <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                <MoreVertical className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-slate-800 mb-1">{member.name}</h3>
              <p className="text-slate-600 text-sm">{member.role}</p>
              <span className="inline-block mt-2 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-xs border border-slate-200">
                {member.department}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Mail className="w-4 h-4" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Phone className="w-4 h-4" />
                <span>{member.phone}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Active Projects</span>
                <span className="text-slate-800">{member.projects}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}