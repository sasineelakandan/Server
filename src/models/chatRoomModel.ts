import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Doctor",
    required: true,
  },
  lastMessage: {
    type: String,
    default: null,
  },
  isReadUc: {
    type: Number,
    default: 0, 
  },
  isReadDc: {
    type: Number,
    default: 0, 
  }
}, { timestamps: true });

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

export default ChatRoom;
