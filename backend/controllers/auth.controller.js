import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, lastname, email, password });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
