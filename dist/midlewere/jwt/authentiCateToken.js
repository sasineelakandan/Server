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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../../utils/constant");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    const isTokenExpired = (exp) => Date.now() >= exp * 1000;
    if (accessToken) {
        try {
            const decoded = jsonwebtoken_1.default.decode(accessToken);
            if (decoded && !isTokenExpired(decoded.exp)) {
                req.user = decoded;
                return next();
            }
            console.log('Access token expired.');
        }
        catch (err) {
            return res.status(401).json({ message: 'Invalid access token.' });
        }
    }
    // Check for refresh token if access token expired
    if (refreshToken) {
        try {
            // Decode the refresh token without verifying (to manually check expiry)
            const decoded = jsonwebtoken_1.default.decode(refreshToken);
            if (decoded && !isTokenExpired(decoded.exp)) {
                // Generate a new access token
                const newAccessToken = jsonwebtoken_1.default.sign({ id: decoded.id, role: decoded.role }, (0, constant_1.JWT_SECRET)(), { expiresIn: '1h' });
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    domain: ".docreserva.site",
                });
                req.user = decoded; // Attach user payload to the request
                return next(); // Proceed to the next controlle
            }
            console.log('Refresh token expired.');
            return res.status(403).json({ message: 'Refresh token expired. Please log in again.' });
        }
        catch (err) {
            return res.status(403).json({ message: 'Invalid refresh token.' });
        }
    }
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
});
exports.default = authMiddleware;
