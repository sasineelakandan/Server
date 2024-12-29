"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define
const messageSchema = new mongoose_1.default.Schema({
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
        required: true,
    },
    roomId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
const Message = mongoose_1.default.model('Message', messageSchema);
exports.default = Message;
