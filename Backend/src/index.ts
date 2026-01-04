import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Hello from FoodSnap AI Backend!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
