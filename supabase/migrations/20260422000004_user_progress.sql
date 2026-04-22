-- ============================================================
-- Migration: user_progress
-- Acúmulo de tentativas por pergunta por usuário
-- ============================================================

create table if not exists public.user_progress (
  user_id       uuid not null references auth.users(id) on delete cascade,
  question_id   integer not null references public.civics_questions(id),
  attempts      integer not null default 0,
  correct_count integer not null default 0,
  last_seen     timestamptz not null default now(),
  primary key (user_id, question_id)
);

alter table public.user_progress enable row level security;

create policy "user_progress: select own"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "user_progress: insert own"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "user_progress: update own"
  on public.user_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index user_progress_user_id_idx    on public.user_progress(user_id);
create index user_progress_last_seen_idx  on public.user_progress(last_seen desc);

-- Função helper: upsert de progresso ao finalizar resposta
create or replace function public.upsert_user_progress(
  p_user_id     uuid,
  p_question_id integer,
  p_correct     boolean
)
returns void language plpgsql security definer set search_path = public as $$
begin
  insert into public.user_progress (user_id, question_id, attempts, correct_count, last_seen)
  values (p_user_id, p_question_id, 1, case when p_correct then 1 else 0 end, now())
  on conflict (user_id, question_id) do update set
    attempts      = user_progress.attempts + 1,
    correct_count = user_progress.correct_count + case when p_correct then 1 else 0 end,
    last_seen     = now();
end;
$$;
