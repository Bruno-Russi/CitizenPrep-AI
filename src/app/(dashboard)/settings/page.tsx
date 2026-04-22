import { User, Bell, Volume2, Globe, Shield, ChevronRight, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
      { icon: Volume2, label: "Voz do oficial", description: "Agente James — Neutro americano", badge: "James" },
      { icon: Globe, label: "Idioma das perguntas", description: "As perguntas são exibidas em inglês" },
      { icon: Bell, label: "Notificações", description: "Lembretes diários de prática" },
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
      <div>
        <h1 className="text-2xl font-bold text-[--color-navy]">Configurações</h1>
        <p className="text-[--color-gray-secondary] text-sm mt-1">
          Personalize sua experiência no CitizenPrep AI.
        </p>
      </div>

      {/* Perfil resumido */}
      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[--color-navy] flex items-center justify-center text-white font-bold text-xl">
              JD
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[--color-navy]">John Doe</p>
              <p className="text-sm text-[--color-gray-secondary]">john@email.com</p>
            </div>
            <Badge variant="secondary" className="bg-[--color-sky]/10 text-[--color-sky] border-0">
              Nível 3
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Seções */}
      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-[--color-gray-secondary]">
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {section.items.map((item, i) => (
              <div key={item.label}>
                {i > 0 && <Separator className="my-0" />}
                <button className="w-full flex items-center gap-4 py-3.5 text-left hover:bg-[--color-ice] rounded-lg px-2 -mx-2 transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-[--color-ice] flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-[--color-navy]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[--color-navy]">{item.label}</p>
                    <p className="text-xs text-[--color-gray-secondary] truncate">{item.description}</p>
                  </div>
                  {"badge" in item && item.badge && (
                    <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                  )}
                  <ChevronRight size={14} className="text-[--color-gray-secondary] group-hover:text-[--color-sky] transition-colors shrink-0" />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Sair */}
      <Card>
        <CardContent className="pt-2 pb-2">
          <button className="w-full flex items-center gap-4 py-3.5 text-left hover:bg-red-50 rounded-lg px-2 -mx-2 transition-colors group">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
              <LogOut size={16} className="text-red-400" />
            </div>
            <p className="text-sm font-medium text-red-500">Sair da conta</p>
          </button>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-[--color-gray-secondary]">
        CitizenPrep AI — v0.1.0
      </p>
    </div>
  );
}
