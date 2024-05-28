import groupSchema from "../Model/groupSchema.js";
import userSchema from "../Model/userSchema.js";

export const createGroup = async (req, res, next) => {
  try {
    const { name, description, members } = req.body;
    const creatorId = req.user.id;

    const validMembers = await userSchema.find({ _id: { $in: members } });
    if (!validMembers) {
      return next(ErrorHandler(404, "one or more users not found"));
    }
    const newGroup = new groupSchema({
      name,
      description,
      members: [...members, creatorId],
      admins: [creatorId],
    });
    await newGroup.save();

    res.status(201).json({ success: true, group: newGroup });
  } catch (error) {
    next(error);
  }
};

export const addMembers = async (req, res, next) => {
  try {
    const { groupId, memberIds } = req.body;
    const creatorId = req.user.id;

    const group = await groupSchema.findById(groupId);
    if (!group) {
      return next(ErrorHandler(404, "Group not found"));
    }

    if (!group.admins.includes(creatorId)) {
      return next(ErrorHandler(403, "Only admins can add members"));
    }

    const validMembers = await userSchema.find({ _id: { $in: members } });
    if (!validMembers) {
      return next(ErrorHandler(404, "one or more users not found"));
    }

    memberIds.forEach((memberId) => {
      if (!group.members.includes(memberId)) {
        group.members.push(memberId);
      }
    });
    
    await group.save();

    res.status(200).json({ success: true, group });
  } catch (error) {
    next(error);
  }
};