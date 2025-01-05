import express from "express";
//import { Product } from "../models/Product.js"; // Adjust the import path as needed
let cart = []; // In-memory cart to store cart items temporarily

const addCartPost = (sequelize) => {
  const router = express.Router();
  router.post("/product/addCart", async (req, res) => {
    try {
      const {
        id,
        name,
        url,
        description,
        price,
        quantity,
        color,
        productType
      } = req.body;
      const newItem = {
        productId: id,
        name,
        url,
        description,
        price,
        quantity,
        color,
        productType
      };
      cart.push(newItem);

      res.status(200).json({ products: newItem });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "fail with single put request" });
    }
  });
  router.get("/product/productCart", async (req, res) => {
    try {
      res.status(200).json(cart);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "fail get request with add cart" });
    }
  });
  router.delete("/product/deleteCart/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const numericId = Number(id);
      const deletedItem = cart.find((item) => item.productId === numericId);
      if (!deletedItem) {
        return res.status(404).json({ message: "Product not found in cart" });
      }
      cart = cart.filter((item) => item.productId !== numericId);
      return res
        .status(201)
        .json({ message: "Product successfully removed from cart" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "fail delete request with add cart" });
    }
  });

  return router;
};

export default addCartPost;
