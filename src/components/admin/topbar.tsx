"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

const pageMeta: Record<string, { eyebrow: string; title: string }> = {
  "/admin": { eyebrow: "Início", title: "Painel administrativo" },
  "/admin/tags": { eyebrow: "Configurações", title: "Tags de rastreamento" },
  "/admin/contato": { eyebrow: "Configurações", title: "Contato" },
  "/admin/hero": { eyebrow: "Conteúdo", title: "Hero" },
  "/admin/servicos": { eyebrow: "Conteúdo", title: "Serviços" },
  "/admin/depoimentos": { eyebrow: "Conteúdo", title: "Depoimentos" },
  "/admin/galeria": { eyebrow: "Conteúdo", title: "Galeria" },
};

export function AdminTopbar({ dirty, publishAction, siteUrl }: { dirty: boolean; publishAction: () => Promise<void>; siteUrl: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const meta = pageMeta[pathname] ?? { eyebrow: "Painel", title: "Fisiolife" };
  const [pending, startTransition] = useTransition();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[rgba(28,38,33,0.08)] bg-white/85 px-8 py-5 backdrop-blur">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[#9AA6A0]">{meta.eyebrow}</p>
        <h1 className="mt-0.5 text-xl font-extrabold text-[#1C2621]">{meta.title}</h1>
      </div>
      <div className="flex items-center gap-3">
        {dirty ? (
          <span className="rounded-full bg-[rgba(199,164,58,0.14)] px-3.5 py-1.5 text-xs font-semibold text-[#8A7530]">Alterações não publicadas</span>
        ) : (
          <span className="rounded-full bg-[rgba(30,104,72,0.1)] px-3.5 py-1.5 text-xs font-semibold text-[#1E6848]">Publicado</span>
        )}
        <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[rgba(28,38,33,0.14)] px-4 py-2 text-sm font-semibold text-[#1C2621] hover:bg-[#F8FAF8]">Ver o site</a>
        <button
          type="button"
          disabled={!dirty || pending}
          onClick={() => startTransition(async () => { await publishAction(); router.refresh(); })}
          className="rounded-full bg-[#124D35] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1E6848] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "Publicando…" : "Publicar alterações"}
        </button>
      </div>
    </header>
  );
}
