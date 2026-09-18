import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import type { Service } from "@/lib/content";
import { getSiteContent, whatsappUrlFor, type ContactContent } from "@/lib/site-data";
import { VideoTour } from "@/components/video-tour";

export async function ServicesSection() {
  const { services, contact } = await getSiteContent();
  const published = services.filter((service) => service.published);
  return (
    <section id="servicos" className="section-white section-anchor">
      <div className="shell section-pad">
        <div className="split-heading reveal"><div><span className="kicker">Tratamentos</span><h2>Tratamentos pensados para o seu <em>bem-estar.</em></h2></div><p>Uma gama completa de serviços de saúde e bem-estar, conduzidos por uma equipe qualificada e adaptados às necessidades de cada paciente.</p></div>
        <div className="services-grid">{published.map((service) => <ServiceCard key={service.name} contact={contact} {...service} />)}</div>
      </div>
    </section>
  );
}

function ServiceCard({ name, description, image, contact }: Service & { contact: ContactContent }) {
  const href = whatsappUrlFor(contact, `Olá! Gostaria de saber mais sobre ${name} na Fisiolife.`);
  return <a className="service-card reveal" href={href} target="_blank" rel="noopener noreferrer"><div className="service-image"><Image src={image} fill sizes="(max-width: 680px) 92vw, (max-width: 1024px) 45vw, 30vw" alt={name} /></div><div className="service-body"><h3>{name}</h3><p>{description}</p><span>Saiba mais<ArrowRight /></span></div></a>;
}

export function VideoSection() {
  return (
    <section className="video-section shell section-pad">
      <div className="video-grid reveal">
        <VideoTour />
        <div className="section-copy"><span className="kicker">Por dentro da clínica</span><h2>Conheça a Fisiolife por dentro</h2><p>Estamos dentro da Academia Panabianco, em Rio de Una. São ambientes amplos, equipamentos de Pilates completos e salas preparadas para fisioterapia, quiropraxia e terapias alternativas — com privacidade e conforto em cada atendimento.</p><div className="tag-row"><span>Estúdio completo</span><span>Salas reservadas</span><span>Fácil acesso</span></div></div>
      </div>
    </section>
  );
}

export function StructureSection() {
  return (
    <section id="estrutura" className="section-white section-anchor">
      <div className="shell section-pad">
        <div className="section-heading reveal"><span className="kicker">Estrutura</span><h2>Estrutura preparada para <em>cuidar de você.</em></h2></div>
        <div className="structure-grid reveal">
          <div className="structure-video"><video autoPlay muted loop playsInline preload="metadata"><source src="/videos/estrutura-fisiolife-1.mp4" type="video/mp4" /></video></div>
          <div className="structure-video"><video autoPlay muted loop playsInline preload="metadata"><source src="/videos/estrutura-fisiolife-2.mp4" type="video/mp4" /></video></div>
        </div>
        <div className="equipment-card reveal"><h3>Equipamentos de última geração</h3><p>Acreditamos que a qualidade do atendimento está diretamente ligada à qualidade dos equipamentos. Por isso investimos constantemente em tecnologia de ponta, em um ambiente confortável e com profissionais qualificados acompanhando cada sessão.</p><div><span>· Ambiente acolhedor</span><span>· Atendimento personalizado</span><span>· Equipe qualificada</span></div></div>
      </div>
    </section>
  );
}
