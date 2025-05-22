import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(router);

(async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT);
    console.log(
      `Server running on PORT ${PORT} and Database has successfully connected!🕊️`
    );
  } catch (error) {
    console.log(`Database could not connect:`, error);
  }
})();
