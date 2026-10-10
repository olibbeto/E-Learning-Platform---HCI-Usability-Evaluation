'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  CheckCircle, 
  PlayCircle,
  TrendingUp,
  Award,
  ChevronRight
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { useApp } from '@/context/AppContext';

export default function DashboardPage() {
  const { enrolledCourses, allCourses, assignments } = useApp();
  const [greeting, setGreeting] = useState('Good morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting('Good afternoon');
    else if (hour >= 17) setGreeting('Good evening');
    else setGreeting('Good morning');
  }, []);

  const upcomingAssignments = assignments
    ? assignments.filter((a: any) => a.status === 'not_submitted' && new Date(a.dueDate) >= new Date())
    : [];

  const recommendedCourses = allCourses
    ? allCourses.filter((c: any) => !enrolledCourses?.some((ec: any) => ec.courseId === c.id)).slice(0, 3)
    : [];

  const lessonsCompleted = enrolledCourses?.reduce((acc: number, curr: any) => {
    return acc + Math.floor((curr.progress / 100) * (curr.course?.totalLessons || 10));
  }, 0) || 0;

  const averageGrade = assignments && assignments.length > 0 
    ? Math.round(assignments.filter((a:any) => a.grade).reduce((acc:number, curr:any) => acc + curr.grade, 0) / (assignments.filter((a:any) => a.grade).length || 1))
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{greeting}, Alex 👋</h1>
            <p className="text-gray-500 mt-1">Here's what you need to focus on today.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-indigo-50 px-4 py-2 rounded-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span className="font-medium text-indigo-900">{enrolledCourses?.length || 0} courses enrolled</span>
            </div>
            <div className="bg-orange-50 px-4 py-2 rounded-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-orange-900">{upcomingAssignments?.length || 0} assignments due</span>
            </div>
          </div>
        </div>

        {/* Overall Progress Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard title="Courses in Progress" value={enrolledCourses?.length || 0} icon={<TrendingUp className="w-6 h-6 text-blue-600" />} bg="bg-blue-50" />
          <StatCard title="Courses Completed" value={0} icon={<CheckCircle className="w-6 h-6 text-green-600" />} bg="bg-green-50" />
          <StatCard title="Lessons Completed" value={lessonsCompleted} icon={<PlayCircle className="w-6 h-6 text-purple-600" />} bg="bg-purple-50" />
          <StatCard title="Average Grade" value={`${averageGrade || '--'}%`} icon={<Award className="w-6 h-6 text-yellow-600" />} bg="bg-yellow-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
                <Link href="/my-learning" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View all</Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {enrolledCourses && enrolledCourses.length > 0 ? (
                  enrolledCourses.map((ec: any) => (
                    <div key={ec.courseId} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-lg shrink-0 flex items-center justify-center text-white font-bold text-xl ${ec.course?.color || 'bg-gradient-to-br from-indigo-500 to-purple-600'}`}>
                          {ec.course?.title?.charAt(0) || 'C'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{ec.course?.title}</h3>
                          <p className="text-sm text-gray-500 truncate">{ec.course?.instructor}</p>
                        </div>
                      </div>
                      
                      <div className="mt-auto space-y-3">
                        <div className="flex justify-between text-xs font-medium text-gray-500">
                          <span>Lesson {Math.max(1, Math.floor((ec.progress / 100) * (ec.course?.totalLessons || 10)))} of {ec.course?.totalLessons || 10}</span>
                          <span>{ec.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${ec.progress}%` }}></div>
                        </div>
                        
                        <Link 
                          href={`/learn/${ec.courseId}/${ec.lastLessonId || '1'}`}
                          className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
                        >
                          Continue Learning <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 bg-white rounded-xl border border-gray-100 p-8 text-center">
                    <p className="text-gray-500">You haven't enrolled in any courses yet.</p>
                    <Link href="/courses" className="mt-4 inline-block text-indigo-600 font-medium hover:underline">Explore courses</Link>
                  </div>
                )}
              </div>
            </section>

            {/* Upcoming Deadlines */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Deadlines</h2>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {upcomingAssignments && upcomingAssignments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {upcomingAssignments.map((assignment: any) => (
                          <tr key={assignment.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-medium text-gray-900">{assignment.title}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {assignment.courseName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-orange-500" />
                                {formatRelativeDate(assignment.dueDate)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                                Pending
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link href={`/assignments/${assignment.id}`} className="text-indigo-600 hover:text-indigo-900">
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <CheckCircle className="w-12 h-12 text-green-200 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">You're all caught up!</p>
                    <p className="text-sm text-gray-400 mt-1">No upcoming deadlines.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Recommended Courses */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended for You</h2>
              <div className="space-y-4">
                {recommendedCourses.map((course: any) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4">
                    <div className={`w-16 h-16 rounded-lg shrink-0 flex items-center justify-center text-white font-bold text-2xl ${course.color || 'bg-gradient-to-br from-indigo-500 to-purple-600'}`}>
                      {course.title.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 line-clamp-2 leading-tight">{course.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{course.category}</p>
                      <Link 
                        href={`/courses/${course.id}`}
                        className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        Enroll now &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, bg }: { title: string, value: string | number, icon: React.ReactNode, bg: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${bg}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function formatRelativeDate(dateString: string) {
  const due = new Date(dateString);
  const now = new Date();
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
  return due.toLocaleDateString();
}
