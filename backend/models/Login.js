// models/Login.js
import { DataTypes, Model } from "sequelize";

// Define the Login model
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
      timestamps: false
    }
  );
};

export { Login };
