'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import Link from 'next/link';

// Mock contexts and data for completeness
interface Assignment {
  id: string;
  title: string;
  course: string;
  status: 'not_submitted' | 'submitted' | 'graded';
  dueDate: string;
  maxScore: number;
}

const mockAssignments: Assignment[] = [
  { id: '1', title: 'React Basics', course: 'Frontend Web Development', status: 'not_submitted', dueDate: '2026-09-05T23:59:59', maxScore: 100 },
  { id: '2', title: 'State Management', course: 'Frontend Web Development', status: 'submitted', dueDate: '2026-09-01T23:59:59', maxScore: 100 },
  { id: '3', title: 'UI Design Patterns', course: 'UI/UX Design', status: 'graded', dueDate: '2026-08-25T23:59:59', maxScore: 100 },
];

function useApp() {
  return { assignments: mockAssignments };
}

function AssignmentCard({ assignment }: { assignment: Assignment }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
        <p className="text-sm text-gray-500">{assignment.course}</p>
        <p className="text-sm text-gray-500 mt-1">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
      </div>
      <div>
        <Link href={`/assignments/${assignment.id}`} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default function AssignmentsPage() {
  const { assignments } = useApp();
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Submitted' | 'Graded'>('Upcoming');

  const upcoming = assignments.filter(a => a.status === 'not_submitted');
  const submitted = assignments.filter(a => a.status === 'submitted');
  const graded = assignments.filter(a => a.status === 'graded');

  const getActiveList = () => {
    switch (activeTab) {
      case 'Upcoming': return upcoming;
      case 'Submitted': return submitted;
      case 'Graded': return graded;
      default: return [];
    }
  };

  const activeList = getActiveList();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Assignments</h1>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Total Assignments</p>
            <p className="text-2xl font-semibold text-gray-900">{assignments.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-semibold text-indigo-600">{upcoming.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Submitted</p>
            <p className="text-2xl font-semibold text-blue-600">{submitted.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">Graded</p>
            <p className="text-2xl font-semibold text-green-600">{graded.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {(['Upcoming', 'Submitted', 'Graded'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab 
                    ? 'border-indigo-500 text-indigo-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* List */}
        <div className="space-y-4">
          {activeList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
              <p className="text-gray-500">No assignments in this category.</p>
            </div>
          ) : (
            activeList.map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
