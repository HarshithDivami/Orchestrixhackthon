import { X, Package, Laptop, Monitor, Smartphone, Printer, Server, HardDrive, Calendar, DollarSign, Hash, FileText, MapPin, User, Clock, CheckCircle } from 'lucide-react';

interface HardwareAsset {
  id: string;
  name: string;
  type: string;
  category: string;
  brand: string;
  model: string;
  vendor: string;
  purchaseDate: string;
  cost: string;
  warrantyExpiry: string;
  amcDetails: string;
  serialNumber: string;
  assetId: string;
  qrCode: string;
  status: string;
  assignedTo?: string;
  assignedDate?: string;
  lastUpdated: string;
  allocationHistory: Array<{
    date: string;
    action: string;
    employee?: string;
    notes?: string;
  }>;
}

interface AssetDetailsOverlayProps {
  asset: HardwareAsset | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AssetDetailsOverlay({ asset, isOpen, onClose }: AssetDetailsOverlayProps) {
  if (!isOpen || !asset) return null;

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'laptop': return <Laptop className="w-5 h-5" />;
      case 'monitor': return <Monitor className="w-5 h-5" />;
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'printer': return <Printer className="w-5 h-5" />;
      case 'server': return <Server className="w-5 h-5" />;
      case 'storage': return <HardDrive className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700';
      case 'Assigned': return 'bg-blue-100 text-blue-700';
      case 'Under Repair': return 'bg-orange-100 text-orange-700';
      case 'Damaged': return 'bg-red-100 text-red-700';
      case 'Decommissioned': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
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
          <h2 className="text-lg text-slate-900">Asset Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Asset Header */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 text-slate-600">
                {getTypeIcon(asset.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl text-slate-900 mb-1">{asset.name}</h3>
                <p className="text-sm text-slate-600">{asset.brand} • {asset.model}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs flex-shrink-0 ${getStatusColor(asset.status)}`}>
                {asset.status}
              </span>
            </div>
          </div>

          {/* Basic Information */}
          <div className="mb-6">
            <h4 className="text-sm text-slate-900 mb-3">Basic Information</h4>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Hash className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500">Asset ID</div>
                  <div className="text-sm text-slate-900">{asset.assetId}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500">Serial Number</div>
                  <div className="text-sm text-slate-900">{asset.serialNumber}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500">Type & Category</div>
                  <div className="text-sm text-slate-900">{asset.type} • {asset.category}</div>
                </div>
              </div>

              {asset.assignedTo && (
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-500">Assigned To</div>
                    <div className="text-sm text-slate-900">{asset.assignedTo}</div>
                  </div>
                </div>
              )}

              {asset.assignedDate && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-500">Assigned Date</div>
                    <div className="text-sm text-slate-900">{asset.assignedDate}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Purchase Information */}
          <div className="mb-6">
            <h4 className="text-sm text-slate-900 mb-3">Purchase Information</h4>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500">Vendor</div>
                  <div className="text-sm text-slate-900">{asset.vendor}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500">Purchase Date</div>
                  <div className="text-sm text-slate-900">{asset.purchaseDate}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500">Cost</div>
                  <div className="text-sm text-slate-900">{asset.cost}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Information */}
          <div className="mb-6">
            <h4 className="text-sm text-slate-900 mb-3">Warranty & Support</h4>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500">Warranty Expiry</div>
                  <div className="text-sm text-slate-900">{asset.warrantyExpiry}</div>
                </div>
              </div>

              {asset.amcDetails && (
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-500">AMC Details</div>
                    <div className="text-sm text-slate-900">{asset.amcDetails}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500">Last Updated</div>
                  <div className="text-sm text-slate-900">{asset.lastUpdated}</div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="mb-6">
            <h4 className="text-sm text-slate-900 mb-3">QR Code</h4>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <div className="w-32 h-32 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <div className="text-xs text-slate-500">{asset.qrCode}</div>
              </div>
              <p className="text-xs text-slate-500">Scan to access asset details</p>
            </div>
          </div>

          {/* Allocation History */}
          {asset.allocationHistory.length > 0 && (
            <div>
              <h4 className="text-sm text-slate-900 mb-3">Recent Activity</h4>
              <div className="space-y-3">
                {asset.allocationHistory.slice(-3).reverse().map((history, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900">{history.action}</div>
                      {history.employee && (
                        <div className="text-xs text-slate-600">{history.employee}</div>
                      )}
                      {history.notes && (
                        <div className="text-xs text-slate-500">{history.notes}</div>
                      )}
                      <div className="text-xs text-slate-400 mt-1">{history.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
