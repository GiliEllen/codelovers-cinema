import express from "express";
import { register, login, getUserByCookie, logout, getUserById } from "./userCtrl";

const router = express.Router();

router
  .get("/get-user", getUserByCookie)
  .get("/get-user/:userId", getUserById)
  .get("/logout", logout)
  .post("/register", register)
  .post("/login", login);

export default router;
