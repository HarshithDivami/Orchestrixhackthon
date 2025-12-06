import { useState } from 'react';
import { Upload, FileText, ArrowLeft, Check, AlertCircle, Laptop, Key as KeyIcon, CheckCircle, Sparkles, ChevronLeft, ChevronRight, UserPlus, LayoutGrid, LayoutList, Mail, MapPin, Calendar } from 'lucide-react';
import { EmployeeDetailsOverlay } from './EmployeeDetailsOverlay';

type OnboardingStep = 'list' | 'choice' | 'upload' | 'upload-preview' | 'manual' | 'assign-resources' | 'summary' | 'complete';
type ManualStep = 1 | 2 | 3 | 4;
type ViewMode = 'table' | 'grid';

interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
  joinDate: string;
  manager: string;
  employeeId: string;
}

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

interface ResourceAssignment {
  employeeId: string;
  hardware: string[];
  software: string[];
}

export function UserManagement() {
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('list');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [manualStep, setManualStep] = useState<ManualStep>(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileValid, setFileValid] = useState<boolean | null>(null);
  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    location: '',
    joinDate: '',
    manager: '',
    employeeId: '',
  });
  const [onboardingEmployees, setOnboardingEmployees] = useState<Employee[]>([]);
  const [resourceAssignments, setResourceAssignments] = useState<Record<string, ResourceAssignment>>({});
  const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Main employee list
  const [employeeList, setEmployeeList] = useState<Employee[]>([
    { id: '1', name: 'John Doe', email: 'john.doe@company.com', role: 'Software Engineer', department: 'Engineering', location: 'San Francisco, CA', status: 'Active', joinDate: '2024-01-15', phone: '+1 (555) 123-4567', employeeId: 'EMP-001', manager: 'Sarah Williams', hardware: ['laptop-1', 'monitor-1', 'keyboard-1'], software: ['sw-1', 'sw-2', 'sw-4', 'sw-5', 'sw-6'] },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@company.com', role: 'Product Manager', department: 'Product', location: 'New York, NY', status: 'Active', joinDate: '2024-02-01', phone: '+1 (555) 234-5678', employeeId: 'EMP-002', manager: 'Sarah Williams', hardware: ['laptop-2', 'monitor-1'], software: ['sw-1', 'sw-2', 'sw-5'] },
    { id: '3', name: 'Mike Johnson', email: 'mike.j@company.com', role: 'Designer', department: 'Design', location: 'Austin, TX', status: 'Active', joinDate: '2024-03-10', phone: '+1 (555) 345-6789', employeeId: 'EMP-003', manager: 'Jane Smith', hardware: ['laptop-1', 'monitor-1', 'mouse-1'], software: ['sw-1', 'sw-2', 'sw-3'] },
    { id: '4', name: 'Sarah Williams', email: 'sarah.w@company.com', role: 'Marketing Manager', department: 'Marketing', location: 'Los Angeles, CA', status: 'Active', joinDate: '2024-01-20', phone: '+1 (555) 456-7890', employeeId: 'EMP-004', hardware: ['laptop-2'], software: ['sw-1', 'sw-2'] },
    { id: '5', name: 'Tom Brown', email: 'tom.brown@company.com', role: 'DevOps Engineer', department: 'Engineering', location: 'Seattle, WA', status: 'Active', joinDate: '2024-02-15', phone: '+1 (555) 567-8901', employeeId: 'EMP-005', manager: 'John Doe', hardware: ['laptop-1', 'monitor-1', 'keyboard-1', 'mouse-1'], software: ['sw-1', 'sw-2', 'sw-4', 'sw-5', 'sw-6'] },
  ]);

  const previewEmployees: Employee[] = [
    { id: 'emp-1', name: 'Alice Cooper', email: 'alice.cooper@company.com', role: 'Software Engineer', department: 'Engineering', status: 'Pending' },
    { id: 'emp-2', name: 'Bob Martin', email: 'bob.martin@company.com', role: 'Product Manager', department: 'Product', status: 'Pending' },
    { id: 'emp-3', name: 'Carol White', email: 'carol.white@company.com', role: 'Designer', department: 'Design', status: 'Pending' },
  ];

  const hardwareOptions = [
    { id: 'laptop-1', name: 'MacBook Pro 16"', specs: 'M3 Pro, 32GB RAM', available: 5 },
    { id: 'laptop-2', name: 'Dell XPS 15', specs: 'i7, 16GB RAM', available: 3 },
    { id: 'monitor-1', name: 'LG UltraWide 34"', specs: '3440x1440', available: 12 },
    { id: 'keyboard-1', name: 'Mechanical Keyboard', specs: 'Cherry MX Brown', available: 8 },
    { id: 'mouse-1', name: 'Logitech MX Master 3', specs: 'Wireless', available: 15 },
  ];

  const softwareOptions = [
    { id: 'sw-1', name: 'Microsoft 365', type: 'Productivity Suite', licenses: 45 },
    { id: 'sw-2', name: 'Slack', type: 'Communication', licenses: 150 },
    { id: 'sw-3', name: 'Figma', type: 'Design', licenses: 25 },
    { id: 'sw-4', name: 'GitHub', type: 'Development', licenses: 60 },
    { id: 'sw-5', name: 'Jira', type: 'Project Management', licenses: 80 },
    { id: 'sw-6', name: 'VS Code', type: 'Development', licenses: 100 },
  ];

  const getSuggestedResources = (role: string, department: string) => {
    const suggestions: { hardware: string[], software: string[] } = {
      hardware: [],
      software: ['sw-1', 'sw-2'],
    };

    if (role.toLowerCase().includes('engineer') || role.toLowerCase().includes('developer')) {
      suggestions.hardware.push('laptop-1', 'monitor-1', 'keyboard-1', 'mouse-1');
      suggestions.software.push('sw-4', 'sw-5', 'sw-6');
    } else if (role.toLowerCase().includes('designer')) {
      suggestions.hardware.push('laptop-1', 'monitor-1', 'mouse-1');
      suggestions.software.push('sw-3');
    } else if (role.toLowerCase().includes('manager') || role.toLowerCase().includes('product')) {
      suggestions.hardware.push('laptop-2', 'monitor-1');
      suggestions.software.push('sw-5');
    } else {
      suggestions.hardware.push('laptop-2');
    }

    return suggestions;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setTimeout(() => {
        setFileValid(file.name.endsWith('.csv') || file.name.endsWith('.xlsx'));
      }, 1000);
    }
  };

  const handleBack = () => {
    if (onboardingStep === 'upload' || onboardingStep === 'manual' || onboardingStep === 'choice') {
      setOnboardingStep('list');
      setUploadedFile(null);
      setFileValid(null);
      setManualStep(1);
    } else if (onboardingStep === 'upload-preview') {
      setOnboardingStep('upload');
      setFileValid(null);
    } else if (onboardingStep === 'assign-resources') {
      if (uploadedFile) {
        setOnboardingStep('upload-preview');
      } else {
        setOnboardingStep('manual');
      }
    } else if (onboardingStep === 'summary') {
      setOnboardingStep('assign-resources');
    }
  };

  const updateEmployeeData = (field: keyof EmployeeData, value: string) => {
    setEmployeeData(prev => ({ ...prev, [field]: value }));
  };

  const toggleEmployeeResource = (employeeId: string, type: 'hardware' | 'software', resourceId: string) => {
    setResourceAssignments(prev => {
      const current = prev[employeeId] || { employeeId, hardware: [], software: [] };
      const resources = current[type];
      const updated = resources.includes(resourceId)
        ? resources.filter(id => id !== resourceId)
        : [...resources, resourceId];
      
      return {
        ...prev,
        [employeeId]: {
          ...current,
          [type]: updated,
        },
      };
    });
  };

  const initializeResourceAssignments = (employeeList: Employee[]) => {
    const assignments: Record<string, ResourceAssignment> = {};
    employeeList.forEach(emp => {
      const suggestions = getSuggestedResources(emp.role, emp.department);
      assignments[emp.id] = {
        employeeId: emp.id,
        hardware: suggestions.hardware,
        software: suggestions.software,
      };
    });
    setResourceAssignments(assignments);
    setOnboardingEmployees(employeeList);
    setCurrentEmployeeIndex(0);
  };

  const handleOffboard = (employeeId: string) => {
    setEmployeeList(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, status: 'Inactive' as const, hardware: [], software: [] }
        : emp
    ));
  };

  const handleUpdateResources = (employeeId: string, hardware: string[], software: string[]) => {
    setEmployeeList(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, hardware, software }
        : emp
    ));
    // Update selected employee to reflect changes immediately
    setSelectedEmployee(prev => 
      prev?.id === employeeId 
        ? { ...prev, hardware, software }
        : prev
    );
  };

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailsOpen(true);
  };

  const handleCompleteOnboarding = () => {
    // Add onboarded employees to the main list with their resource assignments
    const newEmployees = onboardingEmployees.map(emp => {
      const assignment = resourceAssignments[emp.id];
      return {
        ...emp,
        status: 'Active' as const,
        joinDate: new Date().toISOString().split('T')[0],
        location: emp.location || 'Remote',
        hardware: assignment?.hardware || [],
        software: assignment?.software || [],
        phone: employeeData.phone || undefined,
        manager: employeeData.manager || undefined,
        employeeId: employeeData.employeeId || undefined,
      };
    });
    setEmployeeList(prev => [...newEmployees, ...prev]);
    
    // Reset onboarding state
    setOnboardingStep('list');
    setManualStep(1);
    setUploadedFile(null);
    setFileValid(null);
    setResourceAssignments({});
    setOnboardingEmployees([]);
    setCurrentEmployeeIndex(0);
    setEmployeeData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      location: '',
      joinDate: '',
      manager: '',
      employeeId: '',
    });
  };

  // Employee List View
  if (onboardingStep === 'list') {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl text-slate-900 mb-1">Employee Management</h1>
              <p className="text-sm text-slate-600">Manage your organization&apos;s employees and their access</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded text-xs transition-colors ${
                    viewMode === 'table'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded text-xs transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setOnboardingStep('choice')}
                className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Onboard Employee
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Total Employees</div>
              <div className="text-2xl text-slate-900">{employeeList.length}</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Active</div>
              <div className="text-2xl text-slate-900">{employeeList.filter(e => e.status === 'Active').length}</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">Pending</div>
              <div className="text-2xl text-slate-900">{employeeList.filter(e => e.status === 'Pending').length}</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="text-xs text-slate-600 mb-1">This Month</div>
              <div className="text-2xl text-slate-900">12</div>
            </div>
          </div>

          {/* Table View */}
          {viewMode === 'table' && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-slate-600">Name</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600">Email</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600">Role</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600">Department</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600">Hardware</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600">Software</th>
                    <th className="px-4 py-3 text-left text-xs text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeList.map((emp) => (
                    <tr 
                      key={emp.id} 
                      onClick={() => handleEmployeeClick(emp)}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3 text-sm text-slate-900">{emp.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{emp.email}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{emp.role}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{emp.department}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Laptop className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-sm text-slate-600">{emp.hardware?.length || 0}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <KeyIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-sm text-slate-600">{emp.software?.length || 0}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          emp.status === 'Active' ? 'bg-green-100 text-green-700' :
                          emp.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {emp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-3 gap-4">
              {employeeList.map((emp) => (
                <div 
                  key={emp.id} 
                  onClick={() => handleEmployeeClick(emp)}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">{emp.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-slate-900 truncate">{emp.name}</h3>
                      <p className="text-xs text-slate-600 truncate">{emp.role}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs flex-shrink-0 ${
                      emp.status === 'Active' ? 'bg-green-100 text-green-700' :
                      emp.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {emp.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{emp.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{emp.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Joined {emp.joinDate}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Laptop className="w-3.5 h-3.5 text-slate-400" />
                        <span>{emp.hardware?.length || 0} items</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <KeyIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>{emp.software?.length || 0} apps</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Employee Details Overlay */}
        <EmployeeDetailsOverlay
          employee={selectedEmployee}
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedEmployee(null);
          }}
          hardwareOptions={hardwareOptions}
          softwareOptions={softwareOptions}
          onOffboard={handleOffboard}
          onUpdateResources={handleUpdateResources}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* CHOICE SCREEN */}
        {onboardingStep === 'choice' && (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setOnboardingStep('list')}
              className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Employee List
            </button>

            <div className="text-center mb-10">
              <h2 className="text-2xl text-slate-900 mb-2">Onboard Employees</h2>
              <p className="text-sm text-slate-600">Choose how you&apos;d like to add new employees</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => setOnboardingStep('upload')}
                className="bg-white border border-slate-200 rounded-xl p-8 hover:border-slate-900 hover:bg-slate-50 transition-all text-left group"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-900 transition-colors">
                  <Upload className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg text-slate-900 mb-2">Upload File</h3>
                <p className="text-sm text-slate-600 mb-3">Import single or multiple employees using CSV or Excel file</p>
                <div className="text-xs text-slate-500">Supports: .csv, .xlsx</div>
              </button>

              <button
                onClick={() => setOnboardingStep('manual')}
                className="bg-white border border-slate-200 rounded-xl p-8 hover:border-slate-900 hover:bg-slate-50 transition-all text-left group"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-900 transition-colors">
                  <FileText className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg text-slate-900 mb-2">Enter Details Manually</h3>
                <p className="text-sm text-slate-600 mb-3">Add employee information step-by-step through guided wizard</p>
                <div className="text-xs text-slate-500">4 easy steps</div>
              </button>
            </div>
          </div>
        )}

        {/* UPLOAD FILE SCREEN */}
        {onboardingStep === 'upload' && (
          <>
            <button
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl text-slate-900 mb-2">Upload Employee File</h2>
                <p className="text-sm text-slate-600">Upload a CSV or Excel file with employee information</p>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center mb-6 hover:border-slate-400 transition-colors bg-white">
                <input
                  type="file"
                  id="file-upload"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-7 h-7 text-slate-600" />
                  </div>
                  <div className="text-base text-slate-900 mb-1">Click to upload or drag and drop</div>
                  <div className="text-sm text-slate-500">CSV or Excel files (max 10MB)</div>
                </label>
              </div>

              {uploadedFile && (
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center gap-4">
                    <FileText className="w-10 h-10 text-slate-600" />
                    <div className="flex-1">
                      <div className="text-base text-slate-900 mb-1">{uploadedFile.name}</div>
                      <div className="text-sm text-slate-500">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </div>
                    </div>
                    {fileValid === null && (
                      <div className="text-sm text-slate-600">Validating...</div>
                    )}
                    {fileValid === true && (
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span className="text-sm">Valid</span>
                      </div>
                    )}
                    {fileValid === false && (
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm">Invalid format</span>
                      </div>
                    )}
                  </div>

                  {fileValid === false && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="text-sm text-red-800 mb-1">File validation failed</div>
                      <div className="text-xs text-red-600">
                        Please ensure your file contains the required columns: First Name, Last Name, Email, Role, Department
                      </div>
                    </div>
                  )}

                  {fileValid === true && (
                    <div className="mt-6">
                      <button
                        onClick={() => setOnboardingStep('upload-preview')}
                        className="w-full px-5 py-3 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        Continue to Preview
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* UPLOAD PREVIEW SCREEN */}
        {onboardingStep === 'upload-preview' && (
          <>
            <button
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl text-slate-900 mb-2">Review Employees</h2>
                <p className="text-sm text-slate-600">3 employees found in the uploaded file</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-6">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs text-slate-600">Name</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600">Email</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600">Role</th>
                      <th className="px-4 py-3 text-left text-xs text-slate-600">Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewEmployees.map((emp, idx) => (
                      <tr key={idx} className="border-b border-slate-100 last:border-0">
                        <td className="px-4 py-3 text-sm text-slate-900">{emp.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{emp.email}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{emp.role}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{emp.department}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3 max-w-xl mx-auto">
                <button
                  onClick={() => setOnboardingStep('upload')}
                  className="flex-1 px-5 py-3 bg-white border border-slate-200 text-sm text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Upload Different File
                </button>
                <button
                  onClick={() => {
                    initializeResourceAssignments(previewEmployees);
                    setOnboardingStep('assign-resources');
                  }}
                  className="flex-1 px-5 py-3 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Confirm & Continue
                </button>
              </div>
            </div>
          </>
        )}

        {/* MANUAL ENTRY WIZARD */}
        {onboardingStep === 'manual' && (
          <>
            <button
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="max-w-2xl mx-auto">
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      manualStep >= step 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-12 h-0.5 ${
                        manualStep > step ? 'bg-slate-900' : 'bg-slate-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Basic Info */}
              {manualStep === 1 && (
                <div>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl text-slate-900 mb-2">Basic Information</h2>
                    <p className="text-sm text-slate-600">Enter employee&apos;s basic details</p>
                  </div>

                  <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-700 mb-1.5">First Name</label>
                        <input
                          type="text"
                          value={employeeData.firstName}
                          onChange={(e) => updateEmployeeData('firstName', e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-700 mb-1.5">Last Name</label>
                        <input
                          type="text"
                          value={employeeData.lastName}
                          onChange={(e) => updateEmployeeData('lastName', e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={employeeData.email}
                        onChange={(e) => updateEmployeeData('email', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        placeholder="john.doe@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-700 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        value={employeeData.phone}
                        onChange={(e) => updateEmployeeData('phone', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setManualStep(2)}
                    className="w-full mt-6 px-5 py-3 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* Step 2: Additional Info */}
              {manualStep === 2 && (
                <div>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl text-slate-900 mb-2">Additional Information</h2>
                    <p className="text-sm text-slate-600">Role, department, and location details</p>
                  </div>

                  <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
                    <div>
                      <label className="block text-xs text-slate-700 mb-1.5">Job Role</label>
                      <input
                        type="text"
                        value={employeeData.role}
                        onChange={(e) => updateEmployeeData('role', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        placeholder="Software Engineer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-700 mb-1.5">Department</label>
                      <select
                        value={employeeData.department}
                        onChange={(e) => updateEmployeeData('department', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        <option value="">Select department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Product">Product</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-700 mb-1.5">Location</label>
                      <input
                        type="text"
                        value={employeeData.location}
                        onChange={(e) => updateEmployeeData('location', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        placeholder="San Francisco, CA"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-700 mb-1.5">Join Date</label>
                        <input
                          type="date"
                          value={employeeData.joinDate}
                          onChange={(e) => updateEmployeeData('joinDate', e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-700 mb-1.5">Employee ID</label>
                        <input
                          type="text"
                          value={employeeData.employeeId}
                          onChange={(e) => updateEmployeeData('employeeId', e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                          placeholder="EMP-001"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-700 mb-1.5">Manager</label>
                      <input
                        type="text"
                        value={employeeData.manager}
                        onChange={(e) => updateEmployeeData('manager', e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        placeholder="Jane Smith"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setManualStep(1)}
                      className="flex-1 px-5 py-3 bg-white border border-slate-200 text-sm text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setManualStep(3)}
                      className="flex-1 px-5 py-3 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Document Upload */}
              {manualStep === 3 && (
                <div>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl text-slate-900 mb-2">Document Upload</h2>
                    <p className="text-sm text-slate-600">Upload employee documents (optional)</p>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Upload className="w-6 h-6 text-slate-600" />
                      </div>
                      <div className="text-sm text-slate-900 mb-1">Upload documents</div>
                      <div className="text-xs text-slate-500 mb-3">ID proof, contracts, certificates, etc.</div>
                      <button className="px-4 py-2 bg-slate-900 text-xs text-white rounded-lg hover:bg-slate-800 transition-colors">
                        Browse Files
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setManualStep(2)}
                      className="flex-1 px-5 py-3 bg-white border border-slate-200 text-sm text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setManualStep(4)}
                      className="flex-1 px-5 py-3 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Confirm */}
              {manualStep === 4 && (
                <div>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl text-slate-900 mb-2">Review & Confirm</h2>
                    <p className="text-sm text-slate-600">Please review the employee information</p>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Name</div>
                        <div className="text-sm text-slate-900">{employeeData.firstName} {employeeData.lastName}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Email</div>
                        <div className="text-sm text-slate-900">{employeeData.email}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Role</div>
                        <div className="text-sm text-slate-900">{employeeData.role}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Department</div>
                        <div className="text-sm text-slate-900">{employeeData.department}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Location</div>
                        <div className="text-sm text-slate-900">{employeeData.location}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Join Date</div>
                        <div className="text-sm text-slate-900">{employeeData.joinDate}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setManualStep(3)}
                      className="flex-1 px-5 py-3 bg-white border border-slate-200 text-sm text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        const newEmployee: Employee = {
                          id: `emp-manual-${Date.now()}`,
                          name: `${employeeData.firstName} ${employeeData.lastName}`,
                          email: employeeData.email,
                          role: employeeData.role,
                          department: employeeData.department,
                          location: employeeData.location,
                          status: 'Pending',
                        };
                        initializeResourceAssignments([newEmployee]);
                        setOnboardingStep('assign-resources');
                      }}
                      className="flex-1 px-5 py-3 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Continue to Resources
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ASSIGN RESOURCES SCREEN */}
        {onboardingStep === 'assign-resources' && onboardingEmployees[currentEmployeeIndex] && (() => {
          const employee = onboardingEmployees[currentEmployeeIndex];
          const assignment = resourceAssignments[employee.id] || { employeeId: employee.id, hardware: [], software: [] };
          const suggestions = getSuggestedResources(employee.role, employee.department);
          
          return (
            <>
              <button
                onClick={handleBack}
                className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-2xl text-slate-900 mb-2">Assign Resources</h2>
                  <p className="text-sm text-slate-600">Smart suggestions based on role and department</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-base text-slate-900">{employee.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-600">{employee.role}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-600">{employee.department}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-slate-500">
                        {assignment.hardware.length + assignment.software.length} items assigned
                      </div>
                      <div className="px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-700">
                        {currentEmployeeIndex + 1} of {onboardingEmployees.length}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Laptop className="w-4 h-4 text-slate-600" />
                        <h4 className="text-sm text-slate-900">Hardware</h4>
                      </div>
                      <div className="space-y-2">
                        {hardwareOptions.map((hw) => {
                          const isSelected = assignment.hardware.includes(hw.id);
                          const isRecommended = suggestions.hardware.includes(hw.id);
                          
                          return (
                            <button
                              key={hw.id}
                              onClick={() => toggleEmployeeResource(employee.id, 'hardware', hw.id)}
                              className={`w-full p-3 rounded-lg text-left transition-all text-xs ${
                                isSelected
                                  ? 'bg-slate-900 border border-slate-900'
                                  : 'bg-white border border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className={`flex items-center gap-2 mb-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                    <span>{hw.name}</span>
                                    {isRecommended && !isSelected && (
                                      <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                        <Sparkles className="w-3 h-3" />
                                        Recommended
                                      </span>
                                    )}
                                  </div>
                                  <div className={isSelected ? 'text-slate-300' : 'text-slate-500'}>{hw.specs}</div>
                                </div>
                                {isSelected && (
                                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <KeyIcon className="w-4 h-4 text-slate-600" />
                        <h4 className="text-sm text-slate-900">Software & SaaS</h4>
                      </div>
                      <div className="space-y-2">
                        {softwareOptions.map((sw) => {
                          const isSelected = assignment.software.includes(sw.id);
                          const isRecommended = suggestions.software.includes(sw.id);
                          
                          return (
                            <button
                              key={sw.id}
                              onClick={() => toggleEmployeeResource(employee.id, 'software', sw.id)}
                              className={`w-full p-3 rounded-lg text-left transition-all text-xs ${
                                isSelected
                                  ? 'bg-slate-900 border border-slate-900'
                                  : 'bg-white border border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className={`flex items-center gap-2 mb-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                    <span>{sw.name}</span>
                                    {isRecommended && !isSelected && (
                                      <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                        <Sparkles className="w-3 h-3" />
                                        Recommended
                                      </span>
                                    )}
                                  </div>
                                  <div className={isSelected ? 'text-slate-300' : 'text-slate-500'}>{sw.type}</div>
                                </div>
                                {isSelected && (
                                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setCurrentEmployeeIndex(Math.max(0, currentEmployeeIndex - 1))}
                    disabled={currentEmployeeIndex === 0}
                    className="px-4 py-2 bg-white border border-slate-200 text-sm text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  {currentEmployeeIndex < onboardingEmployees.length - 1 ? (
                    <button
                      onClick={() => setCurrentEmployeeIndex(currentEmployeeIndex + 1)}
                      className="px-4 py-2 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
                    >
                      Next Employee
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setOnboardingStep('summary')}
                      className="px-4 py-2 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Review Summary
                    </button>
                  )}
                </div>
              </div>
            </>
          );
        })()}

        {/* SUMMARY SCREEN */}
        {onboardingStep === 'summary' && (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setOnboardingStep('assign-resources')}
              className="mb-6 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="text-center mb-6">
              <h2 className="text-2xl text-slate-900 mb-2">Summary</h2>
              <p className="text-sm text-slate-600">Review all details before finalizing</p>
            </div>
            <div className="space-y-4 mb-8">
              {onboardingEmployees.map((employee) => {
                const assignment = resourceAssignments[employee.id];
                if (!assignment) return null;

                return (
                  <div key={employee.id} className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="mb-4">
                      <h3 className="text-base text-slate-900">{employee.name}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-600">
                        <span>{employee.email}</span>
                        <span className="text-slate-400">•</span>
                        <span>{employee.role}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-xs text-slate-500 mb-2">Hardware ({assignment.hardware.length})</div>
                        <div className="space-y-1">
                          {assignment.hardware.map(id => {
                            const item = hardwareOptions.find(h => h.id === id);
                            return (
                              <div key={id} className="flex items-center gap-2 text-xs">
                                <Check className="w-3 h-3 text-green-600" />
                                <span className="text-slate-900">{item?.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-2">Software ({assignment.software.length})</div>
                        <div className="space-y-1">
                          {assignment.software.map(id => {
                            const item = softwareOptions.find(s => s.id === id);
                            return (
                              <div key={id} className="flex items-center gap-2 text-xs">
                                <Check className="w-3 h-3 text-green-600" />
                                <span className="text-slate-900">{item?.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3 max-w-xl mx-auto">
              <button
                onClick={() => setOnboardingStep('assign-resources')}
                className="flex-1 px-5 py-3 bg-white border border-slate-200 text-sm text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setOnboardingStep('complete')}
                className="flex-1 px-5 py-3 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Complete Onboarding
              </button>
            </div>
          </div>
        )}

        {/* COMPLETE SCREEN */}
        {onboardingStep === 'complete' && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl text-slate-900 mb-3">Onboarding Complete!</h2>
            <p className="text-sm text-slate-600 mb-8">
              {onboardingEmployees.length > 1 
                ? `${onboardingEmployees.length} employees have been successfully onboarded`
                : `${onboardingEmployees[0]?.name} has been successfully onboarded`
              }
            </p>

            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 text-left">
              <h3 className="text-base text-slate-900 mb-4">Next Steps</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-900">Email notifications sent</div>
                    <div className="text-xs text-slate-500">Welcome emails with account details sent to employees</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-900">Assets assigned</div>
                    <div className="text-xs text-slate-500">Hardware and software provisioning in progress</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-900">Team notified</div>
                    <div className="text-xs text-slate-500">Relevant team members have been notified</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleCompleteOnboarding}
              className="px-8 py-3 bg-slate-900 text-sm text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              View Employee List
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
