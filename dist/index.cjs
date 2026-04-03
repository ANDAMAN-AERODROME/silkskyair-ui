"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ContactTitleSelect: () => ContactTitleSelect,
  EmailInput: () => EmailInput,
  GenderSelector: () => GenderSelector,
  LocationMap: () => LocationMap,
  NationalitySelector: () => NationalitySelector,
  PassportImageEditor: () => PassportImageEditor,
  PaxCounter: () => PaxCounter,
  PillSelector: () => PillSelector,
  PromptDialog: () => PromptDialog,
  RichTextContent: () => RichTextContent,
  SearchableSelector: () => SearchableSelector,
  SelectDropdown: () => SelectDropdown,
  SelectOptionRow: () => SelectOptionRow,
  SelectTrigger: () => SelectTrigger,
  Selector: () => Selector,
  SideDrawer: () => SideDrawer,
  StatusCard: () => StatusCard,
  TitleSelector: () => TitleSelector,
  ToastContainer: () => ToastContainer,
  TourSelector: () => TourSelector,
  WeightRangeSelector: () => WeightRangeSelector,
  applyPerspectiveWarp: () => applyPerspectiveWarp,
  useDropdown: () => useDropdown,
  useEscapeClose: () => useEscapeClose,
  useToast: () => useToast
});
module.exports = __toCommonJS(index_exports);

// src/components/pill-selector.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function PillSelector({
  options,
  value,
  onChange,
  allowDeselect = false,
  size = "md"
}) {
  const sizeClasses = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-wrap gap-2", children: options.map((option) => {
    const isSelected = value === option.value;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
          option.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-base leading-none", children: option.icon }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: option.label })
        ]
      },
      option.value
    );
  }) });
}

// src/components/status-card.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "w-72", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `${v.band} px-4 py-3`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `${v.icon} shrink-0 [&>svg]:h-4 [&>svg]:w-4`, children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `text-[13px] font-semibold leading-tight ${v.title}`, children: title }),
        progress && progress.max > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
      progress && progress.max > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-2 flex gap-0.5", children: Array.from({ length: progress.max }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          className: `h-1 flex-1 rounded-full ${i < progress.value ? v.progressFilled : v.progressTrack}`
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "px-4 pt-3 pb-3.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "text-xs leading-normal text-foreground/50", children }),
      callout && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "div",
        {
          className: `mt-2.5 flex items-start gap-2 rounded-md border ${v.calloutBorder} ${v.calloutBg} px-3 py-2`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `mt-px shrink-0 ${v.calloutIcon} [&>svg]:h-3.5 [&>svg]:w-3.5`, children: callout.icon }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `text-[11px] leading-normal ${v.calloutText}`, children: callout.content })
          ]
        }
      )
    ] })
  ] });
}

