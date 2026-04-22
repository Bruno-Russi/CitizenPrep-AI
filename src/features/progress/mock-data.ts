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

export const SESSIONS: SessionRecord[] = [
  {
    id: "s1",
    date: "Hoje, 14:32",
    isoDate: "2026-04-22",
    mode: "Simulação",
    score: 8,
    total: 10,
    passed: true,
    duration: "12min",
    answers: [
      { questionId: "q1", question: "Quantas estrelas tem a bandeira americana?", category: "Símbolos Nacionais", userAnswer: "50", correctAnswer: "50", correct: true },
      { questionId: "q2", question: "Qual é o nome do hino nacional?", category: "Símbolos Nacionais", userAnswer: "The Star-Spangled Banner", correctAnswer: "The Star-Spangled Banner", correct: true },
      { questionId: "q3", question: "Quantos senadores há no Congresso?", category: "Governo", userAnswer: "100", correctAnswer: "100", correct: true },
      { questionId: "q4", question: "Por quanto tempo os senadores são eleitos?", category: "Governo", userAnswer: "6 anos", correctAnswer: "6 anos", correct: true },
      { questionId: "q5", question: "Quem é o atual Speaker of the House?", category: "Governo", userAnswer: "Nancy Pelosi", correctAnswer: "Mike Johnson", correct: false, tip: "O Speaker of the House muda com cada nova sessão do Congresso." },
      { questionId: "q6", question: "Quantas emendas tem a Constituição?", category: "Constituição", userAnswer: "27", correctAnswer: "27", correct: true },
      { questionId: "q7", question: "O que é a Primeira Emenda?", category: "Constituição", userAnswer: "Liberdade de expressão, religião e imprensa", correctAnswer: "Liberdade de expressão, religião, imprensa, reunião e petição", correct: false, tip: "A Primeira Emenda protege 5 liberdades fundamentais." },
      { questionId: "q8", question: "Quem escreveu a Declaração de Independência?", category: "História", userAnswer: "Thomas Jefferson", correctAnswer: "Thomas Jefferson", correct: true },
      { questionId: "q9", question: "Quando foi a Declaração de Independência assinada?", category: "História", userAnswer: "4 de julho de 1776", correctAnswer: "4 de julho de 1776", correct: true },
      { questionId: "q10", question: "Quais foram os dois lados da Guerra Civil?", category: "História", userAnswer: "Norte e Sul", correctAnswer: "Norte (União) e Sul (Confederação)", correct: true },
    ],
  },
  {
    id: "s2",
    date: "Ontem, 09:15",
    isoDate: "2026-04-21",
    mode: "Prática",
    score: 15,
    total: 20,
    passed: true,
    duration: "18min",
    answers: [
      { questionId: "q3", question: "Quantos senadores há no Congresso?", category: "Governo", userAnswer: "100", correctAnswer: "100", correct: true },
      { questionId: "q4", question: "Por quanto tempo os senadores são eleitos?", category: "Governo", userAnswer: "6 anos", correctAnswer: "6 anos", correct: true },
      { questionId: "q6", question: "Quantas emendas tem a Constituição?", category: "Constituição", userAnswer: "27", correctAnswer: "27", correct: true },
      { questionId: "q8", question: "Quem escreveu a Declaração de Independência?", category: "História", userAnswer: "Thomas Jefferson", correctAnswer: "Thomas Jefferson", correct: true },
    ],
  },
  {
    id: "s3",
    date: "21 abr",
    isoDate: "2026-04-21",
    mode: "Simulação",
    score: 5,
    total: 10,
    passed: false,
    duration: "14min",
    answers: [
      { questionId: "q1", question: "Quantas estrelas tem a bandeira americana?", category: "Símbolos Nacionais", userAnswer: "48", correctAnswer: "50", correct: false, tip: "A bandeira tem 50 estrelas, uma para cada estado." },
      { questionId: "q5", question: "Quem é o atual Speaker of the House?", category: "Governo", userAnswer: "Nancy Pelosi", correctAnswer: "Mike Johnson", correct: false, tip: "O Speaker of the House muda com cada nova sessão do Congresso." },
    ],
  },
  {
    id: "s4",
    date: "20 abr",
    isoDate: "2026-04-20",
    mode: "Prática",
    score: 17,
    total: 20,
    passed: true,
    duration: "22min",
    answers: [],
  },
  {
    id: "s5",
    date: "18 abr",
    isoDate: "2026-04-18",
    mode: "Simulação",
    score: 7,
    total: 10,
    passed: true,
    duration: "11min",
    answers: [],
  },
  {
    id: "s6",
    date: "16 abr",
    isoDate: "2026-04-16",
    mode: "Prática",
    score: 12,
    total: 20,
    passed: true,
    duration: "20min",
    answers: [],
  },
  {
    id: "s7",
    date: "15 abr",
    isoDate: "2026-04-15",
    mode: "Simulação",
    score: 4,
    total: 10,
    passed: false,
    duration: "13min",
    answers: [],
  },
  {
    id: "s8",
    date: "13 abr",
    isoDate: "2026-04-13",
    mode: "Prática",
    score: 9,
    total: 20,
    passed: false,
    duration: "16min",
    answers: [],
  },
  {
    id: "s9",
    date: "11 abr",
    isoDate: "2026-04-11",
    mode: "Simulação",
    score: 6,
    total: 10,
    passed: true,
    duration: "10min",
    answers: [],
  },
  {
    id: "s10",
    date: "09 abr",
    isoDate: "2026-04-09",
    mode: "Prática",
    score: 14,
    total: 20,
    passed: true,
    duration: "19min",
    answers: [],
  },
  {
    id: "s11",
    date: "07 abr",
    isoDate: "2026-04-07",
    mode: "Simulação",
    score: 3,
    total: 10,
    passed: false,
    duration: "15min",
    answers: [],
  },
  {
    id: "s12",
    date: "05 abr",
    isoDate: "2026-04-05",
    mode: "Prática",
    score: 18,
    total: 20,
    passed: true,
    duration: "21min",
    answers: [],
  },
];

