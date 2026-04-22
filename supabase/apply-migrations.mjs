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

  const sql = readFileSync(join(__dir, 'migrations/20260422000000_combined.sql'), 'utf8');

  console.log('⏳  Aplicando migrations...');
  await client.query(sql);
  console.log('✅  Migrations aplicadas com sucesso!');
  console.log('');
  console.log('Tabelas criadas:');
  console.log('  • public.profiles         (com trigger handle_new_user)');
  console.log('  • public.civics_questions  (RLS: authenticated read-only)');
  console.log('  • public.sessions          (RLS: owner-only)');
  console.log('  • public.session_answers   (RLS: owner-only via sessions)');
  console.log('  • public.user_progress     (RLS: owner-only)');
  console.log('  • public.streaks           (RLS: owner-only)');
} catch (err) {
  console.error('❌  Erro ao aplicar migrations:', err.message);
  process.exit(1);
} finally {
  await client.end();
}
