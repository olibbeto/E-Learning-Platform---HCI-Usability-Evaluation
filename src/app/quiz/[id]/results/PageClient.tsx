'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';

// Mock contexts and data for completeness
interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

const mockQuiz: Quiz = {
  id: '1',
  title: 'React Fundamentals Quiz',
  questions: [
    { id: 'q1', text: 'What is the hook used to manage state in a functional component?', options: ['useEffect', 'useReducer', 'useState', 'useContext'], correctIndex: 2, explanation: 'useState is the primary hook for managing state.' },
    { id: 'q2', text: 'Which method is called right after a component is mounted in class components?', options: ['componentDidMount', 'componentWillUnmount', 'render', 'constructor'], correctIndex: 0, explanation: 'componentDidMount is called after the component is rendered to the DOM.' },
    { id: 'q3', text: 'What does JSX stand for?', options: ['JavaScript XML', 'JSON XML', 'JavaScript Syntax Extension', 'Java XML'], correctIndex: 0, explanation: 'JSX stands for JavaScript XML.' },
  ]
};

const mockResult = {
  selectedAnswers: [2, 1, 0], // q1 correct, q2 wrong (chose 1 instead of 0), q3 correct
  flaggedQuestions: [1]
};

function useApp() {
  return { 
    getQuiz: (id: string) => mockQuiz, 
    quizResults: { [mockQuiz.id]: mockResult } 
  };
}

export default function QuizResultsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { getQuiz, quizResults } = useApp();
  
  const quiz = getQuiz(id);
  const result = quizResults[id] || mockResult; // fallback to mockResult for demo

  if (!quiz || !result) return <div className="p-8 text-center">Result not found.</div>;

  let correctCount = 0;
  quiz.questions.forEach((q, idx) => {
    if (result.selectedAnswers[idx] === q.correctIndex) {
      correctCount++;
    }
  });

  const total = quiz.questions.length;
  const percentage = Math.round((correctCount / total) * 100);
  const isPass = percentage >= 70;

  const scoreColor = percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-amber-500' : 'text-red-600';
  const scoreBg = percentage >= 70 ? 'bg-green-50 border-green-200' : percentage >= 50 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 max-w-4xl w-full mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Score Card */}
        <div className={`rounded-2xl border ${scoreBg} p-8 text-center shadow-sm mb-8`}>
          <div className="text-4xl mb-2">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz Complete!</h1>
          <div className={`text-6xl font-extrabold ${scoreColor} mb-2`}>
            {correctCount}/{total}
          </div>
          <p className="text-xl text-gray-700 font-medium mb-4">{percentage}%</p>
          <div className={`inline-block px-4 py-1 rounded-full font-semibold text-sm ${isPass ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {isPass ? 'PASS' : 'FAIL'}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <p className="text-sm text-gray-500 mb-1">Correct</p>
            <p className="text-2xl font-bold text-green-600">{correctCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <p className="text-sm text-gray-500 mb-1">Incorrect</p>
            <p className="text-2xl font-bold text-red-600">{total - correctCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <p className="text-sm text-gray-500 mb-1">Flagged</p>
            <p className="text-2xl font-bold text-amber-500">{result.flaggedQuestions.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
            <p className="text-sm text-gray-500 mb-1">Time Taken</p>
            <p className="text-2xl font-bold text-gray-900">--</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button 
            onClick={() => router.push('/courses')}
            className="px-6 py-3 bg-white border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Return to Courses
          </button>
          <button 
            onClick={() => router.push(`/quiz/${id}`)}
            className="px-6 py-3 bg-indigo-600 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>

        {/* Question Review */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Question Review</h2>
        <div className="space-y-6">
          {quiz.questions.map((q, idx) => {
            const userAnswer = result.selectedAnswers[idx];
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div key={q.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      <span className="text-gray-500 mr-2">{idx + 1}.</span>
                      {q.text}
                    </h3>
                    <span className={`shrink-0 ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 bg-gray-50 space-y-3">
                  {q.options.map((opt, optIdx) => {
                    const isUserChoice = userAnswer === optIdx;
                    const isRightAnswer = q.correctIndex === optIdx;
                    
                    let highlightClass = 'border-gray-200 bg-white text-gray-700';
                    if (isRightAnswer) highlightClass = 'border-green-500 bg-green-50 text-green-900 font-medium';
                    else if (isUserChoice && !isCorrect) highlightClass = 'border-red-500 bg-red-50 text-red-900';

                    return (
                      <div key={optIdx} className={`p-3 rounded-md border ${highlightClass} flex items-center`}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center mr-3 shrink-0">
                          {isRightAnswer && <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                          {isUserChoice && !isCorrect && <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>}
                          {!isRightAnswer && !isUserChoice && <div className="w-4 h-4 rounded-full border-2 border-gray-300" />}
                        </div>
                        {opt}
                        {isUserChoice && <span className="ml-auto text-xs font-semibold uppercase tracking-wider text-gray-500">Your Answer</span>}
                      </div>
                    );
                  })}
                </div>
                
                <div className="p-5 border-t border-gray-100 bg-blue-50">
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Explanation</h4>
                  <p className="text-sm text-blue-800">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

