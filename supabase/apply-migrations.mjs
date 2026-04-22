#!/usr/bin/env node
// Aplica todas as migrations no Supabase via conexão direta PostgreSQL
// Uso: DATABASE_URL="postgresql://..." node supabase/apply-migrations.mjs
// A DATABASE_URL está em: Supabase Dashboard > Settings > Database > Connection string (URI)

import pg from 'pg';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;
const __dir = dirname(fileURLToPath(import.meta.url));

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌  DATABASE_URL não definida.');
  console.error('   Copie de: Supabase Dashboard > Settings > Database > Connection string (URI)');
  console.error('   Depois rode:');
  console.error('   DATABASE_URL="postgresql://postgres:<senha>@db.fqfkgxaaazxcjpvjjbjs.supabase.co:5432/postgres" node supabase/apply-migrations.mjs');
  process.exit(1);
}

const client = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  console.log('✅  Conectado ao banco de dados.');

  const migrations = [
    'migrations/20260422000000_combined.sql',
    'migrations/20260422000006_rls_and_indexes.sql',
  ];

  for (const file of migrations) {
    const sql = readFileSync(join(__dir, file), 'utf8');
    console.log(`⏳  Aplicando ${file}...`);
    await client.query(sql);
    console.log(`✅  ${file} aplicado.`);
  }

  console.log('');
  console.log('✅  Todas as migrations aplicadas com sucesso!');
  console.log('');
  console.log('Tabelas criadas/atualizadas:');
  console.log('  • public.profiles         (trigger corrigido para full_name)');
  console.log('  • public.civics_questions  (RLS: authenticated read-only)');
  console.log('  • public.sessions          (RLS: owner-only, otimizado)');
  console.log('  • public.session_answers   (RLS: owner-only via sessions, otimizado)');
  console.log('  • public.user_progress     (RLS: owner-only, otimizado)');
  console.log('  • public.streaks           (RLS: owner-only, otimizado)');
  console.log('');
  console.log('Best practices aplicadas (20260422000006):');
  console.log('  • RLS: auth.uid() → (select auth.uid()) em todas as policies');
  console.log('  • FK indexes: session_answers.question_id, user_progress.question_id');
  console.log('  • Covering index: profiles(email) include(name)');
  console.log('  • Insert policy adicionada em profiles');
  console.log('  • Trigger handle_new_user: prioriza full_name do metadata');
} catch (err) {
  console.error('❌  Erro ao aplicar migrations:', err.message);
  process.exit(1);
} finally {
  await client.end();
}
