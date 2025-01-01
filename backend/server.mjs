/* // server.mjs
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Sequelize } from "sequelize";
import { defineLoginModel } from "./models/Login.js"; // Correct ES module import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite" // SQLite file location
});

// Define the Login model using the sequelize instance
defineLoginModel(sequelize);

// Middleware
app.use(cors());
app.use(express.json());

// Sync the Sequelize models to create the database table
(async () => {
  try {
    await sequelize.sync();
    console.log("Login table created successfully.");
  } catch (error) {
    console.error("Error syncing model:", error);
  }
})();

// POST route to create a new login entry
app.post("/api/register", async (req, res) => {
  const { username, email, password, repassword } = req.body;

  if (!username || !email || !password || !repassword) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required." });
  }
  if (password !== repassword) {
    return res.status(400).json({ error: "the password is not matched" });
  }

  try {
    const existingUser = await sequelize.models.login.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use." });
    }

    const newLogin = await sequelize.models.login.create({
      username,
      email,
      password,
      repassword
    });

    res.status(201).json(newLogin);
  } catch (error) {
    console.error("Error creating login:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the register." });
  }
});
// log in post //
app.post("/api/login", async (req, res) => {
  const { username, email, password } = req.body;

  // Ensure that either username or email is provided and password is present
  if ((!username && !email) || !password) {
    return res
      .status(400)
      .json({ error: "Username or email, and password are required." });
  }

  try {
    let user;

    // Find the user by username or email
    if (username) {
      user = await sequelize.models.login.findOne({ where: { username } });
    } else if (email) {
      user = await sequelize.models.login.findOne({ where: { email } });
    }

    // If no user found, return an error
    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    // Compare the plain text password
    if (password !== user.password) {
      return res.status(400).json({ error: "Password is incorrect." });
    }

    // If the password matches, return a success response
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

// get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await sequelize.models.login.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching emails" });
  }
});

// GET route to check the server status
app.get("/", (req, res) => {
  res.send({ message: "Welcome to the API!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 */
// server.mjs or server.js
// server.mjs or server.js
// server.mjs (or server.js)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Sequelize } from "sequelize";
import { defineLoginModel } from "./models/Login.js"; // Correct ES module import
import { defineProductModel } from "./models/Product.js"; // Correct import for Product model
import loginRouter from "./apiRoutes/Login.js";
import registerRouter from "./apiRoutes/register.js";
import getUserRouter from "./apiRoutes/Users.js";
import PostProductRouter from "./apiRoutes/Product.js";
import getProduct from "./apiRoutes/getProduct.js";
import getSingleProduct from "./apiRoutes/getSingleProduct.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite" // SQLite file location
});

// Define the Login model using the sequelize instance
defineLoginModel(sequelize);
defineProductModel(sequelize);

// Middleware
app.use(cors());
app.use(express.json());

// Sync the Sequelize models to create the database table and then start the server
(async() => {
    try {
        await sequelize.sync();
        console.log("Login table created successfully.");

        // Start the server once the database is ready
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error syncing model:", error);
        process.exit(1);
    }
})();

// Register API routes
app.use("/api", registerRouter(sequelize));
app.use("/api", loginRouter(sequelize));
app.use("/api", getUserRouter(sequelize));
app.use("/api", PostProductRouter(sequelize));
app.use("/api", getProduct(sequelize));
app.use("/api/", getSingleProduct(sequelize));

// GET route to check the server status
app.get("/", (req, res) => {
    res.send({ message: "Welcome to the API!" });
});

// Export sequelize for future use
export { sequelize };