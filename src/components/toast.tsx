"use client";

import { useEffect, useState } from "react";
import { Check, X, AlertCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export type ToastMessage = {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
};

type ToastProps = {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
};

const toastStyles: Record<ToastType, { bg: string; border: string; text: string; icon: string }> = {
  success: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-800",
    icon: "text-emerald-500",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: "text-red-500",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: "text-blue-500",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    icon: "text-amber-500",
  },
};

const ToastIcon = ({ type }: { type: ToastType }) => {
  const iconClass = `h-5 w-5 ${toastStyles[type].icon}`;
  switch (type) {
    case "success":
      return <Check className={iconClass} />;
    case "error":
      return <AlertCircle className={iconClass} />;
    case "warning":
      return <AlertCircle className={iconClass} />;
    default:
      return <Info className={iconClass} />;
  }
};

function Toast({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const styles = toastStyles[toast.type];

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));

    const duration = toast.duration ?? 4000;
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

  return (
    <div
      className={`
        flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-sm
        transition-all duration-300 ease-out
        ${styles.bg} ${styles.border}
        ${isVisible && !isExiting ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}
      `}
      role="alert"
    >
      <ToastIcon type={toast.type} />
      <span className={`text-sm font-medium ${styles.text}`}>{toast.message}</span>
      <button
        type="button"
        onClick={handleDismiss}
        className={`ml-2 rounded-full p-1 transition hover:bg-black/5 ${styles.text}`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

type ToastContainerProps = {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
};

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-auto">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: ToastType, message: string, duration?: number) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { id, type, message, duration }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    toasts,
    showToast,
    dismissToast,
    success: (message: string, duration?: number) => showToast("success", message, duration),
    error: (message: string, duration?: number) => showToast("error", message, duration),
    info: (message: string, duration?: number) => showToast("info", message, duration),
    warning: (message: string, duration?: number) => showToast("warning", message, duration),
  };
}
