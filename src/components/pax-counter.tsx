"use client";

import { Minus, Plus } from "lucide-react";

export type PaxCounterProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  disabled?: boolean;
};

export function PaxCounter({
  label,
  value,
  min,
  max,
  onChange,
  disabled = false,
}: PaxCounterProps) {
  return (
    <div>
      <span className="text-xs font-medium text-foreground/60">{label}</span>
      <div className="mt-1 flex items-center gap-3">
        <button
          type="button"
          disabled={disabled || value <= min}
          onClick={() => onChange(value - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-foreground/15 bg-background text-foreground/50 transition hover:border-primary hover:text-primary disabled:opacity-40"
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="flex min-w-[60px] flex-col items-center justify-center rounded-lg border border-foreground/10 bg-foreground/2 px-4 py-2">
          <span className="text-xl font-bold text-foreground">{value}</span>
        </div>
        <button
          type="button"
          disabled={disabled || value >= max}
          onClick={() => onChange(value + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-foreground/15 bg-background text-foreground/50 transition hover:border-primary hover:text-primary disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
