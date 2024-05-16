import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ['image', 'video', 'audio'], required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
}, { timestamps: true });

const Media = mongoose.model('Media', mediaSchema);

export default Media;
