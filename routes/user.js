import express from "express";
import { createUser, deleteUser, listUser, readUser, updateRoleUser } from "../controllers/user.js";
import { authCheck } from "../middlewares/auth.middleware.js";
const router = express.Router();

// ENDPOINT http://localhost:8000/api/users
router.get("/users", authCheck, listUser)
router.get("/user", readUser)
router.post('/user', createUser)
router.patch('/user/role/:id', updateRoleUser)
router.delete('/user/:id', deleteUser)

export default router;