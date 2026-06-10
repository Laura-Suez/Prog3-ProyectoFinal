import { Router } from "express";
import { getUsers, updateUser, deleteUser } from "../services/userServices.js";
import { verifyToken } from "../services/authServices.js";

const router = Router();

router.get("/user", verifyToken, getUsers);
router.put("/user/:id", verifyToken, updateUser);
router.delete("/user/:id", verifyToken, deleteUser);

export default router;
