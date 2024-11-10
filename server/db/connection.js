import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables with explicit path to config.env
dotenv.config({ path: '/home/milan/Codeboxx/Codeboxx_M08/config.env' });

// Check if ATLAS_URI is loaded
console.log("MongoDB URI from connection.js:", process.env.ATLAS_URI);

const uri = process.env.ATLAS_URI; // Use the ATLAS_URI from config.env

async function connectToDB() {
  try {
    await mongoose.connect(uri);  // Simplified connection without deprecated options
    console.log("Successfully connected to MongoDB with Mongoose!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToDB();

export default mongoose;