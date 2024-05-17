import { request } from "express";
import userSchema from "../Model/userSchema.js";

export const sendFriendRequest = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const { receiverId } = req.body;

    // Check if sender and receiver are existing users
    const sender = await userSchema.findById(senderId);
    const receiver = await userSchema.findById(receiverId);
    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the receiver is already a friend
    if (receiver.friends.includes(senderId)) {
      return res.status(400).json({ message: "You are already friends" });
    }

    // Check if there's already a pending friend request from the sender to the receiver
    if (
      receiver.friendRequests.some(
        (request) => request.sender.toString() === senderId
      )
    ) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // Add the friend request to the receiver's friendRequests
    receiver.friendRequests.push({ sender: senderId });
    await receiver.save();

    res.status(201).json({ message: "Friend request sent" });
  } catch (error) {
    next(error);
  }
};

export const acceptrequest = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { requestId } = req.body;
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const requestIndex = user.friendRequests.findIndex(
      (request) => request.sender.toString() === requestId
    );
    if (requestIndex === -1) {
      return res.status(404).json({ message: "Request not found" });
    }
    //accept the request
    const requesterId = user.friendRequests[requestIndex].sender;
    user.friends.push(requesterId);
    user.friendRequests.splice(requestIndex, 1);
    await user.save();
    const requester = await userSchema.findById(requesterId);
    requester.friends.push(userId);
    await requester.save();
    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    next(error);
  }
};

export const rejectrequest = async (req, res, next) => {
  try {
    const { requestId } = req.body;
    const userId = req.user.id;
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const requestIndex = user.friendRequests.findIndex(
      (request) => request.sender.toString() === requestId
    );
    if (requestIndex === -1) {
      return res.status(404).json({ message: "Request not found" });
    }
    user.friendRequests.splice(requestIndex, 1);
    await user.save();
    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    next(error);
  }
};

export const getFriendRequests = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await userSchema
      .findById(userId)
      .populate("friendRequests.sender", "username");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const friendRequests = user.friendRequests.map((request) => ({
      id: request.sender._id,
      username: request.sender.username,
      status: request.status,
    }));
    res.status(200).json(friendRequests);
  } catch (error) {
    next(error);
  }
};
