import { Server as SocketIOServer, Socket } from "socket.io";
import Message from "../models/messageModel"; 
import mongoose from "mongoose";
import ChatRoom from "../models/chatRoomModel";

export const socketHandler = (io: SocketIOServer) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // User joins a specific room
    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    // Handle message creation and emit to users in the room
    socket.on("sendMessage", async (data: any) => {
      try {
        const { roomId, message } = data;
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
        await ChatRoom.updateOne(
          { _id: roomId },
          {
            $set: { lastMessage: content },
            $inc: { [incrementField]: 1 }, 
          }
        );

        // Save the message to MongoDB
        const newMessage = new Message({
          roomId,
          sender,
          receiver,
          content,
          timestamp: new Date(),
        });

        const savedMessage = await newMessage.save();
        console.log("Message saved to MongoDB:", savedMessage);

        // Find the chat room details
        const room = await ChatRoom.findById(roomId);
        if (!room) {
          console.log("Room not found:", roomId);
          return;
        }

        // Calculate unread messages count for the sender's side
        let unreadCountuser = 0;
        let unreadCount=0

        // If sender is 'patient', calculate unread count for patient
        if (sender === "patient") {
          const patientRooms = await ChatRoom.find({ doctor: room.doctor });

          unreadCount = patientRooms.reduce(
            (acc, chatRoom) => acc + chatRoom.isReadDc,
            0
          );
          console.log(unreadCount)
        } else {
          // If sender is not 'patient', calculate unread count for doctor
          const doctorRooms = await ChatRoom.find({ patient: room.patient });
          unreadCountuser = doctorRooms.reduce(
            (acc, chatRoom) => acc + chatRoom.isReadUc,
            0
          );
        }


       

        // Emit the unread count to all connected clients
        io.emit("updateUnreaduser", unreadCountuser);

        // Emit the message to the room
        io.to(roomId).emit("receiveMessage", savedMessage);
      } catch (error) {
        console.error("Error creating message:", error);
      }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
