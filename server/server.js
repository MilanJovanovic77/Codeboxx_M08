import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes would be set up here
// app.use("/your-route", yourRouteHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});