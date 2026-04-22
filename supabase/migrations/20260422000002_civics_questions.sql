-- ============================================================
-- Migration: civics_questions
-- Banco de perguntas USCIS — formato padrão (100) e 2025 (128)
-- ============================================================

create type public.civics_format as enum ('standard', '2025');
create type public.civics_category as enum (
  'principles_of_democracy',
  'system_of_government',
  'rights_and_responsibilities',
  'colonial_period_and_independence',
  'the_1800s',
  'recent_american_history',
  'geography',
  'symbols',
  'holidays',
  'integrated_civics'
);

create table if not exists public.civics_questions (
  id           serial primary key,
  question     text not null,
  answers      text[] not null,
  category     public.civics_category not null,
  format       public.civics_format not null default 'standard',
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);

-- Leitura pública (perguntas não são dados sensíveis)
alter table public.civics_questions enable row level security;

create policy "civics_questions: select all authenticated"
  on public.civics_questions for select
  to authenticated
  using (active = true);

-- Somente service_role pode inserir/editar
create policy "civics_questions: service role full access"
  on public.civics_questions for all
  to service_role
  using (true)
  with check (true);

-- Índices
create index civics_questions_format_idx  on public.civics_questions(format);
create index civics_questions_category_idx on public.civics_questions(category);
