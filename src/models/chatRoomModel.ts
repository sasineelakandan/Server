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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

export default ChatRoom;
