import { useState, useEffect } from 'react';
import { X, Mail, MapPin, Calendar, Briefcase, User, Hash, UserCircle, Laptop, Key as KeyIcon, AlertTriangle, Edit2, Save, XCircle, Check } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  location?: string;
  status: 'Active' | 'Pending' | 'Inactive';
  joinDate?: string;
  hardware?: string[];
  software?: string[];
  phone?: string;
  manager?: string;
  employeeId?: string;
}

interface EmployeeDetailsOverlayProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  hardwareOptions: Array<{ id: string; name: string; specs: string; available: number }>;
  softwareOptions: Array<{ id: string; name: string; type: string; licenses: number }>;
  onOffboard: (employeeId: string) => void;
  onUpdateResources: (employeeId: string, hardware: string[], software: string[]) => void;
}

export function EmployeeDetailsOverlay({ 
  employee, 
  isOpen, 
  onClose, 
  hardwareOptions, 
  softwareOptions,
  onOffboard,
  onUpdateResources 
}: EmployeeDetailsOverlayProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedHardware, setEditedHardware] = useState<string[]>([]);
  const [editedSoftware, setEditedSoftware] = useState<string[]>([]);

  useEffect(() => {
    if (employee) {
      setEditedHardware(employee.hardware || []);
      setEditedSoftware(employee.software || []);
      setIsEditMode(false);
    }
  }, [employee]);

  if (!isOpen || !employee) return null;

  const toggleHardware = (hwId: string) => {
    setEditedHardware(prev => 
      prev.includes(hwId) 
        ? prev.filter(id => id !== hwId)
        : [...prev, hwId]
    );
  };

  const toggleSoftware = (swId: string) => {
    setEditedSoftware(prev => 
      prev.includes(swId) 
        ? prev.filter(id => id !== swId)
        : [...prev, swId]
    );
  };

  const handleSave = () => {
    onUpdateResources(employee.id, editedHardware, editedSoftware);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditedHardware(employee.hardware || []);
    setEditedSoftware(employee.software || []);
    setIsEditMode(false);
  };

  const displayHardware = isEditMode ? editedHardware : (employee.hardware || []);
  const displaySoftware = isEditMode ? editedSoftware : (employee.software || []);

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
          <h2 className="text-lg text-slate-900">Employee Details</h2>
          <div className="flex items-center gap-2">
            {!isEditMode && employee.status === 'Active' && (
              <button
                onClick={() => setIsEditMode(true)}
                className="px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit Resources
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Employee Header */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg">{employee.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl text-slate-900 mb-1">{employee.name}</h3>
                <p className="text-sm text-slate-600">{employee.role}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs flex-shrink-0 ${
                employee.status === 'Active' ? 'bg-green-100 text-green-700' :
                employee.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {employee.status}
              </span>
            </div>
          </div>

          {/* Edit Mode Banner */}
          {isEditMode && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Edit2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-blue-900 mb-1">Edit Mode Active</div>
                  <div className="text-xs text-blue-700">Select or deselect hardware and software to update employee access</div>
                </div>
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div className="mb-6">
            <h4 className="text-sm text-slate-900 mb-3">Basic Information</h4>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500">Email</div>
                  <div className="text-sm text-slate-900 truncate">{employee.email}</div>
                </div>
              </div>

              {employee.phone && (
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-500">Phone</div>
                    <div className="text-sm text-slate-900">{employee.phone}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-500">Department</div>
                  <div className="text-sm text-slate-900">{employee.department}</div>
                </div>
              </div>

              {employee.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-500">Location</div>
                    <div className="text-sm text-slate-900">{employee.location}</div>
                  </div>
                </div>
              )}

              {employee.joinDate && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-500">Join Date</div>
                    <div className="text-sm text-slate-900">{employee.joinDate}</div>
                  </div>
                </div>
              )}

              {employee.employeeId && (
                <div className="flex items-center gap-3">
                  <Hash className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-500">Employee ID</div>
                    <div className="text-sm text-slate-900">{employee.employeeId}</div>
                  </div>
                </div>
              )}

              {employee.manager && (
                <div className="flex items-center gap-3">
                  <UserCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-500">Manager</div>
                    <div className="text-sm text-slate-900">{employee.manager}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hardware Access */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Laptop className="w-4 h-4 text-slate-600" />
              <h4 className="text-sm text-slate-900">Hardware Access</h4>
              <span className="text-xs text-slate-500">({displayHardware.length})</span>
            </div>

            {!isEditMode ? (
              /* View Mode */
              displayHardware.length > 0 ? (
                <div className="space-y-2">
                  {displayHardware.map((hwId) => {
                    const hw = hardwareOptions.find(h => h.id === hwId);
                    return (
                      <div key={hwId} className="bg-white border border-slate-200 rounded-lg p-3">
                        <div className="text-sm text-slate-900 mb-1">{hw?.name || hwId}</div>
                        {hw?.specs && <div className="text-xs text-slate-500">{hw.specs}</div>}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-slate-500">No hardware assigned</div>
                </div>
              )
            ) : (
              /* Edit Mode */
              <div className="space-y-2">
                {hardwareOptions.map((hw) => {
                  const isSelected = editedHardware.includes(hw.id);
                  return (
                    <button
                      key={hw.id}
                      onClick={() => toggleHardware(hw.id)}
                      className={`w-full p-3 rounded-lg text-left transition-all border ${
                        isSelected
                          ? 'bg-slate-900 border-slate-900'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className={`text-sm mb-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {hw.name}
                          </div>
                          <div className={`text-xs ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {hw.specs}
                          </div>
                          <div className={`text-xs mt-1 ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                            {hw.available} available
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-5 h-5 text-white flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Software Access */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <KeyIcon className="w-4 h-4 text-slate-600" />
              <h4 className="text-sm text-slate-900">Software & SaaS Access</h4>
              <span className="text-xs text-slate-500">({displaySoftware.length})</span>
            </div>

            {!isEditMode ? (
              /* View Mode */
              displaySoftware.length > 0 ? (
                <div className="space-y-2">
                  {displaySoftware.map((swId) => {
                    const sw = softwareOptions.find(s => s.id === swId);
                    return (
                      <div key={swId} className="bg-white border border-slate-200 rounded-lg p-3">
                        <div className="text-sm text-slate-900 mb-1">{sw?.name || swId}</div>
                        {sw?.type && <div className="text-xs text-slate-500">{sw.type}</div>}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-slate-500">No software assigned</div>
                </div>
              )
            ) : (
              /* Edit Mode */
              <div className="space-y-2">
                {softwareOptions.map((sw) => {
                  const isSelected = editedSoftware.includes(sw.id);
                  return (
                    <button
                      key={sw.id}
                      onClick={() => toggleSoftware(sw.id)}
                      className={`w-full p-3 rounded-lg text-left transition-all border ${
                        isSelected
                          ? 'bg-slate-900 border-slate-900'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className={`text-sm mb-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {sw.name}
                          </div>
                          <div className={`text-xs ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {sw.type}
                          </div>
                          <div className={`text-xs mt-1 ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                            {sw.licenses} licenses available
                          </div>
                        </div>
                        {isSelected && (
                          <Check className="w-5 h-5 text-white flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 p-6">
          {isEditMode ? (
            <div className="space-y-3">
              <button
                onClick={handleSave}
                className="w-full px-4 py-3 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Cancel
              </button>
            </div>
          ) : (
            <>
              {employee.status === 'Active' && (
                <>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to offboard ${employee.name}? This will revoke all access and mark them as inactive.`)) {
                        onOffboard(employee.id);
                        onClose();
                      }
                    }}
                    className="w-full px-4 py-3 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Offboard Employee
                  </button>
                  <p className="text-xs text-slate-500 text-center mt-3">
                    This action will revoke all hardware and software access
                  </p>
                </>
              )}
              {employee.status === 'Inactive' && (
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-slate-600">This employee has been offboarded</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
