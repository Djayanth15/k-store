"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);
  console.log(images);

  return (
    <div>
      <Image
        src={images[current]}
        alt="product"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"
      />
      <div className="mt-2 flex">
        {images.map((img, index) => (
          <div
            key={img}
            onClick={() => setCurrent(index)}
            className={cn(
              "border mr-2 cursor-pointer hover:border-orange-600",
              current === index && "border-orange-500"
            )}
          >
            <Image src={img} alt="product image" width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
