import { Server as SocketIOServer, Socket } from "socket.io";
import Message from "../models/messageModel"; 
import mongoose from "mongoose";
import ChatRoom from "../models/chatRoomModel";
import Notification from "../models/Notification";

export const socketHandler = (io: SocketIOServer) => {

  let onlineUsers: any = {}; 

  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on("userOnline", (userId) => {
      onlineUsers[userId] = socket.id; 
      io.emit("updateUserStatus", onlineUsers); 
    });

    // Handle message creation and emit to users in the room
    socket.on("sendMessage", async (data: any) => {
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

        // Check if the message is a link
        const isLink = /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(content);
        const displayMessage = isLink ? "Video call invitation" : content;
        console.log(isLink)
        const incrementField = sender === "patient" ? "isReadDc" : "isReadUc";
        await ChatRoom.updateOne(
          { _id: roomId },
          {
            $set: { lastMessage: displayMessage },
            $inc: { [incrementField]: 1 },
          }
        );

        const room = await ChatRoom.findById(roomId);
        if (!room) {
          console.log("Room not found:", roomId);
          return;
        }

        const receiverId = sender === "patient" ? room.doctor : room.patient;
        const senderId = sender === "Doctor" ? room.doctor : room.patient;

        // Save message in the database
        const newMessage = new Message({
          roomId,
          sender,
          receiver,
          receiverId,
          senderId,
          content: displayMessage, // Store "Video call invitation" instead of the actual link
          isRead: false, 
          timestamp: new Date(),
        });

        const savedMessage = await newMessage.save();
        console.log("Message saved to MongoDB:", savedMessage);

        // Save notification
        await Notification.updateOne(
          { roomId },
          {
            $set: {
              doctorId: room?.doctor,
              message: displayMessage, // Store "Video call invitation" in notifications
              userId: room?.patient,
              notitype: "Alert",
              timestamp: new Date(),
            },
          },
          { sort: { createdAt: -1 }, upsert: true, new: true }
        );

        const historys = await Notification.findOne({ userId: room?.patient }).populate("doctorId");
        io.emit("Notifications", historys);

        const unreadMessageCount = await Message.countDocuments({
          receiverId,
          isRead: false,
        });

        console.log(`Unread messages for receiver ${receiverId}:`, unreadMessageCount);

        if (receiver === "Doctor") {
          io.emit("updateDoctorUnreadCount", unreadMessageCount);
        } else {
          io.emit("updateUnreadCount", unreadMessageCount);
        }

        // Emit message with "Video call invitation" instead of the actual link
        io.to(roomId).emit("receiveMessage", savedMessage);

        // Emit link notification separately
        if (isLink) {
          console.log("Emitting linkNotification event:", {
            message: "A video call invitation has been shared",
            link: content, // The actual link is emitted separately
            senderId,
            timestamp: message.timestamp,
          });

          io.to(roomId).emit("linkNotification", {
            message: "A video call invitation has been shared",
            link:displayMessage, // The actual video call link
            senderId,
            timestamp: message.timestamp,
          });
        }
      } catch (error) {
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
