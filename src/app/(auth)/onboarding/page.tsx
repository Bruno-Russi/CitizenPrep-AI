"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "lucide-react";
import { FormField, Input } from "@/components/auth/form-field";
import { SubmitButton } from "@/components/auth/submit-button";
import { completeOnboarding } from "@/features/auth/actions";

const schema = z.object({
  preferredName: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function OnboardingPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    setServerError(null);
    const result = await completeOnboarding({
      preferredName: data.preferredName,
      state: "CA",
      examFormat: "standard",
    });
    if (result?.error) {
      setServerError(result.error);
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="rounded-xl p-8 space-y-8"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold text-white leading-tight tracking-tight">
          Vamos personalizar sua experiência
        </h1>
        <p className="text-sm text-white/50 leading-relaxed">
          Só precisamos de uma informação para começar.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        {serverError && (
          <div
            className="px-4 py-3 rounded-lg text-sm text-red-400"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            {serverError}
          </div>
        )}

        <div className="flex justify-center">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(59,130,246,0.12)" }}
          >
            <User size={24} style={{ color: "#60A5FA" }} />
          </div>
        </div>

        <FormField label="Como podemos te chamar?" error={errors.preferredName?.message}>
          {(id) => (
            <Input
              id={id}
              {...register("preferredName")}
              type="text"
              placeholder="Ex: Maria"
              autoComplete="given-name"
              autoFocus
              error={!!errors.preferredName}
            />
          )}
        </FormField>

        <SubmitButton loading={isSubmitting}>Começar a praticar</SubmitButton>
      </form>
    </div>
  );
}
