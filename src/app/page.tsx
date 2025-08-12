import BrandHeader from "@/components/BrandHeader";
import { categories, items } from "@/data/menu";
import Menu from "@/components/menu/Menu";

export default function Page() {
  const cats = [...categories].sort((a, b) => a.order - b.order);
  return (
    <main className="mx-auto max-w-6xl p-4 md:p-8">
      <BrandHeader />
      <section className="mt-4">
        <div className="rounded-xl border p-4 md:p-6 bg-white">
          <h2 className="text-xl md:text-2xl font-semibold">
            Cardápio Digital
          </h2>
          <div className="mt-6">
            <Menu categories={cats} items={items} />
          </div>
        </div>
      </section>
      <footer className="text-xs text-muted-foreground mt-8">
      © 2025 Todos direitos reservados.
      </footer>
    </main>
  );
}
