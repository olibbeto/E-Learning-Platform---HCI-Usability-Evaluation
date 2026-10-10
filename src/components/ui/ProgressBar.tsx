import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export function ProgressBar({
  value,
  showLabel = false,
  size = "md",
  color = "bg-indigo-600",
  className
}: ProgressBarProps) {
  const normalizedValue = Math.min(Math.max(value, 0), 100);

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4"
  };

  return (
    <div className={cn("w-full flex items-center gap-3", className)}>
      <div
        className={cn("w-full bg-slate-200 rounded-full overflow-hidden", sizeClasses[size])}
        role="progressbar"
        aria-valuenow={normalizedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn("h-full transition-all duration-300 ease-in-out", color)}
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-slate-600 shrink-0 min-w-[3ch]">
          {Math.round(normalizedValue)}%
        </span>
      )}
    </div>
  );
}
