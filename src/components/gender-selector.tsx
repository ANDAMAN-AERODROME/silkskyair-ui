"use client";

import { Selector } from "./selector";
import type { SelectOption } from "./selector";

/* ── Types ── */

export type GenderValue = "male" | "female" | "other" | "prefer_not_to_say";

export type GenderOption = {
  id: string;
  label: string;
  icon?: string;
};

export type GenderSelectorProps = {
  options: GenderOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
};

/* ── Component ── */

export function GenderSelector({
  options,
  value,
  onChange,
  placeholder = "Gender",
  disabled = false,
  error = false,
}: GenderSelectorProps) {
  const selectOptions: SelectOption[] = options.map((o) => ({
    value: o.id,
    label: o.label,
    icon: o.icon,
  }));

  return (
    <Selector
      options={selectOptions}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      allowDeselect
      disabled={disabled}
      error={error}
    />
  );
}
