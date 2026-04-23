export type SessionRecord = {
  id: string;
  date: string;
  isoDate: string;
  mode: "Simulação" | "Prática";
  score: number;
  total: number;
  passed: boolean;
  duration: string;
  answers: SessionAnswer[];
};

export type SessionAnswer = {
  questionId: string;
  question: string;
  category: string;
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
  tip?: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
};

export type TopicMastery = {
  topic: string;
  correct: number;
  total: number;
  color: string;
};
