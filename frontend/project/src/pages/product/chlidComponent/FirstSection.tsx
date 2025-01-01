import React, { useEffect, useState } from "react";
import styles from "../product.module.css";
import axios from "axios";
import ProductItem from "./ProductItem";
interface productType {
  name: string;
  url?: string;
  ind?: number;
  price: number;
  description: string;
}
export default function FirstSection() {
  const [products, setProducts] = useState<productType[]>([]);
  const getProducts = async () => {
    const getApi = await axios("http://localhost:5000/api/products");
    console.log(getApi.data.products);
    const data = getApi.data.products;
    setProducts(data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className={styles.firstSection}>
      {products &&
        products.map((product, index: number) => {
          return <ProductItem product={product} index={index} key={index} />;
        })}
    </div>
  );
}
