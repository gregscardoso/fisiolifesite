import Image from "next/image";
import { Star } from "@/components/icons";
import { Stats } from "@/components/stats";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { siteConfig } from "@/lib/site-config";

export function StatsSection() { return <Stats />; }

export function HistorySection() {
  return <section className="history shell section-pad"><div className="history-grid">
    <div className="history-visual reveal"><div className="award-image"><Image src="/images/clinic/equipe-premio-fisiolife.png" fill sizes="(max-width: 760px) 44vw, 24vw" alt="Equipe Fisiolife com prêmio de qualidade no atendimento" /></div><div className="history-side"><div className="professional-image"><Image src="/images/clinic/fisioterapeuta-atendimento.png" fill sizes="(max-width: 760px) 44vw, 24vw" alt="Fisioterapeuta em atendimento" /></div><div className="award-card"><div className="stars">{[1,2,3,4,5].map((star) => <Star key={star} />)}</div><strong>Prêmio de qualidade no atendimento</strong><span>Reconhecimento construído com dedicação</span></div></div></div>
    <div className="section-copy reveal"><span className="kicker">Nossa história</span><h2>Cuidado que <em>transforma vidas.</em></h2><p>Desde a nossa fundação nos dedicamos a oferecer cuidados de saúde excepcionais e a promover mudanças positivas na vida das pessoas. Cada membro da equipe é escolhido pela paixão por saúde e bem-estar — fisioterapeutas, quiropraxistas, instrutores de Pilates e terapeutas.</p><p>A dedicação da equipe à excelência no atendimento já foi reconhecida com um prêmio de qualidade. Nosso objetivo segue o mesmo: um ambiente acolhedor e seguro, onde cada paciente se sinta valorizado e compreendido.</p><a className="button button-primary button-large history-cta" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Agendar uma avaliação</a></div>
  </div></section>;
}

export function TestimonialsSection() {
  return <section id="depoimentos" className="section-white section-anchor"><div className="testimonials shell section-pad"><div className="testimonial-heading reveal"><span className="kicker">Depoimentos</span><h2>Histórias de quem confia na Fisiolife</h2></div><TestimonialSlider /></div></section>;
}
