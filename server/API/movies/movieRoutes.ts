import express from "express";
import {
  getMoviesAndScreenings,
  getMovieAndScreeningsByID,
  addMovie,
  addScreening,
  updateScreening
} from "./movieCtrl";

const router = express.Router();

router
  .get("", getMoviesAndScreenings)
  .get("/:movieId", getMovieAndScreeningsByID)
  .post("", addMovie)
  .post("/:movieId", addScreening)
  .post("/screenings/:screeningId", updateScreening);

export default router;
