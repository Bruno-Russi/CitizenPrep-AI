import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-screen"
      style={{ background: "#0A0F1E" }}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-5 py-7 lg:px-10 lg:py-9 pb-28 lg:pb-9">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
