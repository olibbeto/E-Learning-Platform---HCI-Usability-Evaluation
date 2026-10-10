'use client';

import React, { useState } from 'react';
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

function useApp() {
  const saveQuizResult = (id: string, result: any) => {
    console.log('Saved quiz result:', result);
  };
  return { getQuiz: (id: string) => mockQuiz, saveQuizResult };
}

export default function QuizPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { getQuiz, saveQuizResult } = useApp();
  
  const quiz = getQuiz(id);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quiz?.questions.length || 0).fill(-1));
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [showModal, setShowModal] = useState(false);

  if (!quiz) return <div>Quiz not found</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const answeredCount = selectedAnswers.filter(a => a !== -1).length;

  const handleOptionSelect = (optIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optIndex;
    setSelectedAnswers(newAnswers);
  };

  const toggleFlag = () => {
    const newFlags = new Set(flaggedQuestions);
    if (newFlags.has(currentQuestionIndex)) {
      newFlags.delete(currentQuestionIndex);
    } else {
      newFlags.add(currentQuestionIndex);
    }
    setFlaggedQuestions(newFlags);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowModal(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
  };

  const handleSubmit = () => {
    saveQuizResult(id, { selectedAnswers, flaggedQuestions: Array.from(flaggedQuestions) });
    router.push(`/quiz/${id}/results`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900 font-medium text-sm flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back
        </button>
        <h1 className="text-lg font-bold text-gray-900 truncate mx-4">{quiz.title}</h1>
        <div className="text-sm font-medium text-gray-500 shrink-0">
          -- min remaining
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-200 h-1">
        <div 
          className="bg-indigo-600 h-1 transition-all duration-300" 
          style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
        />
      </div>

      <main className="flex-1 max-w-3xl w-full mx-auto py-8 px-4 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-gray-500">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <button 
            onClick={toggleFlag}
            className={`flex items-center text-sm font-medium ${flaggedQuestions.has(currentQuestionIndex) ? 'text-amber-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <svg className="w-5 h-5 mr-1" fill={flaggedQuestions.has(currentQuestionIndex) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>
            {flaggedQuestions.has(currentQuestionIndex) ? 'Flagged' : 'Flag Question'}
          </button>
        </div>

        {/* Question Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 flex-1">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-8 leading-relaxed">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 shrink-0 ${
                      isSelected ? 'border-indigo-600' : 'border-gray-300'
                    }`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                    </div>
                    <span className={`text-base ${isSelected ? 'text-indigo-900 font-medium' : 'text-gray-700'}`}>
                      {opt}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <button 
            onClick={handlePrev} 
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="hidden sm:flex space-x-2">
            {quiz.questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== -1;
              const isFlagged = flaggedQuestions.has(idx);
              const isCurrent = currentQuestionIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-3 h-3 rounded-full ${
                    isCurrent ? 'ring-2 ring-offset-2 ring-indigo-600 ' : ''
                  } ${
                    isFlagged ? 'bg-amber-500' : isAnswered ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to question ${idx + 1}`}
                />
              );
            })}
          </div>

          <button 
            onClick={handleNext}
            className="px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {isLastQuestion ? 'Submit Quiz' : 'Next'}
          </button>
        </div>
      </main>

      {/* Submit Modal */}
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Submit Quiz?</h3>
                <p className="text-sm text-gray-500 mb-4">
                  You've answered {answeredCount} of {quiz.questions.length} questions. {flaggedQuestions.size > 0 && `${flaggedQuestions.size} flagged.`}
                </p>
                <p className="text-sm text-gray-500">
                  Are you sure you want to submit? You cannot change your answers after submission.
                </p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={handleSubmit} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
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

