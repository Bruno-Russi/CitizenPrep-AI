-- Adiciona coluna xp à tabela profiles para sistema de gamificação
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS xp integer NOT NULL DEFAULT 0;
