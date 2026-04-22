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
import { forgotPassword } from "@/features/auth/actions";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);
    const result = await forgotPassword(data);
    if (result?.error) {
      setServerError(result.error);
    } else {
      setSent(true);
    }
  }

  if (sent) {
    return (
      <AuthCard title="Verifique seu e-mail">
        <div className="text-center space-y-4 py-2">
          <div className="flex justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <CheckCircle size={28} className="text-emerald-400" />
            </div>
          </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Enviamos um link de recuperação para{" "}
            <span className="font-semibold text-white">{getValues("email")}</span>.
            Verifique sua caixa de entrada.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors mt-2"
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
          className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft size={14} />
          Voltar para o login
        </Link>
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

        <SubmitButton loading={isSubmitting}>Enviar link de recuperação</SubmitButton>
      </form>
    </AuthCard>
  );
}
