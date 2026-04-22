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

const schema = z
  .object({
    name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
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

export default function SignupPage() {
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
    router.push("/onboarding");
  }

  return (
    <AuthCard
      title="Criar conta grátis"
      description="Comece a se preparar para a entrevista de cidadania americana."
      footer={
        <>
          Já tem conta?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            Entrar
          </Link>
        </>
      }
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

        <FormField label="Nome completo" error={errors.name?.message}>
          {(id) => (
            <Input
              id={id}
              {...register("name")}
              type="text"
              placeholder="Seu nome completo"
              autoComplete="name"
              error={!!errors.name}
            />
          )}
        </FormField>

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
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              error={!!errors.password}
            />
          )}
        </FormField>

        <FormField label="Confirmar senha" error={errors.confirmPassword?.message}>
          {(id) => (
            <PasswordInput
              id={id}
              {...register("confirmPassword")}
              placeholder="Repita a senha"
              autoComplete="new-password"
              error={!!errors.confirmPassword}
            />
          )}
        </FormField>

        <div className="pt-1">
          <SubmitButton loading={isSubmitting}>
            Criar conta grátis
          </SubmitButton>
        </div>

        <p className="text-center text-[11px] text-white/30">
          Ao criar uma conta, você concorda com nossos{" "}
          <Link href="#" className="text-white/50 hover:text-blue-400 underline underline-offset-2 transition-colors">
            Termos de Uso
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
