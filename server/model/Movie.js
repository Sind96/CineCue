import mongoose from "mongoose";
const { Schema } = mongoose;

const movieSchema = new Schema({
  imdbId: String,
  title: String,
  imageURL: String,
});

export default mongoose.model("favouriteMovieList", movieSchema);
