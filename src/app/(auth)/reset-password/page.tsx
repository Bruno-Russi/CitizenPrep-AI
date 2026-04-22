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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(_data: FormData) {
    // M6 — atualizar senha via Supabase Auth
    await new Promise((r) => setTimeout(r, 1000));
    setDone(true);
  }

  if (done) {
    return (
      <AuthCard title="Senha redefinida!">
        <div className="text-center space-y-4 py-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-[--color-sage]/10 flex items-center justify-center">
              <CheckCircle size={32} className="text-[--color-sage]" />
            </div>
          </div>
          <p className="text-[--color-gray-secondary] text-sm">
            Sua senha foi atualizada com sucesso.
          </p>
          <Link
            href="/login"
            className="inline-block mt-2 w-full text-center h-11 rounded-lg bg-[--color-navy] text-white font-semibold text-sm leading-[2.75rem] hover:bg-[--color-sky] transition-colors"
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
