"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, X } from "lucide-react";

export type SideDrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  /** When true, closing (backdrop/X/Escape) shows confirm dialog before closing */
  isDirty?: boolean;
  /** Labels for the exit gate confirm dialog */
  exitGateLabels?: {
    title: string;
    description: string;
    body?: string;
    confirm: string;
    cancel: string;
  };
  /** Footer content — if omitted, no footer is rendered */
  footer?: ReactNode;
  /** Max width tailwind class (default: "max-w-md") */
  maxWidth?: string;
  children: ReactNode;
};

const DEFAULT_EXIT_LABELS = {
  title: "Unsaved Changes",
  description: "You have unsaved changes. Are you sure you want to close?",
  body: "All unsaved changes will be lost.",
  confirm: "Discard",
  cancel: "Keep Editing",
};

export function SideDrawer({
  open,
  onClose,
  title,
  subtitle,
  icon,
  isDirty = false,
  exitGateLabels,
  footer,
  maxWidth = "max-w-md",
  children,
}: SideDrawerProps) {
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const clickStartedOnBackdrop = useRef(false);

  // Attempt to close — if dirty, show confirm dialog instead
  const attemptClose = useCallback(() => {
    if (isDirty) {
      setShowDiscardConfirm(true);
      return;
    }
    onClose();
  }, [isDirty, onClose]);

  // Force close (from discard confirm)
  const forceClose = useCallback(() => {
    setShowDiscardConfirm(false);
    onClose();
  }, [onClose]);

  // Reset confirm state when drawer closes
  useEffect(() => {
    if (!open) {
      setShowDiscardConfirm(false);
    }
  }, [open]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (showDiscardConfirm) {
          setShowDiscardConfirm(false);
        } else {
          attemptClose();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, attemptClose, showDiscardConfirm]);

  if (!open) return null;

  const labels = { ...DEFAULT_EXIT_LABELS, ...exitGateLabels };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex justify-end bg-black/30"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) clickStartedOnBackdrop.current = true;
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && clickStartedOnBackdrop.current) {
            attemptClose();
          }
          clickStartedOnBackdrop.current = false;
        }}
      >
        {/* Panel */}
        <div
          className={`flex h-full w-full ${maxWidth} flex-col bg-white shadow-xl animate-in slide-in-from-right duration-300`}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <header className="flex items-center justify-between border-b border-foreground/10 px-4 py-4">
            <div className="flex items-center gap-3 min-w-0">
              {icon && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {icon}
                </div>
              )}
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-foreground truncate">{title}</h2>
                {subtitle && (
                  <p className="text-xs text-foreground/50 truncate">{subtitle}</p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={attemptClose}
              className="rounded p-1 text-foreground/50 transition hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="border-t border-foreground/10 px-4 py-4">
              {footer}
            </div>
          )}
        </div>
      </div>

      {/* isDirty exit gate — inline confirm overlay */}
      {showDiscardConfirm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowDiscardConfirm(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              setShowDiscardConfirm(false);
            }
          }}
          role="presentation"
        >
          <div
            className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">{labels.title}</h3>
                <p className="text-sm text-slate-500">{labels.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowDiscardConfirm(false)}
                className="rounded-full p-1.5 text-slate-400 transition hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {labels.body && (
              <p className="mb-4 text-sm text-slate-700">{labels.body}</p>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDiscardConfirm(false)}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
              >
                {labels.cancel}
              </button>
              <button
                type="button"
                onClick={forceClose}
                className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-amber-700"
              >
                {labels.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
