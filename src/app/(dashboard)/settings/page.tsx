import { User, Bell, Volume2, Globe, Shield, ChevronRight, LogOut } from "lucide-react";

const sections = [
  {
    title: "Perfil",
    items: [
      { icon: User, label: "Informações pessoais", description: "Nome, e-mail e foto" },
    ],
  },
  {
    title: "Preferências",
    items: [
      { icon: Volume2, label: "Voz do oficial",         description: "Agente James — Neutro americano", badge: "James" },
      { icon: Globe,   label: "Idioma das perguntas",   description: "As perguntas são exibidas em inglês" },
      { icon: Bell,    label: "Notificações",           description: "Lembretes diários de prática" },
    ],
  },
  {
    title: "Conta",
    items: [
      { icon: Shield, label: "Segurança", description: "Senha e autenticação" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-[28px] font-bold text-white leading-tight tracking-tight">Configurações</h1>
        <p className="text-white/45 text-sm mt-1">Personalize sua experiência no CitizenPrep AI.</p>
      </div>

      {/* Perfil resumido */}
      <div
        className="rounded-xl p-5 animate-fade-up animation-delay-100"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
            style={{ background: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}
          >
            JD
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white">John Doe</p>
            <p className="text-sm text-white/40">john@email.com</p>
          </div>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(59,130,246,0.12)", color: "#93C5FD", border: "1px solid rgba(59,130,246,0.2)" }}
          >
            Nível 3
          </span>
        </div>
      </div>

      {/* Seções */}
      {sections.map((section, si) => (
        <div
          key={section.title}
          className="rounded-xl overflow-hidden animate-fade-up"
          style={{
            background: "#111827",
            border: "1px solid rgba(255,255,255,0.07)",
            animationDelay: `${(si + 2) * 0.1}s`,
            opacity: 0,
          }}
        >
          <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/25">{section.title}</p>
          </div>
          {section.items.map((item, i) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03] group"
              style={{ borderBottom: i < section.items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <item.icon size={15} className="text-white/50" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-white/35 truncate mt-0.5">{item.description}</p>
              </div>
              {"badge" in item && item.badge && (
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: "rgba(59,130,246,0.1)", color: "#93C5FD", border: "1px solid rgba(59,130,246,0.2)" }}
                >
                  {item.badge}
                </span>
              )}
              <ChevronRight size={14} className="text-white/15 group-hover:text-blue-400 transition-colors shrink-0" />
            </button>
          ))}
        </div>
      ))}

      {/* Sair */}
      <div
        className="rounded-xl overflow-hidden animate-fade-up animation-delay-500"
        style={{ background: "#111827", border: "1px solid rgba(239,68,68,0.15)" }}
      >
        <button className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-red-500/5 group">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(239,68,68,0.1)" }}
          >
            <LogOut size={15} className="text-red-400" />
          </div>
          <p className="text-sm font-medium text-red-400">Sair da conta</p>
        </button>
      </div>

      <p className="text-center text-xs text-white/20 pb-2">CitizenPrep AI — v0.1.0</p>
    </div>
  );
}
