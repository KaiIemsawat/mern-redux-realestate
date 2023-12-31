import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3300;
const app = express();

app.listen(port, () => {
    console.log(`SERVER HAS LAUNCH ON PORT :: ${port} ::`);
});
