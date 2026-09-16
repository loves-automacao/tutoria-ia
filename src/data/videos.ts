export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  category: string;
  durationLabel: string;
  /** Marca vídeos recomendados para quem nunca usou IA (RF05). */
  startHere?: boolean;
}

export const categories = [
  "Primeiros passos",
  "Assistentes de IA no dia a dia",
  "Cuidados e segurança",
] as const;

// Lista simples mantida pela equipe (NQ09) — sem área administrativa nesta fase.
// Substituir os `youtubeId` de exemplo pelos IDs reais dos vídeos privados/unlisted.
export const videos: Video[] = [
  {
    id: "1",
    title: "O que é inteligência artificial?",
    youtubeId: "SUBSTITUIR_ID_1",
    category: "Primeiros passos",
    durationLabel: "4 min",
    startHere: true,
  },
  {
    id: "2",
    title: "Como usar o ChatGPT pela primeira vez",
    youtubeId: "SUBSTITUIR_ID_2",
    category: "Primeiros passos",
    durationLabel: "6 min",
    startHere: true,
  },
  {
    id: "3",
    title: "Pedindo receitas e ideias para o dia a dia",
    youtubeId: "SUBSTITUIR_ID_3",
    category: "Assistentes de IA no dia a dia",
    durationLabel: "5 min",
  },
  {
    id: "4",
    title: "Organizando a agenda com ajuda da IA",
    youtubeId: "SUBSTITUIR_ID_4",
    category: "Assistentes de IA no dia a dia",
    durationLabel: "7 min",
  },
  {
    id: "5",
    title: "Como identificar golpes e informações falsas",
    youtubeId: "SUBSTITUIR_ID_5",
    category: "Cuidados e segurança",
    durationLabel: "8 min",
  },
  {
    id: "6",
    title: "Protegendo seus dados pessoais ao usar IA",
    youtubeId: "SUBSTITUIR_ID_6",
    category: "Cuidados e segurança",
    durationLabel: "6 min",
  },
];
