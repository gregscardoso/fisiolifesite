"use client";

import { useActionState } from "react";
import Image from "next/image";
import { updateGalleryItem, removeGalleryItem, type GalleryState } from "./actions";
import type { GalleryPhoto } from "@/lib/site-data";
import { galleryLabels } from "@/lib/content";

const initialState: GalleryState = {};
const fieldClass = "mt-1 w-full rounded-lg border border-[rgba(28,38,33,0.14)] px-3 py-2 text-sm focus:border-[#1E6848] focus:outline-none focus:ring-1 focus:ring-[#1E6848]";

export function GalleryRow({ index, photo }: { index: number; photo: GalleryPhoto }) {
  const boundUpdate = updateGalleryItem.bind(null, index);
  const [state, formAction, pending] = useActionState(boundUpdate, initialState);

  return (
    <div className="rounded-xl border border-[rgba(28,38,33,0.08)] bg-white p-5">
      <form action={formAction} encType="multipart/form-data" className="space-y-3">
        <div className="flex items-center gap-4">
          <Image src={photo.src} alt="" width={72} height={72} unoptimized className="h-16 w-16 rounded-lg object-cover" />
          <input type="file" name="image" accept="image/*" className="text-sm text-[#4A5A52]" />
        </div>
        <label className="block text-sm font-medium text-[#1C2621]">
          Descrição (alt)
          <input name="alt" defaultValue={photo.alt} className={fieldClass} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium text-[#1C2621]">
            Categoria
            <select name="label" defaultValue={photo.label} className={fieldClass}>
              {galleryLabels.map((label) => <option key={label} value={label}>{label}</option>)}
            </select>
          </label>
          <label className="block text-sm font-medium text-[#1C2621]">
            Proporção
            <select name="ratio" defaultValue={photo.ratio} className={fieldClass}>
              <option value="4 / 3">Paisagem (4:3)</option>
              <option value="3 / 4">Retrato (3:4)</option>
              <option value="1 / 1">Quadrada (1:1)</option>
            </select>
          </label>
        </div>
        {state.error && <p className="text-sm text-[#B23A3A]">{state.error}</p>}
        {state.success && <p className="text-sm text-[#1E6848]">Salvo.</p>}
        <button type="submit" disabled={pending} className="rounded-full bg-[#124D35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1E6848] disabled:opacity-60">
          {pending ? "Salvando…" : "Salvar"}
        </button>
      </form>
      <div className="mt-3 border-t border-[rgba(28,38,33,0.08)] pt-3">
        <form action={removeGalleryItem.bind(null, index)}>
          <button type="submit" className="rounded-lg border border-[rgba(178,58,58,0.3)] px-3 py-1.5 text-xs font-medium text-[#B23A3A] hover:bg-[rgba(178,58,58,0.06)]">Remover</button>
        </form>
      </div>
    </div>
  );
}
