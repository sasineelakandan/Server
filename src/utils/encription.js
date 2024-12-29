"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = encryptPassword;
exports.comparePassword = comparePassword;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var constant_1 = require("./constant");
function encryptPassword(password) {
    try {
        return bcryptjs_1.default.hashSync(password, (0, constant_1.BCRYPT_SALT)());
    }
    catch (error) {
        throw new Error(error.message);
    }
}
function comparePassword(inputPassword, passwordFromDb) {
    try {
        return bcryptjs_1.default.compareSync(inputPassword, passwordFromDb);
    }
    catch (error) {
        throw new Error(error.message);
    }
}