// src/components/email-input.tsx
var import_lucide_react = require("lucide-react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function EmailInput({
  value,
  onChange,
  placeholder = "colleague@example.com",
  disabled = false,
  error = false,
  className = ""
}) {
  const borderClass = error ? "border-red-300 focus:border-red-500 focus:ring-red-500/30" : "border-foreground/20 focus:border-primary focus:ring-primary";
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `relative ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var import_react = require("react");
var import_lucide_react2 = require("lucide-react");
var import_jsx_runtime4 = require("react/jsx-runtime");
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
  const [showDiscardConfirm, setShowDiscardConfirm] = (0, import_react.useState)(false);
  const clickStartedOnBackdrop = (0, import_react.useRef)(false);
  const attemptClose = (0, import_react.useCallback)(() => {
    if (isDirty) {
      setShowDiscardConfirm(true);
      return;
    }
    onClose();
  }, [isDirty, onClose]);
  const forceClose = (0, import_react.useCallback)(() => {
    setShowDiscardConfirm(false);
    onClose();
  }, [onClose]);
  (0, import_react.useEffect)(() => {
    if (!open) {
      setShowDiscardConfirm(false);
    }
  }, [open]);
  (0, import_react.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          "div",
          {
            className: `flex h-full w-full ${maxWidth} flex-col bg-white shadow-xl animate-in slide-in-from-right duration-300`,
            onMouseDown: (e) => e.stopPropagation(),
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("header", { className: "flex items-center justify-between border-b border-foreground/10 px-4 py-4", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-3 min-w-0", children: [
                  icon && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary", children: icon }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { className: "text-lg font-semibold text-foreground truncate", children: title }),
                    subtitle && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-xs text-foreground/50 truncate", children: subtitle })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: attemptClose,
                    className: "rounded p-1 text-foreground/50 transition hover:text-foreground",
                    children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react2.X, { className: "h-5 w-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex-1 overflow-y-auto", children }),
              footer && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "border-t border-foreground/10 px-4 py-4", children: footer })
            ]
          }
        )
      }
    ),
    showDiscardConfirm && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          "div",
          {
            className: "mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl",
            onClick: (e) => e.stopPropagation(),
            role: "dialog",
            "aria-modal": "true",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mb-4 flex items-center gap-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "rounded-full bg-amber-100 p-3 text-amber-600", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react2.AlertTriangle, { className: "h-6 w-6" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { className: "text-lg font-semibold text-slate-900", children: labels.title }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-sm text-slate-500", children: labels.description })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowDiscardConfirm(false),
                    className: "rounded-full p-1.5 text-slate-400 transition hover:text-slate-600",
                    children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react2.X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              labels.body && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "mb-4 text-sm text-slate-700", children: labels.body }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex justify-end gap-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowDiscardConfirm(false),
                    className: "rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary",
                    children: labels.cancel
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var import_react2 = require("react");
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime5 = require("react/jsx-runtime");
function SelectTrigger({
  onClick,
  onClear,
  disabled = false,
  error = false,
  isOpen,
  children,
  showClear = false
}) {
  const borderClass = error ? "border-red-300 focus-within:border-red-500 focus-within:ring-red-500/30" : isOpen ? "border-primary ring-2 ring-primary/20" : "border-foreground/10 hover:border-foreground/20";
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
      className: `flex w-full cursor-pointer items-center gap-2 rounded-lg border bg-background px-3.5 py-2.5 text-sm transition ${borderClass} ${disabled ? "cursor-not-allowed opacity-60" : ""}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex-1 min-w-0 truncate", children }),
        showClear && onClear && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              onClear();
            },
            className: "rounded-full p-0.5 text-foreground/40 transition hover:text-foreground/70",
            "aria-label": "Clear selection",
            children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react3.X, { className: "h-3.5 w-3.5" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          import_lucide_react3.ChevronDown,
          {
            className: `h-4 w-4 shrink-0 text-foreground/40 transition-transform ${isOpen ? "rotate-180" : ""}`
          }
        )
      ]
    }
  );
}
function SelectDropdown({ isOpen, onClose, children }) {
  const ref = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "fixed inset-0 z-10", onClick: onClose }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "button",
    {
      type: "button",
      disabled: option.disabled,
      onClick,
      className: `flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${isSelected ? "bg-primary/5 font-medium text-primary" : "text-foreground hover:bg-foreground/5"} ${option.disabled ? "cursor-not-allowed opacity-40" : ""}`,
      children: renderOption ? renderOption(option) : /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
        option.icon && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "shrink-0 text-base leading-none", children: option.icon }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "flex-1 truncate", children: option.label })
      ] })
    }
  );
}
function useDropdown() {
  const [isOpen, setIsOpen] = (0, import_react2.useState)(false);
  const open = (0, import_react2.useCallback)(() => setIsOpen(true), []);
  const close = (0, import_react2.useCallback)(() => setIsOpen(false), []);
  const toggle = (0, import_react2.useCallback)(() => setIsOpen((v) => !v), []);
  return { isOpen, open, close, toggle };
}

