import mongoose from 'mongoose';

const videoStatSchema = new mongoose.Schema({
  chatId: {
    type: Number,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 0
  },
  totalSeconds: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.models.VideoStat ||
  mongoose.model('VideoStat', videoStatSchema);
