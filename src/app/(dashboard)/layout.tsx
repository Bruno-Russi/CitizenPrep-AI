import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { BottomNav } from "@/components/layout/bottom-nav";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profileData } = await supabase
    .from("profiles")
    .select("name, email")
    .eq("id", user.id)
    .maybeSingle();

  const profile = profileData as { name: string | null; email: string | null } | null;
  const name = profile?.name ?? (user.user_metadata?.preferred_name as string | undefined) ?? (user.user_metadata?.full_name as string | undefined) ?? "Usuário";
  const email = profile?.email ?? user.email ?? "";
  const initials = getInitials(name);

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "#0A0F1E" }}
    >
      <Sidebar user={{ name, email, initials }} />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-4 sm:px-5 py-5 sm:py-7 lg:px-10 lg:py-9 pb-24 lg:pb-9">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
