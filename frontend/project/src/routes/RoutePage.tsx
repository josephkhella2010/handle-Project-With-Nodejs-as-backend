import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import MainNavBar from "../pages/navigation/MainNavBar";
import Footer from "../pages/footer/Footer";
import Product from "../pages/product/Product";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import Cart from "../pages/cart/Cart";
import PaymentPage from "../pages/payment/PaymentPage";

export default function RoutePage() {
  return (
    <Router>
      <MainNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/details/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
