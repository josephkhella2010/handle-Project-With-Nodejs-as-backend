import express from "express";
import { Product } from "../models/Product.js";

const PostProductRouter = (sequelize) => {
  const router = express.Router();

  router.post("/add-product", async (req, res) => {
    const {
      name,
      url,
      description,
      price,
      imgs,
      quantity,
      totalQuantity,
      color,
      productType
    } = req.body;
    try {
      const maxInd = (await Product.max("ind")) || 0; // Find the current maximum value of `ind`
      const newProduct = await Product.create({
        name,
        description,
        price,
        url,
        imgs,
        ind: maxInd + 1,
        quantity,
        totalQuantity,
        color,
        productType
      });
      res.status(201).json({
        products: newProduct,
        message: "Product created successfully."
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "failed with post product" });
    }
  });

  return router; // Ensure this is outside the try-catch block
};

export default PostProductRouter;
