import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";

const app = express();

app.use("/posts", postRoutes); // add prefix '/post' to all routes in 'postRoutes'

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();

const password = process.env.MONGODB_PW;

const CONNECTION_URL = `mongodb+srv://kaiiemsawat:${password}@cluster0.48awedd.mongodb.net`;
const PORT = process.env.PORT || 4404;

mongoose
    .connect(CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`SERVER HAS LAUNCHED ON PORT -- ${PORT}`)
        )
    )
    .catch((error) => console.log(error.message));
