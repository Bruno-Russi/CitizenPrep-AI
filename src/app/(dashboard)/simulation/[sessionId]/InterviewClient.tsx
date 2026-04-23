"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Volume2, X, CheckCircle, XCircle, RefreshCw, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { OfficerAvatar } from "@/components/interview/officer-avatar";
import { AudioWaveform } from "@/components/interview/audio-waveform";
import { RecordButton } from "@/components/interview/record-button";
import { QuestionCard } from "@/components/interview/question-card";
import { TranscriptBubble } from "@/components/interview/transcript-bubble";
import { SessionProgress } from "@/components/interview/session-progress";
import { useInterviewSession, type SessionMode } from "@/features/interview/hooks/useInterviewSession";
import type { CivicsQuestionRow } from "@/types/supabase";

type Props = {
  sessionId: string;
  questions: CivicsQuestionRow[];
  mode?: SessionMode;
};

export function InterviewClient({ sessionId, questions, mode = "simulation" }: Props) {
  const router = useRouter();
  const [hintOpen, setHintOpen] = useState(false);
  const {
    currentQuestion,
    questionIndex,
    totalQuestions,
    questionState,
    score,
    answers,
    recorderState,
    startQuestion,
    startRecording,
    stopRecording,
    next,
    abort,
  } = useInterviewSession(sessionId, questions, mode);

  // Auto-start audio when a new question becomes active, or when practice mode
  // repeats the same question (phase resets to idle without index changing)
  useEffect(() => {
    if (questionState.phase === "idle") {
      startQuestion();
      setHintOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex, questionState.phase]);

  // Redirect to result when session is complete
  useEffect(() => {
    if (questionState.phase === "complete") {
      router.push(`/simulation/${sessionId}/result?score=${score}&total=${totalQuestions}`);
    }
  }, [questionState.phase, router, sessionId, score, totalQuestions]);

  const isSpeaking = questionState.phase === "playing_question";
  const isRecording = questionState.phase === "recording";
  const isProcessing = questionState.phase === "processing";
  const isResult = questionState.phase === "result";
  const isAwaitingRecord = questionState.phase === "awaiting_record";
  const isPractice = mode === "practice";
  const isLastQuestion = questionIndex + 1 >= totalQuestions;

  const recordState = isProcessing ? "processing" : isRecording ? "recording" : "idle";
  const showRecordButton = !isResult && (isAwaitingRecord || isRecording || isProcessing);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0F1E" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-4 py-3 sticky top-0 z-10"
        style={{ background: "#111827", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <button
          onClick={() => { abort(); router.push("/simulation"); }}
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.04)" }}
          aria-label="Sair"
        >
          <X size={18} className="text-white/50" />
        </button>

        <SessionProgress
          current={answers.length}
          total={totalQuestions}
          correctCount={score}
        />

        <button
          onClick={startQuestion}
          disabled={isSpeaking || isProcessing || isRecording}
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.04)" }}
          aria-label="Repetir pergunta"
        >
          <Volume2
            size={18}
            className={(!isSpeaking && !isProcessing && !isRecording) ? "text-blue-400" : "text-white/20"}
          />
        </button>
      </header>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-between px-4 py-6 gap-6 max-w-md mx-auto w-full">

        {/* Officer + question */}
        <div className="flex flex-col items-center gap-4 w-full">
          <OfficerAvatar name="Agente James" isSpeaking={isSpeaking} />
          <AudioWaveform isActive={isSpeaking} variant="officer" />
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion.question}
              current={questionIndex + 1}
              total={totalQuestions}
            />
          )}
        </div>

        {/* Response area */}
        <div className="w-full space-y-4">
          {isResult && (
            <>
              <TranscriptBubble transcript={questionState.transcript} />

              <div
                className="rounded-xl p-4 space-y-2"
                style={{
                  background: questionState.evaluation.correct
                    ? "rgba(16,185,129,0.1)"
                    : "rgba(239,68,68,0.08)",
                  border: `1px solid ${questionState.evaluation.correct
                    ? "rgba(16,185,129,0.25)"
                    : "rgba(239,68,68,0.2)"}`,
                }}
              >
                <div className="flex items-center gap-2">
                  {questionState.evaluation.correct
                    ? <CheckCircle size={16} className="text-emerald-400" />
                    : <XCircle size={16} className="text-red-400" />
                  }
                  <p className="text-sm font-medium text-white">
                    {questionState.evaluation.correct ? "Correto!" : "Incorreto"}
                  </p>
                  {isPractice && !questionState.evaluation.correct && (
                    <span className="ml-auto text-[10px] text-amber-400/80 font-medium uppercase tracking-wide">
                      Tente novamente
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  {questionState.evaluation.feedback}
                </p>
                {questionState.evaluation.tip && (
                  <p className="text-xs text-blue-300/80 leading-relaxed">
                    💡 {questionState.evaluation.tip}
                  </p>
                )}
              </div>

              <button
                onClick={() => next()}
                className="w-full h-12 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                  boxShadow: "0 1px 20px rgba(59,130,246,0.3)",
                }}
              >
                {isPractice && !questionState.evaluation.correct
                  ? <><RefreshCw size={15} /> Repetir pergunta</>
                  : isLastQuestion
                  ? "Ver resultado"
                  : "Próxima pergunta →"
                }
              </button>
            </>
          )}

          {/* Dica de resposta — só no modo prática, quando aguardando gravação */}
          {isPractice && isAwaitingRecord && currentQuestion && (
            <div className="w-full rounded-xl overflow-hidden" style={{ border: "1px solid rgba(245,158,11,0.2)" }}>
              <button
                type="button"
                onClick={() => setHintOpen((o) => !o)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.02]"
                style={{ background: "rgba(245,158,11,0.07)" }}
              >
                <Lightbulb size={15} className="text-amber-400 shrink-0" />
                <span className="text-xs font-medium text-amber-300/80 flex-1">Ver dica de resposta</span>
                {hintOpen
                  ? <ChevronUp size={14} className="text-amber-400/50" />
                  : <ChevronDown size={14} className="text-amber-400/50" />
                }
              </button>
              {hintOpen && (
                <div className="px-4 pb-4 pt-1 space-y-1.5" style={{ background: "rgba(245,158,11,0.04)" }}>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-amber-400/40 mb-2">
                    Respostas aceitas
                  </p>
                  {currentQuestion.answers.map((ans, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-amber-400/50 text-xs mt-0.5 shrink-0">•</span>
                      <p className="text-sm text-white/70 leading-snug">{ans}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!isResult && (
            <div className="flex flex-col items-center gap-2">
              {(isSpeaking || questionState.phase === "idle") && (
                <div className="flex flex-col items-center gap-2 py-4">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Volume2 size={28} className="text-white/20" />
                  </div>
                  <p className="text-xs text-white/35">
                    {isSpeaking ? "Ouça a pergunta..." : "Preparando..."}
                  </p>
                </div>
              )}

              {isRecording && (
                <div className="flex justify-end pr-1 w-full">
                  <div
                    className="rounded-2xl rounded-br-sm px-4 py-3"
                    style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.2)" }}
                  >
                    <AudioWaveform isActive variant="user" />
                  </div>
                </div>
              )}

              {showRecordButton && (
                <RecordButton
                  state={recordState}
                  onPressStart={startRecording}
                  onPressEnd={stopRecording}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
