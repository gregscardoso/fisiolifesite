import { getDraftContent } from "@/lib/site-data";
import { TestimonialRow } from "./testimonial-row";
import { AddTestimonialForm } from "./add-testimonial-form";

export default async function DepoimentosPage() {
  const content = await getDraftContent();
  return (
    <div>
      <p className="text-sm text-[#66736C]">Depoimentos aprovados aparecem no carrossel da home.</p>
      <div className="mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        {content.testimonials.map((testimonial, index) => (
          <TestimonialRow key={`${testimonial.name}-${index}`} index={index} testimonial={testimonial} />
        ))}
      </div>
      <div className="mt-4 max-w-xl">
        <AddTestimonialForm />
      </div>
    </div>
  );
}
