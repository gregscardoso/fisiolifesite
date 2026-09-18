import "server-only";
import { put } from "@vercel/blob";

export async function uploadFile(file: File, pathPrefix: string) {
  if (!file || file.size === 0) return null;
  const extension = file.name.split(".").pop() || "jpg";
  const key = `${pathPrefix}/${crypto.randomUUID()}.${extension}`;
  const blob = await put(key, file, { access: "public", addRandomSuffix: false });
  return blob.url;
}
