"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  countKey?: "services" | "testimonials" | "gallery";
}

const navItems: NavItem[] = [
  { href: "/admin", label: "Início" },
  { href: "/admin/tags", label: "Tags de rastreamento" },
  { href: "/admin/contato", label: "Contato" },
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/servicos", label: "Serviços", countKey: "services" },
  { href: "/admin/depoimentos", label: "Depoimentos", countKey: "testimonials" },
  { href: "/admin/galeria", label: "Galeria", countKey: "gallery" },
];

export function AdminSidebar({ counts, logoutAction }: { counts: { services: number; testimonials: number; gallery: number }; logoutAction: () => Promise<void> }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-[272px] shrink-0 flex-col border-r border-[rgba(28,38,33,0.1)] bg-white">
      <div className="flex items-center gap-3 px-6 py-7">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#124D35] text-lg font-extrabold text-white">F</span>
        <div className="leading-tight">
          <p className="text-sm font-extrabold text-[#1C2621]">Painel Fisiolife</p>
          <p className="text-xs text-[#9AA6A0]">Administração do site</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const count = item.countKey ? counts[item.countKey] : null;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-[#E8F1EC] text-[#124D35]" : "text-[#4A5A52] hover:bg-[#F8FAF8]"}`}
            >
              <span>{item.label}</span>
              {count !== null && (
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${active ? "bg-white text-[#124D35]" : "bg-[#E8F1EC] text-[#1E6848]"}`}>{count}</span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[rgba(28,38,33,0.1)] p-4">
        <form action={logoutAction}>
          <button type="submit" className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#B23A3A] hover:bg-[rgba(178,58,58,0.08)]">Sair do painel</button>
        </form>
      </div>
    </aside>
  );
}
