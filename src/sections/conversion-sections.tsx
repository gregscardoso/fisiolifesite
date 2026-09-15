import Image from "next/image";
import { WhatsApp } from "@/components/icons";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { siteConfig } from "@/lib/site-config";

export function CTASection() {
  return <section className="cta-section"><Image src="/images/clinic/atendimento-cta-fisiolife.png" fill sizes="100vw" alt="Atendimento no estúdio da Fisiolife" /><div className="cta-overlay" /><div className="cta-copy shell reveal"><h2>Pronto para cuidar melhor da sua saúde?</h2><p>Agende sua avaliação e dê o primeiro passo para mais movimento, saúde e qualidade de vida.</p><div className="button-row"><a className="button button-gold button-large" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsApp />Agendar pelo WhatsApp</a><a className="button button-light-outline button-large" href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a></div></div></section>;
}

export function GallerySection() {
  return <section id="galeria" className="gallery shell section-pad section-anchor"><div className="section-heading reveal"><span className="kicker">Galeria</span><h2>Um espaço pensado <em>para você.</em></h2></div><GalleryLightbox /></section>;
}

export function LocationSection() {
  return <section id="contato" className="section-white section-anchor"><div className="location shell section-pad"><div className="section-heading reveal"><span className="kicker">Localização</span><h2>Estamos em Ibiúna</h2></div><div className="location-grid reveal"><div className="map-wrap"><iframe src={siteConfig.mapEmbed} title="Mapa da localização da Fisiolife" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><article className="location-card"><h3>{siteConfig.name}</h3><div className="location-details"><div><strong>Endereço</strong><p>{siteConfig.address}<br />{siteConfig.addressDetail}<br />{siteConfig.city}</p></div><div><strong>Horários</strong><p>{siteConfig.hours.weekdays}<br />{siteConfig.hours.saturday}</p></div><div><strong>Contato</strong><p>{siteConfig.phoneDisplay}<br />{siteConfig.email}</p></div></div><div className="location-actions"><a href={siteConfig.directions} target="_blank" rel="noopener noreferrer">Como chegar</a><a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a></div></article></div></div></section>;
}
