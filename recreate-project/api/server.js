import express from "express";
import dotenv from "dotenv";
import momgoose from "mongoose";
import cookieParser from "cookie-parser";

import connectDB from "./connection/db.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import { errorMiddleware } from "./middleware/errorHandle.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3300;

const app = express();
app.use(express.json()); // Needed in order to send json
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`SERVER HAS LAUNCH ON PORT :: ${PORT} ::`);
});
