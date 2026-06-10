import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);
