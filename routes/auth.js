import express from "express";
import { login, register } from "../controllers/auth.js";
import { loginSchema, registerSchema, validate } from "../validations/validator.js";

const router = express.Router();

// ENDPOINT http://localhost:8000/auth/register
router.post("/register", validate(registerSchema), register)
router.post("/login",validate(loginSchema), login)

export default router;