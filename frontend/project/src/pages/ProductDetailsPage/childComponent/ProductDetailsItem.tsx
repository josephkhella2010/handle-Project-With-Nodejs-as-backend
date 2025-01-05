/* import React, { useEffect, useState } from "react";
import styles from "../productDetails.module.css";

interface ProductType {
  name: string;
  url?: string;
  ind?: number;
  price: number;
  description: string;
  imgs?: string[];
  color?: string;
  totalQuantity?: number;
  quantity?: any;
  productType?: string;
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
  useEffect(()=>{
    const[updateQuantity,setUpdateQuantity]=useState<number>(singleProduct.quantity)

  },[singleProduct.quantity])

  return (
    <div>
      <h1>Product Details</h1>
      <div>
        <div>
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
            <p>
              <b>type:</b> {singleProduct.productType}
            </p>
            <p>
              <b>color:</b> {singleProduct.color}
            </p>
            <div>
              <button>-</button>
              <p>
                <b>quantity:</b> {updateQuantity}
              </p>
              <button>+</button>
            </div>

            <p>
              <b>totalQuantity:</b> {singleProduct.totalQuantity}
            </p>
            <p> totalPrice:{singleProduct.quantity * singleProduct.price} $</p>
          </div>

          <button> Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsItem;
 */
import React, { useEffect, useState } from "react";
import styles from "../productDetails.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setTotalCartItems } from "../../../reducer/CartSlice";
import { useDispatch } from "react-redux";

/* interface ProductType {
  id: number;
  name: string;
  url?: string;
  ind?: number;
  price: number;
  description: string;
  imgs?: string[];
  color?: string;
  totalQuantity: number;
  quantity: number;
  productType?: string;
} */
interface ProductType {
  id: number;
  name: string;
  url?: string;
  ind?: number;
  price: number;
  description: string;
  imgs: any;
  color?: string;
  quantity: number;
  productType?: string;
  totalQuantity: number; // Ensure totalQuantity is part of the type definition
}

interface ProductDetailsItemProps {
  singleProduct: ProductType | null;
}

const ProductDetailsItem: React.FC<ProductDetailsItemProps> = ({
  singleProduct
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [remainingStock, setRemainingStock] = useState<number>(0);
  const [cartProduct, setCartProduct] = useState<ProductType[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (singleProduct) {
      setQuantity(singleProduct.quantity);
      setRemainingStock(singleProduct.totalQuantity - singleProduct.quantity);
    }
  }, [singleProduct]);

  const handleIncrement = () => {
    if (singleProduct && quantity < singleProduct.totalQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (singleProduct) {
      setRemainingStock(singleProduct.totalQuantity - quantity);
    }
  }, [quantity, singleProduct]);

  async function handleAddToCart() {
    if (!singleProduct) {
      console.error("Product is null");
      return; // Exit the function early if singleProduct is null
    }
    try {
      await axios.put(
        `http://localhost:5000/api/products/${singleProduct.id}`,
        {
          totalQuantity: remainingStock
        }
      );
      console.log("Product stock updated successfully.");
    } catch (error) {
      console.error("Error updating product stock:", error);
    }
    try {
      const newItem: ProductType = {
        id: singleProduct.id,
        name: singleProduct.name,
        url: singleProduct.url,
        ind: singleProduct.ind,
        price: singleProduct.price * quantity,
        description: singleProduct.description,
        imgs: singleProduct.img,
        color: singleProduct.color,
        quantity: quantity,
        productType: singleProduct.productType,
        totalQuantity: remainingStock
      };
      const postApi = await axios.post(
        "http://localhost:5000/api/product/addCart",
        newItem
      );

      //console.log(postApi.data.products);
    } catch (error) {
      console.log(error);
    }
    const getAllCartItem = await axios(
      "http://localhost:5000/api/product/productCart"
    );
    // console.log(getAllCartItem.data);
    const getAllCartItemLenght = getAllCartItem.data.length;

    dispatch(setTotalCartItems(getAllCartItemLenght));
  }
  //console.log(cartProduct);
  if (!singleProduct) {
    return <div>Loading product details...</div>;
  }

  const totalPrice = quantity * singleProduct.price;

  return (
    <div>
      <h1>Product Details</h1>
      <div>
        <div>
          {/* Render the main product image, if available */}
          <img
            src={singleProduct.url || "/default-image.jpg"}
            alt={singleProduct.name || "Product"}
          />
          <div>
            {singleProduct.imgs &&
              singleProduct.imgs.map((item, index) => (
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
              <b>Number:</b> {singleProduct.ind}
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
            <p>
              <b>Type:</b> {singleProduct.productType}
            </p>
            <p>
              <b>Color:</b> {singleProduct.color}
            </p>
            <div>
              <button onClick={handleDecrement} disabled={quantity <= 1}>
                -
              </button>
              <p>
                <b>Quantity:</b> {quantity}
              </p>
              <button
                onClick={handleIncrement}
                disabled={quantity >= singleProduct.totalQuantity}
              >
                +
              </button>
            </div>
            <p>
              <b>Total Quantity Remaining:</b> {remainingStock}
            </p>
            <p>
              <b>Total Price:</b> {totalPrice} $
            </p>
          </div>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsItem;
