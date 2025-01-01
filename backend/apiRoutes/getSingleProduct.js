// routes/getSingleProduct.js
import express from "express";
import { Product } from "../models/Product.js"; // Adjust the import path as needed

const getSingleProduct = () => {
  const router = express.Router();

  router.get("/product/details/:id", async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  return router;
};

export default getSingleProduct;
