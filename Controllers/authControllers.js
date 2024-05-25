import userSchema from "../Model/userSchema.js";
import { ErrorHandler } from "../Middleware/ErrorHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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
    const verificationToken = crypto.randomBytes(64).toString("hex");

    const newUser = new userSchema({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    try {
      await newUser.save();
      const verificationUrl = `http://localhost:3000/verify/${verificationToken}`;
      await sentEmail(
        email,
        "Verify your email",
        `Click on the link to verify your email: ${verificationUrl}`
      );
      res.status(200).json("Signup Successfull. Please verify your email.");
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || password === "" || email === "") {
    next(ErrorHandler(400, "All fields are required"));
  } else {
    try {
      const user = await userSchema.findOne({ email: email }).exec();
      if (!user) {
        return next(ErrorHandler(404, "User not found"));
      }

      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
        return next(ErrorHandler(400, "Invalid password"));
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } catch (error) {
      next(error);
    }
  }
};

const sentEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  console.log(process.env.EMAIL, process.env.EMAIL_PASSWORD);

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);
};

export const verifyEmail = async (req, res, next) => {
  const { token } = req.body;

  try {
    const user = await userSchema.findOne({ verificationToken: token });

    if (!user) {
      return next(ErrorHandler(400, "Invalid verification token"));
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json("Email verified successfully.");
  } catch (error) {
    next(error);
  }
};

//Reuest to reset password

export const requestResetPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email || email === "") {
    return next(ErrorHandler(400, "Email is required"));
  }

  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return next(ErrorHandler(404, "User not found"));
    }

    const resetToken = crypto.randomBytes(64).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hour validity
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    await sentEmail(
      email,
      "Reset your password",
      `Click on the link to reset your password: ${resetUrl}`
    );
    res.status(200).json("Reset password link sent to your email.");
  } catch (error) {
    next(error);
  }
};

//Reset password

export const resetPassword = async (req, res, next) => {
  const { token, password } = req.body;
  try {
    const user = await userSchema.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return next(ErrorHandler(400, "Invalid or expired token"));
    }

    user.password = bcryptjs.hashSync(password, 10);
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();
    res.status(200).json("Password reset successfully");
  } catch (error) {
    next(error);
  }
};
