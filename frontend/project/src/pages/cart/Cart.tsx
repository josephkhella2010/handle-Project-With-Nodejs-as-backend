/* import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "cart.module.css";
import { useDispatch } from "react-redux";
import { setTotalCartItems, setTotalPrice } from "../../reducer/CartSlice";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(setTotalCartItems(productCart.length));
  }, [TotalPrice, productCart.length, dispatch]);

  console.log(TotalPrice);
 
  async function handleDelete(id: number) {
    try {
      // Call the API to delete the product
      const response = await axios.delete(
        `http://localhost:5000/api/product/deleteCart/${id}`
      );

      if (response.status === 200) {
        const updatedCart = productCart.filter((item) => item.productId !== id);
        setProductCart(updatedCart);
        console.log(`Product with ID ${id} was successfully deleted.`);
      }
    } catch (error: any) {
      console.error("Error deleting product:", error.response?.data || error);
    }
  }
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
                <button onClick={() => handleDelete(productId)}> Delete</button>
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
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTotalCartItems, setTotalPrice } from "../../reducer/CartSlice";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch data from the API
  async function getApi() {
    try {
      const response = await axios(
        "http://localhost:5000/api/product/productCart"
      );
      setProductCart(response.data); // Set cart items
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }

  // Fetch cart data when the component loads
  useEffect(() => {
    getApi();
  }, []);

  // Calculate the total price dynamically
  const TotalPrice = productCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Dispatch cart updates to Redux on every change in the cart
  useEffect(() => {
    dispatch(setTotalPrice(TotalPrice));
    dispatch(setTotalCartItems(productCart.length));
  }, [TotalPrice, productCart.length, dispatch]);

  // Handle product deletion
  async function handleDelete(id: number) {
    try {
      // Send API request to delete the product from the cart
      const response = await axios.delete(
        `http://localhost:5000/api/product/deleteCart/${id}`
      );

      if (response.status === 200) {
        // If the product is successfully deleted from the back-end, update the front-end state
        const updatedCart = productCart.filter((item) => item.productId !== id);
        setProductCart(updatedCart); // Update the state to remove the deleted item
        dispatch(setTotalCartItems(updatedCart.length));

        console.log(`Product with ID ${id} was successfully deleted.`);
      }
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error);
    }
    getApi();
    // Update the Redux store after deletion (optional)
  }

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {productCart.length > 0 ? (
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
                  <b>Description:</b> {description}
                </p>
                <p>
                  <b>Color:</b> {color}
                </p>
                <p>
                  <b>Price:</b> {price} $
                </p>
                <p>
                  <b>Product Type:</b> {productType}
                </p>
                <p>
                  <b>Quantity:</b> {quantity}
                </p>
                <p>
                  <b>Name:</b> {name}
                </p>
                <button onClick={() => handleDelete(productId)}>Delete</button>
              </div>
            );
          })
        ) : (
          <p>Your cart is empty.</p>
        )}
        <p>
          <b>Total Price:</b> {TotalPrice} $
        </p>
        <button onClick={() => navigate("/payment")}>Go to Payment</button>
      </div>
    </div>
  );
}
