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
        "w-full h-11 rounded-lg bg-[--color-navy] text-white font-semibold text-sm",
        "transition-all duration-150",
        "hover:bg-[--color-sky] focus:outline-none focus:ring-2 focus:ring-[--color-sky]/50 focus:ring-offset-2",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        "flex items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}
