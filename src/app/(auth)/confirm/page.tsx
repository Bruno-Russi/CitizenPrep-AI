import Link from "next/link";
import { Mail } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";

export default function ConfirmPage() {
  return (
    <AuthCard title="Confirme seu e-mail">
      <div className="text-center space-y-6 py-2">
        <div className="flex justify-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}
          >
            <Mail size={32} className="text-blue-400" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-white">Verifique sua caixa de entrada</p>
          <p className="text-sm text-white/55 leading-relaxed">
            Enviamos um e-mail de confirmação. Clique no link para ativar sua conta e começar a praticar.
          </p>
        </div>

        <div
          className="rounded-xl p-4 text-left space-y-2"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-semibold text-white/70">Não recebeu o e-mail?</p>
          <ul className="text-xs text-white/40 space-y-1 list-disc list-inside">
            <li>Verifique a pasta de spam</li>
            <li>Aguarde alguns minutos</li>
            <li>Confirme que o e-mail está correto</li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            className="w-full h-11 rounded-lg font-medium text-sm text-white/70 transition-all"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Reenviar e-mail de confirmação
          </button>
          <Link
            href="/login"
            className="block text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
