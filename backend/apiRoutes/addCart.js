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

  return router;
};

export default addCartPost;
