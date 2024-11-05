import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import recordAgents from "./routes/recordagents.js";
import authRoutes from "./routes/auth.js";  // Import auth routes

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Route for "records"
app.use("/record", records);

// Route for "agents"
app.use("/agents", recordAgents);

// Route for login under /agents path
app.use("/agents", authRoutes);  // This ensures login is under /agents/login

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});