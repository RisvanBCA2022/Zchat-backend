import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()
const app=express()

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('mongodb connection successfull'))
.catch((error)=>console.log(error.message))

app.listen(9000,()=>{
    console.log('server running on port 9000');
})