import React from "react";
import ProductCard from "./ProductCard";

import { Product } from "./../model";
interface Props{
  products:Product[];
}
const ProductList: React.FC<Props> = ({products}) => {
  return (
    <>
      {products.map((item) => (
        <ProductCard product={item} key={item.id} />
      ))}
    </>
  );
};

export default ProductList;
