import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByUsername } from "../models/User_db.js";

const loginController = async (req, res) => {
  const { username, password } = req.body;
  console.log("🔐 Login attempt:", username, password);

  try {
    const user = await getUserByUsername(username);
console.log("👤 User found:", user);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password match:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let token;
    try {
      token = jwt.sign(
        { userID: user.userID, username: user.username },
        process.env.JWT_SECRET
      );
      console.log("✅ Token created:", token);
    } catch (error) {
      console.error("Error creating JWT:", error);
      return res.status(500).json({ message: "Token creation failed" });
    }

    res.json({
      message: "Login successful",
      token,
      user: { username: user.username, userID: user.userID },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default loginController;
