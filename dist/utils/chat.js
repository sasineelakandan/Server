import Message from "../models/messageModel";
import mongoose from "mongoose";
import ChatRoom from "../models/chatRoomModel";
export const socketHandler = (io) => {
    let onlineUsers = {};
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
        });
        socket.on("userOnline", (userId) => {
            onlineUsers[userId] = socket.id;
            io.emit("updateUserStatus", onlineUsers);
        });
        // Handle message creation and emit to users in the room
        socket.on("sendMessage", async (data) => {
            try {
                const { roomId, message } = data;
                console.log(message);
                const { sender, receiver, content } = message;
                // Validate the roomId
                if (!mongoose.Types.ObjectId.isValid(roomId)) {
                    console.log("Invalid roomId:", roomId);
                    return;
                }
                // Validate message fields
                if (!sender || !receiver || !content) {
                    console.log("Invalid message data", { sender, receiver, content });
                    return;
                }
                const incrementField = sender === "patient" ? "isReadDc" : "isReadUc";
                await ChatRoom.updateOne({ _id: roomId }, {
                    $set: { lastMessage: content },
                    $inc: { [incrementField]: 1 },
                });
                const room = await ChatRoom.findById(roomId);
                if (!room) {
                    console.log("Room not found:", roomId);
                    return;
                }
                const receiverId = sender === "patient" ? room.doctor : room.patient;
                const senderId = sender === "Doctor" ? room.doctor : room.patient;
                const newMessage = new Message({
                    roomId,
                    sender,
                    receiver,
                    receiverId,
                    senderId,
                    content,
                    isRead: false,
                    timestamp: new Date(),
                });
                const savedMessage = await newMessage.save();
                console.log("Message saved to MongoDB:", savedMessage);
                // Calculate unread message counts for the receiver
                const unreadMessageCount = await Message.countDocuments({
                    receiverId,
                    isRead: false,
                });
                console.log(`Unread messages for receiver ${receiverId}:`, unreadMessageCount);
                if (receiver === "Doctor") {
                    io.emit("updateDoctorUnreadCount", unreadMessageCount);
                }
                else {
                    io.emit("updateUnreadCount", unreadMessageCount);
                }
                // Emit the message to the room
                io.to(roomId).emit("receiveMessage", savedMessage);
            }
            catch (error) {
                console.error("Error creating message:", error);
            }
        });
        // Handle user disconnection
        socket.on("disconnect", () => {
            for (let userId in onlineUsers) {
                if (onlineUsers[userId] === socket.id) {
                    delete onlineUsers[userId];
                    break;
                }
            }
            io.emit("updateUserStatus", onlineUsers);
            console.log("User disconnected:", socket.id);
        });
    });
};
