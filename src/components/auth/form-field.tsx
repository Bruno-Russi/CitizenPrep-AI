import { useId } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  error?: string;
  children: (id: string) => React.ReactNode;
  className?: string;
  fieldNumber?: string;
}

export function FormField({ label, error, children, className, fieldNumber: _fieldNumber }: FormFieldProps) {
  const id = useId();
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={id}
        className="block text-[11px] font-medium uppercase tracking-widest text-white/40"
      >
        {label}
      </label>
      {children(id)}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block w-1 h-1 rounded-full bg-red-400 shrink-0" />
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
        "w-full h-11 px-4 rounded-lg text-sm text-white",
        "font-sans transition-all outline-none",
        "placeholder:text-white/25",
        "focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-0",
        error
          ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30"
          : "hover:border-white/15 focus:border-blue-500/60",
        className
      )}
      style={{
        background: "rgba(255,255,255,0.05)",
        border: error ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.1)",
      }}
      {...props}
    />
  );
}
