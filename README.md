# Server
###### https://www.canva.com/design/DAGqkg_V-1k/VFSbUa45RrcKz_Vr_p3ebg/view?utm_content=DAGqkg_V-1k&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h787ad91364

## Step 1 Setup server
```bash
npm init -y
npm install express
```
- "type": "module"
- "dev": "nodemon server"

## Step 2 Basic middleware
```bash
npm install cors morgan nodemon
```
- Test Server

## Step 3 Folder routes
- folder routes --> user.js --> export to server.js
- Test Postman

## Step 4 Folder controller
- folder controllers --> user.js --> export to routes/user.js
- ลบ function เก่าออกแล้วนำใน controller มาเชื่อม
- Test Postman
- try, catch ภายหลัง

## Step 5 routes --> auth.js
- copy routes/user.js --> auth.js --> /register, /login export to server.js
- folder controllers --> auth.js --> export to routes/auth.js
- Test Postman

## Git
```bash
npx prisma init --datasource-provider mysql
git init
git add .
git commit -m "message"
git push
```

## Step 6 Folder middlewares
- auth.middleware.js --> export to routes/user.js
```bash
export const authCheck = (req, res, next) => {
  if (true) {
    console.log("This is middleware")
    next()
  }
}
```
- server.js ดักจับ Error
```bash
app.use((err, req, res, next) => {
  res.status(500).json({message: "Something Wrong !!"})
})
```

## Step 7 Folder utils
- createError.js --> controllers/user.js
```bash
export const createError = (code, msg) => {
  const error = new Error(msg);
  error.code = code;
  throw error;
};
```

## Step 8 Prisma
```bash
npm install prisma
```
- .env --> DATABASE_URL="mysql://root:password@localhost:3306/workshopKtam"
- model --> schema.prisma
```bash
npx prisma migrate dev --name init
npm install @prisma/client
```
```bash
model User {
  id        Int      @id @default(autoincrement())
  email     String
  name      String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  role      Role     @default(USER)
}
```

## Step 9 Folder config
- prisma.js
```bash
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default prisma;
```

## Step 10 auth.js
### TODO Overview Register
0. Validate (กลับไปเขียนใน orutes/auth.js ก่อนค่อยย้าย file) --> validations/validator.js
```bash
npm install yup
```
```bash
// Validate with yup
import { object, ref, string } from "yup";

const registerSchema = object({
  email: string().email("Email ไม่ถูกต้อง").required("Please fill Email"),
  name: string().min(2, "Name ต้องมากกว่า 2 อักขระ"),
  password: string().min(6, "Password ต้องมากกว่า 6 ตัว"),
  confirmPassword: string().oneOf([ref("password"), null], "Corfirm Password wrong"),
})
const validate = (schema) => async (req, res, next) => {
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
```
1. Check body --> console.log(req.body) --> destructuring
```bash
console.log(req.body)
const { email, name, password } = req.body
```
2. Check Email in DB (email: email ) --> (ค้น email จาก db): (ส่งจาก postman ไปค้น)
```bash
 const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    })
```
3. Ecrypt Password -> bcryptjs
```bash
npm install bcryptjs jsonwebtoken

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
```
4. Save to DB -> Prisma
```bash
  const result = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashPassword
      }
    })
```
5. Response

### TODO Overview Login
1. Validate body
- โค้ด register เอามาแค่ email, password
2. Check body --> destructuring
```bash
const { email, password } = req.body;
```
3. Check Email in DB
```bash
 const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    })
    console.log(user)
    if (!user) {
      createError(400, "Email or Password is invalid!!!")
    }
```
4. Check Password is collect
```bash
const checkPassword = bcrypt.compareSync(password, user.password)
    if(!checkPassword) {
      createError(400, "Email or Password is invalid!!!")
    }
```
5. Create token
```bash
   const payload = {
      id: user.id,
      role: user.role,
    }
    const token = jwt.sign(payload, process.env.SECRET, {expiresIn: "1d"});
```
6. Response

### TODO Overview Middleware
1. Checck header
```bash
const header = req.headers.authorization;
console.log(header)
```
2. Split Token Bearer
```bash
const token = header.split(' ')[1]
console.log(token)
```
3. Verify JWT (import from jsonwebtoken) --> รับ token, secret, arrow(error, decode)
```bash
jwt.verify(token, process.env.SECRET, (error, decode) => {
  console.log(error)
  console.log(decode)
  if(error) {
    createError(401, "Token is Invalid!!")
  }
  req.user = decode
  next();
})
```
4. Create req.user