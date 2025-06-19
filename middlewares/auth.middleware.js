import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const authCheck = (req, res, next) => {
  try {
    // TODO Overview
    /*
      1. Checck heqader
      2. Split Token Bearer
      3. Verify JWT
      4. Create req.user
    */
    // 1 Check headers
    const header = req.headers.authorization;
    //  console.log(header)
    if (!header) {
      createError(401, "Token is missing!!")
    }
    // 2. Split token
    console.log(header)
    const token = header.split(' ')[1]
    // console.log(token)
    
    // 3. Verify token
    jwt.verify(token, process.env.SECRET, (error, decode) => {
      // console.log(error)
      // console.log(decode)
      if(error) {
        createError(401, "Token is Invalid!!")
      }
      req.user = decode
      next();
    })
  } catch (error) {
    next(error)
  }
}