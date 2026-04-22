"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Volume2, RotateCcw, X } from "lucide-react";
import { OfficerAvatar } from "@/components/interview/officer-avatar";
import { AudioWaveform } from "@/components/interview/audio-waveform";
import { RecordButton, type RecordState } from "@/components/interview/record-button";
import { QuestionCard } from "@/components/interview/question-card";
import { TranscriptBubble } from "@/components/interview/transcript-bubble";
import { FeedbackOverlay } from "@/components/interview/feedback-overlay";
import { SessionProgress } from "@/components/interview/session-progress";
import { CIVICS_QUESTIONS, MOCK_ANSWERS } from "@/features/interview/mock-data";

type SessionStep = "speaking" | "listening" | "processing" | "feedback";

export default function InterviewSessionPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<SessionStep>("speaking");
  const [recordState, setRecordState] = useState<RecordState>("idle");
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const currentQuestion = CIVICS_QUESTIONS[currentIndex];
  const currentMockAnswer = MOCK_ANSWERS[currentIndex];
  const isLastQuestion = currentIndex === CIVICS_QUESTIONS.length - 1;

  useEffect(() => {
    if (step !== "speaking") return;
    const timer = setTimeout(() => setStep("listening"), 2500);
    return () => clearTimeout(timer);
  }, [step, currentIndex]);

  const handleRecordClick = useCallback(() => {
    if (recordState === "idle") {
      setRecordState("recording");
      setTimeout(() => {
        setRecordState("processing");
        setStep("processing");
        setTimeout(() => {
          const isCorrect = currentMockAnswer.correct;
          if (isCorrect) setCorrectCount((c) => c + 1);
          setAnsweredCount((c) => c + 1);
          setRecordState("idle");
          setStep("feedback");
          setShowFeedback(true);
        }, 1200);
      }, 2000);
    }
  }, [recordState, currentMockAnswer]);

  const handleNext = useCallback(() => {
    setShowFeedback(false);
    if (isLastQuestion) {
      router.push(`/simulation/session-mock/result?score=${correctCount}&total=${CIVICS_QUESTIONS.length}`);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setStep("speaking");
  }, [isLastQuestion, correctCount, router]);

  const handleRepeat = () => setStep("speaking");
  const handleExit = () => router.push("/simulation");

  const isSpeaking = step === "speaking";
  const isRecording = recordState === "recording";
  const isProcessing = recordState === "processing";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A0F1E" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-4 py-3 sticky top-0 z-10"
        style={{ background: "#111827", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <button
          onClick={handleExit}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.04)" }}
          aria-label="Sair da simulação"
        >
          <X size={18} className="text-white/50" />
        </button>

        <SessionProgress
          current={answeredCount}
          total={CIVICS_QUESTIONS.length}
          correctCount={correctCount}
        />

        <button
          onClick={handleRepeat}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.04)" }}
          aria-label="Repetir pergunta"
          disabled={step !== "listening"}
        >
          <Volume2
            size={18}
            className={step === "listening" ? "text-blue-400" : "text-white/20"}
          />
        </button>
      </header>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-between px-4 py-6 gap-6 max-w-md mx-auto w-full">
        {/* Official */}
        <div className="flex flex-col items-center gap-4 w-full">
          <OfficerAvatar name="Agente James" isSpeaking={isSpeaking} />
          <AudioWaveform isActive={isSpeaking} variant="officer" />
          <QuestionCard
            question={currentQuestion.question}
            current={currentIndex + 1}
            total={CIVICS_QUESTIONS.length}
          />
        </div>

        {/* User response area */}
        <div className="w-full space-y-4">
          {(step === "feedback" || isProcessing) && currentMockAnswer && (
            <TranscriptBubble transcript={currentMockAnswer.transcript} />
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

          <div className="flex flex-col items-center gap-2">
            {step === "listening" && (
              <RecordButton state={recordState} onClick={handleRecordClick} />
            )}
            {step === "processing" && (
              <RecordButton state="processing" onClick={() => {}} />
            )}
            {step === "speaking" && (
              <div className="flex flex-col items-center gap-2 py-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Volume2 size={28} className="text-white/20" />
                </div>
                <p className="text-xs text-white/35">Ouça a pergunta...</p>
              </div>
            )}
          </div>
        </div>

        {step === "listening" && (
          <button
            onClick={handleRepeat}
            className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            <RotateCcw size={12} />
            Repetir pergunta
          </button>
        )}
      </div>

      {/* Feedback overlay */}
      <FeedbackOverlay
        visible={showFeedback}
        correct={currentMockAnswer.correct}
        correctAnswer={currentQuestion.correctAnswers[0]}
        onNext={handleNext}
      />
    </div>
  );
}
