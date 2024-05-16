import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['message', 'mention'], required: true },
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
