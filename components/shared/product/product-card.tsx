import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "@/types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            width={300}
            height={300}
            alt={product.name}
            priority
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-1">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-medium">{product.name}</h2>
        </Link>
        <div className="flex-between">
          <p className="text-md">{product.rating} stars</p>
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="font-bold text-lg text-destructive">Out of stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
