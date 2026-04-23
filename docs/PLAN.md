# CitizenPrep AI — Plano de Execução

> Princípio: interface primeiro, backend depois. Cada milestone é um incremento entregável e testável antes de avançar.
> O app é 100% gratuito na v1 — sem pagamentos, sem planos pagos ainda.

---

## Visão Geral dos Milestones

| # | Nome | Branch | Foco |
|---|---|---|---|
| M0 | Landing Page | `feat/landing-page` | Página pública de entrada do produto |
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

## M0 — Landing Page

**Branch:** `feat/landing-page`
**Objetivo:** Página pública de entrada do produto — apresenta o CitizenPrep AI para visitantes não autenticados.

### Entregas
- [x] Navbar fixa com logo CitizenPrep AI, links de navegação e botão "Começar grátis"
- [x] Hero com headline de impacto, subtítulo, dois CTAs e terminal animado com métricas live
- [x] Seção de stats: 94% aprovação, 128 perguntas USCIS, 12 dias de preparo, 1.800+ usuários
- [x] Seção "Como funciona" com 3 passos (escolha o modo → responda em voz → receba feedback)
- [x] Grid de 6 funcionalidades principais com cards e tags
- [x] Tabela de preços: plano Grátis com badge "Somente por enquanto", R$ 0/mês, 8 features
- [x] CTA final com headline e botão de conversão
- [x] Footer com logo e links de navegação
- [x] Ticker animado em CSS puro com métricas em loop infinito
- [x] Efeito glow nos cards ao hover (CSS-only, sem JavaScript)
- [x] Totalmente responsivo — mobile e desktop
- [x] Server Component puro (sem `"use client"`)

**Commit final:**
```
feat: landing page pública — hero, stats, funcionalidades, preços e CTA (CitizenPrep AI)
```

---

## M1 — Setup & Fundação

**Branch:** `setup/foundation`
**Objetivo:** Projeto Next.js configurado, design system aplicado, estrutura de pastas criada, variáveis de ambiente prontas.

### Entregas
- [x] Inicializar projeto com `create-next-app` (TypeScript, Tailwind, App Router, `src/`)
- [x] Instalar e configurar shadcn/ui
- [x] Aplicar paleta de cores no `tailwind.config.ts` (navy, sky blue, sage green, amber)
- [x] Configurar fonte Inter via `next/font`
- [x] Criar variáveis CSS globais em `src/styles/globals.css`
- [x] Criar estrutura completa de pastas (`features/`, `lib/`, `components/`, `types/`)
- [x] Configurar path alias `@/` no `tsconfig.json`
- [x] Criar `lib/env.ts` com validação Zod de todas as variáveis de ambiente
- [x] Criar `.env.example` com todas as chaves necessárias
- [x] Criar `.env.local` com valores de desenvolvimento
- [x] Instalar dependências base: `zod`, `clsx`, `tailwind-merge`, `lucide-react`
- [x] Criar `components/providers.tsx` (placeholder vazio)
- [x] Confirmar `npm run dev` funcionando sem erros

**Commit final:**
```
feat: setup inicial — Next.js 15, Tailwind, shadcn/ui, design system e estrutura de pastas
```

---

## M2 — Auth UI

**Branch:** `feat/auth-ui`
**Objetivo:** Telas de autenticação com design final, sem backend ainda — apenas UI navegável.

### Entregas
- [x] Criar layout `src/app/(auth)/layout.tsx` (split screen: visual esquerda, form direita)
- [x] Tela de Login: e-mail + senha, link "esqueci a senha", link para cadastro
- [x] Tela de Cadastro: nome, e-mail, senha, confirmação de senha
- [x] Tela de Recuperação de Senha: campo de e-mail, feedback de envio
- [x] Tela de Redefinição de Senha: nova senha + confirmação
- [x] Tela de Confirmação de E-mail: página de espera/sucesso
- [x] Componentes de formulário reutilizáveis (`FormField`, `PasswordInput`, `AuthCard`)
- [x] Validação de campos no cliente com react-hook-form + Zod
- [x] Estados de loading (botão com spinner)
- [x] Estados de erro (mensagens inline)
- [x] Responsivo mobile

**Commit final:**
```
feat: telas de auth — login, cadastro e recuperação de senha (UI)
```

---

## M3 — Dashboard UI

**Branch:** `feat/dashboard-ui`
**Objetivo:** Todas as telas do app autenticado com dados mockados — navegação completa funcionando.