// Dias com atividade para o calendário (últimas 12 semanas)
export const ACTIVITY_DATES: Record<string, number> = {
  "2026-04-22": 2,
  "2026-04-21": 2,
  "2026-04-20": 1,
  "2026-04-18": 1,
  "2026-04-16": 1,
  "2026-04-15": 1,
  "2026-04-13": 1,
  "2026-04-11": 1,
  "2026-04-09": 1,
  "2026-04-07": 1,
  "2026-04-05": 1,
  "2026-04-03": 1,
  "2026-04-01": 2,
  "2026-03-30": 1,
  "2026-03-28": 1,
  "2026-03-25": 2,
  "2026-03-23": 1,
  "2026-03-20": 1,
  "2026-03-18": 3,
  "2026-03-15": 1,
  "2026-03-13": 2,
  "2026-03-11": 1,
  "2026-03-09": 1,
  "2026-03-07": 1,
  "2026-03-05": 2,
  "2026-03-03": 1,
  "2026-03-01": 1,
  "2026-02-27": 1,
  "2026-02-25": 2,
  "2026-02-23": 1,
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-sim",
    title: "Primeira Simulação",
    description: "Completou sua primeira entrevista simulada",
    icon: "🎯",
    unlocked: true,
    unlockedAt: "05 abr",
  },
  {
    id: "streak-7",
    title: "Semana Perfeita",
    description: "7 dias consecutivos de prática",
    icon: "🔥",
    unlocked: true,
    unlockedAt: "13 abr",
  },
  {
    id: "first-pass",
    title: "Aprovado!",
    description: "Passou na primeira simulação com 60%+",
    icon: "✅",
    unlocked: true,
    unlockedAt: "09 abr",
  },
  {
    id: "perfect",
    title: "Nota Máxima",
    description: "10/10 em uma simulação",
    icon: "⭐",
    unlocked: false,
  },
  {
    id: "streak-30",
    title: "Mês de Dedicação",
    description: "30 dias consecutivos de prática",
    icon: "🏆",
    unlocked: false,
  },
  {
    id: "master",
    title: "Mestre da Cidadania",
    description: "100% de domínio em todos os tópicos",
    icon: "🎓",
    unlocked: false,
  },
];

export const TOPIC_MASTERY: TopicMastery[] = [
  { topic: "História", correct: 28, total: 35, color: "#3B82F6" },
  { topic: "Governo", correct: 22, total: 40, color: "#06B6D4" },
  { topic: "Constituição", correct: 18, total: 25, color: "#8B5CF6" },
  { topic: "Símbolos Nacionais", correct: 14, total: 15, color: "#10B981" },
  { topic: "Economia", correct: 8, total: 20, color: "#F59E0B" },
  { topic: "Geografia", correct: 5, total: 15, color: "#EF4444" },
];

// Dados para o gráfico de linha (score% por sessão)
export const SCORE_HISTORY = SESSIONS.slice()
  .reverse()
  .map((s) => ({
    date: s.date.replace("Hoje, ", "").replace("Ontem, ", "").split(",")[0],
    score: Math.round((s.score / s.total) * 100),
    passed: s.passed,
  }));
