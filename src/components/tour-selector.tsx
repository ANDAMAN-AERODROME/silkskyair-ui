"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import { Check, Loader2, Search } from "lucide-react";
import {
  SelectTrigger,
  SelectDropdown,
  useDropdown,
  type SelectOption,
} from "./selector/select-primitives";

/* ── Domain type ─────────────────────────────────────────────────── */

export type TourOption = {
  slug: string;
  title: string;
};

/* ── Props (discriminated union: single vs multi) ────────────────── */

type TourSelectorBaseProps = {
  options: TourOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  error?: boolean;
  loading?: boolean;
};

type TourSelectorSingleProps = TourSelectorBaseProps & {
  multiple?: false;
  value: string;
  onChange: (slug: string) => void;
  allowDeselect?: boolean;
};

type TourSelectorMultiProps = TourSelectorBaseProps & {
  multiple: true;
  value: string[];
  onChange: (slugs: string[]) => void;
};

export type TourSelectorProps = TourSelectorSingleProps | TourSelectorMultiProps;

/* ── Helpers ─────────────────────────────────────────────────────── */

function toSelectOptions(tours: TourOption[]): SelectOption[] {
  return tours.map((t) => ({ value: t.slug, label: t.title }));
}

function defaultFilter(option: SelectOption, query: string): boolean {
  return option.label.toLowerCase().includes(query.toLowerCase());
}

/* ── Component ───────────────────────────────────────────────────── */

export function TourSelector(props: TourSelectorProps) {
  const {
    options,
    placeholder = "Select tour...",
    searchPlaceholder = "Search tours...",
    emptyMessage = "No tours found",
    disabled = false,
    error = false,
    loading = false,
  } = props;

  const { isOpen, open, close, toggle } = useDropdown();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isMulti = props.multiple === true;
  const selectOptions = useMemo(() => toSelectOptions(options), [options]);

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return selectOptions;
    return selectOptions.filter((opt) => defaultFilter(opt, query));
  }, [selectOptions, query]);

  /* ── Selection state ───────────────────────────────────────────── */

  const selectedSlugs: string[] = isMulti
    ? (props as TourSelectorMultiProps).value
    : (props as TourSelectorSingleProps).value
      ? [(props as TourSelectorSingleProps).value]
      : [];

  const isSelected = useCallback(
    (slug: string) => selectedSlugs.includes(slug),
    [selectedSlugs],
  );

  /* ── Handlers ──────────────────────────────────────────────────── */

  const handleOpen = useCallback(() => {
    setQuery("");
    open();
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const handleClose = useCallback(() => {
    setQuery("");
    close();
  }, [close]);

  const handleToggleOption = useCallback(
    (slug: string) => {
      if (isMulti) {
        const multiProps = props as TourSelectorMultiProps;
        const current = multiProps.value;
        const next = current.includes(slug)
          ? current.filter((s) => s !== slug)
          : [...current, slug];
        multiProps.onChange(next);
        // Stay open in multi-select mode
      } else {
        const singleProps = props as TourSelectorSingleProps;
        singleProps.onChange(slug);
        handleClose();
      }
    },
    [isMulti, props, handleClose],
  );

  const handleClear = useCallback(() => {
    if (isMulti) {
      (props as TourSelectorMultiProps).onChange([]);
    } else {
      (props as TourSelectorSingleProps).onChange("");
    }
    setQuery("");
  }, [isMulti, props]);

  /* ── Trigger label ─────────────────────────────────────────────── */

  const triggerContent = (() => {
    if (selectedSlugs.length === 0) {
      return <span className="text-foreground/30">{placeholder}</span>;
    }

    if (!isMulti) {
      const opt = options.find((o) => o.slug === selectedSlugs[0]);
      return (
        <span className="text-foreground">{opt?.title ?? selectedSlugs[0]}</span>
      );
    }

    // Multi-select: show count or single name
    if (selectedSlugs.length === 1) {
      const opt = options.find((o) => o.slug === selectedSlugs[0]);
      return (
        <span className="text-foreground">{opt?.title ?? selectedSlugs[0]}</span>
      );
    }

    return (
      <span className="text-foreground">
        {selectedSlugs.length} tours selected
      </span>
    );
  })();

  const showClear = isMulti
    ? selectedSlugs.length > 0
    : !!(props as TourSelectorSingleProps).allowDeselect && selectedSlugs.length > 0;

  /* ── Render ────────────────────────────────────────────────────── */

  return (
    <div className="relative">
      <SelectTrigger
        onClick={isOpen ? handleClose : handleOpen}
        onClear={handleClear}
        disabled={disabled}
        error={error}
        isOpen={isOpen}
        showClear={showClear}
      >
        {triggerContent}
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
          {loading && (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-foreground/30" />
          )}
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
            {filteredOptions.map((opt) => {
              const selected = isSelected(opt.value);
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => handleToggleOption(opt.value)}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${
                      selected
                        ? "bg-primary/5 font-medium text-primary"
                        : "text-foreground hover:bg-foreground/5"
                    } ${opt.disabled ? "cursor-not-allowed opacity-40" : ""}`}
                  >
                    {isMulti && (
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                          selected
                            ? "border-primary bg-primary text-white"
                            : "border-foreground/20 bg-background"
                        }`}
                      >
                        {selected && <Check className="h-3 w-3" />}
                      </span>
                    )}
                    <span className="flex-1 truncate">{opt.label}</span>
                    {!isMulti && selected && (
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </SelectDropdown>
    </div>
  );
}
