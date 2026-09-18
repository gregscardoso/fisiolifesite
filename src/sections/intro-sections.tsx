import Image from "next/image";
import { ArrowRight, Check, Clock, Heart, Phone, Pin, WhatsApp } from "@/components/icons";
import { differences } from "@/lib/content";
import { getSiteContent, whatsappUrlFor } from "@/lib/site-data";

export async function Hero() {
  const { hero, contact } = await getSiteContent();
  const whatsappUrl = whatsappUrlFor(contact);
  return (
    <section id="inicio" className="hero shell section-anchor">
      <div className="hero-copy reveal">
        <span className="eyebrow-pill"><i />{hero.eyebrow}</span>
        <h1>{hero.titlePrefix}<em>{hero.titleEmphasis}</em></h1>
        <p>{hero.subtitle}</p>
        <div className="button-row">
          <a className="button button-primary button-large" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Agendar consulta<ArrowRight /></a>
          <a className="button button-outline button-large" href="#servicos">Conhecer tratamentos</a>
        </div>
        <div className="quick-contact"><span><WhatsApp /></span><div><small>Atendimento rápido</small><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">{contact.phoneDisplay}</a></div></div>
        <div className="hero-numbers">
          <div><strong>+10</strong><span>anos de experiência</span></div>
          <div><strong>+1.000</strong><span>pacientes atendidos</span></div>
          <div><strong>98%</strong><span>de satisfação</span></div>
        </div>
      </div>
      <div className="hero-visual reveal">
        <i className="hero-shape hero-shape-fill" /><i className="hero-shape hero-shape-ring" />
        <div className="hero-image"><video autoPlay muted loop playsInline preload="auto" poster={hero.posterImage} aria-label={hero.eyebrow}><source src={hero.videoUrl} type="video/mp4" /></video></div>
        <div className="hero-badge"><span><Heart /></span><div><strong>Atendimento humanizado</strong><small>Profissionais especializados</small></div></div>
      </div>
    </section>
  );
}

export async function TrustBar() {
  const { contact } = await getSiteContent();
  const whatsappUrl = whatsappUrlFor(contact);
  const items = [
    { icon: <Pin />, label: "Localização", content: <>{contact.address}<br />{contact.city}</> },
    { icon: <Clock />, label: "Horários", content: <>{contact.hoursWeekdays}<br />{contact.hoursSaturday}<br />Domingo · {contact.hoursSunday}</> },
    { icon: <Phone />, label: "Contato", content: <>{contact.phoneDisplay}<br /><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Falar no WhatsApp →</a></> },
  ];
  return <section className="trust-wrap shell" aria-label="Informações de atendimento"><div className="trust-bar reveal">{items.map((item) => <article key={item.label}><span className="soft-icon">{item.icon}</span><div><h2>{item.label}</h2><p>{item.content}</p></div></article>)}</div></section>;
}

export function AboutSection() {
  return (
    <section id="fisiolife" className="about shell section-pad section-anchor">
      <div className="about-grid">
        <div className="section-copy reveal">
          <span className="kicker">Por que a Fisiolife</span>
          <h2>Cuidado que começa por <em>ouvir você.</em></h2>
          <p>Nossa missão é promover saúde e bem-estar por meio da fisioterapia, quiropraxia e Pilates. Cada paciente passa por uma avaliação individual, e o tratamento é construído a partir dela — no seu ritmo, com acompanhamento próximo do início ao fim.</p>
          <div className="check-grid">{differences.map((item) => <div key={item}><span><Check /></span>{item}</div>)}</div>
        </div>
        <div className="about-visual reveal">
          <div className="about-main"><Image src="/images/clinic/pilates-em-grupo-fisiolife.jpg" fill sizes="(max-width: 760px) 92vw, 46vw" alt="Aula de Pilates em grupo na Fisiolife" /></div>
          <div className="about-small"><Image src="/images/clinic/equipamentos-reformer-fisiolife.jpg" fill sizes="240px" alt="Estúdio com equipamentos de Pilates" /></div>
          <div className="experience-badge"><strong>+10 anos</strong><span>cuidando de pacientes em Ibiúna e região</span></div>
        </div>
      </div>
    </section>
  );
}
