export type CivicsQuestion = {
  id: number;
  question: string;
  correctAnswers: string[];
  category: string;
  tip: string;
};

export type MockAnswer = {
  questionId: number;
  transcript: string;
  correct: boolean;
};

export const CIVICS_QUESTIONS: CivicsQuestion[] = [
  {
    id: 1,
    question: "What is the supreme law of the land?",
    correctAnswers: ["the Constitution"],
    category: "Principles of American Democracy",
    tip: "The Constitution is the foundation of all U.S. laws and government.",
  },
  {
    id: 2,
    question: "What does the Constitution do?",
    correctAnswers: [
      "sets up the government",
      "defines the government",
      "protects basic rights of Americans",
    ],
    category: "Principles of American Democracy",
    tip: "The Constitution has three main functions: sets up, defines, and protects.",
  },
  {
    id: 3,
    question: "How many amendments does the Constitution have?",
    correctAnswers: ["twenty-seven", "27"],
    category: "Principles of American Democracy",
    tip: "There are 27 amendments — 10 in the Bill of Rights, plus 17 added later.",
  },
  {
    id: 4,
    question: "What are the two parts of the U.S. Congress?",
    correctAnswers: ["the Senate and House of Representatives"],
    category: "System of Government",
    tip: "Congress = Senate + House of Representatives. Together they form the legislative branch.",
  },
  {
    id: 5,
    question: "How many U.S. Senators are there?",
    correctAnswers: ["one hundred", "100"],
    category: "System of Government",
    tip: "Each state has 2 senators × 50 states = 100 senators total.",
  },
  {
    id: 6,
    question: "We elect a U.S. Senator for how many years?",
    correctAnswers: ["six", "6"],
    category: "System of Government",
    tip: "Senators serve 6-year terms. Representatives serve 2-year terms.",
  },
  {
    id: 7,
    question: "Who is in charge of the executive branch?",
    correctAnswers: ["the President"],
    category: "System of Government",
    tip: "The President leads the executive branch, which enforces the laws.",
  },
  {
    id: 8,
    question: "Who was the first President?",
    correctAnswers: ["George Washington"],
    category: "American History",
    tip: "George Washington served as the 1st President from 1789 to 1797.",
  },
  {
    id: 9,
    question: "What territory did the United States buy from France in 1803?",
    correctAnswers: ["the Louisiana Territory", "Louisiana"],
    category: "American History",
    tip: "The Louisiana Purchase doubled the size of the United States.",
  },
  {
    id: 10,
    question: "Name one war fought by the United States in the 1900s.",
    correctAnswers: [
      "World War I",
      "World War II",
      "Korean War",
      "Vietnam War",
      "Persian Gulf War",
    ],
    category: "American History",
    tip: "Any of these five wars counts as a correct answer.",
  },
];

export const MOCK_ANSWERS: MockAnswer[] = [
  { questionId: 1, transcript: "The Constitution", correct: true },
  { questionId: 2, transcript: "It protects the rights of Americans", correct: true },
  { questionId: 3, transcript: "Twenty seven", correct: true },
  { questionId: 4, transcript: "The Senate and the House", correct: true },
  { questionId: 5, transcript: "One hundred senators", correct: true },
  { questionId: 6, transcript: "Hmm, four years?", correct: false },
  { questionId: 7, transcript: "The President", correct: true },
  { questionId: 8, transcript: "George Washington", correct: true },
  { questionId: 9, transcript: "I don't know... Texas?", correct: false },
  { questionId: 10, transcript: "World War Two", correct: true },
];
