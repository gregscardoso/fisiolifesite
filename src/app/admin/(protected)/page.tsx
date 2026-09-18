import Link from "next/link";
import { getDraftContent, getSiteMeta } from "@/lib/site-data";

const cards = [
  { href: "/admin/tags", tag: "Configurações", title: "Tags de rastreamento", description: "Google Analytics, Google Tag Manager e Meta Pixel." },
  { href: "/admin/contato", tag: "Configurações", title: "Contato", description: "Telefone, WhatsApp, e-mail, endereço e horários." },
  { href: "/admin/hero", tag: "Conteúdo", title: "Hero", description: "Texto principal e imagem/vídeo de capa." },
  { href: "/admin/servicos", tag: "Conteúdo", title: "Serviços", description: "Lista de tratamentos oferecidos." },
  { href: "/admin/depoimentos", tag: "Prova social", title: "Depoimentos", description: "Avaliações de pacientes exibidas no carrossel." },
  { href: "/admin/galeria", tag: "Conteúdo", title: "Galeria", description: "Fotos do estúdio." },
];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia.";
  if (hour < 18) return "Boa tarde.";
  return "Boa noite.";
}

export default async function AdminHome() {
  const [content, meta] = await Promise.all([getDraftContent(), getSiteMeta()]);
  const publishedServices = content.services.filter((s) => s.published).length;
  const approvedTestimonials = content.testimonials.filter((t) => t.published).length;
  const lastPublished = meta.publishedAt
    ? new Date(meta.publishedAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })
    : null;

  return (
    <div>
      <div className="rounded-2xl bg-[#124D35] p-8 text-white">
        <h1 className="text-2xl font-extrabold">{greeting()}</h1>
        <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-white/76">
          {lastPublished ? `Tudo publicado e funcionando. Última atualização do site em ${lastPublished}.` : "Ainda não há nenhuma publicação. Edite o conteúdo e clique em \"Publicar alterações\" quando estiver pronto."}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[rgba(28,38,33,0.08)] bg-white p-5">
          <p className="text-2xl font-extrabold text-[#124D35]">{publishedServices}/{content.services.length}</p>
          <p className="mt-1 text-sm text-[#66736C]">tratamentos publicados</p>
        </div>
        <div className="rounded-xl border border-[rgba(28,38,33,0.08)] bg-white p-5">
          <p className="text-2xl font-extrabold text-[#124D35]">{approvedTestimonials}</p>
          <p className="mt-1 text-sm text-[#66736C]">depoimentos aprovados</p>
        </div>
        <div className="rounded-xl border border-[rgba(28,38,33,0.08)] bg-white p-5">
          <p className="text-2xl font-extrabold text-[#124D35]">{content.gallery.length}</p>
          <p className="mt-1 text-sm text-[#66736C]">fotos na galeria</p>
        </div>
      </div>

      <p className="mt-8 text-sm text-[#66736C]">Escolha uma área para editar o conteúdo publicado no site.</p>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-xl border border-[rgba(28,38,33,0.08)] bg-white p-5 shadow-sm transition hover:border-[#1E6848]/30 hover:shadow-md">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9AA6A0]">{card.tag}</span>
            <h2 className="mt-1.5 font-bold text-[#1C2621]">{card.title}</h2>
            <p className="mt-1 text-sm text-[#66736C]">{card.description}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-[#1E6848]">Editar →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
