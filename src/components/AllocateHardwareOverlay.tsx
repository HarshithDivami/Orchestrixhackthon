import { X, QrCode, Search, ArrowLeft, User, Package, Laptop, Monitor, Smartphone, Printer, Server, HardDrive, CheckCircle, Calendar, DollarSign, Hash, FileText, MapPin, Mail } from 'lucide-react';
import { useState } from 'react';

type AllocationView = 'choice' | 'qr-scan' | 'scanning' | 'allocation';

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
  status: 'Available' | 'Assigned' | 'Under Repair' | 'Damaged' | 'Decommissioned';
  assignedTo?: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  location?: string;
  status: 'Active' | 'Pending' | 'Inactive';
}

interface AllocateHardwareOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  assets: HardwareAsset[];
  employees: Employee[];
  onAllocate: (assetId: string, employeeId: string, employeeName: string) => void;
}

export function AllocateHardwareOverlay({ isOpen, onClose, assets, employees, onAllocate }: AllocateHardwareOverlayProps) {
  const [view, setView] = useState<AllocationView>('choice');
  const [selectedAsset, setSelectedAsset] = useState<HardwareAsset | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter(emp => 
    emp.status === 'Active' && (
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleQRScan = () => {
    setView('scanning');
    // Simulate QR code scanning
    setTimeout(() => {
      // Find an available asset to simulate scanning
      const availableAsset = assets.find(a => a.status === 'Available');
      if (availableAsset) {
        setSelectedAsset(availableAsset);
        setView('allocation');
      } else {
        alert('No available assets found to allocate');
        setView('choice');
      }
    }, 2000);
  };

  const handleAllocate = () => {
    if (selectedAsset && selectedEmployee) {
      const employee = employees.find(e => e.id === selectedEmployee);
      if (employee) {
        onAllocate(selectedAsset.assetId, selectedEmployee, employee.name);
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setView('choice');
    setSelectedAsset(null);
    setSelectedEmployee(null);
    setSearchQuery('');
    onClose();
  };

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/50 z-50" onClick={handleClose} />

      {/* Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
        <div 
          className={`bg-white rounded-2xl shadow-2xl pointer-events-auto overflow-hidden ${
            view === 'allocation' ? 'w-full max-w-6xl' : 'w-full max-w-xl'
          } max-h-[90vh] flex flex-col`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              {view === 'scanning' || view === 'allocation' ? (
                <button
                  onClick={() => setView('choice')}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-600" />
                </button>
              ) : null}
              <div>
                <h2 className="text-lg text-slate-900">Allocate Hardware</h2>
                <p className="text-xs text-slate-600">
                  {view === 'choice' && 'Choose how to select hardware'}
                  {view === 'qr-scan' && 'Scan hardware QR code'}
                  {view === 'scanning' && 'Scanning...'}
                  {view === 'allocation' && 'Select employee for allocation'}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Choice Screen */}
            {view === 'choice' && (
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-base text-slate-900 mb-2">How would you like to select the hardware?</h3>
                  <p className="text-sm text-slate-600">Choose a method to identify the hardware for allocation</p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {/* QR Code Option */}
                  <button
                    onClick={handleQRScan}
                    className="group bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-slate-900 hover:bg-slate-50 transition-all text-center"
                  >
                    <div className="w-16 h-16 bg-slate-100 group-hover:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                      <QrCode className="w-8 h-8 text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="text-sm text-slate-900 mb-2">Scan QR Code</h4>
                    <p className="text-xs text-slate-600">Scan the hardware asset QR code to auto-fill details</p>
                  </button>

                  {/* Manual Selection Option */}
                  <button
                    onClick={() => {
                      // For now, simulate selecting first available asset
                      const availableAsset = assets.find(a => a.status === 'Available');
                      if (availableAsset) {
                        setSelectedAsset(availableAsset);
                        setView('allocation');
                      } else {
                        alert('No available assets found to allocate');
                      }
                    }}
                    className="group bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-slate-900 hover:bg-slate-50 transition-all text-center"
                  >
                    <div className="w-16 h-16 bg-slate-100 group-hover:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                      <Search className="w-8 h-8 text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="text-sm text-slate-900 mb-2">Manual Selection</h4>
                    <p className="text-xs text-slate-600">Browse and select from available hardware inventory</p>
                  </button>
                </div>
              </div>
            )}

            {/* QR Scanning Animation */}
            {view === 'scanning' && (
              <div className="p-12">
                <div className="max-w-md mx-auto text-center">
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
                  <h3 className="text-base text-slate-900 mb-2">Scanning QR Code...</h3>
                  <p className="text-sm text-slate-600">Please hold the QR code steady within the frame</p>
                </div>
              </div>
            )}

            {/* Allocation Screen */}
            {view === 'allocation' && selectedAsset && (
              <div className="grid grid-cols-2 divide-x divide-slate-200">
                {/* Left: Hardware Details */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      {getTypeIcon(selectedAsset.type)}
                    </div>
                    <div>
                      <h3 className="text-base text-slate-900">Hardware Information</h3>
                      <p className="text-xs text-slate-600">Details from inventory</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Asset ID & QR */}
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <QrCode className="w-4 h-4 text-slate-600" />
                        <span className="text-xs text-slate-600">Asset Identifiers</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Asset ID</div>
                          <div className="text-sm text-slate-900 font-mono">{selectedAsset.assetId}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Serial Number</div>
                          <div className="text-sm text-slate-900 font-mono">{selectedAsset.serialNumber}</div>
                        </div>
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Hardware Name</div>
                        <div className="text-sm text-slate-900">{selectedAsset.name}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Type</div>
                          <div className="text-sm text-slate-900">{selectedAsset.type}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Category</div>
                          <div className="text-sm text-slate-900">{selectedAsset.category}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Brand</div>
                          <div className="text-sm text-slate-900">{selectedAsset.brand}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Model</div>
                          <div className="text-sm text-slate-900">{selectedAsset.model}</div>
                        </div>
                      </div>
                    </div>

                    {/* Purchase Details */}
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="w-4 h-4 text-slate-600" />
                        <span className="text-xs text-slate-600">Purchase Information</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-500">Vendor</span>
                          <span className="text-sm text-slate-900">{selectedAsset.vendor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-500">Purchase Date</span>
                          <span className="text-sm text-slate-900">{selectedAsset.purchaseDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-500">Cost</span>
                          <span className="text-sm text-slate-900">{selectedAsset.cost}</span>
                        </div>
                      </div>
                    </div>

                    {/* Warranty */}
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-slate-600" />
                        <span className="text-xs text-slate-600">Warranty & Support</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-500">Warranty Expiry</span>
                          <span className="text-sm text-slate-900">{selectedAsset.warrantyExpiry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-500">AMC Details</span>
                          <span className="text-sm text-slate-900">{selectedAsset.amcDetails || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <div className="text-xs text-slate-500 mb-2">Current Status</div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm">
                        <CheckCircle className="w-4 h-4" />
                        {selectedAsset.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Employee Selection */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-base text-slate-900 mb-1">Select Employee</h3>
                    <p className="text-xs text-slate-600 mb-4">Choose who will receive this hardware</p>
                    
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search employees..."
                        className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Employee List */}
                  <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                    {filteredEmployees.map((employee) => (
                      <button
                        key={employee.id}
                        onClick={() => setSelectedEmployee(employee.id)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selectedEmployee === employee.id
                            ? 'border-slate-900 bg-slate-50'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                            selectedEmployee === employee.id
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="text-sm text-slate-900">{employee.name}</div>
                              {selectedEmployee === employee.id && (
                                <CheckCircle className="w-4 h-4 text-slate-900 flex-shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
                              <Mail className="w-3 h-3" />
                              {employee.email}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <span>{employee.role}</span>
                              <span>•</span>
                              <span>{employee.department}</span>
                            </div>
                            {employee.location && (
                              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                <MapPin className="w-3 h-3" />
                                {employee.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}

                    {filteredEmployees.length === 0 && (
                      <div className="text-center py-8">
                        <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <div className="text-sm text-slate-900 mb-1">No employees found</div>
                        <div className="text-xs text-slate-500">Try adjusting your search</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer - Only show for allocation view */}
          {view === 'allocation' && (
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="text-sm text-slate-600">
                {selectedEmployee ? (
                  <>
                    <span className="text-slate-900">Ready to allocate</span> {selectedAsset?.name} to{' '}
                    {employees.find(e => e.id === selectedEmployee)?.name}
                  </>
                ) : (
                  'Select an employee to continue'
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAllocate}
                  disabled={!selectedEmployee}
                  className="px-4 py-2 text-sm text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Allocate Hardware
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}