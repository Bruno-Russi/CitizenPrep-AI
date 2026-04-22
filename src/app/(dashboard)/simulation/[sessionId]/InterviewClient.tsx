"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Volume2, RotateCcw, X, CheckCircle, XCircle } from "lucide-react";
import { OfficerAvatar } from "@/components/interview/officer-avatar";
import { AudioWaveform } from "@/components/interview/audio-waveform";
import { RecordButton } from "@/components/interview/record-button";
import { QuestionCard } from "@/components/interview/question-card";
import { TranscriptBubble } from "@/components/interview/transcript-bubble";
import { SessionProgress } from "@/components/interview/session-progress";
import { useInterviewSession } from "@/features/interview/hooks/useInterviewSession";
import type { CivicsQuestionRow } from "@/types/supabase";

type Props = {
  sessionId: string;
  questions: CivicsQuestionRow[];
  voice?: "onyx" | "nova";
};

export function InterviewClient({ sessionId, questions, voice = "onyx" }: Props) {
  const router = useRouter();
  const {
    currentQuestion,
    questionIndex,
    totalQuestions,
    questionState,
    answers,
    score,
    recorderState,
    startQuestion,
    submitAnswer,
    next,
    abort,
  } = useInterviewSession(sessionId, questions, voice);

  // Auto-start the first question on mount
  useEffect(() => {
    if (questionState.phase === "idle") {
      startQuestion();
    }
  // Only run once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When session is complete, redirect to result page
  useEffect(() => {
    if (questionState.phase === "complete") {
      router.push(
        `/simulation/${sessionId}/result?score=${score}&total=${totalQuestions}`
      );
    }
  }, [questionState.phase, router, sessionId, score, totalQuestions]);

  const isSpeaking = questionState.phase === "playing_question";
  const isRecording = questionState.phase === "recording";
  const isProcessing = questionState.phase === "processing";
  const isResult = questionState.phase === "result";

  const answeredCount = answers.length;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0F1E" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-4 py-3 sticky top-0 z-10"
        style={{ background: "#111827", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <button
          onClick={() => { abort(); router.push("/simulation"); }}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.04)" }}
          aria-label="Sair da simulação"
        >
          <X size={18} className="text-white/50" />
        </button>

        <SessionProgress
          current={answeredCount}
          total={totalQuestions}
          correctCount={score}
        />

        <button
          onClick={() => isResult ? next() : startQuestion()}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.04)" }}
          aria-label="Repetir pergunta"
          disabled={isSpeaking || isProcessing || recorderState === "recording"}
        >
          <Volume2
            size={18}
            className={isRecording || isResult ? "text-blue-400" : "text-white/20"}
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
              {/* Feedback card */}
              <div
                className="rounded-xl p-4 space-y-2"
                style={{
                  background: questionState.evaluation.correct
                    ? "rgba(16,185,129,0.1)"
                    : "rgba(239,68,68,0.08)",
                  border: `1px solid ${questionState.evaluation.correct ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.2)"}`,
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
                className="w-full h-12 rounded-xl font-semibold text-sm text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                  boxShadow: "0 1px 20px rgba(59,130,246,0.3)",
                }}
              >
                {questionIndex + 1 >= totalQuestions ? "Ver resultado" : "Próxima pergunta →"}
              </button>
            </>
          )}

          {isRecording && (
            <div className="flex justify-end pr-1">
              <div
                className="rounded-2xl rounded-br-sm px-4 py-3"
                style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.2)" }}
              >
                <AudioWaveform isActive variant="user" />
              </div>
            </div>
          )}

          {!isResult && (
            <div className="flex flex-col items-center gap-2">
              {(isRecording || isProcessing) && (
                <RecordButton
                  state={isProcessing ? "processing" : "recording"}
                  onClick={isRecording ? submitAnswer : () => {}}
                />
              )}
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
            </div>
          )}
        </div>

        {isRecording && (
          <button
            onClick={submitAnswer}
            className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            <RotateCcw size={12} />
            Enviar resposta
          </button>
        )}
      </div>
    </div>
  );
}
