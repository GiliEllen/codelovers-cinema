import express from "express";
import { register, login} from "./userCtrl";

const router = express.Router();

router
.post("/register", register)
.post("/login", login)



export default router;
