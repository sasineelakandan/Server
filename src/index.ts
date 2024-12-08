import express from "express";
import cookieParser from 'cookie-parser';
import { FRONTEND_URL, PORT } from "./utils/constant";
import userrouter from "./routers/userRoutes";
import doctorrouter from "./routers/docterRoutes";
import adminRoutes from "./routers/adminRoutes";
import bookingRoutes from './routers/bookingRouters'
import { connectDb } from "./config/dbconnect";
import cors from "cors";

const app = express();

connectDb();

const corsOptions = {
  origin: FRONTEND_URL() ||"*",
  credentials: true,
};

app.use(cors(corsOptions)); 

app.use(express.json());
app.use(cookieParser());
app.use('/api/user',userrouter)
app.use('/api/doctor',doctorrouter)
app.use('/api/admin',adminRoutes)
app.use('/api/booking',bookingRoutes)

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));