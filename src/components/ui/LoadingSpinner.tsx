import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export function LoadingSpinner({ size = "md", text, className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div 
        className={cn(
          "rounded-full border-slate-200 border-t-indigo-600 animate-spin", 
          sizeClasses[size]
        )}
      />
      {text && (
        <p className="text-sm font-medium text-slate-600 animate-pulse">{text}</p>
      )}
    </div>
  );
}
