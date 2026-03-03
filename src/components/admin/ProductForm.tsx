"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

type Category = { id: string; name: string; slug: string; order: number };

type ProductData = {
  id?: string;
  name: string;
  description: string;
  price_cents: number;
  image_url: string | null;
  category_slug: string;
  is_available: boolean;
  unit: string;
  tags: string;
  min_order: number;
};

export default function ProductForm({
  categories,
  initial,
}: {
  categories: Category[];
  initial?: Partial<ProductData>;
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [priceStr, setPriceStr] = useState(
    initial?.price_cents ? (initial.price_cents / 100).toFixed(2).replace(".", ",") : ""
  );
  const [imageUrl, setImageUrl] = useState<string | null>(initial?.image_url ?? null);
  const [categorySlug, setCategorySlug] = useState(initial?.category_slug ?? "");
  const [isAvailable, setIsAvailable] = useState(initial?.is_available ?? true);
  const [unit, setUnit] = useState(initial?.unit ?? "");
  const [tags, setTags] = useState(initial?.tags ?? "");
  const [minOrder, setMinOrder] = useState(initial?.min_order ?? 1);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: form });
    const json = await res.json();

    if (!res.ok) {
      toast.error("Erro ao fazer upload: " + json.error);
      setUploading(false);
      return;
    }

    setImageUrl(json.url);
    setUploading(false);
    toast.success("Imagem enviada");
  }

  function parsePriceCents(str: string): number {
    const clean = str.replace(/[^\d,]/g, "").replace(",", ".");
    return Math.round(parseFloat(clean || "0") * 100);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const price_cents = parsePriceCents(priceStr);
    if (!name.trim() || !categorySlug || price_cents <= 0) {
      toast.error("Preencha nome, categoria e preço.");
      setSaving(false);
      return;
    }

    const payload = {
      name: name.trim(),
      description: description.trim() || null,
      price_cents,
      image_url: imageUrl,
      category_slug: categorySlug,
      is_available: isAvailable,
      unit: unit.trim() || null,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      min_order: minOrder,
    };

    const isEdit = !!initial?.id;
    const res = await fetch(
      isEdit ? `/api/products/${initial!.id}` : "/api/products",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const json = await res.json();
      toast.error("Erro: " + json.error);
      setSaving(false);
      return;
    }

    toast.success(isEdit ? "Produto atualizado!" : "Produto criado!");
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Imagem */}
      <div className="space-y-2">
        <Label>Imagem do produto</Label>
        <div
          className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center gap-3 cursor-pointer hover:bg-muted/30 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          {imageUrl ? (
            <div className="relative w-full aspect-video max-w-xs rounded-md overflow-hidden">
              <Image src={imageUrl} alt="Preview" fill className="object-cover" unoptimized={imageUrl.startsWith("/")} />
              <button
                type="button"
                className="absolute top-1 right-1 bg-black/50 rounded-full p-1 text-white"
                onClick={(e) => { e.stopPropagation(); setImageUrl(null); }}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {uploading ? "Enviando..." : "Clique para selecionar uma imagem"}
              </p>
            </>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* Nome */}
      <div className="space-y-1.5">
        <Label htmlFor="name">Nome *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex.: Coxinha de frango"
          required
        />
      </div>

      {/* Categoria */}
      <div className="space-y-1.5">
        <Label>Categoria *</Label>
        <Select value={categorySlug} onValueChange={setCategorySlug} required>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Preço + Unidade */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="price">Preço (R$) *</Label>
          <Input
            id="price"
            value={priceStr}
            onChange={(e) => setPriceStr(e.target.value)}
            placeholder="Ex.: 25,00"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="unit">Unidade</Label>
          <Input
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="Ex.: 500g, 1kg, 10un"
          />
        </div>
      </div>

      {/* Descrição */}
      <div className="space-y-1.5">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalhes do produto..."
          rows={3}
        />
      </div>

      {/* Tags + Min Order */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Ex.: frito, assado"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="min_order">Pedido mínimo</Label>
          <Input
            id="min_order"
            type="number"
            min={1}
            value={minOrder}
            onChange={(e) => setMinOrder(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Disponível */}
      <div className="flex items-center gap-3">
        <Switch
          id="available"
          checked={isAvailable}
          onCheckedChange={setIsAvailable}
        />
        <Label htmlFor="available">Disponível no cardápio</Label>
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving || uploading}>
          {saving ? "Salvando..." : initial?.id ? "Salvar alterações" : "Criar produto"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={saving}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
