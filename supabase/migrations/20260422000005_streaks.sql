-- ============================================================
-- Migration: streaks
-- Streak diário por usuário
-- ============================================================

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

-- Função: atualiza streak ao finalizar uma sessão
create or replace function public.update_streak(p_user_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_today              date := current_date;
  v_last_activity      date;
  v_current_streak     integer;
  v_longest_streak     integer;
begin
  select last_activity_date, current_streak, longest_streak
    into v_last_activity, v_current_streak, v_longest_streak
    from public.streaks
   where user_id = p_user_id;

  if not found then
    -- Primeira sessão do usuário
    insert into public.streaks (user_id, current_streak, longest_streak, last_activity_date)
    values (p_user_id, 1, 1, v_today);
    return;
  end if;

  if v_last_activity = v_today then
    -- Já praticou hoje — não altera
    return;
  elsif v_last_activity = v_today - interval '1 day' then
    -- Dia consecutivo — incrementa
    v_current_streak := v_current_streak + 1;
  else
    -- Quebrou o streak
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
