// remplacer record par agent.js


import express from "express";
import { getDb } from "../db/connection.js"; // Use the new getDb function
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of all the records
router.get("/", async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection("agents");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving agents");
  }
});

// Get a single record by id
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection("agents");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) {
      res.status(404).send("Not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving agents");
  }
});

// Create a new record
router.post("/", async (req, res) => {
  try {
    const db = getDb();
    const newDocument = {
      name: req.body.name,
      position: req.body.position,
      region: req.body.region,
      rating: req.body.rating,
      fees: req.body.fees,
      sales: req.body.sales,
    };

    const collection = db.collection("agents");
    const result = await collection.insertOne(newDocument);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding agents");
  }
});

// Update a agents by id
router.patch("/:id", async (req, res) => {
  try {
    const db = getDb();
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        region: req.body.region,
        rating: req.body.rating,
        fees: req.body.fees,
        sales: req.body.sales,
      },
    };

    const collection = db.collection("agents");
    const result = await collection.updateOne(query, updates);

    if (result.modifiedCount === 0) {
      res.status(404).send("Agent not found");
    } else {
      res.status(200).send(result);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating agents");
  }
});

// Delete a record
router.delete("/:id", async (req, res) => {
  try {
    const db = getDb();
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("agents");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      res.status(404).send("Agent not found");
    } else {
      res.status(200).send("Agent deleted");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting agent");
  }
});

export default router;