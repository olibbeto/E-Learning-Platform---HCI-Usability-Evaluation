import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-slate-100 p-4 rounded-full mb-4">
        <Icon className="w-10 h-10 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 max-w-sm mb-6">{description}</p>
      
      {action && (
        <Link 
          href={action.href}
          className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg text-sm hover:bg-indigo-700 transition-colors shadow-sm"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
