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
  onAdd?: (qty: number) => void;
};

export default function ProductCard({
  title, subtitle, description, price, oldPrice, imageUrl, minOrder = 1, onAdd,
}: Props) {
  const [qty, setQty] = useState(minOrder);
  const [showTooltip, setShowTooltip] = useState(false);
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
    <Card className="flex flex-col sm:flex-row items-stretch gap-4 p-4 rounded-xl shadow-sm hover:shadow-md transition bg-white">
      <div className="relative h-32 w-full sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-lg">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        ) : <div className="h-full w-full grid place-content-center text-xs text-muted-foreground">sem imagem</div>}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold leading-tight line-clamp-2 sm:truncate">{title}</h3>
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
            )}
          </div>
          <div className="text-left sm:text-right shrink-0 mt-1 sm:mt-0">
            <div className="font-semibold text-[hsl(7,80%,40%)]">{price}</div>
            {oldPrice && <div className="text-xs text-muted-foreground line-through">{oldPrice}</div>}
          </div>
        </div>

        <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-2">
          <div className="flex items-center rounded-lg border border-border">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary" onClick={dec} aria-label="Diminuir"><Minus className="h-4 w-4" /></Button>
            <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary" onClick={inc} aria-label="Aumentar"><Plus className="h-4 w-4" /></Button>
          </div>
          <div className="relative w-full sm:w-auto">
            <Button 
              className="h-9 w-full sm:w-auto px-3 bg-primary text-primary-foreground hover:opacity-90" 
              onClick={handleAddToCart}
            >
              {showTooltip ? 'Adicionado' : 'Adicionar'}
              {showTooltip && <Check className="ml-1 h-4 w-4" />}
            </Button>
            
            {showTooltip && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs py-1 px-2 rounded shadow-md whitespace-nowrap animate-fade-in">
                Produto adicionado!
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
