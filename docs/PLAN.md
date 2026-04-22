# CitizenPrep AI — Plano de Execução

> Princípio: interface primeiro, backend depois. Cada milestone é um incremento entregável e testável antes de avançar.
> O app é 100% gratuito na v1 — sem landing page, sem pagamentos, sem planos.

---

## Visão Geral dos Milestones

| # | Nome | Branch | Foco |
|---|---|---|---|
| M1 | Setup & Fundação | `setup/foundation` | Projeto, design system, estrutura |
| M2 | Auth UI | `feat/auth-ui` | Login, cadastro, recuperação (telas) |
| M3 | Dashboard UI | `feat/dashboard-ui` | Home, navegação, telas do app |
| M4 | Entrevista UI | `feat/interview-ui` | Tela de simulação, gravação, waveform |
| M5 | Histórico & Progresso UI | `feat/progress-ui` | Histórico, gráficos, streak, XP |
| M6 | Auth Backend | `feat/auth-backend` | Supabase Auth, sessão, middleware |
| M7 | Banco de Dados & Civics | `feat/database-civics` | Schema, migrations, banco de perguntas |
| M8 | Motor de Entrevista | `feat/interview-engine` | Whisper, ElevenLabs, Claude, lógica |
| M9 | Progresso & Gamificação | `feat/progress-backend` | Histórico real, streak, XP, analytics |
| M10 | Observabilidade | `feat/observability` | PostHog, Sentry, logs |
| M11 | Deploy & Produção | `feat/production` | Vercel, env vars, domínio, CI |

---

## M1 — Setup & Fundação

**Branch:** `setup/foundation`
**Objetivo:** Projeto Next.js configurado, design system aplicado, estrutura de pastas criada, variáveis de ambiente prontas.

### Entregas
- [ ] Inicializar projeto com `create-next-app` (TypeScript, Tailwind, App Router, `src/`)
- [ ] Instalar e configurar shadcn/ui
- [ ] Aplicar paleta de cores no `tailwind.config.ts` (navy, sky blue, sage green, amber)
- [ ] Configurar fonte Inter via `next/font`
- [ ] Criar variáveis CSS globais em `src/styles/globals.css`
- [ ] Criar estrutura completa de pastas (`features/`, `lib/`, `components/`, `types/`)
- [ ] Configurar path alias `@/` no `tsconfig.json`
- [ ] Criar `lib/env.ts` com validação Zod de todas as variáveis de ambiente
- [ ] Criar `.env.example` com todas as chaves necessárias
- [ ] Criar `.env.local` com valores de desenvolvimento
- [ ] Instalar dependências base: `zod`, `clsx`, `tailwind-merge`, `lucide-react`
- [ ] Criar `components/providers.tsx` (placeholder vazio)
- [ ] Confirmar `npm run dev` funcionando sem erros

**Commit final:**
```
feat: setup inicial — Next.js 15, Tailwind, shadcn/ui, design system e estrutura de pastas
```

---

## M2 — Auth UI

**Branch:** `feat/auth-ui`
**Objetivo:** Telas de autenticação com design final, sem backend ainda — apenas UI navegável.

### Entregas
- [ ] Criar layout `src/app/(auth)/layout.tsx` (split screen: visual esquerda, form direita)
- [ ] Tela de Login: e-mail + senha, link "esqueci a senha", link para cadastro
- [ ] Tela de Cadastro: nome, e-mail, senha, confirmação de senha
- [ ] Tela de Recuperação de Senha: campo de e-mail, feedback de envio
- [ ] Tela de Redefinição de Senha: nova senha + confirmação
- [ ] Tela de Confirmação de E-mail: página de espera/sucesso
- [ ] Componentes de formulário reutilizáveis (`FormField`, `PasswordInput`, `AuthCard`)
- [ ] Validação de campos no cliente com react-hook-form + Zod
- [ ] Estados de loading (botão com spinner)
- [ ] Estados de erro (mensagens inline)
- [ ] Responsivo mobile

**Commit final:**
```
feat: telas de auth — login, cadastro e recuperação de senha (UI)
```

---

## M3 — Dashboard UI

**Branch:** `feat/dashboard-ui`
**Objetivo:** Todas as telas do app autenticado com dados mockados — navegação completa funcionando.

