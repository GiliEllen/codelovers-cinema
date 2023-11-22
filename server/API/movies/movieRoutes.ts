import express from "express";
import { addMovie, addScreening } from "./movieCtrl";

const router = express.Router();

router
  .post("", addMovie)
  .post("/:movieId", addScreening)


export default router;
