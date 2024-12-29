"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var constant_1 = require("./utils/constant");
var userRoutes_1 = __importDefault(require("./routers/userRoutes"));
var docterRoutes_1 = __importDefault(require("./routers/docterRoutes"));
var adminRoutes_1 = __importDefault(require("./routers/adminRoutes"));
var bookingRouters_1 = __importDefault(require("./routers/bookingRouters"));
var dbconnect_1 = require("./config/dbconnect");
var cors_1 = __importDefault(require("cors"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var chat_1 = require("./utils/chat");
var app = (0, express_1.default)();
(0, dbconnect_1.connectDb)();
var httpServer = (0, http_1.createServer)(app);
// Initialize Socket.IO
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: (0, constant_1.FRONTEND_URL)() || '*',
        methods: ['GET', 'POST'],
    },
});
// Use Socket.IO handler
(0, chat_1.socketHandler)(exports.io);
var corsOptions = {
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
httpServer.listen(constant_1.PORT, function () { return console.log("Server started running on port ".concat(constant_1.PORT)); });
