import User from "../model/User.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    console.error("Error with registerUser:", error);
    res.status(500).json("Internal Server Error");
  }
};