### Entregas
- [ ] Criar layout `src/app/(dashboard)/layout.tsx` com sidebar (desktop) e bottom nav (mobile)
- [ ] Componente `Sidebar` com links: Dashboard, Praticar, Simular, Histórico, Configurações
- [ ] Componente `BottomNav` para mobile
- [ ] Tela Dashboard (`/dashboard`): boas-vindas, streak, XP, próxima sessão, atalhos rápidos
- [ ] Componente `StreakCard` com contador de dias e chama de progresso
- [ ] Componente `XPBar` com nível atual e progresso até o próximo
- [ ] Componente `StatsGrid`: total de simulações, taxa de acerto, perguntas dominadas
- [ ] Tela Praticar (`/practice`): grid de tópicos (Governo, História, etc.) com % de domínio por tópico
- [ ] Tela Simular (`/simulation`): escolha do modo (Prática vs Simulação), escolha de voz do oficial
- [ ] Tela Histórico (`/history`): lista de sessões passadas, gráfico de evolução (recharts)
- [ ] Tela Configurações (`/settings`): perfil, preferências de voz, idioma
- [ ] Todos os dados são mockados (arrays estáticos em cada componente)
- [ ] Responsivo em mobile e desktop

**Commit final:**
```
feat: dashboard UI completo — todas as telas com dados mockados e navegação funcionando
```

---

## M4 — Entrevista UI

**Branch:** `feat/interview-ui`
**Objetivo:** Tela central de simulação com toda a interface de voz — sem integração real com APIs ainda.

### Entregas
- [ ] Tela de entrevista (`/simulation/[sessionId]`) com layout fullscreen/foco
- [ ] Componente `OfficerAvatar`: avatar do oficial com animação de fala (pulse no border)
- [ ] Componente `AudioWaveform`: animação de onda enquanto o oficial fala ou usuário grava
- [ ] Componente `RecordButton`: botão central grande com estados (idle → gravando → processando)
- [ ] Componente `QuestionCard`: exibe a pergunta atual e número (ex: "Pergunta 3 de 10")
- [ ] Componente `TranscriptBubble`: mostra o que foi transcrito da fala do usuário
- [ ] Componente `FeedbackOverlay`: overlay de resultado (correto ✓ / incorreto ✗) com animação
- [ ] Componente `SessionProgress`: barra de progresso (quantas perguntas restam)
- [ ] Tela de resultado da sessão (`/simulation/[sessionId]/result`): score, aprovado/reprovado, lista de erros
- [ ] Componente `ResultCard`: card por pergunta com resposta do usuário vs resposta correta
- [ ] Componente `StudyTip`: dica personalizada baseada nos erros (mockado)
- [ ] Botão para repetir a pergunta do oficial
- [ ] Controle de velocidade de fala (lento / normal / rápido) — UI apenas
- [ ] Responsivo e funcional em mobile (botão de gravação acessível com o polegar)

**Commit final:**
```
feat: UI da entrevista — tela de simulação, waveform, gravação, feedback e tela de resultado
```

---

## M5 — Histórico & Progresso UI

**Branch:** `feat/progress-ui`
**Objetivo:** Telas de histórico, evolução e gamificação com dados mockados realistas.

### Entregas
- [ ] Gráfico de evolução de score ao longo do tempo (recharts LineChart)
- [ ] Gráfico de domínio por tópico (recharts RadarChart ou BarChart)
- [ ] Componente `SessionRow`: linha de histórico com data, score, modo e botão de revisão
- [ ] Tela de revisão de sessão passada (`/history/[sessionId]`): replay das respostas e feedback
- [ ] Componente `TopicMasteryCard`: card por tópico com % de acerto e botão "praticar este tópico"
- [ ] Componente `StreakCalendar`: calendário de atividade estilo GitHub contributions
- [ ] Componente `AchievementBadge`: medalhas desbloqueadas (Primeira Simulação, 7 dias de streak, etc.)
- [ ] Tela de perfil com resumo de conquistas e progresso geral
- [ ] Dados mockados com 10+ sessões fictícias para testar todos os estados visuais

**Commit final:**
```
feat: UI de histórico e progresso — gráficos, streak calendar, conquistas e revisão de sessões
```

---

## M6 — Auth Backend

**Branch:** `feat/auth-backend`
**Objetivo:** Autenticação real com Supabase — login, cadastro, sessão persistente e rotas protegidas.

