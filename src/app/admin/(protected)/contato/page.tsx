import { getDraftContent } from "@/lib/site-data";
import { ContactForm } from "./contact-form";

export default async function ContatoPage() {
  const content = await getDraftContent();
  return (
    <div>
      <p className="text-sm text-[#66736C]">Esses dados aparecem no cabeçalho, rodapé e seção de localização do site.</p>
      <div className="mt-8">
        <ContactForm initial={content.contact} />
      </div>
    </div>
  );
}
