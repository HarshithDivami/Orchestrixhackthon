import { X, Clock, User, Package, Wrench, CheckCircle, AlertCircle, Archive, UserPlus } from 'lucide-react';

interface AllocationHistory {
  date: string;
  action: string;
  employee?: string;
  notes?: string;
}

interface AssetHistoryOverlayProps {
  assetName: string;
  assetId: string;
  history: AllocationHistory[];
  isOpen: boolean;
  onClose: () => void;
}

export function AssetHistoryOverlay({ assetName, assetId, history, isOpen, onClose }: AssetHistoryOverlayProps) {
  if (!isOpen) return null;

  const getActionIcon = (action: string) => {
    if (action.toLowerCase().includes('assign')) return <UserPlus className="w-4 h-4" />;
    if (action.toLowerCase().includes('repair')) return <Wrench className="w-4 h-4" />;
    if (action.toLowerCase().includes('decommission')) return <Archive className="w-4 h-4" />;
    if (action.toLowerCase().includes('added')) return <Package className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const getActionColor = (action: string) => {
    if (action.toLowerCase().includes('assign')) return 'bg-blue-100 text-blue-600';
    if (action.toLowerCase().includes('repair')) return 'bg-orange-100 text-orange-600';
    if (action.toLowerCase().includes('decommission')) return 'bg-slate-100 text-slate-600';
    if (action.toLowerCase().includes('added')) return 'bg-green-100 text-green-600';
    return 'bg-slate-100 text-slate-600';
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Overlay Panel */}
      <div className="fixed right-0 top-0 h-full w-[520px] bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg text-slate-900">Asset History</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Asset Info */}
          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <div className="text-xs text-slate-600 mb-1">Asset</div>
            <div className="text-sm text-slate-900">{assetName}</div>
            <div className="text-xs text-slate-500 mt-1">Asset ID: {assetId}</div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {history.length > 0 ? (
              <>
                {[...history].reverse().map((item, index) => (
                  <div key={index} className="relative">
                    {/* Timeline line */}
                    {index < history.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-200" />
                    )}
                    
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getActionColor(item.action)}`}>
                        {getActionIcon(item.action)}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-sm text-slate-900 mb-1">{item.action}</div>
                        {item.employee && (
                          <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
                            <User className="w-3 h-3" />
                            {item.employee}
                          </div>
                        )}
                        {item.notes && (
                          <div className="text-xs text-slate-500 mb-2">{item.notes}</div>
                        )}
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          {item.date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <div className="text-sm text-slate-600 mb-1">No history available</div>
                <div className="text-xs text-slate-500">Activity history will appear here</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
