"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidators = void 0;
var validator_1 = __importDefault(require("validator"));
var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
var validationMessages = {
    username: "Username should be alphanumeric and between 3 and 50 characters long",
    email: "Invalid email format",
    phone: "Invalid phone number format",
    password: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
};
var usernameValidator = function (value) {
    return validator_1.default.isLength(value, { min: 3, max: 50 });
};
var emailValidator = function (value) {
    return validator_1.default.isEmail(value);
};
var phoneValidator = function (value) {
    return validator_1.default.isMobilePhone(value);
};
var passwordValidator = function (value) {
    return passwordRegex.test(value);
};
exports.userValidators = {
    username: {
        validator: usernameValidator,
        message: validationMessages.username,
    },
    email: {
        validator: emailValidator,
        message: validationMessages.email,
    },
    phone: {
        validator: phoneValidator,
        message: validationMessages.phone,
    },
    password: {
        validator: passwordValidator,
        message: validationMessages.password,
    }
};
