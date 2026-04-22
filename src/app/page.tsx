import Link from "next/link";
import {
  Mic,
  BarChart2,
  Zap,
  Shield,
  ArrowRight,
  Check,
  ChevronRight,
  Trophy,
  Flame,
  Star,
  Globe,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Como funciona", href: "#how"      },
  { label: "Funcionalidades", href: "#features" },
  { label: "Preços",         href: "#pricing"  },
];

const TICKER_ITEMS = [
  { label: "aprovados na entrevista",    value: "94%"    },
  { label: "perguntas na base USCIS",    value: "128"    },
  { label: "tempo médio de preparo",     value: "12 dias" },
  { label: "simulações realizadas",      value: "48.200+" },
  { label: "taxa de aprovação no app",   value: "94%"    },
  { label: "idiomas disponíveis",        value: "2"      },
  { label: "usuários ativos",            value: "1.800+" },
  { label: "sessões hoje",               value: "312"    },
];

const STATS = [
  { value: "94%",    label: "taxa de aprovação",         icon: Trophy,  color: "#10B981" },
  { value: "128",    label: "perguntas USCIS cobertas",  icon: Globe,   color: "#3B82F6" },
  { value: "12 dias",label: "tempo médio de preparo",    icon: Flame,   color: "#F59E0B" },
  { value: "1.800+", label: "usuários preparando-se",    icon: Star,    color: "#8B5CF6" },
];

const FEATURES = [
  {
    icon: Mic,
    title: "Entrevista por voz real",
    desc: "Responda em inglês como faria na entrevista real. O oficial virtual faz as perguntas em voz, você responde — sem digitar nada.",
    tag: "Core",
  },
  {
    icon: Zap,
    title: "Feedback instantâneo",
    desc: "Cada resposta é avaliada em segundos. Você sabe na hora se acertou, o que errou e o que a resposta correta seria.",
    tag: "IA",
  },
  {
    icon: BarChart2,
    title: "Progresso detalhado",
    desc: "Acompanhe sua evolução por tópico — Governo, História, Constituição. Veja onde você domina e onde precisa praticar mais.",
    tag: "Analytics",
  },
  {
    icon: Shield,
    title: "100 + 128 perguntas USCIS",
    desc: "Cobre tanto o banco de 100 perguntas do formato padrão quanto as 128 perguntas do novo formato 2025.",
    tag: "Conteúdo",
  },
  {
    icon: Flame,
    title: "Streak e gamificação",
    desc: "Mantenha uma sequência diária, acumule XP e desbloqueie conquistas. Estudar para a cidadania nunca foi tão motivador.",
    tag: "Engajamento",
  },
  {
    icon: Trophy,
    title: "Modo simulação oficial",
    desc: "Recrie a pressão real da entrevista: tempo controlado, perguntas aleatórias e resultado de aprovado ou reprovado ao final.",
    tag: "Simulação",
  },
];

const FREE_FEATURES = [
  "Simulações de voz ilimitadas",
  "Feedback por IA em tempo real",
  "100 perguntas USCIS (formato padrão)",
  "128 perguntas do novo formato 2025",
  "Progresso por tópico",
  "Streak diário e conquistas",
  "Histórico completo de sessões",
  "App mobile (iOS e Android)",
];

