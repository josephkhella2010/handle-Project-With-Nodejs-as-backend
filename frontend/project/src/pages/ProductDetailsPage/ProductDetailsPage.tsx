import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./productDetails.module.css";
import ProductDetailsItem from "./childComponent/ProductDetailsItem";

interface ProductType {
  id: number;
  name: string;
  url?: string;
  price: number;
  description: string;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [singleProduct, setSingleProduct] = useState<ProductType | any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/product/details/${Number(id)}`
        );
        if (!response.ok) {
          throw new Error("Error fetching product");
        }

        const data: ProductType = await response.json();
        console.log(data.id);

        setSingleProduct(data); // Store the product details in the state
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.Wrapper}>
        <ProductDetailsItem singleProduct={singleProduct} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
