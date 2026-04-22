import { useId } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: string;
  children: (id: string) => React.ReactNode;
  className?: string;
}

export function FormField({ label, error, children, className }: FormFieldProps) {
  const id = useId();
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="block text-sm font-medium text-[--color-navy]">
        {label}
      </label>
      {children(id)}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full h-11 px-4 rounded-lg border bg-white text-[--color-navy] text-sm",
        "placeholder:text-[--color-gray-secondary]/60",
        "transition-colors outline-none",
        "focus:ring-2 focus:ring-[--color-sky]/30 focus:border-[--color-sky]",
        error
          ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
          : "border-border hover:border-[--color-sky]/40",
        className
      )}
      {...props}
    />
  );
}
