import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import {app,server } from "./socket/socket.js"
import path from "path";
 
dotenv.config();
connectDB();
const Port = process.env.PORT
const _dirname = path.resolve();

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
app.use('/api/message',messageRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname, "/Frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"));
    })
}

server.listen(Port, () => console.log(`http://localhost:${Port}`));