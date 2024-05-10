import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './Routes/userRoutes.js'
import authRoutes from './Routes/authRoutes.js'
import cors from 'cors'
import {ErrorHandler} from './Middleware/ErrorHandler.js';
import userSchema from './Model/userSchema.js';

dotenv.config()
const app=express()
app.use(cors())

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('mongodb connection successfull'))
.catch((error)=>console.log(error.message))
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)




app.listen(9000,()=>{
    console.log('server running on port 9000');
})


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

  export default app