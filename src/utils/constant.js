"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.FRONTEND_URL = exports.BCRYPT_SALT = exports.MONGO_URI = exports.ADMIN_PASSWORD = exports.ADMIN_EMAIL = exports.PORT = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 5000;
exports.ADMIN_EMAIL = process.env.ADMIN_EMAIL;
exports.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
var MONGO_URI = function () {
    if (!process.env.MONGO_URI)
        throw new Error("Mongo URI not found in env");
    return String(process.env.MONGO_URI);
};
exports.MONGO_URI = MONGO_URI;
var BCRYPT_SALT = function () {
    if (!process.env.BCRYPT_SALT)
        throw new Error("Bcrypt salt not found in env");
    return Number(process.env.BCRYPT_SALT);
};
exports.BCRYPT_SALT = BCRYPT_SALT;
var FRONTEND_URL = function () {
    if (!process.env.FRONTEND_URL)
        return null;
    return String(process.env.FRONTEND_URL);
};
exports.FRONTEND_URL = FRONTEND_URL;
var JWT_SECRET = function () {
    if (!process.env.JWT_KEY)
        throw new Error("JWT secret not found in env");
    return String(process.env.JWT_KEY);
};
exports.JWT_SECRET = JWT_SECRET;
