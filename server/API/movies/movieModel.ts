import { number } from "joi";
import mongoose, { Schema } from "mongoose";

const MovieSchema = new Schema({
  title: String,
  description: String,
  duration: Number,
  image:String
});

const MovieModel = mongoose.model("movies", MovieSchema);

export default MovieModel;

const ScreeningSchema = new Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: MovieModel
  },
  dateTime: Date,
  seats: {
    type: Array<Seat>
  }, 
});

export const ScreeningModel = mongoose.model("screenings", ScreeningSchema);


export interface Seat {
  id: number,
  status: SeatStatus 
}

export enum SeatStatus {
  TAKEN = "taken",
  AVAILABLE = "available",
  PENDING = "pending"
}