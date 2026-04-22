import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CitizenPrep AI — Acesse sua conta",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Painel visual esquerdo */}
      <div className="hidden lg:flex lg:w-1/2 bg-[--color-navy] flex-col justify-between p-12 relative overflow-hidden">
        {/* Gradiente decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-[--color-navy] via-[--color-navy] to-[--color-sky]/30 pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[--color-sky]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-[--color-sage]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[--color-sky] flex items-center justify-center text-white font-bold text-lg shadow-lg">
              CP
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              CitizenPrep <span className="text-[--color-sky]">AI</span>
            </span>
          </Link>
        </div>

        {/* Conteúdo central */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[--color-sage] animate-pulse" />
              Powered by AI
            </div>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Sua cidadania americana{" "}
              <span className="text-[--color-sky]">começa aqui.</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-sm">
              Simule a entrevista de naturalização com um oficial virtual, receba feedback instantâneo e acompanhe seu progresso.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "100", label: "Perguntas USCIS" },
              { value: "98%", label: "Taxa de aprovação" },
              { value: "15min", label: "Por sessão" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-white/60 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testemunho */}
        <div className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <p className="text-white/80 text-sm leading-relaxed italic">
            "Passei na entrevista na primeira tentativa! A simulação com o oficial virtual me deixou muito mais confiante."
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-[--color-sky] flex items-center justify-center text-white text-xs font-bold">
              MR
            </div>
            <div>
              <p className="text-white text-sm font-medium">Maria Rodriguez</p>
              <p className="text-white/50 text-xs">Cidadã desde 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Painel do formulário */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-[--color-ice]">
        {/* Logo mobile */}
        <div className="lg:hidden mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[--color-navy] flex items-center justify-center text-white font-bold text-sm">
              CP
            </div>
            <span className="text-[--color-navy] font-bold text-lg">
              CitizenPrep <span className="text-[--color-sky]">AI</span>
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
