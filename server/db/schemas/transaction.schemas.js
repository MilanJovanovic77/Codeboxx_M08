import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now, required: true },
  amount: { type: Number, required: true },
  agent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
});

export default mongoose.model("Transaction", transactionSchema);