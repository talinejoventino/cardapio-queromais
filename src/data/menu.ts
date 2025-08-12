// src/data/menu.ts
export type Category = { id: string; name: string; slug: string; order: number };
export type Item = {
  id: string;
  name: string;
  description?: string;
  priceCents: number;     // preço do pacote
  imageUrl?: string;
  categorySlug: string;
  isAvailable?: boolean;
  tags?: string[];
  unit?: string;          // ex.: "pacote 12x", "500g", "1kg", "2kg", "10un"
  minOrder?: number;      // mínimo de pacotes
};

export const categories: Category[] = [
  { id: "c1", name: "Bolinhos de 12 und", slug: "bolinho-12", order: 1 },
  { id: "c2", name: "Mini Bolinho 500g", slug: "mini-500g", order: 2 },
  { id: "c3", name: "Bolinhos de 1kg", slug: "bolinho-1kg", order: 3 },
  { id: "c4", name: "Bolinhos com 2kg", slug: "bolinho-2kg", order: 4 },
  { id: "c5", name: "Coxão", slug: "coxaos", order: 5 },
  { id: "c6", name: "Pizzas Brotinho", slug: "pizzas-brotinho", order: 6 },
  { id: "c7", name: "Lanches", slug: "lanches", order: 7 },
];

export const items: Item[] = [
  // Bolinhos 12 und — replica preço/desc do primeiro
  {
    id: "b12-coxinha",
    name: "Coxinha de frango",
    description:
      "Fardo com 12 pacotes, cada pacote vem 12 unidades (7,00 cada). Cada bolinho pesa 24 g.",
    priceCents: 8400,
    unit: "fardo 12x12un",
    categorySlug: "bolinho-12",
    imageUrl: "https://picsum.photos/seed/bol12-coxinha/640/400",
    tags: ["frito"],
  },
  { id: "b12-queijo", name: "Bolinho de queijo", description: "Fardo com 12 pacotes, cada pacote vem 12 unidades (7,00 cada). Cada bolinho pesa 24 g.", priceCents: 8400, unit: "fardo 12x12un", categorySlug: "bolinho-12", imageUrl: "https://picsum.photos/seed/bol12-queijo/640/400" },
  { id: "b12-bacalhau", name: "Bolinho de bacalhau", description: "Fardo com 12 pacotes, cada pacote vem 12 unidades (7,00 cada). Cada bolinho pesa 24 g.", priceCents: 8400, unit: "fardo 12x12un", categorySlug: "bolinho-12", imageUrl: "https://picsum.photos/seed/bol12-bacalhau/640/400" },
  { id: "b12-charque", name: "Bolinho de charque", description: "Fardo com 12 pacotes, cada pacote vem 12 unidades (7,00 cada). Cada bolinho pesa 24 g.", priceCents: 8400, unit: "fardo 12x12un", categorySlug: "bolinho-12", imageUrl: "https://picsum.photos/seed/bol12-charque/640/400" },
  { id: "b12-camarao", name: "Bolinho de camarão", description: "Fardo com 12 pacotes, cada pacote vem 12 unidades (7,00 cada). Cada bolinho pesa 24 g.", priceCents: 8400, unit: "fardo 12x12un", categorySlug: "bolinho-12", imageUrl: "https://picsum.photos/seed/bol12-camarao/640/400" },

  // Mini Bolinho 500g — replica
  {
    id: "m500-coxinha",
    name: "Mini Coxinha de frango",
    description: "Pacote com 500 g (~35 unidades). Cada bolinho pesa 14 g.",
    priceCents: 1400,
    unit: "500g",
    categorySlug: "mini-500g",
    imageUrl: "https://picsum.photos/seed/mini500-coxinha/640/400",
  },
  { id: "m500-queijo", name: "Mini Bolinho de queijo", description: "Pacote com 500 g (~35 unidades). Cada bolinho pesa 14 g.", priceCents: 1400, unit: "500g", categorySlug: "mini-500g", imageUrl: "https://picsum.photos/seed/mini500-queijo/640/400" },
  { id: "m500-bacalhau", name: "Mini Bolinho de bacalhau", description: "Pacote com 500 g (~35 unidades). Cada bolinho pesa 14 g.", priceCents: 1400, unit: "500g", categorySlug: "mini-500g", imageUrl: "https://picsum.photos/seed/mini500-bacalhau/640/400" },
  { id: "m500-charque", name: "Mini Bolinho de charque", description: "Pacote com 500 g (~35 unidades). Cada bolinho pesa 14 g.", priceCents: 1400, unit: "500g", categorySlug: "mini-500g", imageUrl: "https://picsum.photos/seed/mini500-charque/640/400" },
  { id: "m500-camarao", name: "Mini Bolinho de camarão", description: "Pacote com 500 g (~35 unidades). Cada bolinho pesa 14 g.", priceCents: 1400, unit: "500g", categorySlug: "mini-500g", imageUrl: "https://picsum.photos/seed/mini500-camarao/640/400" },
  { id: "m500-kibe", name: "Mini kibe de carne bovina", description: "Pacote com 500 g (~35 unidades). Cada bolinho pesa 14 g.", priceCents: 1400, unit: "500g", categorySlug: "mini-500g", imageUrl: "https://picsum.photos/seed/mini500-kibe/640/400" },
  { id: "m500-pastel", name: "Mini pastel de forno", description: "Pacote com 500 g (~35 unidades). Cada bolinho pesa 14 g.", priceCents: 1400, unit: "500g", categorySlug: "mini-500g", imageUrl: "https://picsum.photos/seed/mini500-pastel/640/400" },
  { id: "m500-churros", name: "Mini churros recheio de doce de leite", description: "Pacote com 500 g (~35 unidades). Cada bolinho pesa 14 g.", priceCents: 1400, unit: "500g", categorySlug: "mini-500g", imageUrl: "https://picsum.photos/seed/mini500-churros/640/400" },

  // Bolinhos 1kg — replica
  {
    id: "b1k-coxinha",
    name: "Coxinha de frango 1kg",
    description: "Pacote com 1 kg (~50 unidades). Cada bolinho pesa 24 g.",
    priceCents: 2500,
    unit: "1kg",
    categorySlug: "bolinho-1kg",
    imageUrl: "https://picsum.photos/seed/bol1k-coxinha/640/400",
  },
  { id: "b1k-queijo", name: "Bolinho de queijo 1kg", description: "Pacote com 1 kg (~50 unidades). Cada bolinho pesa 24 g.", priceCents: 2500, unit: "1kg", categorySlug: "bolinho-1kg", imageUrl: "https://picsum.photos/seed/bol1k-queijo/640/400" },
  { id: "b1k-bacalhau", name: "Bolinho de bacalhau 1kg", description: "Pacote com 1 kg (~50 unidades). Cada bolinho pesa 24 g.", priceCents: 2500, unit: "1kg", categorySlug: "bolinho-1kg", imageUrl: "https://picsum.photos/seed/bol1k-bacalhau/640/400" },
  { id: "b1k-charque", name: "Bolinho de charque 1kg", description: "Pacote com 1 kg (~50 unidades). Cada bolinho pesa 24 g.", priceCents: 2500, unit: "1kg", categorySlug: "bolinho-1kg", imageUrl: "https://picsum.photos/seed/bol1k-charque/640/400" },
  { id: "b1k-camarao", name: "Bolinho de camarão 1kg", description: "Pacote com 1 kg (~50 unidades). Cada bolinho pesa 24 g.", priceCents: 2500, unit: "1kg", categorySlug: "bolinho-1kg", imageUrl: "https://picsum.photos/seed/bol1k-camarao/640/400" },
  { id: "b1k-misto", name: "Bolinho misto (queijo e presunto) 1kg", description: "Pacote com 1 kg (~50 unidades). Cada bolinho pesa 24 g.", priceCents: 2500, unit: "1kg", categorySlug: "bolinho-1kg", imageUrl: "https://picsum.photos/seed/bol1k-misto/640/400" },
  { id: "b1k-risole", name: "Risole de carne bovina 1kg", description: "Pacote com 1 kg (~50 unidades). Cada bolinho pesa 24 g.", priceCents: 2500, unit: "1kg", categorySlug: "bolinho-1kg", imageUrl: "https://picsum.photos/seed/bol1k-risole/640/400" },

  // Bolinhos 2kg — replica
  {
    id: "b2k-coxinha",
    name: "Coxinha de frango 2kg",
    description: "Pacote com 2 kg (~200 unidades). Cada bolinho pesa 8 g.",
    priceCents: 4000,
    unit: "2kg",
    categorySlug: "bolinho-2kg",
    imageUrl: "https://picsum.photos/seed/bol2k-coxinha/640/400",
  },
  { id: "b2k-queijo", name: "Bolinho de queijo 2kg", description: "Pacote com 2 kg (~200 unidades). Cada bolinho pesa 8 g.", priceCents: 4000, unit: "2kg", categorySlug: "bolinho-2kg", imageUrl: "https://picsum.photos/seed/bol2k-queijo/640/400" },
  { id: "b2k-bacalhau", name: "Bolinho de bacalhau 2kg", description: "Pacote com 2 kg (~200 unidades). Cada bolinho pesa 8 g.", priceCents: 4000, unit: "2kg", categorySlug: "bolinho-2kg", imageUrl: "https://picsum.photos/seed/bol2k-bacalhau/640/400" },
  { id: "b2k-charque", name: "Bolinho de charque 2kg", description: "Pacote com 2 kg (~200 unidades). Cada bolinho pesa 8 g.", priceCents: 4000, unit: "2kg", categorySlug: "bolinho-2kg", imageUrl: "https://picsum.photos/seed/bol2k-charque/640/400" },
  { id: "b2k-camarao", name: "Bolinho de camarão 2kg", description: "Pacote com 2 kg (~200 unidades). Cada bolinho pesa 8 g.", priceCents: 4000, unit: "2kg", categorySlug: "bolinho-2kg", imageUrl: "https://picsum.photos/seed/bol2k-camarao/640/400" },
  { id: "b2k-misto", name: "Bolinho misto (queijo e presunto) 2kg", description: "Pacote com 2 kg (~200 unidades). Cada bolinho pesa 8 g.", priceCents: 4000, unit: "2kg", categorySlug: "bolinho-2kg", imageUrl: "https://picsum.photos/seed/bol2k-misto/640/400" },
  { id: "b2k-churros", name: "Churros recheio de doce de leite 2kg", description: "Pacote com 2 kg (~200 unidades). Cada bolinho pesa 8 g.", priceCents: 4000, unit: "2kg", categorySlug: "bolinho-2kg", imageUrl: "https://picsum.photos/seed/bol2k-churros/640/400" },

  // Coxão — preços específicos por item quando fornecidos
  {
    id: "coxa-trad",
    name: "Coxão de frango tradicional",
    description: "Pacote com 10 unidades. Cada unidade pesa 140 g.",
    priceCents: 3000,
    unit: "10un",
    categorySlug: "coxaos",
    imageUrl: "https://picsum.photos/seed/coxao-trad/640/400",
  },
  {
    id: "coxa-batata",
    name: "Coxão de frango com massa de batata",
    description: "Pacote com 10 unidades. Cada unidade pesa 140 g.",
    priceCents: 3500,
    unit: "10un",
    categorySlug: "coxaos",
    imageUrl: "https://picsum.photos/seed/coxao-batata/640/400",
  },
  {
    id: "coxa-charque-batata",
    name: "Coxão de charque com massa de batata",
    description: "Pacote com 10 unidades. Cada unidade pesa 140 g.",
    priceCents: 3800,
    unit: "10un",
    categorySlug: "coxaos",
    imageUrl: "https://picsum.photos/seed/coxao-charque/640/400",
  },
  {
    id: "coxa-mini",
    name: "Mini coxão",
    description: "Pacote com 50 unidades.",
    priceCents: 5000,
    unit: "50un",
    categorySlug: "coxaos",
    imageUrl: "https://picsum.photos/seed/coxao-mini/640/400",
  },

  // Pizzas brotinho — 100g replica entre sabores; 130g replica entre sabores
  {
    id: "pz-100-muss",
    name: "Pizza mussarela 100g",
    description: "Pacote com 10 unidades. Cada unidade pesa 100 g.",
    priceCents: 3500,
    unit: "10un (100g)",
    categorySlug: "pizzas-brotinho",
    imageUrl: "https://picsum.photos/seed/pizza-100-muss/640/400",
  },
  { id: "pz-100-calabresa", name: "Pizza calabresa 100g", description: "Pacote com 10 unidades. Cada unidade pesa 100 g.", priceCents: 3500, unit: "10un (100g)", categorySlug: "pizzas-brotinho", imageUrl: "https://picsum.photos/seed/pizza-100-calab/640/400" },
  { id: "pz-100-frango", name: "Pizza frango 100g", description: "Pacote com 10 unidades. Cada unidade pesa 100 g.", priceCents: 3500, unit: "10un (100g)", categorySlug: "pizzas-brotinho", imageUrl: "https://picsum.photos/seed/pizza-100-frango/640/400" },

  {
    id: "pz-130-muss",
    name: "Pizza mussarela 130g",
    description: "Pacote com 10 unidades. Cada unidade pesa 130 g.",
    priceCents: 4000,
    unit: "10un (130g)",
    categorySlug: "pizzas-brotinho",
    imageUrl: "https://picsum.photos/seed/pizza-130-muss/640/400",
  },
  { id: "pz-130-calabresa", name: "Pizza calabresa 130g", description: "Pacote com 10 unidades. Cada unidade pesa 130 g.", priceCents: 4000, unit: "10un (130g)", categorySlug: "pizzas-brotinho", imageUrl: "https://picsum.photos/seed/pizza-130-calab/640/400" },
  { id: "pz-130-frango", name: "Pizza frango 130g", description: "Pacote com 10 unidades. Cada unidade pesa 130 g.", priceCents: 4000, unit: "10un (130g)", categorySlug: "pizzas-brotinho", imageUrl: "https://picsum.photos/seed/pizza-130-frango/640/400" },

  // Lanches — replica do primeiro (Croissant misto)
  {
    id: "lan-croissant-misto",
    name: "Croissant misto",
    description: "Pacote com 10 unidades. Cada unidade pesa 140 g.",
    priceCents: 3500,
    unit: "10un",
    categorySlug: "lanches",
    imageUrl: "https://picsum.photos/seed/croissant-misto/640/400",
  },
  { id: "lan-croissant-frango", name: "Croissant de frango", description: "Pacote com 10 unidades. Cada unidade pesa 140 g.", priceCents: 3500, unit: "10un", categorySlug: "lanches", imageUrl: "https://picsum.photos/seed/croissant-frango/640/400" },
  { id: "lan-esfirra-carne", name: "Esfirra de carne", description: "Pacote com 10 unidades. Cada unidade pesa 140 g.", priceCents: 3500, unit: "10un", categorySlug: "lanches", imageUrl: "https://picsum.photos/seed/esfirra-carne/640/400" },
  { id: "lan-esfirra-frango", name: "Esfirra de frango", description: "Pacote com 10 unidades. Cada unidade pesa 140 g.", priceCents: 3500, unit: "10un", categorySlug: "lanches", imageUrl: "https://picsum.photos/seed/esfirra-frango/640/400" },
  { id: "lan-esfirra-mista", name: "Esfirra mista (queijo e presunto)", description: "Pacote com 10 unidades. Cada unidade pesa 140 g.", priceCents: 3500, unit: "10un", categorySlug: "lanches", imageUrl: "https://picsum.photos/seed/esfirra-mista/640/400" },
  { id: "lan-pastel-frango", name: "Pastel de frango", description: "Pacote com 10 unidades. Cada unidade pesa 140 g.", priceCents: 3500, unit: "10un", categorySlug: "lanches", imageUrl: "https://picsum.photos/seed/pastel-frango/640/400" },
  { id: "lan-pastel-queijo", name: "Pastel de queijo", description: "Pacote com 10 unidades. Cada unidade pesa 140 g.", priceCents: 3500, unit: "10un", categorySlug: "lanches", imageUrl: "https://picsum.photos/seed/pastel-queijo/640/400" },
  { id: "lan-pao-pizza-frango", name: "Pão pizza de frango", description: "Pacote com 10 unidades. Cada unidade pesa 140 g.", priceCents: 3500, unit: "10un", categorySlug: "lanches", imageUrl: "https://picsum.photos/seed/pao-pizza-frango/640/400" },
  { id: "lan-pao-pizza-misto", name: "Pão pizza misto", description: "Pacote com 10 unidades. Cada unidade pesa 140 g.", priceCents: 3500, unit: "10un", categorySlug: "lanches", imageUrl: "https://picsum.photos/seed/pao-pizza-misto/640/400" },
  { id: "lan-delicia-queijo", name: "Delícia de queijo", description: "Pacote com 10 unidades. Cada unidade pesa 140 g.", priceCents: 3500, unit: "10un", categorySlug: "lanches", imageUrl: "https://picsum.photos/seed/delicia-queijo/640/400" },
];

export const money = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
