"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var User_validator_1 = require("../models/User.validator");
var UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: User_validator_1.userValidators.username.validator,
            message: User_validator_1.userValidators.username.message,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: User_validator_1.userValidators.email.validator,
            message: User_validator_1.userValidators.email.message,
        },
    },
    phone: {
        type: String,
        required: false,
        trim: true,
        validate: {
            validator: User_validator_1.userValidators.phone.validator,
            message: User_validator_1.userValidators.phone.message,
        },
    },
    password: {
        type: String,
        required: false,
        validate: {
            validator: User_validator_1.userValidators.password.validator,
            message: User_validator_1.userValidators.password.message,
        },
    },
    profilePic: {
        type: String,
        required: false,
        trim: true,
    },
    otpVerified: {
        type: Boolean,
        default: false,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
    isBlock: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
