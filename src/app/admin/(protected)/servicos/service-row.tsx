"use client";

import { useActionState } from "react";
import Image from "next/image";
import { updateService, removeService, moveService, toggleServicePublished, type ServicesState } from "./actions";
import type { Service } from "@/lib/content";

const initialState: ServicesState = {};
const fieldClass = "mt-1 w-full rounded-lg border border-[rgba(28,38,33,0.14)] px-3 py-2 text-sm focus:border-[#1E6848] focus:outline-none focus:ring-1 focus:ring-[#1E6848]";

export function ServiceRow({ index, service, isFirst, isLast }: { index: number; service: Service; isFirst: boolean; isLast: boolean }) {
  const boundUpdate = updateService.bind(null, index);
  const [state, formAction, pending] = useActionState(boundUpdate, initialState);

  return (
    <div className="rounded-xl border border-[rgba(28,38,33,0.08)] bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <span aria-hidden="true" className="cursor-default select-none text-lg text-[#C7CFC9]">⠿</span>
        <form action={toggleServicePublished.bind(null, index)}>
          <button
            type="submit"
            className={`rounded-full px-3 py-1 text-xs font-semibold ${service.published ? "bg-[rgba(30,104,72,0.1)] text-[#1E6848]" : "bg-[rgba(28,38,33,0.08)] text-[#66736C]"}`}
          >
            {service.published ? "Publicado" : "Oculto"}
          </button>
        </form>
      </div>
      <form action={formAction} encType="multipart/form-data" className="space-y-3">
        <div className="flex items-center gap-4">
          <Image src={service.image} alt="" width={64} height={64} unoptimized className="h-16 w-16 rounded-lg object-cover" />
          <input type="file" name="image" accept="image/*" className="text-sm text-[#4A5A52]" />
        </div>
        <label className="block text-sm font-medium text-[#1C2621]">
          Nome
          <input name="name" defaultValue={service.name} className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-[#1C2621]">
          Descrição
          <textarea name="description" defaultValue={service.description} rows={2} className={fieldClass} />
        </label>
        {state.error && <p className="text-sm text-[#B23A3A]">{state.error}</p>}
        {state.success && <p className="text-sm text-[#1E6848]">Salvo.</p>}
        <button type="submit" disabled={pending} className="rounded-full bg-[#124D35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1E6848] disabled:opacity-60">
          {pending ? "Salvando…" : "Salvar"}
        </button>
      </form>
      <div className="mt-3 flex items-center gap-2 border-t border-[rgba(28,38,33,0.08)] pt-3">
        <form action={moveService.bind(null, index, -1)}>
          <button type="submit" disabled={isFirst} className="rounded-lg border border-[rgba(28,38,33,0.14)] px-3 py-1.5 text-xs font-medium text-[#4A5A52] hover:bg-[#F8FAF8] disabled:opacity-40">↑ Mover</button>
        </form>
        <form action={moveService.bind(null, index, 1)}>
          <button type="submit" disabled={isLast} className="rounded-lg border border-[rgba(28,38,33,0.14)] px-3 py-1.5 text-xs font-medium text-[#4A5A52] hover:bg-[#F8FAF8] disabled:opacity-40">↓ Mover</button>
        </form>
        <form action={removeService.bind(null, index)} className="ml-auto">
          <button type="submit" className="rounded-lg border border-[rgba(178,58,58,0.3)] px-3 py-1.5 text-xs font-medium text-[#B23A3A] hover:bg-[rgba(178,58,58,0.06)]">Remover</button>
        </form>
      </div>
    </div>
  );
}
