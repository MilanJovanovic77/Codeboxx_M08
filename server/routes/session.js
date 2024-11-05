import express from "express";
import { v4 as uuidv4 } from "uuid";
import Session from "../db/schemas/session.schemas.js";
import User from "../db/schemas/user.schemas.js";

const router = express.Router();

// Create a new session
router.post("/:user_id", async (req, res) => {
  try {
    const sessionToken = uuidv4();
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24); // 24-hour expiration

    const session = new Session({
      session_token: sessionToken,
      user: req.params.user_id,
      expiration: expirationDate,
    });

    await session.save();
    res.status(200).send({
      status: "ok",
      data: { token: sessionToken },
      message: "Session created successfully",
    });
  } catch (err) {
    console.error("Error creating session:", err);
    res.status(500).send("Error creating session");
  }
});

// Validate a session token
router.get("/validate_token", async (req, res) => {
  try {
    const token = req.query.token;
    const session = await Session.findOne({ session_token: token }).populate("user");

    if (session && new Date(session.expiration) > new Date()) {
      res.status(200).send({
        status: "ok",
        data: {
          valid: true,
          user: {
            first_name: session.user.first_name,
            last_name: session.user.last_name,
            id: session.user._id,
          },
        },
        message: null,
      });
    } else {
      res.status(200).send({
        status: "ok",
        data: { valid: false, user: null },
        message: "Session expired or invalid",
      });
    }
  } catch (err) {
    console.error("Error validating token:", err);
    res.status(500).send("Error validating token");
  }
});

export default router;
