"use client";

import { useActionState } from "react";
import { saveHero, type HeroState } from "./actions";
import type { HeroContent } from "@/lib/site-data";

const initialState: HeroState = {};
const fieldClass = "mt-1 w-full rounded-lg border border-[rgba(28,38,33,0.14)] px-3 py-2 text-sm focus:border-[#1E6848] focus:outline-none focus:ring-1 focus:ring-[#1E6848]";
const cardClass = "space-y-4 rounded-xl border border-[rgba(28,38,33,0.08)] bg-white p-5";

export function HeroForm({ initial }: { initial: HeroContent }) {
  const [state, formAction, pending] = useActionState(saveHero, initialState);

  return (
    <form action={formAction} encType="multipart/form-data" className="max-w-xl space-y-6">
      <fieldset className={cardClass}>
        <legend className="px-1 text-sm font-bold text-[#1C2621]">Textos</legend>
        <label className="block text-sm font-medium text-[#1C2621]">
          Selo acima do título
          <input name="eyebrow" defaultValue={initial.eyebrow} className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-[#1C2621]">
          Título (parte normal)
          <textarea name="titlePrefix" defaultValue={initial.titlePrefix} rows={2} className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-[#1C2621]">
          Título (parte em destaque/itálico)
          <input name="titleEmphasis" defaultValue={initial.titleEmphasis} className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-[#1C2621]">
          Parágrafo de apoio
          <textarea name="subtitle" defaultValue={initial.subtitle} rows={4} className={fieldClass} />
        </label>
      </fieldset>

      <fieldset className={cardClass}>
        <legend className="px-1 text-sm font-bold text-[#1C2621]">Imagem e vídeo de capa</legend>
        <label className="block text-sm font-medium text-[#1C2621]">
          Trocar imagem de capa (poster)
          <input type="file" name="posterImage" accept="image/*" className="mt-1 block w-full text-sm text-[#4A5A52]" />
          <span className="mt-1 block text-xs font-normal text-[#9AA6A0]">Atual: {initial.posterImage}</span>
        </label>
        <label className="block text-sm font-medium text-[#1C2621]">
          Trocar vídeo de capa
          <input type="file" name="videoFile" accept="video/*" className="mt-1 block w-full text-sm text-[#4A5A52]" />
          <span className="mt-1 block text-xs font-normal text-[#9AA6A0]">Atual: {initial.videoUrl}</span>
        </label>
      </fieldset>

      {state.error && <p className="text-sm text-[#B23A3A]">{state.error}</p>}
      {state.success && <p className="text-sm text-[#1E6848]">Salvo no rascunho — clique em &ldquo;Publicar alterações&rdquo; no topo para colocar no ar.</p>}

      <button type="submit" disabled={pending} className="rounded-full bg-[#124D35] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E6848] disabled:opacity-60">
        {pending ? "Salvando…" : "Salvar hero"}
      </button>
    </form>
  );
}
