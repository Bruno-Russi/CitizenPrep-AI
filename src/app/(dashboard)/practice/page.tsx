import Link from "next/link";
import { ChevronRight, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const topics = [
  {
    id: "government",
    label: "Governo Federal",
    description: "Poderes executivo, legislativo e judiciário",
    questions: 23,
    progress: 80,
    color: "bg-[--color-sky]",
    lightColor: "bg-[--color-sky]/10",
    textColor: "text-[--color-sky]",
  },
  {
    id: "history",
    label: "História Americana",
    description: "Da independência até os dias atuais",
    questions: 27,
    progress: 55,
    color: "bg-[--color-sage]",
    lightColor: "bg-[--color-sage]/10",
    textColor: "text-[--color-sage]",
  },
  {
    id: "rights",
    label: "Direitos e Deveres",
    description: "Direitos dos cidadãos e responsabilidades",
    questions: 14,
    progress: 90,
    color: "bg-[--color-amber]",
    lightColor: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    id: "judiciary",
    label: "Sistema Judiciário",
    description: "Cortes federais, Suprema Corte e leis",
    questions: 18,
    progress: 40,
    color: "bg-[--color-navy]",
    lightColor: "bg-[--color-navy]/10",
    textColor: "text-[--color-navy]",
  },
  {
    id: "geography",
    label: "Geografia e Símbolos",
    description: "Estados, capitais, bandeira e hino",
    questions: 12,
    progress: 65,
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-600",
  },
  {
    id: "economy",
    label: "Economia e Sociedade",
    description: "Sistema econômico, população e cultura",
    questions: 6,
    progress: 20,
    color: "bg-rose-500",
    lightColor: "bg-rose-50",
    textColor: "text-rose-600",
  },
];

export default function PracticePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[--color-navy]">Praticar</h1>
        <p className="text-[--color-gray-secondary] text-sm mt-1">
          Escolha um tópico para praticar as perguntas da entrevista USCIS.
        </p>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total de perguntas", value: "100" },
          { label: "Dominadas", value: "38" },
          { label: "Para revisar", value: "62" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border p-4 text-center">
            <p className="text-xl font-bold text-[--color-navy]">{s.value}</p>
            <p className="text-xs text-[--color-gray-secondary] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Grid de tópicos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <Link key={topic.id} href={`/practice/${topic.id}`}>
            <Card className="hover:shadow-md transition-all cursor-pointer group hover:border-[--color-sky]/30 h-full">
              <CardContent className="pt-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl ${topic.lightColor} flex items-center justify-center`}>
                    <div className={`w-4 h-4 rounded-full ${topic.color}`} />
                  </div>
                  {topic.progress >= 80 && (
                    <CheckCircle size={16} className="text-[--color-sage]" />
                  )}
                </div>

                <div>
                  <p className="font-semibold text-[--color-navy]">{topic.label}</p>
                  <p className="text-xs text-[--color-gray-secondary] mt-0.5 leading-relaxed">{topic.description}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-xs text-[--color-gray-secondary]">{topic.questions} perguntas</span>
                    <span className={`text-xs font-medium ${topic.textColor}`}>{topic.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${topic.color} transition-all`}
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {topic.progress >= 80 ? "Dominado" : topic.progress >= 50 ? "Em progresso" : "Iniciante"}
                  </Badge>
                  <ChevronRight size={14} className="text-[--color-gray-secondary] group-hover:text-[--color-sky] transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
