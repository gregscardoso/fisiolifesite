import { getDraftTags } from "@/lib/site-data";
import { TagsForm } from "./tags-form";

export default async function TagsPage() {
  const tags = await getDraftTags();
  return (
    <div>
      <p className="text-sm text-[#66736C]">Cole os IDs e ative só o que estiver configurado. Sem ID preenchido, o script não é carregado no site.</p>
      <div className="mt-8">
        <TagsForm initial={tags} />
      </div>
    </div>
  );
}
