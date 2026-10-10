'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Mock contexts and data for completeness
interface AssignmentDetail {
  id: string;
  title: string;
  course: string;
  status: 'not_submitted' | 'submitted' | 'graded';
  dueDate: string;
  maxScore: number;
  description: string;
  instructions: string[];
  resources: { name: string; url: string; size: string }[];
  grade?: number;
  feedback?: string;
  submissionDate?: string;
}

const mockAssignments: Record<string, AssignmentDetail> = {
  '1': {
    id: '1', title: 'React Basics', course: 'Frontend Web Development', status: 'not_submitted', dueDate: '2026-09-05T23:59:59', maxScore: 100,
    description: 'Build a simple React component that displays a list of items passed as props.',
    instructions: ['Initialize a new React component.', 'Accept an array of items as a prop.', 'Map over the array and render a list item for each.'],
    resources: [{ name: 'Starter template.zip', url: '#', size: '2MB' }]
  },
  '2': {
    id: '2', title: 'State Management', course: 'Frontend Web Development', status: 'submitted', dueDate: '2026-09-01T23:59:59', maxScore: 100,
    description: 'Implement complex state using useReducer.',
    instructions: ['Create a reducer function.', 'Use useReducer hook.', 'Dispatch actions to update state.'],
    resources: [],
    submissionDate: '2026-08-30T10:00:00'
  },
  '3': {
    id: '3', title: 'UI Design Patterns', course: 'UI/UX Design', status: 'graded', dueDate: '2026-08-25T23:59:59', maxScore: 100,
    description: 'Analyze modern UI design patterns.',
    instructions: ['Pick 3 popular apps.', 'Identify patterns used.', 'Write a report.'],
    resources: [],
    submissionDate: '2026-08-23T15:00:00',
    grade: 95,
    feedback: 'Excellent analysis. Keep it up!'
  }
};

function useApp() {
  const submitAssignment = (id: string, file: File) => {
    console.log(`Submitted assignment ${id} with file ${file.name}`);
  };
  return { assignments: mockAssignments, submitAssignment };
}

export default function AssignmentDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { assignments, submitAssignment } = useApp();
  const assignment = assignments[id];

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(assignment?.status !== 'not_submitted');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!assignment) {
    return <div className="p-8 text-center text-gray-500">Assignment not found.</div>;
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const validateFile = (f: File) => {
    const ext = f.name.split('.').pop()?.toLowerCase();
    if (['pdf', 'docx', 'zip'].includes(ext || '')) {
      setFile(f);
      setError('');
    } else {
      setError('Invalid file type. Only PDF, DOCX, and ZIP are allowed.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateFile(e.target.files[0]);
    }
  };

  const handleConfirmSubmit = () => {
    if (file) {
      submitAssignment(id, file);
      setSubmitted(true);
      setShowModal(false);
    }
  };

  const timeRelative = (dateStr: string) => {
    const due = new Date(dateStr);
    const now = new Date();
    const diff = due.getTime() - now.getTime();
    if (diff < 0) return 'Overdue';
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return `In ${days} day${days !== 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex space-x-2">
          <Link href="/courses" className="hover:text-gray-900">My Learning</Link>
          <span>/</span>
          <Link href="/assignments" className="hover:text-gray-900">Assignments</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{assignment.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                {assignment.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {assignment.course}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  assignment.status === 'not_submitted' ? 'bg-amber-100 text-amber-800' :
                  assignment.status === 'submitted' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {assignment.status.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-sm text-gray-500">
                  Due: {new Date(assignment.dueDate).toLocaleString()} ({timeRelative(assignment.dueDate)})
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{assignment.description}</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Instructions</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {assignment.instructions.map((inst, idx) => (
                  <li key={idx}>{inst}</li>
                ))}
              </ol>

              {assignment.resources.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Attached Resources</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {assignment.resources.map((res, idx) => (
                      <a key={idx} href={res.url} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                        <svg className="w-6 h-6 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{res.name}</p>
                          <p className="text-xs text-gray-500">{res.size}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Submission Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Submission</h2>
              
              {!submitted ? (
                <div>
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition"
                  >
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <p className="mt-1 text-sm text-gray-600">Drag and drop your file here</p>
                    <p className="mt-1 text-xs text-gray-500">Accepted: PDF, DOCX, ZIP</p>
                    <div className="mt-4">
                      <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                        or Browse files
                      </button>
                      <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".pdf,.docx,.zip" />
                    </div>
                  </div>
                  
                  {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                  
                  {file && (
                    <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded flex justify-between items-center">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <span className="text-sm font-medium text-gray-900 truncate">{file.name}</span>
                        <span className="ml-2 text-xs text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
                      </div>
                      <button onClick={() => setFile(null)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
                    </div>
                  )}

                  {file && (
                    <div className="mt-6">
                      <button onClick={() => setShowModal(true)} className="w-full sm:w-auto px-6 py-3 bg-indigo-600 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700">
                        Submit Assignment
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-6 w-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <h3 className="text-lg font-medium text-green-800">✓ Assignment Submitted Successfully</h3>
                  </div>
                  <div className="mt-3 text-sm text-green-700 space-y-1">
                    <p><strong>Submitted on:</strong> {assignment.submissionDate ? new Date(assignment.submissionDate).toLocaleString() : new Date().toLocaleString()}</p>
                    <p><strong>Status:</strong> {assignment.status === 'graded' ? 'Graded' : 'Submitted, pending review'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Due Date</span>
                    <span className="font-medium text-gray-900">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Max Score</span>
                    <span className="font-medium text-gray-900">{assignment.maxScore}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium text-gray-900 capitalize">{assignment.status.replace('_', ' ')}</span>
                  </div>
                  {assignment.submissionDate && (
                    <div className="flex justify-between pb-2">
                      <span className="text-gray-500">Submitted</span>
                      <span className="font-medium text-gray-900">{new Date(assignment.submissionDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {assignment.status === 'graded' && (
                <div className="bg-indigo-50 rounded-lg shadow-sm border border-indigo-200 p-6">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-2">Grade</h3>
                  <div className="text-4xl font-bold text-indigo-600 mb-4">
                    {assignment.grade} <span className="text-xl text-indigo-400">/ {assignment.maxScore}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-indigo-900">Feedback:</h4>
                  <p className="text-sm text-indigo-800 mt-1 italic">"{assignment.feedback}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Review your submission</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to submit <strong>{file?.name}</strong>? You cannot resubmit after submission.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={handleConfirmSubmit} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                  Confirm Submit
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

