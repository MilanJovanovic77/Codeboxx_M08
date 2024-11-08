import express from "express";
import Agent from "../db/schemas/agent.schemas.js";

const router = express.Router();

// Get all agents
router.get("/", async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).send(agents);
  } catch (err) {
    res.status(500).send("Error retrieving agents");
  }
});

// Get agent by ID
router.get("/:id", async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).send("Agent not found");
    res.status(200).send(agent);
  } catch (err) {
    res.status(500).send("Error retrieving agent");
  }
});

// Create agent
router.post("/", async (req, res) => {
  try {
    const newAgent = new Agent(req.body);
    const result = await newAgent.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating agent");
  }
});

// Update agent by ID
router.patch("/:id", async (req, res) => {
  try {
    const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAgent) return res.status(404).send("Agent not found");
    res.status(200).send(updatedAgent);
  } catch (err) {
    res.status(500).send("Error updating agent");
  }
});

// Delete agent by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAgent = await Agent.findByIdAndDelete(req.params.id);
    if (!deletedAgent) return res.status(404).send("Agent not found");
    res.status(200).send("Agent deleted");
  } catch (err) {
    res.status(500).send("Error deleting agent");
  }
});

export default router;