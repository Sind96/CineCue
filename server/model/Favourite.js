import mongoose from "mongoose";
const { Schema } = mongoose;

const favouriteSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imdbId: String,
  title: String,
  imageURL: String,
});

export default mongoose.model("favouriteMovieList", favouriteSchema);
