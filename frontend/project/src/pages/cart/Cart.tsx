import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "cart.module.css";
import { useDispatch } from "react-redux";
import { setTotalPrice } from "../../reducer/CartSlice";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  interface productCartType {
    color: string;
    description: string;
    name: string;
    price: number;
    productId: number;
    productType: string;
    quantity: number;
    url: string;
  }
  const [productCart, setProductCart] = useState<productCartType[]>([]);
  async function getApi() {
    const getApi = await axios("http://localhost:5000/api/product/productCart");
    console.log(getApi.data);
    setProductCart(getApi.data);
  }
  useEffect(() => {
    getApi();
  }, []);
  const TotalPrice = productCart.reduce(
    (total, item) => total + (item.price || 0),
    0
  );
  useEffect(() => {
    dispatch(setTotalPrice(TotalPrice));
  }, [TotalPrice]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(TotalPrice);
  return (
    <div>
      <h1>cart</h1>
      <div>
        {productCart &&
          productCart.map((item, index: number) => {
            const {
              color,
              description,
              name,
              price,
              productId,
              productType,
              quantity,
              url
            } = item;
            return (
              <div key={index}>
                <img src={url} alt={name} />
                <p>
                  <b>description</b>
                  {description}
                </p>
                <p>
                  <b>color</b>
                  {color}
                </p>
                <p>
                  <b>price</b>
                  {price} $
                </p>
                <p>
                  <b>productType</b>
                  {productType}
                </p>
                <p>
                  <b>quantity</b>
                  {quantity}
                </p>
                <p>
                  <b>name</b>
                  {name}
                </p>
              </div>
            );
          })}
        <p>
          <b>Total Price</b>:{TotalPrice}
        </p>
        <button onClick={() => navigate("/payment")}>Go to payment</button>
      </div>
    </div>
  );
}
