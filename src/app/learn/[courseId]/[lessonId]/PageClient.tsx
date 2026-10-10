'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CourseSidebar } from '@/components/layout/CourseSidebar';
import { Play, Pause, Maximize, Volume2, ArrowLeft, ArrowRight, CheckCircle, FileText, Download, Menu, Clock, BookOpen, X } from 'lucide-react';

// Mock context to ensure the page works even if context isn't fully defined elsewhere
// In a real app, you would import this: import { useLearningContext } from '@/context/LearningContext';
const mockAllCourses = [
  {
    id: 'c1',
    title: 'Human-Computer Interaction',
    modules: [
      {
        id: 'm1',
        title: 'Introduction to HCI',
        lessons: [
          { id: 'l1', title: 'What is HCI?', duration: '10:00', type: 'video' },
          { id: 'l2', title: 'History of HCI', duration: '15:00', type: 'video' }
        ]
      },
      {
        id: 'm2',
        title: 'Design Principles',
        lessons: [
          { id: 'l3', title: 'Affordances and Signifiers', duration: '20:00', type: 'video' }
        ]
      }
    ]
  }
];

export default function LessonPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const router = useRouter();
  const { courseId, lessonId } = params;
  
  // Mock context state
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const markLessonComplete = (id: string) => setCompletedLessons(prev => [...prev, id]);
  
  const allCourses = mockAllCourses; 
  const course = allCourses.find(c => c.id === courseId) || allCourses[0];

  // Flatten lessons to find current, prev, next
  const flatLessons = useMemo(() => {
    return course.modules.flatMap(m => 
      m.lessons.map(l => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
    );
  }, [course]);

  const currentIndex = flatLessons.findIndex(l => l.id === lessonId);
  const lesson = flatLessons[currentIndex >= 0 ? currentIndex : 0];
  const prevLesson = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < flatLessons.length - 1 ? flatLessons[currentIndex + 1] : null;
  
  const isCompleted = completedLessons.includes(lesson?.id);

  const totalLessons = flatLessons.length;
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Video UI state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);

  // Notes state
  const [notes, setNotes] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load notes from local storage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-${courseId}-${lessonId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [courseId, lessonId]);

  // Auto-save notes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(`notes-${courseId}-${lessonId}`, notes);
      if (notes) {
        setSaveStatus('Notes auto-saved');
        setTimeout(() => setSaveStatus(''), 2000);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [notes, courseId, lessonId]);

  // Mock video progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return p + (0.5 * playbackSpeed);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleComplete = () => {
    if (!isCompleted && lesson) {
      markLessonComplete(lesson.id);
      alert('✓ Lesson Completed!');
    }
  };

  const handleDownload = (filename: string) => {
    alert(`Download started: ${filename}`);
  };

  if (!lesson) {
    return <div className="p-8 text-center">Lesson not found.</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* Top bar */}
      <header className="flex-none h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/my-learning" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold text-lg hidden sm:block truncate max-w-sm">{course.title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-gray-700">Lesson {currentIndex + 1} of {totalLessons}</span>
            <div className="w-32 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:block w-72 bg-white border-r border-gray-200 overflow-y-auto">
          {/* We'd normally use the CourseSidebar component here, passing course info */}
          <div className="p-4">
            <h2 className="font-bold text-lg mb-4">Course Content</h2>
            {course.modules.map(mod => (
              <div key={mod.id} className="mb-4">
                <h3 className="font-semibold text-sm text-gray-700 mb-2">{mod.title}</h3>
                <ul className="space-y-1">
                  {mod.lessons.map(l => {
                    const isCurrent = l.id === lesson.id;
                    const isDone = completedLessons.includes(l.id);
                    return (
                      <li key={l.id}>
                        <Link 
                          href={`/learn/${courseId}/${l.id}`}
                          className={`flex items-center gap-2 p-2 rounded-md text-sm transition-colors ${isCurrent ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-100 text-gray-600'}`}
                        >
                          {isDone ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Play className="w-4 h-4 text-gray-400" />}
                          <span className="truncate">{l.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Left Sidebar (Mobile Drawer) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
            <div className="relative flex flex-col w-72 bg-white h-full shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-bold">Course Content</h2>
                <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5 text-gray-500"/></button>
              </div>
              <div className="p-4 overflow-y-auto">
                {course.modules.map(mod => (
                  <div key={mod.id} className="mb-4">
                    <h3 className="font-semibold text-sm text-gray-700 mb-2">{mod.title}</h3>
                    <ul className="space-y-1">
                      {mod.lessons.map(l => {
                        const isCurrent = l.id === lesson.id;
                        const isDone = completedLessons.includes(l.id);
                        return (
                          <li key={l.id}>
                            <Link 
                              onClick={() => setSidebarOpen(false)}
                              href={`/learn/${courseId}/${l.id}`}
                              className={`flex items-center gap-2 p-2 rounded-md text-sm ${isCurrent ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600'}`}
                            >
                              {isDone ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Play className="w-4 h-4 text-gray-400" />}
                              <span className="truncate">{l.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Center Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 flex justify-center">
          <div className="max-w-4xl w-full p-4 sm:p-8 flex flex-col gap-8 pb-32">
            
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 flex gap-2 items-center">
              <span>My Learning</span>
              <span>/</span>
              <span className="truncate max-w-[150px]">{course.title}</span>
              <span>/</span>
              <span className="truncate max-w-[150px]">{lesson.moduleTitle}</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">{lesson.title}</span>
            </nav>

            <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>

            {/* Video Player Mockup */}
            <div className="w-full aspect-video bg-gray-900 rounded-xl overflow-hidden relative flex flex-col group shadow-lg">
              <div className="absolute top-4 left-4 text-white/80 text-sm font-medium z-10 drop-shadow-md">
                Now playing: {lesson.title}
              </div>
              
              <div className="flex-1 flex items-center justify-center relative">
                {/* Center Play/Pause Overlay */}
                <button 
                  onClick={togglePlay}
                  className="w-16 h-16 bg-blue-600/90 text-white rounded-full flex items-center justify-center hover:bg-blue-500 hover:scale-105 transition-all shadow-lg"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </button>
              </div>

              {/* Controls */}
              <div className="h-14 bg-gradient-to-t from-black/80 to-transparent flex items-center px-4 gap-4 text-white">
                <button onClick={togglePlay} className="hover:text-blue-400 transition-colors">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                
                <div className="flex-1 flex items-center gap-2 group/slider cursor-pointer">
                  <span className="text-xs font-medium w-10 text-right">
                    {Math.floor((progress * parseInt(lesson.duration)) / 100)}:{(Math.floor((progress * parseInt(lesson.duration) * 60) / 100) % 60).toString().padStart(2, '0')}
                  </span>
                  <div className="flex-1 h-1.5 bg-gray-600 rounded-full relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-blue-500" style={{ width: `${progress}%` }}></div>
                  </div>
                  <span className="text-xs font-medium w-10">{lesson.duration}</span>
                </div>

                <div className="flex items-center gap-3">
                  <select 
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                    className="bg-transparent text-sm cursor-pointer hover:text-blue-400 outline-none"
                  >
                    <option value={0.5} className="text-black">0.5x</option>
                    <option value={1} className="text-black">1x</option>
                    <option value={1.25} className="text-black">1.25x</option>
                    <option value={1.5} className="text-black">1.5x</option>
                    <option value={2} className="text-black">2x</option>
                  </select>
                  
                  <div className="flex items-center gap-1 group/vol">
                    <Volume2 className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
                  </div>

                  <button className="hover:text-blue-400 transition-colors">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <section>
                <h2 className="text-xl font-semibold mb-3">Lesson Summary</h2>
                <p className="text-gray-700 leading-relaxed">
                  In this lesson, we explore the fundamental concepts of {lesson.title.toLowerCase()}. Understanding these principles is critical for designing intuitive user interfaces and experiences.
                </p>
                <h3 className="font-medium mt-4 mb-2">Learning Objectives:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Define the core aspects of {lesson.title.toLowerCase()}.</li>
                  <li>Identify common patterns used in modern web design.</li>
                  <li>Apply basic psychological principles to UI layouts.</li>
                </ul>
              </section>

              <hr className="border-gray-100" />

              <section>
                <h2 className="text-xl font-semibold mb-3">Reading Material</h2>
                <div className="prose prose-blue max-w-none text-gray-700">
                  <p className="mb-4">
                    Human-Computer Interaction (HCI) is a multidisciplinary field of study focusing on the design of computer technology and, in particular, the interaction between humans (the users) and computers. While initially concerned with computers, HCI has since expanded to cover almost all forms of information technology design.
                  </p>
                  <p>
                    When designing interfaces, affordances play a crucial role. An affordance is a property in which the physical characteristics of an object or environment influence its function. For example, a physical button affords clicking, and a digital button must visually signal that same affordance using signifiers like shadows, borders, or color changes.
                  </p>
                </div>
              </section>

              <hr className="border-gray-100" />

              <section>
                <h2 className="text-xl font-semibold mb-4">Resources</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Lecture Slides', type: 'PDF', size: '2.4 MB' },
                    { name: 'Design Assets', type: 'ZIP', size: '15.1 MB' },
                    { name: 'Cheatsheet', type: 'PDF', size: '1.1 MB' }
                  ].map((res, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-blue-300 transition-colors bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-900 truncate max-w-[100px]">{res.name}</p>
                          <p className="text-xs text-gray-500">{res.type} • {res.size}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDownload(res.name)}
                        className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <hr className="border-gray-100" />

              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold">Your Notes</h2>
                  {saveStatus && <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">{saveStatus}</span>}
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take notes here... They are automatically saved."
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y text-gray-700 bg-gray-50 focus:bg-white transition-colors"
                ></textarea>
              </section>
            </div>
          </div>
        </main>

        {/* Right Sidebar (Desktop) */}
        <aside className="hidden xl:block w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1 text-blue-800">
                    <span>Course Completion</span>
                    <span className="font-bold">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-white p-3 rounded-lg border border-blue-100 text-center">
                    <span className="block text-2xl font-bold text-blue-700">{completedCount}/{totalLessons}</span>
                    <span className="text-blue-600/80 text-xs uppercase font-semibold">Lessons</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100 text-center">
                    <span className="block text-2xl font-bold text-blue-700">12h</span>
                    <span className="text-blue-600/80 text-xs uppercase font-semibold">Remaining</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">About this Lesson</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Duration</p>
                    <p className="font-medium text-gray-900">{lesson.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Module</p>
                    <p className="font-medium text-gray-900">{lesson.moduleTitle}</p>
                  </div>
                </div>
              </div>
            </div>

            {nextLesson && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                  <span>Up Next</span>
                </h3>
                <Link href={`/learn/${courseId}/${nextLesson.id}`} className="block border border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Next Lesson</span>
                    <Play className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                  </div>
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{nextLesson.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{nextLesson.duration} • Video</p>
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 z-30 lg:left-72 xl:right-80 px-4 sm:px-8 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => prevLesson && router.push(`/learn/${courseId}/${prevLesson.id}`)}
          disabled={!prevLesson}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${!prevLesson ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous Lesson</span>
          <span className="sm:hidden">Prev</span>
        </button>

        <button
          onClick={handleComplete}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all shadow-sm ${
            isCompleted 
              ? 'bg-green-100 text-green-700 hover:bg-green-200 ring-2 ring-green-500/20' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Lesson Completed!</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Mark as Complete</span>
            </>
          )}
        </button>

        <button
          onClick={() => nextLesson && router.push(`/learn/${courseId}/${nextLesson.id}`)}
          disabled={!nextLesson}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${!nextLesson ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
        >
          <span className="hidden sm:inline">Next Lesson</span>
          <span className="sm:hidden">Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}

