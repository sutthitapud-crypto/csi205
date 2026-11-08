"use client";

import Image from "next/image";
import { Button } from "@/components/tailgrids/core/button";
import type { Product } from "@/app/data/products";

type ProductCardProps = {
  product: Product;
  actionLabel: string;
  variant: "danger" | "success";
  onAction: (product: Product) => void;
};

export default function ProductCard({
  product,
  actionLabel,
  variant,
  onAction
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <Image
        src={product.thumbnailUrl}
        alt={product.title}
        width={240}
        height={180}
        className="h-32 w-full object-cover"
      />
      <div className="space-y-2 p-3">
        <h2 className="truncate font-semibold text-gray-800">{product.title}</h2>
        <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
        <Button
          type="button"
          variant={variant}
          appearance="fill"
          size="sm"
          className="w-full"
          onPress={() => onAction(product)}
        >
          {actionLabel}
        </Button>
      </div>
    </article>
  );
}