// ── Components ────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 h-16"
      style={{
        background: "rgba(10,15,30,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 shrink-0">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}
        >
          <Mic size={14} className="text-white" />
        </div>
        <span className="font-bold text-white text-[15px] tracking-tight">CitizenPrep</span>
        <span className="font-bold text-[15px] tracking-tight gradient-text">AI</span>
      </Link>

      {/* Nav links — hidden on mobile */}
      <nav className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-sm text-white/45 hover:text-white/90 transition-colors"
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="hidden sm:block text-sm text-white/45 hover:text-white/80 transition-colors"
        >
          Entrar
        </Link>
        <Link
          href="/signup"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            boxShadow: "0 1px 16px rgba(59,130,246,0.35)",
          }}
        >
          Começar grátis
          <ChevronRight size={13} />
        </Link>
      </div>
    </header>
  );
}

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      className="overflow-hidden py-2.5"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      aria-hidden="true"
    >
      <div className="ticker-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-8 text-xs shrink-0"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            <span className="font-bold font-mono" style={{ color: "#3B82F6" }}>
              {item.value}
            </span>
            {item.label}
            <span style={{ color: "rgba(255,255,255,0.1)", marginLeft: 16 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center overflow-hidden"
      style={{ background: "#0A0F1E" }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60" />

      {/* Radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Badge */}
      <div className="relative animate-fade-up">
        <span
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest"
          style={{
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.25)",
            color: "#34D399",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#10B981", boxShadow: "0 0 6px #10B981" }}
          />
          100% gratuito durante o lançamento
        </span>
      </div>

      {/* Headline */}
      <h1
        className="relative mt-6 font-bold leading-tight tracking-tight animate-fade-up animation-delay-100"
        style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", maxWidth: 860 }}
      >
        <span className="text-white">Passe na entrevista</span>
        <br />
        <span className="gradient-text">de cidadania americana.</span>
      </h1>

      {/* Subtitle */}
      <p
        className="relative mt-6 text-white/50 leading-relaxed animate-fade-up animation-delay-200"
        style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", maxWidth: 520 }}
      >
        Simule a entrevista real do USCIS com um oficial virtual por voz,
        receba feedback instantâneo por IA e acompanhe seu progresso até
        estar pronto para o grande dia.
      </p>

      {/* CTAs */}
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 w-full max-w-sm sm:max-w-none animate-fade-up animation-delay-300">
        <Link
          href="/signup"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-[15px] transition-all hover:opacity-90 hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            boxShadow: "0 2px 24px rgba(59,130,246,0.4)",
          }}
        >
          Começar a praticar grátis
          <ArrowRight size={15} />
        </Link>
        <a
          href="#how"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white/60 text-[15px] transition-all hover:text-white"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          Ver como funciona
        </a>
      </div>

      <p className="relative mt-4 text-xs text-white/20 animate-fade-up animation-delay-400">
        Sem cartão de crédito · Funciona no celular · Em português e inglês
      </p>

      {/* Live stats terminal */}
      <div
        className="relative w-full max-w-4xl mt-16 rounded-xl overflow-hidden animate-fade-up animation-delay-500"
        style={{
          background: "#111827",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#EF4444" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#F59E0B" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#10B981" }} />
          <span className="ml-3 text-[10px] font-mono text-white/20">citizenprep — interview.simulator</span>
          <span
            className="ml-auto flex items-center gap-1.5 text-[10px] font-mono"
            style={{ color: "#10B981" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#10B981", boxShadow: "0 0 4px #10B981" }}
            />
            live
          </span>
        </div>
        <Ticker />
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="px-6 py-20" style={{ background: "#0A0F1E" }}>
      <div className="max-w-5xl mx-auto">
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-10 px-6 text-center"
              style={{ background: "#111827" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${s.color}18` }}
              >
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <p
                className="font-bold font-mono leading-none"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: s.color }}
              >
                {s.value}
              </p>
              <p className="text-white/35 text-xs mt-2 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Escolha o modo de prática",
      desc: "Pratique por tópico no seu ritmo ou entre no Modo Simulação para recriar a pressão real da entrevista USCIS com tempo e pontuação.",
    },
    {
      n: "02",
      title: "Responda em voz, em inglês",
      desc: "O oficial virtual faz a pergunta em voz. Você fala sua resposta normalmente — sem digitar. Exatamente como será no dia real.",
    },
    {
      n: "03",
      title: "Receba feedback e evolua",
      desc: "A IA avalia sua resposta na hora, mostra o que estava correto, explica o erro e registra seu progresso para as próximas sessões.",
    },
  ];

  return (
    <section id="how" className="px-6 py-24" style={{ background: "#0A0F1E" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/25 mb-4">
            Como funciona
          </p>
          <h2
            className="font-bold text-white"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Do primeiro estudo{" "}
            <span className="gradient-text">ao aprovado</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const delays = ["", "animation-delay-100", "animation-delay-200"] as const;
            return (
              <div
                key={i}
                className={`rounded-xl p-6 glow-card animate-fade-up ${delays[i]}`}
                style={{
                  background: "#111827",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p
                  className="text-5xl font-bold font-mono mb-4"
                  style={{ color: "rgba(59,130,246,0.15)" }}
                >
                  {step.n}
                </p>
                <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="px-6 py-24" style={{ background: "#070C1A" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/25 mb-4">
            Funcionalidades
          </p>
          <h2
            className="font-bold text-white"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Tudo que você precisa{" "}
            <span className="gradient-text">para passar</span>
          </h2>
          <p className="text-white/40 mt-4 text-base max-w-xl mx-auto leading-relaxed">
            Desenvolvido especificamente para a entrevista de naturalização americana — não é um app genérico de flashcards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => {
            const delays = ["", "animation-delay-100", "animation-delay-200", "animation-delay-300", "animation-delay-400", "animation-delay-500"] as const;
            return (
              <div
                key={i}
                className={`rounded-xl p-5 glow-card animate-fade-up ${delays[i]}`}
                style={{
                  background: "#111827",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(59,130,246,0.12)" }}
                  >
                    <f.icon size={16} className="text-blue-400" />
                  </div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{
                      color: "#93C5FD",
                      background: "rgba(59,130,246,0.08)",
                      border: "1px solid rgba(59,130,246,0.15)",
                    }}
                  >
                    {f.tag}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-[15px] mb-1.5">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24" style={{ background: "#0A0F1E" }}>
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/25 mb-4">
            Preços
          </p>
          <h2
            className="font-bold text-white"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Simples assim
          </h2>
          <p className="text-white/40 mt-3 text-base leading-relaxed">
            Um plano. Tudo incluso. Grátis enquanto estamos no lançamento.
          </p>
        </div>

        <div
          className="rounded-2xl p-8 animate-fade-up animation-delay-100 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(6,182,212,0.05) 100%)",
            border: "1px solid rgba(59,130,246,0.25)",
            boxShadow: "0 0 60px rgba(59,130,246,0.08)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
            style={{
              background: "radial-gradient(circle at top right, rgba(59,130,246,0.1) 0%, transparent 70%)",
            }}
          />

          <div className="flex items-center justify-between mb-6">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{
                color: "#34D399",
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              Somente por enquanto
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{
                color: "#93C5FD",
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              Grátis
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span
                className="font-bold text-white font-mono"
                style={{ fontSize: "clamp(3rem, 8vw, 4.5rem)", lineHeight: 1 }}
              >
                R$ 0
              </span>
              <span className="text-white/30 text-sm">/mês</span>
            </div>
            <p className="text-white/40 text-sm mt-2">
              Sem cartão de crédito. Planos pagos chegam após o lançamento.
            </p>
          </div>

          <div className="my-6" style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

          <ul className="space-y-3 mb-8">
            {FREE_FEATURES.map((feat, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(16,185,129,0.15)" }}
                >
                  <Check size={10} className="text-emerald-400" />
                </div>
                {feat}
              </li>
            ))}
          </ul>

          <Link
            href="/signup"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white text-[15px] transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #3B82F6, #2563EB)",
              boxShadow: "0 2px 20px rgba(59,130,246,0.35)",
            }}
          >
            Criar conta gratuita
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section
      className="px-6 py-28 text-center relative overflow-hidden"
      style={{ background: "#070C1A" }}
    >
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-2xl mx-auto animate-fade-up">
        <h2
          className="font-bold text-white mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
        >
          Sua entrevista está chegando.
          <br />
          <span className="gradient-text">Comece a praticar hoje.</span>
        </h2>
        <p className="text-white/40 text-lg mb-10 leading-relaxed">
          Mais de 1.800 candidatos à cidadania americana já usam o CitizenPrep AI
          para chegar no dia da entrevista com confiança.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none mx-auto">
          <Link
            href="/signup"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #3B82F6, #2563EB)",
              boxShadow: "0 2px 32px rgba(59,130,246,0.4)",
            }}
          >
            Começar a praticar grátis
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/login"
            className="text-sm text-white/35 hover:text-white/70 transition-colors"
          >
            Já tenho uma conta →
          </Link>
        </div>
        <p className="mt-6 text-xs text-white/20">
          Grátis durante o lançamento · Sem cartão de crédito · Funciona no celular
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="px-6 lg:px-12 py-10"
      style={{
        background: "#0A0F1E",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}
          >
            <Mic size={14} className="text-white" />
          </div>
          <span className="font-bold text-white text-[15px] tracking-tight">CitizenPrep</span>
          <span className="font-bold text-[15px] tracking-tight gradient-text">AI</span>
        </Link>

        <div className="flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs text-white/25 hover:text-white/55 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link href="/login" className="text-xs text-white/25 hover:text-white/55 transition-colors">
            Entrar
          </Link>
        </div>

        <p className="text-xs text-white/15">
          © 2026 CitizenPrep AI. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0F1E" }}>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <HowItWorks />
        <Features />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
