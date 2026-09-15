const whatsappMessage =
  "Olá! Encontrei o site da Fisiolife e gostaria de agendar uma avaliação.";

export function createWhatsAppUrl(message = whatsappMessage) {
  return `https://wa.me/5515998306552?text=${encodeURIComponent(message)}`;
}

export const siteConfig = {
  name: "Fisiolife Fisioterapia & Pilates",
  shortName: "Fisiolife",
  domain: "https://fisiolifepilates.com.br",
  phone: "+5515998306552",
  phoneDisplay: "(15) 99830-6552",
  email: "contato@fisiolifepilates.com.br",
  address: "Rodovia Júlio Dal Fabbro, Km 1, S/N",
  addressDetail: "Dentro da Academia Panabianco",
  city: "Rio de Una — Ibiúna / SP",
  hours: {
    weekdays: "Segunda a sexta · 07:30 às 19:00",
    saturday: "Sábado · 07:30 às 11:00",
  },
  instagram: "https://www.instagram.com/fisiolife_ibiuna/",
  mapEmbed:
    "https://www.google.com/maps?q=Rodovia%20J%C3%BAlio%20Dal%20Fabbro%2C%20Km%201%2C%20Rio%20de%20Una%2C%20Ibi%C3%BAna%20-%20SP&output=embed",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=Rodovia+J%C3%BAlio+Dal+Fabbro,+Km+1,+Rio+de+Una,+Ibi%C3%BAna+-+SP",
  whatsappMessage,
  whatsappUrl: createWhatsAppUrl(),
  feedbackUrl: createWhatsAppUrl("Olá! Gostaria de deixar um feedback sobre minha experiência na Fisiolife."),
  nav: [
    { label: "Início", href: "#inicio" },
    { label: "A Fisiolife", href: "#fisiolife" },
    { label: "Serviços", href: "#servicos" },
    { label: "Estrutura", href: "#estrutura" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Galeria", href: "#galeria" },
    { label: "Contato", href: "#contato" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
