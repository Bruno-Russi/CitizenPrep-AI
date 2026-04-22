"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthCard } from "@/components/auth/auth-card";
import { FormField, Input } from "@/components/auth/form-field";
import { PasswordInput } from "@/components/auth/password-input";
import { SubmitButton } from "@/components/auth/submit-button";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Informe sua senha"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(_data: FormData) {
    setServerError(null);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/dashboard");
  }

  return (
    <AuthCard
      title="Acesse sua conta"
      description="Informe seus dados para continuar praticando."
      footer={
        <>
          Não tem conta?{" "}
          <Link
            href="/signup"
            className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Criar conta grátis
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {serverError && (
          <div
            className="px-4 py-3 rounded-lg text-sm text-red-400"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            {serverError}
          </div>
        )}

        <FormField label="Email" error={errors.email?.message}>
          {(id) => (
            <Input
              id={id}
              {...register("email")}
              type="email"
              placeholder="voce@email.com"
              autoComplete="email"
              error={!!errors.email}
            />
          )}
        </FormField>

        <FormField label="Senha" error={errors.password?.message}>
          {(id) => (
            <PasswordInput
              id={id}
              {...register("password")}
              placeholder="••••••••"
              autoComplete="current-password"
              error={!!errors.password}
            />
          )}
        </FormField>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-white/40 hover:text-blue-400 transition-colors"
          >
            Esqueci a senha
          </Link>
        </div>

        <SubmitButton loading={isSubmitting}>
          Entrar
        </SubmitButton>
      </form>
    </AuthCard>
  );
}
