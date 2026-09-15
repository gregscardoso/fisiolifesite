export interface Service {
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  meta: string;
  initials: string;
}

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
  { name: "Fisioterapia", description: "Tratamento dedicado a aliviar a dor e recuperar a mobilidade, com protocolos personalizados para cada quadro.", image: "/images/services/fisioterapia.png" },
  { name: "Pilates", description: "Mais força, postura e flexibilidade em aulas personalizadas que preparam o corpo para a rotina.", image: "/images/services/pilates.png" },
  { name: "Quiropraxia", description: "Ajustes e liberação miofascial para devolver liberdade de movimento e aliviar dores da coluna.", image: "/images/services/quiropraxia.png" },
  { name: "Pilates terapêutico", description: "Protocolos exclusivos para quem convive com dores na coluna, joelhos ou ombros.", image: "/images/services/pilates-terapeutico.png" },
  { name: "Pilates para gestantes", description: "Aulas para manter-se ativa com segurança, cuidando do bem-estar físico e mental na gestação.", image: "/images/services/pilates-gestantes.png" },
  { name: "Terapias alternativas", description: "Acupuntura, auriculoterapia, ventosaterapia, reflexologia e massagens para o seu equilíbrio.", image: "/images/services/terapias-alternativas.png" },
  { name: "Drenagens", description: "Sessões de drenagem pós-operatória e para alívio do inchaço causado por retenção de líquidos.", image: "/images/services/drenagens.png" },
];

export const testimonials: Testimonial[] = [
  { quote: "A Ada e sua equipe são incríveis, muito talentosos e muito profissionais! O espaço é lindo e tem muitos aparelhos sensacionais… Com certeza daria mil estrelas.", name: "Celi Rodrigues", meta: "Pilates e fisioterapia", initials: "CR" },
  { quote: "Maravilhoso, um atendimento sensacional, profissionais de qualidade, gostoso fazer Pilates e o atendimento da fisioterapia é excelente.", name: "Liane Azevedo", meta: "Ibiúna / SP", initials: "LA" },
];

export const gallery = [
  { src: "/images/gallery/recepcao-clinica.png", alt: "Recepção da clínica Fisiolife", ratio: "4 / 3" },
  { src: "/images/gallery/exercicio-pilates-invertido.png", alt: "Exercício de Pilates com acompanhamento", ratio: "3 / 4" },
  { src: "/images/gallery/pilates-barril.png", alt: "Exercício no barril de Pilates", ratio: "4 / 3" },
  { src: "/images/gallery/acompanhamento-pilates.png", alt: "Acompanhamento profissional durante exercício", ratio: "1 / 1" },
  { src: "/images/gallery/equipamentos-estudio.png", alt: "Equipamentos do estúdio de Pilates", ratio: "3 / 4" },
  { src: "/images/gallery/pilates-assistido.png", alt: "Aula de Pilates assistida", ratio: "4 / 3" },
  { src: "/images/gallery/exercicio-reformer.png", alt: "Exercício no reformer", ratio: "1 / 1" },
  { src: "/images/gallery/pilates-flexibilidade.png", alt: "Exercício de flexibilidade no Pilates", ratio: "3 / 4" },
  { src: "/images/gallery/aula-pilates.png", alt: "Aula individualizada de Pilates", ratio: "4 / 3" },
  { src: "/images/gallery/estrutura-interna.png", alt: "Estrutura interna da Fisiolife", ratio: "1 / 1" },
  { src: "/images/gallery/alongamento-pilates.png", alt: "Alongamento em equipamento de Pilates", ratio: "4 / 3" },
];
