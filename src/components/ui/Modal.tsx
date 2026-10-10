"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: "default" | "danger";
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  variant = "default"
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 id="modal-title" className="text-lg font-semibold text-slate-900">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="px-6 py-5">
          <p className="text-slate-600 text-sm">
            {description}
          </p>
        </div>
        
        <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3 rounded-b-xl border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={cn(
              "px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors shadow-sm",
              variant === "danger" 
                ? "bg-red-600 hover:bg-red-700 focus:ring-red-500" 
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
