import dotenv from "dotenv";

dotenv.config();

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error with logoutUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
