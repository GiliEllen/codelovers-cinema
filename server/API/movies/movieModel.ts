import { number } from "joi";
import mongoose, { Schema } from "mongoose";

const MovieSchema = new Schema({
  title: String,
  description: String,
  duration: number
});

const MovieModel = mongoose.model("movies", MovieSchema);

export default MovieModel;

const ScreeningSchema = new Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: MovieModel
  },
  date: Date,
  seats: {
    type: []
  }
});

export const ScreeningModel = mongoose.model("screenings", ScreeningSchema);


interface Seat {
  id: number,
  status: SeatStatus 
}

enum SeatStatus {
  TAKEN = "taken",
  AVAILABLE = "available",
  PENDING = "pending"
}