import React from "react";
import styles from "../product.module.css";
import { Link } from "react-router-dom";

interface productType {
  id: number;
  name: string;
  url?: string;
  ind?: number;
  price: number;
  description: string;
  color: string;
  productType: string;
  totalQuantity: number;
}

interface propsType {
  product: productType;
  index: number;
}

const ProductItem: React.FC<propsType> = ({ product, index }) => {
  const { name, description, url, price, color, productType, totalQuantity } =
    product;

  return (
    <Link
      to={`/product/details/${product.id}`}
      state={product}
      className={styles.cartLinkContainer}>
      <div className={styles.cardSection}>
        <img src={url || "/default-image.jpg"} alt={name} />

        <div className={styles.text}>
          <p>
            <b>Number</b>: {index + 1}
          </p>
          <h3>{name}</h3>
          <p>
            <b>Description:</b> {description}
          </p>
          <p>
            <b>Price:</b> {price} $
          </p>
          <p>
            <b>color:</b> {color}
          </p>
          <p>
            <b> totalQuantity:</b> {totalQuantity}
          </p>
          <p>
            <b> productType:</b> {productType}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
