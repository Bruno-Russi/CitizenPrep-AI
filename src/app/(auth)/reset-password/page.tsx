"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { PasswordInput } from "@/components/auth/password-input";
import { FormField } from "@/components/auth/form-field";
import { SubmitButton } from "@/components/auth/submit-button";
import { resetPassword } from "@/features/auth/actions";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Senha deve ter ao menos 8 caracteres")
      .regex(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
      .regex(/[0-9]/, "Deve conter ao menos um número"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);
    const result = await resetPassword({ password: data.password });
    if (result?.error) {
      setServerError(result.error);
    } else {
      setDone(true);
    }
  }

  if (done) {
    return (
      <AuthCard title="Senha redefinida!">
        <div className="text-center space-y-4 py-2">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
            style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}
          >
            <CheckCircle size={28} className="text-emerald-400" />
          </div>
          <p className="text-sm text-white/60">Sua senha foi atualizada com sucesso.</p>
          <Link
            href="/login"
            className="flex items-center justify-center w-full h-11 rounded-lg font-semibold text-sm text-white transition-all"
            style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)", boxShadow: "0 1px 20px rgba(59,130,246,0.3)" }}
          >
            Entrar na conta
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Redefinir senha"
      description="Escolha uma nova senha para a sua conta."
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {serverError && (
          <div
            className="px-4 py-3 rounded-lg text-sm text-red-400"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            {serverError}
          </div>
        )}
        <FormField label="Nova senha" error={errors.password?.message}>
          {(id) => (
            <PasswordInput
              id={id}
              {...register("password")}
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              error={!!errors.password}
            />
          )}
        </FormField>

        <FormField label="Confirmar nova senha" error={errors.confirmPassword?.message}>
          {(id) => (
            <PasswordInput
              id={id}
              {...register("confirmPassword")}
              placeholder="Repita a nova senha"
              autoComplete="new-password"
              error={!!errors.confirmPassword}
            />
          )}
        </FormField>

        <SubmitButton loading={isSubmitting}>Redefinir senha</SubmitButton>
      </form>
    </AuthCard>
  );
}
