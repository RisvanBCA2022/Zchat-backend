import userSchema from "../Model/userSchema";

export const sendFriendRequest = async (req, res, next) => {
try {
    const {senderId,receiverId}=req.body;

    //check if sender and receiver are existing users

    const sender = await userSchema.findById(senderId)
    const receiver = await userSchema.findById(receiverId)
    if(!sender || !receiver){
        return res.status(404).json({message:"User not found"})
    }

    //check if the receiver is already a friend or there's a pending request
    if(sender.friends.includes(receiverId)){
        return res.status(400).json({message:"You are already friends"})
    }

    if(sender.friendRequests.some(request=>request.sender.toString()===receiverId)){
        return res.status(400).json({message:"Friend request already sent"})
    }

    sender.friendRequests.push({sender:receiverId})
    await sender.save()
    res.status(201).json({message:"Friend request sent"})
    
} catch (error) {
    next(error)
}
}