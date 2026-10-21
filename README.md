This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Quadro de certificados (pins)

O quadro de pins usa os certificados de `public/certificados` como fotos emolduradas
presas por um tarugador metálico. Para não pesar na página, cada certificado vira
uma miniatura WebP (~3 kB) em `public/pins` — os PNGs originais (300–600 kB) só são
baixados quando o visitante abre o certificado completo.

```bash
pnpm assets:pins   # regenera as miniaturas e src/lib/certificados.data.ts
```

- **Entradas:** `public/certificados/*.png` + os metadados em `scripts/certificados.json`
  (título, emissor, data e o recorte de interesse de cada família de certificado).
- **Saídas:** `public/pins/*-160.webp`, `public/pins/*-320.webp` e
  `src/lib/certificados.data.ts` (gerado — não editar à mão).

Ao adicionar um certificado novo: coloque o PNG em `public/certificados`, acrescente a
entrada em `scripts/certificados.json` e rode `pnpm assets:pins`.

### Composição inicial do quadro

O quadro começa com **11 pins** já pendurados, definidos em `SEED_PLACEMENTS`
(`src/lib/pins.ts`). Os demais ficam guardados na caixa, para o visitante pendurar
como quiser. Ao mudar essa lista, suba o `BOARD_VERSION` e a `STORAGE_KEY`
(`src/lib/board-state.ts`) — a chave antiga no `localStorage` é ignorada e todos
veem a nova composição inicial.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
