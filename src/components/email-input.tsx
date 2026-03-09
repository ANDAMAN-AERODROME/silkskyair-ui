"use client";

import { Mail } from "lucide-react";

export type EmailInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
};

export function EmailInput({
  value,
  onChange,
  placeholder = "colleague@example.com",
  disabled = false,
  error = false,
  className = "",
}: EmailInputProps) {
  const borderClass = error
    ? "border-red-300 focus:border-red-500 focus:ring-red-500/30"
    : "border-foreground/20 focus:border-primary focus:ring-primary";

  return (
    <div className={`relative ${className}`}>
      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-base border bg-background pl-10 pr-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-1 ${borderClass} ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
      />
    </div>
  );
}
