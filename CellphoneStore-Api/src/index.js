import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import productsRoutes from "./routes/products.routes.js";
import userRoutes from "./routes/userRoutes.js";
import { sequelize } from "./db.js";
import { User, Product, Order } from "./models/models.js";


const app = express();

try {
  app.use(express.json());
  app.use(cors());

  app.use(productsRoutes);
  app.use(userRoutes);

  app.listen(PORT);
  await sequelize.sync();

  console.log(`Server listening on port ${PORT}`);
} catch (error) {
  console.log(`There was an error on inizialitation`);
}
