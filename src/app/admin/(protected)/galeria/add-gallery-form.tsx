"use client";

import { useActionState } from "react";
import { addGalleryItem, type GalleryState } from "./actions";
import { galleryLabels } from "@/lib/content";

const initialState: GalleryState = {};
const fieldClass = "mt-1 w-full rounded-lg border border-[rgba(28,38,33,0.14)] px-3 py-2 text-sm focus:border-[#1E6848] focus:outline-none focus:ring-1 focus:ring-[#1E6848]";

export function AddGalleryForm() {
  const [state, formAction, pending] = useActionState(addGalleryItem, initialState);

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-3 rounded-xl border border-dashed border-[rgba(28,38,33,0.2)] bg-white p-5">
      <p className="text-sm font-bold text-[#1C2621]">Adicionar nova foto</p>
      <label className="block text-sm font-medium text-[#1C2621]">
        Foto
        <input type="file" name="image" accept="image/*" required className="mt-1 block w-full text-sm text-[#4A5A52]" />
      </label>
      <label className="block text-sm font-medium text-[#1C2621]">
        Descrição (alt)
        <input name="alt" required className={fieldClass} />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-medium text-[#1C2621]">
          Categoria
          <select name="label" defaultValue={galleryLabels[0]} className={fieldClass}>
            {galleryLabels.map((label) => <option key={label} value={label}>{label}</option>)}
          </select>
        </label>
        <label className="block text-sm font-medium text-[#1C2621]">
          Proporção
          <select name="ratio" defaultValue="4 / 3" className={fieldClass}>
            <option value="4 / 3">Paisagem (4:3)</option>
            <option value="3 / 4">Retrato (3:4)</option>
            <option value="1 / 1">Quadrada (1:1)</option>
          </select>
        </label>
      </div>
      {state.error && <p className="text-sm text-[#B23A3A]">{state.error}</p>}
      <button type="submit" disabled={pending} className="rounded-full bg-[#124D35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1E6848] disabled:opacity-60">
        {pending ? "Adicionando…" : "Adicionar foto"}
      </button>
    </form>
  );
}
