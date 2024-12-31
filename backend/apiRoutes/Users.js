import express from "express";

const getUserRouter = (sequelize) => {
  const router = express.Router();
  router.get("/users", async (req, res) => {
    try {
      const users = await sequelize.models.login.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      res
        .status(500)
        .json({ error: "Error fetching users", details: error.message });
    }
  });

  return router;
};

export default getUserRouter;
