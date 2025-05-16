import express from 'express'
import authRouter from './routes/auth.route.js'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './lib/db.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

const {PORT} = process.env



app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
  connectDB()
})
