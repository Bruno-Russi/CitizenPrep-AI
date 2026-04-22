import Link from "next/link";
import { Mic, BookOpen, Clock, Target, ChevronRight, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const modes = [
  {
    id: "simulation",
    label: "Simulação oficial",
    description: "10 perguntas aleatórias, exatamente como na entrevista real. Você precisa acertar 6 para passar.",
    icon: Target,
    duration: "~15 min",
    questions: 10,
    color: "bg-[--color-navy]",
    badge: "Recomendado",
    badgeColor: "bg-[--color-sky]/10 text-[--color-sky]",
  },
  {
    id: "practice",
    label: "Modo prática",
    description: "Responda sem pressão. Veja o feedback imediato e repita as que errou até dominar.",
    icon: BookOpen,
    duration: "~20 min",
    questions: 20,
    color: "bg-[--color-sage]",
    badge: "Aprendizado",
    badgeColor: "bg-[--color-sage]/10 text-[--color-sage]",
  },
];

const officers = [
  { id: "james", name: "Agente James", accent: "Neutro americano", gender: "M" },
  { id: "sarah", name: "Agente Sarah", accent: "Sul americano", gender: "F" },
  { id: "carlos", name: "Agente Carlos", accent: "Sotaque hispânico", gender: "M" },
];

export default function SimulationPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[--color-navy]">Simular entrevista</h1>
        <p className="text-[--color-gray-secondary] text-sm mt-1">
          Escolha o modo e o oficial para começar sua simulação por voz.
        </p>
      </div>

      {/* Modos */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[--color-gray-secondary] uppercase tracking-wide">Modo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modes.map((mode) => (
            <Card
              key={mode.id}
              className="cursor-pointer hover:shadow-md transition-all hover:border-[--color-sky]/30 group relative overflow-hidden"
            >
              <CardContent className="pt-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-2xl ${mode.color} flex items-center justify-center`}>
                    <mode.icon size={20} className="text-white" />
                  </div>
                  <Badge className={`text-xs border-0 ${mode.badgeColor}`}>{mode.badge}</Badge>
                </div>

                <div>
                  <p className="font-semibold text-[--color-navy]">{mode.label}</p>
                  <p className="text-xs text-[--color-gray-secondary] mt-1 leading-relaxed">{mode.description}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-[--color-gray-secondary]">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {mode.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target size={12} />
                    {mode.questions} perguntas
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Voz do oficial */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-[--color-gray-secondary] uppercase tracking-wide">Oficial</h2>
        <div className="space-y-2">
          {officers.map((officer, i) => (
            <Card
              key={officer.id}
              className={`cursor-pointer transition-all hover:shadow-sm ${i === 0 ? "border-[--color-sky] ring-1 ring-[--color-sky]/20" : "hover:border-[--color-sky]/30"}`}
            >
              <CardContent className="py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[--color-navy]/10 flex items-center justify-center shrink-0">
                  <User size={18} className="text-[--color-navy]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[--color-navy]">{officer.name}</p>
                  <p className="text-xs text-[--color-gray-secondary]">{officer.accent}</p>
                </div>
                {i === 0 && (
                  <div className="w-4 h-4 rounded-full bg-[--color-sky] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link href="/simulation/session-mock">
        <div className="flex items-center justify-center gap-3 w-full h-14 rounded-2xl bg-[--color-navy] text-white font-semibold hover:bg-[--color-sky] transition-colors group">
          <Mic size={20} />
          Iniciar simulação
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  );
}
