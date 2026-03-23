"use client";

import { Selector } from "./selector";
import type { SelectOption } from "./selector";

/* ── Types ── */

export type WeightRangeOption = {
  id: string;
  label: string;
  icon?: string;
};

export type WeightRangeSelectorProps = {
  options: WeightRangeOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
};

/* ── Component ── */

export function WeightRangeSelector({
  options,
  value,
  onChange,
  placeholder = "Weight range",
  disabled = false,
  error = false,
}: WeightRangeSelectorProps) {
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
