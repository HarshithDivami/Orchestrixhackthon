import { useState } from 'react';
import { X, Search, User, Check, ArrowLeft } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
}

interface AssignToEmployeeOverlayProps {
  assetId: string;
  assetName: string;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (assetId: string, employeeId: string, employeeName: string) => void;
}

export function AssignToEmployeeOverlay({ assetId, assetName, isOpen, onClose, onAssign }: AssignToEmployeeOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Sample employee list
  const employees: Employee[] = [
    { id: 'E001', name: 'John Doe', email: 'john.doe@company.com', department: 'Engineering', role: 'Senior Developer' },
    { id: 'E002', name: 'Jane Smith', email: 'jane.smith@company.com', department: 'Design', role: 'UI/UX Designer' },
    { id: 'E003', name: 'Mike Johnson', email: 'mike.johnson@company.com', department: 'Marketing', role: 'Marketing Manager' },
    { id: 'E004', name: 'Sarah Williams', email: 'sarah.williams@company.com', department: 'Engineering', role: 'Frontend Developer' },
    { id: 'E005', name: 'David Brown', email: 'david.brown@company.com', department: 'Sales', role: 'Sales Executive' },
    { id: 'E006', name: 'Emily Davis', email: 'emily.davis@company.com', department: 'Engineering', role: 'Backend Developer' },
    { id: 'E007', name: 'Robert Wilson', email: 'robert.wilson@company.com', department: 'Product', role: 'Product Manager' },
    { id: 'E008', name: 'Lisa Anderson', email: 'lisa.anderson@company.com', department: 'HR', role: 'HR Manager' },
  ];

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = () => {
    if (selectedEmployee) {
      onAssign(assetId, selectedEmployee.id, selectedEmployee.name);
      onClose();
      setSelectedEmployee(null);
      setSearchQuery('');
    }
  };

  if (!isOpen) return null;

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
          <h2 className="text-lg text-slate-900">Assign to Employee</h2>
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
            <div className="text-xs text-slate-600 mb-1">Assigning Asset</div>
            <div className="text-sm text-slate-900">{assetName}</div>
            <div className="text-xs text-slate-500 mt-1">Asset ID: {assetId}</div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Employee List */}
          <div className="space-y-2">
            {filteredEmployees.map((employee) => (
              <button
                key={employee.id}
                onClick={() => setSelectedEmployee(employee)}
                className={`w-full p-4 rounded-lg text-left transition-all border ${
                  selectedEmployee?.id === employee.id
                    ? 'bg-slate-900 border-slate-900'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedEmployee?.id === employee.id ? 'bg-white/20' : 'bg-slate-100'
                    }`}>
                      <User className={`w-5 h-5 ${
                        selectedEmployee?.id === employee.id ? 'text-white' : 'text-slate-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm mb-1 ${
                        selectedEmployee?.id === employee.id ? 'text-white' : 'text-slate-900'
                      }`}>
                        {employee.name}
                      </div>
                      <div className={`text-xs mb-1 ${
                        selectedEmployee?.id === employee.id ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {employee.role}
                      </div>
                      <div className={`text-xs truncate ${
                        selectedEmployee?.id === employee.id ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {employee.email}
                      </div>
                    </div>
                  </div>
                  {selectedEmployee?.id === employee.id && (
                    <Check className="w-5 h-5 text-white flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-8">
              <div className="text-sm text-slate-600 mb-1">No employees found</div>
              <div className="text-xs text-slate-500">Try a different search term</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6">
          <button
            onClick={handleAssign}
            disabled={!selectedEmployee}
            className="w-full px-4 py-3 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedEmployee ? `Assign to ${selectedEmployee.name}` : 'Select an employee'}
          </button>
        </div>
      </div>
    </>
  );
}
