import Image from "next/image";
import { ArrowRight, Check, Clock, Heart, Phone, Pin, WhatsApp } from "@/components/icons";
import { differences } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section id="inicio" className="hero shell section-anchor">
      <div className="hero-copy reveal">
        <span className="eyebrow-pill"><i />Fisioterapia &amp; Pilates em Ibiúna</span>
        <h1>Movimento, saúde e qualidade de vida <em>começam aqui.</em></h1>
        <p>A Fisiolife reúne fisioterapia, Pilates, quiropraxia e terapias alternativas em um atendimento individualizado, com avaliação personalizada e uma equipe que acompanha cada etapa da sua recuperação.</p>
        <div className="button-row">
          <a className="button button-primary button-large" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Agendar consulta<ArrowRight /></a>
          <a className="button button-outline button-large" href="#servicos">Conhecer tratamentos</a>
        </div>
        <div className="quick-contact"><span><WhatsApp /></span><div><small>Atendimento rápido</small><a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">{siteConfig.phoneDisplay}</a></div></div>
        <div className="hero-numbers">
          <div><strong>+10</strong><span>anos de experiência</span></div>
          <div><strong>+1.000</strong><span>pacientes atendidos</span></div>
          <div><strong>98%</strong><span>de satisfação</span></div>
        </div>
      </div>
      <div className="hero-visual reveal">
        <i className="hero-shape hero-shape-fill" /><i className="hero-shape hero-shape-ring" />
        <div className="hero-image"><Image src="/images/hero/estudio-pilates-fisiolife.png" fill priority sizes="(max-width: 760px) 92vw, (max-width: 1280px) 46vw, 560px" alt="Estúdio de Pilates da Fisiolife em Ibiúna" /></div>
        <div className="hero-badge"><span><Heart /></span><div><strong>Atendimento humanizado</strong><small>Profissionais especializados</small></div></div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const items = [
    { icon: <Pin />, label: "Localização", content: <>{siteConfig.address}<br />{siteConfig.city}</> },
    { icon: <Clock />, label: "Horários", content: <>Seg a Sex · 07:30 às 19:00<br />Sábado · 07:30 às 11:00</> },
    { icon: <Phone />, label: "Contato", content: <>{siteConfig.phoneDisplay}<br /><a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Falar no WhatsApp →</a></> },
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
          <div className="about-main"><Image src="/images/clinic/atendimento-fisioterapia-fisiolife.png" fill sizes="(max-width: 760px) 92vw, 46vw" alt="Atendimento de fisioterapia na Fisiolife" /></div>
          <div className="about-small"><Image src="/images/clinic/equipamentos-pilates-fisiolife.png" fill sizes="240px" alt="Estúdio com equipamentos de Pilates" /></div>
          <div className="experience-badge"><strong>+10 anos</strong><span>cuidando de pacientes em Ibiúna e região</span></div>
        </div>
      </div>
    </section>
  );
}