// src/components/selector/selector.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      SelectTrigger,
      {
        onClick: toggle,
        onClear: handleClear,
        disabled,
        error,
        isOpen,
        showClear: allowDeselect && !!selectedOption,
        children: selectedOption ? renderValue ? renderValue(selectedOption) : /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "text-foreground", children: [
          selectedOption.icon && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "mr-2 inline-block text-base leading-none align-middle", children: selectedOption.icon }),
          selectedOption.label
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-foreground/30", children: placeholder })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SelectDropdown, { isOpen, onClose: close, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("ul", { className: "max-h-64 overflow-y-auto py-1", children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
var import_react3 = require("react");
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime7 = require("react/jsx-runtime");
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
  const [query, setQuery] = (0, import_react3.useState)("");
  const inputRef = (0, import_react3.useRef)(null);
  const selectedOption = options.find((o) => o.value === value);
  const filteredOptions = (0, import_react3.useMemo)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      SelectTrigger,
      {
        onClick: handleOpen,
        onClear: handleClear,
        disabled,
        error,
        isOpen,
        showClear: allowDeselect && !!selectedOption,
        children: selectedOption ? renderValue ? renderValue(selectedOption) : /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "text-foreground", children: [
          selectedOption.icon && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "mr-2 inline-block text-base leading-none align-middle", children: selectedOption.icon }),
          selectedOption.label
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-foreground/30", children: placeholder })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(SelectDropdown, { isOpen, onClose: handleClose, children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-2 border-b border-foreground/10 px-3 py-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_lucide_react4.Search, { className: "h-4 w-4 shrink-0 text-foreground/30" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
        loading && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_lucide_react4.Loader2, { className: "h-4 w-4 shrink-0 animate-spin text-foreground/30" })
      ] }),
      loading && filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex items-center justify-center py-6", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_lucide_react4.Loader2, { className: "h-5 w-5 animate-spin text-foreground/30" }) }) : filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "px-3 py-4 text-center text-sm text-foreground/40", children: emptyMessage }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("ul", { className: "max-h-64 overflow-y-auto py-1", children: filteredOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
