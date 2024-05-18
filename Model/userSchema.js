import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index:true, // for faster search
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index:true, // for faster search
    },
    password: {
      type: String,
      required: true,
    },
    verificationToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    friendRequests: [{
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
      },
    }],
  },
  { timestamps: true }
);

const userSchema = mongoose.model("user", user);

export default userSchema;
