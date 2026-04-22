# CitizenPrep AI — Product Requirements Document

## 1. CONTEXT & PROBLEM

Mais de 900 mil imigrantes passam pela entrevista de naturalização americana todos os anos, e a maioria falha em um ponto central: a prova é oral, em inglês, com um oficial de imigração real. Os recursos de estudo disponíveis hoje (flashcards, PDFs, apps de múltipla escolha, vídeos no YouTube) não simulam essa pressão. O candidato memoriza respostas escritas, mas na hora de falar em voz alta, sob estresse, com sotaque e dificuldade de compreensão auditiva, trava.

Some a isso: falta de feedback personalizado sobre quais perguntas a pessoa erra mais, ausência de treino de pronúncia, e uma ansiedade enorme pelo peso do momento (custo de US$ 760 da aplicação, espera de 1-2 anos, risco de reprovação). O resultado é que pessoas que sabem o conteúdo falham na entrevista porque nunca praticaram do jeito que vão ser testadas.

## 2. PROPOSED SOLUTION

Um app que funciona como um simulador realista de entrevista de naturalização, onde uma IA atua como oficial de imigração USCIS. O fluxo é conversacional e 100% por voz: o "oficial" faz a pergunta em áudio (voz humana natural), o usuário responde falando no microfone, e a IA transcreve, avalia a resposta em tempo real e segue para a próxima pergunta — exatamente como na entrevista real.

Ao final da simulação, o usuário recebe: quantas perguntas acertou das 10 (ou 20 no novo formato 2025), score final (passou/reprovou segundo o critério oficial da USCIS), lista de perguntas erradas com a resposta correta, dicas personalizadas de pronúncia e compreensão, e um plano de estudo focado nos pontos fracos. Tem modo Prática (pergunta a pergunta, sem pressão) e modo Simulação (entrevista completa cronometrada, sem pausa, igual à real).

## 3. FUNCTIONAL REQUIREMENTS

- Login e Autenticação
- Dashboards
- Parte premium (paga)
- Notificações
- Chat / Mensagens
- Relatórios e Exportação
- Integrações (API)
- Busca e Filtros
- Landing Page
- Onboarding do Usuário

Reconhecimento de voz (Speech-to-Text) para capturar as respostas do usuário em inglês, com tolerância a sotaque. Síntese de voz (Text-to-Speech) realista para a voz do oficial de imigração, com opção de escolher entre voz masculina/feminina e velocidade de fala. Banco completo e atualizado das 100 perguntas oficiais de civics da USCIS (mais a versão 2025 de 128 perguntas). Avaliação semântica por IA das respostas faladas — não precisa ser palavra por palavra, a IA entende se o conteúdo está correto. Módulos de Reading (ler frase em voz alta) e Writing (ditado) que replicam a prova de inglês. Modo Prática (uma pergunta por vez, sem cronômetro) e Modo Simulação (entrevista completa e cronometrada, 10 perguntas com critério de aprovação 6/10). Histórico detalhado de simulações com gráfico de evolução. Dicas personalizadas baseadas nos erros recorrentes ("você errou 4 vezes perguntas sobre os founding fathers — revisar este tópico"). Suporte a tradução de instruções no onboarding (espanhol, português, mandarim, árabe, vietnamita — top 5 idiomas de candidatos). Streak diário e gamificação leve para manter engajamento. Plano free com 3 simulações/semana e plano premium com simulações ilimitadas, análise detalhada de pronúncia e modo "entrevista cara a cara" com vídeo.

## 4. USER PERSONAS

**Candidato à Cidadania (usuário principal)** — Residente permanente (green card) nos EUA há 3 a 5 anos, entre 25 e 60 anos, inglês como segunda língua, nervoso com a entrevista. Estuda no celular nos intervalos do trabalho ou à noite. Tem alta motivação (quer passar a qualquer custo) mas tempo limitado. Pode ter pouca familiaridade com tecnologia.

## 5. TECHNICAL STACK

- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Supabase
- Stripe
- Vercel
- Claude Code
- Node.js
- PostgreSQL
- TypeScript
- Resend (e-mails)

OpenAI Whisper API para Speech-to-Text (melhor custo-benefício para inglês com sotaque). ElevenLabs para Text-to-Speech da voz do oficial de imigração (vozes mais realistas do mercado, com opção de voz masculina/feminina americana). Claude API (Anthropic) para avaliação semântica das respostas e geração de dicas personalizadas. Supabase Auth para login, Supabase Storage para armazenar áudios das respostas, Supabase Realtime para dashboard ao vivo. Stripe Subscriptions para o plano premium mensal/anual. PostHog para analytics de uso e funil de conversão. Sentry para monitoramento de erros. Expo / React Native numa fase posterior para app mobile nativo (MVP pode ser PWA responsivo via Next.js).

## 6. DESIGN LANGUAGE

**Speak** (app de inglês por IA) — Referência principal. Conversação por voz com IA, interface minimalista que tira o foco da tela e coloca na fala, feedback visual de onda de áudio enquanto o usuário fala, correções leves e encorajadoras. É exatamente o feel que queremos.

**Duolingo** — Gamificação bem feita (streak, XP, trilha de progresso), feedback positivo que reduz a ansiedade de errar, ilustrações amigáveis que humanizam um processo estressante.

**Headspace** — Paleta calma, tipografia generosa, muito espaço em branco. Importante porque o contexto de preparação para entrevista de imigração carrega ansiedade — o design precisa reduzir, não aumentar.

**ELSA Speak** — Referência para o módulo de pronúncia: feedback fonético visual mostrando exatamente quais sons o usuário pronunciou errado.

**Linear** — Para a área de admin/dashboard de tutores: limpa, rápida, tipografia impecável, uso inteligente de cores para status.

## 7. PROCESSO

- Dividir o build em marcos lógicos (etapas)
- Cada marco deve ser um incremento entregável
- Priorizar as funcionalidades centrais primeiro, depois iterar
- Testar cada marco antes de avançar para o próximo
