"use client";

import { useMemo, useState } from "react";
import type { Category, Item } from "@/data/menu";
import { money } from "@/data/menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import ProductCard from "./ProductCard";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/stores/cart";

type Props = { categories: Category[]; items: Item[] };

export default function Menu({ categories, items }: Props) {
  const [tab, setTab] = useState<string>(categories[0]?.slug ?? "");
  const [q, setQ] = useState("");

  const add = useCart((s) => s.add);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    const byCat = items
      .filter((i) => i.categorySlug === tab)
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    if (!text) return byCat;
    return byCat.filter(
      (i) =>
        i.name.toLowerCase().includes(text) ||
        i.description?.toLowerCase().includes(text)
    );
  }, [items, tab, q]);

  const cats = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [categories]
  );

  return (
    <>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="flex w-full overflow-x-auto">
          {cats.map((c) => (
            <TabsTrigger key={c.slug} value={c.slug} className="whitespace-nowrap">
              {c.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-4 flex gap-3 items-center">
        <Input
          placeholder="Buscar (ex.: coxinha, 1kg, 500g...)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full"
        />
      </div>

      <Separator className="my-4" />

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">Nada encontrado.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {filtered.map((it) => {
            const subtitle = it.unit ? it.unit : undefined; // ex.: "fardo 12x12un", "500g", "1kg", "10un (130g)"
            return (
              <li key={it.id}>
                <ProductCard
                  title={it.name}
                  subtitle={subtitle}
                  description={it.description}
                  price={money(it.priceCents)}
                  imageUrl={it.imageUrl}
                  minOrder={it.minOrder}
                  onAdd={(qty) =>
                    add(
                      {
                        id: it.id,
                        name: it.name,
                        priceCents: it.priceCents,
                        imageUrl: it.imageUrl,
                        unit: it.unit,
                      },
                      qty
                    )
                  }
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}