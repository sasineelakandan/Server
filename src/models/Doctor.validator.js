"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorValidators = void 0;
var validator_1 = __importDefault(require("validator"));
// Regular expression for password validation
var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
// Validation messages
var validationMessages = {
    name: "Name should be between 3 and 50 characters long",
    email: "Invalid email format",
    phone: "Invalid phone number format",
    password: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    specialization: "Specialization should be between 3 and 50 characters long",
    experience: "Experience must be a number between 0 and 50",
    profilePic: "Profile picture must be a valid image URL",
    licensePic: "License picture must be a valid image URL",
    fees: "Fees must be a positive number",
};
// Validators
var nameValidator = function (value) {
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
var specializationValidator = function (value) {
    return validator_1.default.isLength(value, { min: 3, max: 50 });
};
var experienceValidator = function (value) {
    return Number.isInteger(value) && value >= 0 && value <= 50;
};
var profilePicValidator = function (value) {
    return !value || /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(value);
};
var licensePicValidator = function (value) {
    return !value || /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(value);
};
var feesValidator = function (value) {
    return value === undefined || (typeof value === "number" && value > 0);
};
// Doctor validators object
exports.doctorValidators = {
    name: {
        validator: nameValidator,
        message: validationMessages.name,
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
    },
    specialization: {
        validator: specializationValidator,
        message: validationMessages.specialization,
    },
    experience: {
        validator: experienceValidator,
        message: validationMessages.experience,
    },
    profilePic: {
        validator: profilePicValidator,
        message: validationMessages.profilePic,
    },
    licensePic: {
        validator: licensePicValidator,
        message: validationMessages.licensePic,
    },
    fees: {
        validator: feesValidator,
        message: validationMessages.fees,
    },
};
