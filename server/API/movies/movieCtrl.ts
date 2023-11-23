import MovieModel, { ScreeningModel, SeatStatus } from "./movieModel";
import mongoose from "mongoose";

export async function addMovie(req, res) {
  try {
    const { movie, image } = req.body;
    const { title, description, duration } = movie;
    if (!title || !description || !duration || !image) {
      throw new Error("No information from client on addMovie");
    }

    const movieDB = await MovieModel.create({
      title,
      description,
      duration,
      image
    });
    if (!movieDB) throw new Error("no movieDB was created on addMovie");

    res.send({ ok: true, message: movieDB });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getMovieAndScreeningsByID(req, res) {
  try {
    const {movieId} = req.params
    if (!movieId) {
      throw new Error("no movieId provided on getMovieAndScreeningsByID")
    }
    const id = new mongoose.Types.ObjectId(movieId)

    const movieDB = await MovieModel.aggregate([
      {
        $match: {
          "_id": id,
        },
      },
      {
      $lookup: {
        from: 'screenings',
        localField: "_id",
        foreignField: "movieId",
        as: "screenings"
      }
    }])
    res.send({ ok: true, message: movieDB });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}
export async function getMoviesAndScreenings(req, res) {
  try {
    // const moviesDB = await MovieModel.find({});

    const moviesDB = await MovieModel.aggregate([{
      $lookup: {
        from: 'screenings',
        localField: "_id",
        foreignField: "movieId",
        as: "screenings"
      }
    }])

    res.send({ ok: true, message: moviesDB });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getMoviesByID(req, res) {
  try {
    const movieDB = await MovieModel.findById({ _id: req.params.movieId });
    const screeningsDB = await ScreeningModel.find({
      movieId: req.params.movieId,
    });
    res.send({ ok: true, movieDB, screeningsDB });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

export async function addScreening(req, res) {
  try {
    const { times } = req.body;
    const { movieId } = req.params;
    if (!times || !movieId) {
      throw new Error("no information on addScreenings");
    }

    const screenings = times.map((time, idx) => {
      return {
        movieId,
        dateTime: time,
        seats: Array(100).fill({ id: idx + 1, status: SeatStatus.AVAILABLE }),
      };
    });
    await ScreeningModel.insertMany(screenings);
    const allScreeningsDB = await ScreeningModel.find({ movieId });
    res.send({ ok: true, message: allScreeningsDB });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}
