import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productsServices.js";
import { verifyToken } from "../services/authServices.js";

const router = Router();

router.get("/products", verifyToken, getAllProducts);
router.get("/products/:id", verifyToken, getProductById);
router.post("/products", verifyToken, createProduct);
router.put("/products/:id", verifyToken, updateProduct);
router.delete("/products/:id", verifyToken, deleteProduct);

export default router;
