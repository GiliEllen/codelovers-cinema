import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

const httpServer = require("http").createServer(app);
const options = {
  cors: {
    origin: "http://localhost:3000",
  },
};
const io = require("socket.io")(httpServer, options);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

httpServer.listen(8000, () => {
  console.log(`server is listening on port 8000`);
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("enter_room", (data) => {
    socket.join(data.room);
    socket.to(data.room).emit("some event");
  });
  socket.on("send_message", (message) => {
    io.to(message.roomId).emit("send_message", message);
  });
});
