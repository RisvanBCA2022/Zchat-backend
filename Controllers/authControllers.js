import userSchema from "../Model/userSchema.js";
import { ErrorHandler } from "../Middleware/ErrorHandler.js";
import bcryptjs from "bcryptjs";

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
      const user=await newUser.save();
      res.json("Signup Successfull");
    } catch (error) {
      next(error);
    }
  }
};
