-- ============================================================
-- Migration: fix_questions_final
-- Remove formato 2025, corrige respostas desatualizadas,
-- remove pergunta extra e adiciona Q100 faltando.
-- ============================================================

-- 1. Remove todas as perguntas do formato 2025 (não fazem parte das 100 oficiais)
DELETE FROM public.civics_questions WHERE format = '2025';

-- 2. Atualiza presidente (Q28)
UPDATE public.civics_questions
SET answers = ARRAY['Donald J. Trump', 'Trump']
WHERE format = 'standard'
  AND question = 'What is the name of the President of the United States now?';

-- 3. Atualiza vice-presidente (Q29)
UPDATE public.civics_questions
SET answers = ARRAY['JD Vance', 'Vance']
WHERE format = 'standard'
  AND question = 'What is the name of the Vice President of the United States now?';

-- 4. Atualiza partido do presidente (Q46)
UPDATE public.civics_questions
SET answers = ARRAY['Republican (Party)']
WHERE format = 'standard'
  AND question = 'What is the political party of the President now?';

-- 5. Atualiza Speaker da Câmara (Q47) — remove McCarthy
UPDATE public.civics_questions
SET answers = ARRAY['Mike Johnson', '(Mike) Johnson']
WHERE format = 'standard'
  AND question = 'What is the name of the Speaker of the House of Representatives now?';

-- 6. Corrige Q51: 'freedom of religion' → 'freedom of worship'
UPDATE public.civics_questions
SET answers = ARRAY[
  'freedom of expression',
  'freedom of speech',
  'freedom of assembly',
  'freedom to petition the government',
  'freedom of worship',
  'the right to bear arms'
]
WHERE format = 'standard'
  AND question = 'What are two rights of everyone living in the United States?';

-- 7. Remove a pergunta extra que não existe na lista oficial de 100
DELETE FROM public.civics_questions
WHERE format = 'standard'
  AND question = 'We believe the government should not interfere in political views. What is this freedom called?';

-- 8. Adiciona Q100 faltando: dois feriados nacionais
INSERT INTO public.civics_questions (question, answers, category, format, active)
VALUES (
  'Name two national U.S. holidays.',
  ARRAY[
    'New Year''s Day',
    'Martin Luther King, Jr. Day',
    'Presidents'' Day',
    'Memorial Day',
    'Independence Day',
    'Labor Day',
    'Columbus Day',
    'Veterans Day',
    'Thanksgiving',
    'Christmas'
  ],
  'holidays',
  'standard',
  true
);
