import Image from "next/image";
import { Instagram, WhatsApp } from "./icons";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid shell">
        <div>
          <Image src="/images/brand/logo-fisiolife-branco.png" width={801} height={348} alt="Fisiolife Fisioterapia e Pilates" className="footer-logo" />
          <p>Fisioterapia, Pilates e quiropraxia com atendimento individualizado em Ibiúna.</p>
          <div className="socials">
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da Fisiolife"><WhatsApp /></a>
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Fisiolife"><Instagram /></a>
          </div>
        </div>
        <FooterColumn title="Navegação" links={siteConfig.nav.filter(({ label }) => !["Serviços", "Contato"].includes(label))} />
        <FooterColumn title="Tratamentos" links={["Fisioterapia", "Quiropraxia", "Pilates", "Pilates terapêutico", "Terapias alternativas", "Drenagens"].map((label) => ({ label, href: "#servicos" }))} />
        <div className="footer-column"><h3>Contato</h3><div className="footer-links contact-links"><a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><span>{siteConfig.address}<br />{siteConfig.city}</span></div></div>
      </div>
      <div className="footer-bottom shell"><span>© 2026 Fisiolife Fisioterapia &amp; Pilates — Todos os direitos reservados.</span><span>Desenvolvido por Gregory Cardoso.</span></div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return <div className="footer-column"><h3>{title}</h3><div className="footer-links">{links.map((item) => <a key={`${item.href}-${item.label}`} href={item.href}>{item.label}</a>)}</div></div>;
}
