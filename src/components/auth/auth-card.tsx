import { cn } from "@/lib/utils";

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  formNumber?: string;
}

export function AuthCard({
  title,
  description,
  children,
  footer,
  className,
  formNumber: _formNumber,
}: AuthCardProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold text-white leading-tight tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-white/50 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Form body */}
      <div
        className="rounded-xl p-8 space-y-5"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div
          className="text-center text-sm text-white/50 pt-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
