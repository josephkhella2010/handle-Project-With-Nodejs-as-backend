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
  return router;
};
export default getProduct;
