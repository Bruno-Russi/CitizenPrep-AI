"use client";

import Link from "next/link";
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    // M6 — conectar ao Supabase Auth
    await new Promise((r) => setTimeout(r, 1000));
    console.log(data);
  }

  return (
    <AuthCard
      title="Entrar na sua conta"
      description="Acesse sua conta para continuar praticando."
      footer={
        <>
          Não tem conta?{" "}
          <Link href="/signup" className="font-medium text-[--color-sky] hover:underline">
            Criar conta grátis
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <FormField label="E-mail" error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="voce@email.com"
            autoComplete="email"
            error={!!errors.email}
          />
        </FormField>

        <FormField label="Senha" error={errors.password?.message}>
          <PasswordInput
            {...register("password")}
            placeholder="Sua senha"
            autoComplete="current-password"
            error={!!errors.password}
          />
        </FormField>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-[--color-sky] hover:underline"
          >
            Esqueci minha senha
          </Link>
        </div>

        <SubmitButton loading={isSubmitting}>Entrar</SubmitButton>
      </form>
    </AuthCard>
  );
}
