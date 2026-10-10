'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronRight, 
  Star, 
  Users, 
  Clock, 
  BookOpen, 
  Check, 
  PlayCircle, 
  FileText,
  Award,
  Shield,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/context/AppContext';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const { allCourses, enrolledCourses, enrollInCourse } = useApp();
  
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 0: true });

  const course = allCourses?.find((c: any) => c.id === courseId);
  const enrolledData = enrolledCourses?.find((ec: any) => ec.courseId === courseId);
  const isEnrolled = !!enrolledData;

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Navbar />
        <div className="text-center mt-20 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h1>
          <p className="text-gray-500 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link href="/courses" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (enrollInCourse) {
      enrollInCourse(course.id);
      router.push(`/learn/${course.id}/${course.modules?.[0]?.lessons?.[0]?.id || '1'}`);
    }
  };

  const toggleModule = (index: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Mock data fallbacks if missing
  const objectives = course.objectives || [
    "Master the fundamental concepts and practical applications.",
    "Build real-world projects from scratch.",
    "Understand industry best practices and standards.",
    "Develop problem-solving skills for complex scenarios."
  ];

  const modules = course.modules || [
    { title: "Getting Started", duration: "45m", lessons: [{ id: '1', title: "Introduction", duration: "10m", type: "video" }, { id: '2', title: "Setup and Installation", duration: "35m", type: "text" }] },
    { title: "Core Concepts", duration: "2h 15m", lessons: [{ id: '3', title: "Fundamentals", duration: "45m", type: "video" }, { id: '4', title: "Advanced Topics", duration: "1h 30m", type: "video" }] }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      {/* Hero Header */}
      <div className={`${course.color || 'bg-gradient-to-r from-indigo-800 to-purple-900'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="w-full lg:w-2/3 pr-0 lg:pr-12">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-indigo-100 mb-6 gap-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/courses" className="hover:text-white">Courses</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{course.title}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {course.title}
            </h1>
            
            <p className="text-lg text-indigo-100 mb-8 line-clamp-2">
              {course.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-bold">{course.rating || '4.8'}</span>
                <span className="text-indigo-200">({course.reviewCount || 1240} ratings)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-5 h-5 text-indigo-200" />
                <span>{course.students?.toLocaleString() || '4,500'} students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-5 h-5 text-indigo-200" />
                <span>{course.duration || '6h 30m'}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/20 font-medium">
                {course.difficulty || 'Intermediate'}
              </span>
            </div>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl">
                {course.instructor?.name?.charAt(0) || 'I'}
              </div>
              <div>
                <p className="font-medium">{course.instructor?.name || 'Instructor'}</p>
                <p className="text-sm text-indigo-200">Lead Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (70%) */}
          <div className="w-full lg:w-2/3 space-y-12">
            
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this course</h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>{course.description}</p>
                <p>This comprehensive course is designed to take you from basics to advanced concepts with practical, hands-on examples. You will learn by building real-world projects and solving complex problems that mimic actual industry scenarios.</p>
              </div>
            </section>

            {/* What you'll learn */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">What you'll learn</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {objectives.map((obj: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
              <div className="border border-gray-200 rounded-xl bg-white overflow-hidden divide-y divide-gray-200">
                {modules.map((module: any, idx: number) => (
                  <div key={idx} className="w-full">
                    <button 
                      onClick={() => toggleModule(idx)}
                      className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {module.lessons?.length || 0} lessons • {module.duration}
                        </p>
                      </div>
                      {expandedModules[idx] ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                    </button>
                    
                    {expandedModules[idx] && (
                      <div className="p-2">
                        {module.lessons?.map((lesson: any, lIdx: number) => (
                          <div key={lesson.id || lIdx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {lesson.type === 'video' ? (
                                <PlayCircle className="w-5 h-5 text-indigo-500" />
                              ) : (
                                <FileText className="w-5 h-5 text-indigo-500" />
                              )}
                              <span className="text-sm font-medium text-gray-700">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (30%) - Sticky */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-8 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden -mt-24 lg:-mt-48 z-10">
              <div className={`h-48 ${course.color || 'bg-gradient-to-br from-indigo-500 to-purple-600'} flex items-center justify-center p-6 relative`}>
                <BookOpen className="w-20 h-20 text-white/30" />
              </div>
              
              <div className="p-6 sm:p-8">
                {isEnrolled ? (
                  <Link 
                    href={`/learn/${course.id}/${enrolledData.lastLessonId || modules[0]?.lessons?.[0]?.id || '1'}`}
                    className="w-full block text-center py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-lg transition-colors shadow-sm"
                  >
                    Continue Learning
                  </Link>
                ) : (
                  <button 
                    onClick={handleEnroll}
                    className="w-full py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-lg transition-colors shadow-sm"
                  >
                    Enroll Now
                  </button>
                )}
                
                <div className="mt-8 space-y-4">
                  <h4 className="font-semibold text-gray-900">This course includes:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-600 text-sm">
                      <PlayCircle className="w-5 h-5 text-gray-400" />
                      <span>{modules.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0)} video and text lessons</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600 text-sm">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span>Downloadable resources</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600 text-sm">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <span>Full lifetime access</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600 text-sm">
                      <Award className="w-5 h-5 text-gray-400" />
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

