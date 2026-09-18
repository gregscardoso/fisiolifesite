"use client";

import { useActionState } from "react";
import { saveContact, type ContactState } from "./actions";
import type { ContactContent } from "@/lib/site-data";

const initialState: ContactState = {};
const fieldClass = "mt-1 w-full rounded-lg border border-[rgba(28,38,33,0.14)] px-3 py-2 text-sm focus:border-[#1E6848] focus:outline-none focus:ring-1 focus:ring-[#1E6848]";
const cardClass = "space-y-4 rounded-xl border border-[rgba(28,38,33,0.08)] bg-white p-5";

const contactFields: { name: keyof ContactContent; label: string; hint?: string }[] = [
  { name: "phone", label: "Telefone (formato internacional)", hint: "Ex: +5515998306552 — usado nos links de ligar/WhatsApp" },
  { name: "phoneDisplay", label: "Telefone (exibido no site)", hint: "Ex: (15) 99830-6552" },
  { name: "whatsappMessage", label: "Mensagem padrão do WhatsApp" },
  { name: "email", label: "E-mail" },
  { name: "address", label: "Endereço" },
  { name: "addressDetail", label: "Complemento do endereço" },
  { name: "city", label: "Cidade" },
  { name: "instagram", label: "Link do Instagram" },
];

const hoursFields: { name: keyof ContactContent; label: string }[] = [
  { name: "hoursWeekdays", label: "Segunda a sexta" },
  { name: "hoursSaturday", label: "Sábado" },
  { name: "hoursSunday", label: "Domingo" },
];

export function ContactForm({ initial }: { initial: ContactContent }) {
  const [state, formAction, pending] = useActionState(saveContact, initialState);

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      <fieldset className={cardClass}>
        <legend className="px-1 text-sm font-bold text-[#1C2621]">Dados de contato</legend>
        {contactFields.map((field) => (
          <label key={field.name} className="block text-sm font-medium text-[#1C2621]">
            {field.label}
            <input name={field.name} defaultValue={initial[field.name]} className={fieldClass} />
            {field.hint && <span className="mt-1 block text-xs font-normal text-[#9AA6A0]">{field.hint}</span>}
          </label>
        ))}
      </fieldset>

      <fieldset className={cardClass}>
        <legend className="px-1 text-sm font-bold text-[#1C2621]">Horários</legend>
        {hoursFields.map((field) => (
          <label key={field.name} className="block text-sm font-medium text-[#1C2621]">
            {field.label}
            <input name={field.name} defaultValue={initial[field.name]} className={fieldClass} />
          </label>
        ))}
      </fieldset>

      {state.error && <p className="text-sm text-[#B23A3A]">{state.error}</p>}
      {state.success && <p className="text-sm text-[#1E6848]">Salvo no rascunho — clique em &ldquo;Publicar alterações&rdquo; no topo para colocar no ar.</p>}

      <button type="submit" disabled={pending} className="rounded-full bg-[#124D35] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E6848] disabled:opacity-60">
        {pending ? "Salvando…" : "Salvar contato"}
      </button>
    </form>
  );
}
