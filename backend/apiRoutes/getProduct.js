import express from "express";
const getProduct = (sequelize) => {
  const router = express.Router();
  router.get("/products", async (req, res) => {
    try {
      const products = await sequelize.models.product.findAll();
      res.status(200).json({ products: products });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "fail with get product method" });
    }
  });
  router.put("/products/:id", async (req, res) => {
    try {
      // Ensure productId is accessible
      const productId = req.params.id;

      // Extract update data from the request body
      const { totalQuantity } = req.body;

      // Fetch the product by ID
      const product = await sequelize.models.product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      if (totalQuantity !== undefined) product.totalQuantity = totalQuantity;

      await product.save();

      res
        .status(200)
        .json({ message: "Product updated successfully", product });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  });
  return router;
};
export default getProduct;
