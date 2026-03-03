import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    supabase.from("categories").select("*").order("order"),
  ]);

  if (!product) notFound();

  const initial = {
    id: product.id,
    name: product.name,
    description: product.description ?? "",
    price_cents: product.price_cents,
    image_url: product.image_url,
    category_slug: product.category_slug,
    is_available: product.is_available,
    unit: product.unit ?? "",
    tags: (product.tags ?? []).join(", "),
    min_order: product.min_order ?? 1,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/dashboard" className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Editar Produto</h1>
      </div>
      <div className="bg-white rounded-lg border p-6">
        <ProductForm categories={categories ?? []} initial={initial} />
      </div>
    </div>
  );
}
