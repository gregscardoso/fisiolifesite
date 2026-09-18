# Fisiolife Fisioterapia & Pilates

Site institucional da Fisiolife em Ibiúna, desenvolvido com Next.js, React, TypeScript e Tailwind CSS.

## Desenvolvimento

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Validação e produção

```bash
npm run lint
npm run build
npm start
```

As informações institucionais, links, telefone, endereço e URLs de conversão estão centralizados em `src/lib/site-config.ts` (valores padrão — podem ser sobrescritos pelo painel admin).

## Painel admin (`/admin`)

Permite gerenciar, sem mexer em código:
- Tags de rastreamento (Google Analytics 4, Google Tag Manager, Meta Pixel)
- Dados de contato (telefone, WhatsApp, e-mail, endereço, horários, Instagram)
- Texto e mídia do Hero
- Serviços, depoimentos e galeria de fotos

Guarda tudo em um banco Redis (Upstash) e as imagens enviadas em Vercel Blob — nenhum dos dois é criado automaticamente, é preciso provisionar no dashboard da Vercel (Storage → Create Database) e copiar as variáveis de ambiente para `.env.local`. Veja `.env.example` para a lista completa (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, `BLOB_READ_WRITE_TOKEN`, `ADMIN_PASSWORD`, `SESSION_SECRET`).

Sem essas variáveis configuradas, o site público continua funcionando normalmente com os valores padrão de `content.ts`/`site-config.ts` — só o login do admin (`/admin/login`) não funciona.

**Rascunho e publicação:** as edições feitas no painel ficam em um rascunho (`site:content:draft`/`site:tags:draft` no Redis) e só aparecem no site público depois de clicar em "Publicar alterações" na topbar (que copia pra `site:content:published`/`site:tags:published`). Serviços e depoimentos têm um toggle de visibilidade (Publicado/Oculto, Aprovado/Pendente) — ficam ocultos no site mesmo sem apagar o item. O banner de consentimento de cookies (LGPD), quando ativado em Tags, bloqueia o carregamento de GA4/GTM/Meta Pixel até o visitante aceitar.
