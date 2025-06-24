import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const protect = (req, res) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Not authorised" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error with protect:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
