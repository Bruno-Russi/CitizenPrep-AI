-- ============================================================
-- Migration: sessions + session_answers
-- ============================================================

create type public.session_mode as enum ('practice', 'simulation');

create table if not exists public.sessions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  mode         public.session_mode not null,
  format       public.civics_format not null default 'standard',
  score        integer,           -- número de respostas corretas
  total        integer,           -- total de perguntas na sessão
  passed       boolean,           -- score >= 6 (simulação) ou null (prática)
  started_at   timestamptz not null default now(),
  ended_at     timestamptz
);

alter table public.sessions enable row level security;

create policy "sessions: select own"
  on public.sessions for select
  using (auth.uid() = user_id);

create policy "sessions: insert own"
  on public.sessions for insert
  with check (auth.uid() = user_id);

create policy "sessions: update own"
  on public.sessions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index sessions_user_id_idx    on public.sessions(user_id);
create index sessions_started_at_idx on public.sessions(started_at desc);

-- ============================================================
-- session_answers
-- ============================================================

create table if not exists public.session_answers (
  id           uuid primary key default gen_random_uuid(),
  session_id   uuid not null references public.sessions(id) on delete cascade,
  question_id  integer not null references public.civics_questions(id),
  transcript   text,             -- texto transcrito da resposta do usuário
  correct      boolean not null default false,
  feedback     text,             -- feedback textual do Claude
  created_at   timestamptz not null default now()
);

alter table public.session_answers enable row level security;

create policy "session_answers: select own sessions"
  on public.session_answers for select
  using (
    exists (
      select 1 from public.sessions s
      where s.id = session_id and s.user_id = auth.uid()
    )
  );

create policy "session_answers: insert own sessions"
  on public.session_answers for insert
  with check (
    exists (
      select 1 from public.sessions s
      where s.id = session_id and s.user_id = auth.uid()
    )
  );

create index session_answers_session_id_idx on public.session_answers(session_id);
