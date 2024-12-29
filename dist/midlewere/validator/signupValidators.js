"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidator = signupValidator;
const validator_1 = __importDefault(require("validator"));
function signupValidator(req, res, next) {
    try {
        const { username, email, phone, password } = req.body;
        console.log(email);
        if (!username)
            throw new Error("Username is required");
        if (!validator_1.default.isAlphanumeric(username) ||
            !validator_1.default.isLength(username, { min: 3, max: 50 })) {
            throw new Error("Username should be alphanumeric and between 3 and 50 characters long");
        }
        if (!email)
            throw new Error("Email is required");
        if (!validator_1.default.isEmail(email))
            throw new Error("Invalid email format");
        if (!phone)
            throw new Error("Phone number is required");
        if (!validator_1.default.isMobilePhone(phone))
            throw new Error("Invalid phone number format");
        if (!password)
            throw new Error("Password is required");
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
        if (!passwordRegex.test(password)) {
            throw new Error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        }
        next();
    }
    catch (e) {
        res.status(400).json({
            error: e.message,
        });
    }
}
