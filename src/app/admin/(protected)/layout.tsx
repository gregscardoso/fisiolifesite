import type { ReactNode } from "react";
import { verifySession } from "@/lib/admin/dal";
import { getDraftContent, isDirty } from "@/lib/site-data";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";
import { logout, publishChanges } from "./actions";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await verifySession();
  const [draft, dirty] = await Promise.all([getDraftContent(), isDirty()]);

  const counts = {
    services: draft.services.length,
    testimonials: draft.testimonials.length,
    gallery: draft.gallery.length,
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#1C2621]">
      <div className="flex min-h-screen">
        <AdminSidebar counts={counts} logoutAction={logout} />
        <div className="flex-1">
          <AdminTopbar dirty={dirty} publishAction={publishChanges} siteUrl="/" />
          <main className="mx-auto max-w-[1180px] p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