### Entregas
- [x] Criar layout `src/app/(dashboard)/layout.tsx` com sidebar (desktop) e bottom nav (mobile)
- [x] Componente `Sidebar` com links: Dashboard, Praticar, Simular, Histórico, Configurações
- [x] Componente `BottomNav` para mobile
- [x] Tela Dashboard (`/dashboard`): boas-vindas, streak, XP, próxima sessão, atalhos rápidos
- [x] Componente `StreakCard` com contador de dias e chama de progresso
- [x] Componente `XPBar` com nível atual e progresso até o próximo
- [x] Componente `StatsGrid`: total de simulações, taxa de acerto, perguntas dominadas
- [x] Tela Praticar (`/practice`): grid de tópicos (Governo, História, etc.) com % de domínio por tópico
- [x] Tela Simular (`/simulation`): escolha do modo (Prática vs Simulação), escolha de voz do oficial
- [x] Tela Histórico (`/history`): lista de sessões passadas, gráfico de evolução (recharts)
- [x] Tela Configurações (`/settings`): perfil, preferências de voz, idioma
- [x] Todos os dados são mockados (arrays estáticos em cada componente)
- [x] Responsivo em mobile e desktop

**Commit final:**
```
feat: dashboard UI completo — todas as telas com dados mockados e navegação funcionando
```

---

## M4 — Entrevista UI

**Branch:** `feat/interview-ui`
**Objetivo:** Tela central de simulação com toda a interface de voz — sem integração real com APIs ainda.

### Entregas
- [x] Tela de entrevista (`/simulation/[sessionId]`) com layout fullscreen/foco
- [x] Componente `OfficerAvatar`: avatar do oficial com animação de fala (pulse no border)
- [x] Componente `AudioWaveform`: animação de onda enquanto o oficial fala ou usuário grava
- [x] Componente `RecordButton`: botão central grande com estados (idle → gravando → processando)
- [x] Componente `QuestionCard`: exibe a pergunta atual e número (ex: "Pergunta 3 de 10")
- [x] Componente `TranscriptBubble`: mostra o que foi transcrito da fala do usuário
- [x] Componente `FeedbackOverlay`: overlay de resultado (correto ✓ / incorreto ✗) com animação
- [x] Componente `SessionProgress`: barra de progresso (quantas perguntas restam)
- [x] Tela de resultado da sessão (`/simulation/[sessionId]/result`): score, aprovado/reprovado, lista de erros
- [x] Componente `ResultCard`: card por pergunta com resposta do usuário vs resposta correta
- [x] Componente `StudyTip`: dica personalizada baseada nos erros (mockado)
- [x] Botão para repetir a pergunta do oficial
- [x] Controle de velocidade de fala (lento / normal / rápido) — UI apenas
- [x] Responsivo e funcional em mobile (botão de gravação acessível com o polegar)

**Commit final:**
```
feat: UI da entrevista — tela de simulação, waveform, gravação, feedback e tela de resultado
```