var import_jsx_runtime8 = require("react/jsx-runtime");
function ContactTitleSelect({
  value,
  onChange,
  options,
  placeholder = "Select title...",
  disabled = false,
  error = false
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
var import_react5 = require("react");
var import_lucide_react5 = require("lucide-react");

// src/hooks/use-escape-close.ts
var import_react4 = require("react");
function useEscapeClose(enabled, onClose) {
  (0, import_react4.useEffect)(() => {
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
var import_jsx_runtime9 = require("react/jsx-runtime");
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
  const [bitmap, setBitmap] = (0, import_react5.useState)(null);
  const [rotation, setRotation] = (0, import_react5.useState)(0);
  const [corners, setCorners] = (0, import_react5.useState)(null);
  const [dragging, setDragging] = (0, import_react5.useState)(null);
  const [applying, setApplying] = (0, import_react5.useState)(false);
  const [canvasSize, setCanvasSize] = (0, import_react5.useState)({ w: 800, h: 600 });
  const containerRef = (0, import_react5.useRef)(null);
  const canvasRef = (0, import_react5.useRef)(null);
  useEscapeClose(true, onCancel);
  (0, import_react5.useEffect)(() => {
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
  (0, import_react5.useEffect)(() => {
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
  const getTransform = (0, import_react5.useCallback)(() => {
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
  const imageToCanvas = (0, import_react5.useCallback)(
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
  const canvasToImage = (0, import_react5.useCallback)(
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
  (0, import_react5.useEffect)(() => {
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
  const handlePointerDown = (0, import_react5.useCallback)(
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
  const handlePointerMove = (0, import_react5.useCallback)(
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
  const handlePointerUp = (0, import_react5.useCallback)(() => {
    setDragging(null);
  }, []);
  const rotateCW = () => setRotation((r) => r + 90);
  const rotateCCW = () => setRotation((r) => r - 90);
  const coarseRotation = Math.round(rotation / 90) * 90;
  const fineRotation = rotation - coarseRotation;
  const handleFineChange = (val) => setRotation(coarseRotation + val);
  const handleApply = (0, import_react5.useCallback)(async () => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
      onClick: (e) => {
        if (e.target === e.currentTarget) onCancel();
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex h-full max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-base border border-foreground/10 bg-background shadow-2xl", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center justify-between border-b border-foreground/10 px-5 py-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h3", { className: "text-sm font-semibold text-foreground", children: t("editor.title", "Edit Passport Photo") }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              "button",
              {
                type: "button",
                onClick: onCancel,
                className: "rounded-base px-3 py-1.5 text-xs font-medium text-foreground/60 transition hover:bg-foreground/5 hover:text-foreground",
                children: t("actions.cancel", "Cancel")
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              "button",
              {
                type: "button",
                onClick: () => void handleApply(),
                disabled: applying || isLoading,
                className: "flex items-center gap-1.5 rounded-base bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50",
                children: applying ? /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" }),
                  t("editor.applying", "Applying\u2026")
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_lucide_react5.Check, { className: "h-3.5 w-3.5" }),
                  t("editor.apply", "Apply")
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { ref: containerRef, className: "relative min-h-0 flex-1 bg-foreground/[0.03]", children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-foreground/20 border-t-primary" }) }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[11px] text-white/70", children: t("editor.hint", "Drag the handles to the passport corners") })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center justify-center gap-4 border-t border-foreground/10 px-5 py-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            "button",
            {
              type: "button",
              onClick: rotateCCW,
              className: "flex h-8 w-8 items-center justify-center rounded-full border border-foreground/15 text-foreground/60 transition hover:border-foreground/30 hover:text-foreground",
              title: t("editor.rotateCCW", "Rotate 90\xB0 left"),
              children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_lucide_react5.RotateCcw, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "w-8 text-right text-[10px] tabular-nums text-foreground/40", children: [
              fineRotation > 0 ? "+" : "",
              fineRotation.toFixed(1),
              "\xB0"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            "button",
            {
              type: "button",
              onClick: rotateCW,
              className: "flex h-8 w-8 items-center justify-center rounded-full border border-foreground/15 text-foreground/60 transition hover:border-foreground/30 hover:text-foreground",
              title: t("editor.rotateCW", "Rotate 90\xB0 right"),
              children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_lucide_react5.RotateCw, { className: "h-4 w-4" })
            }
          )
        ] })
      ] })
    }
  );
}

// src/components/nationality-selector.tsx
var import_react6 = require("react");
var import_lucide_react6 = require("lucide-react");
var import_jsx_runtime10 = require("react/jsx-runtime");
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
  const [query, setQuery] = (0, import_react6.useState)("");
  const inputRef = (0, import_react6.useRef)(null);
  const exactIndex = (0, import_react6.useMemo)(() => {
    const map = /* @__PURE__ */ new Map();
    for (const o of options) {
      map.set(o.code, [o.nationality, o.countryName, o.code, o.searchAliases].filter(Boolean).join(" ").toLowerCase());
    }
    return map;
  }, [options]);
  const fuzzyIndex = (0, import_react6.useMemo)(() => {
    const map = /* @__PURE__ */ new Map();
    for (const o of options) {
      map.set(o.code, [o.nationality, o.countryName, o.code, o.searchAliases, o.languages].filter(Boolean).join(" ").toLowerCase());
    }
    return map;
  }, [options]);
  const labelIndex = (0, import_react6.useMemo)(() => {
    const map = /* @__PURE__ */ new Map();
    for (const o of options) {
      map.set(o.code, o.countryName ? `${o.countryName} \u2013 ${o.nationality}` : o.nationality);
    }
    return map;
  }, [options]);
  const selectOptions = (0, import_react6.useMemo)(() => {
    const codeSet = new Set(prioritizedCodes);
    const prioritized = prioritizedCodes.map((code) => options.find((o) => o.code === code)).filter((o) => !!o).map(toSelectOption);
    const rest = options.filter((o) => !codeSet.has(o.code)).sort((a, b) => a.nationality.localeCompare(b.nationality)).map(toSelectOption);
    if (prioritized.length > 0 && rest.length > 0) {
      return [...prioritized, { value: DIVIDER_VALUE, label: "", disabled: true }, ...rest];
    }
    return [...prioritized, ...rest];
  }, [options, prioritizedCodes]);
  const filteredOptions = (0, import_react6.useMemo)(() => {
    if (!query.trim()) return selectOptions;
    const q = query.toLowerCase();
    return selectOptions.filter((opt) => {
      var _a;
      if (opt.value === DIVIDER_VALUE) return false;
      return ((_a = exactIndex.get(opt.value)) != null ? _a : "").includes(q);
    });
  }, [selectOptions, query, exactIndex]);
  const suggestions = (0, import_react6.useMemo)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "flex min-w-0 flex-1 items-center gap-2.5 truncate", children: selectedOption ? /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [
            selectedOption.icon && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "shrink-0 text-base leading-none", children: selectedOption.icon }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "truncate text-slate-900", children: selectedOption.label })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-slate-400", children: placeholder }) }),
          allowDeselect && selectedOption && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("button", { type: "button", onClick: handleClear, className: "rounded-full p-0.5 text-slate-400 transition hover:text-slate-600", "aria-label": "Clear", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react6.X, { className: "h-3.5 w-3.5" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react6.ChevronDown, { className: `h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}` })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "fixed inset-0 z-10", onClick: handleClose }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "absolute left-0 z-20 mt-1.5 w-80 max-w-96 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center gap-2.5 border-b border-slate-100 px-3.5 py-2.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react6.Search, { className: "h-4 w-4 shrink-0 text-slate-400" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "max-h-64 overflow-y-auto overscroll-contain [scrollbar-width:none]", children: filteredOptions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("ul", { className: "py-1", children: filteredOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("li", { children: opt.value === DIVIDER_VALUE ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "mx-3 my-1", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "border-t border-slate-100" }) }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Option, { opt, selected: value === opt.value, onSelect: handleSelect }) }, opt.value)) }) : suggestions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "py-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "px-3.5 pb-2 text-xs leading-relaxed text-slate-400", children: suggestMessage }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("ul", { children: suggestions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Option, { opt, selected: value === opt.value, onSelect: handleSelect, label: labelIndex.get(opt.value) }) }, opt.value)) })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "px-3.5 py-4 text-center text-sm text-slate-400", children: "No results found" }) })
      ] })
    ] })
  ] });
}
function Option({ opt, selected, onSelect, label }) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    "button",
    {
      type: "button",
      onClick: () => onSelect(opt.value),
      className: `flex w-full items-center gap-3 px-3.5 py-2 text-left text-sm transition ${selected ? "bg-primary/5 font-medium text-primary" : "text-slate-700 hover:bg-slate-50"}`,
      children: [
        opt.icon && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "shrink-0 text-base leading-none", children: opt.icon }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "flex-1 truncate", children: label != null ? label : opt.label })
      ]
    }
  );
}
function toSelectOption(opt) {
  return { value: opt.code, label: opt.nationality, icon: opt.flagEmoji };
}

