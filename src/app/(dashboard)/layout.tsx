import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[--color-ice]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
