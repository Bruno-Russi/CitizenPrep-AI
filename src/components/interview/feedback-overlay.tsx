"use client";

import { CheckCircle2, XCircle } from "lucide-react";

type FeedbackOverlayProps = {
  visible: boolean;
  correct: boolean;
  correctAnswer: string;
  onNext: () => void;
};

export function FeedbackOverlay({ visible, correct, correctAnswer, onNext }: FeedbackOverlayProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-6 backdrop-blur-sm animate-in fade-in duration-200"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
        style={
          correct
            ? { background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }
            : { background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)" }
        }
      >
        <div className="flex items-center gap-3">
          {correct
            ? <CheckCircle2 size={28} className="text-emerald-400 shrink-0" />
            : <XCircle size={28} className="text-red-400 shrink-0" />
          }
          <div>
            <p className="text-white font-bold text-lg">
              {correct ? "Correto!" : "Incorreto"}
            </p>
            {!correct && (
              <p className="text-white/60 text-sm mt-0.5">
                Resposta correta:{" "}
                <span className="font-medium text-white">{correctAnswer}</span>
              </p>
            )}
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          Próxima pergunta →
        </button>
      </div>
    </div>
  );
}
