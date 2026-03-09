"use client";

import { useMemo, useState } from "react";
import type { Category, Item } from "@/data/menu";
import { money } from "@/lib/utils";
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
        <div className="w-full py-2">
          <TabsList className="flex flex-wrap gap-2 h-auto bg-transparent p-0">
            {cats.map((c) => (
              <TabsTrigger
                key={c.slug}
                value={c.slug}
                className="whitespace-nowrap px-5 py-2 rounded-full transition-all 
                  data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md
                  data-[state=inactive]:bg-muted/50 data-[state=inactive]:text-muted-foreground hover:data-[state=inactive]:bg-muted/80
                  font-semibold text-sm border-none transition-all duration-300 active:scale-95"
              >
                {c.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      <div className="mt-6 relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <Input
          placeholder="O que você procura hoje?"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full pl-10 h-12 bg-muted/30 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/20 transition-all placeholder:text-muted-foreground/60"
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
                  priority={filtered.indexOf(it) === 0}
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
