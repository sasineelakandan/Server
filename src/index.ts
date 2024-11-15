import express from "express";

import { FRONTEND_URL, PORT } from "./utils/constant";
import router from "./routers/userRoutes";
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
app.use(router)

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));