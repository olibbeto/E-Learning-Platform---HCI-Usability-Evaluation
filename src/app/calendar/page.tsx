'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, ExternalLink } from 'lucide-react';

const calendarEvents = [
  { id: 1, date: '2026-09-05', type: 'assignment', title: 'UX Research Report', course: 'HCI', description: 'Submit the final UX research report detailing user interviews and personas.' },
  { id: 2, date: '2026-09-10', type: 'quiz', title: 'React Basics', course: 'Web Dev', description: 'Covers components, props, state, and hooks.' },
  { id: 3, date: '2026-09-15', type: 'lecture', title: 'Network Security', course: 'Cybersecurity', description: 'Live lecture on basic network security principles and cryptography.' },
  { id: 4, date: '2026-09-22', type: 'exam', title: 'Midterm Exam', course: 'HCI', description: 'Comprehensive exam covering all topics from weeks 1-6.' },
];

const eventColors = {
  assignment: 'bg-amber-100 text-amber-800 border-amber-200',
  quiz: 'bg-blue-100 text-blue-800 border-blue-200',
  lecture: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  exam: 'bg-red-100 text-red-800 border-red-200',
};

const eventBadgeColors = {
  assignment: 'bg-amber-500',
  quiz: 'bg-blue-500',
  lecture: 'bg-indigo-500',
  exam: 'bg-red-500',
};

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentMonth, setCurrentMonth] = useState(9); // September
  const [currentYear, setCurrentYear] = useState(2026);

  // Hardcode September 2026 view
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();
  const prevMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const gridDays = [];
  
  // Prev month padding
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    gridDays.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      dateString: `2026-08-${(prevMonthDays - i).toString().padStart(2, '0')}`,
      events: []
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `2026-09-${i.toString().padStart(2, '0')}`;
    const dayEvents = calendarEvents.filter(e => e.date === dateStr);
    gridDays.push({
      day: i,
      isCurrentMonth: true,
      isToday: i === 1,
      dateString: dateStr,
      events: dayEvents
    });
  }

  // Next month padding to complete the grid (5 weeks = 35 days total or 6 weeks = 42)
  const totalCells = Math.ceil(gridDays.length / 7) * 7;
  const remainingCells = totalCells - gridDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    gridDays.push({
      day: i,
      isCurrentMonth: false,
      dateString: `2026-10-${i.toString().padStart(2, '0')}`,
      events: []
    });
  }

  const handleEventClick = (e: React.MouseEvent, event: any) => {
    e.stopPropagation();
    setSelectedEvent(event);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Main Calendar View */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
            <h1 className="text-xl font-bold text-gray-900">Calendar</h1>
            <div className="flex items-center space-x-4">
              <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-lg font-semibold text-gray-800 w-40 text-center">{monthNames[currentMonth - 1]} {currentYear}</h2>
              <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Grid Header */}
          <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          {/* Grid Cells */}
          <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-gray-200 gap-px">
            {gridDays.map((cell, idx) => (
              <div 
                key={idx} 
                className={`min-h-[120px] bg-white p-2 transition-colors hover:bg-gray-50 flex flex-col ${!cell.isCurrentMonth ? 'opacity-50 bg-gray-50' : ''}`}
                onClick={() => {
                  if (cell.events.length > 0) {
                    setSelectedEvent(cell.events[0]);
                  }
                }}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                    cell.isToday 
                      ? 'bg-indigo-600 text-white' 
                      : cell.isCurrentMonth ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {cell.day}
                  </span>
                </div>
                
                <div className="mt-1 space-y-1 overflow-y-auto max-h-[80px] no-scrollbar">
                  {cell.events.map(event => (
                    <div 
                      key={event.id}
                      onClick={(e) => handleEventClick(e, event)}
                      className={`text-xs px-2 py-1 rounded truncate border cursor-pointer hover:opacity-80 transition-opacity ${eventColors[event.type as keyof typeof eventColors]}`}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Upcoming Events */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <CalendarIcon className="text-gray-400" size={20} />
              <h2 className="text-lg font-bold text-gray-900">Upcoming Events</h2>
            </div>
            
            <div className="space-y-4">
              {calendarEvents.map(event => (
                <div 
                  key={event.id} 
                  className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex flex-col items-center min-w-[3rem]">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Sep</span>
                    <span className="text-xl font-bold text-gray-900">{event.date.split('-')[2]}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${eventBadgeColors[event.type as keyof typeof eventBadgeColors]}`}></span>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{event.type}</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">{event.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{event.course}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start p-6 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${eventColors[selectedEvent.type as keyof typeof eventColors]}`}>
                    {selectedEvent.type}
                  </span>
                  <span className="text-sm font-medium text-gray-500">{selectedEvent.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedEvent.course}</p>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {selectedEvent.description || 'No additional details provided for this event.'}
              </p>
              
              <Link href="/courses" className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors">
                <span>View Course Material</span>
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
