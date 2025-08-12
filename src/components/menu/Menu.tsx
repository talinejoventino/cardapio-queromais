"use client";

import { useMemo, useState } from "react";
import type { Category, Item } from "@/data/menu";
import { money } from "@/data/menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import ProductCard from "./ProductCard";
import { Separator } from "@/components/ui/separator";

type Props = { categories: Category[]; items: Item[] };

export default function Menu({ categories, items }: Props) {
  const [tab, setTab] = useState<string>(categories[0]?.slug ?? "");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    const byCat = items.filter((i) => i.categorySlug === tab);
    if (!text) return byCat;
    return byCat.filter(
      (i) =>
        i.name.toLowerCase().includes(text) ||
        i.description?.toLowerCase().includes(text) ||
        i.tags?.some((t) => t.toLowerCase().includes(text))
    );
  }, [items, tab, q]);

  return (
    <>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="flex w-full overflow-x-auto">
          {categories.map((c) => (
            <TabsTrigger key={c.slug} value={c.slug} className="whitespace-nowrap">
              {c.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-4 flex gap-3 items-center">
        <Input
          placeholder="Buscar (ex.: coxinha, assado, vegano...)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full"
        />
      </div>

      <Separator className="my-4" />

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">Nada encontrado.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((it) => (
            <li key={it.id}>
              <ProductCard
                title={it.name}
                description={it.description}
                price={money(it.priceCents)}
                imageUrl={it.imageUrl}
                unavailable={!it.isAvailable}
                unit={it.unit}
                minOrder={it.minOrder}
                tags={it.tags}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
