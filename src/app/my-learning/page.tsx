'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronRight, Award, PlayCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { useApp } from '@/context/AppContext';

export default function MyLearningPage() {
  const { enrolledCourses } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'In Progress' | 'Completed'>('All');

  const filteredCourses = enrolledCourses?.filter((ec: any) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'In Progress') return ec.progress < 100;
    if (activeTab === 'Completed') return ec.progress >= 100;
    return true;
  }) || [];

  const totalEnrolled = enrolledCourses?.length || 0;
  const completed = enrolledCourses?.filter((ec: any) => ec.progress >= 100).length || 0;
  const inProgress = totalEnrolled - completed;
  
  // Calculate avg grade from enrolled courses if they have grades, else use demo logic
  const averageGrade = enrolledCourses?.filter((ec: any) => ec.grade).length 
    ? Math.round(enrolledCourses.filter((ec: any) => ec.grade).reduce((acc: number, curr: any) => acc + curr.grade, 0) / enrolledCourses.filter((ec: any) => ec.grade).length)
    : '--';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header & Stats */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Learning</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Total Enrolled</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalEnrolled}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{inProgress}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{completed}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Average Grade</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{averageGrade}{averageGrade !== '--' ? '%' : ''}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {['All', 'In Progress', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Course List */}
        {filteredCourses.length > 0 ? (
          <div className="space-y-6">
            {filteredCourses.map((ec: any) => {
              const course = ec;
              const currentLessonNum = Math.max(1, Math.floor((ec.progress / 100) * (course.totalLessons || 10)));
              const instructorName = typeof course.instructor === 'string'
                ? course.instructor
                : course.instructor?.name || 'Instructor';
              
              return (
                <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col sm:flex-row">
                  <div className={`sm:w-64 h-40 sm:h-auto ${course.color || 'bg-gradient-to-br from-indigo-500 to-purple-600'} relative flex items-center justify-center shrink-0`}>
                    {course.image ? (
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    ) : (
                      <BookOpen className="w-16 h-16 text-white/30" />
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-500">{instructorName}</p>
                      </div>
                      
                      {ec.grade && (
                        <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-800 px-3 py-1.5 rounded-lg text-sm font-semibold">
                          <Award className="w-4 h-4" />
                          <span>Grade: {ec.grade}%</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-auto pt-6 space-y-4">
                      <div>
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1.5">
                          <span>{ec.progress}% complete</span>
                          <span className="text-gray-500 font-normal">Lesson {currentLessonNum} of {course.totalLessons || 10}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${ec.progress >= 100 ? 'bg-green-500' : 'bg-indigo-600'}`} 
                            style={{ width: `${ec.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Link 
                          href={`/learn/${ec.courseId}/${ec.lastLessonId || '1'}`}
                          className={`
                            inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors
                            ${ec.progress >= 100 
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                              : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }
                          `}
                        >
                          {ec.progress >= 100 ? 'Review Course' : 'Continue Learning'}
                          {ec.progress < 100 && <ChevronRight className="w-4 h-4" />}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 py-20 px-4 text-center">
            {activeTab === 'Completed' ? (
              <>
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900">No completed courses yet</h3>
                <p className="text-gray-500 mt-2 max-w-md mx-auto">Keep up the good work! Your completed courses will appear here.</p>
              </>
            ) : (
              <>
                <PlayCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900">No courses in progress</h3>
                <p className="text-gray-500 mt-2">You haven't enrolled in any courses yet.</p>
                <Link href="/courses" className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  Explore Courses
                </Link>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

