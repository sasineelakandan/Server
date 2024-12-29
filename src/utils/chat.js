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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
var messageModel_1 = __importDefault(require("../models/messageModel"));
var mongoose_1 = __importDefault(require("mongoose"));
var chatRoomModel_1 = __importDefault(require("../models/chatRoomModel"));
var socketHandler = function (io) {
    var onlineUsers = {};
    io.on("connection", function (socket) {
        console.log("User connected:", socket.id);
        socket.on("joinRoom", function (roomId) {
            socket.join(roomId);
            console.log("User joined room: ".concat(roomId));
        });
        socket.on("userOnline", function (userId) {
            onlineUsers[userId] = socket.id;
            io.emit("updateUserStatus", onlineUsers);
        });
        // Handle message creation and emit to users in the room
        socket.on("sendMessage", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var roomId, message, sender, receiver, content, incrementField, room, receiverId, senderId, newMessage, savedMessage, unreadMessageCount, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        roomId = data.roomId, message = data.message;
                        console.log(message);
                        sender = message.sender, receiver = message.receiver, content = message.content;
                        // Validate the roomId
                        if (!mongoose_1.default.Types.ObjectId.isValid(roomId)) {
                            console.log("Invalid roomId:", roomId);
                            return [2 /*return*/];
                        }
                        // Validate message fields
                        if (!sender || !receiver || !content) {
                            console.log("Invalid message data", { sender: sender, receiver: receiver, content: content });
                            return [2 /*return*/];
                        }
                        incrementField = sender === "patient" ? "isReadDc" : "isReadUc";
                        return [4 /*yield*/, chatRoomModel_1.default.updateOne({ _id: roomId }, {
                                $set: { lastMessage: content },
                                $inc: (_a = {}, _a[incrementField] = 1, _a),
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, chatRoomModel_1.default.findById(roomId)];
                    case 2:
                        room = _b.sent();
                        if (!room) {
                            console.log("Room not found:", roomId);
                            return [2 /*return*/];
                        }
                        receiverId = sender === "patient" ? room.doctor : room.patient;
                        senderId = sender === "Doctor" ? room.doctor : room.patient;
                        newMessage = new messageModel_1.default({
                            roomId: roomId,
                            sender: sender,
                            receiver: receiver,
                            receiverId: receiverId,
                            senderId: senderId,
                            content: content,
                            isRead: false,
                            timestamp: new Date(),
                        });
                        return [4 /*yield*/, newMessage.save()];
                    case 3:
                        savedMessage = _b.sent();
                        console.log("Message saved to MongoDB:", savedMessage);
                        return [4 /*yield*/, messageModel_1.default.countDocuments({
                                receiverId: receiverId,
                                isRead: false,
                            })];
                    case 4:
                        unreadMessageCount = _b.sent();
                        console.log("Unread messages for receiver ".concat(receiverId, ":"), unreadMessageCount);
                        if (receiver === "Doctor") {
                            io.emit("updateDoctorUnreadCount", unreadMessageCount);
                        }
                        else {
                            io.emit("updateUnreadCount", unreadMessageCount);
                        }
                        // Emit the message to the room
                        io.to(roomId).emit("receiveMessage", savedMessage);
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        console.error("Error creating message:", error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        // Handle user disconnection
        socket.on("disconnect", function () {
            for (var userId in onlineUsers) {
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
