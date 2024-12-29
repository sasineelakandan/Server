"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var constant_1 = require("../utils/constant");
function generateAccessToken(id, role) {
    try {
        var payload = { id: id, role: role };
        var options = { expiresIn: "1h" };
        return jsonwebtoken_1.default.sign(payload, (0, constant_1.JWT_SECRET)(), options);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
function generateRefreshToken(id, role) {
    try {
        var payload = { id: id, role: role };
        var options = { expiresIn: "7d" };
        return jsonwebtoken_1.default.sign(payload, (0, constant_1.JWT_SECRET)(), options);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
