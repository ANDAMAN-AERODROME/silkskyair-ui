var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/components/pill-selector.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function PillSelector({
  options,
  value,
  onChange,
  allowDeselect = false,
  size = "md"
}) {
  const sizeClasses = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: options.map((option) => {
    const isSelected = value === option.value;
    return /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        disabled: option.disabled,
        onClick: () => {
          if (isSelected && allowDeselect) {
            onChange("");
          } else if (!isSelected) {
            onChange(option.value);
          }
        },
        className: `flex items-center gap-2 rounded-full font-medium transition ${sizeClasses} ${isSelected ? "bg-primary text-white ring-2 ring-primary/30" : "border border-foreground/15 bg-background text-foreground/60 hover:border-foreground/25 hover:text-foreground"} ${option.disabled ? "cursor-not-allowed opacity-40" : ""}`,
        children: [
          option.icon && /* @__PURE__ */ jsx("span", { className: "text-base leading-none", children: option.icon }),
          /* @__PURE__ */ jsx("span", { children: option.label })
        ]
      },
      option.value
    );
  }) });
}

// src/components/status-card.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var variants = {
  warning: {
    band: "bg-amber-50",
    icon: "text-amber-500",
    title: "text-amber-900",
    progressFilled: "bg-amber-400",
    progressTrack: "bg-amber-100",
    progressText: "text-amber-500",
    calloutBg: "bg-amber-50/60",
    calloutBorder: "border-amber-200/50",
    calloutIcon: "text-amber-400",
    calloutText: "text-amber-700/70"
  },
  info: {
    band: "bg-sky-50",
    icon: "text-sky-500",
    title: "text-sky-900",
    progressFilled: "bg-sky-400",
    progressTrack: "bg-sky-100",
    progressText: "text-sky-500",
    calloutBg: "bg-sky-50/60",
    calloutBorder: "border-sky-200/50",
    calloutIcon: "text-sky-400",
    calloutText: "text-sky-700/70"
  },
  success: {
    band: "bg-emerald-50",
    icon: "text-emerald-500",
    title: "text-emerald-900",
    progressFilled: "bg-emerald-400",
    progressTrack: "bg-emerald-100",
    progressText: "text-emerald-500",
    calloutBg: "bg-emerald-50/60",
    calloutBorder: "border-emerald-200/50",
    calloutIcon: "text-emerald-400",
    calloutText: "text-emerald-700/70"
  },
  error: {
    band: "bg-rose-50",
    icon: "text-rose-500",
    title: "text-rose-900",
    progressFilled: "bg-rose-400",
    progressTrack: "bg-rose-100",
    progressText: "text-rose-500",
    calloutBg: "bg-rose-50/60",
    calloutBorder: "border-rose-200/50",
    calloutIcon: "text-rose-400",
    calloutText: "text-rose-700/70"
  }
};
function StatusCard({
  variant = "info",
  icon,
  title,
  progress,
  children,
  callout
}) {
  const v = variants[variant];
  return /* @__PURE__ */ jsxs2("div", { className: "w-72", children: [
    /* @__PURE__ */ jsxs2("div", { className: `${v.band} px-4 py-3`, children: [
      /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsx2("span", { className: `${v.icon} shrink-0 [&>svg]:h-4 [&>svg]:w-4`, children: icon }),
        /* @__PURE__ */ jsx2("span", { className: `text-[13px] font-semibold leading-tight ${v.title}`, children: title }),
        progress && progress.max > 0 && /* @__PURE__ */ jsxs2(
          "span",
          {
            className: `ml-auto text-[11px] font-medium tabular-nums ${v.progressText}`,
            children: [
              progress.value,
              "/",
              progress.max
            ]
          }
        )
      ] }),
      progress && progress.max > 0 && /* @__PURE__ */ jsx2("div", { className: "mt-2 flex gap-0.5", children: Array.from({ length: progress.max }, (_, i) => /* @__PURE__ */ jsx2(
        "div",
        {
          className: `h-1 flex-1 rounded-full ${i < progress.value ? v.progressFilled : v.progressTrack}`
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "px-4 pt-3 pb-3.5", children: [
      /* @__PURE__ */ jsx2("div", { className: "text-xs leading-normal text-foreground/50", children }),
      callout && /* @__PURE__ */ jsxs2(
        "div",
        {
          className: `mt-2.5 flex items-start gap-2 rounded-md border ${v.calloutBorder} ${v.calloutBg} px-3 py-2`,
          children: [
            /* @__PURE__ */ jsx2("span", { className: `mt-px shrink-0 ${v.calloutIcon} [&>svg]:h-3.5 [&>svg]:w-3.5`, children: callout.icon }),
            /* @__PURE__ */ jsx2("div", { className: `text-[11px] leading-normal ${v.calloutText}`, children: callout.content })
          ]
        }
      )
    ] })
  ] });
}

// src/components/email-input.tsx
import { Mail } from "lucide-react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function EmailInput({
  value,
  onChange,
  placeholder = "colleague@example.com",
  disabled = false,
  error = false,
  className = ""
}) {
  const borderClass = error ? "border-red-300 focus:border-red-500 focus:ring-red-500/30" : "border-foreground/20 focus:border-primary focus:ring-primary";
  return /* @__PURE__ */ jsxs3("div", { className: `relative ${className}`, children: [
    /* @__PURE__ */ jsx3(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" }),
    /* @__PURE__ */ jsx3(
      "input",
      {
        type: "email",
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        disabled,
        className: `w-full rounded-base border bg-background pl-10 pr-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-1 ${borderClass} ${disabled ? "cursor-not-allowed opacity-60" : ""}`
      }
    )
  ] });
}

// src/components/side-drawer.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Fragment, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var DEFAULT_EXIT_LABELS = {
  title: "Unsaved Changes",
  description: "You have unsaved changes. Are you sure you want to close?",
  body: "All unsaved changes will be lost.",
  confirm: "Discard",
  cancel: "Keep Editing"
};
function SideDrawer({
  open,
  onClose,
  title,
  subtitle,
  icon,
  isDirty = false,
  exitGateLabels,
  footer,
  maxWidth = "max-w-md",
  children
}) {
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const clickStartedOnBackdrop = useRef(false);
  const attemptClose = useCallback(() => {
    if (isDirty) {
      setShowDiscardConfirm(true);
      return;
    }
    onClose();
  }, [isDirty, onClose]);
  const forceClose = useCallback(() => {
    setShowDiscardConfirm(false);
    onClose();
  }, [onClose]);
  useEffect(() => {
    if (!open) {
      setShowDiscardConfirm(false);
    }
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (showDiscardConfirm) {
          setShowDiscardConfirm(false);
        } else {
          attemptClose();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, attemptClose, showDiscardConfirm]);
  if (!open) return null;
  const labels = __spreadValues(__spreadValues({}, DEFAULT_EXIT_LABELS), exitGateLabels);
  return /* @__PURE__ */ jsxs4(Fragment, { children: [
    /* @__PURE__ */ jsx4(
      "div",
      {
        className: "fixed inset-0 z-50 flex justify-end bg-black/30",
        onMouseDown: (e) => {
          if (e.target === e.currentTarget) clickStartedOnBackdrop.current = true;
        },
        onClick: (e) => {
          if (e.target === e.currentTarget && clickStartedOnBackdrop.current) {
            attemptClose();
          }
          clickStartedOnBackdrop.current = false;
        },
        children: /* @__PURE__ */ jsxs4(
          "div",
          {
            className: `flex h-full w-full ${maxWidth} flex-col bg-white shadow-xl animate-in slide-in-from-right duration-300`,
            onMouseDown: (e) => e.stopPropagation(),
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs4("header", { className: "flex items-center justify-between border-b border-foreground/10 px-4 py-4", children: [
                /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-3 min-w-0", children: [
                  icon && /* @__PURE__ */ jsx4("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary", children: icon }),
                  /* @__PURE__ */ jsxs4("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx4("h2", { className: "text-lg font-semibold text-foreground truncate", children: title }),
                    subtitle && /* @__PURE__ */ jsx4("p", { className: "text-xs text-foreground/50 truncate", children: subtitle })
                  ] })
                ] }),
                /* @__PURE__ */ jsx4(
                  "button",
                  {
                    type: "button",
                    onClick: attemptClose,
                    className: "rounded p-1 text-foreground/50 transition hover:text-foreground",
                    children: /* @__PURE__ */ jsx4(X, { className: "h-5 w-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx4("div", { className: "flex-1 overflow-y-auto", children }),
              footer && /* @__PURE__ */ jsx4("div", { className: "border-t border-foreground/10 px-4 py-4", children: footer })
            ]
          }
        )
      }
    ),
    showDiscardConfirm && /* @__PURE__ */ jsx4(
      "div",
      {
        className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm",
        onClick: () => setShowDiscardConfirm(false),
        onKeyDown: (e) => {
          if (e.key === "Escape") {
            e.stopPropagation();
            setShowDiscardConfirm(false);
          }
        },
        role: "presentation",
        children: /* @__PURE__ */ jsxs4(
          "div",
          {
            className: "mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl",
            onClick: (e) => e.stopPropagation(),
            role: "dialog",
            "aria-modal": "true",
            children: [
              /* @__PURE__ */ jsxs4("div", { className: "mb-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsx4("div", { className: "rounded-full bg-amber-100 p-3 text-amber-600", children: /* @__PURE__ */ jsx4(AlertTriangle, { className: "h-6 w-6" }) }),
                /* @__PURE__ */ jsxs4("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsx4("h3", { className: "text-lg font-semibold text-slate-900", children: labels.title }),
                  /* @__PURE__ */ jsx4("p", { className: "text-sm text-slate-500", children: labels.description })
                ] }),
                /* @__PURE__ */ jsx4(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowDiscardConfirm(false),
                    className: "rounded-full p-1.5 text-slate-400 transition hover:text-slate-600",
                    children: /* @__PURE__ */ jsx4(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              labels.body && /* @__PURE__ */ jsx4("p", { className: "mb-4 text-sm text-slate-700", children: labels.body }),
              /* @__PURE__ */ jsxs4("div", { className: "flex justify-end gap-3", children: [
                /* @__PURE__ */ jsx4(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowDiscardConfirm(false),
                    className: "rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary",
                    children: labels.cancel
                  }
                ),
                /* @__PURE__ */ jsx4(
                  "button",
                  {
                    type: "button",
                    onClick: forceClose,
                    className: "rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-amber-700",
                    children: labels.confirm
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
}

// src/components/selector/select-primitives.tsx
import { useCallback as useCallback2, useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";
import { ChevronDown, X as X2 } from "lucide-react";
import { Fragment as Fragment2, jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function SelectTrigger({
  onClick,
  onClear,
  disabled = false,
  error = false,
  isOpen,
  children,
  showClear = false
}) {
  const borderClass = error ? "border-red-300 focus-within:border-red-500 focus-within:ring-red-500/30" : isOpen ? "border-primary ring-2 ring-primary/20" : "border-foreground/15 hover:border-foreground/25";
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      role: "combobox",
      "aria-expanded": isOpen,
      tabIndex: disabled ? -1 : 0,
      onClick: disabled ? void 0 : onClick,
      onKeyDown: disabled ? void 0 : (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      },
      className: `flex w-full cursor-pointer items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm transition ${borderClass} ${disabled ? "cursor-not-allowed opacity-60" : ""}`,
      children: [
        /* @__PURE__ */ jsx5("div", { className: "flex-1 min-w-0 truncate", children }),
        showClear && onClear && /* @__PURE__ */ jsx5(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              onClear();
            },
            className: "rounded-full p-0.5 text-foreground/40 transition hover:text-foreground/70",
            "aria-label": "Clear selection",
            children: /* @__PURE__ */ jsx5(X2, { className: "h-3.5 w-3.5" })
          }
        ),
        /* @__PURE__ */ jsx5(
          ChevronDown,
          {
            className: `h-4 w-4 shrink-0 text-foreground/40 transition-transform ${isOpen ? "rotate-180" : ""}`
          }
        )
      ]
    }
  );
}
function SelectDropdown({ isOpen, onClose, children }) {
  const ref = useRef2(null);
  useEffect2(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs5(Fragment2, { children: [
    /* @__PURE__ */ jsx5("div", { className: "fixed inset-0 z-10", onClick: onClose }),
    /* @__PURE__ */ jsx5(
      "div",
      {
        ref,
        className: "absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-foreground/10 bg-background shadow-lg",
        children
      }
    )
  ] });
}
function SelectOptionRow({
  option,
  isSelected,
  onClick,
  renderOption
}) {
  return /* @__PURE__ */ jsx5(
    "button",
    {
      type: "button",
      disabled: option.disabled,
      onClick,
      className: `flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${isSelected ? "bg-primary/5 font-medium text-primary" : "text-foreground hover:bg-foreground/5"} ${option.disabled ? "cursor-not-allowed opacity-40" : ""}`,
      children: renderOption ? renderOption(option) : /* @__PURE__ */ jsxs5(Fragment2, { children: [
        option.icon && /* @__PURE__ */ jsx5("span", { className: "shrink-0 text-base leading-none", children: option.icon }),
        /* @__PURE__ */ jsx5("span", { className: "flex-1 truncate", children: option.label })
      ] })
    }
  );
}
function useDropdown() {
  const [isOpen, setIsOpen] = useState2(false);
  const open = useCallback2(() => setIsOpen(true), []);
  const close = useCallback2(() => setIsOpen(false), []);
  const toggle = useCallback2(() => setIsOpen((v) => !v), []);
  return { isOpen, open, close, toggle };
}

// src/components/selector/selector.tsx
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function Selector({
  options,
  value,
  onChange,
  placeholder = "Select...",
  allowDeselect = false,
  disabled = false,
  error = false,
  renderOption,
  renderValue
}) {
  const { isOpen, toggle, close } = useDropdown();
  const selectedOption = options.find((o) => o.value === value);
  const handleSelect = (opt) => {
    onChange(opt.value);
    close();
  };
  const handleClear = () => {
    onChange("");
  };
  return /* @__PURE__ */ jsxs6("div", { className: "relative", children: [
    /* @__PURE__ */ jsx6(
      SelectTrigger,
      {
        onClick: toggle,
        onClear: handleClear,
        disabled,
        error,
        isOpen,
        showClear: allowDeselect && !!selectedOption,
        children: selectedOption ? renderValue ? renderValue(selectedOption) : /* @__PURE__ */ jsxs6("span", { className: "text-foreground", children: [
          selectedOption.icon && /* @__PURE__ */ jsx6("span", { className: "mr-2 inline-block text-base leading-none align-middle", children: selectedOption.icon }),
          selectedOption.label
        ] }) : /* @__PURE__ */ jsx6("span", { className: "text-foreground/30", children: placeholder })
      }
    ),
    /* @__PURE__ */ jsx6(SelectDropdown, { isOpen, onClose: close, children: /* @__PURE__ */ jsx6("ul", { className: "max-h-64 overflow-y-auto py-1", children: options.map((opt) => /* @__PURE__ */ jsx6("li", { children: /* @__PURE__ */ jsx6(
      SelectOptionRow,
      {
        option: opt,
        isSelected: value === opt.value,
        onClick: () => handleSelect(opt),
        renderOption
      }
    ) }, opt.value)) }) })
  ] });
}

// src/components/selector/searchable-selector.tsx
import { useMemo, useRef as useRef3, useState as useState3 } from "react";
import { Loader2, Search } from "lucide-react";
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
function defaultFilter(option, query) {
  return option.label.toLowerCase().includes(query.toLowerCase());
}
function SearchableSelector({
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
  renderValue
}) {
  const { isOpen, open, close } = useDropdown();
  const [query, setQuery] = useState3("");
  const inputRef = useRef3(null);
  const selectedOption = options.find((o) => o.value === value);
  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;
    return options.filter((opt) => filterFn(opt, query));
  }, [options, query, filterFn]);
  const handleOpen = () => {
    setQuery("");
    open();
    requestAnimationFrame(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.focus();
    });
  };
  const handleSelect = (opt) => {
    onChange(opt.value);
    setQuery("");
    close();
  };
  const handleClear = () => {
    onChange("");
    setQuery("");
  };
  const handleClose = () => {
    setQuery("");
    close();
  };
  return /* @__PURE__ */ jsxs7("div", { className: "relative", children: [
    /* @__PURE__ */ jsx7(
      SelectTrigger,
      {
        onClick: handleOpen,
        onClear: handleClear,
        disabled,
        error,
        isOpen,
        showClear: allowDeselect && !!selectedOption,
        children: selectedOption ? renderValue ? renderValue(selectedOption) : /* @__PURE__ */ jsxs7("span", { className: "text-foreground", children: [
          selectedOption.icon && /* @__PURE__ */ jsx7("span", { className: "mr-2 inline-block text-base leading-none align-middle", children: selectedOption.icon }),
          selectedOption.label
        ] }) : /* @__PURE__ */ jsx7("span", { className: "text-foreground/30", children: placeholder })
      }
    ),
    /* @__PURE__ */ jsxs7(SelectDropdown, { isOpen, onClose: handleClose, children: [
      /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-2 border-b border-foreground/10 px-3 py-2", children: [
        /* @__PURE__ */ jsx7(Search, { className: "h-4 w-4 shrink-0 text-foreground/30" }),
        /* @__PURE__ */ jsx7(
          "input",
          {
            ref: inputRef,
            type: "text",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: searchPlaceholder,
            className: "w-full bg-transparent text-sm text-foreground placeholder:text-foreground/30 focus:outline-none"
          }
        ),
        loading && /* @__PURE__ */ jsx7(Loader2, { className: "h-4 w-4 shrink-0 animate-spin text-foreground/30" })
      ] }),
      loading && filteredOptions.length === 0 ? /* @__PURE__ */ jsx7("div", { className: "flex items-center justify-center py-6", children: /* @__PURE__ */ jsx7(Loader2, { className: "h-5 w-5 animate-spin text-foreground/30" }) }) : filteredOptions.length === 0 ? /* @__PURE__ */ jsx7("div", { className: "px-3 py-4 text-center text-sm text-foreground/40", children: emptyMessage }) : /* @__PURE__ */ jsx7("ul", { className: "max-h-64 overflow-y-auto py-1", children: filteredOptions.map((opt) => /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(
        SelectOptionRow,
        {
          option: opt,
          isSelected: value === opt.value,
          onClick: () => handleSelect(opt),
          renderOption
        }
      ) }, opt.value)) })
    ] })
  ] });
}

// src/components/contact-title-select.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function ContactTitleSelect({
  value,
  onChange,
  options,
  placeholder = "Select title...",
  disabled = false,
  error = false
}) {
  return /* @__PURE__ */ jsx8(
    Selector,
    {
      options,
      value,
      onChange,
      placeholder,
      allowDeselect: true,
      disabled,
      error
    }
  );
}

// src/components/passport-image-editor.tsx
import { useCallback as useCallback3, useEffect as useEffect4, useRef as useRef4, useState as useState4 } from "react";
import { RotateCcw, RotateCw, Check } from "lucide-react";

// src/hooks/use-escape-close.ts
import { useEffect as useEffect3 } from "react";
function useEscapeClose(enabled, onClose) {
  useEffect3(() => {
    if (!enabled) return;
    const handler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [enabled, onClose]);
}

// src/lib/perspective-warp.ts
var GRID = 12;
function bilerp(tl, tr, br, bl, u, v) {
  const top = { x: tl.x + (tr.x - tl.x) * u, y: tl.y + (tr.y - tl.y) * u };
  const bot = { x: bl.x + (br.x - bl.x) * u, y: bl.y + (br.y - bl.y) * u };
  return { x: top.x + (bot.x - top.x) * v, y: top.y + (bot.y - top.y) * v };
}
function drawSubQuad(ctx, img, s0, s1, s2, s3, d0, d1, d2, d3) {
  drawTriangle(ctx, img, s0, s1, s3, d0, d1, d3);
  drawTriangle(ctx, img, s1, s2, s3, d1, d2, d3);
}
function drawTriangle(ctx, img, s0, s1, s2, d0, d1, d2) {
  const denom = (s0.x - s2.x) * (s1.y - s2.y) - (s1.x - s2.x) * (s0.y - s2.y);
  if (Math.abs(denom) < 1e-6) return;
  const a = ((d0.x - d2.x) * (s1.y - s2.y) - (d1.x - d2.x) * (s0.y - s2.y)) / denom;
  const b = ((d0.y - d2.y) * (s1.y - s2.y) - (d1.y - d2.y) * (s0.y - s2.y)) / denom;
  const c = ((d1.x - d2.x) * (s0.x - s2.x) - (d0.x - d2.x) * (s1.x - s2.x)) / denom;
  const d = ((d1.y - d2.y) * (s0.x - s2.x) - (d0.y - d2.y) * (s1.x - s2.x)) / denom;
  const e = d2.x - a * s2.x - c * s2.y;
  const f = d2.y - b * s2.x - d * s2.y;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(d0.x, d0.y);
  ctx.lineTo(d1.x, d1.y);
  ctx.lineTo(d2.x, d2.y);
  ctx.closePath();
  ctx.clip();
  ctx.setTransform(a, b, c, d, e, f);
  ctx.drawImage(img, 0, 0);
  ctx.restore();
}
function applyPerspectiveWarp(source, corners, rotationDeg) {
  const rotRad = rotationDeg * Math.PI / 180;
  const cos = Math.cos(rotRad);
  const sin = Math.sin(rotRad);
  const rotW = Math.abs(source.width * cos) + Math.abs(source.height * sin);
  const rotH = Math.abs(source.width * sin) + Math.abs(source.height * cos);
  const srcCanvas = document.createElement("canvas");
  srcCanvas.width = Math.ceil(rotW);
  srcCanvas.height = Math.ceil(rotH);
  const srcCtx = srcCanvas.getContext("2d");
  srcCtx.translate(rotW / 2, rotH / 2);
  srcCtx.rotate(rotRad);
  srcCtx.drawImage(source, -source.width / 2, -source.height / 2);
  const cx = source.width / 2;
  const cy = source.height / 2;
  const rotatedPts = corners.map((p) => ({
    x: (p.x - cx) * cos - (p.y - cy) * sin + rotW / 2,
    y: (p.x - cx) * sin + (p.y - cy) * cos + rotH / 2
  }));
  const bySum = [...rotatedPts].sort((a, b) => a.x + a.y - (b.x + b.y));
  const byDiff = [...rotatedPts].sort((a, b) => a.x - a.y - (b.x - b.y));
  const srcCorners = [
    bySum[0],
    // TL
    byDiff[3],
    // TR
    bySum[3],
    // BR
    byDiff[0]
    // BL
  ];
  const topLen = Math.hypot(srcCorners[1].x - srcCorners[0].x, srcCorners[1].y - srcCorners[0].y);
  const botLen = Math.hypot(srcCorners[2].x - srcCorners[3].x, srcCorners[2].y - srcCorners[3].y);
  const leftLen = Math.hypot(srcCorners[3].x - srcCorners[0].x, srcCorners[3].y - srcCorners[0].y);
  const rightLen = Math.hypot(srcCorners[2].x - srcCorners[1].x, srcCorners[2].y - srcCorners[1].y);
  const avgW = (topLen + botLen) / 2;
  const avgH = (leftLen + rightLen) / 2;
  const outW = Math.max(200, Math.min(Math.round(avgW), 2400));
  const outH = Math.max(140, Math.round(avgH * (outW / avgW)));
  const outCanvas = document.createElement("canvas");
  outCanvas.width = outW;
  outCanvas.height = outH;
  const ctx = outCanvas.getContext("2d");
  const [tl, tr, br, bl] = srcCorners;
  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      const u0 = col / GRID;
      const u1 = (col + 1) / GRID;
      const v0 = row / GRID;
      const v1 = (row + 1) / GRID;
      const s0 = bilerp(tl, tr, br, bl, u0, v0);
      const s1 = bilerp(tl, tr, br, bl, u1, v0);
      const s2 = bilerp(tl, tr, br, bl, u1, v1);
      const s3 = bilerp(tl, tr, br, bl, u0, v1);
      const d0 = { x: u0 * outW, y: v0 * outH };
      const d1 = { x: u1 * outW, y: v0 * outH };
      const d2 = { x: u1 * outW, y: v1 * outH };
      const d3 = { x: u0 * outW, y: v1 * outH };
      drawSubQuad(ctx, srcCanvas, s0, s1, s2, s3, d0, d1, d2, d3);
    }
  }
  return outCanvas;
}

// src/components/passport-image-editor.tsx
import { Fragment as Fragment3, jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
var HANDLE_RADIUS = 8;
var HIT_RADIUS = 24;
var HANDLE_STROKE = "rgba(255,255,255,0.9)";
var HANDLE_FILL = "rgba(14,116,144,0.85)";
var QUAD_STROKE = "rgba(14,116,144,0.6)";
var QUAD_FILL = "rgba(14,116,144,0.06)";
var INSET = 0;
function PassportImageEditor({ file, i18n, onApply, onCancel }) {
  const t = (key, fallback) => {
    const val = i18n(key);
    return val === key ? fallback : val;
  };
  const [bitmap, setBitmap] = useState4(null);
  const [rotation, setRotation] = useState4(0);
  const [corners, setCorners] = useState4(null);
  const [dragging, setDragging] = useState4(null);
  const [applying, setApplying] = useState4(false);
  const [canvasSize, setCanvasSize] = useState4({ w: 800, h: 600 });
  const containerRef = useRef4(null);
  const canvasRef = useRef4(null);
  useEscapeClose(true, onCancel);
  useEffect4(() => {
    let cancelled = false;
    createImageBitmap(file).then((bm) => {
      if (cancelled) return;
      setBitmap(bm);
      const w = bm.width;
      const h = bm.height;
      const ix = w * INSET;
      const iy = h * INSET;
      setCorners([
        { x: ix, y: iy },
        // top-left
        { x: w - ix, y: iy },
        // top-right
        { x: w - ix, y: h - iy },
        // bottom-right
        { x: ix, y: h - iy }
        // bottom-left
      ]);
    });
    return () => {
      cancelled = true;
    };
  }, [file]);
  useEffect4(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setCanvasSize({ w: Math.floor(width), h: Math.floor(height) });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const getTransform = useCallback3(() => {
    if (!bitmap) return { scale: 1, offsetX: 0, offsetY: 0 };
    const rotRad = rotation * Math.PI / 180;
    const cos = Math.abs(Math.cos(rotRad));
    const sin = Math.abs(Math.sin(rotRad));
    const rotW = bitmap.width * cos + bitmap.height * sin;
    const rotH = bitmap.width * sin + bitmap.height * cos;
    const padding = 40;
    const availW = canvasSize.w - padding * 2;
    const availH = canvasSize.h - padding * 2;
    const scale = Math.min(availW / rotW, availH / rotH, 1);
    return {
      scale,
      offsetX: canvasSize.w / 2,
      offsetY: canvasSize.h / 2
    };
  }, [bitmap, rotation, canvasSize]);
  const imageToCanvas = useCallback3(
    (p) => {
      if (!bitmap) return p;
      const { scale, offsetX, offsetY } = getTransform();
      const rotRad = rotation * Math.PI / 180;
      const cos = Math.cos(rotRad);
      const sin = Math.sin(rotRad);
      const cx = bitmap.width / 2;
      const cy = bitmap.height / 2;
      const rx = (p.x - cx) * cos - (p.y - cy) * sin;
      const ry = (p.x - cx) * sin + (p.y - cy) * cos;
      return { x: rx * scale + offsetX, y: ry * scale + offsetY };
    },
    [bitmap, rotation, getTransform]
  );
  const canvasToImage = useCallback3(
    (cx, cy) => {
      if (!bitmap) return { x: cx, y: cy };
      const { scale, offsetX, offsetY } = getTransform();
      const rx = (cx - offsetX) / scale;
      const ry = (cy - offsetY) / scale;
      const rotRad = -rotation * Math.PI / 180;
      const cos = Math.cos(rotRad);
      const sin = Math.sin(rotRad);
      const imgCx = bitmap.width / 2;
      const imgCy = bitmap.height / 2;
      return {
        x: rx * cos - ry * sin + imgCx,
        y: rx * sin + ry * cos + imgCy
      };
    },
    [bitmap, rotation, getTransform]
  );
  useEffect4(() => {
    const canvas = canvasRef.current;
    if (!canvas || !bitmap || !corners) return;
    canvas.width = canvasSize.w;
    canvas.height = canvasSize.h;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);
    const { scale, offsetX, offsetY } = getTransform();
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.drawImage(
      bitmap,
      -bitmap.width / 2 * scale,
      -bitmap.height / 2 * scale,
      bitmap.width * scale,
      bitmap.height * scale
    );
    ctx.restore();
    const cp = corners.map((c) => imageToCanvas(c));
    ctx.beginPath();
    ctx.moveTo(cp[0].x, cp[0].y);
    for (let i = 1; i < 4; i++) ctx.lineTo(cp[i].x, cp[i].y);
    ctx.closePath();
    ctx.fillStyle = QUAD_FILL;
    ctx.fill();
    ctx.strokeStyle = QUAD_STROKE;
    ctx.lineWidth = 2;
    ctx.stroke();
    for (const p of cp) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, HANDLE_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = HANDLE_FILL;
      ctx.fill();
      ctx.strokeStyle = HANDLE_STROKE;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [bitmap, corners, rotation, canvasSize, getTransform, imageToCanvas]);
  const handlePointerDown = useCallback3(
    (e) => {
      if (!corners || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const cp = corners.map((c) => imageToCanvas(c));
      const idx = cp.findIndex(
        (p) => Math.hypot(p.x - cx, p.y - cy) < HIT_RADIUS
      );
      if (idx >= 0) {
        setDragging(idx);
        e.target.setPointerCapture(e.pointerId);
      }
    },
    [corners, imageToCanvas]
  );
  const handlePointerMove = useCallback3(
    (e) => {
      if (dragging === null || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const imgPt = canvasToImage(
        e.clientX - rect.left,
        e.clientY - rect.top
      );
      setCorners((prev) => {
        if (!prev) return prev;
        const next = [...prev];
        next[dragging] = imgPt;
        return next;
      });
    },
    [dragging, canvasToImage]
  );
  const handlePointerUp = useCallback3(() => {
    setDragging(null);
  }, []);
  const rotateCW = () => setRotation((r) => r + 90);
  const rotateCCW = () => setRotation((r) => r - 90);
  const coarseRotation = Math.round(rotation / 90) * 90;
  const fineRotation = rotation - coarseRotation;
  const handleFineChange = (val) => setRotation(coarseRotation + val);
  const handleApply = useCallback3(async () => {
    if (!bitmap || !corners) return;
    setApplying(true);
    try {
      const outCanvas = applyPerspectiveWarp(bitmap, corners, rotation);
      const blob = await new Promise((resolve, reject) => {
        outCanvas.toBlob(
          (b) => b ? resolve(b) : reject(new Error("toBlob failed")),
          "image/jpeg",
          0.92
        );
      });
      onApply(blob);
    } catch (err) {
      console.error("[passport-editor] Apply failed:", err);
    } finally {
      setApplying(false);
    }
  }, [bitmap, corners, rotation, onApply]);
  const isLoading = !bitmap || !corners;
  return /* @__PURE__ */ jsx9(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
      onClick: (e) => {
        if (e.target === e.currentTarget) onCancel();
      },
      children: /* @__PURE__ */ jsxs8("div", { className: "flex h-full max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-base border border-foreground/10 bg-background shadow-2xl", children: [
        /* @__PURE__ */ jsxs8("div", { className: "flex items-center justify-between border-b border-foreground/10 px-5 py-3", children: [
          /* @__PURE__ */ jsx9("h3", { className: "text-sm font-semibold text-foreground", children: t("editor.title", "Edit Passport Photo") }),
          /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx9(
              "button",
              {
                type: "button",
                onClick: onCancel,
                className: "rounded-base px-3 py-1.5 text-xs font-medium text-foreground/60 transition hover:bg-foreground/5 hover:text-foreground",
                children: t("actions.cancel", "Cancel")
              }
            ),
            /* @__PURE__ */ jsx9(
              "button",
              {
                type: "button",
                onClick: () => void handleApply(),
                disabled: applying || isLoading,
                className: "flex items-center gap-1.5 rounded-base bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50",
                children: applying ? /* @__PURE__ */ jsxs8(Fragment3, { children: [
                  /* @__PURE__ */ jsx9("div", { className: "h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" }),
                  t("editor.applying", "Applying\u2026")
                ] }) : /* @__PURE__ */ jsxs8(Fragment3, { children: [
                  /* @__PURE__ */ jsx9(Check, { className: "h-3.5 w-3.5" }),
                  t("editor.apply", "Apply")
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx9("div", { ref: containerRef, className: "relative min-h-0 flex-1 bg-foreground/[0.03]", children: isLoading ? /* @__PURE__ */ jsx9("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsx9("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-foreground/20 border-t-primary" }) }) : /* @__PURE__ */ jsxs8(Fragment3, { children: [
          /* @__PURE__ */ jsx9(
            "canvas",
            {
              ref: canvasRef,
              className: "h-full w-full",
              style: { touchAction: "none" },
              onPointerDown: handlePointerDown,
              onPointerMove: handlePointerMove,
              onPointerUp: handlePointerUp
            }
          ),
          /* @__PURE__ */ jsx9("p", { className: "absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[11px] text-white/70", children: t("editor.hint", "Drag the handles to the passport corners") })
        ] }) }),
        /* @__PURE__ */ jsxs8("div", { className: "flex items-center justify-center gap-4 border-t border-foreground/10 px-5 py-3", children: [
          /* @__PURE__ */ jsx9(
            "button",
            {
              type: "button",
              onClick: rotateCCW,
              className: "flex h-8 w-8 items-center justify-center rounded-full border border-foreground/15 text-foreground/60 transition hover:border-foreground/30 hover:text-foreground",
              title: t("editor.rotateCCW", "Rotate 90\xB0 left"),
              children: /* @__PURE__ */ jsx9(RotateCcw, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxs8("span", { className: "w-8 text-right text-[10px] tabular-nums text-foreground/40", children: [
              fineRotation > 0 ? "+" : "",
              fineRotation.toFixed(1),
              "\xB0"
            ] }),
            /* @__PURE__ */ jsx9(
              "input",
              {
                type: "range",
                min: -45,
                max: 45,
                step: 0.5,
                value: fineRotation,
                onChange: (e) => handleFineChange(Number(e.target.value)),
                className: "h-1 w-40 cursor-pointer appearance-none rounded-full bg-foreground/10 accent-primary"
              }
            )
          ] }),
          /* @__PURE__ */ jsx9(
            "button",
            {
              type: "button",
              onClick: rotateCW,
              className: "flex h-8 w-8 items-center justify-center rounded-full border border-foreground/15 text-foreground/60 transition hover:border-foreground/30 hover:text-foreground",
              title: t("editor.rotateCW", "Rotate 90\xB0 right"),
              children: /* @__PURE__ */ jsx9(RotateCw, { className: "h-4 w-4" })
            }
          )
        ] })
      ] })
    }
  );
}

// src/components/nationality-selector.tsx
import { useMemo as useMemo2, useRef as useRef5, useState as useState5 } from "react";
import { ChevronDown as ChevronDown2, Search as Search2, X as X4 } from "lucide-react";
import { Fragment as Fragment4, jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
var DIVIDER_VALUE = "__divider__";
function NationalitySelector({
  options,
  prioritizedCodes = [],
  value,
  onChange,
  placeholder = "Select nationality...",
  searchPlaceholder = "Search...",
  suggestMessage = "We couldn\u2019t find an exact match, but based on language and country names, you might be looking for:",
  disabled = false,
  error = false,
  allowDeselect = false
}) {
  const { isOpen, open, close } = useDropdown();
  const [query, setQuery] = useState5("");
  const inputRef = useRef5(null);
  const exactIndex = useMemo2(() => {
    const map = /* @__PURE__ */ new Map();
    for (const o of options) {
      map.set(o.code, [o.nationality, o.countryName, o.code, o.searchAliases].filter(Boolean).join(" ").toLowerCase());
    }
    return map;
  }, [options]);
  const fuzzyIndex = useMemo2(() => {
    const map = /* @__PURE__ */ new Map();
    for (const o of options) {
      map.set(o.code, [o.nationality, o.countryName, o.code, o.searchAliases, o.languages].filter(Boolean).join(" ").toLowerCase());
    }
    return map;
  }, [options]);
  const labelIndex = useMemo2(() => {
    const map = /* @__PURE__ */ new Map();
    for (const o of options) {
      map.set(o.code, o.countryName ? `${o.countryName} \u2013 ${o.nationality}` : o.nationality);
    }
    return map;
  }, [options]);
  const selectOptions = useMemo2(() => {
    const codeSet = new Set(prioritizedCodes);
    const prioritized = prioritizedCodes.map((code) => options.find((o) => o.code === code)).filter((o) => !!o).map(toSelectOption);
    const rest = options.filter((o) => !codeSet.has(o.code)).sort((a, b) => a.nationality.localeCompare(b.nationality)).map(toSelectOption);
    if (prioritized.length > 0 && rest.length > 0) {
      return [...prioritized, { value: DIVIDER_VALUE, label: "", disabled: true }, ...rest];
    }
    return [...prioritized, ...rest];
  }, [options, prioritizedCodes]);
  const filteredOptions = useMemo2(() => {
    if (!query.trim()) return selectOptions;
    const q = query.toLowerCase();
    return selectOptions.filter((opt) => {
      var _a;
      if (opt.value === DIVIDER_VALUE) return false;
      return ((_a = exactIndex.get(opt.value)) != null ? _a : "").includes(q);
    });
  }, [selectOptions, query, exactIndex]);
  const suggestions = useMemo2(() => {
    var _a;
    if (!query.trim() || filteredOptions.length > 0) return [];
    const q = query.toLowerCase();
    const scored = [];
    for (const opt of selectOptions) {
      if (opt.value === DIVIDER_VALUE) continue;
      const words = ((_a = fuzzyIndex.get(opt.value)) != null ? _a : "").split(/[\s,]+/);
      let score = 0;
      for (const word of words) {
        if (word.startsWith(q)) score += 10 + q.length / word.length * 5;
        else if (word.includes(q)) score += 5;
      }
      if (score > 0) scored.push({ option: opt, score });
    }
    return scored.sort((a, b) => b.score - a.score).map((s) => s.option);
  }, [query, filteredOptions, selectOptions, fuzzyIndex]);
  const selectedOption = selectOptions.find((o) => o.value === value);
  const handleOpen = () => {
    setQuery("");
    open();
    requestAnimationFrame(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.focus();
    });
  };
  const handleSelect = (v) => {
    onChange(v);
    setQuery("");
    close();
  };
  const handleClear = (e) => {
    e.stopPropagation();
    onChange("");
    setQuery("");
  };
  const handleClose = () => {
    setQuery("");
    close();
  };
  const triggerBorder = error ? "border-red-300 ring-1 ring-red-500/20" : isOpen ? "border-primary ring-1 ring-primary" : "border-slate-300 hover:border-slate-400";
  return /* @__PURE__ */ jsxs9("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs9(
      "div",
      {
        role: "combobox",
        "aria-expanded": isOpen,
        tabIndex: disabled ? -1 : 0,
        onClick: disabled ? void 0 : handleOpen,
        onKeyDown: disabled ? void 0 : (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        },
        className: `flex w-full cursor-pointer items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm transition ${triggerBorder} ${disabled ? "cursor-not-allowed opacity-60" : ""}`,
        children: [
          /* @__PURE__ */ jsx10("div", { className: "flex min-w-0 flex-1 items-center gap-2.5 truncate", children: selectedOption ? /* @__PURE__ */ jsxs9(Fragment4, { children: [
            selectedOption.icon && /* @__PURE__ */ jsx10("span", { className: "shrink-0 text-base leading-none", children: selectedOption.icon }),
            /* @__PURE__ */ jsx10("span", { className: "truncate text-slate-900", children: selectedOption.label })
          ] }) : /* @__PURE__ */ jsx10("span", { className: "text-slate-400", children: placeholder }) }),
          allowDeselect && selectedOption && /* @__PURE__ */ jsx10("button", { type: "button", onClick: handleClear, className: "rounded-full p-0.5 text-slate-400 transition hover:text-slate-600", "aria-label": "Clear", children: /* @__PURE__ */ jsx10(X4, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ jsx10(ChevronDown2, { className: `h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}` })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxs9(Fragment4, { children: [
      /* @__PURE__ */ jsx10("div", { className: "fixed inset-0 z-10", onClick: handleClose }),
      /* @__PURE__ */ jsxs9("div", { className: "absolute left-0 z-20 mt-1.5 w-80 max-w-96 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg", children: [
        /* @__PURE__ */ jsxs9("div", { className: "flex items-center gap-2.5 border-b border-slate-100 px-3.5 py-2.5", children: [
          /* @__PURE__ */ jsx10(Search2, { className: "h-4 w-4 shrink-0 text-slate-400" }),
          /* @__PURE__ */ jsx10(
            "input",
            {
              ref: inputRef,
              type: "text",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: searchPlaceholder,
              className: "w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsx10("div", { className: "max-h-64 overflow-y-auto overscroll-contain [scrollbar-width:none]", children: filteredOptions.length > 0 ? /* @__PURE__ */ jsx10("ul", { className: "py-1", children: filteredOptions.map((opt) => /* @__PURE__ */ jsx10("li", { children: opt.value === DIVIDER_VALUE ? /* @__PURE__ */ jsx10("div", { className: "mx-3 my-1", children: /* @__PURE__ */ jsx10("div", { className: "border-t border-slate-100" }) }) : /* @__PURE__ */ jsx10(Option, { opt, selected: value === opt.value, onSelect: handleSelect }) }, opt.value)) }) : suggestions.length > 0 ? /* @__PURE__ */ jsxs9("div", { className: "py-2", children: [
          /* @__PURE__ */ jsx10("p", { className: "px-3.5 pb-2 text-xs leading-relaxed text-slate-400", children: suggestMessage }),
          /* @__PURE__ */ jsx10("ul", { children: suggestions.map((opt) => /* @__PURE__ */ jsx10("li", { children: /* @__PURE__ */ jsx10(Option, { opt, selected: value === opt.value, onSelect: handleSelect, label: labelIndex.get(opt.value) }) }, opt.value)) })
        ] }) : /* @__PURE__ */ jsx10("div", { className: "px-3.5 py-4 text-center text-sm text-slate-400", children: "No results found" }) })
      ] })
    ] })
  ] });
}
function Option({ opt, selected, onSelect, label }) {
  return /* @__PURE__ */ jsxs9(
    "button",
    {
      type: "button",
      onClick: () => onSelect(opt.value),
      className: `flex w-full items-center gap-3 px-3.5 py-2 text-left text-sm transition ${selected ? "bg-primary/5 font-medium text-primary" : "text-slate-700 hover:bg-slate-50"}`,
      children: [
        opt.icon && /* @__PURE__ */ jsx10("span", { className: "shrink-0 text-base leading-none", children: opt.icon }),
        /* @__PURE__ */ jsx10("span", { className: "flex-1 truncate", children: label != null ? label : opt.label })
      ]
    }
  );
}
function toSelectOption(opt) {
  return { value: opt.code, label: opt.nationality, icon: opt.flagEmoji };
}

// src/components/gender-selector.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
function GenderSelector({
  options,
  value,
  onChange,
  placeholder = "Gender",
  disabled = false,
  error = false
}) {
  const selectOptions = options.map((o) => ({
    value: o.id,
    label: o.label,
    icon: o.icon
  }));
  return /* @__PURE__ */ jsx11(
    Selector,
    {
      options: selectOptions,
      value,
      onChange,
      placeholder,
      allowDeselect: true,
      disabled,
      error
    }
  );
}

// src/components/title-selector.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
function TitleSelector({
  options,
  value,
  onChange,
  placeholder = "Title",
  disabled = false,
  error = false
}) {
  const selectOptions = options.map((o) => ({
    value: o.id,
    label: o.label
  }));
  return /* @__PURE__ */ jsx12(
    Selector,
    {
      options: selectOptions,
      value,
      onChange,
      placeholder,
      allowDeselect: true,
      disabled,
      error
    }
  );
}

// src/components/weight-range-selector.tsx
import { jsx as jsx13 } from "react/jsx-runtime";
function WeightRangeSelector({
  options,
  value,
  onChange,
  placeholder = "Weight range",
  disabled = false,
  error = false
}) {
  const selectOptions = options.map((o) => ({
    value: o.id,
    label: o.label,
    icon: o.icon
  }));
  return /* @__PURE__ */ jsx13(
    Selector,
    {
      options: selectOptions,
      value,
      onChange,
      placeholder,
      allowDeselect: true,
      disabled,
      error
    }
  );
}

// src/components/tour-selector.tsx
import { useMemo as useMemo3, useRef as useRef6, useState as useState6, useCallback as useCallback4 } from "react";
import { Check as Check2, Loader2 as Loader22, Search as Search3 } from "lucide-react";
import { jsx as jsx14, jsxs as jsxs10 } from "react/jsx-runtime";
function toSelectOptions(tours) {
  return tours.map((t) => ({ value: t.slug, label: t.title }));
}
function defaultFilter2(option, query) {
  return option.label.toLowerCase().includes(query.toLowerCase());
}
function TourSelector(props) {
  const {
    options,
    placeholder = "Select tour...",
    searchPlaceholder = "Search tours...",
    emptyMessage = "No tours found",
    disabled = false,
    error = false,
    loading = false
  } = props;
  const { isOpen, open, close, toggle } = useDropdown();
  const [query, setQuery] = useState6("");
  const inputRef = useRef6(null);
  const isMulti = props.multiple === true;
  const selectOptions = useMemo3(() => toSelectOptions(options), [options]);
  const filteredOptions = useMemo3(() => {
    if (!query.trim()) return selectOptions;
    return selectOptions.filter((opt) => defaultFilter2(opt, query));
  }, [selectOptions, query]);
  const selectedSlugs = isMulti ? props.value : props.value ? [props.value] : [];
  const isSelected = useCallback4(
    (slug) => selectedSlugs.includes(slug),
    [selectedSlugs]
  );
  const handleOpen = useCallback4(() => {
    setQuery("");
    open();
    requestAnimationFrame(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.focus();
    });
  }, [open]);
  const handleClose = useCallback4(() => {
    setQuery("");
    close();
  }, [close]);
  const handleToggleOption = useCallback4(
    (slug) => {
      if (isMulti) {
        const multiProps = props;
        const current = multiProps.value;
        const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
        multiProps.onChange(next);
      } else {
        const singleProps = props;
        singleProps.onChange(slug);
        handleClose();
      }
    },
    [isMulti, props, handleClose]
  );
  const handleClear = useCallback4(() => {
    if (isMulti) {
      props.onChange([]);
    } else {
      props.onChange("");
    }
    setQuery("");
  }, [isMulti, props]);
  const triggerContent = (() => {
    var _a, _b;
    if (selectedSlugs.length === 0) {
      return /* @__PURE__ */ jsx14("span", { className: "text-foreground/30", children: placeholder });
    }
    if (!isMulti) {
      const opt = options.find((o) => o.slug === selectedSlugs[0]);
      return /* @__PURE__ */ jsx14("span", { className: "text-foreground", children: (_a = opt == null ? void 0 : opt.title) != null ? _a : selectedSlugs[0] });
    }
    if (selectedSlugs.length === 1) {
      const opt = options.find((o) => o.slug === selectedSlugs[0]);
      return /* @__PURE__ */ jsx14("span", { className: "text-foreground", children: (_b = opt == null ? void 0 : opt.title) != null ? _b : selectedSlugs[0] });
    }
    return /* @__PURE__ */ jsxs10("span", { className: "text-foreground", children: [
      selectedSlugs.length,
      " tours selected"
    ] });
  })();
  const showClear = isMulti ? selectedSlugs.length > 0 : !!props.allowDeselect && selectedSlugs.length > 0;
  return /* @__PURE__ */ jsxs10("div", { className: "relative", children: [
    /* @__PURE__ */ jsx14(
      SelectTrigger,
      {
        onClick: isOpen ? handleClose : handleOpen,
        onClear: handleClear,
        disabled,
        error,
        isOpen,
        showClear,
        children: triggerContent
      }
    ),
    /* @__PURE__ */ jsxs10(SelectDropdown, { isOpen, onClose: handleClose, children: [
      /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-2 border-b border-foreground/10 px-3 py-2", children: [
        /* @__PURE__ */ jsx14(Search3, { className: "h-4 w-4 shrink-0 text-foreground/30" }),
        /* @__PURE__ */ jsx14(
          "input",
          {
            ref: inputRef,
            type: "text",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: searchPlaceholder,
            className: "w-full bg-transparent text-sm text-foreground placeholder:text-foreground/30 focus:outline-none"
          }
        ),
        loading && /* @__PURE__ */ jsx14(Loader22, { className: "h-4 w-4 shrink-0 animate-spin text-foreground/30" })
      ] }),
      loading && filteredOptions.length === 0 ? /* @__PURE__ */ jsx14("div", { className: "flex items-center justify-center py-6", children: /* @__PURE__ */ jsx14(Loader22, { className: "h-5 w-5 animate-spin text-foreground/30" }) }) : filteredOptions.length === 0 ? /* @__PURE__ */ jsx14("div", { className: "px-3 py-4 text-center text-sm text-foreground/40", children: emptyMessage }) : /* @__PURE__ */ jsx14("ul", { className: "max-h-64 overflow-y-auto py-1", children: filteredOptions.map((opt) => {
        const selected = isSelected(opt.value);
        return /* @__PURE__ */ jsx14("li", { children: /* @__PURE__ */ jsxs10(
          "button",
          {
            type: "button",
            disabled: opt.disabled,
            onClick: () => handleToggleOption(opt.value),
            className: `flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${selected ? "bg-primary/5 font-medium text-primary" : "text-foreground hover:bg-foreground/5"} ${opt.disabled ? "cursor-not-allowed opacity-40" : ""}`,
            children: [
              isMulti && /* @__PURE__ */ jsx14(
                "span",
                {
                  className: `flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${selected ? "border-primary bg-primary text-white" : "border-foreground/20 bg-background"}`,
                  children: selected && /* @__PURE__ */ jsx14(Check2, { className: "h-3 w-3" })
                }
              ),
              /* @__PURE__ */ jsx14("span", { className: "flex-1 truncate", children: opt.label }),
              !isMulti && selected && /* @__PURE__ */ jsx14(Check2, { className: "h-4 w-4 shrink-0 text-primary" })
            ]
          }
        ) }, opt.value);
      }) })
    ] })
  ] });
}

// src/components/toast.tsx
import { useEffect as useEffect5, useState as useState7 } from "react";
import { Check as Check3, X as X5, AlertCircle, Info } from "lucide-react";
import { jsx as jsx15, jsxs as jsxs11 } from "react/jsx-runtime";
var toastStyles = {
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-800",
    icon: "text-emerald-500"
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: "text-red-500"
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: "text-blue-500"
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    icon: "text-amber-500"
  }
};
var ToastIcon = ({ type }) => {
  const iconClass = `h-5 w-5 ${toastStyles[type].icon}`;
  switch (type) {
    case "success":
      return /* @__PURE__ */ jsx15(Check3, { className: iconClass });
    case "error":
      return /* @__PURE__ */ jsx15(AlertCircle, { className: iconClass });
    case "warning":
      return /* @__PURE__ */ jsx15(AlertCircle, { className: iconClass });
    default:
      return /* @__PURE__ */ jsx15(Info, { className: iconClass });
  }
};
function Toast({ toast, onDismiss }) {
  const [isVisible, setIsVisible] = useState7(false);
  const [isExiting, setIsExiting] = useState7(false);
  const styles = toastStyles[toast.type];
  useEffect5(() => {
    var _a;
    requestAnimationFrame(() => setIsVisible(true));
    const duration = (_a = toast.duration) != null ? _a : 4e3;
    const dismissTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onDismiss(toast.id), 300);
    }, duration);
    return () => clearTimeout(dismissTimer);
  }, [toast.id, toast.duration, onDismiss]);
  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => onDismiss(toast.id), 300);
  };
  return /* @__PURE__ */ jsxs11(
    "div",
    {
      className: `
        flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm
        transition-all duration-300 ease-out
        ${styles.bg} ${styles.border}
        ${isVisible && !isExiting ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}
      `,
      role: "alert",
      children: [
        /* @__PURE__ */ jsx15(ToastIcon, { type: toast.type }),
        /* @__PURE__ */ jsx15("span", { className: `text-sm font-medium ${styles.text}`, children: toast.message }),
        /* @__PURE__ */ jsx15(
          "button",
          {
            type: "button",
            onClick: handleDismiss,
            className: `ml-2 rounded-full p-1 transition hover:bg-black/5 ${styles.text}`,
            children: /* @__PURE__ */ jsx15(X5, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;
  return /* @__PURE__ */ jsx15("div", { className: "fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-auto", children: toasts.map((t) => /* @__PURE__ */ jsx15(Toast, { toast: t, onDismiss }, t.id)) });
}
function useToast() {
  const [toasts, setToasts] = useState7([]);
  const showToast = (type, message, duration) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { id, type, message, duration }]);
  };
  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  return {
    toasts,
    showToast,
    dismissToast,
    success: (message, duration) => showToast("success", message, duration),
    error: (message, duration) => showToast("error", message, duration),
    info: (message, duration) => showToast("info", message, duration),
    warning: (message, duration) => showToast("warning", message, duration)
  };
}

// src/components/pax-counter.tsx
import { Minus, Plus } from "lucide-react";
import { jsx as jsx16, jsxs as jsxs12 } from "react/jsx-runtime";
function PaxCounter({
  label,
  value,
  min,
  max,
  onChange,
  disabled = false
}) {
  return /* @__PURE__ */ jsxs12("div", { children: [
    /* @__PURE__ */ jsx16("span", { className: "text-xs font-medium text-foreground/60", children: label }),
    /* @__PURE__ */ jsxs12("div", { className: "mt-1 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx16(
        "button",
        {
          type: "button",
          disabled: disabled || value <= min,
          onClick: () => onChange(value - 1),
          className: "flex h-10 w-10 items-center justify-center rounded-lg border-2 border-foreground/15 bg-background text-foreground/50 transition hover:border-primary hover:text-primary disabled:opacity-40",
          children: /* @__PURE__ */ jsx16(Minus, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx16("div", { className: "flex min-w-[60px] flex-col items-center justify-center rounded-lg border border-foreground/10 bg-foreground/2 px-4 py-2", children: /* @__PURE__ */ jsx16("span", { className: "text-xl font-bold text-foreground", children: value }) }),
      /* @__PURE__ */ jsx16(
        "button",
        {
          type: "button",
          disabled: disabled || value >= max,
          onClick: () => onChange(value + 1),
          className: "flex h-10 w-10 items-center justify-center rounded-lg border-2 border-foreground/15 bg-background text-foreground/50 transition hover:border-primary hover:text-primary disabled:opacity-40",
          children: /* @__PURE__ */ jsx16(Plus, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}

// src/components/location-map.tsx
import { Navigation } from "lucide-react";
import { jsx as jsx17, jsxs as jsxs13 } from "react/jsx-runtime";
function LocationMap({
  latitude,
  longitude,
  label,
  zoom = 14,
  apiKey,
  width = 400,
  height = 400,
  directionsLabel = "Get Directions",
  directionsUrl,
  locale = "en",
  className
}) {
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&scale=2&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${apiKey}&language=${locale}`;
  const mapsUrl = directionsUrl != null ? directionsUrl : `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  return /* @__PURE__ */ jsxs13(
    "a",
    {
      href: mapsUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      className: `group relative block overflow-hidden ${className != null ? className : ""}`,
      children: [
        /* @__PURE__ */ jsx17(
          "img",
          {
            src: staticMapUrl,
            alt: label != null ? label : "Map",
            className: "h-full w-full object-cover",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxs13("span", { className: "absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-md backdrop-blur-sm transition group-hover:bg-white group-hover:shadow-lg", children: [
          /* @__PURE__ */ jsx17(Navigation, { className: "h-3 w-3" }),
          directionsLabel
        ] })
      ]
    }
  );
}

// src/components/rich-text-content.tsx
import { Fragment as Fragment5, jsx as jsx18, jsxs as jsxs14 } from "react/jsx-runtime";
function wrapMarks(text, marks) {
  var _a, _b;
  if (!marks || marks.length === 0) return text;
  let node = text;
  for (const mark of marks) {
    switch (mark.type) {
      case "bold":
        node = /* @__PURE__ */ jsx18("strong", { children: node });
        break;
      case "italic":
        node = /* @__PURE__ */ jsx18("em", { children: node });
        break;
      case "underline":
        node = /* @__PURE__ */ jsx18("u", { children: node });
        break;
      case "strike":
        node = /* @__PURE__ */ jsx18("s", { children: node });
        break;
      case "code":
        node = /* @__PURE__ */ jsx18("code", { className: "rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800", children: node });
        break;
      case "link": {
        const href = (_b = (_a = mark.attrs) == null ? void 0 : _a.href) != null ? _b : "#";
        node = /* @__PURE__ */ jsx18(
          "a",
          {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary underline decoration-primary/30 transition hover:decoration-primary",
            children: node
          }
        );
        break;
      }
      default:
        break;
    }
  }
  return node;
}
function renderNode(node, index) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const key = `${node.type}-${index}`;
  const children = (_a = node.content) == null ? void 0 : _a.map((child, i) => renderNode(child, i));
  switch (node.type) {
    case "doc":
      return /* @__PURE__ */ jsx18(Fragment5, { children });
    case "paragraph":
      return /* @__PURE__ */ jsx18("p", { className: "mb-3 last:mb-0", children: children != null ? children : /* @__PURE__ */ jsx18("br", {}) }, key);
    case "heading": {
      const level = (_c = (_b = node.attrs) == null ? void 0 : _b.level) != null ? _c : 2;
      const sizes = {
        1: "text-xl font-bold mb-3",
        2: "text-lg font-semibold mb-2",
        3: "text-base font-semibold mb-2"
      };
      const cls = (_d = sizes[level]) != null ? _d : sizes[3];
      if (level === 1) return /* @__PURE__ */ jsx18("h1", { className: cls, children }, key);
      if (level === 2) return /* @__PURE__ */ jsx18("h2", { className: cls, children }, key);
      return /* @__PURE__ */ jsx18("h3", { className: cls, children }, key);
    }
    case "text":
      return wrapMarks((_e = node.text) != null ? _e : "", node.marks);
    case "hardBreak":
      return /* @__PURE__ */ jsx18("br", {}, key);
    case "horizontalRule":
      return /* @__PURE__ */ jsx18("hr", { className: "my-4 border-slate-200" }, key);
    case "blockquote":
      return /* @__PURE__ */ jsx18(
        "blockquote",
        {
          className: "mb-3 border-l-4 border-slate-300 pl-4 italic text-slate-600",
          children
        },
        key
      );
    case "codeBlock":
      return /* @__PURE__ */ jsx18(
        "pre",
        {
          className: "mb-3 overflow-x-auto rounded-lg bg-slate-100 p-4 font-mono text-sm text-slate-800",
          children: /* @__PURE__ */ jsx18("code", { children })
        },
        key
      );
    case "bulletList":
      return /* @__PURE__ */ jsx18("ul", { className: "mb-3 list-disc space-y-1 pl-5", children }, key);
    case "orderedList":
      return /* @__PURE__ */ jsx18("ol", { className: "mb-3 list-decimal space-y-1 pl-5", children }, key);
    case "listItem":
      return /* @__PURE__ */ jsx18("li", { children }, key);
    case "taskList":
      return /* @__PURE__ */ jsx18("ul", { className: "mb-3 space-y-1", children }, key);
    case "taskItem": {
      const checked = ((_f = node.attrs) == null ? void 0 : _f.checked) === true;
      return /* @__PURE__ */ jsxs14("li", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx18("span", { className: `mt-0.5 ${checked ? "text-emerald-500" : "text-slate-400"}`, children: checked ? "\u2611" : "\u2610" }),
        /* @__PURE__ */ jsx18("span", { className: checked ? "line-through text-slate-400" : "", children })
      ] }, key);
    }
    case "image": {
      const src = (_h = (_g = node.attrs) == null ? void 0 : _g.src) != null ? _h : "";
      const alt = (_j = (_i = node.attrs) == null ? void 0 : _i.alt) != null ? _j : "";
      return /* @__PURE__ */ jsx18(
        "img",
        {
          src,
          alt,
          className: "mb-3 max-w-full rounded-lg",
          loading: "lazy"
        },
        key
      );
    }
    case "table":
      return /* @__PURE__ */ jsx18("div", { className: "mb-3 overflow-x-auto", children: /* @__PURE__ */ jsx18("table", { className: "w-full border-collapse border border-slate-200 text-sm", children: /* @__PURE__ */ jsx18("tbody", { children }) }) }, key);
    case "tableRow":
      return /* @__PURE__ */ jsx18("tr", { children }, key);
    case "tableHeader":
      return /* @__PURE__ */ jsx18(
        "th",
        {
          className: "border border-slate-200 bg-slate-50 px-3 py-2 text-left font-semibold",
          children
        },
        key
      );
    case "tableCell":
      return /* @__PURE__ */ jsx18("td", { className: "border border-slate-200 px-3 py-2", children }, key);
    default:
      return children ? /* @__PURE__ */ jsx18("span", { children }, key) : null;
  }
}
function RichTextContent({ content, className, fallback }) {
  if (!content) {
    return fallback ? /* @__PURE__ */ jsx18("p", { className, children: fallback }) : null;
  }
  let parsed;
  if (typeof content === "string") {
    try {
      const json = JSON.parse(content);
      if (!json || typeof json !== "object" || json.type !== "doc") {
        return /* @__PURE__ */ jsx18("p", { className, children: content });
      }
      parsed = json;
    } catch (e) {
      return /* @__PURE__ */ jsx18("p", { className, children: content });
    }
  } else {
    parsed = content;
  }
  return /* @__PURE__ */ jsx18("div", { className, children: renderNode(parsed, 0) });
}
export {
  ContactTitleSelect,
  EmailInput,
  GenderSelector,
  LocationMap,
  NationalitySelector,
  PassportImageEditor,
  PaxCounter,
  PillSelector,
  RichTextContent,
  SearchableSelector,
  Selector,
  SideDrawer,
  StatusCard,
  TitleSelector,
  ToastContainer,
  TourSelector,
  WeightRangeSelector,
  applyPerspectiveWarp,
  useEscapeClose,
  useToast
};
