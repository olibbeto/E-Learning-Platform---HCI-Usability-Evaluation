"use client";

import React, { useState } from "react";
import { Course, Module, Lesson } from "@/types";
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  ArrowRightCircle, 
  Video, 
  BookOpen, 
  HelpCircle,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseSidebarProps {
  course: Course;
  currentLessonId: string;
  onLessonSelect: (moduleId: string, lessonId: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function CourseSidebar({
  course,
  currentLessonId,
  onLessonSelect,
  isOpen = false,
  onClose
}: CourseSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    course.modules.reduce((acc, mod) => ({ ...acc, [mod.id]: true }), {})
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'reading':
        return <BookOpen className="w-4 h-4" />;
      case 'quiz':
        return <HelpCircle className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (lesson: Lesson) => {
    if (lesson.completed) {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }
    if (lesson.id === currentLessonId) {
      return <ArrowRightCircle className="w-5 h-5 text-indigo-600" />;
    }
    return <Circle className="w-5 h-5 text-slate-300" />;
  };

  const SidebarContent = (
    <div className="h-full flex flex-col bg-white border-r border-slate-200 w-80 shadow-sm">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h2 className="font-semibold text-slate-800 line-clamp-2">{course.title}</h2>
        {onClose && (
          <button onClick={onClose} className="md:hidden p-1 text-slate-500 hover:bg-slate-200 rounded-md">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {course.modules.map((module) => (
          <div key={module.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2 text-left">
                <span className="font-medium text-slate-800">{module.title}</span>
              </div>
              {expandedModules[module.id] ? (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-500" />
              )}
            </button>
            
            {expandedModules[module.id] && (
              <div className="divide-y divide-slate-100">
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => onLessonSelect(module.id, lesson.id)}
                    className={cn(
                      "w-full flex items-start gap-3 p-3 text-left transition-colors hover:bg-slate-50",
                      currentLessonId === lesson.id ? "bg-indigo-50/50" : ""
                    )}
                  >
                    <div className="mt-0.5 shrink-0">
                      {getStatusIcon(lesson)}
                    </div>
                    <div className="flex-1">
                      <div className={cn(
                        "text-sm font-medium",
                        currentLessonId === lesson.id ? "text-indigo-700" : "text-slate-700"
                      )}>
                        {lesson.title}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
                        {getLessonIcon(lesson.type)}
                        <span className="capitalize">{lesson.type}</span>
                        {lesson.duration && (
                          <>
                            <span>•</span>
                            <span>{lesson.duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 pt-16 z-40">
        {SidebarContent}
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={onClose} />
          <div className="relative flex-1 flex max-w-xs w-full bg-white transition-transform duration-300 transform translate-x-0">
            {SidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