### Entregas
- [ ] Instalar `@supabase/supabase-js` e `@supabase/ssr`
- [ ] Criar `lib/supabase/client.ts` (`createBrowserClient`)
- [ ] Criar `lib/supabase/server.ts` (`createServerClient` com cookies)
- [ ] Criar `lib/supabase/admin.ts` (service role para operações admin)
- [ ] Criar `src/middleware.ts` para renovação automática de sessão
- [ ] Criar projeto no Supabase e configurar env vars
- [ ] Conectar formulário de cadastro à action `features/auth/actions.ts`
- [ ] Conectar formulário de login à action `features/auth/actions.ts`
- [ ] Implementar fluxo de recuperação de senha (magic link via Supabase)
- [ ] Implementar confirmação de e-mail (redirect para `/confirm`)
- [ ] Proteger rotas `(dashboard)` — redirecionar para login se sem sessão
- [ ] Redirecionar usuário autenticado que tenta acessar `(auth)` para `/dashboard`
- [ ] Criar tabela `profiles` no Supabase (id, name, email, created_at, language)
- [ ] Popular `profiles` automaticamente via trigger no Supabase após signup
- [ ] Substituir dados mockados do header/sidebar pelo nome real do usuário

**Commit final:**
```
feat: auth backend — Supabase Auth integrado, sessão persistente e rotas protegidas
```

---

## M7 — Banco de Dados & Civics

**Branch:** `feat/database-civics`
**Objetivo:** Schema completo do banco de dados + banco de 100 perguntas USCIS populado.

### Entregas
- [ ] Criar migration: tabela `civics_questions` (id, question, answers[], category, format, active)
- [ ] Criar migration: tabela `sessions` (id, user_id, mode, format, score, passed, started_at, ended_at)
- [ ] Criar migration: tabela `session_answers` (id, session_id, question_id, transcript, correct, feedback)
- [ ] Criar migration: tabela `user_progress` (user_id, question_id, attempts, correct_count, last_seen)
- [ ] Criar migration: tabela `streaks` (user_id, current_streak, longest_streak, last_activity_date)
- [ ] Configurar Row Level Security (RLS) em todas as tabelas
- [ ] Popular tabela `civics_questions` com as 100 perguntas oficiais USCIS (formato padrão)
- [ ] Popular tabela `civics_questions` com as 128 perguntas do formato 2025
- [ ] Gerar tipos TypeScript via `supabase gen types typescript > src/types/database.ts`
- [ ] Criar queries reutilizáveis em `lib/supabase/queries.ts`
- [ ] Criar `features/civics/` com funções para buscar perguntas aleatórias por formato e categoria

**Commit final:**
```
feat: schema do banco de dados e banco de perguntas USCIS (100 + 128 perguntas populadas)
```

---

## M8 — Motor de Entrevista

**Branch:** `feat/interview-engine`
**Objetivo:** Loop completo de entrevista funcionando — voz do oficial → gravação do usuário → transcrição → avaliação → próxima pergunta.

### Entregas
- [ ] Criar `lib/api/elevenlabs.ts`: client TTS com seleção de voz (masculina/feminina)
- [ ] Criar `lib/api/openai.ts`: client Whisper para transcrição de áudio
- [ ] Criar `lib/api/anthropic.ts`: client Claude para avaliação semântica
- [ ] Criar `app/api/tts/route.ts`: proxy server-side para ElevenLabs (protege a chave)
- [ ] Criar `app/api/speech/transcribe/route.ts`: proxy server-side para Whisper
- [ ] Criar `features/speech/hooks/useAudioRecorder.ts`: hook de gravação via MediaRecorder API
- [ ] Criar `features/speech/hooks/useTTS.ts`: hook para reproduzir áudio do oficial
- [ ] Criar `features/evaluation/actions.ts`: server action que chama Claude e retorna `{ correct, feedback, tip }`
- [ ] Criar `features/interview/hooks/useInterviewSession.ts`: orquestra todo o fluxo (estado da máquina)
- [ ] Integrar `useInterviewSession` na tela `/simulation/[sessionId]`
- [ ] Salvar sessão e respostas no banco ao final da entrevista
- [ ] Implementar lógica de aprovação (6/10 corretas = passed)
- [ ] Tela de resultado com dados reais da sessão
- [ ] Tratar erros de microfone negado, timeout de API, sem conexão
- [ ] Testar fluxo completo end-to-end (modo Prática e modo Simulação)

