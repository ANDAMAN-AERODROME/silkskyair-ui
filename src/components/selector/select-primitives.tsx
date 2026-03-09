"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, X } from "lucide-react";

/* ── Shared option type ──────────────────────────────────────────── */

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
};

/* ── Trigger ─────────────────────────────────────────────────────── */

type TriggerProps = {
  onClick: () => void;
  onClear?: () => void;
  disabled?: boolean;
  error?: boolean;
  isOpen: boolean;
  children: ReactNode;
  showClear?: boolean;
};

export function SelectTrigger({
  onClick,
  onClear,
  disabled = false,
  error = false,
  isOpen,
  children,
  showClear = false,
}: TriggerProps) {
  const borderClass = error
    ? "border-red-300 focus-within:border-red-500 focus-within:ring-red-500/30"
    : isOpen
      ? "border-primary ring-2 ring-primary/20"
      : "border-foreground/15 hover:border-foreground/25";

  return (
    <div
      role="combobox"
      aria-expanded={isOpen}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onClick}
      onKeyDown={disabled ? undefined : (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`flex w-full cursor-pointer items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm transition ${borderClass} ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <div className="flex-1 min-w-0 truncate">{children}</div>
      {showClear && onClear && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="rounded-full p-0.5 text-foreground/40 transition hover:text-foreground/70"
          aria-label="Clear selection"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
      <ChevronDown
        className={`h-4 w-4 shrink-0 text-foreground/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </div>
  );
}

/* ── Dropdown shell ──────────────────────────────────────────────── */

type DropdownProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function SelectDropdown({ isOpen, onClose, children }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div
        ref={ref}
        className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-foreground/10 bg-background shadow-lg"
      >
        {children}
      </div>
    </>
  );
}

/* ── Option row ──────────────────────────────────────────────────── */

type OptionRowProps<T extends string = string> = {
  option: SelectOption<T>;
  isSelected: boolean;
  onClick: () => void;
  renderOption?: (option: SelectOption<T>) => ReactNode;
};

export function SelectOptionRow<T extends string = string>({
  option,
  isSelected,
  onClick,
  renderOption,
}: OptionRowProps<T>) {
  return (
    <button
      type="button"
      disabled={option.disabled}
      onClick={onClick}
      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${
        isSelected
          ? "bg-primary/5 font-medium text-primary"
          : "text-foreground hover:bg-foreground/5"
      } ${option.disabled ? "cursor-not-allowed opacity-40" : ""}`}
    >
      {renderOption ? (
        renderOption(option)
      ) : (
        <>
          {option.icon && (
            <span className="shrink-0 text-base leading-none">{option.icon}</span>
          )}
          <span className="flex-1 truncate">{option.label}</span>
        </>
      )}
    </button>
  );
}

/* ── useDropdown hook ────────────────────────────────────────────── */

export function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  return { isOpen, open, close, toggle };
}
