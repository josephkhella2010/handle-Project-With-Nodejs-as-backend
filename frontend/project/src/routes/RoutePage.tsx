import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import MainNavBar from "../pages/navigation/MainNavBar";
import Footer from "../pages/footer/Footer";
import Product from "../pages/product/Product";

export default function RoutePage() {
  return (
    <Router>
      <MainNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
      </Routes>
      <Footer />
    </Router>
  );
}
