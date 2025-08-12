"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;            // id do produto
  name: string;
  priceCents: number;    // preço por pacote
  imageUrl?: string;
  unit?: string;         // ex.: "1kg", "500g", "10un (130g)"
  qty: number;           // quantidade de pacotes
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalItems: () => number;
  subtotalCents: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, qty = 1) =>
        set((state) => {
          const i = state.items.findIndex((x) => x.id === item.id);
          if (i >= 0) {
            const copy = [...state.items];
            copy[i] = { ...copy[i], qty: copy[i].qty + qty };
            return { items: copy };
          }
          return { items: [...state.items, { ...item, qty }] };
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((x) => x.id !== id) })),
      setQty: (id, qty) =>
        set((state) => ({
          items: state.items
            .map((x) => (x.id === id ? { ...x, qty } : x))
            .filter((x) => x.qty > 0),
        })),
      clear: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, x) => acc + x.qty, 0),
      subtotalCents: () =>
        get().items.reduce((acc, x) => acc + x.priceCents * x.qty, 0),
    }),
    {
      name: "queromais-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // só persiste os itens
    }
  )
);
