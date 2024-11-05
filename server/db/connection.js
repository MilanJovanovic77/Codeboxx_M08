import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.ATLAS_URI;

async function connectToDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB with Mongoose!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToDB();

export default mongoose;