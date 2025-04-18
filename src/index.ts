
import express from "express";
import cookieParser from 'cookie-parser';
import { FRONTEND_URL, PORT } from "./utils/constants";
import userrouter from "./routers/userRoutes";
import doctorrouter from "./routers/docterRoutes";
import adminRoutes from "./routers/adminRoutes";
import bookingRoutes from './routers/bookingRouters'
import { connectDb } from "./config/dbconnect";
import cors from "cors";
import { createServer } from 'http';
import { Server } from 'socket.io';
import { socketHandler } from './utils/chat';

const app = express();

connectDb();

const httpServer = createServer(app);


export const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL() || '*', 
    methods: ['GET', 'POST'], 
  },
});

socketHandler(io);

const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    callback(null, true);  
  },
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use('/v1/api/user',userrouter)
app.use('/v1/api/doctor',doctorrouter)
app.use('/v1/api/admin',adminRoutes)
app.use('/v1/api/booking',bookingRoutes)



httpServer.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
