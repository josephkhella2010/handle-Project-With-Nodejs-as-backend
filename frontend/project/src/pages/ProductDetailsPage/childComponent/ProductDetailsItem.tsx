import React from "react";
import styles from "../productDetails.module.css";
interface productType {
  name: string;
  url?: string;
  ind?: number;
  price: number;
  description: string;
  imgs?: string[];
}
interface ProductDetailsItemProps {
  singleProduct: productType;
}
const ProductDetailsItem: React.FC<ProductDetailsItemProps> = ({
  singleProduct
}) => {
  return (
    <div>
      <h1>product details</h1>
      <div>
        <div>
          <img src={singleProduct.url} alt="" />
          <div>
            {singleProduct.imgs &&
              singleProduct.imgs.map((item: string, index: number) => {
                return <img src={item} alt="" key={index} />;
              })}
          </div>
        </div>
        <div>
          <div className={styles.text}>
            <p>
              <b>Number</b>: {singleProduct.ind}
            </p>
            <h3>
              <b>name</b>
              {singleProduct.name}
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
