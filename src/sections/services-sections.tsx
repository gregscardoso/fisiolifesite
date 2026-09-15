import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import { services } from "@/lib/content";
import { createWhatsAppUrl } from "@/lib/site-config";
import { VideoTour } from "@/components/video-tour";

export function ServicesSection() {
  return (
    <section id="servicos" className="section-white section-anchor">
      <div className="shell section-pad">
        <div className="split-heading reveal"><div><span className="kicker">Tratamentos</span><h2>Tratamentos pensados para o seu <em>bem-estar.</em></h2></div><p>Uma gama completa de serviços de saúde e bem-estar, conduzidos por uma equipe qualificada e adaptados às necessidades de cada paciente.</p></div>
        <div className="services-grid">{services.map((service) => <ServiceCard key={service.name} {...service} />)}</div>
      </div>
    </section>
  );
}

function ServiceCard({ name, description, image }: (typeof services)[number]) {
  const href = createWhatsAppUrl(`Olá! Gostaria de saber mais sobre ${name} na Fisiolife.`);
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
          <div className="structure-main"><Image src="/images/clinic/estudio-pilates.png" fill sizes="(max-width: 760px) 92vw, 48vw" alt="Estúdio de Pilates da Fisiolife" /></div>
          <div className="structure-side"><div className="structure-pair"><div><Image src="/images/clinic/aparelho-pilates-em-uso.png" fill sizes="25vw" alt="Aparelho de Pilates em uso" /></div><div><Image src="/images/clinic/recepcao-fisiolife.png" fill sizes="25vw" alt="Recepção da Fisiolife" /></div></div><div className="equipment-card"><h3>Equipamentos de última geração</h3><p>Acreditamos que a qualidade do atendimento está diretamente ligada à qualidade dos equipamentos. Por isso investimos constantemente em tecnologia de ponta, em um ambiente confortável e com profissionais qualificados acompanhando cada sessão.</p><div><span>· Ambiente acolhedor</span><span>· Atendimento personalizado</span><span>· Equipe qualificada</span></div></div></div>
        </div>
      </div>
    </section>
  );
}
