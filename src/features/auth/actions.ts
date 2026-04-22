"use server";

import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function signUp(formData: { name: string; email: string; password: string }) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: { full_name: formData.name },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/onboarding`,
    },
  });

  if (error) return { error: error.message };

  // Se email confirmation está desativado no Supabase, a sessão já vem na resposta.
  // Nesse caso mandamos direto para o onboarding em vez de /confirm.
  if (data.session) {
    redirect("/onboarding");
  }

  redirect("/confirm");
}

export async function signIn(formData: { email: string; password: string }) {
  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) return { error: "E-mail ou senha incorretos." };

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function forgotPassword(formData: { email: string }) {
  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/reset-password`,
  });

  if (error) return { error: error.message };

  return { success: true };
}

export async function resetPassword(formData: { password: string }) {
  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (error) return { error: error.message };

  return { success: true };
}

export async function completeOnboarding(formData: {
  preferredName: string;
  state: string;
  examFormat: "standard" | "2025";
}) {
  const supabase = await getSupabaseServerClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Sessão inválida. Faça login novamente." };

  // Salva dados extras no user_metadata e atualiza o nome no profiles
  const { error: metaError } = await supabase.auth.updateUser({
    data: {
      preferred_name: formData.preferredName,
      state: formData.state,
      exam_format: formData.examFormat,
    },
  });
  if (metaError) return { error: metaError.message };

  // O SDK Supabase infere Update como never quando há conflito de nullabilidade no tipo gerado
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: profileError } = await (supabase.from("profiles") as any)
    .update({ name: formData.preferredName as string | null })
    .eq("id", user.id);
  if (profileError) return { error: profileError.message };

  redirect("/dashboard");
}
