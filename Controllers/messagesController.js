import userSchema from "../Model/userSchema.js";
import messageSchema from "../Model/messageSchema.js";

export const sendMessage = async (req, res, next) => {
    try {
        const senderId=req.user._id
        const {receiverId,content,type}=req.body

        //check if receiver and sender exists
        const sender = await userSchema.findById(senderId)
        const receiver = await userSchema.findById(receiverId)
        if(!sender || !receiver){
            return next(ErrorHandler(404,'User not found'))
        }

        const message = new messageSchema({
            senderId,
            receiverId,
            content,
            type
        })
        await message.save()

        const nofification = new Notification({
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