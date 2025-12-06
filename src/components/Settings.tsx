import { User, Bell, Shield, Globe } from 'lucide-react';
import { useState } from 'react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl text-slate-900 mb-1">Settings</h1>
            <p className="text-sm text-slate-600">Manage your account settings and preferences</p>
          </div>

          {/* Settings Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Tabs Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-slate-200 p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-slate-900 text-white'
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
              {activeTab === 'preferences' && <PreferenceSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
      <div>
        <h2 className="text-lg text-slate-900 mb-1">Profile Information</h2>
        <p className="text-sm text-slate-600">Update your personal details and photo</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <span className="text-3xl">SA</span>
        </div>
        <div>
          <button className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
            Change Photo
          </button>
          <p className="text-xs text-slate-500 mt-2">JPG, PNG or GIF. Max size 2MB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-600 mb-2 block">First Name</label>
          <input
            type="text"
            defaultValue="Sarah"
            className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs text-slate-600 mb-2 block">Last Name</label>
          <input
            type="text"
            defaultValue="Anderson"
            className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs text-slate-600 mb-2 block">Email</label>
          <input
            type="email"
            defaultValue="sarah.a@orchestrix.com"
            className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-xs text-slate-600 mb-2 block">Phone</label>
          <input
            type="tel"
            defaultValue="+1 (555) 123-4567"
            className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-slate-600 mb-2 block">Bio</label>
        <textarea
          rows={4}
          defaultValue="Experienced project manager with a passion for delivering exceptional results."
          className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
        <button className="px-6 py-2.5 text-sm bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2.5 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
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
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
      <div>
        <h2 className="text-lg text-slate-900 mb-1">Notification Preferences</h2>
        <p className="text-sm text-slate-600">Manage how you receive notifications</p>
      </div>

      <div className="space-y-4">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between py-3 border-b border-slate-200 last:border-0">
            <div>
              <p className="text-sm text-slate-900">{setting.label}</p>
              <p className="text-xs text-slate-600">{setting.description}</p>
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
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div>
          <h2 className="text-lg text-slate-900 mb-1">Change Password</h2>
          <p className="text-sm text-slate-600">Update your password to keep your account secure</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-600 mb-2 block">Current Password</label>
            <input
              type="password"
              className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 mb-2 block">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs text-slate-600 mb-2 block">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button className="px-6 py-2.5 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="mb-4">
          <h2 className="text-lg text-slate-900 mb-1">Two-Factor Authentication</h2>
          <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
        </div>
        <button className="px-6 py-2.5 text-sm bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
          Enable 2FA
        </button>
      </div>
    </div>
  );
}

function PreferenceSettings() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
      <div>
        <h2 className="text-lg text-slate-900 mb-1">Preferences</h2>
        <p className="text-sm text-slate-600">Customize your experience</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-slate-600 mb-2 block">Language</label>
          <select className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-600 mb-2 block">Timezone</label>
          <select className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Pacific Time (PT)</option>
            <option>Mountain Time (MT)</option>
            <option>Central Time (CT)</option>
            <option>Eastern Time (ET)</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-600 mb-2 block">Date Format</label>
          <select className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-slate-200">
          <div>
            <p className="text-sm text-slate-900">Dark Mode</p>
            <p className="text-xs text-slate-600">Use dark theme across the application</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
        <button className="px-6 py-2.5 text-sm bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2.5 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
}