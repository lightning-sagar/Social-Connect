import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();
dotenv.config();
connectDB();
const Port = process.env.PORT

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.json({ limit: "50mb" }));  
app.use(express.urlencoded({ extended: true }));  
app.use(cookieParser());


app.use('/api/users',userRoutes);
app.use('/api/post',postRoutes);

app.listen(Port, () => console.log(`http://localhost:${Port}`));