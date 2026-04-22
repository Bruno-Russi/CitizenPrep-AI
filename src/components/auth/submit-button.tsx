"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export function SubmitButton({ loading, children, className, disabled, ...props }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className={cn(
        "w-full h-11 rounded-lg font-semibold text-sm text-white",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "flex items-center justify-center gap-2.5",
        "relative overflow-hidden",
        className
      )}
      style={{
        background: loading || disabled
          ? "rgba(59,130,246,0.5)"
          : "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
        boxShadow: loading || disabled ? "none" : "0 1px 20px rgba(59,130,246,0.3)",
      }}
      {...props}
    >
      {loading && <Loader2 size={15} className="animate-spin" />}
      {children}
    </button>
  );
}
