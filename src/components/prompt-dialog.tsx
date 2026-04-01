"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";

export type PromptDialogProps = {
  open: boolean;
  onSubmit: (value: string) => void;
  onCancel: () => void;
  title: string;
  description?: string;
  /** Icon displayed beside the title */
  icon?: ReactNode;
  /** Input placeholder text */
  placeholder?: string;
  /** Submit button label (default: "Submit") */
  submitLabel?: string;
  /** Cancel button label (default: "Cancel") */
  cancelLabel?: string;
  /** Button color variant */
  variant?: "primary" | "danger" | "amber";
  /** Whether the text input is required (default: false) */
  required?: boolean;
  /** Use textarea instead of single-line input (default: true) */
  multiline?: boolean;
};

const VARIANT_CLASSES: Record<string, string> = {
  primary: "bg-primary text-white hover:bg-primary/90",
  danger: "bg-red-600 text-white hover:bg-red-700",
  amber: "bg-amber-600 text-white hover:bg-amber-700",
};

export function PromptDialog({
  open,
  onSubmit,
  onCancel,
  title,
  description,
  icon,
  placeholder = "",
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  variant = "primary",
  required = false,
  multiline = true,
}: PromptDialogProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  // Reset value and focus input when opening
  useEffect(() => {
    if (open) {
      setValue("");
      // Focus on next tick after render
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Escape key closes
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  const handleSubmit = useCallback(() => {
    if (required && !value.trim()) return;
    onSubmit(value.trim());
  }, [value, required, onSubmit]);

  // Ctrl/Cmd+Enter to submit
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSubmit();
      }
      // Single-line: Enter submits
      if (!multiline && e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit, multiline]
  );

  if (!open) return null;

  const isDisabled = required && !value.trim();

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onCancel}
      role="presentation"
    >
      <div
        className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          {icon && (
            <div className="shrink-0 rounded-full bg-slate-100 p-3 text-slate-600">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            {description && (
              <p className="text-sm text-slate-500">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full p-1.5 text-slate-400 transition hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Input */}
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={3}
            className="mb-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="mb-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`rounded-full px-4 py-2 text-sm font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]}`}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
