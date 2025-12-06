import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

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

interface EditAssetOverlayProps {
  asset: HardwareAsset | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (assetId: string, updatedData: Partial<HardwareAsset>) => void;
}

export function EditAssetOverlay({ asset, isOpen, onClose, onSave }: EditAssetOverlayProps) {
  const [formData, setFormData] = useState<Partial<HardwareAsset>>({});

  const hardwareTypes = ['Laptop', 'Desktop', 'Monitor', 'Mobile', 'Tablet', 'Printer', 'Server', 'Storage', 'Networking', 'Accessories'];
  const categories = ['Computing', 'Display', 'Mobile Device', 'Peripherals', 'Infrastructure', 'Accessories'];

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name,
        type: asset.type,
        category: asset.category,
        brand: asset.brand,
        model: asset.model,
        vendor: asset.vendor,
        purchaseDate: asset.purchaseDate,
        cost: asset.cost,
        warrantyExpiry: asset.warrantyExpiry,
        amcDetails: asset.amcDetails,
        serialNumber: asset.serialNumber,
      });
    }
  }, [asset]);

  const handleChange = (field: keyof HardwareAsset, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (asset) {
      onSave(asset.id, formData);
      onClose();
    }
  };

  if (!isOpen || !asset) return null;

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
          <h2 className="text-lg text-slate-900">Edit Asset</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-sm text-slate-900 mb-3">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-700 mb-1.5">Hardware Name</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Type</label>
                    <select
                      value={formData.type || ''}
                      onChange={(e) => handleChange('type', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      {hardwareTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Category</label>
                    <select
                      value={formData.category || ''}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Brand</label>
                    <input
                      type="text"
                      value={formData.brand || ''}
                      onChange={(e) => handleChange('brand', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Model</label>
                    <input
                      type="text"
                      value={formData.model || ''}
                      onChange={(e) => handleChange('model', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Details */}
            <div>
              <h3 className="text-sm text-slate-900 mb-3">Purchase Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-700 mb-1.5">Vendor</label>
                  <input
                    type="text"
                    value={formData.vendor || ''}
                    onChange={(e) => handleChange('vendor', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Purchase Date</label>
                    <input
                      type="date"
                      value={formData.purchaseDate || ''}
                      onChange={(e) => handleChange('purchaseDate', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Cost</label>
                    <input
                      type="text"
                      value={formData.cost || ''}
                      onChange={(e) => handleChange('cost', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Warranty Expiry</label>
                    <input
                      type="date"
                      value={formData.warrantyExpiry || ''}
                      onChange={(e) => handleChange('warrantyExpiry', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">AMC Details</label>
                    <input
                      type="text"
                      value={formData.amcDetails || ''}
                      onChange={(e) => handleChange('amcDetails', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Identifiers */}
            <div>
              <h3 className="text-sm text-slate-900 mb-3">Identifiers</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-700 mb-1.5">Serial Number</label>
                  <input
                    type="text"
                    value={formData.serialNumber || ''}
                    onChange={(e) => handleChange('serialNumber', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-xs text-slate-600 mb-1">Asset ID</div>
                  <div className="text-sm text-slate-900">{asset.assetId}</div>
                  <div className="text-xs text-slate-500 mt-1">Asset ID cannot be changed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