// src/components/gender-selector.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
var import_jsx_runtime12 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
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
var import_jsx_runtime13 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
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
var import_react7 = require("react");
var import_lucide_react7 = require("lucide-react");
var import_jsx_runtime14 = require("react/jsx-runtime");
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
  const [query, setQuery] = (0, import_react7.useState)("");
  const inputRef = (0, import_react7.useRef)(null);
  const isMulti = props.multiple === true;
  const selectOptions = (0, import_react7.useMemo)(() => toSelectOptions(options), [options]);
  const filteredOptions = (0, import_react7.useMemo)(() => {
    if (!query.trim()) return selectOptions;
    return selectOptions.filter((opt) => defaultFilter2(opt, query));
  }, [selectOptions, query]);
  const selectedSlugs = isMulti ? props.value : props.value ? [props.value] : [];
  const isSelected = (0, import_react7.useCallback)(
    (slug) => selectedSlugs.includes(slug),
    [selectedSlugs]
  );
  const handleOpen = (0, import_react7.useCallback)(() => {
    setQuery("");
    open();
    requestAnimationFrame(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.focus();
    });
  }, [open]);
  const handleClose = (0, import_react7.useCallback)(() => {
    setQuery("");
    close();
  }, [close]);
  const handleToggleOption = (0, import_react7.useCallback)(
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
  const handleClear = (0, import_react7.useCallback)(() => {
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
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-foreground/30", children: placeholder });
    }
    if (!isMulti) {
      const opt = options.find((o) => o.slug === selectedSlugs[0]);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-foreground", children: (_a = opt == null ? void 0 : opt.title) != null ? _a : selectedSlugs[0] });
    }
    if (selectedSlugs.length === 1) {
      const opt = options.find((o) => o.slug === selectedSlugs[0]);
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-foreground", children: (_b = opt == null ? void 0 : opt.title) != null ? _b : selectedSlugs[0] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "text-foreground", children: [
      selectedSlugs.length,
      " tours selected"
    ] });
  })();
  const showClear = isMulti ? selectedSlugs.length > 0 : !!props.allowDeselect && selectedSlugs.length > 0;
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(SelectDropdown, { isOpen, onClose: handleClose, children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center gap-2 border-b border-foreground/10 px-3 py-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react7.Search, { className: "h-4 w-4 shrink-0 text-foreground/30" }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
        loading && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react7.Loader2, { className: "h-4 w-4 shrink-0 animate-spin text-foreground/30" })
      ] }),
      loading && filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "flex items-center justify-center py-6", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react7.Loader2, { className: "h-5 w-5 animate-spin text-foreground/30" }) }) : filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "px-3 py-4 text-center text-sm text-foreground/40", children: emptyMessage }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("ul", { className: "max-h-64 overflow-y-auto py-1", children: filteredOptions.map((opt) => {
        const selected = isSelected(opt.value);
        return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
          "button",
          {
            type: "button",
            disabled: opt.disabled,
            onClick: () => handleToggleOption(opt.value),
            className: `flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${selected ? "bg-primary/5 font-medium text-primary" : "text-foreground hover:bg-foreground/5"} ${opt.disabled ? "cursor-not-allowed opacity-40" : ""}`,
            children: [
              isMulti && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                "span",
                {
                  className: `flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${selected ? "border-primary bg-primary text-white" : "border-foreground/20 bg-background"}`,
                  children: selected && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react7.Check, { className: "h-3 w-3" })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "flex-1 truncate", children: opt.label }),
              !isMulti && selected && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react7.Check, { className: "h-4 w-4 shrink-0 text-primary" })
            ]
          }
        ) }, opt.value);
      }) })
    ] })
  ] });
}

