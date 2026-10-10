import React from "react";
import Link from "next/link";
import { Assignment } from "@/types";
import { BookOpen, CalendarIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssignmentCardProps {
  assignment: Assignment;
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "graded":
        return {
          label: "Graded",
          className: "bg-green-50 text-green-700 border-green-200"
        };
      case "submitted":
        return {
          label: "Submitted",
          className: "bg-blue-50 text-blue-700 border-blue-200"
        };
      case "not_submitted":
      default:
        return {
          label: "Not Submitted",
          className: "bg-amber-50 text-amber-700 border-amber-200"
        };
    }
  };

  const statusConfig = getStatusConfig(assignment.status);

  // Formatting date nicely (mock implementation)
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(date);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className={cn("px-2.5 py-0.5 text-xs font-medium rounded-full border", statusConfig.className)}>
            {statusConfig.label}
          </span>
          {assignment.status === "graded" && assignment.grade && (
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              {assignment.grade}/100
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-lg text-slate-900 mb-1">{assignment.title}</h3>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>{assignment.courseName}</span>
          </div>
          <div className="hidden sm:block text-slate-300">•</div>
          <div className="flex items-center gap-1.5 text-slate-600 font-medium">
            <CalendarIcon className="w-4 h-4 text-slate-400" />
            <span>Due: {formatDate(assignment.dueDate)}</span>
          </div>
        </div>
      </div>

      <div className="shrink-0 mt-2 sm:mt-0">
        <Link
          href={`/assignments/${assignment.id}`}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg text-sm hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-300 transition-colors w-full sm:w-auto group"
        >
          Open Assignment
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
        </Link>
      </div>
    </div>
  );
}
