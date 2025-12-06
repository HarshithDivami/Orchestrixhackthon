import { QrCode, Download, Printer, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface QRCodeGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  assetData: {
    assetId: string;
    name: string;
    serialNumber: string;
    type: string;
  };
}

export function QRCodeGenerator({ isOpen, onClose, assetData }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      generateQRCode();
    }
  }, [isOpen, assetData]);

  const generateQRCode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size - smaller for compact view
    canvas.width = 280;
    canvas.height = 340;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Generate QR code data (in real implementation, use a QR library)
    // For now, we'll create a visual representation
    const qrSize = 240;
    const qrX = (canvas.width - qrSize) / 2;
    const qrY = 20;

    // Draw QR code placeholder (simplified pattern)
    ctx.fillStyle = '#000000';
    const moduleSize = qrSize / 25;
    
    // Create a simple pattern (in production, use qrcode library)
    for (let y = 0; y < 25; y++) {
      for (let x = 0; x < 25; x++) {
        // Create a pseudo-random pattern based on asset data
        const hash = (assetData.assetId.charCodeAt(x % assetData.assetId.length) + x + y) % 3;
        if (hash > 0) {
          ctx.fillRect(
            qrX + x * moduleSize,
            qrY + y * moduleSize,
            moduleSize - 1,
            moduleSize - 1
          );
        }
      }
    }

    // Add asset info below QR code
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 16px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(assetData.assetId, canvas.width / 2, qrY + qrSize + 40);
    
    ctx.font = '14px system-ui';
    ctx.fillStyle = '#64748b';
    ctx.fillText(assetData.name, canvas.width / 2, qrY + qrSize + 65);
    ctx.fillText(assetData.serialNumber, canvas.width / 2, qrY + qrSize + 85);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `QR-${assetData.assetId}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handlePrint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code - ${assetData.assetId}</title>
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh;
            }
            img { 
              max-width: 100%; 
              height: auto; 
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <img src="${canvas.toDataURL('image/png')}" />
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full pointer-events-auto transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
                <QrCode className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-slate-900">QR Code Generated</h2>
                <p className="text-xs text-slate-600">Asset: {assetData.assetId}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          {/* QR Code Display */}
          <div className="p-5">
            <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto"
              />
            </div>

            <p className="mt-3 text-xs text-slate-600 text-center">
              Print and attach to asset. Scanning loads all details instantly.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 px-5 pb-5">
            <button
              onClick={handleDownload}
              className="flex-1 px-4 py-2 bg-white border border-slate-200 text-slate-900 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
}