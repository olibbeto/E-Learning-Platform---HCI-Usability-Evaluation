export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  bio: string;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz';
  completed: boolean;
  description?: string;
  videoUrl?: string;
  content?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: Instructor;
  description: string;
  shortDescription: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  reviewCount: number;
  students: number;
  image: string;
  tags: string[];
  objectives: string[];
  modules: Module[];
  price: string;
  enrolled?: boolean;
  progress?: number;
  lastLesson?: string;
  lastLessonId?: string;
  lastAccessed?: string;
  grade?: number;
  color: string;
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  description: string;
  instructions: string[];
  dueDate: string;
  maxScore: number;
  status: 'not_submitted' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  submittedAt?: string;
  submittedFile?: string;
  resources: { name: string; url: string; type: string }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  timeLimit: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  quizId: string;
  score: number;
  total: number;
  answers: number[];
  completedAt: string;
}

export interface Notification {
  id: string;
  type: 'assignment' | 'grade' | 'lesson' | 'announcement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'assignment' | 'quiz' | 'lecture' | 'exam';
  courseId?: string;
  courseName?: string;
  description?: string;
  link?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export interface GradeEntry {
  id: string;
  title: string;
  type: 'assignment' | 'quiz' | 'exam';
  courseId: string;
  courseName: string;
  score: number;
  maxScore: number;
  date: string;
}
