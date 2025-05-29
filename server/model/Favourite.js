import mongoose from "mongoose";
const { Schema } = mongoose;

const favouriteSchema = new Schema({
  imdbId: String,
  title: String,
  imageURL: String,
});

export default mongoose.model("favouriteMovieList", favouriteSchema);