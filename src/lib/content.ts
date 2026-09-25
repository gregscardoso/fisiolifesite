export interface Service {
  name: string;
  description: string;
  image: string;
  published: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  meta: string;
  initials: string;
  published: boolean;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  ratio: string;
  label: string;
}

export const galleryLabels = ["Estúdio", "Equipe", "Atendimento", "Recepção", "Equipamentos", "Premiação", "Fachada"] as const;

export const differences = [
  "Atendimento especializado",
  "Profissionais capacitados",
  "Avaliação individualizada",
  "Recuperação mais rápida",
  "Ambiente acolhedor",
  "Estrutura moderna",
  "Tratamento personalizado",
  "Localização privilegiada",
];

export const services: Service[] = [
  { name: "Fisioterapia", description: "Tratamento dedicado a aliviar a dor e recuperar a mobilidade, com protocolos personalizados para cada quadro.", image: "/images/services/fisioterapia.png", published: true },
  { name: "Pilates", description: "Mais força, postura e flexibilidade em aulas personalizadas que preparam o corpo para a rotina.", image: "/images/services/pilates.png", published: true },
  { name: "Quiropraxia", description: "Ajustes e liberação miofascial para devolver liberdade de movimento e aliviar dores da coluna.", image: "/images/services/quiropraxia.jpg", published: true },
  { name: "Pilates terapêutico", description: "Protocolos exclusivos para quem convive com dores na coluna, joelhos ou ombros.", image: "/images/services/pilates-terapeutico-2.jpg", published: true },
  { name: "Pilates para gestantes", description: "Aulas para manter-se ativa com segurança, cuidando do bem-estar físico e mental na gestação.", image: "/images/services/pilates-gestantes.png", published: true },
  { name: "Terapias alternativas", description: "Acupuntura, auriculoterapia, ventosaterapia, reflexologia e massagens para o seu equilíbrio.", image: "/images/services/terapias-alternativas.png", published: true },
  { name: "Drenagens", description: "Sessões de drenagem pós-operatória e para alívio do inchaço causado por retenção de líquidos.", image: "/images/services/drenagens.png", published: true },
];

export const testimonials: Testimonial[] = [
  { quote: "A Ada e sua equipe são incríveis, muito talentosos e muito profissionais! O espaço é lindo e tem muitos aparelhos sensacionais… Com certeza daria mil estrelas.", name: "Celi Rodrigues", meta: "Pilates e fisioterapia", initials: "CR", published: true },
  { quote: "Maravilhoso, um atendimento sensacional, profissionais de qualidade, gostoso fazer Pilates e o atendimento da fisioterapia é excelente.", name: "Liane Azevedo", meta: "Ibiúna / SP", initials: "LA", published: true },
];

export const gallery: GalleryPhoto[] = [
  { src: "/images/gallery/aula-em-grupo-pilates.jpg", alt: "Aula em grupo de Pilates com vista para o horizonte", ratio: "4 / 3", label: "Estúdio" },
  { src: "/images/gallery/atendimento-cadillac-fisiolife.jpg", alt: "Atendimento individualizado no Cadillac", ratio: "4 / 3", label: "Atendimento" },
  { src: "/images/gallery/acompanhamento-individual-reformer.jpg", alt: "Acompanhamento individual no reformer", ratio: "1 / 1", label: "Atendimento" },
  { src: "/images/clinic/equipamentos-reformer-fisiolife.jpg", alt: "Equipamentos de reformer da Fisiolife", ratio: "4 / 3", label: "Equipamentos" },
  { src: "/images/clinic/pilates-em-grupo-fisiolife.jpg", alt: "Aula de Pilates em grupo na Fisiolife", ratio: "1 / 1", label: "Estúdio" },
  { src: "/images/gallery/exercicio-lateral-barril.jpg", alt: "Exercício lateral no barril de Pilates", ratio: "3 / 4", label: "Estúdio" },
  { src: "/images/gallery/alongamento-assistido-reformer.jpg", alt: "Alongamento assistido no reformer", ratio: "4 / 3", label: "Atendimento" },
  { src: "/images/gallery/alongamento-em-grupo.jpg", alt: "Alongamento em grupo na Fisiolife", ratio: "4 / 3", label: "Estúdio" },
];
