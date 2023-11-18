import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"; // importing from 'default export', we can change name

dotenv.config();
const app = express();

// CONNECTION
const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGODB_URI;
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to mongodb"))
    .catch((err) => console.error(err));

app.listen(PORT, () => {
    console.log(`SERVER HAS LAUNCHED ON PORT >>>>>>>> ${PORT}`);
});

app.use("/api/user", userRouter);
