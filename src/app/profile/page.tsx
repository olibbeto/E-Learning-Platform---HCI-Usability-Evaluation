'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { useApp } from '@/context/AppContext';
import { Edit2, Save, X, BookOpen, Clock, Star, Megaphone } from 'lucide-react';

const courses = [
  { id: 'c1', name: 'Human-Computer Interaction', progress: 72, color: 'bg-indigo-500' },
  { id: 'c2', name: 'Advanced Web Development', progress: 45, color: 'bg-blue-500' },
  { id: 'c3', name: 'Introduction to Cybersecurity', progress: 28, color: 'bg-amber-500' },
];

const iconMap = {
  assignment: Clock,
  grade: Star,
  lesson: BookOpen,
  announcement: Megaphone
};

export default function ProfilePage() {
  const { updateProfile, notifications } = useApp();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Passionate student interested in web development and UX design. Always looking for new ways to learn and build things.',
    joinDate: 'September 2025'
  });
  
  const [editForm, setEditForm] = useState(profile);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = () => {
    setProfile(editForm);
    updateProfile(editForm);
    setIsEditing(false);
    setToastMessage('Profile updated successfully');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const initials = profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const recentActivity = [...notifications].slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <Navbar />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col md:flex-row gap-8 items-start md:items-center relative">
          <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold shrink-0 shadow-inner">
            {initials}
          </div>
          
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    id="profile-name"
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    onInput={(e) => setEditForm({...editForm, name: (e.target as HTMLInputElement).value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea 
                    id="profile-bio"
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    onInput={(e) => setEditForm({...editForm, bio: (e.target as HTMLTextAreaElement).value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{profile.name}</h1>
                <p className="text-gray-500 mb-3">{profile.email} • Joined {profile.joinDate}</p>
                <p className="text-gray-700 max-w-2xl leading-relaxed">{profile.bio}</p>
              </div>
            )}
          </div>
          
          <div className="md:self-start flex gap-2">
            {isEditing ? (
              <>
                <button 
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Courses Enrolled</h3>
            <p className="text-2xl font-bold text-gray-900">3</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Lessons Completed</h3>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Average Grade</h3>
            <p className="text-2xl font-bold text-gray-900">92%</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Days Active</h3>
            <p className="text-2xl font-bold text-gray-900">45</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Enrolled Courses */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Enrolled Courses</h2>
            </div>
            <div className="p-6 space-y-6 flex-1">
              {courses.map(course => (
                <div key={course.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-medium text-gray-900 truncate pr-4">{course.name}</h3>
                    <span className="text-sm font-bold text-gray-700 shrink-0">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                    <div className={`h-2 rounded-full ${course.color}`} style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <div className="flex justify-end">
                    <Link href="/my-learning" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                      Continue →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-0 flex-1">
              {recentActivity.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No recent activity.</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {recentActivity.map(activity => {
                    const Icon = iconMap[activity.type as keyof typeof iconMap] || BookOpen;
                    return (
                      <div key={activity.id} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                        <div className="mt-0.5 shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          <Icon size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-0.5">{activity.title}</p>
                          <p className="text-sm text-gray-600 line-clamp-2">{activity.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
