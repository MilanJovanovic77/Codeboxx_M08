import express from "express";
import Transaction from "../db/schemas/transaction.schemas.js";
import Agent from "../db/schemas/agent.schemas.js";

const router = express.Router();

// Get the last 10 transactions and agent list
router.get("/transaction-data", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ date: -1 })
      .limit(10)
      .populate("agent_id", "name"); // Populate agent's name

    const agents = await Agent.find({}, "name _id"); // Fetch all agents with name and id

    res.status(200).send({
      status: "ok",
      data: { transactions, agents },
      message: null,
    });
  } catch (err) {
    console.error("Error retrieving transaction data:", err);
    res.status(500).send("Error retrieving transaction data");
  }
});

// Create a new transaction
router.post("/", async (req, res) => {
  try {
    const { amount, agent_id } = req.body;

    if (amount <= 0) {
      return res.status(400).send("Amount must be a positive number");
    }

    const transaction = new Transaction({
      amount,
      agent_id,
    });

    await transaction.save();
    res.status(201).send("Transaction created successfully");
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).send("Error creating transaction");
  }
});

export default router;

