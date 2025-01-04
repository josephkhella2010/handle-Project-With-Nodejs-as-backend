import React from "react";
import { useSelector } from "react-redux";

export default function Footer() {
  const totalPrice = useSelector((state: any) => state.cart.totalPrice);
  return (
    <div>
      <h1>footer</h1>
      <h1>footer</h1>
      <h1>footer</h1>
      <h1>footer</h1>
      <h1>footer</h1>
      <h1>{totalPrice}</h1>
    </div>
  );
}