**Commit final:**
```
feat: motor de entrevista — loop voz→transcrição→avaliação→feedback integrado e funcional
```

---

## M9 — Progresso & Gamificação

**Branch:** `feat/progress-backend`
**Objetivo:** Histórico real, evolução de score, streak diário e XP calculados a partir do banco.

### Entregas
- [ ] Criar `features/progress/actions.ts`: buscar histórico de sessões do usuário
- [ ] Substituir dados mockados do histórico por dados reais do Supabase
- [ ] Implementar cálculo de streak (atualizar `streaks` ao finalizar sessão)
- [ ] Implementar sistema de XP (10 XP por simulação, +5 por resposta correta)
- [ ] Implementar domínio por tópico (% de acerto agrupado por `category`)
- [ ] Substituir gráficos mockados por dados reais (recharts com dados do banco)
- [ ] Criar `features/progress/hooks/useUserStats.ts`
- [ ] Dashboard com stats reais (total de sessões, taxa de acerto geral, maior streak)
- [ ] Dicas personalizadas baseadas em erros recorrentes (top 3 categorias com menor acerto)
- [ ] Implementar conquistas/badges: calcular e salvar via server action ao final de sessão
- [ ] Streak calendar com dados reais dos últimos 30 dias

**Commit final:**
```
feat: progresso e gamificação — histórico real, streak, XP e dicas personalizadas
```

---

## M10 — Observabilidade

**Branch:** `feat/observability`
**Objetivo:** Analytics de produto e monitoramento de erros configurados e ativos em produção.

### Entregas
- [ ] Instalar e configurar PostHog (`posthog-js`, provider no `components/providers.tsx`)
- [ ] Rastrear eventos-chave: `simulation_started`, `simulation_completed`, `answer_recorded`, `practice_started`
- [ ] Identificar usuário no PostHog após login (`posthog.identify`)
- [ ] Instalar e configurar Sentry (`@sentry/nextjs`)
- [ ] Configurar Sentry para capturar erros de API (Whisper, ElevenLabs, Claude)
- [ ] Criar `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
- [ ] Adicionar `instrumentation.ts` para Sentry no App Router
- [ ] Testar captura de erro manual (`Sentry.captureException`)
- [ ] Verificar eventos chegando no dashboard do PostHog
- [ ] Configurar alertas de erro no Sentry (e-mail para erros críticos)

**Commit final:**
```
feat: observabilidade — PostHog analytics e Sentry error tracking configurados
```

---

## M11 — Deploy & Produção

**Branch:** `feat/production`
**Objetivo:** App em produção no Vercel, domínio configurado, variáveis de ambiente corretas e CI funcionando.

### Entregas
- [ ] Criar projeto no Vercel e conectar ao repositório GitHub
- [ ] Configurar todas as variáveis de ambiente no Vercel (production + preview)
- [ ] Configurar domínio customizado
- [ ] Configurar HTTPS automático via Vercel
- [ ] Atualizar URLs de redirect do Supabase Auth para produção
- [ ] Executar `supabase db push` para aplicar migrations em produção
- [ ] Configurar Supabase para o projeto de produção (novo projeto separado do dev)
- [ ] Verificar `next.config.ts`: otimização de imagens, headers de segurança
- [ ] Testar fluxo completo end-to-end em produção (cadastro → simulação → resultado)
- [ ] Verificar Lighthouse score (meta: Performance > 85, Accessibility > 90)
- [ ] Configurar preview deployments para PRs (automático no Vercel)
- [ ] Criar `README.md` com instruções de setup local para o projeto

**Commit final:**
```
feat: deploy em produção — Vercel, domínio, variáveis de ambiente e fluxo end-to-end validado
```

---

## Resumo da Ordem de Execução

```
M1 Setup ──► M2 Auth UI ──► M3 Dashboard UI ──► M4 Entrevista UI ──► M5 Progresso UI
                                                                             │
                                                                             ▼
                              M8 Motor ◄── M7 Banco de Dados ◄── M6 Auth Backend
                                │
                                ▼
                         M9 Progresso ──► M10 Observabilidade ──► M11 Deploy
```

**UI completa antes de qualquer backend.** O backend entra no M6 e constrói sobre as telas já prontas.
