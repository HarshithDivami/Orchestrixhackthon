import { useState, useEffect } from 'react';
import { Plus, Package, Laptop, Monitor, Smartphone, Printer, Server, HardDrive, Upload, Search, Filter, ChevronDown, MoreVertical, Clock, AlertCircle, CheckCircle, X, ArrowLeft, Calendar, DollarSign, Hash, FileText, Eye, Edit, Trash2, UserPlus, Wrench, Archive, History, QrCode, Download, Bell, Scan, FileInput, Camera } from 'lucide-react';
import { AssetDetailsOverlay } from './AssetDetailsOverlay';
import { AssignToEmployeeOverlay } from './AssignToEmployeeOverlay';
import { AssetHistoryOverlay } from './AssetHistoryOverlay';
import { EditAssetOverlay } from './EditAssetOverlay';
import { SmartSearchBar, QuickFilter } from './SmartSearchBar';
import { QRCodeGenerator } from './QRCodeGenerator';

type InventoryView = 'list' | 'add-hardware' | 'add-choice' | 'qr-scan' | 'qr-result';
type AddHardwareStep = 0 | 1 | 2 | 3 | 4 | 5;
type AssetStatus = 'Available' | 'Assigned' | 'Under Repair' | 'Damaged' | 'Decommissioned';
type ViewMode = 'table' | 'grid';
type AddMethod = 'qr-scan' | 'manual' | null;

interface HardwareData {
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
}

interface HardwareAsset extends HardwareData {
  id: string;
  status: AssetStatus;
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

export function InventoryManagement() {
  const [inventoryView, setInventoryView] = useState<InventoryView>('list');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [addHardwareStep, setAddHardwareStep] = useState<AddHardwareStep>(1);
  const [selectedAsset, setSelectedAsset] = useState<HardwareAsset | null>(null);
  const [showAssetActions, setShowAssetActions] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);
  const [addMethod, setAddMethod] = useState<AddMethod>(null);
  const [isScanning, setIsScanning] = useState(false);
  
  // Overlay states
  const [showDetailsOverlay, setShowDetailsOverlay] = useState(false);
  const [showAssignOverlay, setShowAssignOverlay] = useState(false);
  const [showHistoryOverlay, setShowHistoryOverlay] = useState(false);
  const [showEditOverlay, setShowEditOverlay] = useState(false);
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [qrAssetData, setQRAssetData] = useState<{ assetId: string; name: string; serialNumber: string; type: string } | null>(null);
  
  const [hardwareData, setHardwareData] = useState<HardwareData>({
    name: '',
    type: '',
    category: '',
    brand: '',
    model: '',
    vendor: '',
    purchaseDate: '',
    cost: '',
    warrantyExpiry: '',
    amcDetails: '',
    serialNumber: '',
    assetId: '',
    qrCode: '',
  });

  const [filters, setFilters] = useState({
    type: '',
    category: '',
    status: '',
    department: '',
  });

  const [quickFilters, setQuickFilters] = useState<string[]>([]);

  const [hardwareInventory, setHardwareInventory] = useState<HardwareAsset[]>([
    {
      id: 'HW-001',
      name: 'MacBook Pro 16"',
      type: 'Laptop',
      category: 'Computing',
      brand: 'Apple',
      model: 'M3 Pro 2024',
      vendor: 'Apple Store',
      purchaseDate: '2024-01-15',
      cost: '$2,499',
      warrantyExpiry: '2025-01-15',
      amcDetails: 'AppleCare+ 3 years',
      serialNumber: 'C02XK0YJLVCF',
      assetId: 'DVM-0893',
      qrCode: 'QR-DVM-0893',
      status: 'Assigned',
      assignedTo: 'John Doe',
      assignedDate: '2024-01-20',
      lastUpdated: '2024-01-20',
      allocationHistory: [
        { date: '2024-01-20', action: 'Assigned', employee: 'John Doe', notes: 'Initial allocation' },
      ],
    },
    {
      id: 'HW-002',
      name: 'Dell XPS 15',
      type: 'Laptop',
      category: 'Computing',
      brand: 'Dell',
      model: 'XPS 15 9530',
      vendor: 'Dell Direct',
      purchaseDate: '2024-02-10',
      cost: '$1,899',
      warrantyExpiry: '2025-02-10',
      amcDetails: 'Dell Premium Support',
      serialNumber: 'DX15-9530-2024',
      assetId: 'DVM-0894',
      qrCode: 'QR-DVM-0894',
      status: 'Available',
      lastUpdated: '2024-02-10',
      allocationHistory: [],
    },
    {
      id: 'HW-003',
      name: 'LG UltraWide Monitor',
      type: 'Monitor',
      category: 'Display',
      brand: 'LG',
      model: '34WN80C-B',
      vendor: 'Amazon Business',
      purchaseDate: '2024-01-25',
      cost: '$599',
      warrantyExpiry: '2025-01-25',
      amcDetails: 'Standard warranty',
      serialNumber: 'LG34WN-2024-001',
      assetId: 'DVM-0895',
      qrCode: 'QR-DVM-0895',
      status: 'Assigned',
      assignedTo: 'Jane Smith',
      assignedDate: '2024-01-26',
      lastUpdated: '2024-01-26',
      allocationHistory: [
        { date: '2024-01-26', action: 'Assigned', employee: 'Jane Smith', notes: 'Workstation setup' },
      ],
    },
    {
      id: 'HW-004',
      name: 'iPhone 15 Pro',
      type: 'Mobile',
      category: 'Mobile Device',
      brand: 'Apple',
      model: 'iPhone 15 Pro 256GB',
      vendor: 'Apple Store',
      purchaseDate: '2024-03-01',
      cost: '$999',
      warrantyExpiry: '2025-03-01',
      amcDetails: 'AppleCare+',
      serialNumber: 'IP15P-256-001',
      assetId: 'DVM-0896',
      qrCode: 'QR-DVM-0896',
      status: 'Under Repair',
      assignedTo: 'Mike Johnson',
      assignedDate: '2024-03-05',
      lastUpdated: '2024-11-20',
      allocationHistory: [
        { date: '2024-03-05', action: 'Assigned', employee: 'Mike Johnson', notes: 'Company phone' },
        { date: '2024-11-20', action: 'Under Repair', notes: 'Screen replacement' },
      ],
    },
    {
      id: 'HW-005',
      name: 'HP LaserJet Printer',
      type: 'Printer',
      category: 'Peripherals',
      brand: 'HP',
      model: 'LaserJet Pro M404dn',
      vendor: 'HP Direct',
      purchaseDate: '2024-01-10',
      cost: '$299',
      warrantyExpiry: '2025-01-10',
      amcDetails: 'HP Care Pack',
      serialNumber: 'HP-M404-001',
      assetId: 'DVM-0897',
      qrCode: 'QR-DVM-0897',
      status: 'Available',
      lastUpdated: '2024-01-10',
      allocationHistory: [],
    },
  ]);

