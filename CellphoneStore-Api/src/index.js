import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import { sequelize } from "./db.js";
import { User, Product, Order } from "./models/models.js";

const app = express();

try {
  app.use(express.json());
  app.use(cors());

  app.use(authRoutes);
  app.use(productsRoutes);
  app.use(userRoutes);
  app.use(ordersRoutes);

  await sequelize.sync();
  app.listen(PORT);

  console.log(`Server listening on port ${PORT}`);
} catch (error) {
  console.log(`There was an error on initialization`);
}
