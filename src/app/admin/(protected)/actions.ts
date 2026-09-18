"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteSession } from "@/lib/admin/session";
import { verifySession } from "@/lib/admin/dal";
import { publishAllChanges } from "@/lib/site-data";

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}

export async function publishChanges() {
  await verifySession();
  await publishAllChanges();
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}
