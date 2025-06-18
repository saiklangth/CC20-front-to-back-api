import express from "express";
import cors from "cors";
import morgan from "morgan";
// Routing
import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"

const app = express();
const PORT = 8000;

// Basic middlewares
app.use(cors()) // Allow cross domains
app.use(morgan('dev')) // Show logs
app.use(express.json()); // for read body

// Routing GET, POST, PUT, PATCH, DELETE
// app.get('/', (req, res) => {
//   // code body
//   res.json({ message: "Hello" })
// })
app.use('/api', userRouter);
app.use('/auth', authRouter);

// Error Handling
app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(err.code || 500).json({message: err.message || "Something Wrong !!"})
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})