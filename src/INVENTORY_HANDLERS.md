# Inventory Management - Action Handlers

Replace the `handleAssetAction` function with this comprehensive version:

```typescript
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
      case 'qr':
        setShowQRCodeOverlay(true);
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
      case 'delete':
        if (confirm(`Permanently delete ${asset.name}? This action cannot be undone.`)) {
          setHardwareInventory(prev => prev.filter(a => a.id !== assetId));
        }
        break;
    }
  };

  const handleAssignAsset = (assetId: string, employeeId: string, employeeName: string) => {
    setHardwareInventory(prev => prev.map(asset => 
      asset.id === assetId 
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
                action: 'Assigned',
                employee: employeeName,
                notes: `Asset assigned to ${employeeName}`
              }
            ]
          }
        : asset
    ));
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
  };
```

Add these overlay components at the end of the component, just before the closing `</div>`:

```typescript
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

          <GenerateQRCodeOverlay
            assetName={selectedAsset?.name || ''}
            assetId={selectedAsset?.assetId || ''}
            qrCode={selectedAsset?.qrCode || ''}
            isOpen={showQRCodeOverlay}
            onClose={() => {
              setShowQRCodeOverlay(false);
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
```
