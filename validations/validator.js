// Validate with yup
import { object, ref, string } from "yup";

export const registerSchema = object({
  email: string().email("Email ไม่ถูกต้อง").required("Please fill Email"),
  name: string().min(2, "Name ต้องมากกว่า 2 อักขระ"),
  password: string().min(6, "Password ต้องมากกว่า 6 ตัว"),
  confirmPassword: string().oneOf([ref("password"), null], "Corfirm Password wrong"),
})

export const loginSchema = object({
  email: string().email("Email ไม่ถูกต้อง").required("Please fill Email"),
  password: string().min(6, "Password ต้องมากกว่า 6 ตัว"),
})

export const validate = (schema) => async (req, res, next) => {
  try {
    // console.log('This is validate', req.body);
    await schema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    // console.log(error)
    const errMsg = error.errors.map((item) => item)
    // console.log(errMsg)
    const errTxt = errMsg.join(",")
    // console.log(errTxt)
    const mergeErr = new Error(errTxt)
    next(mergeErr)
  }
}