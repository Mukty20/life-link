import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()
const app = express()
const MONGO_URI = process.env.MONGO_URI



mongoose.connect(MONGO_URI).then(() => {
    console.log('mongodb connection successful');
}).catch((err) => {
    console.log('mongodb connection failed');
})


app.use(cors({
    origin:['http://localhost:5173',`${process.env.CLIENT_URL}`],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())

//route import
import userRoute from './routes/user.js'
import loginRoute from './routes/login.js'
import signupRoute from './routes/signup.js'
import donationRoute from './routes/donation.js'
import bloodRequestRoute from './routes/bloodrequest.js'

//route usage
app.use('/',userRoute)
app.use('/',loginRoute)
app.use('/',signupRoute)
app.use('/',donationRoute)
app.use('/',bloodRequestRoute)


export default app