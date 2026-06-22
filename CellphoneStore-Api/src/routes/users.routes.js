import { Router } from "express";
import { getUsers, updateUser, deleteUser } from "../services/userServices.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/user",
  verifyToken,
  authorizeRoles("admin", "super-admin"),
  getUsers,
);
router.put("/user/:id", verifyToken, authorizeRoles("super-admin"), updateUser);
router.delete(
  "/user/:id",
  verifyToken,
  authorizeRoles("super-admin"),
  deleteUser,
);
export default router;
