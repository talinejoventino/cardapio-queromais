// src/data/menu.ts
export type Category = { id: string; name: string; slug: string; order: number };
export type Item = {
  id: string;
  name: string;
  description?: string;
  priceCents: number;     // preço unitário ou por porção
  imageUrl?: string;
  categorySlug: string;
  isAvailable?: boolean;
  tags?: string[];        // ex: ["assado","vegano","picante"]
  unit?: string;          // ex: "un", "100un", "kg", "porção"
  minOrder?: number;      // ex: 50 (mínimo 50 unidades)
};

export const categories: Category[] = [
  { id: "1", name: "Salgados Fritos", slug: "fritos", order: 1 },
  { id: "2", name: "Salgados Assados", slug: "assados", order: 2 },
  { id: "3", name: "Mini Festa", slug: "mini", order: 3 },
  { id: "4", name: "Doces", slug: "doces", order: 4 },
  { id: "5", name: "Bebidas", slug: "bebidas", order: 5 },
];

export const items: Item[] = [
  {
    id: "qmx1",
    name: "Coxinha de Frango",
    description: "Massa crocante, recheio cremoso de frango temperado",
    priceCents: 350, // R$3,50 a unidade
    unit: "un",
    minOrder: 10,
    categorySlug: "fritos",
    imageUrl: "https://picsum.photos/seed/coxinha/640/400",
    isAvailable: true,
    tags: ["frito", "clássico"],
  },
  {
    id: "qmx2",
    name: "Kibe",
    description: "Carne, trigo fino e hortelã",
    priceCents: 350,
    unit: "un",
    minOrder: 10,
    categorySlug: "fritos",
    imageUrl: "https://picsum.photos/seed/kibe/640/400",
    isAvailable: true,
    tags: ["frito"],
  },
  {
    id: "qmx3",
    name: "Empada de Frango",
    description: "Massa amanteigada, recheio suculento",
    priceCents: 590,
    unit: "un",
    minOrder: 6,
    categorySlug: "assados",
    imageUrl: "https://picsum.photos/seed/empada/640/400",
    isAvailable: true,
    tags: ["assado"],
  },
  {
    id: "qmx4",
    name: "Esfiha de Carne",
    description: "Carne moída temperada, massa macia",
    priceCents: 520,
    unit: "un",
    minOrder: 6,
    categorySlug: "assados",
    imageUrl: "https://picsum.photos/seed/esfiha/640/400",
    isAvailable: true,
    tags: ["assado"],
  },
  {
    id: "qmx5",
    name: "Mini Coxinha (Festa)",
    description: "Bandeja com 100 unidades",
    priceCents: 18900, // R$189,00 por 100un
    unit: "100un",
    minOrder: 1,
    categorySlug: "mini",
    imageUrl: "https://picsum.photos/seed/minicx/640/400",
    isAvailable: true,
    tags: ["festa", "frito", "popular"],
  },
  {
    id: "qmx6",
    name: "Brigadeiro",
    description: "Clássico com granulado",
    priceCents: 250,
    unit: "un",
    minOrder: 10,
    categorySlug: "doces",
    imageUrl: "https://picsum.photos/seed/brigadeiro/640/400",
    isAvailable: true,
    tags: ["doce"],
  },
  {
    id: "qmx7",
    name: "Refrigerante Lata",
    description: "350ml (Coca/Guaraná/Zero)",
    priceCents: 690,
    unit: "lata",
    minOrder: 1,
    categorySlug: "bebidas",
    imageUrl: "https://picsum.photos/seed/refri/640/400",
    isAvailable: true,
    tags: ["bebida"],
  },
];

export const money = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