  const hardwareTypes = ['Laptop', 'Desktop', 'Monitor', 'Mobile', 'Tablet', 'Printer', 'Server', 'Storage', 'Networking', 'Accessories'];
  const categories = ['Computing', 'Display', 'Mobile Device', 'Peripherals', 'Infrastructure', 'Accessories'];
  const statuses: AssetStatus[] = ['Available', 'Assigned', 'Under Repair', 'Damaged', 'Decommissioned'];

  // Check for warranty expiry and generate alerts
  const checkWarrantyExpiry = (warrantyDate: string): number | null => {
    const today = new Date();
    const expiry = new Date(warrantyDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const updateHardwareData = (field: keyof HardwareData, value: string) => {
    setHardwareData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedDocument(file);
    }
  };

  const handleAddHardware = () => {
    const newAsset: HardwareAsset = {
      ...hardwareData,
      id: `HW-${String(hardwareInventory.length + 1).padStart(3, '0')}`,
      status: 'Available',
      lastUpdated: new Date().toISOString().split('T')[0],
      allocationHistory: [
        { date: new Date().toISOString().split('T')[0], action: 'Added to inventory', notes: 'Initial entry' },
      ],
    };
    setHardwareInventory(prev => [newAsset, ...prev]);
    
    // Show QR code generator for the newly added asset
    setQRAssetData({
      assetId: newAsset.assetId,
      name: newAsset.name,
      serialNumber: newAsset.serialNumber,
      type: newAsset.type,
    });
    setShowQRGenerator(true);
    
    setInventoryView('list');
    setAddHardwareStep(1);
    setHardwareData({
      name: '',
      type: '',
      category: '',
      brand: '',
      model: '',
      vendor: '',
      purchaseDate: '',
      cost: '',
      warrantyExpiry: '',
      amcDetails: '',
      serialNumber: '',
      assetId: '',
      qrCode: '',
    });
    setUploadedDocument(null);
  };

  // Handle asset actions from dropdown
  const handleAssetAction = (assetId: string, action: string) => {
    const asset = hardwareInventory.find(a => a.id === assetId);
    if (!asset) return;
    
    setSelectedAsset(asset);
    setShowAssetActions(null);
    
    switch (action) {
      case 'view':
        setShowDetailsOverlay(true);
        break;
      case 'assign':
        setShowAssignOverlay(true);
        break;
      case 'repair':
        if (confirm(`Mark ${asset.name} as under repair?`)) {
          setHardwareInventory(prev => prev.map(a => 
            a.id === assetId 
              ? {
                  ...a,
                  status: 'Under Repair' as AssetStatus,
                  lastUpdated: new Date().toISOString().split('T')[0],
                  allocationHistory: [
                    ...a.allocationHistory,
                    {
                      date: new Date().toISOString().split('T')[0],
                      action: 'Marked Under Repair',
                      notes: 'Asset sent for maintenance'
                    }
                  ]
                }
              : a
          ));
        }
        break;
      case 'history':
        setShowHistoryOverlay(true);
        break;
      case 'edit':
        setShowEditOverlay(true);
        break;
      case 'archive':
        if (confirm(`Decommission ${asset.name}? This will mark the asset as no longer in use.`)) {
          setHardwareInventory(prev => prev.map(a => 
            a.id === assetId 
              ? {
                  ...a,
                  status: 'Decommissioned' as AssetStatus,
                  assignedTo: undefined,
                  assignedDate: undefined,
                  lastUpdated: new Date().toISOString().split('T')[0],
                  allocationHistory: [
                    ...a.allocationHistory,
                    {
                      date: new Date().toISOString().split('T')[0],
                      action: 'Decommissioned',
                      notes: 'Asset retired from service'
                    }
                  ]
                }
              : a
          ));
        }
        break;
      case 'generate-qr':
        setQRAssetData({
          assetId: asset.assetId,
          name: asset.name,
          serialNumber: asset.serialNumber,
          type: asset.type,
        });
        setShowQRGenerator(true);
        break;
      case 'delete':
        if (confirm(`Permanently delete ${asset.name}? This action cannot be undone.`)) {
          setHardwareInventory(prev => prev.filter(a => a.id !== assetId));
        }
        break;
    }
  };

  const handleAssignAsset = (assetId: string, employeeId: string, employeeName: string) => {
    setHardwareInventory(prev => prev.map(asset => 
      asset.assetId === assetId 
        ? {
            ...asset,
            status: 'Assigned' as AssetStatus,
            assignedTo: employeeName,
            assignedDate: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0],
            allocationHistory: [
              ...asset.allocationHistory,
              {
                date: new Date().toISOString().split('T')[0],
                action: 'Assigned to employee',
                employee: employeeName,
                notes: `Asset assigned to ${employeeName}`
              }
            ]
          }
        : asset
    ));
    setShowAssignOverlay(false);
    setSelectedAsset(null);
  };

