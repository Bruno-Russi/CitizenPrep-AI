import Link from "next/link";
import { Flame, Star, Mic, BookOpen, TrendingUp, ChevronRight, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const mockStats = {
  name: "John",
  streak: 7,
  xp: 340,
  xpToNext: 500,
  level: 3,
  totalSessions: 12,
  accuracy: 74,
  dominated: 38,
};

const quickTopics = [
  { label: "Governo Federal", progress: 80, color: "bg-[--color-sky]" },
  { label: "História Americana", progress: 55, color: "bg-[--color-sage]" },
  { label: "Direitos e Deveres", progress: 90, color: "bg-[--color-amber]" },
  { label: "Sistema Judiciário", progress: 40, color: "bg-[--color-navy]" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[--color-gray-secondary] text-sm">Bem-vindo de volta,</p>
          <h1 className="text-2xl font-bold text-[--color-navy]">{mockStats.name} 👋</h1>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1.5 bg-amber-50 text-amber-700 border-amber-200 px-3 py-1.5">
          <Flame size={14} className="text-amber-500" />
          {mockStats.streak} dias
        </Badge>
      </div>

      {/* XP Bar */}
      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[--color-sky]/10 flex items-center justify-center">
                <Star size={14} className="text-[--color-sky]" />
              </div>
              <div>
                <p className="text-xs text-[--color-gray-secondary]">Nível {mockStats.level}</p>
                <p className="text-sm font-semibold text-[--color-navy]">{mockStats.xp} XP</p>
              </div>
            </div>
            <p className="text-xs text-[--color-gray-secondary]">
              {mockStats.xpToNext - mockStats.xp} XP para o nível {mockStats.level + 1}
            </p>
          </div>
          <Progress value={(mockStats.xp / mockStats.xpToNext) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Simulações", value: mockStats.totalSessions, icon: Mic, color: "text-[--color-sky]", bg: "bg-[--color-sky]/10" },
          { label: "Taxa de acerto", value: `${mockStats.accuracy}%`, icon: TrendingUp, color: "text-[--color-sage]", bg: "bg-[--color-sage]/10" },
          { label: "Dominadas", value: mockStats.dominated, icon: Award, color: "text-[--color-amber]", bg: "bg-amber-50" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="pt-5">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon size={18} className={s.color} />
              </div>
              <p className="text-2xl font-bold text-[--color-navy]">{s.value}</p>
              <p className="text-xs text-[--color-gray-secondary] mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Atalhos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/simulation">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-[--color-navy]/10 hover:border-[--color-navy]/30 group">
            <CardContent className="pt-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[--color-navy] flex items-center justify-center shrink-0 group-hover:bg-[--color-sky] transition-colors">
                <Mic size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[--color-navy]">Iniciar simulação</p>
                <p className="text-xs text-[--color-gray-secondary]">Entrevista completa com oficial virtual</p>
              </div>
              <ChevronRight size={16} className="text-[--color-gray-secondary]" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/practice">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-[--color-sage]/20 hover:border-[--color-sage]/40 group">
            <CardContent className="pt-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[--color-sage] flex items-center justify-center shrink-0 group-hover:opacity-90 transition-opacity">
                <BookOpen size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[--color-navy]">Praticar por tópico</p>
                <p className="text-xs text-[--color-gray-secondary]">Foque nas suas dificuldades</p>
              </div>
              <ChevronRight size={16} className="text-[--color-gray-secondary]" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Progresso por tópico */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-[--color-navy]">Progresso por tópico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickTopics.map((t) => (
            <div key={t.label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm text-[--color-navy]">{t.label}</span>
                <span className="text-sm font-medium text-[--color-gray-secondary]">{t.progress}%</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${t.color} transition-all`}
                  style={{ width: `${t.progress}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
