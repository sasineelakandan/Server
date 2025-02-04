import { Server as SocketIOServer, Socket } from "socket.io";
import Message from "../models/messageModel"; 
import mongoose from "mongoose";
import ChatRoom from "../models/chatRoomModel";
import Notification from "../models/Notification";

export const socketHandler = (io: SocketIOServer) => {

let onlineUsers:any = {}; 
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
        console.log(message)
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
        const isLink = /^https?:\/\/[^\s$.?#].[^\s]*$/i.test( message?.content);
    const messageContent = isLink
      ? "Video call "  // If it's a link, label it as "Video call invitation"
      :  message?.content ;
        const incrementField = sender === "patient" ? "isReadDc" : "isReadUc";
        await ChatRoom.updateOne(
          { _id: roomId },
          {
            $set: { lastMessage: content },
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

        const newMessage = new Message({
          roomId,
          sender,
          receiver,
          receiverId,
          senderId,
          content:message.content,
          isRead: false, 
          timestamp: new Date(),
        });

     

        const savedMessage = await newMessage.save();
        console.log("Message saved to MongoDB:", savedMessage);
        const notiMessage = await Notification.updateOne(
          { roomId },
          {
            $set: {
              doctorId: room?.doctor,
              message: message.content,
              userId: room?.patient,
              notitype: 'Alert',
              timestamp: new Date()
            }
          },
          { sort: { createdAt: -1 }, upsert:true, new: true } // Always update the latest document
        );
        const historys = await Notification.findOne({userId:room?.patient}).populate('doctorId');
     
        io.emit('Notifications',historys)
        const unreadMessageCount = await Message.countDocuments({
          receiverId,
          isRead: false,
        });

        

        

        console.log(`Unread messages for receiver ${receiverId}:`, unreadMessageCount);

        if (receiver === "Doctor") {
          
          io.emit("updateDoctorUnreadCount",  unreadMessageCount );
        } else {
          
          io.emit("updateUnreadCount",  unreadMessageCount );
        }

        
        io.to(roomId).emit("receiveMessage", savedMessage);
         
             if (isLink) {
              console.log("Emitting linkNotification event:", {
                message: "A video call invitation has been shared",
                link: message.content,
                senderId,
                timestamp: message.timestamp,
              });
        
              // Emit a separate event for link notifications
              io.to(roomId).emit("linkNotification", {
                message: "A video call invitation has been shared",
                link:message.content,
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
