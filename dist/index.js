"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const constant_1 = require("./utils/constant");
const userRoutes_1 = __importDefault(require("./routers/userRoutes"));
const docterRoutes_1 = __importDefault(require("./routers/docterRoutes"));
const adminRoutes_1 = __importDefault(require("./routers/adminRoutes"));
const bookingRouters_1 = __importDefault(require("./routers/bookingRouters"));
const dbconnect_1 = require("./config/dbconnect");
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const chat_1 = require("./utils/chat");
const app = (0, express_1.default)();
(0, dbconnect_1.connectDb)();
const httpServer = (0, http_1.createServer)(app);
// Initialize Socket.IO
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: (0, constant_1.FRONTEND_URL)() || '*',
        methods: ['GET', 'POST'],
    },
});
// Use Socket.IO handler
(0, chat_1.socketHandler)(exports.io);
const corsOptions = {
    origin: (0, constant_1.FRONTEND_URL)() || "*",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/v1/api/user', userRoutes_1.default);
app.use('/v1/api/doctor', docterRoutes_1.default);
app.use('/v1/api/admin', adminRoutes_1.default);
app.use('/v1/api/booking', bookingRouters_1.default);
httpServer.listen(constant_1.PORT, () => console.log(`Server started running on port ${constant_1.PORT}`));
