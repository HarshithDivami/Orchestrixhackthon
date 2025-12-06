import { useState } from 'react';
import { Send, Bot, X, Sparkles, Server, Key, CreditCard, RefreshCw, UserPlus, UserMinus, QrCode, ArrowLeft, Package, Laptop, Monitor, Smartphone, Globe } from 'lucide-react';

interface AIAssistantOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
  isFirstLogin?: boolean;
}

export function AIAssistantOverlay({ isOpen, onClose, onNavigate, isFirstLogin = false }: AIAssistantOverlayProps) {
  const [input, setInput] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);

  const stats = [
    { label: 'Hardware', count: 42 },
    { label: 'Licenses', count: 28 },
    { label: 'Subscriptions', count: 15 },
    { label: 'Employees', count: 156 },
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
      onClick: () => {
        onNavigate('subscription-management');
        onClose();
      },
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
    {
      id: '7',
      title: 'Scan QR Code',
      description: 'Scan a QR code to quickly access information',
      icon: QrCode,
      onClick: () => setShowQRScanner(true),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Handle submission
    console.log('Submitted:', input);
    setInput('');
  };

  const handleQRScan = () => {
    // Simulate QR code scanning - in real implementation, this would use camera
    setTimeout(() => {
      // Mock scanned hardware data
      setScannedData({
        assetId: 'DVM-0893',
        name: 'MacBook Pro 16"',
        type: 'Laptop',
        brand: 'Apple',
        model: 'M3 Pro 2024',
        serialNumber: 'C02XK0YJLVCF',
        status: 'Available',
        purchaseDate: '2024-01-15',
        cost: '$2,499',
        warrantyExpiry: '2025-01-15',
      });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-40 transition-opacity ${
          isFirstLogin 
            ? 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30' 
            : 'bg-slate-900/20 backdrop-blur-sm'
        }`}
        onClick={isFirstLogin ? undefined : onClose}
      />

      {/* AI Assistant Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center ${isFirstLogin ? 'p-0' : 'p-4'}`}>
        <div className={`bg-white shadow-2xl overflow-hidden flex flex-col relative ${
          isFirstLogin 
            ? 'w-full h-full' 
            : 'rounded-3xl w-full max-w-7xl max-h-[90vh]'
        }`}>
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
            <h3 className="text-slate-900 mb-4">Quick Actions</h3>
            
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

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/50" 
            onClick={() => {
              setShowQRScanner(false);
              setScannedData(null);
            }}
          />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                {scannedData && (
                  <button
                    onClick={() => setScannedData(null)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 text-slate-600" />
                  </button>
                )}
                <div>
                  <h3 className="text-base text-slate-900">
                    {scannedData ? 'Hardware Details' : 'Scan QR Code'}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {scannedData ? 'Information retrieved from QR code' : 'Point camera at hardware QR code'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowQRScanner(false);
                  setScannedData(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {!scannedData ? (
                <div className="text-center">
                  <div className="relative w-64 h-64 mx-auto mb-6">
                    {/* Scanner Frame */}
                    <div className="absolute inset-0 border-4 border-slate-900 rounded-2xl"></div>
                    {/* Corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-2xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-2xl"></div>
                    {/* Scanning Line */}
                    <div className="absolute left-0 right-0 h-1 bg-blue-500 animate-pulse" style={{ top: '50%', transform: 'translateY(-50%)' }}></div>
                    {/* QR Code Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <QrCode className="w-24 h-24 text-slate-300" />
                    </div>
                  </div>
                  <button
                    onClick={handleQRScan}
                    className="px-6 py-3 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Simulate QR Scan
                  </button>
                  <p className="text-xs text-slate-500 mt-3">Position the QR code within the frame to scan</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Hardware Icon & Title */}
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      {scannedData.type === 'Laptop' && <Laptop className="w-6 h-6 text-slate-700" />}
                      {scannedData.type === 'Monitor' && <Monitor className="w-6 h-6 text-slate-700" />}
                      {scannedData.type === 'Mobile' && <Smartphone className="w-6 h-6 text-slate-700" />}
                      {!['Laptop', 'Monitor', 'Mobile'].includes(scannedData.type) && <Package className="w-6 h-6 text-slate-700" />}
                    </div>
                    <div>
                      <h4 className="text-base text-slate-900">{scannedData.name}</h4>
                      <p className="text-sm text-slate-600">{scannedData.brand} {scannedData.model}</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Asset ID</div>
                      <div className="text-sm text-slate-900 font-mono">{scannedData.assetId}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Serial Number</div>
                      <div className="text-sm text-slate-900 font-mono">{scannedData.serialNumber}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Type</div>
                      <div className="text-sm text-slate-900">{scannedData.type}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Status</div>
                      <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        {scannedData.status}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Purchase Date</div>
                      <div className="text-sm text-slate-900">{scannedData.purchaseDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Cost</div>
                      <div className="text-sm text-slate-900">{scannedData.cost}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-slate-500 mb-1">Warranty Expiry</div>
                      <div className="text-sm text-slate-900">{scannedData.warrantyExpiry}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-slate-200">
                    <button
                      onClick={() => {
                        setShowQRScanner(false);
                        setScannedData(null);
                      }}
                      className="flex-1 px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}