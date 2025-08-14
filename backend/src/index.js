import express from 'express'
import authRouter from './routes/auth.route.js'
import messageRouter from './routes/message.route.js'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser';

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const {PORT} = process.env

app.use('/api/auth', authRouter)
app.use('/api/message', messageRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
  connectDB()
})
