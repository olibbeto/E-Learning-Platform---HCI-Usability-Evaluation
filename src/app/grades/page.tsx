'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface GradeEntry {
  id: string;
  assignment: string;
  course: string;
  type: 'Assignment' | 'Quiz';
  score: number;
  maxScore: number;
  date: string;
}

const mockGradeEntries: GradeEntry[] = [
  { id: '1', assignment: 'React Basics', course: 'Frontend Web Dev', type: 'Assignment', score: 95, maxScore: 100, date: '2026-08-25' },
  { id: '2', assignment: 'State Management Quiz', course: 'Frontend Web Dev', type: 'Quiz', score: 80, maxScore: 100, date: '2026-08-28' },
  { id: '3', assignment: 'UI Design Patterns', course: 'UI/UX Design', type: 'Assignment', score: 88, maxScore: 100, date: '2026-08-20' },
  { id: '4', assignment: 'Color Theory', course: 'UI/UX Design', type: 'Quiz', score: 100, maxScore: 100, date: '2026-08-15' },
  { id: '5', assignment: 'Algorithms', course: 'Computer Science', type: 'Assignment', score: 72, maxScore: 100, date: '2026-08-10' },
];

function useApp() {
  return { gradeEntries: mockGradeEntries };
}

export default function GradesPage() {
  const { gradeEntries } = useApp();
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  // Computed data
  const totalScore = gradeEntries.reduce((acc, g) => acc + (g.score / g.maxScore) * 100, 0);
  const overallAverage = Math.round(totalScore / gradeEntries.length);
  
  const getLetter = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  const getBarColor = (score: number) => {
    if (score > 80) return '#10B981'; // green-500
    if (score > 60) return '#3B82F6'; // blue-500
    if (score > 50) return '#F59E0B'; // amber-500
    return '#EF4444'; // red-500
  };

  // Group by course
  const coursesMap = gradeEntries.reduce((acc, entry) => {
    if (!acc[entry.course]) acc[entry.course] = { entries: [], total: 0 };
    acc[entry.course].entries.push(entry);
    acc[entry.course].total += (entry.score / entry.maxScore) * 100;
    return acc;
  }, {} as Record<string, { entries: GradeEntry[], total: number }>);

  const courses = Object.keys(coursesMap).map(courseName => ({
    name: courseName,
    average: Math.round(coursesMap[courseName].total / coursesMap[courseName].entries.length),
    entries: coursesMap[courseName].entries
  }));

  const chartData = courses.map(c => ({
    name: c.name,
    score: c.average
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Grades</h1>

        {/* Top Section: Overall & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Overall Average Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center text-center">
            <h2 className="text-lg font-medium text-gray-500 mb-2">Overall Average</h2>
            <div className="flex items-end justify-center gap-4 mb-2">
              <span className="text-6xl font-extrabold text-gray-900">{overallAverage}%</span>
              <span className="text-4xl font-bold text-indigo-600 pb-1">{getLetter(overallAverage)}</span>
            </div>
            <p className="text-sm text-gray-500">Based on {gradeEntries.length} graded items</p>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Grade Distribution by Course</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip cursor={{fill: '#f3f4f6'}} />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Course Breakdown */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Breakdown</h2>
          <div className="space-y-4">
            {courses.map(course => (
              <div key={course.name} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button 
                  onClick={() => setExpandedCourse(expandedCourse === course.name ? null : course.name)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 text-left">{course.name}</h3>
                    <div className="mt-2 flex items-center max-w-md">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ width: `${course.average}%`, backgroundColor: getBarColor(course.average) }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{course.average}%</span>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${expandedCourse === course.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                
                {expandedCourse === course.name && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <table className="min-w-full">
                      <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <th className="pb-3">Item</th>
                          <th className="pb-3">Type</th>
                          <th className="pb-3">Score</th>
                          <th className="pb-3">Date</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {course.entries.map(entry => (
                          <tr key={entry.id} className="border-t border-gray-200">
                            <td className="py-3 text-gray-900 font-medium">{entry.assignment}</td>
                            <td className="py-3 text-gray-500">{entry.type}</td>
                            <td className="py-3">
                              <span className={`font-semibold ${getBarColor(entry.score) === '#10B981' ? 'text-green-600' : 'text-gray-900'}`}>
                                {entry.score}/{entry.maxScore}
                              </span>
                            </td>
                            <td className="py-3 text-gray-500">{new Date(entry.date).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Grades Table */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Grades</h2>
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {gradeEntries.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.assignment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.course}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{entry.score}/{entry.maxScore}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
