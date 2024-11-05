import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  region: { type: String, required: true },
  rating: { type: Number, required: true },
  fees: { type: Number, required: true },
  sales: { type: Number, required: true },
});

export default mongoose.model("Agent", agentSchema);
