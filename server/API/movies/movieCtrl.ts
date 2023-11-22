import MovieModel, { ScreeningModel } from "./movieModel";

export async function addMovie(req, res) {
  try {
    const { movie } = req.body;
    const { title, description, duration } = movie;
    if (!title || !description || !duration) {
      throw new Error("No information from client on addMovie");
    }

    const movieDB = await MovieModel.create({
      title,
      description,
      duration,
    });
    if (!movieDB) throw new Error("no movieDB was created on addMovie");

    res.send({ ok: true, message: movieDB });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

export async function getMovies(req, res) {
  try {
    const moviesDB = await MovieModel.find({});

    res.send({ ok: true, moviesDB });
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
