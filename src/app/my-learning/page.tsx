'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen, Award, Clock, ChevronRight,
  CalendarDays, AlertCircle, CheckCircle2, SortAsc,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { useApp } from '@/context/AppContext';
import { getTotalLessons, getCompletedLessons, formatShortDate } from '@/lib/utils';
import type { Course } from '@/types';

// ─── Helpers ────────────────────────────────────────────────────────────────

function computeProgress(course: Course): number {
  const total = getTotalLessons(course);
  if (total === 0) return 0;
  return Math.round((getCompletedLessons(course) / total) * 100);
}

function getNextLesson(course: Course): { title: string; id: string } | null {
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      if (!lesson.completed) return { title: lesson.title, id: lesson.id };
    }
  }
  return null;
}

function CourseImageWithFallback({
  src,
  alt,
  colorClass,
}: {
  src: string;
  alt: string;
  colorClass: string;
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${
        !showImage ? colorClass : ''
      }`}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
          style={{ aspectRatio: '3/2' }}
        />
      ) : (
        <BookOpen className="w-14 h-14 text-white/40" aria-hidden="true" />
      )}
    </div>
  );
}

// ─── Skeleton card while loading ────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col sm:flex-row animate-pulse"
      aria-hidden="true"
    >
      <div className="sm:w-56 h-40 sm:h-auto bg-gray-200 shrink-0" />
      <div className="p-6 flex-1 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-full mt-6" />
        <div className="h-10 bg-gray-200 rounded w-36 ml-auto" />
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function MyLearningPage() {
  const { enrolledCourses, grades, assignments } = useApp();

  const [activeTab, setActiveTab] = useState<'All' | 'In Progress' | 'Completed'>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'progress-desc' | 'title-asc'>('recent');
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate brief load state for graceful mount
  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  // ── Computed stats ────────────────────────────────────────────────────────
  const totalEnrolled = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(c => computeProgress(c) >= 100);
  const inProgressCourses = enrolledCourses.filter(c => computeProgress(c) < 100);

  const avgGrade = useMemo(() => {
    if (!grades.length) return null;
    const sum = grades.reduce((acc, g) => acc + (g.score / g.maxScore) * 100, 0);
    return Math.round(sum / grades.length);
  }, [grades]);

  // ── Upcoming deadlines (not_submitted with future due date) ───────────────
  const now = new Date();
  const upcomingDeadlines = useMemo(
    () =>
      assignments
        .filter(a => a.status === 'not_submitted' && new Date(a.dueDate) > now)
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
    [assignments]
  );

  // ── Tab filter + sort ─────────────────────────────────────────────────────
  const filteredAndSorted = useMemo(() => {
    let list = [...enrolledCourses];

    if (activeTab === 'In Progress') list = list.filter(c => computeProgress(c) < 100);
    if (activeTab === 'Completed') list = list.filter(c => computeProgress(c) >= 100);

    if (sortBy === 'recent') {
      list.sort((a, b) => {
        const ta = a.lastAccessed ? new Date(a.lastAccessed).getTime() : 0;
        const tb = b.lastAccessed ? new Date(b.lastAccessed).getTime() : 0;
        return tb - ta;
      });
    } else if (sortBy === 'progress-desc') {
      list.sort((a, b) => computeProgress(b) - computeProgress(a));
    } else {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [enrolledCourses, activeTab, sortBy]);

  const tabCounts: Record<string, number> = {
    All: totalEnrolled,
    'In Progress': inProgressCourses.length,
    Completed: completedCourses.length,
  };

  // ─── Days until due ───────────────────────────────────────────────────────
  function daysUntil(dateStr: string) {
    const diff = Math.ceil((new Date(dateStr).getTime() - now.getTime()) / 86400000);
    if (diff === 0) return 'Due today';
    if (diff === 1) return 'Due tomorrow';
    return `Due in ${diff} days`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to content — Phase 4a */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Page heading ─────────────────────────────────────────────── */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Learning</h1>

        {/* ── Stats grid ───────────────────────────────────────────────── */}
        <section aria-labelledby="stats-heading" className="mb-8">
          <h2 id="stats-heading" className="sr-only">Learning Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-600">Total Enrolled</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalEnrolled}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{inProgressCourses.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{completedCourses.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-600">Average Grade</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {avgGrade !== null ? `${avgGrade}%` : (
                  <span className="text-gray-400 text-base font-medium">No grades yet</span>
                )}
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left: course list ───────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Tabs + Sort row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              {/* Tabs */}
              <div
                role="tablist"
                aria-label="Filter courses"
                className="flex border-b border-gray-200 -mb-px"
              >
                {(['All', 'In Progress', 'Completed'] as const).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    aria-controls={`tabpanel-${tab.replace(' ', '-')}`}
                    id={`tab-${tab.replace(' ', '-')}`}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap py-3 px-3 border-b-2 text-sm font-medium min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                      activeTab === tab
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                      activeTab === tab ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tabCounts[tab]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Sort */}
              <label className="flex items-center gap-2 text-sm text-gray-600 shrink-0">
                <SortAsc className="w-4 h-4" aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none min-h-[44px]"
                  aria-label="Sort courses"
                >
                  <option value="recent">Recently Accessed</option>
                  <option value="progress-desc">Progress: High to Low</option>
                  <option value="title-asc">Title: A–Z</option>
                </select>
              </label>
            </div>

            {/* Course list */}
            <div
              id={`tabpanel-${activeTab.replace(' ', '-')}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab.replace(' ', '-')}`}
            >
              {!isLoaded ? (
                <ul className="space-y-5" aria-label="Loading courses">
                  {[1, 2, 3].map(i => <li key={i}><SkeletonCard /></li>)}
                </ul>
              ) : filteredAndSorted.length > 0 ? (
                <ul className="space-y-5">
                  {filteredAndSorted.map((course) => {
                    const total = getTotalLessons(course);
                    const completed = getCompletedLessons(course);
                    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
                    const nextLesson = getNextLesson(course);
                    const instructorName =
                      typeof course.instructor === 'string'
                        ? course.instructor
                        : course.instructor?.name ?? 'Instructor';
                    const continueId = nextLesson?.id ?? course.lastLessonId ?? 'l1';
                    const continueLabel = nextLesson
                      ? `Continue: ${nextLesson.title}`
                      : 'Review Course';
                    const isDone = pct >= 100;

                    return (
                      <li key={course.id}>
                        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col sm:flex-row">
                          {/* Thumbnail */}
                          <div className="sm:w-56 h-40 sm:h-auto shrink-0" style={{ aspectRatio: '3/2' }}>
                            <CourseImageWithFallback
                              src={course.image}
                              alt={
                                course.id === 'c1'
                                  ? 'Illustration of a wireframe interface with a cursor'
                                  : course.id === 'c2'
                                  ? 'Illustration of code on a browser screen'
                                  : course.id === 'c3'
                                  ? 'Illustration of a padlock and shield for cybersecurity'
                                  : `${course.title} course illustration`
                              }
                              colorClass={course.color}
                            />
                          </div>

                          {/* Content */}
                          <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start gap-4 mb-1">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                                  {course.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-0.5">{instructorName}</p>
                                {course.lastAccessed && (
                                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                    <Clock className="w-3 h-3" aria-hidden="true" />
                                    Last accessed: {formatShortDate(course.lastAccessed)}
                                  </p>
                                )}
                              </div>
                              {isDone && (
                                <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0">
                                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                                  Completed
                                </span>
                              )}
                            </div>

                            <div className="mt-auto pt-4 space-y-3">
                              {/* Progress */}
                              <div>
                                <div className="flex justify-between text-sm font-medium text-gray-700 mb-1.5">
                                  <span>{pct}% complete</span>
                                  <span className="text-gray-600 font-normal">
                                    {completed} of {total} lesson{total !== 1 ? 's' : ''} completed
                                  </span>
                                </div>
                                <div
                                  className="w-full bg-gray-100 rounded-full h-2"
                                  role="progressbar"
                                  aria-valuenow={pct}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  aria-label={`${course.title} progress: ${pct}%`}
                                >
                                  <div
                                    className={`h-2 rounded-full transition-all duration-500 ${
                                      isDone ? 'bg-green-500' : 'bg-indigo-600'
                                    }`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>

                              {/* Next lesson preview */}
                              {nextLesson && !isDone && (
                                <p className="text-xs text-gray-500">
                                  <span className="font-medium text-gray-700">Up next:</span>{' '}
                                  {nextLesson.title}
                                </p>
                              )}

                              {/* Action button */}
                              <div className="flex justify-end">
                                <Link
                                  href={`/learn/${course.id}/${continueId}`}
                                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${
                                    isDone
                                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:ring-gray-400'
                                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                  }`}
                                >
                                  {continueLabel}
                                  {!isDone && <ChevronRight className="w-4 h-4" aria-hidden="true" />}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                /* Empty state */
                <div
                  className="bg-white rounded-xl border border-gray-200 py-20 px-4 text-center"
                  role="status"
                >
                  {activeTab === 'Completed' ? (
                    <>
                      <Award className="w-14 h-14 text-gray-300 mx-auto mb-4" aria-hidden="true" />
                      <h3 className="text-lg font-semibold text-gray-900">No completed courses yet</h3>
                      <p className="text-gray-600 mt-2 max-w-xs mx-auto">
                        Keep going! Your completed courses will appear here.
                      </p>
                    </>
                  ) : activeTab === 'In Progress' ? (
                    <>
                      <BookOpen className="w-14 h-14 text-gray-300 mx-auto mb-4" aria-hidden="true" />
                      <h3 className="text-lg font-semibold text-gray-900">No courses in progress</h3>
                      <p className="text-gray-600 mt-2">All your courses are completed — great work!</p>
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-14 h-14 text-gray-300 mx-auto mb-4" aria-hidden="true" />
                      <h3 className="text-lg font-semibold text-gray-900">No courses enrolled yet</h3>
                      <p className="text-gray-600 mt-2">Explore the catalog to find your first course.</p>
                      <Link
                        href="/courses"
                        className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors min-h-[44px] leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                      >
                        Explore Courses
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Upcoming Deadlines panel ────────────────────────── */}
          <aside className="lg:w-72 shrink-0" aria-labelledby="deadlines-heading">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sticky top-24">
              <h2
                id="deadlines-heading"
                className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4"
              >
                <CalendarDays className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                Upcoming Deadlines
              </h2>

              {upcomingDeadlines.length === 0 ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-2" aria-hidden="true" />
                  <p className="text-sm text-gray-600 font-medium">You&apos;re all caught up! 🎉</p>
                  <p className="text-xs text-gray-400 mt-1">No pending assignments right now.</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {upcomingDeadlines.map((a) => (
                    <li key={a.id}>
                      <Link
                        href={`/assignments/${a.id}`}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      >
                        <AlertCircle
                          className="w-4 h-4 text-amber-500 mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 group-hover:text-indigo-600 truncate transition-colors">
                            {a.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{a.courseName}</p>
                          <p className="text-xs text-amber-600 font-medium mt-0.5">
                            {daysUntil(a.dueDate)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                <Link
                  href="/assignments"
                  className="flex-1 text-center text-sm font-medium text-indigo-600 hover:text-indigo-700 py-2 rounded-lg hover:bg-indigo-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  All Assignments
                </Link>
                <Link
                  href="/calendar"
                  className="flex-1 text-center text-sm font-medium text-indigo-600 hover:text-indigo-700 py-2 rounded-lg hover:bg-indigo-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  Calendar
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
