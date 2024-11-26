export class AppError extends Error {
    constructor(public message: string, public statusCode: number) {
      console.log('this app',message)
      super(message);
      this.statusCode = statusCode
      this.name = "AppError";
    }
  }