  const handleSaveAssetEdit = (assetId: string, updatedData: Partial<HardwareAsset>) => {
    setHardwareInventory(prev => prev.map(asset => 
      asset.id === assetId 
        ? {
            ...asset,
            ...updatedData,
            lastUpdated: new Date().toISOString().split('T')[0],
            allocationHistory: [
              ...asset.allocationHistory,
              {
                date: new Date().toISOString().split('T')[0],
                action: 'Asset details updated',
                notes: 'Information modified'
              }
            ]
          }
        : asset
    ));
    setShowEditOverlay(false);
    setSelectedAsset(null);
  };

  // Simulate QR scanning
  const startQRScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setInventoryView('qr-result');
      // Auto-fill data from "scanned" QR code
      setHardwareData({
        name: 'MacBook Pro 14"',
        type: 'Laptop',
        category: 'Computing',
        brand: 'Apple',
        model: 'M3 Max 2024',
        vendor: 'Apple Store',
        purchaseDate: '2024-12-01',
        cost: '$3,199',
        warrantyExpiry: '2025-12-01',
        amcDetails: 'AppleCare+ 3 years',
        serialNumber: 'C02ZK1ABCDEF',
        assetId: 'DVM-0898',
        qrCode: 'QR-DVM-0898',
      });
    }, 2500);
  };

  useEffect(() => {
    if (inventoryView === 'qr-scan' && !isScanning) {
      startQRScan();
    }
  }, [inventoryView]);

  const filteredInventory = hardwareInventory.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !filters.type || asset.type === filters.type;
    const matchesCategory = !filters.category || asset.category === filters.category;
    const matchesStatus = !filters.status || asset.status === filters.status;
    
    // Quick filter logic
    let matchesQuickFilter = true;
    if (quickFilters.length > 0) {
      matchesQuickFilter = quickFilters.every(filter => {
        switch (filter) {
          case 'available':
            return asset.status === 'Available';
          case 'assigned':
            return asset.status === 'Assigned';
          case 'repair':
            return asset.status === 'Under Repair';
          case 'warranty':
            const daysLeft = checkWarrantyExpiry(asset.warrantyExpiry);
            return daysLeft !== null && daysLeft > 0 && daysLeft <= 90;
          case 'recent':
            const purchaseDays = Math.ceil((new Date().getTime() - new Date(asset.purchaseDate).getTime()) / (1000 * 60 * 60 * 24));
            return purchaseDays <= 30;
          default:
            return true;
        }
      });
    }
    
    return matchesSearch && matchesType && matchesCategory && matchesStatus && matchesQuickFilter;
  });

  const getStatusColor = (status: AssetStatus) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700';
      case 'Assigned': return 'bg-blue-100 text-blue-700';
      case 'Under Repair': return 'bg-orange-100 text-orange-700';
      case 'Damaged': return 'bg-red-100 text-red-700';
      case 'Decommissioned': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'laptop': return <Laptop className="w-4 h-4" />;
      case 'monitor': return <Monitor className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'printer': return <Printer className="w-4 h-4" />;
      case 'server': return <Server className="w-4 h-4" />;
      case 'storage': return <HardDrive className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  // QR Scanning View
  if (inventoryView === 'qr-scan') {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => {
              setInventoryView('add-choice');
              setIsScanning(false);
            }}
            className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-8">
            <h2 className="text-2xl text-slate-900 mb-2">Scanning QR Code</h2>
            <p className="text-sm text-slate-600">Position the QR code within the camera frame</p>
          </div>

          {/* Camera View Simulation */}
          <div className="bg-slate-900 rounded-2xl p-8 aspect-square max-w-md mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
            
            {/* Scanning animation */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="relative">
                {/* QR Frame */}
                <div className="w-64 h-64 border-4 border-white/30 rounded-2xl relative">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-2xl" />
                  
                  {/* Scanning line */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" 
                       style={{ animation: 'scan 2s ease-in-out infinite' }} />
                </div>

                {/* Camera icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-white/40" />
                </div>
              </div>
            </div>

            {/* Scanning status */}
            <div className="absolute bottom-8 left-0 right-0 text-center z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm text-white">Scanning...</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-slate-600">
            <p>Make sure the QR code is clearly visible and well-lit</p>
          </div>
        </div>

        <style>{`
          @keyframes scan {
            0% { top: 0%; }
            50% { top: 100%; }
            100% { top: 0%; }
          }
        `}</style>
      </div>
    );
  }

  // QR Result View - Show scanned data with edit option
  if (inventoryView === 'qr-result') {
    return (
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => {
              setInventoryView('add-choice');
              setHardwareData({
                name: '',
                type: '',
                category: '',
                brand: '',
                model: '',
                vendor: '',
                purchaseDate: '',
                cost: '',
                warrantyExpiry: '',
                amcDetails: '',
                serialNumber: '',
                assetId: '',
                qrCode: '',
              });
            }}
            className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl text-slate-900 mb-2">Vendor QR Code Scanned</h2>
            <p className="text-sm text-slate-600">Review the auto-filled information. After adding, we'll generate a system QR code for this asset.</p>
          </div>

          {/* Scanned Data - Editable */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 mb-6">
            <div>
              <h3 className="text-sm text-slate-900 mb-4">Hardware Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-700 mb-1.5">Hardware Name</label>
                  <input
                    type="text"
                    value={hardwareData.name}
                    onChange={(e) => updateHardwareData('name', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Type</label>
                    <input
                      type="text"
                      value={hardwareData.type}
                      onChange={(e) => updateHardwareData('type', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Category</label>
                    <input
                      type="text"
                      value={hardwareData.category}
                      onChange={(e) => updateHardwareData('category', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Brand</label>
                    <input
                      type="text"
                      value={hardwareData.brand}
                      onChange={(e) => updateHardwareData('brand', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Model</label>
                    <input
                      type="text"
                      value={hardwareData.model}
                      onChange={(e) => updateHardwareData('model', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-700 mb-1.5">Vendor</label>
                  <input
                    type="text"
                    value={hardwareData.vendor}
                    onChange={(e) => updateHardwareData('vendor', e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Purchase Date</label>
                    <input
                      type="date"
                      value={hardwareData.purchaseDate}
                      onChange={(e) => updateHardwareData('purchaseDate', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Cost</label>
                    <input
                      type="text"
                      value={hardwareData.cost}
                      onChange={(e) => updateHardwareData('cost', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Warranty Expiry</label>
                    <input
                      type="date"
                      value={hardwareData.warrantyExpiry}
                      onChange={(e) => updateHardwareData('warrantyExpiry', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">AMC Details</label>
                    <input
                      type="text"
                      value={hardwareData.amcDetails}
                      onChange={(e) => updateHardwareData('amcDetails', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Serial Number</label>
                    <input
                      type="text"
                      value={hardwareData.serialNumber}
                      onChange={(e) => updateHardwareData('serialNumber', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700 mb-1.5">Asset ID</label>
                    <input
                      type="text"
                      value={hardwareData.assetId}
                      onChange={(e) => updateHardwareData('assetId', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 mb-6">
            <QrCode className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 mb-1">
                <strong>System QR Code will be generated</strong>
              </p>
              <p className="text-sm text-blue-700">
                After adding, we'll generate a standardized system QR code that you can print and attach to this asset for future scanning.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setInventoryView('qr-scan')}
              className="flex-1 px-5 py-3 bg-white border border-slate-200 text-sm text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Scan Again
            </button>
            <button
              onClick={handleAddHardware}
              className="flex-1 px-5 py-3 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Add to Inventory
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Inventory List View
  if (inventoryView === 'list') {
    // Calculate warranty alerts
    const warrantyAlerts = hardwareInventory.filter(asset => {
      const daysLeft = checkWarrantyExpiry(asset.warrantyExpiry);
      return daysLeft !== null && daysLeft > 0 && daysLeft <= 90;
    });

    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl text-slate-900 mb-1">Inventory Management</h1>
              <p className="text-sm text-slate-600">Manage all hardware assets, assignments, and lifecycle</p>
            </div>
            <button
              onClick={() => setInventoryView('add-choice')}
              className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Hardware
            </button>
          </div>

          {/* Warranty Alerts */}
          {warrantyAlerts.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm text-orange-900 mb-2">Warranty Expiry Alerts</h3>
                  <div className="space-y-1.5">
                    {warrantyAlerts.slice(0, 3).map(asset => {
                      const daysLeft = checkWarrantyExpiry(asset.warrantyExpiry);
                      return (
                        <div key={asset.id} className="text-xs text-orange-700">
                          <span className="font-medium">{asset.name}</span> ({asset.assetId}) - Warranty expires in {daysLeft} days
                        </div>
                      );
                    })}
                    {warrantyAlerts.length > 3 && (
                      <div className="text-xs text-orange-600">+ {warrantyAlerts.length - 3} more assets</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Total Assets</div>
              <div className="text-2xl text-slate-900">{hardwareInventory.length}</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Available</div>
              <div className="text-2xl text-green-600">{hardwareInventory.filter(a => a.status === 'Available').length}</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Assigned</div>
              <div className="text-2xl text-blue-600">{hardwareInventory.filter(a => a.status === 'Assigned').length}</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Under Repair</div>
              <div className="text-2xl text-orange-600">{hardwareInventory.filter(a => a.status === 'Under Repair').length}</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Warranty Alerts</div>
              <div className="text-2xl text-orange-600">{warrantyAlerts.length}</div>
            </div>
          </div>

          {/* Smart Search and Quick Filters */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <SmartSearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              quickFilters={[
                { 
                  id: 'available', 
                  label: 'Available', 
                  icon: <CheckCircle className="w-4 h-4" />,
                  count: hardwareInventory.filter(a => a.status === 'Available').length 
                },
                { 
                  id: 'assigned', 
                  label: 'Assigned', 
                  icon: <UserPlus className="w-4 h-4" />,
                  count: hardwareInventory.filter(a => a.status === 'Assigned').length 
                },
                { 
                  id: 'repair', 
                  label: 'Under Repair', 
                  icon: <Wrench className="w-4 h-4" />,
                  count: hardwareInventory.filter(a => a.status === 'Under Repair').length 
                },
                { 
                  id: 'warranty', 
                  label: 'Warranty Expiring', 
                  icon: <AlertCircle className="w-4 h-4" />,
                  count: hardwareInventory.filter(a => {
                    const days = checkWarrantyExpiry(a.warrantyExpiry);
                    return days !== null && days > 0 && days <= 90;
                  }).length 
                },
                { 
                  id: 'recent', 
                  label: 'Recent Additions', 
                  icon: <Clock className="w-4 h-4" />,
                  count: hardwareInventory.filter(a => {
                    const days = Math.ceil((new Date().getTime() - new Date(a.purchaseDate).getTime()) / (1000 * 60 * 60 * 24));
                    return days <= 30;
                  }).length 
                },
              ]}
              activeFilters={quickFilters}
              onFilterToggle={(filterId) => {
                setQuickFilters(prev => 
                  prev.includes(filterId) 
                    ? prev.filter(f => f !== filterId)
                    : [...prev, filterId]
                );
              }}
              placeholder="Search by name, brand, model, asset ID, or serial number..."
            />
            
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 text-sm rounded-lg border transition-colors flex items-center gap-2 ${
                  showFilters 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                Advanced Filters
              </button>
              <button className="px-4 py-2 bg-white text-slate-700 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>

            {/* Advanced Filter Options */}
            {showFilters && (
              <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-200">
                <div>
                  <label className="block text-xs text-slate-600 mb-1.5">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="">All Types</option>
                    {hardwareTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1.5">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1.5">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="">All Statuses</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setFilters({ type: '', category: '', status: '', department: '' })}
                    className="w-full px-3 py-2 bg-slate-100 text-slate-700 text-sm rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-slate-600">Asset ID</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-600">Name</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-600">Type</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-600">Category</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-600">Assigned To</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-600">Warranty</th>
                  <th className="px-4 py-3 text-left text-xs text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((asset) => {
                  const daysLeft = checkWarrantyExpiry(asset.warrantyExpiry);
                  const warrantyExpiring = daysLeft !== null && daysLeft > 0 && daysLeft <= 90;

                  return (
                    <tr key={asset.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <QrCode className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-sm text-slate-900">{asset.assetId}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(asset.type)}
                          <span className="text-sm text-slate-900">{asset.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{asset.type}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{asset.category}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{asset.assignedTo || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(asset.status)}`}>
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600">{asset.warrantyExpiry}</span>
                          {warrantyExpiring && (
                            <Bell className="w-3.5 h-3.5 text-orange-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative">
                          <button
                            onClick={() => setShowAssetActions(showAssetActions === asset.id ? null : asset.id)}
                            className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-slate-600" />
                          </button>

                          {/* Action Dropdown */}
                          {showAssetActions === asset.id && (
                            <>
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setShowAssetActions(null)}
                              />
                              <div className="absolute right-0 top-8 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-20 overflow-hidden">
                                <button
                                  onClick={() => handleAssetAction(asset.id, 'view')}
                                  className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  View Details
                                </button>
                                <button
                                  onClick={() => handleAssetAction(asset.id, 'assign')}
                                  className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <UserPlus className="w-3.5 h-3.5" />
                                  Assign to Employee
                                </button>
                                <button
                                  onClick={() => handleAssetAction(asset.id, 'repair')}
                                  className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <Wrench className="w-3.5 h-3.5" />
                                  Mark Under Repair
                                </button>
                                <button
                                  onClick={() => handleAssetAction(asset.id, 'history')}
                                  className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <History className="w-3.5 h-3.5" />
                                  View History
                                </button>
                                <div className="border-t border-slate-200" />
                                <button
                                  onClick={() => handleAssetAction(asset.id, 'edit')}
                                  className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                  Edit Asset
                                </button>
                                <button
                                  onClick={() => handleAssetAction(asset.id, 'generate-qr')}
                                  className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <QrCode className="w-3.5 h-3.5" />
                                  Generate QR Code
                                </button>
                                <div className="border-t border-slate-200" />
                                <button
                                  onClick={() => handleAssetAction(asset.id, 'archive')}
                                  className="w-full px-3 py-2 text-left text-sm text-orange-700 hover:bg-orange-50 flex items-center gap-2"
                                >
                                  <Archive className="w-3.5 h-3.5" />
                                  Decommission
                                </button>
                                <button
                                  onClick={() => handleAssetAction(asset.id, 'delete')}
                                  className="w-full px-3 py-2 text-left text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Delete Asset
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredInventory.length === 0 && (
              <div className="p-12 text-center">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <div className="text-base text-slate-900 mb-1">No assets found</div>
                <div className="text-sm text-slate-500">Try adjusting your search or filters</div>
              </div>
            )}
          </div>
        </div>

        {/* Overlay Components */}
        <AssetDetailsOverlay
          asset={selectedAsset}
          isOpen={showDetailsOverlay}
          onClose={() => {
            setShowDetailsOverlay(false);
            setSelectedAsset(null);
          }}
        />

        <AssignToEmployeeOverlay
          assetId={selectedAsset?.assetId || ''}
          assetName={selectedAsset?.name || ''}
          isOpen={showAssignOverlay}
          onClose={() => {
            setShowAssignOverlay(false);
            setSelectedAsset(null);
          }}
          onAssign={handleAssignAsset}
        />

        <AssetHistoryOverlay
          assetName={selectedAsset?.name || ''}
          assetId={selectedAsset?.assetId || ''}
          history={selectedAsset?.allocationHistory || []}
          isOpen={showHistoryOverlay}
          onClose={() => {
            setShowHistoryOverlay(false);
            setSelectedAsset(null);
          }}
        />

        <EditAssetOverlay
          asset={selectedAsset}
          isOpen={showEditOverlay}
          onClose={() => {
            setShowEditOverlay(false);
            setSelectedAsset(null);
          }}
          onSave={handleSaveAssetEdit}
        />

        <QRCodeGenerator
          isOpen={showQRGenerator}
          onClose={() => {
            setShowQRGenerator(false);
            setQRAssetData(null);
          }}
          assetData={qrAssetData || { assetId: '', name: '', serialNumber: '', type: '' }}
        />
      </div>
    );
  }

  // Add Hardware Choice View
  if (inventoryView === 'add-choice') {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => {
              setInventoryView('list');
              setAddHardwareStep(1);
            }}
            className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Inventory
          </button>

          <div className="text-center mb-8">
            <h2 className="text-2xl text-slate-900 mb-2">Add New Hardware</h2>
            <p className="text-sm text-slate-600">Choose how you would like to add hardware to inventory</p>
          </div>

          {/* Add Method Choice */}
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => {
                setInventoryView('qr-scan');
                setAddHardwareStep(0);
                setAddMethod('qr-scan');
              }}
              className="group bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-slate-900 hover:bg-slate-50 transition-all text-left"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-slate-100 group-hover:bg-slate-900 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <QrCode className="w-8 h-8 text-slate-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg text-slate-900 mb-2">Scan Vendor QR Code</h3>
                <p className="text-sm text-slate-600 mb-4">Scan the manufacturer QR code on the hardware packaging to automatically pull device information</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs text-blue-700">
                  Fastest method • Auto-fills data
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setInventoryView('add-hardware');
                setAddHardwareStep(0);
                setAddMethod('manual');
              }}
              className="group bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-slate-900 hover:bg-slate-50 transition-all text-left"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-slate-100 group-hover:bg-slate-900 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <FileInput className="w-8 h-8 text-slate-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg text-slate-900 mb-2">Enter Manually</h3>
                <p className="text-sm text-slate-600 mb-4">Manually enter all hardware details. System will generate a QR code for you to print and attach</p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700">
                  Complete control • Auto-generates QR code
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Manual Add Hardware Flow - Step 0: Select Type First
  if (addHardwareStep === 0) {
    return (
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => {
              setInventoryView('add-choice');
              setAddHardwareStep(1);
            }}
            className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-8">
            <h2 className="text-2xl text-slate-900 mb-2">Select Hardware Type</h2>
            <p className="text-sm text-slate-600">Choose the type of hardware you want to add</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {hardwareTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  updateHardwareData('type', type);
                  // Auto-set category based on type
                  if (['Laptop', 'Desktop'].includes(type)) updateHardwareData('category', 'Computing');
                  else if (type === 'Monitor') updateHardwareData('category', 'Display');
                  else if (['Mobile', 'Tablet'].includes(type)) updateHardwareData('category', 'Mobile Device');
                  else if (type === 'Printer') updateHardwareData('category', 'Peripherals');
                  else if (['Server', 'Storage', 'Networking'].includes(type)) updateHardwareData('category', 'Infrastructure');
                  else updateHardwareData('category', 'Accessories');
                  setAddHardwareStep(1);
                }}
                className="group bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-slate-900 hover:bg-slate-50 transition-all text-center"
              >
                <div className="w-12 h-12 bg-slate-100 group-hover:bg-slate-900 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                  <span className="text-slate-600 group-hover:text-white transition-colors">
                    {getTypeIcon(type)}
                  </span>
                </div>
                <div className="text-sm text-slate-900">{type}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Manual Entry Steps 1-5
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => {
            if (addHardwareStep === 1) {
              setAddHardwareStep(0);
            } else if (addHardwareStep > 1 && addHardwareStep < 5) {
              setAddHardwareStep((addHardwareStep - 1) as AddHardwareStep);
            } else {
              setInventoryView('list');
            }
          }}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {addHardwareStep === 1 ? 'Back to Type Selection' : addHardwareStep === 5 ? 'Back to Inventory' : 'Back'}
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl text-slate-900 mb-2">
            {addHardwareStep === 5 ? 'Hardware Added Successfully!' : `Add Hardware - ${hardwareData.type}`}
          </h2>
          <p className="text-sm text-slate-600">
            {addHardwareStep === 5 ? 'Your new asset has been added to inventory' : 'Complete all required information'}
          </p>
        </div>

        {/* Progress indicator */}
        {addHardwareStep < 5 && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              {[1, 2, 3, 4].map((step, idx) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all ${
                    step < addHardwareStep ? 'bg-green-500 text-white' :
                    step === addHardwareStep ? 'bg-slate-900 text-white' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {step < addHardwareStep ? <CheckCircle className="w-5 h-5" /> : step}
                  </div>
                  {idx < 3 && (
                    <div className={`flex-1 h-1 mx-2 rounded ${
                      step < addHardwareStep ? 'bg-green-500' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-slate-600">
              {addHardwareStep === 1 && 'Basic Information'}
              {addHardwareStep === 2 && 'Purchase Details'}
              {addHardwareStep === 3 && 'Asset Identifiers'}
              {addHardwareStep === 4 && 'Review & Confirm'}
            </div>
          </div>
        )}

        {/* Step 1: Basic Information */}
        {addHardwareStep === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm text-slate-900 mb-5">Hardware Information</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Hardware Name *</label>
                  <input
                    type="text"
                    value={hardwareData.name}
                    onChange={(e) => updateHardwareData('name', e.target.value)}
                    placeholder={`e.g., ${hardwareData.type === 'Laptop' ? 'MacBook Pro 16"' : hardwareData.type === 'Monitor' ? 'LG UltraWide 34"' : hardwareData.type + ' Device'}`}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Hardware Type *</label>
                    <div className="px-4 py-3 text-sm bg-slate-100 border border-slate-200 rounded-lg text-slate-600 flex items-center gap-2">
                      {getTypeIcon(hardwareData.type)}
                      {hardwareData.type}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Category *</label>
                    <div className="px-4 py-3 text-sm bg-slate-100 border border-slate-200 rounded-lg text-slate-600">
                      {hardwareData.category}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Brand / Manufacturer *</label>
                    <input
                      type="text"
                      value={hardwareData.brand}
                      onChange={(e) => updateHardwareData('brand', e.target.value)}
                      placeholder="e.g., Apple, Dell, HP"
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Model Number *</label>
                    <input
                      type="text"
                      value={hardwareData.model}
                      onChange={(e) => updateHardwareData('model', e.target.value)}
                      placeholder="e.g., M3 Pro 2024, XPS 15"
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setAddHardwareStep(0)}
                className="flex-1 px-5 py-3 bg-white border border-slate-200 text-sm text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Change Type
              </button>
              <button
                onClick={() => {
                  if (hardwareData.name && hardwareData.brand && hardwareData.model) {
                    setAddHardwareStep(2);
                  } else {
                    alert('Please fill in all required fields');
                  }
                }}
                className="flex-1 px-5 py-3 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Continue to Purchase Details
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Purchase Details */}
        {addHardwareStep === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm text-slate-900 mb-5">Purchase Information</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Vendor / Supplier *</label>
                  <input
                    type="text"
                    value={hardwareData.vendor}
                    onChange={(e) => updateHardwareData('vendor', e.target.value)}
                    placeholder="e.g., Apple Store, Amazon Business, Dell Direct"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Purchase Date *</label>
                    <input
                      type="date"
                      value={hardwareData.purchaseDate}
                      onChange={(e) => updateHardwareData('purchaseDate', e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Purchase Cost *</label>
                    <input
                      type="text"
                      value={hardwareData.cost}
                      onChange={(e) => updateHardwareData('cost', e.target.value)}
                      placeholder="e.g., $2,499"
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <h3 className="text-sm text-slate-900">Warranty & Support</h3>
                <div className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">
                  Warranty alerts enabled
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Warranty Expiry Date *</label>
                    <input
                      type="date"
                      value={hardwareData.warrantyExpiry}
                      onChange={(e) => updateHardwareData('warrantyExpiry', e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">AMC / Support Details</label>
                    <input
                      type="text"
                      value={hardwareData.amcDetails}
                      onChange={(e) => updateHardwareData('amcDetails', e.target.value)}
                      placeholder="e.g., AppleCare+ 3 years"
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-700">
                    <strong>Auto-reminder:</strong> You will receive alerts 90 days before warranty expiration
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setAddHardwareStep(1)}
                className="flex-1 px-5 py-3 bg-white border border-slate-200 text-sm text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (hardwareData.vendor && hardwareData.purchaseDate && hardwareData.cost && hardwareData.warrantyExpiry) {
                    setAddHardwareStep(3);
                  } else {
                    alert('Please fill in all required fields');
                  }
                }}
                className="flex-1 px-5 py-3 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Continue to Identifiers
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Asset Identifiers */}
        {addHardwareStep === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm text-slate-900 mb-5">Asset Tracking Information</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-slate-700 mb-2">Serial Number *</label>
                  <input
                    type="text"
                    value={hardwareData.serialNumber}
                    onChange={(e) => updateHardwareData('serialNumber', e.target.value)}
                    placeholder="e.g., C02XK0YJLVCF"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-mono"
                  />
                  <p className="mt-1.5 text-xs text-slate-500">Usually found on the device label or in settings</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">Internal Asset ID *</label>
                    <input
                      type="text"
                      value={hardwareData.assetId}
                      onChange={(e) => updateHardwareData('assetId', e.target.value)}
                      placeholder="e.g., DVM-0898"
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-700 mb-2">QR Code ID</label>
                    <input
                      type="text"
                      value={hardwareData.qrCode}
                      onChange={(e) => updateHardwareData('qrCode', e.target.value)}
                      placeholder="Auto-generated"
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Hash className="w-4 h-4 text-slate-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-slate-700 mb-1">Unique Identifiers</p>
                      <p className="text-xs text-slate-500">
                        These IDs ensure proper tracking throughout the asset lifecycle. The Asset ID will be used for all internal references.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setAddHardwareStep(2)}
                className="flex-1 px-5 py-3 bg-white border border-slate-200 text-sm text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (hardwareData.serialNumber && hardwareData.assetId) {
                    if (!hardwareData.qrCode) {
                      updateHardwareData('qrCode', `QR-${hardwareData.assetId}`);
                    }
                    setAddHardwareStep(4);
                  } else {
                    alert('Please fill in all required fields');
                  }
                }}
                className="flex-1 px-5 py-3 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Review Details
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Confirm */}
        {addHardwareStep === 4 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm text-slate-900 mb-5">Review Hardware Details</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-xs text-slate-500 mb-3">BASIC INFORMATION</div>
                  <div className="space-y-2.5">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Hardware Name</span>
                      <span className="text-sm text-slate-900">{hardwareData.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Type</span>
                      <span className="text-sm text-slate-900 flex items-center gap-2">
                        {getTypeIcon(hardwareData.type)}
                        {hardwareData.type}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Brand</span>
                      <span className="text-sm text-slate-900">{hardwareData.brand}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Model</span>
                      <span className="text-sm text-slate-900">{hardwareData.model}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 mb-3">PURCHASE DETAILS</div>
                  <div className="space-y-2.5">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Vendor</span>
                      <span className="text-sm text-slate-900">{hardwareData.vendor}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Purchase Date</span>
                      <span className="text-sm text-slate-900">{hardwareData.purchaseDate}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Cost</span>
                      <span className="text-sm text-slate-900">{hardwareData.cost}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Warranty Expiry</span>
                      <span className="text-sm text-slate-900">{hardwareData.warrantyExpiry}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 mb-3">ASSET IDENTIFIERS</div>
                  <div className="space-y-2.5">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Serial Number</span>
                      <span className="text-sm text-slate-900 font-mono">{hardwareData.serialNumber}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-600">Asset ID</span>
                      <span className="text-sm text-slate-900 font-mono">{hardwareData.assetId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <QrCode className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 mb-1">
                  <strong>QR Code will be auto-generated</strong>
                </p>
                <p className="text-sm text-blue-700">
                  After adding this asset, we'll generate a system QR code that you can print and attach to the physical hardware.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setAddHardwareStep(3)}
                className="flex-1 px-5 py-3 bg-white border border-slate-200 text-sm text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => {
                  handleAddHardware();
                  setAddHardwareStep(5);
                }}
                className="flex-1 px-5 py-3 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Add to Inventory
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {addHardwareStep === 5 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl text-slate-900 mb-2">Hardware Added Successfully!</h3>
              <p className="text-sm text-slate-600 mb-8">
                The hardware has been added to your inventory with status "Available"
              </p>

              <div className="flex gap-3 max-w-md mx-auto">
                <button
                  onClick={() => {
                    setInventoryView('add-choice');
                    setAddHardwareStep(1);
                    setHardwareData({
                      name: '',
                      type: '',
                      category: '',
                      brand: '',
                      model: '',
                      vendor: '',
                      purchaseDate: '',
                      cost: '',
                      warrantyExpiry: '',
                      amcDetails: '',
                      serialNumber: '',
                      assetId: '',
                      qrCode: '',
                    });
                  }}
                  className="flex-1 px-5 py-3 bg-white border border-slate-200 text-sm text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Add Another
                </button>
                <button
                  onClick={() => setInventoryView('list')}
                  className="flex-1 px-5 py-3 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  View Inventory
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}