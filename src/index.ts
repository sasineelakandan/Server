import express from "express";
import cookieParser from 'cookie-parser';
import { FRONTEND_URL, PORT } from "./utils/constant";
import userrouter from "./routers/userRoutes";
import doctorrouter from "./routers/docterRoutes";
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
app.use(userrouter)
app.use(doctorrouter)

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));