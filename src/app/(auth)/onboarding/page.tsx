"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ChevronRight, MapPin, FileText, User } from "lucide-react";
import { FormField, Input } from "@/components/auth/form-field";
import { SubmitButton } from "@/components/auth/submit-button";
import { cn } from "@/lib/utils";
import { completeOnboarding } from "@/features/auth/actions";

const schema = z.object({
  preferredName: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  state: z.string().min(2, "Selecione um estado"),
  examFormat: z.enum(["standard", "2025"]).refine((v) => !!v, "Escolha o formato da prova"),
});

type FormData = z.infer<typeof schema>;

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado",
  "Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho",
  "Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana",
  "Maine","Maryland","Massachusetts","Michigan","Minnesota",
  "Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York",
  "North Carolina","North Dakota","Ohio","Oklahoma","Oregon",
  "Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington",
  "West Virginia","Wisconsin","Wyoming",
];

const EXAM_FORMATS = [
  {
    id: "standard" as const,
    label: "Formato padrão",
    description: "100 perguntas oficiais USCIS — usado na maioria dos estados.",
    questions: 100,
  },
  {
    id: "2025" as const,
    label: "Formato 2025",
    description: "128 perguntas revisadas — exigido em alguns estados desde 2025.",
    questions: 128,
  },
];

const STEPS = ["Seu nome", "Seu estado", "Formato da prova"] as const;

const stepIcons = [User, MapPin, FileText];
const stepColors = [
  { bg: "rgba(59,130,246,0.12)", icon: "#60A5FA" },
  { bg: "rgba(6,182,212,0.12)",  icon: "#22D3EE" },
  { bg: "rgba(16,185,129,0.12)", icon: "#34D399" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const examFormat = watch("examFormat");

  async function advanceStep() {
    const fields: (keyof FormData)[] = ([
      ["preferredName"],
      ["state"],
      ["examFormat"],
    ] as (keyof FormData)[][])[step];
    const valid = await trigger(fields);
    if (!valid) return;
    setStep((s) => s + 1);
  }

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    setServerError(null);
    const result = await completeOnboarding(data);
    if (result?.error) {
      setServerError(result.error);
      setIsSubmitting(false);
    }
  }

  const isLastStep = step === STEPS.length - 1;
  const StepIcon = stepIcons[step];
  const stepColor = stepColors[step];

  return (
    <div
      className="rounded-xl p-8 space-y-8"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Header */}
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold text-white leading-tight tracking-tight">
          Vamos personalizar sua experiência
        </h1>
        <p className="text-sm text-white/50 leading-relaxed">
          Só precisamos de algumas informações para começar.
        </p>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className="flex items-center gap-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={
                  i < step
                    ? { background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.4)" }
                    : i === step
                    ? { background: "rgba(59,130,246,0.2)", border: "1px solid rgba(59,130,246,0.5)" }
                    : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }
                }
              >
                {i < step
                  ? <CheckCircle2 size={13} className="text-emerald-400" />
                  : <span className={i === step ? "text-blue-400" : "text-white/30"}>{i + 1}</span>
                }
              </div>
              <span className={cn(
                "text-xs font-medium hidden sm:block",
                i === step ? "text-white/80" : "text-white/25"
              )}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="flex-1 h-px mx-1 transition-all"
                style={{ background: i < step ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.07)" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        {serverError && (
          <div
            className="mb-4 px-4 py-3 rounded-lg text-sm text-red-400"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            {serverError}
          </div>
        )}

        {/* Step 0 — nome */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: stepColor.bg }}
              >
                <StepIcon size={24} style={{ color: stepColor.icon }} />
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
          </div>
        )}

        {/* Step 1 — estado */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: stepColor.bg }}
              >
                <StepIcon size={24} style={{ color: stepColor.icon }} />
              </div>
            </div>
            <FormField label="Em qual estado você vai fazer a entrevista?" error={errors.state?.message}>
              {(id) => (
                <select
                  id={id}
                  {...register("state")}
                  className="w-full h-11 px-4 rounded-lg text-sm text-white outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: errors.state
                      ? "1px solid rgba(239,68,68,0.5)"
                      : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <option value="" style={{ background: "#111827" }}>Selecione um estado...</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s} style={{ background: "#111827" }}>{s}</option>
                  ))}
                </select>
              )}
            </FormField>
          </div>
        )}

        {/* Step 2 — formato */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: stepColor.bg }}
              >
                <StepIcon size={24} style={{ color: stepColor.icon }} />
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] font-medium uppercase tracking-widest text-white/40">
                Qual formato da prova você vai usar?
              </p>
              {errors.examFormat && (
                <p className="text-xs text-red-400 flex items-center gap-1.5">
                  <span className="inline-block w-1 h-1 rounded-full bg-red-400 shrink-0" />
                  {errors.examFormat.message}
                </p>
              )}
            </div>
            <div className="space-y-3">
              {EXAM_FORMATS.map((fmt) => {
                const active = examFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setValue("examFormat", fmt.id, { shouldValidate: true })}
                    className="w-full rounded-xl p-4 text-left transition-all"
                    style={{
                      background: active ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.03)",
                      border: active ? "2px solid rgba(59,130,246,0.4)" : "2px solid rgba(255,255,255,0.07)",
                      boxShadow: active ? "0 0 20px rgba(59,130,246,0.1)" : "none",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{fmt.label}</p>
                        <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{fmt.description}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-xs font-bold text-blue-400 font-mono">{fmt.questions}</span>
                        <span className="text-xs text-white/35">q</span>
                        {active && (
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center ml-1"
                            style={{ background: "rgba(59,130,246,0.3)", border: "2px solid #3B82F6" }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8">
          {isLastStep ? (
            <SubmitButton loading={isSubmitting}>Começar a praticar</SubmitButton>
          ) : (
            <button
              type="button"
              onClick={advanceStep}
              className="w-full h-11 rounded-lg font-semibold text-sm text-white transition-all flex items-center justify-center gap-2 group"
              style={{
                background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                boxShadow: "0 1px 20px rgba(59,130,246,0.3)",
              }}
            >
              Continuar
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
