import groupSchema from '../Model/groupSchema.js'
import userSchema from '../Model/userSchema.js'

export const createGroup = async (req, res, next) => {
    try {
        const { name, description, members } = req.body
        const creatorId = req.user.id

        const validMembers = await userSchema.find({ _id: { $in: members } })
        if (!validMembers) {
            return next(ErrorHandler(404, 'one or more users not found'))
        }
        const newGroup = new groupSchema({
            name,
            description,
            members: [...members, creatorId],
            admins: [creatorId]
        })
        await newGroup.save()

        res.status(201).json({ success: true, group: newGroup })

    } catch (error) {
        next(error)
    }

}