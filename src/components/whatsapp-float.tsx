import { WhatsApp } from "./icons";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppFloat() {
  return <><a className="whatsapp-float" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Fale conosco no WhatsApp"><WhatsApp /></a><div className="mobile-conversion-bar"><a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsApp />Agendar pelo WhatsApp</a></div></>;
}
