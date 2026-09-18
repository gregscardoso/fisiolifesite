import { WhatsApp } from "./icons";
import { getSiteContent, whatsappUrlFor } from "@/lib/site-data";

export async function WhatsAppFloat() {
  const { contact } = await getSiteContent();
  const whatsappUrl = whatsappUrlFor(contact);
  return <><a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Fale conosco no WhatsApp"><WhatsApp /></a><div className="mobile-conversion-bar"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsApp />Agendar pelo WhatsApp</a></div></>;
}
