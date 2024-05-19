import userSchema from "../Model/userSchema.js";
import messageSchema from "../Model/messageSchema.js";
import notificationSchema from "../Model/notificationSchema.js";

export const sendMessage = async (req, res, next) => {
    try {
        const senderId=req.user.id
        const {receiverId,content,type}=req.body

        //check if receiver and sender exists
        const sender = await userSchema.findById(senderId)
        const receiver = await userSchema.findById(receiverId)
        if(!sender || !receiver){
            return next(ErrorHandler(404,'User not found'))
        }
        if (!sender.friends.includes(receiverId)) {
            return res.status(400).json({ message: "You can only send messages to friends" });
          }

        const message = new messageSchema({
            senderId,
            receiverId,
            content,
            type
        })
        await message.save()

        const nofification = new notificationSchema({
            recipient: receiverId,
            content: `New ${type} message from ${sender.username}`,
            type: 'message',
        })

        await nofification.save()

        res.status(200).json({success:true,message})

        

    } catch (error) {
        next(error)
    }
}

export const getMessages = async (req, res, next) => {
    try {
      const userId1 = req.user.id;  // Authenticated user ID
      const { userId2 } = req.params;  // Other user ID
  
      // Fetch messages between the two users
      const messages = await messageSchema.find({
        $or: [
          { sender: userId1, receiver: userId2 },
          { sender: userId2, receiver: userId1 }
        ]
      }).sort({ createdAt: 1 });
  
      res.status(200).json({ success: true, messages });
    } catch (error) {
      next(error);
    }
  };