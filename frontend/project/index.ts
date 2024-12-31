/*  in  server.js */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Sequelize } from "sequelize";
import { defineLoginModel } from "./models/Login.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});

defineLoginModel(sequelize);

// Middleware
app.use(cors());
app.use(express.json());

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
      .json({ error: "An error occurred while creating the login." });
  }
});

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the API!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
/* in login */import { DataTypes, Model } from "sequelize";
class Login extends Model {}

export const defineLoginModel = (sequelize) => {
  Login.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      repassword: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "login",
      tableName: "login",
      timestamps: false // No timestamps field (createdAt, updatedAt)
    }
  );
};

export { Login };
