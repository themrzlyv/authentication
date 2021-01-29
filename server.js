import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from './routes/index.js'
import ConnectDb from './helpers/ConnectDb.js'

dotenv.config()

ConnectDb()

const PORT = process.env.PORT || 3050

const app = express()


app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/" , routes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})