> **Nota:** M2, M3 e M4 foram desenvolvidos juntos na branch `feat/interview-ui` com redesign completo do design system para "Deep Space" — dark mode, Inter font, paleta azul/cyan (#3B82F6/#06B6D4), glassmorphism, animações CSS. O design original (navy/sage/amber) foi substituído integralmente.

---

## M5 — Histórico & Progresso UI

**Branch:** `feat/progress-ui`
**Objetivo:** Telas de histórico, evolução e gamificação com dados mockados realistas.

### Entregas
- [x] Gráfico de evolução de score ao longo do tempo (recharts LineChart)
- [x] Gráfico de domínio por tópico — barras por tópico no dashboard e /history
- [x] Componente `SessionRow`: linha de histórico com data, score, modo e link de revisão
- [x] Tela de revisão de sessão passada (`/history/[sessionId]`): replay das respostas e feedback
- [x] Componente `TopicMasteryCard`: card por tópico com % de acerto e badge de nível
- [x] Componente `StreakCalendar`: calendário de atividade estilo GitHub contributions (12 semanas)
- [x] Componente `AchievementBadge`: medalhas desbloqueadas/bloqueadas com glow e cadeado
- [x] Seção de conquistas e domínio por tópico integrada no /dashboard
- [x] Dados mockados com 12 sessões fictícias para testar todos os estados visuais

**Commit final:**
```
feat: UI de histórico e progresso — gráficos, streak calendar, conquistas e revisão de sessões
```

---

## M6 — Auth Backend

**Branch:** `feat/auth-backend`
**Objetivo:** Autenticação real com Supabase — login, cadastro, sessão persistente e rotas protegidas.

### Entregas
- [x] Instalar `@supabase/supabase-js` e `@supabase/ssr`
- [x] Criar `lib/supabase/client.ts` (`createBrowserClient`)
- [x] Criar `lib/supabase/server.ts` (`createServerClient` com cookies)
- [x] Criar `lib/supabase/admin.ts` (service role para operações admin)
- [x] Criar `src/proxy.ts` para renovação automática de sessão (Next.js 16 — renomeado de middleware)
- [x] Criar projeto no Supabase e configurar env vars
- [x] Conectar formulário de cadastro à action `features/auth/actions.ts`
- [x] Conectar formulário de login à action `features/auth/actions.ts`
- [x] Implementar fluxo de recuperação de senha (magic link via Supabase)
- [x] Implementar confirmação de e-mail (redirect para `/confirm` ou `/onboarding` se auto-confirm)
- [x] Proteger rotas `(dashboard)` — redirecionar para login se sem sessão
- [x] Redirecionar usuário autenticado que tenta acessar `(auth)` para `/dashboard`
- [x] Criar tabela `profiles` no Supabase (id, name, email, created_at, language)
- [x] Popular `profiles` automaticamente via trigger no Supabase após signup
- [x] Substituir dados mockados do header/sidebar pelo nome real do usuário
- [x] Criar `src/app/auth/callback/route.ts` — handler de OAuth/magic link
- [x] Conectar onboarding ao banco (upsert em `profiles` + `user_metadata`)
- [x] Aplicar best practices de RLS e índices FK (migration `20260422000006`)

**Commit final:**
```
feat: auth backend — Supabase Auth integrado, sessão persistente e rotas protegidas
```

---

## M7 — Banco de Dados & Civics

**Branch:** `feat/database-civics`
**Objetivo:** Schema completo do banco de dados + banco de 100 perguntas USCIS populado.

### Entregas
- [x] Criar migration: tabela `civics_questions` (id, question, answers[], category, format, active)
- [x] Criar migration: tabela `sessions` (id, user_id, mode, format, score, passed, started_at, ended_at)
- [x] Criar migration: tabela `session_answers` (id, session_id, question_id, transcript, correct, feedback)
- [x] Criar migration: tabela `user_progress` (user_id, question_id, attempts, correct_count, last_seen)
- [x] Criar migration: tabela `streaks` (user_id, current_streak, longest_streak, last_activity_date)
- [x] Configurar Row Level Security (RLS) em todas as tabelas
- [x] Popular tabela `civics_questions` com as 100 perguntas oficiais USCIS (formato padrão)
- [x] Popular tabela `civics_questions` com as 128 perguntas do formato 2025
- [x] Gerar tipos TypeScript via `supabase gen types typescript > src/types/supabase.ts`
- [x] Criar queries reutilizáveis em `lib/supabase/queries.ts`
- [x] Criar `features/civics/` com funções para buscar perguntas aleatórias por formato e categoria

**Commit final:**
```
feat: schema do banco de dados e banco de perguntas USCIS (100 + 128 perguntas populadas)
```

---

## M8 — Motor de Entrevista

**Branch:** `feat/interview-engine`
**Objetivo:** Loop completo de entrevista funcionando — voz do oficial → gravação do usuário → transcrição → avaliação → próxima pergunta.

### Decisões de implementação
- TTS: OpenAI tts-1 (voz `echo`) — áudios das perguntas pré-gerados via `npm run seed:audios` e servidos do Supabase Storage CDN (zero chamadas OpenAI em runtime para perguntas do banco)
- STT: OpenAI Whisper (`whisper-1`)
- Avaliação semântica: GPT-4o-mini — retorna `{ correct, feedback, tip }`
- Voz única: `echo` para todos os usuários (seleção de voz removida da UI)

### Entregas
- [x] Criar `scripts/seed-audios.ts`: gera MP3s via OpenAI tts-1 e faz upload para Supabase Storage (idempotente)
- [x] Criar migration `20260422000009`: colunas `audio_url_onyx`/`audio_url_nova` + bucket `question-audios` com RLS
- [x] Criar `app/api/tts/route.ts`: TTS dinâmico (só saudações) com defesa em profundidade — rejeita textos de perguntas do banco
- [x] Criar `app/api/speech/transcribe/route.ts`: proxy Whisper autenticado
- [x] Criar `features/speech/hooks/useAudioRecorder.ts`: hook MediaRecorder com transcribe integrado
- [x] Criar `features/speech/hooks/useTTS.ts`: `playQuestionAudio` (CDN) + `speakDynamic` (/api/tts)
- [x] Criar `features/evaluation/actions.ts`: avaliação semântica via GPT-4o-mini com fallback exact-match
- [x] Criar `features/interview/hooks/useInterviewSession.ts`: orquestrador completo (idle→play→record→eval→result)
- [x] Criar `features/interview/actions.ts`: `startSession`, `saveAnswer`, `finalizeSession`
- [x] Integrar na tela `/simulation/[sessionId]` com dados reais do banco
- [x] Salvar sessão e respostas no banco (`sessions`, `session_answers`, `user_progress`)
- [x] Implementar lógica de aprovação (6/10 corretas = passed)
- [x] Modo Simulação: avança sempre para a próxima pergunta (acerto ou erro)
- [x] Modo Prática: repete a mesma pergunta até acertar
- [x] Tela de resultado com score real da sessão

**Commit final:**
```
feat: motor de entrevista — loop voz→transcrição→avaliação→feedback integrado e funcional
```

---

## M9 — Progresso & Gamificação

**Branch:** `feat/progress-backend`
**Objetivo:** Histórico real, evolução de score, streak diário e XP calculados a partir do banco.

### Entregas
- [x] Criar `features/progress/actions.ts`: `getDashboardStats`, `getSessionHistory`, `getSessionDetail`, `updateStreak`, `addXP`
- [x] Substituir dados mockados do histórico por dados reais do Supabase
- [x] Implementar cálculo de streak com timezone local (atualizar `streaks` ao finalizar sessão)
- [x] Implementar sistema de XP (10 XP por simulação, +5 por resposta correta) via `features/progress/xp.ts`
- [x] Implementar domínio por tópico (% de acerto agrupado por `category` via `user_progress`)
- [x] Substituir gráficos mockados por dados reais (`StreakCalendar` e `ScoreLineChart` recebem props)
- [x] Dashboard com stats reais (total de sessões, taxa de acerto geral, streak atual, XP com barra de nível)
- [x] Dicas personalizadas baseadas em erros recorrentes (top 3 categorias com menor acerto)
- [x] Streak calendar com dados reais dos últimos 12 semanas
- [x] /history/[sessionId]: revisão completa com transcript, resposta aceita e feedback em PT
- [x] /practice: barra de domínio real por tópico calculada do `user_progress`
- [x] Migration `20260422000011`: coluna `xp` adicionada em `profiles`

**Notas de implementação:**
- `calcLevel` extraído para `features/progress/xp.ts` (funções síncronas não podem estar em arquivos `"use server"`)
- `xpToNext` corrigido para retornar XP restante ao próximo nível (não o total do nível)
- Timezone corrigido: streak usa hora local do servidor, não UTC

**Commit final:**
```
feat: M9 — progresso e gamificação com dados reais do banco
```

---

## M10 — Observabilidade

**Branch:** `feat/observability`
**Objetivo:** ~~PostHog + Sentry~~ — decidido usar apenas logs nativos do Vercel + Supabase. Milestone pulada, incorporada ao M11.

---

## M11 — Deploy & Produção

**Branch:** `feat/production`
**Objetivo:** App em produção no Vercel, domínio configurado, variáveis de ambiente corretas e CI funcionando.

### Entregas
- [x] Criar projeto no Vercel e conectar ao repositório GitHub
- [x] Configurar todas as variáveis de ambiente no Vercel (production + preview)
- [ ] Configurar domínio customizado
- [x] Configurar HTTPS automático via Vercel
- [x] Atualizar URLs de redirect do Supabase Auth para produção
- [x] Verificar `next.config.ts`: otimização de imagens, headers de segurança (CSP, HSTS)
- [x] Testar fluxo completo end-to-end em produção (cadastro → simulação → resultado)
- [ ] Verificar Lighthouse score (meta: Performance > 85, Accessibility > 90)
- [x] Configurar preview deployments para PRs (automático no Vercel)
- [x] Criar `README.md` com instruções de setup local para o projeto

**App em produção:** https://citizenprep-ai.vercel.app

**Notas de implementação:**
- M10 (Observabilidade) pulado — logs nativos do Vercel e Supabase cobrem o essencial na v1
- Auditoria de segurança completa: 11 vulnerabilidades corrigidas (3 Critical, 3 High, 5 Medium)
- `env.ts` com `server-only`, CSP, HSTS, open redirect corrigido, score server-side, rate limit de tamanho no Whisper
- Settings simplificado: nome/email/nível, mudar senha, sair
- Dica de resposta colapsável no modo prática
- Avatar do agente com foto real

**Commit final:**
```
feat: deploy em produção — Vercel, headers de segurança, env vars e fluxo end-to-end validado
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
