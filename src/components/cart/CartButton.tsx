"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/stores/cart";
import CartSheet from "@/components/cart/CartSheet";

export default function CartButton() {
  const total = useCart((s) => s.totalItems());
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative rounded-lg px-3 py-2 bg-white/90 text-[hsl(28,45%,35%)] shadow hover:bg-white transition"
        aria-label="Abrir carrinho"
      >
        <ShoppingCart className="inline-block h-5 w-5 align-middle" />
        {total > 0 && (
          <span className="absolute -top-2 -right-2 rounded-full bg-red-600 text-white text-xs h-5 min-w-[20px] px-1 grid place-items-center">
            {total}
          </span>
        )}
      </button>

      <CartSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
