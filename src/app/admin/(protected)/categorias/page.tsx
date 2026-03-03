import { createClient } from "@/lib/supabase/server";
import CategoriesManager from "@/components/admin/CategoriesManager";

export default async function CategoriasPage() {
  const supabase = await createClient();

  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from("categories").select("*").order("order"),
    supabase.from("products").select("category_slug"),
  ]);

  const countBySlug: Record<string, number> = {};
  for (const p of products ?? []) {
    countBySlug[p.category_slug] = (countBySlug[p.category_slug] ?? 0) + 1;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Categorias</h1>
      <div className="bg-white rounded-lg border p-6">
        <CategoriesManager
          categories={categories ?? []}
          productCountBySlug={countBySlug}
        />
      </div>
    </div>
  );
}
