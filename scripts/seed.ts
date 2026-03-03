/**
 * Script de seed — popula o Supabase com os dados de src/data/menu.ts
 *
 * Uso:
 *   npx tsx scripts/seed.ts
 *
 * Requer no .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...
 */

import { createClient } from "@supabase/supabase-js";
import { categories, items } from "../src/data/menu";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Erro: defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

async function seed() {
  console.log("🌱 Iniciando seed...\n");

  // 1. Categorias
  console.log(`Inserindo ${categories.length} categorias...`);
  const { error: catError } = await supabase.from("categories").upsert(
    categories.map((c) => ({
      name: c.name,
      slug: c.slug,
      order: c.order,
    })),
    { onConflict: "slug" }
  );

  if (catError) {
    console.error("Erro ao inserir categorias:", catError.message);
    process.exit(1);
  }
  console.log("✓ Categorias inseridas\n");

  // 2. Produtos
  console.log(`Inserindo ${items.length} produtos...`);
  const { error: prodError } = await supabase.from("products").upsert(
    items.map((item) => ({
      name: item.name,
      description: item.description ?? null,
      price_cents: item.priceCents,
      image_url: item.imageUrl ?? null,
      category_slug: item.categorySlug,
      is_available: item.isAvailable ?? true,
      tags: item.tags ?? [],
      unit: item.unit ?? null,
      min_order: item.minOrder ?? 1,
    })),
    { onConflict: "id" }
  );

  if (prodError) {
    console.error("Erro ao inserir produtos:", prodError.message);
    process.exit(1);
  }
  console.log("✓ Produtos inseridos\n");

  console.log("🎉 Seed concluído com sucesso!");
}

seed();
