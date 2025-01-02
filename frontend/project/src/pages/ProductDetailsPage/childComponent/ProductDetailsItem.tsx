import React from "react";
import styles from "../productDetails.module.css";

interface ProductType {
  name: string;
  url?: string;
  ind?: number;
  price: number;
  description: string;
  imgs?: string[];
}

interface ProductDetailsItemProps {
  singleProduct: ProductType | null;
}

const ProductDetailsItem: React.FC<ProductDetailsItemProps> = ({
  singleProduct
}) => {
  if (!singleProduct) {
    return <div>Loading product details...</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <div>
        <div>
          {/* Render the main product image, if available */}
          <img
            src={singleProduct?.url || "/default-image.jpg"}
            alt={singleProduct?.name || "Product"}
          />
          <div>
            {singleProduct.imgs &&
              singleProduct.imgs.map((item: string, index: number) => (
                <img
                  src={item}
                  alt={`Additional Image ${index + 1}`}
                  key={index}
                />
              ))}
          </div>
        </div>
        <div>
          <div className={styles.text}>
            <p>
              <b>Number</b>: {singleProduct.ind}
            </p>
            <h3>
              <b>Name:</b> {singleProduct.name}
            </h3>
            <p>
              <b>Description:</b> {singleProduct.description}
            </p>
            <p>
              <b>Price:</b> {singleProduct.price} $
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsItem;
