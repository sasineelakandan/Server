import mongoose from 'mongoose';

// Define
const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    equired: true
  },
  receiverId: {
    type: String,
     required:false,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoom', 
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false, 
  },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
