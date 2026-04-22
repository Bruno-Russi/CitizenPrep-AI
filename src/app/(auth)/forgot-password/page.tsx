"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { FormField, Input } from "@/components/auth/form-field";
import { SubmitButton } from "@/components/auth/submit-button";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    // M6 — enviar magic link via Supabase Auth
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
  }

  if (sent) {
    return (
      <AuthCard title="Verifique seu e-mail">
        <div className="text-center space-y-4 py-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-[--color-sage]/10 flex items-center justify-center">
              <CheckCircle size={32} className="text-[--color-sage]" />
            </div>
          </div>
          <p className="text-[--color-gray-secondary] text-sm leading-relaxed">
            Enviamos um link de recuperação para{" "}
            <span className="font-medium text-[--color-navy]">{getValues("email")}</span>.
            Verifique sua caixa de entrada.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-[--color-sky] hover:underline mt-2"
          >
            <ArrowLeft size={14} />
            Voltar para o login
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Recuperar senha"
      description="Informe seu e-mail e enviaremos um link para redefinir sua senha."
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-[--color-sky] hover:underline"
        >
          <ArrowLeft size={14} />
          Voltar para o login
        </Link>
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

        <SubmitButton loading={isSubmitting}>Enviar link de recuperação</SubmitButton>
      </form>
    </AuthCard>
  );
}
