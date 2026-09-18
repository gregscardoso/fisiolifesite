import { getDraftContent } from "@/lib/site-data";
import { ServiceRow } from "./service-row";
import { AddServiceForm } from "./add-service-form";

export default async function ServicosPage() {
  const content = await getDraftContent();
  return (
    <div>
      <p className="text-sm text-[#66736C]">Arraste para reordenar. Serviços ocultos não aparecem no site.</p>
      <div className="mt-8 max-w-xl space-y-4">
        {content.services.map((service, index) => (
          <ServiceRow key={`${service.name}-${index}`} index={index} service={service} isFirst={index === 0} isLast={index === content.services.length - 1} />
        ))}
        <AddServiceForm />
      </div>
    </div>
  );
}
