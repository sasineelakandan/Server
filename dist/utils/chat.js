"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
const messageModel_1 = __importDefault(require("../models/messageModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const chatRoomModel_1 = __importDefault(require("../models/chatRoomModel"));
const socketHandler = (io) => {
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
        socket.on("sendMessage", (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { roomId, message } = data;
                console.log(message);
                const { sender, receiver, content } = message;
                // Validate the roomId
                if (!mongoose_1.default.Types.ObjectId.isValid(roomId)) {
                    console.log("Invalid roomId:", roomId);
                    return;
                }
                // Validate message fields
                if (!sender || !receiver || !content) {
                    console.log("Invalid message data", { sender, receiver, content });
                    return;
                }
                const incrementField = sender === "patient" ? "isReadDc" : "isReadUc";
                yield chatRoomModel_1.default.updateOne({ _id: roomId }, {
                    $set: { lastMessage: content },
                    $inc: { [incrementField]: 1 },
                });
                const room = yield chatRoomModel_1.default.findById(roomId);
                if (!room) {
                    console.log("Room not found:", roomId);
                    return;
                }
                const receiverId = sender === "patient" ? room.doctor : room.patient;
                const senderId = sender === "Doctor" ? room.doctor : room.patient;
                const newMessage = new messageModel_1.default({
                    roomId,
                    sender,
                    receiver,
                    receiverId,
                    senderId,
                    content,
                    isRead: false,
                    timestamp: new Date(),
                });
                const savedMessage = yield newMessage.save();
                console.log("Message saved to MongoDB:", savedMessage);
                // Calculate unread message counts for the receiver
                const unreadMessageCount = yield messageModel_1.default.countDocuments({
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
        }));
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
exports.socketHandler = socketHandler;
