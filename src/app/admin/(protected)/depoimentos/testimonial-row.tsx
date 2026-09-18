"use client";

import { useActionState } from "react";
import { Star } from "@/components/icons";
import { updateTestimonial, removeTestimonial, toggleTestimonialPublished, type TestimonialsState } from "./actions";
import type { Testimonial } from "@/lib/content";

const initialState: TestimonialsState = {};
const fieldClass = "mt-1 w-full rounded-lg border border-[rgba(28,38,33,0.14)] px-3 py-2 text-sm focus:border-[#1E6848] focus:outline-none focus:ring-1 focus:ring-[#1E6848]";

export function TestimonialRow({ index, testimonial }: { index: number; testimonial: Testimonial }) {
  const boundUpdate = updateTestimonial.bind(null, index);
  const [state, formAction, pending] = useActionState(boundUpdate, initialState);

  return (
    <div className="rounded-xl border border-[rgba(28,38,33,0.08)] bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E8F1EC] text-sm font-bold text-[#1E6848]">{testimonial.initials}</span>
          <div className="flex gap-0.5 text-[#C7A43A]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4" />)}</div>
        </div>
        <form action={toggleTestimonialPublished.bind(null, index)}>
          <button
            type="submit"
            className={`rounded-full px-3 py-1 text-xs font-semibold ${testimonial.published ? "bg-[rgba(30,104,72,0.1)] text-[#1E6848]" : "bg-[rgba(199,164,58,0.14)] text-[#8A7530]"}`}
          >
            {testimonial.published ? "Aprovado" : "Pendente"}
          </button>
        </form>
      </div>
      <form action={formAction} className="space-y-3">
        <label className="block text-sm font-medium text-[#1C2621]">
          Depoimento
          <textarea name="quote" defaultValue={testimonial.quote} rows={3} className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-[#1C2621]">
          Nome
          <input name="name" defaultValue={testimonial.name} className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-[#1C2621]">
          Informação complementar
          <input name="meta" defaultValue={testimonial.meta} placeholder="Ex: Pilates e fisioterapia" className={fieldClass} />
        </label>
        {state.error && <p className="text-sm text-[#B23A3A]">{state.error}</p>}
        {state.success && <p className="text-sm text-[#1E6848]">Salvo.</p>}
        <button type="submit" disabled={pending} className="rounded-full bg-[#124D35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1E6848] disabled:opacity-60">
          {pending ? "Salvando…" : "Salvar"}
        </button>
      </form>
      <div className="mt-3 border-t border-[rgba(28,38,33,0.08)] pt-3">
        <form action={removeTestimonial.bind(null, index)}>
          <button type="submit" className="rounded-lg border border-[rgba(178,58,58,0.3)] px-3 py-1.5 text-xs font-medium text-[#B23A3A] hover:bg-[rgba(178,58,58,0.06)]">Remover</button>
        </form>
      </div>
    </div>
  );
}
