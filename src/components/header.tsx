"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Phone, WhatsApp } from "./icons";
import { siteConfig } from "@/lib/site-config";

export function Header({ phone, phoneDisplay, whatsappUrl }: { phone: string; phoneDisplay: string; whatsappUrl: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) firstLink.current?.focus();
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <a href="#inicio" className="wordmark" aria-label="Fisiolife - voltar ao início">
          <Image
            src="/images/brand/logo-fisiolife-verde.png"
            width={1905}
            height={826}
            sizes="(max-width: 760px) 132px, 166px"
            alt="Fisiolife Fisioterapia e Pilates"
            className="header-logo"
            priority
          />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {siteConfig.nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="header-phone" href={`tel:${phone}`}><span><Phone /></span>{phoneDisplay}</a>
        <a className="button button-primary header-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsApp />Agendar consulta</a>
        <button className="menu-button" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
          <span className={open ? "is-open" : ""} />
        </button>
      </div>
      <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        {siteConfig.nav.map((item, index) => <a ref={index === 0 ? firstLink : undefined} tabIndex={open ? 0 : -1} key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
        <a tabIndex={open ? 0 : -1} href={`tel:${phone}`}>{phoneDisplay}</a>
      </div>
    </header>
  );
}
