import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date('2026-09-01');
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1) return `In ${diffDays} days`;
  return `${Math.abs(diffDays)} days ago`;
}

export function getProgressColor(progress: number): string {
  if (progress >= 80) return 'text-emerald-600';
  if (progress >= 50) return 'text-blue-600';
  if (progress >= 30) return 'text-amber-600';
  return 'text-slate-500';
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Beginner': return 'bg-emerald-100 text-emerald-700';
    case 'Intermediate': return 'bg-blue-100 text-blue-700';
    case 'Advanced': return 'bg-red-100 text-red-700';
    default: return 'bg-slate-100 text-slate-700';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'not_submitted': return 'bg-amber-100 text-amber-700';
    case 'submitted': return 'bg-blue-100 text-blue-700';
    case 'graded': return 'bg-emerald-100 text-emerald-700';
    default: return 'bg-slate-100 text-slate-700';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'not_submitted': return 'Not Submitted';
    case 'submitted': return 'Submitted';
    case 'graded': return 'Graded';
    default: return status;
  }
}

export function getTotalLessons(course: { modules: { lessons: unknown[] }[] }): number {
  return course.modules.reduce((total, module) => total + module.lessons.length, 0);
}

export function getCompletedLessons(course: { modules: { lessons: { completed?: boolean }[] }[] }): number {
  return course.modules.reduce((total, module) => {
    return total + module.lessons.filter((l) => !!l.completed).length;
  }, 0);
}

export function getGradeLetter(percentage: number): string {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}