// src/components/toast.tsx
var import_react8 = require("react");
var import_lucide_react8 = require("lucide-react");
var import_jsx_runtime15 = require("react/jsx-runtime");
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
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react8.Check, { className: iconClass });
    case "error":
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react8.AlertCircle, { className: iconClass });
    case "warning":
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react8.AlertCircle, { className: iconClass });
    default:
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react8.Info, { className: iconClass });
  }
};
function Toast({ toast, onDismiss }) {
  const [isVisible, setIsVisible] = (0, import_react8.useState)(false);
  const [isExiting, setIsExiting] = (0, import_react8.useState)(false);
  const styles = toastStyles[toast.type];
  (0, import_react8.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ToastIcon, { type: toast.type }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: `text-sm font-medium ${styles.text}`, children: toast.message }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "button",
          {
            type: "button",
            onClick: handleDismiss,
            className: `ml-2 rounded-full p-1 transition hover:bg-black/5 ${styles.text}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react8.X, { className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}
function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-auto", children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Toast, { toast: t, onDismiss }, t.id)) });
}
function useToast() {
  const [toasts, setToasts] = (0, import_react8.useState)([]);
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
var import_lucide_react9 = require("lucide-react");
var import_jsx_runtime16 = require("react/jsx-runtime");
function PaxCounter({
  label,
  value,
  min,
  max,
  onChange,
  disabled = false
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "text-xs font-medium text-foreground/60", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "mt-1 flex items-center gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "button",
        {
          type: "button",
          disabled: disabled || value <= min,
          onClick: () => onChange(value - 1),
          className: "flex h-10 w-10 items-center justify-center rounded-lg border-2 border-foreground/15 bg-background text-foreground/50 transition hover:border-primary hover:text-primary disabled:opacity-40",
          children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react9.Minus, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "flex min-w-[60px] flex-col items-center justify-center rounded-lg border border-foreground/10 bg-foreground/2 px-4 py-2", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "text-xl font-bold text-foreground", children: value }) }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "button",
        {
          type: "button",
          disabled: disabled || value >= max,
          onClick: () => onChange(value + 1),
          className: "flex h-10 w-10 items-center justify-center rounded-lg border-2 border-foreground/15 bg-background text-foreground/50 transition hover:border-primary hover:text-primary disabled:opacity-40",
          children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react9.Plus, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
}

// src/components/location-map.tsx
var import_lucide_react10 = require("lucide-react");
var import_jsx_runtime17 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    "a",
    {
      href: mapsUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      className: `group relative block overflow-hidden ${className != null ? className : ""}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          "img",
          {
            src: staticMapUrl,
            alt: label != null ? label : "Map",
            className: "h-full w-full object-cover",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { className: "absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-md backdrop-blur-sm transition group-hover:bg-white group-hover:shadow-lg", children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_lucide_react10.Navigation, { className: "h-3 w-3" }),
          directionsLabel
        ] })
      ]
    }
  );
}

