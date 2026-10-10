'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { User, Bell, Palette, Accessibility, AlertTriangle, Check, Monitor, Moon, Sun, Type } from 'lucide-react';

type TabType = 'account' | 'notifications' | 'appearance' | 'accessibility';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('account');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings State
  const [notifyAnnouncements, setNotifyAnnouncements] = useState(true);
  const [notifyAssignments, setNotifyAssignments] = useState(true);
  const [notifyGrades, setNotifyGrades] = useState(true);
  const [notifyLessons, setNotifyLessons] = useState(false);
  const [notifySummary, setNotifySummary] = useState(true);

  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState('medium');

  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Load from localStorage for reduce motion
  useEffect(() => {
    const saved = localStorage.getItem('reduceMotion');
    if (saved) setReduceMotion(JSON.parse(saved));
  }, []);

  const handleReduceMotionChange = (val: boolean) => {
    setReduceMotion(val);
    localStorage.setItem('reduceMotion', JSON.stringify(val));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Password updated successfully');
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <Navbar />

      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-bold">Delete Account</h3>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to delete your account? This action is permanent and cannot be undone. All your progress will be lost.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowDeleteModal(false);
                  showToast('Account deletion requested');
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left Navigation */}
          <nav className="w-full md:w-64 shrink-0 flex flex-col gap-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                >
                  <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right Content */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
            
            {/* ACCOUNT TAB */}
            {activeTab === 'account' && (
              <div className="p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="flex">
                    <input 
                      type="email" 
                      disabled 
                      value="alex.johnson@example.com"
                      className="w-full max-w-md bg-gray-50 border-gray-200 text-gray-500 rounded-md shadow-sm sm:text-sm p-2.5 border"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">To change your email, please contact support.</p>
                </div>

                <div className="border-t border-gray-100 pt-8 mb-8">
                  <h3 className="text-md font-bold text-gray-900 mb-4">Change Password</h3>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input type="password" required className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input type="password" required className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input type="password" required className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border" />
                    </div>
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                      Update Password
                    </button>
                  </form>
                </div>

                <div className="border-t border-red-100 pt-8 mt-12">
                  <h3 className="text-md font-bold text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-600 mb-4">Permanently delete your account and all associated data.</p>
                  <button 
                    onClick={() => setShowDeleteModal(true)}
                    className="border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className="p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  {[
                    { label: 'Email notifications for new announcements', state: notifyAnnouncements, setter: setNotifyAnnouncements, desc: 'Get an email when a course instructor posts a new announcement.' },
                    { label: 'Assignment due reminders', state: notifyAssignments, setter: setNotifyAssignments, desc: 'Receive a reminder 48 hours before an assignment is due.' },
                    { label: 'Grade notifications', state: notifyGrades, setter: setNotifyGrades, desc: 'Be notified when your assignment or quiz has been graded.' },
                    { label: 'New lesson available', state: notifyLessons, setter: setNotifyLessons, desc: 'Get notified when new course content is unlocked.' },
                    { label: 'Weekly progress summary', state: notifySummary, setter: setNotifySummary, desc: 'Receive a weekly email summarizing your learning activity.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between">
                      <div className="pr-8">
                        <h3 className="text-sm font-medium text-gray-900">{item.label}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                      </div>
                      <button 
                        onClick={() => item.setter(!item.state)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${item.state ? 'bg-indigo-600' : 'bg-gray-200'}`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.state ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* APPEARANCE TAB */}
            {activeTab === 'appearance' && (
              <div className="p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Appearance</h2>
                <p className="text-sm text-gray-500 mb-8 bg-blue-50 text-blue-700 p-3 rounded-md border border-blue-100">
                  Note: Theme changes will be applied on next page load in this demo.
                </p>
                
                <div className="mb-10">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Theme Preference</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'light', label: 'Light', icon: Sun },
                      { id: 'dark', label: 'Dark', icon: Moon },
                      { id: 'system', label: 'System', icon: Monitor },
                    ].map(t => {
                      const Icon = t.icon;
                      const isSelected = theme === t.id;
                      return (
                        <div 
                          key={t.id}
                          onClick={() => setTheme(t.id)}
                          className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${isSelected ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <Icon size={24} className={`mb-3 ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`} />
                          <span className={`text-sm font-medium ${isSelected ? 'text-indigo-900' : 'text-gray-700'}`}>{t.label}</span>
                          {isSelected && (
                            <div className="absolute top-2 right-2 text-indigo-600">
                              <Check size={16} />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Font Size</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'small', label: 'Small', text: 'Aa' },
                      { id: 'medium', label: 'Medium', text: 'Aa' },
                      { id: 'large', label: 'Large', text: 'Aa' },
                    ].map(s => {
                      const isSelected = fontSize === s.id;
                      return (
                        <div 
                          key={s.id}
                          onClick={() => setFontSize(s.id)}
                          className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${isSelected ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <span className={`mb-2 font-medium ${s.id === 'small' ? 'text-sm' : s.id === 'medium' ? 'text-base' : 'text-lg'} ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`}>{s.text}</span>
                          <span className={`text-sm font-medium ${isSelected ? 'text-indigo-900' : 'text-gray-700'}`}>{s.label}</span>
                          {isSelected && (
                            <div className="absolute top-2 right-2 text-indigo-600">
                              <Check size={16} />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ACCESSIBILITY TAB */}
            {activeTab === 'accessibility' && (
              <div className="p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Accessibility Settings</h2>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-start justify-between pb-6 border-b border-gray-100">
                    <div className="pr-8">
                      <h3 className="text-sm font-medium text-gray-900">Reduce motion</h3>
                      <p className="text-sm text-gray-500 mt-1">Minimizes animations and transitions across the interface.</p>
                    </div>
                    <button 
                      onClick={() => handleReduceMotionChange(!reduceMotion)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${reduceMotion ? 'bg-indigo-600' : 'bg-gray-200'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${reduceMotion ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  
                  <div className="flex items-start justify-between pb-6 border-b border-gray-100">
                    <div className="pr-8">
                      <h3 className="text-sm font-medium text-gray-900">High contrast mode</h3>
                      <p className="text-sm text-gray-500 mt-1">Increases color contrast for better readability.</p>
                    </div>
                    <button 
                      onClick={() => setHighContrast(!highContrast)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${highContrast ? 'bg-indigo-600' : 'bg-gray-200'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${highContrast ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Type size={18} className="text-gray-700" />
                    <h3 className="text-md font-semibold text-gray-900">Keyboard Navigation Guide</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    LearnEase is fully navigable via keyboard. Use the <strong>Tab</strong> key to move forward through interactive elements, and <strong>Shift + Tab</strong> to move backward. Press <strong>Enter</strong> or <strong>Space</strong> to activate buttons and links. Use arrow keys to navigate through menus and calendars.
                  </p>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
