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
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pb-20">
      <BrandHeader />
      
      <section className="mt-8 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col gap-1 mb-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Cardápio <span className="text-primary tracking-tighter">Digital</span>
          </h2>
          <div className="h-1.5 w-12 bg-primary rounded-full" />
        </div>

        <div className="mt-6">
          {errorMessage ? (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4 glass rounded-3xl">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">
                  Ops! Algo deu errado
                </p>
                <p className="text-sm text-muted-foreground max-w-xs mt-1">
                  Não foi possível carregar o cardápio. Tente recarregar a página ou entre em contato.
                </p>
              </div>
            </div>
          ) : (
            <Menu categories={sortedCategories} items={items} />
          )}
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-8 mt-16 pb-8 border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-medium">
        <p>© 2025 QueroMais. Todos os direitos reservados.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-primary transition-colors">Termos</a>
          <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
        </div>
      </footer>
    </main>
  );
}
