"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { useDropdown, type SelectOption } from "./selector/select-primitives";

/* ── Types ── */

export type NationalityOption = {
  code: string;
  flagEmoji: string;
  nationality: string;
  countryName?: string;
  /** Alternative country names for exact search (e.g., "England, Great Britain") */
  searchAliases?: string;
  /** Languages spoken — only used for fuzzy/suggestion search */
  languages?: string;
};

export type NationalitySelectorProps = {
  options: NationalityOption[];
  prioritizedCodes?: string[];
  value: string;
  onChange: (code: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  suggestMessage?: string;
  disabled?: boolean;
  error?: boolean;
  allowDeselect?: boolean;
};

const DIVIDER_VALUE = "__divider__";

export function NationalitySelector({
  options,
  prioritizedCodes = [],
  value,
  onChange,
  placeholder = "Select nationality...",
  searchPlaceholder = "Search...",
  suggestMessage = "We couldn\u2019t find an exact match, but based on language and country names, you might be looking for:",
  disabled = false,
  error = false,
  allowDeselect = false,
}: NationalitySelectorProps) {
  const { isOpen, open, close } = useDropdown();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  /* Exact search: nationality, country name, code, aliases */
  const exactIndex = useMemo(() => {
    const map = new Map<string, string>();
    for (const o of options) {
      map.set(o.code, [o.nationality, o.countryName, o.code, o.searchAliases].filter(Boolean).join(" ").toLowerCase());
    }
    return map;
  }, [options]);

  /* Fuzzy search: everything including languages */
  const fuzzyIndex = useMemo(() => {
    const map = new Map<string, string>();
    for (const o of options) {
      map.set(o.code, [o.nationality, o.countryName, o.code, o.searchAliases, o.languages].filter(Boolean).join(" ").toLowerCase());
    }
    return map;
  }, [options]);

  const labelIndex = useMemo(() => {
    const map = new Map<string, string>();
    for (const o of options) {
      map.set(o.code, o.countryName ? `${o.countryName} \u2013 ${o.nationality}` : o.nationality);
    }
    return map;
  }, [options]);

  const selectOptions = useMemo(() => {
    const codeSet = new Set(prioritizedCodes);
    const prioritized = prioritizedCodes
      .map((code) => options.find((o) => o.code === code))
      .filter((o): o is NationalityOption => !!o)
      .map(toSelectOption);
    const rest = options
      .filter((o) => !codeSet.has(o.code))
      .sort((a, b) => a.nationality.localeCompare(b.nationality))
      .map(toSelectOption);
    if (prioritized.length > 0 && rest.length > 0) {
      return [...prioritized, { value: DIVIDER_VALUE, label: "", disabled: true } as SelectOption, ...rest];
    }
    return [...prioritized, ...rest];
  }, [options, prioritizedCodes]);

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return selectOptions;
    const q = query.toLowerCase();
    return selectOptions.filter((opt) => {
      if (opt.value === DIVIDER_VALUE) return false;
      return (exactIndex.get(opt.value) ?? "").includes(q);
    });
  }, [selectOptions, query, exactIndex]);

  const suggestions = useMemo(() => {
    if (!query.trim() || filteredOptions.length > 0) return [];
    const q = query.toLowerCase();
    const scored: { option: SelectOption; score: number }[] = [];
    for (const opt of selectOptions) {
      if (opt.value === DIVIDER_VALUE) continue;
      const words = (fuzzyIndex.get(opt.value) ?? "").split(/[\s,]+/);
      let score = 0;
      for (const word of words) {
        if (word.startsWith(q)) score += 10 + (q.length / word.length) * 5;
        else if (word.includes(q)) score += 5;
      }
      if (score > 0) scored.push({ option: opt, score });
    }
    return scored.sort((a, b) => b.score - a.score).map((s) => s.option);
  }, [query, filteredOptions, selectOptions, fuzzyIndex]);

  const selectedOption = selectOptions.find((o) => o.value === value);

  const handleOpen = () => { setQuery(""); open(); requestAnimationFrame(() => inputRef.current?.focus()); };
  const handleSelect = (v: string) => { onChange(v); setQuery(""); close(); };
  const handleClear = (e: React.MouseEvent) => { e.stopPropagation(); onChange(""); setQuery(""); };
  const handleClose = () => { setQuery(""); close(); };

  const triggerBorder = error
    ? "border-red-300 ring-1 ring-red-500/20"
    : isOpen
      ? "border-primary ring-1 ring-primary"
      : "border-slate-300 hover:border-slate-400";

  return (
    <div className="relative">
      {/* Trigger — matches form input styling */}
      <div
        role="combobox"
        aria-expanded={isOpen}
        tabIndex={disabled ? -1 : 0}
        onClick={disabled ? undefined : handleOpen}
        onKeyDown={disabled ? undefined : (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleOpen(); } }}
        className={`flex w-full cursor-pointer items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm transition ${triggerBorder} ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2.5 truncate">
          {selectedOption ? (
            <>
              {selectedOption.icon && <span className="shrink-0 text-base leading-none">{selectedOption.icon}</span>}
              <span className="truncate text-slate-900">{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-slate-400">{placeholder}</span>
          )}
        </div>
        {allowDeselect && selectedOption && (
          <button type="button" onClick={handleClear} className="rounded-full p-0.5 text-slate-400 transition hover:text-slate-600" aria-label="Clear">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={handleClose} />
          <div className="absolute left-0 z-20 mt-1.5 w-80 max-w-96 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
            {/* Search — fixed at top */}
            <div className="flex items-center gap-2.5 border-b border-slate-100 px-3.5 py-2.5">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            {/* Scrollable list — max height applied directly here */}
            <div className="max-h-64 overflow-y-auto overscroll-contain [scrollbar-width:none]">
              {filteredOptions.length > 0 ? (
                <ul className="py-1">
                  {filteredOptions.map((opt) => (
                    <li key={opt.value}>
                      {opt.value === DIVIDER_VALUE ? (
                        <div className="mx-3 my-1"><div className="border-t border-slate-100" /></div>
                      ) : (
                        <Option opt={opt} selected={value === opt.value} onSelect={handleSelect} />
                      )}
                    </li>
                  ))}
                </ul>
              ) : suggestions.length > 0 ? (
                <div className="py-2">
                  <p className="px-3.5 pb-2 text-xs leading-relaxed text-slate-400">{suggestMessage}</p>
                  <ul>
                    {suggestions.map((opt) => (
                      <li key={opt.value}>
                        <Option opt={opt} selected={value === opt.value} onSelect={handleSelect} label={labelIndex.get(opt.value)} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="px-3.5 py-4 text-center text-sm text-slate-400">No results found</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Option({ opt, selected, onSelect, label }: { opt: SelectOption; selected: boolean; onSelect: (v: string) => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(opt.value)}
      className={`flex w-full items-center gap-3 px-3.5 py-2 text-left text-sm transition ${
        selected ? "bg-primary/5 font-medium text-primary" : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      {opt.icon && <span className="shrink-0 text-base leading-none">{opt.icon}</span>}
      <span className="flex-1 truncate">{label ?? opt.label}</span>
    </button>
  );
}

function toSelectOption(opt: NationalityOption): SelectOption {
  return { value: opt.code, label: opt.nationality, icon: opt.flagEmoji };
}
