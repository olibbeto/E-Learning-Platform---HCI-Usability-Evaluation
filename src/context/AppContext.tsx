"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { User, Course, Notification, Assignment, QuizResult, GradeEntry } from '@/types';
import { 
  currentUser as mockUser, 
  courses as mockCourses, 
  notifications as mockNotifications,
  assignments as mockAssignments,
  grades as mockGrades,
} from '@/data/mock-data';
import { getTotalLessons, getCompletedLessons } from '@/lib/utils';

interface AppContextType {
  currentUser: User | null;
  enrolledCourses: Course[];
  allCourses: Course[];
  notifications: Notification[];
  assignments: Assignment[];
  grades: GradeEntry[];
  quizResults: Record<string, QuizResult>;
  unreadNotificationsCount: number;
  enrollInCourse: (courseId: string) => void;
  markLessonComplete: (courseId: string, moduleId: string, lessonId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  submitAssignment: (assignmentId: string, fileName: string) => void;
  saveQuizResult: (result: QuizResult) => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUser);
  const [allCourses, setAllCourses] = useState<Course[]>(mockCourses);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [grades] = useState<GradeEntry[]>(mockGrades);
  const [quizResults, setQuizResults] = useState<Record<string, QuizResult>>({});

  const enrolledCourses = useMemo(() => {
    return allCourses.filter(course => course.enrolled);
  }, [allCourses]);

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const enrollInCourse = useCallback((courseId: string) => {
    setAllCourses(prev => prev.map(course => 
      course.id === courseId ? { ...course, enrolled: true, progress: 0 } : course
    ));
  }, []);

  const markLessonComplete = useCallback((courseId: string, moduleId: string, lessonId: string) => {
    setAllCourses(prev => prev.map(course => {
      if (course.id !== courseId) return course;

      let newCourse = { ...course };
      const updatedModules = newCourse.modules.map(module => {
        if (module.id !== moduleId) return module;
        return {
          ...module,
          lessons: module.lessons.map(lesson => 
            lesson.id === lessonId ? { ...lesson, completed: true } : lesson
          )
        };
      });

      newCourse.modules = updatedModules;
      
      const totalLessons = getTotalLessons(newCourse);
      const completedLessons = getCompletedLessons(newCourse);
      newCourse.progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      return newCourse;
    }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const submitAssignment = useCallback((assignmentId: string, fileName: string) => {
    setAssignments(prev => prev.map(a => 
      a.id === assignmentId ? { 
        ...a, 
        status: 'submitted', 
        submittedAt: new Date().toISOString(),
        submittedFile: fileName
      } : a
    ));
  }, []);

  const saveQuizResult = useCallback((result: QuizResult) => {
    setQuizResults(prev => ({
      ...prev,
      [result.quizId]: result
    }));
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setCurrentUser((prev: User | null) => prev ? { ...prev, ...updates } : null);
  }, []);

  const value = {
    currentUser,
    enrolledCourses,
    allCourses,
    notifications,
    assignments,
    grades,
    quizResults,
    unreadNotificationsCount,
    enrollInCourse,
    markLessonComplete,
    markNotificationRead,
    markAllNotificationsRead,
    submitAssignment,
    saveQuizResult,
    updateProfile
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
