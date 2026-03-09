"use client";

import type { ReactNode } from "react";
import {
  SelectTrigger,
  SelectDropdown,
  SelectOptionRow,
  useDropdown,
  type SelectOption,
} from "./select-primitives";

export type SelectorProps<T extends string = string> = {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  /** When true, shows ✕ clear button and allows resetting to "" */
  allowDeselect?: boolean;
  disabled?: boolean;
  error?: boolean;
  /** Custom rendering for each option row in the dropdown */
  renderOption?: (option: SelectOption<T>) => ReactNode;
  /** Custom rendering for the selected value in the trigger */
  renderValue?: (option: SelectOption<T>) => ReactNode;
};

export function Selector<T extends string = string>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  allowDeselect = false,
  disabled = false,
  error = false,
  renderOption,
  renderValue,
}: SelectorProps<T>) {
  const { isOpen, toggle, close } = useDropdown();

  const selectedOption = options.find((o) => o.value === value);

  const handleSelect = (opt: SelectOption<T>) => {
    onChange(opt.value);
    close();
  };

  const handleClear = () => {
    onChange("" as T);
  };

  return (
    <div className="relative">
      <SelectTrigger
        onClick={toggle}
        onClear={handleClear}
        disabled={disabled}
        error={error}
        isOpen={isOpen}
        showClear={allowDeselect && !!selectedOption}
      >
        {selectedOption ? (
          renderValue ? (
            renderValue(selectedOption)
          ) : (
            <span className="text-foreground">
              {selectedOption.icon && (
                <span className="mr-2 inline-block text-base leading-none align-middle">
                  {selectedOption.icon}
                </span>
              )}
              {selectedOption.label}
            </span>
          )
        ) : (
          <span className="text-foreground/30">{placeholder}</span>
        )}
      </SelectTrigger>

      <SelectDropdown isOpen={isOpen} onClose={close}>
        <ul className="max-h-64 overflow-y-auto py-1">
          {options.map((opt) => (
            <li key={opt.value}>
              <SelectOptionRow
                option={opt}
                isSelected={value === opt.value}
                onClick={() => handleSelect(opt)}
                renderOption={renderOption}
              />
            </li>
          ))}
        </ul>
      </SelectDropdown>
    </div>
  );
}
