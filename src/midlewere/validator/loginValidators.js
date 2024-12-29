"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = loginValidator;
var validator_1 = __importDefault(require("validator"));
function loginValidator(req, res, next) {
    try {
        var _a = req.body, email = _a.email, password = _a.password;
        if (!email)
            throw new Error("Email is required");
        if (!validator_1.default.isEmail(email))
            throw new Error("Invalid email format");
        if (!password)
            throw new Error("Password is required");
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
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
