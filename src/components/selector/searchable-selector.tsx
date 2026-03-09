"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { Loader2, Search } from "lucide-react";
import {
  SelectTrigger,
  SelectDropdown,
  SelectOptionRow,
  useDropdown,
  type SelectOption,
} from "./select-primitives";

export type SearchableSelectorProps<T extends string = string> = {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  /** Placeholder shown inside the search input when the dropdown is open */
  searchPlaceholder?: string;
  allowDeselect?: boolean;
  disabled?: boolean;
  error?: boolean;
  /** Custom match function. Defaults to case-insensitive label match. */
  filterFn?: (option: SelectOption<T>, query: string) => boolean;
  /** Show a spinner in the search input */
  loading?: boolean;
  /** Message when filter yields no results */
  emptyMessage?: string;
  renderOption?: (option: SelectOption<T>) => ReactNode;
  renderValue?: (option: SelectOption<T>) => ReactNode;
};

function defaultFilter<T extends string>(option: SelectOption<T>, query: string): boolean {
  return option.label.toLowerCase().includes(query.toLowerCase());
}

export function SearchableSelector<T extends string = string>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  allowDeselect = false,
  disabled = false,
  error = false,
  filterFn = defaultFilter,
  loading = false,
  emptyMessage = "No results found",
  renderOption,
  renderValue,
}: SearchableSelectorProps<T>) {
  const { isOpen, open, close } = useDropdown();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;
    return options.filter((opt) => filterFn(opt, query));
  }, [options, query, filterFn]);

  const handleOpen = () => {
    setQuery("");
    open();
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleSelect = (opt: SelectOption<T>) => {
    onChange(opt.value);
    setQuery("");
    close();
  };

  const handleClear = () => {
    onChange("" as T);
    setQuery("");
  };

  const handleClose = () => {
    setQuery("");
    close();
  };

  return (
    <div className="relative">
      <SelectTrigger
        onClick={handleOpen}
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

      <SelectDropdown isOpen={isOpen} onClose={handleClose}>
        {/* Search input */}
        <div className="flex items-center gap-2 border-b border-foreground/10 px-3 py-2">
          <Search className="h-4 w-4 shrink-0 text-foreground/30" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/30 focus:outline-none"
          />
          {loading && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-foreground/30" />}
        </div>

        {/* Options list */}
        {loading && filteredOptions.length === 0 ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-foreground/30" />
          </div>
        ) : filteredOptions.length === 0 ? (
          <div className="px-3 py-4 text-center text-sm text-foreground/40">
            {emptyMessage}
          </div>
        ) : (
          <ul className="max-h-64 overflow-y-auto py-1">
            {filteredOptions.map((opt) => (
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
        )}
      </SelectDropdown>
    </div>
  );
}
