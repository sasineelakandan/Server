"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatRoomSchema = new mongoose_1.default.Schema({
    patient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    doctor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const ChatRoom = mongoose_1.default.model("ChatRoom", chatRoomSchema);
exports.default = ChatRoom;
