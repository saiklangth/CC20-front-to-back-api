import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";

export const listUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findMany({
      omit: {
        password: true
      }
    })
    console.log(user)
    res.json({ message: "This is List All User", result: user });
  } catch (error) {
    next(error);
  }
};

export const updateRoleUser = async (req, res) => {
  try {
    // 1. Read params & body
    const { id } = req.params
    const { role } = req.body
    console.log(id, role)
    res.json({ message: "This is Update Role User" });
  } catch (error) {
    next(error)
  }
};

export const deleteUser = async (req, res) => {
  try {
    res.json({ message: "This is Delete User" });
  } catch (error) {
    next(error)
  }
};

export const readUser = async (req, res) => {
  try {
    res.json({ message: "This is Read User" });
  } catch (error) {
    next(error)
  }
};

export const createUser = (req, res) => {
  try {
    res.json({ message: "This is Create User" });
  } catch (error) {
    next(error)
  }
};
