import { User, Bell, Shield, CreditCard, Globe, Moon } from 'lucide-react';
import { useState } from 'react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-800 mb-1">Settings</h1>
        <p className="text-slate-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'billing' && <BillingSettings />}
          {activeTab === 'preferences' && <PreferenceSettings />}
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 p-6 space-y-6">
      <div>
        <h2 className="text-slate-800 mb-1">Profile Information</h2>
        <p className="text-slate-600 text-sm">Update your personal details and photo</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg shadow-blue-500/20">
          SA
        </div>
        <div>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg">
            Change Photo
          </button>
          <p className="text-slate-500 text-sm mt-2">JPG, PNG or GIF. Max size 2MB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-700 mb-2">First Name</label>
          <input
            type="text"
            defaultValue="Sarah"
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-slate-700 mb-2">Last Name</label>
          <input
            type="text"
            defaultValue="Anderson"
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-slate-700 mb-2">Email</label>
          <input
            type="email"
            defaultValue="sarah.a@orchestrix.com"
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-slate-700 mb-2">Phone</label>
          <input
            type="tel"
            defaultValue="+1 (555) 123-4567"
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-slate-700 mb-2">Bio</label>
        <textarea
          rows={4}
          defaultValue="Experienced project manager with a passion for delivering exceptional results."
          className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
          Cancel
        </button>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function NotificationSettings() {
  const settings = [
    { id: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
    { id: 'push', label: 'Push Notifications', description: 'Receive push notifications on your devices' },
    { id: 'project', label: 'Project Updates', description: 'Get notified about project changes' },
    { id: 'team', label: 'Team Activities', description: 'Get notified about team member activities' },
    { id: 'mentions', label: 'Mentions', description: 'Get notified when someone mentions you' },
  ];

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 p-6 space-y-6">
      <div>
        <h2 className="text-slate-800 mb-1">Notification Preferences</h2>
        <p className="text-slate-600 text-sm">Manage how you receive notifications</p>
      </div>

      <div className="space-y-4">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between py-3 border-b border-slate-200 last:border-0">
            <div>
              <p className="text-slate-800">{setting.label}</p>
              <p className="text-slate-600 text-sm">{setting.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 p-6 space-y-4">
        <div>
          <h2 className="text-slate-800 mb-1">Change Password</h2>
          <p className="text-slate-600 text-sm">Update your password to keep your account secure</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-700 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-slate-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-slate-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg">
          Update Password
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 p-6">
        <div className="mb-4">
          <h2 className="text-slate-800 mb-1">Two-Factor Authentication</h2>
          <p className="text-slate-600 text-sm">Add an extra layer of security to your account</p>
        </div>
        <button className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
          Enable 2FA
        </button>
      </div>
    </div>
  );
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 p-6">
        <div className="mb-6">
          <h2 className="text-slate-800 mb-1">Current Plan</h2>
          <p className="text-slate-600 text-sm">You are currently on the Enterprise plan</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl text-white mb-6 shadow-lg shadow-blue-500/20">
          <p className="text-blue-100 mb-2">Enterprise Plan</p>
          <p className="text-4xl mb-4">$99<span className="text-xl">/month</span></p>
          <p className="text-blue-100">Unlimited projects, team members, and storage</p>
        </div>

        <button className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
          Change Plan
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 p-6">
        <div className="mb-4">
          <h2 className="text-slate-800 mb-1">Payment Method</h2>
          <p className="text-slate-600 text-sm">Manage your payment information</p>
        </div>

        <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl mb-4">
          <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center text-white text-xs">
            VISA
          </div>
          <div className="flex-1">
            <p className="text-slate-800">•••• •••• •••• 4242</p>
            <p className="text-slate-600 text-sm">Expires 12/2025</p>
          </div>
        </div>

        <button className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
          Update Payment Method
        </button>
      </div>
    </div>
  );
}

function PreferenceSettings() {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-slate-200 p-6 space-y-6">
      <div>
        <h2 className="text-slate-800 mb-1">Preferences</h2>
        <p className="text-slate-600 text-sm">Customize your experience</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-slate-700 mb-2">Language</label>
          <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-700 mb-2">Timezone</label>
          <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Pacific Time (PT)</option>
            <option>Mountain Time (MT)</option>
            <option>Central Time (CT)</option>
            <option>Eastern Time (ET)</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-700 mb-2">Date Format</label>
          <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-slate-200">
          <div>
            <p className="text-slate-800">Dark Mode</p>
            <p className="text-slate-600 text-sm">Use dark theme across the application</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600"></div>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
        <button className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
          Cancel
        </button>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg">
          Save Preferences
        </button>
      </div>
    </div>
  );
}