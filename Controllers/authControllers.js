import userSchema from "../Model/userSchema.js";
import { ErrorHandler } from "../Middleware/ErrorHandler.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    next(ErrorHandler(400, "All fields are required"));
  } else {
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new userSchema({
      username,
      email,
      password: hashedPassword,
    });

    try {
      const user = await newUser.save();
      res.status(200).json("Signup Successfull");
    } catch (error) {
      next(error);
    }
  }
};

export const login = async (req,res,next)=>{
    const {email,password}=req.body
    if(!email || !password || password==='' || email===''){
      next(ErrorHandler(400,'All fields are required'))
    }
    else{
      try {
        const user= await userSchema.findOne({email:email}).exec()
        if(!user){
          return next(ErrorHandler(404,'User not found'))
        }
  
        const validPassword=bcryptjs.compareSync(password, user.password)
        if(!validPassword){
          return next(ErrorHandler(400,'Invalid password'))
        }
        const token = jwt.sign(
          {id:user._id},
          process.env.JWT_SECRET
        )
  
        const {password:pass, ...rest}=user._doc
  
        res.status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
      } catch (error) {
        next(error);
      }
    }
}
