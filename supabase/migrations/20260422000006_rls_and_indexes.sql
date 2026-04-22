-- ============================================================
-- CitizenPrep AI — Correções de RLS performance e índices FK
-- Best practices: security-3.3 (wrap auth.uid() em SELECT)
--                 schema-4.2  (índices em FK)
-- ============================================================

-- ─── 1. RLS PERFORMANCE: substituir auth.uid() por (select auth.uid()) ─────
-- Evita chamar auth.uid() por linha; passa a ser chamado uma vez e cacheado.
-- Impacto: até 10x mais rápido em tabelas com muitos registros.

-- profiles
drop policy if exists "profiles: select own"  on public.profiles;
drop policy if exists "profiles: update own"  on public.profiles;

create policy "profiles: select own" on public.profiles
  for select using ((select auth.uid()) = id);

create policy "profiles: update own" on public.profiles
  for update
  using      ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- INSERT faltava — o trigger handle_new_user roda como security definer,
-- mas se o usuário precisar criar o próprio perfil manualmente isso é necessário.
create policy "profiles: insert own" on public.profiles
  for insert with check ((select auth.uid()) = id);

-- sessions
drop policy if exists "sessions: select own" on public.sessions;
drop policy if exists "sessions: insert own" on public.sessions;
drop policy if exists "sessions: update own" on public.sessions;

create policy "sessions: select own" on public.sessions
  for select using ((select auth.uid()) = user_id);

create policy "sessions: insert own" on public.sessions
  for insert with check ((select auth.uid()) = user_id);

create policy "sessions: update own" on public.sessions
  for update
  using      ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- session_answers — a subquery já existe, mas vamos otimizar o auth.uid() interno
drop policy if exists "session_answers: select own" on public.session_answers;
drop policy if exists "session_answers: insert own" on public.session_answers;

create policy "session_answers: select own" on public.session_answers
  for select using (
    exists (
      select 1 from public.sessions s
      where s.id = session_id
        and s.user_id = (select auth.uid())
    )
  );

create policy "session_answers: insert own" on public.session_answers
  for insert with check (
    exists (
      select 1 from public.sessions s
      where s.id = session_id
        and s.user_id = (select auth.uid())
    )
  );

-- user_progress
drop policy if exists "user_progress: select own" on public.user_progress;
drop policy if exists "user_progress: insert own" on public.user_progress;
drop policy if exists "user_progress: update own" on public.user_progress;

create policy "user_progress: select own" on public.user_progress
  for select using ((select auth.uid()) = user_id);

create policy "user_progress: insert own" on public.user_progress
  for insert with check ((select auth.uid()) = user_id);

create policy "user_progress: update own" on public.user_progress
  for update
  using      ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- streaks
drop policy if exists "streaks: select own" on public.streaks;
drop policy if exists "streaks: insert own" on public.streaks;
drop policy if exists "streaks: update own" on public.streaks;

create policy "streaks: select own" on public.streaks
  for select using ((select auth.uid()) = user_id);

create policy "streaks: insert own" on public.streaks
  for insert with check ((select auth.uid()) = user_id);

create policy "streaks: update own" on public.streaks
  for update
  using      ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- ─── 2. ÍNDICES FK e colunas usadas em RLS ───────────────────────────────
-- Postgres NÃO cria índices em FK automaticamente. (schema-4.2)
-- session_answers.session_id já tem índice; question_id não tem.

create index if not exists session_answers_question_id_idx
  on public.session_answers (question_id);

-- user_progress.question_id (FK sem índice)
create index if not exists user_progress_question_id_idx
  on public.user_progress (question_id);

-- Índice em profiles.email para busca rápida (covering index — schema-1.4)
create index if not exists profiles_email_idx
  on public.profiles (email)
  include (name);

-- ─── 3. TRIGGER: usar full_name do metadata (vem do signUp) ─────────────
-- O campo enviado no signUp é { full_name: name }, não { name: name }.
-- O trigger combinava os dois; agora prioriza full_name e cai para name.

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      split_part(new.email, '@', 1)
    ),
    new.email
  );
  return new;
end;
$$;
