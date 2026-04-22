-- Adiciona colunas de áudio pré-gerado na tabela civics_questions.
-- Os MPs3 são gerados UMA VEZ pelo script scripts/seed-audios.ts e nunca
-- chamados em runtime para perguntas do banco.

alter table public.civics_questions
  add column if not exists audio_url_onyx text,
  add column if not exists audio_url_nova  text;

-- Bucket público para os MP3s das perguntas
insert into storage.buckets (id, name, public)
values ('question-audios', 'question-audios', true)
on conflict (id) do nothing;

-- Qualquer usuário autenticado pode ler (streaming do player)
create policy "question-audios: public read"
  on storage.objects for select
  using (bucket_id = 'question-audios');

-- Apenas service_role pode fazer upload (script de seed)
create policy "question-audios: service role write"
  on storage.objects for insert
  to service_role
  with check (bucket_id = 'question-audios');

create policy "question-audios: service role update"
  on storage.objects for update
  to service_role
  using (bucket_id = 'question-audios');
