"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Check } from "lucide-react";
import { useCart } from "@/stores/cart";

type Props = {
  title: string;
  subtitle?: string;
  description?: string;
  price: string;
  oldPrice?: string;
  imageUrl?: string;
  minOrder?: number;
  priority?: boolean;
  onAdd?: (qty: number) => void;
};

export default function ProductCard({
  title, subtitle, description, price, oldPrice, imageUrl, minOrder = 1, priority = false, onAdd,
}: Props) {
  const [qty, setQty] = useState(minOrder);
  const [showTooltip, setShowTooltip] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const dec = () => setQty((q) => Math.max(minOrder, q - 1));
  const inc = () => setQty((q) => q + 1);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const handleAddToCart = () => {
    onAdd?.(qty);
    setShowTooltip(true);
    setQty(minOrder);
  };

  return (
    <Card className="group relative flex flex-col sm:flex-row items-stretch gap-5 p-4 rounded-3xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] transition-all duration-300 bg-white">
      <div className="relative h-44 w-full sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-2xl bg-muted">
        {imageUrl ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(min-width: 640px) 128px, calc(100vw - 4rem)"
              className={`object-cover transition-all duration-500 md:group-hover:scale-110 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              priority={priority}
              onLoad={() => setImgLoaded(true)}
            />
          </>
        ) : (
          <div className="h-full w-full grid place-content-center text-xs text-muted-foreground font-medium uppercase tracking-tighter opacity-40">
            Sem Imagem
          </div>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {priority && (
            <span className="bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Destaque
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between py-1">
        <div>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[11px] font-medium text-muted-foreground/80 mt-1 flex items-center gap-1.5 uppercase tracking-wide">
                  <span className="w-1 h-1 rounded-full bg-primary/40" />
                  {subtitle}
                </p>
              )}
            </div>
            <div className="text-left sm:text-right shrink-0">
              <div className="text-xl font-black text-primary tracking-tight">
                {price}
              </div>
              {oldPrice && (
                <div className="text-xs text-muted-foreground/60 line-through font-medium">
                  {oldPrice}
                </div>
              )}
            </div>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground/70 line-clamp-2 mt-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-center sm:justify-end gap-3">
          <div className="flex items-center bg-muted/40 rounded-xl p-1 w-full sm:w-auto">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg hover:bg-white hover:shadow-sm transition-all"
              onClick={dec}
              aria-label="Diminuir"
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span className="w-10 text-center text-sm font-bold tabular-nums">
              {qty}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg hover:bg-white hover:shadow-sm transition-all"
              onClick={inc}
              aria-label="Aumentar"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          <Button
            className="relative h-10 w-full sm:w-auto px-6 bg-primary text-primary-foreground font-bold rounded-xl shadow-[0_4px_15px_-3px_rgba(var(--primary),0.3)] hover:opacity-90 active:scale-95 transition-all overflow-hidden"
            onClick={handleAddToCart}
          >
            <span className={`flex items-center gap-2 transition-transform duration-300 ${showTooltip ? '-translate-y-10' : 'translate-y-0'}`}>
              Adicionar
            </span>
            <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-300 ${showTooltip ? 'translate-y-0' : 'translate-y-10'}`}>
              <Check className="h-4 w-4" />
              Adicionado
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
