import { Search, Filter, Plus, MoreVertical, Clock, CheckCircle2, AlertCircle, Pause } from 'lucide-react';
import { useState } from 'react';

export function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      client: 'Acme Corp',
      status: 'in-progress',
      progress: 65,
      dueDate: '2025-12-20',
      team: 5,
      priority: 'high',
    },
    {
      id: 2,
      name: 'Mobile App Development',
      client: 'TechStart Inc',
      status: 'in-progress',
      progress: 42,
      dueDate: '2025-12-28',
      team: 8,
      priority: 'high',
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      client: 'Global Brands',
      status: 'completed',
      progress: 100,
      dueDate: '2025-12-01',
      team: 4,
      priority: 'medium',
    },
    {
      id: 4,
      name: 'Data Migration',
      client: 'Enterprise Solutions',
      status: 'planning',
      progress: 15,
      dueDate: '2026-01-15',
      team: 6,
      priority: 'medium',
    },
    {
      id: 5,
      name: 'Security Audit',
      client: 'FinanceHub',
      status: 'on-hold',
      progress: 28,
      dueDate: '2025-12-31',
      team: 3,
      priority: 'low',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'completed', label: 'Completed' },
    { id: 'planning', label: 'Planning' },
    { id: 'on-hold', label: 'On Hold' },
  ];

  const statusConfig = {
    'in-progress': { label: 'In Progress', icon: Clock, color: 'bg-blue-100 text-blue-700' },
    'completed': { label: 'Completed', icon: CheckCircle2, color: 'bg-green-100 text-green-700' },
    'planning': { label: 'Planning', icon: AlertCircle, color: 'bg-purple-100 text-purple-700' },
    'on-hold': { label: 'On Hold', icon: Pause, color: 'bg-orange-100 text-orange-700' },
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-slate-100 text-slate-700',
  };

  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter(p => p.status === selectedFilter);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 mb-1">Projects</h1>
          <p className="text-slate-600">Manage and track all your projects</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg">
          <Plus className="w-5 h-5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/70 backdrop-blur-xl p-4 rounded-2xl border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full lg:w-64 pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Filter className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const StatusIcon = statusConfig[project.status as keyof typeof statusConfig].icon;
          return (
            <div key={project.id} className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-slate-800 mb-1">{project.name}</h3>
                  <p className="text-slate-600 text-sm">{project.client}</p>
                </div>
                <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                  <MoreVertical className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${statusConfig[project.status as keyof typeof statusConfig].color}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {statusConfig[project.status as keyof typeof statusConfig].label}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs ${priorityColors[project.priority as keyof typeof priorityColors]}`}>
                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Progress</span>
                    <span className="text-slate-800">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {Array.from({ length: Math.min(project.team, 3) }).map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white flex items-center justify-center text-white text-xs shadow-lg shadow-blue-500/20"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                    {project.team > 3 && (
                      <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-slate-700 text-xs">
                        +{project.team - 3}
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-slate-500 text-sm">Due {project.dueDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}