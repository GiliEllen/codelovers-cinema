import express from "express";
import { getMoviesAndScreenings, addMovie, addScreening } from "./movieCtrl";

const router = express.Router();

router
.get("", getMoviesAndScreenings)
.post("", addMovie)
.post("/:movieId", addScreening);

export default router;
