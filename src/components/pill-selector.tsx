"use client";

import type { ReactNode } from "react";

export type PillOption<T extends string = string> = {
  value: T;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
};

type Props<T extends string = string> = {
  options: PillOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** When true, clicking the selected pill deselects it (sets value to "" as T) */
  allowDeselect?: boolean;
  size?: "sm" | "md";
};

export function PillSelector<T extends string = string>({
  options,
  value,
  onChange,
  allowDeselect = false,
  size = "md",
}: Props<T>) {
  const sizeClasses =
    size === "sm"
      ? "px-3 py-1.5 text-xs"
      : "px-4 py-2 text-sm";

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            disabled={option.disabled}
            onClick={() => {
              if (isSelected && allowDeselect) {
                onChange("" as T);
              } else if (!isSelected) {
                onChange(option.value);
              }
            }}
            className={`flex items-center gap-2 rounded-full font-medium transition ${sizeClasses} ${
              isSelected
                ? "bg-primary text-white ring-2 ring-primary/30"
                : "border border-foreground/15 bg-background text-foreground/60 hover:border-foreground/25 hover:text-foreground"
            } ${option.disabled ? "cursor-not-allowed opacity-40" : ""}`}
          >
            {option.icon && (
              <span className="text-base leading-none">{option.icon}</span>
            )}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
