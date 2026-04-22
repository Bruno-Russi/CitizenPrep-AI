import Link from "next/link";
import { Mail } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";

export default function ConfirmPage() {
  return (
    <AuthCard title="Confirme seu e-mail">
      <div className="text-center space-y-6 py-2">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[--color-sky]/10 flex items-center justify-center">
            <Mail size={36} className="text-[--color-sky]" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[--color-navy] font-medium">Verifique sua caixa de entrada</p>
          <p className="text-[--color-gray-secondary] text-sm leading-relaxed">
            Enviamos um e-mail de confirmação. Clique no link para ativar sua conta e começar a praticar.
          </p>
        </div>

        <div className="bg-[--color-ice] rounded-xl p-4 text-left space-y-2 border border-border">
          <p className="text-xs font-medium text-[--color-navy]">Não recebeu o e-mail?</p>
          <ul className="text-xs text-[--color-gray-secondary] space-y-1 list-disc list-inside">
            <li>Verifique a pasta de spam</li>
            <li>Aguarde alguns minutos</li>
            <li>Confirme que o e-mail está correto</li>
          </ul>
        </div>

        <div className="space-y-3">
          {/* M6 — botão de reenvio conectará ao Supabase Auth */}
          <button className="w-full h-11 rounded-lg border border-border text-[--color-navy] font-medium text-sm hover:bg-[--color-ice] transition-colors">
            Reenviar e-mail de confirmação
          </button>
          <Link
            href="/login"
            className="block text-sm text-[--color-sky] hover:underline"
          >
            Voltar para o login
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
