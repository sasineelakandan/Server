"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../models/userModel")); // Import User model and its TypeScript interface if defined
const checkIfBlocked = (httpRequest, // Extend Request to include a possible userId property
res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.user) === null || _a === void 0 ? void 0 : _a.id;
        console.log(userId);
        if (!userId) {
            res.status(401).json({ message: "Unauthorized: No user ID provided." });
            return;
        }
        const user = yield userModel_1.default.findOne({ _id: userId }); // Retrieve user from the database
        console.log(user);
        if (!user) {
            throw new Error("User Not Found");
        }
        if (user.isBlock) {
            console.log('hai');
            throw new Error("Access denied: Your account is blocked.");
        }
        next();
    }
    catch (error) {
        console.error("Error checking blocked status:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.default = checkIfBlocked;
