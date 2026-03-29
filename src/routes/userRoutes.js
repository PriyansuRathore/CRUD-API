import express from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controller/userController.js";
import validateUserInput from "../middleware/inputValidator.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/user", authMiddleware, validateUserInput, createUser);
router.get("/user", authMiddleware, getAllUsers);
router.get("/user/:id", authMiddleware, getUserById);
router.put("/user/:id", authMiddleware, validateUserInput, updateUser);
router.delete("/user/:id", authMiddleware, deleteUser);

export default router;
