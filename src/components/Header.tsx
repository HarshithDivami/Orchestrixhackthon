import { Search, Bell, Menu, Bot } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenAIAssistant: () => void;
}

export function Header({ onToggleSidebar, onOpenAIAssistant }: HeaderProps) {
  return (
    <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects, tasks, team members..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* AI Assistant Button */}
        <button 
          onClick={onOpenAIAssistant}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg"
        >
          <Bot className="w-5 h-5" />
          <span className="hidden sm:inline">AI Assistant</span>
        </button>

        <button className="relative p-2 hover:bg-slate-50 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></span>
        </button>
      </div>
    </header>
  );
}