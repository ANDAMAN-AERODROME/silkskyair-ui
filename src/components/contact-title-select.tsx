"use client";

import { Selector } from "./selector";
import type { SelectOption } from "./selector";

export type ContactTitleSelectProps = {
  value: string;
  onChange: (value: string) => void;
  /** Title options from the database (localized) */
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
};

export function ContactTitleSelect({
  value,
  onChange,
  options,
  placeholder = "Select title...",
  disabled = false,
  error = false,
}: ContactTitleSelectProps) {
  return (
    <Selector
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      allowDeselect
      disabled={disabled}
      error={error}
    />
  );
}
