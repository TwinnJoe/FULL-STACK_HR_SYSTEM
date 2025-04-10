import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByUsername } from "../models/User_db.js"; // Make sure to have a userModel.js that queries the DB

const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username); // Query your DB to get the user

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password); // Compare hashed password

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    console.log(process.env.JWT_SECRET_KEY); // Log to verify the key is loaded

    try {
    const token = jwt.sign(
      { userID: user.userID, username: user.username },
      process.env.JWT_SECRET_KEY, // Secret key should be here
      { expiresIn: "1h" } // Expiry time option
    );
  } catch (error) {
    console.error('Error creating JWT:', error);
    return res.status(500).json({ message: "Token creation failed" });
  }

    res.json({
      message: "Login successful",
      token,
      user: { username: user.username, userID: user.userID }, // Optional: Send back user info
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default loginController;
