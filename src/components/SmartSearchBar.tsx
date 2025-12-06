import { Search, Sparkles, X } from 'lucide-react';

export interface QuickFilter {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface SmartSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  quickFilters: QuickFilter[];
  activeFilters: string[];
  onFilterToggle: (filterId: string) => void;
  placeholder?: string;
}

export function SmartSearchBar({
  searchQuery,
  onSearchChange,
  quickFilters,
  activeFilters,
  onFilterToggle,
  placeholder = 'Search...',
}: SmartSearchBarProps) {
  return (
    <div className="space-y-4">
      {/* Search Input with AI indicator */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        )}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-slate-500">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span className="hidden sm:inline">AI</span>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-slate-600">Quick filters:</span>
        {quickFilters.map((filter) => {
          const isActive = activeFilters.includes(filter.id);
          return (
            <button
              key={filter.id}
              onClick={() => onFilterToggle(filter.id)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {filter.icon}
              <span>{filter.label}</span>
              {filter.count !== undefined && (
                <span className={`text-xs ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                  ({filter.count})
                </span>
              )}
            </button>
          );
        })}
        {activeFilters.length > 0 && (
          <button
            onClick={() => activeFilters.forEach((id) => onFilterToggle(id))}
            className="px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span>
            Showing results filtered by:{' '}
            {activeFilters
              .map((id) => quickFilters.find((f) => f.id === id)?.label)
              .filter(Boolean)
              .join(', ')}
          </span>
        </div>
      )}
    </div>
  );
}
