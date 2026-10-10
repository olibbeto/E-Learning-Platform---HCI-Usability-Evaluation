'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types';
import { Star, Clock, Users, BookOpen } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { cn, getTotalLessons, getCompletedLessons } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  variant?: 'catalog' | 'enrolled' | 'recommended';
  onEnroll?: (courseId: string) => void;
}

/** Alt text per course id — falls back to the course title */
const courseAltText: Record<string, string> = {
  c1: 'Illustration of a wireframe interface with a cursor and user icon',
  c2: 'Illustration of a code editor and browser window with HTML tags',
  c3: 'Illustration of a shield with a padlock over a security network',
  c4: 'Illustration of a circular sprint diagram next to a kanban board',
  c5: 'Illustration of a router connected to a laptop, server and phone',
  c6: 'Illustration of stacked database cylinders connected to a data table',
  c7: 'Illustration of a phone wireframe next to a layout grid with color swatches',
  c8: 'Illustration of a terminal window with a cursor and curly-brace symbol',
};

/**
 * Thin wrapper that renders a course illustration using next/image (which
 * automatically prepends basePath/assetPrefix so images work on GitHub Pages),
 * and falls back to the gradient + book icon on error or when src is empty.
 */
function CourseIllustration({
  course,
  className = '',
}: {
  course: Course;
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const hasSrc = !!course.image && !imgError;
  const alt = courseAltText[course.id] ?? course.title;

  if (hasSrc) {
    return (
      <Image
        src={course.image}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={cn('object-cover transition-transform duration-500 group-hover:scale-105', className)}
        loading="lazy"
        onError={() => setImgError(true)}
        unoptimized
      />
    );
  }

  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center',
        course.color || 'bg-gradient-to-br from-indigo-500 to-purple-600',
        className,
      )}
    >
      <BookOpen className="w-16 h-16 text-white/30" aria-hidden="true" />
    </div>
  );
}

export function CourseCard({ course, variant = 'catalog', onEnroll }: CourseCardProps) {
  const isEnrolled = course.enrolled;
  const instructorName =
    typeof course.instructor === 'string'
      ? course.instructor
      : course.instructor?.name ?? 'Instructor';

  // ── catalog variant ───────────────────────────────────────────────────────
  const renderCatalog = () => (
    <div className="group flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
      <Link href={`/courses/${course.id}`} className="block relative aspect-[3/2] overflow-hidden">
        <CourseIllustration course={course} />
        {/* Category pill — top-left */}
        <div className="absolute top-2 left-2 z-10">
          <span className="px-2 py-1 bg-white/90 backdrop-blur text-xs font-medium rounded-md text-slate-700">
            {course.category}
          </span>
        </div>
        {/* Difficulty pill — top-right */}
        <div className="absolute top-2 right-2 z-10">
          <span className="px-2 py-1 bg-black/60 text-white text-xs font-medium rounded-md">
            {course.difficulty}
          </span>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link href={`/courses/${course.id}`} className="hover:text-indigo-600 transition-colors">
          <h3 className="font-bold text-lg text-slate-900 line-clamp-2 mb-1">{course.title}</h3>
        </Link>
        <p className="text-sm text-slate-600 mb-3">{instructorName}</p>

        <div className="flex items-center gap-4 text-sm text-slate-600 mb-4 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="font-medium">{course.rating}</span>
            <span className="text-slate-400">({course.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" aria-hidden="true" />
            <span>{course.students?.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span>{course.duration}</span>
          </div>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">
          {course.shortDescription || course.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="font-bold text-lg text-slate-900">{course.price}</span>
          {isEnrolled ? (
            <Link
              href={`/learn/${course.id}/${course.lastLessonId || ''}`}
              className="px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg text-sm hover:bg-indigo-100 transition-colors"
            >
              ✓ Enrolled
            </Link>
          ) : (
            <button
              onClick={() => onEnroll && onEnroll(course.id)}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg text-sm hover:bg-indigo-700 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // ── enrolled variant ──────────────────────────────────────────────────────
  const renderEnrolled = () => {
    const total = getTotalLessons(course);
    const completed = getCompletedLessons(course);
    return (
      <div className="flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
        <div className="flex items-start p-4 gap-4">
          <Link
            href={`/learn/${course.id}/${course.lastLessonId || ''}`}
            className="group shrink-0 w-24 h-24 rounded-lg overflow-hidden relative"
          >
            <CourseIllustration course={course} />
          </Link>
          <div className="flex-1 min-w-0">
            <Link
              href={`/learn/${course.id}/${course.lastLessonId || ''}`}
              className="hover:text-indigo-600 transition-colors"
            >
              <h3 className="font-bold text-slate-900 truncate mb-1">{course.title}</h3>
            </Link>
            <p className="text-sm text-slate-600 mb-3">{instructorName}</p>

            <div className="flex items-center gap-2 mb-1">
              <ProgressBar value={course.progress || 0} size="sm" />
              <span className="text-xs font-medium text-slate-600 shrink-0">{course.progress || 0}%</span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              {completed} of {total} lessons complete
            </p>

            <Link
              href={`/learn/${course.id}/${course.lastLessonId || ''}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg text-sm hover:bg-indigo-700 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Continue Learning →
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // ── recommended variant ───────────────────────────────────────────────────
  const renderRecommended = () => (
    <div className="flex gap-4 p-3 bg-white rounded-xl border border-slate-200 hover:border-indigo-200 hover:shadow-sm transition-all group">
      <Link href={`/courses/${course.id}`} className="shrink-0 w-20 h-20 rounded-lg overflow-hidden relative">
        <CourseIllustration course={course} />
      </Link>
      <div className="flex flex-col flex-1 py-1">
        <Link
          href={`/courses/${course.id}`}
          className="hover:text-indigo-600 transition-colors line-clamp-1 font-semibold text-slate-900 mb-1"
        >
          {course.title}
        </Link>
        <div className="flex items-center gap-3 text-xs text-slate-600 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="font-medium text-slate-700">{course.rating}</span>
          </div>
          <span>{course.difficulty}</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-sm text-slate-900">{course.price}</span>
          <button
            onClick={() => onEnroll && onEnroll(course.id)}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-md transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );

  if (variant === 'enrolled') return renderEnrolled();
  if (variant === 'recommended') return renderRecommended();
  return renderCatalog();
}