// src/components/rich-text-content.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
function wrapMarks(text, marks, nodeKey) {
  var _a, _b;
  if (!marks || marks.length === 0) return text;
  let node = text;
  for (let i = 0; i < marks.length; i++) {
    const mark = marks[i];
    const key = `${nodeKey != null ? nodeKey : "m"}-${mark.type}-${i}`;
    switch (mark.type) {
      case "bold":
        node = /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("strong", { children: node }, key);
        break;
      case "italic":
        node = /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("em", { children: node }, key);
        break;
      case "underline":
        node = /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("u", { children: node }, key);
        break;
      case "strike":
        node = /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("s", { children: node }, key);
        break;
      case "code":
        node = /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("code", { className: "rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800", children: node }, key);
        break;
      case "link": {
        const href = (_b = (_a = mark.attrs) == null ? void 0 : _a.href) != null ? _b : "#";
        node = /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          "a",
          {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary underline decoration-primary/30 transition hover:decoration-primary",
            children: node
          },
          key
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
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_jsx_runtime18.Fragment, { children });
    case "paragraph":
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("p", { className: "mb-3 last:mb-0", children: children != null ? children : /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("br", {}) }, key);
    case "heading": {
      const level = (_c = (_b = node.attrs) == null ? void 0 : _b.level) != null ? _c : 2;
      const sizes = {
        1: "text-xl font-bold mb-3",
        2: "text-lg font-semibold mb-2",
        3: "text-base font-semibold mb-2"
      };
      const cls = (_d = sizes[level]) != null ? _d : sizes[3];
      if (level === 1) return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("h1", { className: cls, children }, key);
      if (level === 2) return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("h2", { className: cls, children }, key);
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("h3", { className: cls, children }, key);
    }
    case "text":
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { children: wrapMarks((_e = node.text) != null ? _e : "", node.marks, key) }, key);
    case "hardBreak":
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("br", {}, key);
    case "horizontalRule":
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("hr", { className: "my-4 border-slate-200" }, key);
    case "blockquote":
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        "blockquote",
        {
          className: "mb-3 border-l-4 border-slate-300 pl-4 italic text-slate-600",
          children
        },
        key
      );
    case "codeBlock":
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        "pre",
        {
          className: "mb-3 overflow-x-auto rounded-lg bg-slate-100 p-4 font-mono text-sm text-slate-800",
          children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("code", { children })
        },
        key
      );
    case "bulletList":
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("ul", { className: "mb-3 list-disc space-y-1 pl-5", children }, key);
    case "orderedList":
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("ol", { className: "mb-3 list-decimal space-y-1 pl-5", children }, key);
    case "listItem":
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("li", { children }, key);
    case "taskList":
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("ul", { className: "mb-3 space-y-1", children }, key);
    case "taskItem": {
      const checked = ((_f = node.attrs) == null ? void 0 : _f.checked) === true;
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("li", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: `mt-0.5 ${checked ? "text-emerald-500" : "text-slate-400"}`, children: checked ? "\u2611" : "\u2610" }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: checked ? "line-through text-slate-400" : "", children })
      ] }, key);
    }
    case "image": {
      const src = (_h = (_g = node.attrs) == null ? void 0 : _g.src) != null ? _h : "";
      const alt = (_j = (_i = node.attrs) == null ? void 0 : _i.alt) != null ? _j : "";
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
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
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "mb-3 overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("table", { className: "w-full border-collapse border border-slate-200 text-sm", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("tbody", { children }) }) }, key);
    case "tableRow":
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("tr", { children }, key);
    case "tableHeader":
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        "th",
        {
          className: "border border-slate-200 bg-slate-50 px-3 py-2 text-left font-semibold",
          children
        },
        key
      );
    case "tableCell":
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("td", { className: "border border-slate-200 px-3 py-2", children }, key);
    default:
      return children ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { children }, key) : null;
  }
}
function RichTextContent({ content, className, fallback }) {
  if (!content) {
    return fallback ? /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("p", { className, children: fallback }) : null;
  }
  let parsed;
  if (typeof content === "string") {
    try {
      const json = JSON.parse(content);
      if (!json || typeof json !== "object" || json.type !== "doc") {
        return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("p", { className, children: content });
      }
      parsed = json;
    } catch (e) {
      return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("p", { className, children: content });
    }
  } else {
    parsed = content;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className, children: renderNode(parsed, 0) });
}

