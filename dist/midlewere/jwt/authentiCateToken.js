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
    try {
        if (accessToken) {
            const decoded = jsonwebtoken_1.default.decode(accessToken);
            if (decoded && !isTokenExpired(decoded.exp)) {
                req.user = decoded;
                next();
                return;
            }
            console.log('Access token expired.');
        }
        if (refreshToken) {
            const decoded = jsonwebtoken_1.default.decode(refreshToken);
            if (decoded && !isTokenExpired(decoded.exp)) {
                const newAccessToken = jsonwebtoken_1.default.sign({ id: decoded.id, role: decoded.role }, (0, constant_1.JWT_SECRET)(), { expiresIn: '1h' });
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    domain: '.docreserva.site',
                });
                req.user = decoded;
                next();
                return;
            }
            console.log('Refresh token expired.');
            res.status(403).json({ message: 'Refresh token expired. Please log in again.' });
            return;
        }
        res.status(401).json({ message: 'Unauthorized. Please log in.' });
        return;
    }
    catch (error) {
        console.error('Error in authentication middleware:', error);
        res.status(500).json({ message: 'Internal server error.' });
        return;
    }
});
exports.default = authMiddleware;
