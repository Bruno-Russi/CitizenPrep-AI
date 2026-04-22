-- ============================================================
-- CitizenPrep AI — Schema completo
-- Execute no SQL Editor do Supabase Studio (em ordem)
-- ============================================================

-- ==================== PROFILES ====================

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  email       text,
  language    text not null default 'en',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: select own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: update own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==================== CIVICS QUESTIONS ====================

do $$ begin
  create type public.civics_format as enum ('standard', '2025');
exception when duplicate_object then null; end $$;

do $$ begin
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
exception when duplicate_object then null; end $$;

create table if not exists public.civics_questions (
  id           serial primary key,
  question     text not null,
  answers      text[] not null,
  category     public.civics_category not null,
  format       public.civics_format not null default 'standard',
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);

alter table public.civics_questions enable row level security;

create policy "civics_questions: select authenticated"
  on public.civics_questions for select
  to authenticated
  using (active = true);

create policy "civics_questions: service role full access"
  on public.civics_questions for all
  to service_role
  using (true)
  with check (true);

create index if not exists civics_questions_format_idx   on public.civics_questions(format);
create index if not exists civics_questions_category_idx on public.civics_questions(category);

-- ==================== SESSIONS ====================

do $$ begin
  create type public.session_mode as enum ('practice', 'simulation');
exception when duplicate_object then null; end $$;

create table if not exists public.sessions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  mode         public.session_mode not null,
  format       public.civics_format not null default 'standard',
  score        integer,
  total        integer,
  passed       boolean,
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

create index if not exists sessions_user_id_idx    on public.sessions(user_id);
create index if not exists sessions_started_at_idx on public.sessions(started_at desc);

-- ==================== SESSION ANSWERS ====================

create table if not exists public.session_answers (
  id           uuid primary key default gen_random_uuid(),
  session_id   uuid not null references public.sessions(id) on delete cascade,
  question_id  integer not null references public.civics_questions(id),
  transcript   text,
  correct      boolean not null default false,
  feedback     text,
  created_at   timestamptz not null default now()
);

alter table public.session_answers enable row level security;

create policy "session_answers: select own"
  on public.session_answers for select
  using (
    exists (
      select 1 from public.sessions s
      where s.id = session_id and s.user_id = auth.uid()
    )
  );

create policy "session_answers: insert own"
  on public.session_answers for insert
  with check (
    exists (
      select 1 from public.sessions s
      where s.id = session_id and s.user_id = auth.uid()
    )
  );

create index if not exists session_answers_session_id_idx on public.session_answers(session_id);

-- ==================== USER PROGRESS ====================

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

create index if not exists user_progress_user_id_idx   on public.user_progress(user_id);
create index if not exists user_progress_last_seen_idx on public.user_progress(last_seen desc);

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

-- ==================== STREAKS ====================

create table if not exists public.streaks (
  user_id             uuid primary key references auth.users(id) on delete cascade,
  current_streak      integer not null default 0,
  longest_streak      integer not null default 0,
  last_activity_date  date,
  updated_at          timestamptz not null default now()
);

alter table public.streaks enable row level security;

create policy "streaks: select own"
  on public.streaks for select
  using (auth.uid() = user_id);

create policy "streaks: insert own"
  on public.streaks for insert
  with check (auth.uid() = user_id);

create policy "streaks: update own"
  on public.streaks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function public.update_streak(p_user_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_today          date := current_date;
  v_last_activity  date;
  v_current_streak integer;
  v_longest_streak integer;
begin
  select last_activity_date, current_streak, longest_streak
    into v_last_activity, v_current_streak, v_longest_streak
    from public.streaks
   where user_id = p_user_id;

  if not found then
    insert into public.streaks (user_id, current_streak, longest_streak, last_activity_date)
    values (p_user_id, 1, 1, v_today);
    return;
  end if;

  if v_last_activity = v_today then
    return;
  elsif v_last_activity = v_today - interval '1 day' then
    v_current_streak := v_current_streak + 1;
  else
    v_current_streak := 1;
  end if;

  v_longest_streak := greatest(v_longest_streak, v_current_streak);

  update public.streaks set
    current_streak     = v_current_streak,
    longest_streak     = v_longest_streak,
    last_activity_date = v_today,
    updated_at         = now()
  where user_id = p_user_id;
end;
$$;
