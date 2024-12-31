import express from "express";

const registerRouter = (sequelize) => {
  const router = express.Router();

  // POST route for register
  router.post("/register", async (req, res) => {
    const { username, email, password, repassword } = req.body;

    if (!username || !email || !password || !repassword) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required." });
    }

    if (password !== repassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    try {
      const existingUser = await sequelize.models.login.findOne({
        where: { email }
      });

      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use." });
      }

      const newUser = await sequelize.models.login.create({
        username,
        email,
        password,
        repassword
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while registering the user." });
    }
  });

  return router;
};

export default registerRouter;
