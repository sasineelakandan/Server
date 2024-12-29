export class AppError extends Error {
    message;
    statusCode;
    constructor(message, statusCode) {
        console.log('this app', message);
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
        this.name = "AppError";
    }
}
