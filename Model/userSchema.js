import mongoose from "mongoose";

const user = new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String}
})

const userSchema=mongoose.model('user',user)

export default userSchema