import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true } 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('super-admin', 'admin', 'usuario'), 
    defaultValue: 'usuario',
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
  ,
  },
  {
  timestamps: false 
});