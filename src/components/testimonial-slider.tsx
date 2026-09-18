"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "./icons";
import type { Testimonial } from "@/lib/content";

export function TestimonialSlider({ testimonials, feedbackUrl }: { testimonials: Testimonial[]; feedbackUrl: string }) {
  const [index, setIndex] = useState(0);
  const items = [...testimonials, null];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % items.length), 7000);
    return () => window.clearInterval(timer);
  }, [items.length]);

  const move = (direction: number) => setIndex((value) => (value + direction + items.length) % items.length);
  return <div className="testimonials-content">
    <div className="slider-controls"><button type="button" onClick={() => move(-1)} aria-label="Depoimento anterior"><ArrowLeft /></button><button type="button" onClick={() => move(1)} aria-label="Próximo depoimento"><ArrowRight /></button></div>
    <div className="testimonial-viewport"><div className="testimonial-track" style={{ "--slide": index } as React.CSSProperties}>
      {testimonials.map((item) => <figure className="testimonial-card" key={item.name}><div className="quote-mark">“</div><div className="stars" aria-label="5 de 5 estrelas">{[1,2,3,4,5].map((star) => <Star key={star} />)}</div><blockquote>{item.quote}</blockquote><figcaption><span>{item.initials}</span><div><strong>{item.name}</strong><small>{item.meta}</small></div></figcaption></figure>)}
      <article className="feedback-card"><h3>Sua voz é fundamental para o nosso crescimento.</h3><p>Já é paciente da Fisiolife? Conte como foi a sua experiência — isso ajuda outras pessoas a darem o primeiro passo.</p><a href={feedbackUrl} target="_blank" rel="noopener noreferrer">Deixar meu feedback</a></article>
    </div></div>
  </div>;
}
