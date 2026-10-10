'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CheckCircle, Award, Star, Flame, Moon } from 'lucide-react';

const achievements = [
  { id: 1, title: 'First Steps', description: 'Complete your first lesson', earnedDate: '2026-08-15', icon: CheckCircle, earned: true },
  { id: 2, title: 'Quiz Master', description: 'Score 100% on a quiz', earnedDate: '2026-08-20', icon: Award, earned: true },
  { id: 3, title: 'Assignment Ace', description: 'Submit 5 assignments', earnedDate: '2026-08-25', icon: Star, earned: true },
  { id: 4, title: 'Streak: 7 Days', description: 'Log in for 7 consecutive days', earnedDate: null, icon: Flame, earned: false },
  { id: 5, title: 'Night Owl', description: 'Complete a lesson after 10 PM', earnedDate: null, icon: Moon, earned: false },
];

const weeklyActivity = [
  { day: 'Mon', lessons: 2 },
  { day: 'Tue', lessons: 1 },
  { day: 'Wed', lessons: 3 },
  { day: 'Thu', lessons: 0 },
  { day: 'Fri', lessons: 2 },
  { day: 'Sat', lessons: 1 },
  { day: 'Sun', lessons: 0 },
];

const courses = [
  { id: 'c1', name: 'HCI', progress: 72, colorClass: 'bg-indigo-500', textClass: 'text-indigo-500' },
  { id: 'c2', name: 'Web Dev', progress: 45, colorClass: 'bg-blue-500', textClass: 'text-blue-500' },
  { id: 'c3', name: 'Cybersecurity', progress: 28, colorClass: 'bg-amber-500', textClass: 'text-amber-500' },
];

export default function ProgressPage() {
  const router = useRouter();

  const handleContinue = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };
  const overallProgress = 72;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallProgress / 100) * circumference;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Progress</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Overall Progress */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Overall completion</h2>
            <div className="relative flex items-center justify-center w-40 h-40">
              <svg className="transform -rotate-90 w-40 h-40">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="text-indigo-600 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{overallProgress}%</span>
              </div>
            </div>
          </div>

          {/* Course Progress */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Course Progress</h2>
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${course.colorClass}`}></div>
                      <span className="font-medium text-gray-800">{course.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-500">{course.progress}% complete</span>
                      <button onClick={() => handleContinue(course.id)} className={`text-sm font-medium hover:underline ${course.textClass}`}>
                        → Continue
                      </button>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${course.colorClass}`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Lessons completed</h3>
            <p className="text-3xl font-bold text-gray-900">24</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Quizzes completed</h3>
            <p className="text-3xl font-bold text-gray-900">1</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Assignments submitted</h3>
            <p className="text-3xl font-bold text-gray-900">5</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly activity chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Weekly Activity</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                  <Bar dataKey="lessons" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((ach) => {
                const Icon = ach.icon;
                return (
                  <div key={ach.id} className={`flex items-start p-3 rounded-lg border ${ach.earned ? 'border-indigo-100 bg-indigo-50/50' : 'border-gray-100 bg-gray-50 opacity-70'}`}>
                    <div className={`p-2 rounded-full mr-3 shrink-0 ${ach.earned ? 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-200 ring-offset-1' : 'bg-gray-200 text-gray-400'}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className={`font-semibold text-sm ${ach.earned ? 'text-gray-900' : 'text-gray-500'}`}>{ach.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{ach.description}</p>
                      <p className="text-xs font-medium mt-1 text-gray-400">
                        {ach.earned ? `Earned: ${ach.earnedDate}` : 'Not yet earned'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
