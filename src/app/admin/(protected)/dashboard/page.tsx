import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductsTable from "@/components/admin/ProductsTable";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("*, categories(name)")
      .order("name"),
    supabase.from("categories").select("*").order("order"),
  ]);

  const total = products?.length ?? 0;
  const unavailable = products?.filter((p) => !p.is_available).length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Button asChild>
          <Link href="/admin/produtos/novo">
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="bg-white rounded-lg border p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-muted-foreground leading-tight">Total de produtos</p>
          <p className="text-2xl sm:text-3xl font-bold mt-1">{total}</p>
        </div>
        <div className="bg-white rounded-lg border p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-muted-foreground leading-tight">Categorias</p>
          <p className="text-2xl sm:text-3xl font-bold mt-1">{categories?.length ?? 0}</p>
        </div>
        <div className="bg-white rounded-lg border p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-muted-foreground leading-tight">Indisponíveis</p>
          <p className="text-2xl sm:text-3xl font-bold mt-1 text-destructive">{unavailable}</p>
        </div>
      </div>

      <ProductsTable
        products={products ?? []}
        categories={categories ?? []}
      />
    </div>
  );
}
