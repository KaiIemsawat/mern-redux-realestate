import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"; // importing from 'default export', we can change name
import authRouter from "./routes/auth.route.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
app.use(express.json());

// CONNECTION
const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGODB_URI;
// console.log(PORT);
// console.log(MONGO_URI);
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to mongodb"))
    .catch((err) => console.error(err));

app.listen(PORT, () => {
    console.log(`SERVER HAS LAUNCHED ON PORT >>>>>>>> ${PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || "Internal Server Error";
//     return res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//     });
// });

app.use(errorHandler);
