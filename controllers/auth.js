import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    // TODO Overview Register
    /*
      0.Validate
      1. Check body
      2. Check Email in DB
      3. Ecrypt Password -> bcryptjs
      4. Save to DB -> Prisma
      5. Response
    */
    // Step 1
    console.log(req.body)
    const { email, name, password } = req.body

    // Step 2 หา email
    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    })
    console.log(user)
    if (user) {
      createError(400, 'Email already exists!!')
    }

    // Step 3 Encrypt password
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword)

    // Step 4
    const result = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashPassword
      }
    })

    res.json({ message: `Register ${result.name} Success` });
  } catch (error) {
    next(error)
  }
};

export const login = async (req, res, next) => {
  try {
    // TODO
    /*
      1. Validate body
      2. Check body
      3. Check Email in DB
      4. Check Password is collect
      5. Create token
      6. Response
    */
    // Step 2 Check body
    const { email, password } = req.body;

    // Step 3 Check Email
    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    })
    console.log(user)
    if (!user) {
      createError(400, "Email or Password is invalid!!!")
    }

    // Step 4 Check Password
    const checkPassword = bcrypt.compareSync(password, user.password)
    if(!checkPassword) {
      createError(400, "Email or Password is invalid!!!")
    }

    // Step 5 Generate Token
    const payload = {
      id: user.id,
      role: user.role,
    }
    const token = jwt.sign(payload, process.env.SECRET, {expiresIn: "1d"});

    res.json({ message: `Welcome back ${user.name}`, payload: payload, token: token });
  } catch (error) {
    next(error)
  }
};