// src/components/prompt-dialog.tsx
var import_react9 = require("react");
var import_lucide_react11 = require("lucide-react");
var import_jsx_runtime19 = require("react/jsx-runtime");
var VARIANT_CLASSES = {
  primary: "bg-primary text-white hover:bg-primary/90",
  danger: "bg-red-600 text-white hover:bg-red-700",
  amber: "bg-amber-600 text-white hover:bg-amber-700"
};
function PromptDialog({
  open,
  onSubmit,
  onCancel,
  title,
  description,
  icon,
  placeholder = "",
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  variant = "primary",
  required = false,
  multiline = true
}) {
  const [value, setValue] = (0, import_react9.useState)("");
  const inputRef = (0, import_react9.useRef)(null);
  (0, import_react9.useEffect)(() => {
    if (open) {
      setValue("");
      requestAnimationFrame(() => {
        var _a;
        return (_a = inputRef.current) == null ? void 0 : _a.focus();
      });
    }
  }, [open]);
  (0, import_react9.useEffect)(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onCancel]);
  const handleSubmit = (0, import_react9.useCallback)(() => {
    if (required && !value.trim()) return;
    onSubmit(value.trim());
  }, [value, required, onSubmit]);
  const handleKeyDown = (0, import_react9.useCallback)(
    (e) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSubmit();
      }
      if (!multiline && e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit, multiline]
  );
  if (!open) return null;
  const isDisabled = required && !value.trim();
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    "div",
    {
      className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm",
      onClick: onCancel,
      role: "presentation",
      children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
        "div",
        {
          className: "mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl",
          onClick: (e) => e.stopPropagation(),
          role: "dialog",
          "aria-modal": "true",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "mb-4 flex items-center gap-3", children: [
              icon && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "shrink-0 rounded-full bg-slate-100 p-3 text-slate-600", children: icon }),
              /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("h3", { className: "text-lg font-semibold text-slate-900", children: title }),
                description && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("p", { className: "text-sm text-slate-500", children: description })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
                "button",
                {
                  type: "button",
                  onClick: onCancel,
                  className: "rounded-full p-1.5 text-slate-400 transition hover:text-slate-600",
                  children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_lucide_react11.X, { className: "h-4 w-4" })
                }
              )
            ] }),
            multiline ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
              "textarea",
              {
                ref: inputRef,
                value,
                onChange: (e) => setValue(e.target.value),
                onKeyDown: handleKeyDown,
                placeholder,
                rows: 3,
                className: "mb-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
              "input",
              {
                ref: inputRef,
                type: "text",
                value,
                onChange: (e) => setValue(e.target.value),
                onKeyDown: handleKeyDown,
                placeholder,
                className: "mb-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex justify-end gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
                "button",
                {
                  type: "button",
                  onClick: onCancel,
                  className: "rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary",
                  children: cancelLabel
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
                "button",
                {
                  type: "button",
                  onClick: handleSubmit,
                  disabled: isDisabled,
                  className: `rounded-full px-4 py-2 text-sm font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]}`,
                  children: submitLabel
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactTitleSelect,
  EmailInput,
  GenderSelector,
  LocationMap,
  NationalitySelector,
  PassportImageEditor,
  PaxCounter,
  PillSelector,
  PromptDialog,
  RichTextContent,
  SearchableSelector,
  SelectDropdown,
  SelectOptionRow,
  SelectTrigger,
  Selector,
  SideDrawer,
  StatusCard,
  TitleSelector,
  ToastContainer,
  TourSelector,
  WeightRangeSelector,
  applyPerspectiveWarp,
  useDropdown,
  useEscapeClose,
  useToast
});
