"use client";

import { Selector } from "./selector";
import type { SelectOption } from "./selector";

/* ── Types ── */

export type TitleOption = {
  /** ID from contact_titles table (e.g., "mr", "mrs") */
  id: string;
  /** Display label (e.g., "Mr.", "Mrs.") — can be localized */
  label: string;
};

export type TitleSelectorProps = {
  options: TitleOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
};

/* ── Component ── */

export function TitleSelector({
  options,
  value,
  onChange,
  placeholder = "Title",
  disabled = false,
  error = false,
}: TitleSelectorProps) {
  const selectOptions: SelectOption[] = options.map((o) => ({
    value: o.id,
    label: o.label,
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
