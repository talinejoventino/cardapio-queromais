import BrandHeader from "@/components/header/BrandHeader";
import Menu from "@/components/menu/Menu";
import { createClient } from "@/lib/supabase/server";
import type { Category, Item } from "@/data/menu";

export default async function Page() {
  let categories: Category[] = [];
  let items: Item[] = [];
  let errorMessage: string | null = null;

  try {
    const supabase = await createClient();

    const [{ data: cats, error: catsError }, { data: prods, error: prodsError }] =
      await Promise.all([
        supabase.from("categories").select("*").order("order"),
        supabase.from("products").select("*").eq("is_available", true),
      ]);

    if (catsError) throw new Error(catsError.message);
    if (prodsError) throw new Error(prodsError.message);

    categories = (cats ?? []).map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      order: c.order,
    }));

    items = (prods ?? []).map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description ?? undefined,
      priceCents: p.price_cents,
      imageUrl: p.image_url ?? undefined,
      categorySlug: p.category_slug,
      isAvailable: p.is_available,
      tags: p.tags ?? undefined,
      unit: p.unit ?? undefined,
      minOrder: p.min_order ?? undefined,
    }));
  } catch (error) {
    console.error("Erro ao carregar o cardápio:", error);
    errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
  }

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-8">
      <BrandHeader />
      <section className="mt-4">
        <div className="rounded-xl border p-4 md:p-6 bg-white">
          <h2 className="text-xl md:text-2xl font-semibold">Cardápio Digital</h2>
          <div className="mt-6">
            {errorMessage ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                <p className="text-lg font-medium text-destructive">
                  Não foi possível carregar o cardápio
                </p>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Tente recarregar a página. Se o problema persistir, entre em
                  contato com a loja.
                </p>
              </div>
            ) : (
              <Menu categories={sortedCategories} items={items} />
            )}
          </div>
        </div>
      </section>
      <footer className="text-xs text-muted-foreground mt-8">
        © 2025 Todos direitos reservados.
      </footer>
    </main>
  );
}
