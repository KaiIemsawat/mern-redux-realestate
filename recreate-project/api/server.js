import express from "express";
import dotenv from "dotenv";
import momgoose from "mongoose";

import connectDB from "./connection/db.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3300;

const app = express();
app.use(express.json()); // Needed in order to send json

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`SERVER HAS LAUNCH ON PORT :: ${PORT} ::`);
});
