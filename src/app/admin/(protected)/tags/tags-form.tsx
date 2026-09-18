"use client";

import { useActionState } from "react";
import { saveTags, type TagsState } from "./actions";
import type { TagsConfig } from "@/lib/site-data";

const initialState: TagsState = {};

const fieldClass = "mt-1 w-full rounded-lg border border-[rgba(28,38,33,0.14)] px-3 py-2 text-sm focus:border-[#1E6848] focus:outline-none focus:ring-1 focus:ring-[#1E6848]";
const cardClass = "space-y-3 rounded-xl border border-[rgba(28,38,33,0.08)] bg-white p-5";

export function TagsForm({ initial }: { initial: TagsConfig }) {
  const [state, formAction, pending] = useActionState(saveTags, initialState);

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      <fieldset className={cardClass}>
        <legend className="px-1 text-sm font-bold text-[#1C2621]">Google Analytics 4</legend>
        <label className="block text-sm font-medium text-[#1C2621]">
          Measurement ID (ex: G-XXXXXXXXXX)
          <input name="ga4Id" defaultValue={initial.ga4Id} placeholder="G-XXXXXXXXXX" className={fieldClass} />
        </label>
        <label className="flex items-center gap-2 text-sm text-[#1C2621]">
          <input type="checkbox" name="ga4Enabled" defaultChecked={initial.ga4Enabled} className="h-4 w-4 rounded border-[rgba(28,38,33,0.3)] text-[#1E6848] focus:ring-[#1E6848]" />
          Ativo no site
        </label>
      </fieldset>

      <fieldset className={cardClass}>
        <legend className="px-1 text-sm font-bold text-[#1C2621]">Google Tag Manager</legend>
        <label className="block text-sm font-medium text-[#1C2621]">
          Container ID (ex: GTM-XXXXXXX)
          <input name="gtmId" defaultValue={initial.gtmId} placeholder="GTM-XXXXXXX" className={fieldClass} />
        </label>
        <label className="flex items-center gap-2 text-sm text-[#1C2621]">
          <input type="checkbox" name="gtmEnabled" defaultChecked={initial.gtmEnabled} className="h-4 w-4 rounded border-[rgba(28,38,33,0.3)] text-[#1E6848] focus:ring-[#1E6848]" />
          Ativo no site
        </label>
      </fieldset>

      <fieldset className={cardClass}>
        <legend className="px-1 text-sm font-bold text-[#1C2621]">Meta Pixel (Facebook)</legend>
        <label className="block text-sm font-medium text-[#1C2621]">
          Pixel ID
          <input name="metaPixelId" defaultValue={initial.metaPixelId} placeholder="123456789012345" className={fieldClass} />
        </label>
        <label className="flex items-center gap-2 text-sm text-[#1C2621]">
          <input type="checkbox" name="metaPixelEnabled" defaultChecked={initial.metaPixelEnabled} className="h-4 w-4 rounded border-[rgba(28,38,33,0.3)] text-[#1E6848] focus:ring-[#1E6848]" />
          Ativo no site
        </label>
      </fieldset>

      <fieldset className={cardClass}>
        <legend className="px-1 text-sm font-bold text-[#1C2621]">Banner de consentimento de cookies</legend>
        <p className="text-sm text-[#4A5A52]">Exibir aviso LGPD antes de ativar as tags. Enquanto o visitante não aceitar, nenhum script de rastreamento é carregado.</p>
        <label className="flex items-center gap-2 text-sm text-[#1C2621]">
          <input type="checkbox" name="consentBannerEnabled" defaultChecked={initial.consentBannerEnabled} className="h-4 w-4 rounded border-[rgba(28,38,33,0.3)] text-[#1E6848] focus:ring-[#1E6848]" />
          Exibir banner de consentimento
        </label>
      </fieldset>

      {state.error && <p className="text-sm text-[#B23A3A]">{state.error}</p>}
      {state.success && <p className="text-sm text-[#1E6848]">Salvo no rascunho — clique em &ldquo;Publicar alterações&rdquo; no topo para colocar no ar.</p>}

      <button type="submit" disabled={pending} className="rounded-full bg-[#124D35] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E6848] disabled:opacity-60">
        {pending ? "Salvando…" : "Salvar tags"}
      </button>
    </form>
  );
}
