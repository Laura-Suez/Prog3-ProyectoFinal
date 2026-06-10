import { Router } from "express";
import { Product } from "../models/Product.js";
import { getAllProducts, getProductById, createProduct, patchProduct, updateProduct, deleteProduct} from "../services/products.service.js";
import { verifyToken } from "../services/authService.js"

const router = Router();

router.get("/products", verifyToken, getAllProducts);
router.get("/products/:id", verifyToken, getProductById);
router.post("/products", verifyToken, createProduct);
router.put("/products/:id", verifyToken, updateProduct);
router.patch("/products/:id", verifyToken, patchProduct);
router.delete("/products/:id", verifyToken, deleteProduct);

export default router;