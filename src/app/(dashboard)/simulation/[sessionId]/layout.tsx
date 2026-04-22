export default function SessionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto" style={{ background: "#0A0F1E" }}>
      {children}
    </div>
  );
}
