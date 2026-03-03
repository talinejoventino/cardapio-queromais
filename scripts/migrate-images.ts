/**
 * Script de migração de imagens — move imagens locais para o Supabase Storage
 * e atualiza as URLs no banco de dados.
 *
 * Uso:
 *   npx tsx scripts/migrate-images.ts
 *
 * Requer no .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

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

function getContentType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  const types: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };
  return types[ext] ?? "image/jpeg";
}

async function migrateImages() {
  console.log("🖼️  Iniciando migração de imagens...\n");

  // Busca produtos com imagens locais (começam com /produtos/)
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, image_url")
    .not("image_url", "is", null)
    .like("image_url", "/produtos/%");

  if (error) {
    console.error("Erro ao buscar produtos:", error.message);
    process.exit(1);
  }

  if (!products || products.length === 0) {
    console.log("Nenhum produto com imagem local encontrado.");
    console.log("Verifique se o seed já foi executado (npx tsx scripts/seed.ts)");
    return;
  }

  console.log(`Encontrados ${products.length} produtos com imagens locais\n`);

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const product of products) {
    const localPath = path.join(process.cwd(), "public", product.image_url!);
    const fileName = path.basename(product.image_url!);

    if (!fs.existsSync(localPath)) {
      console.warn(`⚠️  Arquivo não encontrado: ${product.image_url} (${product.name})`);
      skipped++;
      continue;
    }

    const fileBuffer = fs.readFileSync(localPath);
    const contentType = getContentType(fileName);

    // Upload para o Supabase Storage (upsert = sobrescreve se já existir)
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, fileBuffer, { contentType, upsert: true });

    if (uploadError) {
      console.error(`✗ Erro ao enviar ${fileName}:`, uploadError.message);
      failed++;
      continue;
    }

    // Pega a URL pública
    const { data: { publicUrl } } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    // Atualiza o produto no banco
    const { error: updateError } = await supabase
      .from("products")
      .update({ image_url: publicUrl })
      .eq("id", product.id);

    if (updateError) {
      console.error(`✗ Erro ao atualizar ${product.name}:`, updateError.message);
      failed++;
    } else {
      console.log(`✓ ${product.name}`);
      success++;
    }
  }

  console.log(`
📊 Resultado:
   ✓ Migrados: ${success}
   ⚠️  Não encontrados: ${skipped}
   ✗ Falhas: ${failed}
`);

  if (success > 0) {
    console.log("🎉 Migração concluída! As URLs no banco agora apontam para o Supabase Storage.");
  }
}

migrateImages();
