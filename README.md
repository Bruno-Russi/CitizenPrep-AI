# CitizenPrep AI

**Simulador de entrevista de cidadania americana com prática por voz e feedback em tempo real.**

Prepare-se para o exame de naturalização dos EUA praticando com um agente virtual que faz as 100 perguntas oficiais do USCIS — você responde por voz, recebe correção imediata e acompanha sua evolução ao longo do tempo.

🌐 **[citizenprep-ai.vercel.app](https://citizenprep-ai.vercel.app)**

---

## Funcionalidades

- **Simulação Oficial** — 10 perguntas aleatórias, exatamente como na entrevista real. Precisa acertar 6 para passar.
- **Modo Prática** — Repete a pergunta até você acertar, com dicas de resposta visíveis.
- **Praticar por Tópico** — Foque nas categorias onde você tem mais dificuldade.
- **Resposta por voz** — Fale sua resposta em inglês; o áudio é transcrito e avaliado semanticamente.
- **Feedback em tempo real** — Sabe na hora se acertou, com a resposta correta e uma dica explicativa.
- **Histórico completo** — Acompanhe todas as sessões, pontuações e evolução ao longo do tempo.
- **Sistema de XP e nível** — Ganhe experiência a cada sessão e suba de nível.
- **Conquistas** — Desbloqueie badges conforme você pratica e evolui.
- **Streak diário** — Mantenha uma sequência de dias praticando.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS |
| Autenticação | Supabase Auth (email + OAuth) |
| Banco de dados | Supabase Postgres com RLS |
| Voz (STT) | OpenAI Whisper |
| Avaliação | Claude (Anthropic) — avaliação semântica das respostas |
| Narração (TTS) | OpenAI TTS-1 (voz pré-gerada por pergunta) |
| Deploy | Vercel |

---

## Setup local

### Pré-requisitos

- Node.js 20+
- Conta no [Supabase](https://supabase.com)
- Chave de API da [OpenAI](https://platform.openai.com)
- Chave de API da [Anthropic](https://console.anthropic.com)

### 1. Instalar dependências

```bash
npm install
```

### 2. Variáveis de ambiente

```bash
cp .env.example .env.local
```

Preencha `.env.local` com as seguintes variáveis:

| Variável | Onde obter |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API |
| `OPENAI_API_KEY` | platform.openai.com → API Keys |
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys |

### 3. Aplicar migrations no banco

```bash
npx supabase db push --linked
```

### 4. Gerar áudios das perguntas (opcional)

Os áudios das 100 perguntas são pré-gerados com OpenAI TTS e armazenados no Supabase Storage. Para gerar:

```bash
npm run seed:audios
```

> Requer `OPENAI_API_KEY` e as perguntas já inseridas no banco.

### 5. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Deploy (Vercel)

1. Conecte o repositório no [Vercel](https://vercel.com)
2. Adicione todas as variáveis de ambiente em **Settings → Environment Variables**
3. Configure a URL de callback no Supabase: **Authentication → URL Configuration**
   ```
   https://seu-dominio.vercel.app/auth/callback
   ```
4. O deploy acontece automaticamente a cada push na branch `master`

---

## Estrutura do projeto

```
src/
├── app/
│   ├── (auth)/          # Login, cadastro, callback OAuth
│   ├── (dashboard)/     # Dashboard, simulação, histórico, configurações
│   └── api/             # Endpoints de transcrição de voz
├── components/
│   ├── interview/       # Avatar do agente, botão de gravação, waveform
│   ├── layout/          # Sidebar, bottom nav
│   └── progress/        # Calendário de streak, gráfico de pontuação
├── features/
│   ├── civics/          # Perguntas e traduções PT-BR
│   ├── evaluation/      # Avaliação semântica via Claude
│   ├── interview/       # Hooks e actions da sessão de entrevista
│   ├── progress/        # XP, streak, histórico, conquistas
│   └── speech/          # TTS (reprodução) e STT (gravação/transcrição)
├── lib/
│   └── supabase/        # Clients browser, server e admin
└── types/               # Tipos TypeScript do schema Supabase
```

---

## Como funciona a avaliação

As respostas do usuário são avaliadas semanticamente — não precisa ser palavra por palavra. O Claude compara a resposta falada com as respostas aceitas pelo USCIS e determina se está correta, fornecendo feedback explicativo e uma dica de estudo quando errada.

---

## Licença

MIT
