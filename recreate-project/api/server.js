import express from "express";
import dotenv from "dotenv";
import momgoose from "mongoose";

import connectDB from "./connection/db.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3300;

const app = express();

app.listen(PORT, () => {
    console.log(`SERVER HAS LAUNCH ON PORT :: ${PORT} ::`);
});
