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
}

interface propsType {
  product: productType;
  index: number;
}

const ProductItem: React.FC<propsType> = ({ product, index }) => {
  const { name, description, url, price } = product;

  return (
    <Link to={`/product/details/${product.id}`} state={product}>
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
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
