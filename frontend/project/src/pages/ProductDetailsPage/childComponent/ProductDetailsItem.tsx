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
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "../productDetails.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setTotalCartItems } from "../../../reducer/CartSlice";
import { useDispatch } from "react-redux";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

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
  /* /////////////////////////////// */
  /* const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  //const [imgsLength, setImgsLength] = useState(0);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const imgs = [
    "/foto/home/homeTwo.jpg",
    "/foto/home/homeTwo.jpg",
    "/foto/home/homeThree.jpg",
    "/foto/home/homeFour.jpg",
    "/foto/home/homeOne.jpg",
    "/foto/home/homeFour.jpg",
    "/foto/home/homeTwo.jpg",
    "/foto/home/homeThree.jpg",
    "/foto/home/homeFour.jpg"
  ];
  const imgsLength = imgs.length;

  const contentRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>(
    "/foto/home/homeOne.jpg"
  );

  function handleClick(num: number, foto: string) {
    setCurrentIndex(num);
    setSelectedImage(foto);
  }
  const getItemWidth = (): number => {
    return itemRef.current ? itemRef.current.offsetWidth : 0;
  };
  useLayoutEffect(() => {
    if (contentRef.current && itemRef.current) {
      setContainerWidth(contentRef.current.offsetWidth);
      setItemWidth(itemRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (contentRef.current && itemRef.current) {
        setContainerWidth(contentRef.current.offsetWidth);
        setItemWidth(itemRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [contentRef, itemRef, itemWidth]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imgsLength - 2 ? 0 : prev + 1));
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imgsLength - 2 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    if (deltaX > 50) {
      handlePrev();
    } else if (deltaX < -50) {
      handleNext();
    } else {
      touchStartX.current = 0;
      touchEndX.current = 0;
    }
  };
  console.log(currentIndex); */
  /* //// */
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>(
    "/foto/home/homeOne.jpg"
  );

  const imgs = [
    "/foto/home/homeTwo.jpg",
    "/foto/home/homeTwo.jpg",
    "/foto/home/homeThree.jpg",
    "/foto/home/homeOne.jpg",
    "/foto/home/homeTwo.jpg",
    "/foto/home/homeThree.jpg"
  ];

  const imgsLength = imgs.length;

  useLayoutEffect(() => {
    if (contentRef.current) {
      const containerSize = contentRef.current.offsetWidth;
      console.log("Container width:", containerSize);
      setContainerWidth(containerSize);
    }

    if (itemRefs.current.length > 0 && itemRefs.current[0]) {
      const firstItemSize = itemRefs.current[0].offsetWidth;
      console.log("First item width:", firstItemSize);
      setItemWidth(firstItemSize);
    }
  });

  // Update on resize
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContainerWidth(contentRef.current.offsetWidth);
      }
      if (itemRefs.current[0]) {
        setItemWidth(itemRefs.current[0].offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imgsLength - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imgsLength - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    if (deltaX > 50) {
      handlePrev();
    } else if (deltaX < -50) {
      handleNext();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleClick = (index: number, foto: string) => {
    setCurrentIndex(index);
    setSelectedImage(foto);
  };

  /* ///////////////////////////////////////////////////////////////////7 */
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
  /* ////////////////////////////////////////////////////////////////////////////////////////////////77 */

  /*  */
  return (
    <div className={styles.productContainer}>
      <div className={styles.imgContainer}>
        <img
          /*  src={singleProduct.url || "/foto/home/homeOne.jpg"} */
          src={selectedImage || "/foto/home/homeOne.jpg"}
          alt={singleProduct.name || "Product"}
          className={styles.mainImage}
        />
        <div className={styles.sliderMainContainer}>
          <div className={styles.arrowContainer}>
            <RiArrowLeftSLine
              className={styles.arrowIconLeft}
              onClick={handlePrev}
            />
            <RiArrowRightSLine
              className={styles.arrowIconRight}
              onClick={handleNext}
            />
          </div>
          <div
            className={styles.sliderContainer}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            <div
              className={styles.sliderSection}
              ref={contentRef}
              style={{
                transform: `translateX(-${currentIndex * (itemWidth + 10)}px)`,
                transition: "transform 0.5s ease-in-out"
              }}>
              {/*           {singleProduct.imgs &&
            singleProduct.imgs.map((item, index) => (
              <img
                src={item}
                alt={`Additional Image ${index + 1}`}
                key={index}
              />
            ))} */}

              {imgs &&
                imgs.map((item, index: number) => {
                  return (
                    <img
                      ref={(el) => (itemRefs.current[index] = el)}
                      key={index}
                      src={item}
                      alt={item}
                      onClick={() => handleClick(index, item)}
                      className={styles.imgsItem}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.textSection}>
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
          <div className={styles.counterContainer}>
            <button onClick={handleDecrement} disabled={quantity <= 1}>
              -
            </button>
            <p>
              <b>Quantity:</b> {quantity}
            </p>
            <button
              onClick={handleIncrement}
              disabled={quantity >= singleProduct.totalQuantity}>
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
        <button onClick={handleAddToCart} className={styles.addCartBtn}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsItem;
