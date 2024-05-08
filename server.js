import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './Routes/userRoutes.js'
import cors from 'cors'
import ErrorHandler from './Middleware/ErrorHandler.js';
import userSchema from './Model/userSchema.js';

dotenv.config()
const app=express()
app.use(cors())

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('mongodb connection successfull'))
.catch((error)=>console.log(error.message))
app.use('/',userRoutes)

app.use(ErrorHandler)
app.listen(9000,()=>{
    console.log('server running on port 9000');
})

