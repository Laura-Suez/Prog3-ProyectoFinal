import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { PORT } from "./config.js";
import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import { sequelize } from "./db.js";
import { User, Product, Order } from "./models/models.js";
import { runSeeders } from "./seeders/seed.js";

dotenv.config();

const app = express();

try {
  app.use(express.json());
  app.use(
    cors({
      origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    }),
  );

  app.use(authRoutes);
  app.use(productsRoutes);
  app.use(userRoutes);
  app.use(ordersRoutes);

  await sequelize.sync();
  await runSeeders();
  app.listen(PORT);

  console.log(`Server listening on port ${PORT}`);
} catch (error) {
  console.log(`There was an error on initialization`);
}
