import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CitizenPrep AI — Acesse sua conta",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* ── Painel esquerdo: Deep Space ── */}
      <div className="hidden lg:flex lg:w-[52%] flex-col relative overflow-hidden"
        style={{ background: "#0A0F1E" }}>

        {/* Dot grid decorativo (CSS puro) */}
        <div
          className="absolute inset-0 pointer-events-none dot-grid opacity-100"
          aria-hidden="true"
        />

        {/* Gradiente radial azul/ciano no canto superior */}
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 10%, rgba(59,130,246,0.18) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Gradiente radial sutil no canto inferior */}
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 90%, rgba(6,182,212,0.1) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-14 py-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}
            >
              <span className="font-bold text-white text-sm tracking-tight">CP</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-lg leading-none tracking-tight">
                CitizenPrep
              </span>
              <span className="text-cyan-400 text-[11px] font-medium tracking-wide mt-0.5">
                AI
              </span>
            </div>
          </Link>

          {/* Central hero */}
          <div className="flex-1 flex flex-col justify-center space-y-10 mt-16">
            <div className="space-y-5 animate-fade-up">
              <h2 className="text-5xl font-bold text-white leading-[1.1] tracking-tight">
                Prepare-se para
                <br />
                <span className="gradient-text">sua entrevista</span>
                <br />
                de cidadania.
              </h2>
              <p className="text-white/60 text-base leading-relaxed max-w-[340px]">
                Simule a entrevista de naturalização com um oficial virtual,
                receba avaliação instantânea e domine as 100 perguntas do USCIS.
              </p>
            </div>

            {/* Stats em cards modernos */}
            <div className="grid grid-cols-3 gap-3 animate-fade-up animation-delay-200">
              {[
                { value: "100", label: "Questões oficiais", sub: "USCIS 2025" },
                { value: "98%", label: "Taxa de aprovação", sub: "1ª tentativa" },
                { value: "15min", label: "Duração média", sub: "por sessão" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-4 flex flex-col gap-1"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span
                    className="text-2xl font-bold tracking-tight"
                    style={{
                      background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {item.value}
                  </span>
                  <span className="text-white/80 text-xs font-medium leading-tight">{item.label}</span>
                  <span className="text-white/35 text-[10px]">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer testimonial */}
          <div
            className="pt-8 mt-8 animate-fade-up animation-delay-400"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex gap-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}
              >
                MR
              </div>
              <div>
                <p className="text-white/70 text-sm italic leading-relaxed">
                  &ldquo;Passei na entrevista na primeira tentativa. A simulação é idêntica
                  à experiência real.&rdquo;
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-white/50 text-xs font-medium">Maria Rodriguez</span>
                  <span className="text-white/20">·</span>
                  <span className="text-cyan-400/70 text-xs">Cidadã · 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Painel direito: Formulário ── */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative"
        style={{ background: "#111827" }}
      >
        {/* Gradiente sutil no fundo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        {/* Logo mobile */}
        <div className="lg:hidden mb-10 relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}
            >
              <span className="font-bold text-white text-xs">CP</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-base leading-none">CitizenPrep</span>
              <span className="text-cyan-400 text-[10px] font-medium tracking-wide">AI</span>
            </div>
          </Link>
        </div>

        <div className="w-full max-w-[420px] relative z-10">{children}</div>

        {/* Bottom note */}
        <div className="mt-10 relative z-10 flex items-center gap-3 opacity-40">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-white/50 text-[10px] tracking-widest uppercase font-mono">
            U.S. Citizenship & Immigration Services
          </span>
          <div className="h-px w-8 bg-white/20" />
        </div>
      </div>
    </div>
  );
}
