import express from "express";
import {
  getMoviesAndScreenings,
  getMovieAndScreeningsByID,
  addMovie,
  addScreening,
  updateScreening,
  getScreeningsByDate,
  updateMovieById,
  deleteScreeningById,
  deleteMovieWithScreenings
} from "./movieCtrl";

const router = express.Router();

router
  .get("", getMoviesAndScreenings)
  .get("/:movieId", getMovieAndScreeningsByID)
  .post("", addMovie)
  .post("/:movieId", addScreening)
  .post("/screenings/:screeningId", updateScreening)
  .post("/screenings/find/by-date", getScreeningsByDate)
  .patch("/:movieId", updateMovieById)
  .delete("/screenings/:screeningId", deleteScreeningById)
  .delete("/:movieId", deleteMovieWithScreenings)

export default router;
