"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidator = signupValidator;
var validator_1 = __importDefault(require("validator"));
function signupValidator(req, res, next) {
    try {
        var _a = req.body, name_1 = _a.name, email = _a.email, phone = _a.phone, password = _a.password, confirmPassword = _a.confirmPassword, specialization = _a.specialization, experience = _a.experience;
        if (!name_1)
            throw new Error("name is required");
        if (!validator_1.default.isAlphanumeric(name_1) || !validator_1.default.isLength(name_1, { min: 3, max: 50 })) {
            throw new Error("name should be alphanumeric and between 3 and 50 characters long");
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
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
        if (!passwordRegex.test(password)) {
            throw new Error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        }
        if (password !== confirmPassword)
            throw new Error("Passwords do not match");
        if (!specialization)
            throw new Error("Specialization is required");
        var validSpecializations = ["cardiology", "dermatology", "pediatrics", "neurology", "orthopedics"];
        if (!validSpecializations.includes(specialization))
            throw new Error("Invalid specialization selected");
        var exp = Number(experience);
        if (isNaN(exp) || exp < 1 || exp > 50)
            throw new Error("Experience must be between 1 and 50 years");
        next();
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}
