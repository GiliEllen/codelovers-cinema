import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

dotenv.config();

const port = process.env.PORT;
const mongodb_uri = process.env.MONGO_URI;

app.use(express.json());
app.use(cookieParser());

mongoose.set("strictQuery", true);

mongoose
  .connect(mongodb_uri)
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("At mongoose.connect:");
    console.error(err.message);
  });

const httpServer = require("http").createServer(app);
const options = {
  cors: {
    origin: "http://localhost:3000",
  },
};
const io = require("socket.io")(httpServer, options);

const corsOptions = {
  origin: ['http://localhost:3000'],
  allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
  credentials: true,
  enablePreflight: true
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))

app.use(function(req, res, next) {  
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});  

import userRoutes from "./API/auth/userRoutes";
app.use("/api/users", userRoutes);

httpServer.listen(port, () => {
  console.log(`server is listening on port ${port}`);
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
