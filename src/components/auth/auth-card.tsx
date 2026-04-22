import { cn } from "@/lib/utils";

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthCard({ title, description, children, footer, className }: AuthCardProps) {
  return (
    <div className={cn("bg-white rounded-2xl shadow-sm border border-border p-8 space-y-6", className)}>
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold text-[--color-navy]">{title}</h1>
        {description && (
          <p className="text-[--color-gray-secondary] text-sm leading-relaxed">{description}</p>
        )}
      </div>
      <div>{children}</div>
      {footer && (
        <div className="text-center text-sm text-[--color-gray-secondary]">{footer}</div>
      )}
    </div>
  );
}
