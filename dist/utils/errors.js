"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        console.log('this app', message);
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
        this.name = "AppError";
    }
}
exports.AppError = AppError;
