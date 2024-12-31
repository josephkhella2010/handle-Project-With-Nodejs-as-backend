import express from "express";

const loginRouter = (sequelize) => {
  const router = express.Router();

  router.post("/login", async (req, res) => {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
      return res
        .status(400)
        .json({ error: "Username or email, and password are required." });
    }

    try {
      let user;
      if (username) {
        user = await sequelize.models.login.findOne({ where: { username } });
      } else if (email) {
        user = await sequelize.models.login.findOne({ where: { email } });
      }

      if (!user) {
        return res.status(400).json({ error: "User not found." });
      }

      if (password !== user.password) {
        return res.status(400).json({ error: "Password is incorrect." });
      }

      res.status(200).json({
        message: "Login successful.",
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error("Error during login:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the login." });
    }
  });

  return router;
};

export default loginRouter;
