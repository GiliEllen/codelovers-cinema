import express from "express";
import {
  getMoviesAndScreenings,
  getMovieAndScreeningsByID,
  addMovie,
  addScreening,
} from "./movieCtrl";

const router = express.Router();

router
  .get("", getMoviesAndScreenings)
  .get("/:movieId", getMovieAndScreeningsByID)
  .post("", addMovie)
  .post("/:movieId", addScreening);

export default router;
