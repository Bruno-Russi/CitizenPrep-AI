"use server";

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export type EvaluationResult = {
  correct: boolean;
  feedback: string;
  tip: string | null;
};

/**
 * Avalia semanticamente a resposta do usuário comparando com as respostas aceitas pelo USCIS.
 * Usamos GPT porque respostas aproximadas devem ser aceitas (ex: "Congress" em vez de "the Congress").
 */
export async function evaluateAnswer(
  question: string,
  acceptedAnswers: string[],
  userAnswer: string
): Promise<EvaluationResult> {
  const systemPrompt = `You are a U.S. citizenship interview evaluator. Your job is to decide whether a candidate's spoken answer is correct for a USCIS civics question.

Rules:
- The USCIS accepts any ONE of the listed accepted answers.
- Minor spelling, grammar, or wording variations are OK (e.g., "Congress" = "the United States Congress").
- Completely wrong or irrelevant answers are INCORRECT.
- Respond ONLY with valid JSON matching this schema:
  { "correct": boolean, "feedback": string, "tip": string | null }
- "feedback": one short sentence explaining your decision. Write in Brazilian Portuguese.
- "tip": if incorrect, one short hint to help the user remember, written in Brazilian Portuguese. If correct, null.`;

  const userPrompt = `Question: "${question}"
Accepted answers: ${acceptedAnswers.map((a) => `"${a}"`).join(", ")}
Candidate's answer: "${userAnswer}"`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0,
      max_tokens: 200,
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw) as EvaluationResult;

    return {
      correct: Boolean(parsed.correct),
      feedback: parsed.feedback ?? "",
      tip: parsed.tip ?? null,
    };
  } catch (err) {
    console.error("[Evaluation] GPT error:", err);
    // Fallback: exact/normalized match
    const normalized = userAnswer.trim().toLowerCase();
    const correct = acceptedAnswers.some(
      (a) => a.trim().toLowerCase() === normalized
    );
    return {
      correct,
      feedback: correct ? "Resposta correta." : "Resposta incorreta.",
      tip: correct ? null : `Uma resposta aceita é: "${acceptedAnswers[0]}"`,
    };
  }
}
