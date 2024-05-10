import express from 'express'
import userSchema from '../Model/userSchema.js'
const router=express.Router()

router.get('/gettotalusers',async (req,res)=>{
    try {
        const response= await userSchema.countDocuments()
        console.log(response)
         res.status(200).json({data:response})
    } catch (error) {
        res.send(error.message)
    }
})

export default router