'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { useApp } from '@/context/AppContext';
import { Clock, Star, BookOpen, Megaphone, CheckCircle2 } from 'lucide-react';

const iconMap = {
  assignment: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100' },
  grade: { icon: Star, color: 'text-green-500', bg: 'bg-green-100' },
  lesson: { icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-100' },
  announcement: { icon: Megaphone, color: 'text-indigo-500', bg: 'bg-indigo-100' }
};

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-indigo-100 text-indigo-700 py-0.5 px-2.5 rounded-full text-xs font-bold">
                {unreadCount} new
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('unread')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'unread' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Unread
              </button>
            </div>
            {unreadCount > 0 && (
              <button 
                onClick={markAllNotificationsRead}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <CheckCircle2 size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">You're all caught up!</h3>
              <p className="text-gray-500">No {filter === 'unread' ? 'unread ' : ''}notifications at this time.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => {
                const typeConfig = iconMap[notification.type as keyof typeof iconMap];
                const Icon = typeConfig.icon;
                
                return (
                  <div 
                    key={notification.id}
                    onClick={() => !notification.read && markNotificationRead(notification.id)}
                    className={`relative p-5 flex gap-4 transition-colors cursor-pointer hover:bg-gray-50 ${!notification.read ? 'bg-blue-50/30' : ''}`}
                  >
                    {/* Unread Indicator */}
                    {!notification.read && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-blue-500 rounded-r-full"></span>
                    )}
                    
                    {/* Icon */}
                    <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${typeConfig.bg}`}>
                      <Icon size={20} className={typeConfig.color} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <p className={`text-sm truncate ${!notification.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                          {notification.title}
                        </p>
                        <span className="text-xs text-gray-500 shrink-0 whitespace-nowrap">
                          {notification.timestamp}
                        </span>
                      </div>
                      <p className={`text-sm ${!notification.read ? 'text-gray-800' : 'text-gray-500'}`}>
                        {notification.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
      </main>
    </div>
  );
}
