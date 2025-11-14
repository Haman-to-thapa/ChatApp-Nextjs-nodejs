import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import chatRoutes from './routes/chat.js'
import cors from 'cors'

dotenv.config()
connectDb()

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",  // or your Vite port if 5173
    credentials: true,                // allow cookies + authorization header
  })
);


app.use("/api/v1",chatRoutes)


const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Server is start ${port}`)
})