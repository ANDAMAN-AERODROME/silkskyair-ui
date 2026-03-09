"use client";

import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Variant colour map                                                */
/* ------------------------------------------------------------------ */

const variants = {
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
    calloutText: "text-amber-700/70",
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
    calloutText: "text-sky-700/70",
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
    calloutText: "text-emerald-700/70",
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
    calloutText: "text-rose-700/70",
  },
} as const;

export type StatusCardVariant = keyof typeof variants;

/* ------------------------------------------------------------------ */
/*  Props                                                             */
/* ------------------------------------------------------------------ */

export type StatusCardProps = {
  /** Visual variant driving the colour scheme (default: "info") */
  variant?: StatusCardVariant;
  /** Icon rendered inside the header circle */
  icon: ReactNode;
  /** Title displayed next to the icon */
  title: string;
  /** Optional segmented progress bar below the title */
  progress?: { value: number; max: number };
  /** Body content — the main explanation area */
  children: ReactNode;
  /** Optional brand-tinted callout at the bottom of the body */
  callout?: { icon: ReactNode; content: ReactNode };
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function StatusCard({
  variant = "info",
  icon,
  title,
  progress,
  children,
  callout,
}: StatusCardProps) {
  const v = variants[variant];

  return (
    <div className="w-72">
      {/* ── Header ───────────────────────────────────── */}
      <div className={`${v.band} px-4 py-3`}>
        <div className="flex items-center gap-2.5">
          <span className={`${v.icon} shrink-0 [&>svg]:h-4 [&>svg]:w-4`}>
            {icon}
          </span>
          <span className={`text-[13px] font-semibold leading-tight ${v.title}`}>
            {title}
          </span>
          {progress && progress.max > 0 && (
            <span
              className={`ml-auto text-[11px] font-medium tabular-nums ${v.progressText}`}
            >
              {progress.value}/{progress.max}
            </span>
          )}
        </div>

        {progress && progress.max > 0 && (
          <div className="mt-2 flex gap-0.5">
            {Array.from({ length: progress.max }, (_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i < progress.value ? v.progressFilled : v.progressTrack
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Body ─────────────────────────────────────── */}
      <div className="px-4 pt-3 pb-3.5">
        <div className="text-xs leading-normal text-foreground/50">
          {children}
        </div>

        {callout && (
          <div
            className={`mt-2.5 flex items-start gap-2 rounded-md border ${v.calloutBorder} ${v.calloutBg} px-3 py-2`}
          >
            <span className={`mt-px shrink-0 ${v.calloutIcon} [&>svg]:h-3.5 [&>svg]:w-3.5`}>
              {callout.icon}
            </span>
            <div className={`text-[11px] leading-normal ${v.calloutText}`}>
              {callout.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
