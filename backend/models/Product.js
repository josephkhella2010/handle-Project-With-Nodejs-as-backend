/* import { DataTypes, Model } from "sequelize";

// Define the Product model
class Product extends Model {}

export const defineProductModel = (sequelize) => {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // This is the actual primary key
        autoIncrement: true // Auto increment this field
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      price: {
        type: DataTypes.INTEGER, // Use INTEGER for price as it's a whole number (for simplicity, you can use FLOAT for decimals if needed)
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      ind: {
        type: DataTypes.INTEGER,
        allowNull: true, // Make sure it is nullable if you don't want it to be mandatory
        unique: true // Optional: To ensure that ind remains unique
      }
    },
    {
      sequelize,
      modelName: "product",
      tableName: "product", // Table name in the database
      timestamps: true // You can set this to `true` if you want to track created_at and updated_at timestamps
    }
  );
  return Product;
};
export { Product }; */
import { DataTypes, Model } from "sequelize";

// Define the Product model
class Product extends Model {}

export const defineProductModel = (sequelize) => {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Auto increment this field
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      ind: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
      },
      imgs: {
        type: DataTypes.JSON, // Use JSON to store an array of image URLs/paths
        allowNull: true // This can be nullable
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      totalQuantity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true
      },
      productType: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: "product",
      tableName: "product",
      timestamps: true // Track created_at and updated_at timestamps
    }
  );
  return Product;
};

export { Product };
