import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productsServices.js";
import { verifyToken, authorizeRoles } from "../services/authServices.js";

const router = Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post(
  "/products",
  verifyToken,
  authorizeRoles("admin", "super-admin"),
  createProduct,
);
router.put(
  "/products/:id",
  verifyToken,
  authorizeRoles("admin", "super-admin"),
  updateProduct,
);
router.delete(
  "/products/:id",
  verifyToken,
  authorizeRoles("admin", "super-admin"),
  deleteProduct,
);

export default router;
