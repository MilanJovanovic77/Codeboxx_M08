import dotenv from "dotenv";
dotenv.config({ path: '/home/milan/Codeboxx/Codeboxx_M08/config.env' });  // Load environment variables

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./db/connection.js"; // Initialize MongoDB connection
import { User } from "./db/schemas/user.schemas.js";  // Import User model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT || 5050;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});