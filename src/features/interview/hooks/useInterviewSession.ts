"use client";

import { useState, useCallback, useRef } from "react";
import { useTTS } from "@/features/speech/hooks/useTTS";
import { useAudioRecorder } from "@/features/speech/hooks/useAudioRecorder";
import { evaluateAnswer, type EvaluationResult } from "@/features/evaluation/actions";
import { saveAnswer, finalizeSession } from "@/features/interview/actions";
import type { CivicsQuestionRow } from "@/types/supabase";

export type SessionMode = "simulation" | "practice";

export type QuestionState =
  | { phase: "idle" }
  | { phase: "playing_question" }
  | { phase: "recording" }
  | { phase: "processing" }
  | { phase: "result"; transcript: string; evaluation: EvaluationResult }
  | { phase: "complete" };

export type AnswerRecord = {
  questionId: number;
  question: string;
  transcript: string;
  evaluation: EvaluationResult;
};

export function useInterviewSession(
  sessionId: string,
  questions: CivicsQuestionRow[],
  mode: SessionMode = "simulation"
) {
  const [index, setIndex] = useState(0);
  const [questionState, setQuestionState] = useState<QuestionState>({ phase: "idle" });
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const { playQuestionAudio } = useTTS("echo");
  const recorder = useAudioRecorder();
  const abortRef = useRef(false);

  const currentQuestion = questions[index] ?? null;

  const startQuestion = useCallback(async () => {
    if (!currentQuestion || questionState.phase !== "idle") return;

    abortRef.current = false;
    setQuestionState({ phase: "playing_question" });

    const audioUrl = currentQuestion.audio_url_onyx;
    if (audioUrl) {
      await playQuestionAudio(audioUrl);
    } else {
      console.warn("[Interview] No pre-generated audio for question", currentQuestion.id);
    }

    if (abortRef.current) return;

    setQuestionState({ phase: "recording" });
    await recorder.start();
  }, [currentQuestion, questionState.phase, playQuestionAudio, recorder]);

  const submitAnswer = useCallback(async () => {
    if (questionState.phase !== "recording" || !currentQuestion) return;

    setQuestionState({ phase: "processing" });

    try {
      const audioBlob = await recorder.stop();
      const transcript = await recorder.transcribe(audioBlob);
      const evaluation = await evaluateAnswer(
        currentQuestion.question,
        currentQuestion.answers,
        transcript
      );

      const record: AnswerRecord = {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        transcript,
        evaluation,
      };

      setAnswers((prev) => [...prev, record]);

      saveAnswer({
        sessionId,
        questionId: currentQuestion.id,
        transcript,
        correct: evaluation.correct,
        feedback: evaluation.feedback,
      }).catch((e) => console.error("[Interview] saveAnswer failed:", e));

      setQuestionState({ phase: "result", transcript, evaluation });
    } catch (err) {
      console.error("[Interview] submitAnswer error:", err);
      setQuestionState({ phase: "idle" });
    }
  }, [questionState.phase, currentQuestion, recorder, sessionId]);

  const next = useCallback(async () => {
    if (questionState.phase !== "result") return;

    const isCorrect = questionState.evaluation.correct;

    // Practice mode: repeat the question if wrong
    if (mode === "practice" && !isCorrect) {
      setQuestionState({ phase: "idle" });
      return;
    }

    const nextIndex = index + 1;
    if (nextIndex >= questions.length) {
      const finalScore = answers.filter((a) => a.evaluation.correct).length + (isCorrect ? 1 : 0);
      await finalizeSession(sessionId, finalScore, questions.length).catch((e) =>
        console.error("[Interview] finalizeSession failed:", e)
      );
      setQuestionState({ phase: "complete" });
    } else {
      setIndex(nextIndex);
      setQuestionState({ phase: "idle" });
    }
  }, [index, questions.length, answers, sessionId, questionState, mode]);

  const abort = useCallback(async () => {
    abortRef.current = true;
    if (recorder.state === "recording") {
      await recorder.stop().catch(() => null);
    }
    setQuestionState({ phase: "idle" });
  }, [recorder]);

  const score = answers.filter((a) => a.evaluation.correct).length;

  return {
    currentQuestion,
    questionIndex: index,
    totalQuestions: questions.length,
    questionState,
    answers,
    score,
    mode,
    recorderState: recorder.state,
    startQuestion,
    submitAnswer,
    next,
    abort,
  };
}
