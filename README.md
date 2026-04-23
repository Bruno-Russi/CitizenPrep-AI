# CitizenPrep AI

Simulador de entrevista de cidadania americana — prática por voz com feedback em tempo real.

## Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (Auth, Postgres, Storage)
- **AI:** OpenAI Whisper (STT), GPT-4o-mini (avaliação semântica), OpenAI TTS-1

## Setup local

### 1. Instalar dependências

```bash
npm install
```

### 2. Variáveis de ambiente

```bash
cp .env.example .env.local
```

Preencha `.env.local` com:

| Variável | Onde obter |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API |
| `OPENAI_API_KEY` | platform.openai.com → API Keys |
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys |

### 3. Aplicar migrations

```bash
npx supabase db push --linked
```

### 4. Gerar áudios das perguntas (opcional)

```bash
npm run seed:audios
```

> Requer `OPENAI_API_KEY` e as perguntas já no banco. Os MP3s são enviados para o Supabase Storage.

### 5. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Conecte o repositório no [Vercel](https://vercel.com)
2. Adicione as variáveis de ambiente no painel do Vercel (Settings → Environment Variables)
3. Atualize as URLs de redirect no Supabase: Authentication → URL Configuration → `https://seu-dominio.com/auth/callback`
4. O deploy acontece automaticamente a cada push na branch `master`
