import React from "react";
import ProductList from "@/components/shared/product/product-list";
import { getProducts } from "@/lib/actions/products.actions";

const HomePage = async () => {
  const products = await getProducts();
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Hare Krishna</h1>
      <ProductList data={products} title="Latest Products" limit={4} />
    </div>
  );
};

export default HomePage;
