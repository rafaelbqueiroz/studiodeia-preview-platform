export interface PreviewClient {
  slug: string;
  name: string;
  previewUrl: string;
  logoUrl: string;
  whatsapp: string;
  objective: string;
  diagnosisCards: {
    eyebrow: string;
    title: string;
    body: string;
    accent?: boolean;
  }[];
  nicho: string;
}

export const tochettoPreview: PreviewClient = {
  slug: "tochetto",
  name: "Tochetto",
  previewUrl: "https://tochetto.sigaseuprojeto.online/",
  logoUrl: "https://studiodeia.com.br/images/logo.svg",
  whatsapp:
    "https://wa.me/5554993461322?text=Ol%C3%A1%2C%20vi%20a%20pr%C3%A9via%20do%20site%20da%20Tochetto%20e%20quero%20conversar%20sobre%20a%20publica%C3%A7%C3%A3o.",
  objective:
    "posicionamento premium, confiança técnica e pedidos qualificados de orçamento",
  nicho: "lareiras e calefação",
  diagnosisCards: [
    {
      eyebrow: "01 · Diagnóstico",
      title: "O que observamos",
      body: "A Tochetto atua em um segmento em que o cliente precisa confiar antes de pedir orçamento. Lareiras, calefação e soluções arquitetônicas envolvem segurança, estética, investimento e escolha técnica.",
    },
    {
      eyebrow: "02 · Criação",
      title: "O que foi criado",
      body: "Uma presença digital com visual premium, navegação clara, foco em produtos, tecnologia, arquitetos e contato, além de chamada direta para orçamento.",
    },
    {
      eyebrow: "03 · Resultado",
      title: "Como ajuda a vender",
      body: "Ajuda a aumentar percepção de valor, reduzir dúvidas antes do primeiro contato, gerar pedidos mais qualificados e apoiar campanhas de Google, Instagram e indicações.",
    },
    {
      eyebrow: "04 · Próximo passo",
      title: "Publicar com ajustes",
      body: "Podemos ajustar textos, imagens, WhatsApp, domínio e publicar a versão final com estrutura preparada para campanhas e SEO local.",
      accent: true,
    },
  ],
};

export const previews: Record<string, PreviewClient> = {
  tochetto: tochettoPreview,
};

export function getPreviewBySlug(slug: string): PreviewClient | undefined {
  return previews[slug];
}

export function getAllSlugs(): { slug: string; name: string }[] {
  return Object.values(previews).map((p) => ({ slug: p.slug, name: p.name }));
}
