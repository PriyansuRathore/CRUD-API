import express from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controller/userController.js";
import validateUserInput from "../middleware/inputValidator.js";

const router = express.Router();

router.post("/user", validateUserInput, createUser);
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/user/:id", validateUserInput, updateUser);
router.delete("/user/:id", deleteUser);

export default router;