# Tutoria IA

Site de vídeos tutoriais de inteligência artificial para mulheres, com foco em
acessibilidade e simplicidade. Ver `agent.md` para os requisitos completos.

## Stack

- [Astro](https://astro.build) — geração estática, mínimo de JS no cliente.
- [Vitest](https://vitest.dev) — testes unitários (lógica de busca).
- [Playwright](https://playwright.dev) — testes end-to-end (Chromium, WebKit, mobile).

## Estrutura

```
src/
├── components/
│   ├── VideoCard.astro      # card individual de vídeo
│   └── VideoCatalog.astro   # busca + agrupamento por categoria + grid
├── data/videos.ts           # lista de vídeos mantida pela equipe (RF/NQ09)
├── lib/search.ts            # normalização de texto e filtro de busca
├── pages/index.astro        # página principal (player + catálogo)
└── styles/global.css        # estilos globais e acessíveis
```

## Comandos

| Comando              | Ação                                          |
| :------------------- | :--------------------------------------------- |
| `npm install`         | Instala as dependências                        |
| `npm run dev`         | Inicia o servidor de desenvolvimento            |
| `npm run build`       | Gera o build de produção em `./dist/`           |
| `npm run preview`     | Serve o build de produção localmente            |
| `npm run test`        | Roda os testes unitários (Vitest)               |
| `npm run test:watch`  | Testes unitários em modo watch                  |
| `npm run test:e2e`    | Roda os testes end-to-end (Playwright)          |
| `npx astro check`     | Verificação de tipos                            |

### Rodando os testes E2E pela primeira vez

O Playwright precisa de dependências de sistema para os navegadores. Em
Linux, instale-as uma vez com:

```sh
sudo npx playwright install-deps
```

## Pendências antes de publicar

- Substituir os `youtubeId` de exemplo em `src/data/videos.ts` (valores
  `SUBSTITUIR_ID_*`) pelos IDs reais dos vídeos privados/unlisted no YouTube.
- Rodar a auditoria de acessibilidade (Lighthouse ≥ 90) e o teste manual com
  uma usuária idosa, conforme critérios de aceite em `agent.md`.
