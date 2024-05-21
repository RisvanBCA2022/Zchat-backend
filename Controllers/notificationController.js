import notificationSchema from "../Model/notificationSchema.js";

export const getNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await notificationSchema
      .find({ receiver: userId })
      .populate("sender", "name");
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    next(error);
  }
};
