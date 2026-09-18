"use client";

import { useActionState } from "react";
import { addTestimonial, type TestimonialsState } from "./actions";

const initialState: TestimonialsState = {};
const fieldClass = "mt-1 w-full rounded-lg border border-[rgba(28,38,33,0.14)] px-3 py-2 text-sm focus:border-[#1E6848] focus:outline-none focus:ring-1 focus:ring-[#1E6848]";

export function AddTestimonialForm() {
  const [state, formAction, pending] = useActionState(addTestimonial, initialState);

  return (
    <form action={formAction} className="space-y-3 rounded-xl border border-dashed border-[rgba(28,38,33,0.2)] bg-white p-5">
      <p className="text-sm font-bold text-[#1C2621]">Adicionar novo depoimento</p>
      <label className="block text-sm font-medium text-[#1C2621]">
        Depoimento
        <textarea name="quote" required rows={3} className={fieldClass} />
      </label>
      <label className="block text-sm font-medium text-[#1C2621]">
        Nome
        <input name="name" required className={fieldClass} />
      </label>
      <label className="block text-sm font-medium text-[#1C2621]">
        Informação complementar
        <input name="meta" required placeholder="Ex: Pilates e fisioterapia" className={fieldClass} />
      </label>
      {state.error && <p className="text-sm text-[#B23A3A]">{state.error}</p>}
      <button type="submit" disabled={pending} className="rounded-full bg-[#124D35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1E6848] disabled:opacity-60">
        {pending ? "Adicionando…" : "Adicionar depoimento"}
      </button>
    </form>
  );
}
