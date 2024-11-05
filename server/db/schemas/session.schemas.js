import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  session_token: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expiration: { type: Date, required: true, expires: 0 }, // TTL index
});

export default mongoose.model("Session", sessionSchema);
