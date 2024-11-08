import express from "express";
import Transaction from "../db/schemas/transaction.schemas.js";
import Agent from "../db/schemas/agent.schemas.js";

const router = express.Router();

// Get last 10 transactions and agent list
router.get("/transaction-data", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 }).limit(10).populate("agent_id", "name");
    const agents = await Agent.find({}, "name _id");

    res.status(200).send({
      status: "ok",
      data: { transactions, agents },
      message: null,
    });
  } catch (err) {
    res.status(500).send("Error retrieving transaction data");
  }
});

// Create new transaction
router.post("/", async (req, res) => {
  try {
    const { amount, agent_id } = req.body;

    if (amount <= 0) return res.status(400).send("Amount must be positive");

    const transaction = new Transaction({ amount, agent_id });
    await transaction.save();
    res.status(201).send("Transaction created successfully");
  } catch (err) {
    res.status(500).send("Error creating transaction");
  }
});

export default router;
