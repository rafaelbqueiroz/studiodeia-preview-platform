# Studio de IA · Preview Platform

Plataforma para apresentação de prévias estratégicas de sites criados pelo
Studio de IA. Cada preview é uma demonstração visual personalizada, criada
para mostrar como a presença digital de um negócio local pode gerar mais
contatos, confiança e conversão.

## Stack

- **React 19** — runtime
- **TanStack Start** — SSR, routing, file-based routes
- **Tailwind CSS v4** — estilização com design tokens oklch
- **Framer Motion** — animações de layout e transições
- **Lucide React** — ícones

## Estrutura

```
src/
├── components/preview/     # Componentes do shell de preview
├── data/previews.ts        # Dados centralizados dos clientes
├── routes/                 # Rotas da aplicação (TanStack Start)
│   ├── __root.tsx           # Layout raiz, metadata global
│   ├── index.tsx            # Preview principal (Tochetto)
│   └── sitemap.xml.ts       # Sitemap dinâmico
└── styles.css               # Design system Studio de IA
```

## Status

**MVP em validação comercial.** A plataforma está sendo testada com
previews reais para negócios locais. A arquitetura evolui conforme novos
clientes são adicionados e padrões se consolidam.

## Rodar local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produção
npm run preview    # preview do build
```
