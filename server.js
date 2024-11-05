import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // Middleware to parse cookies
import recordAgents from "./routes/agents.js";
import authRoutes from "./routes/auth.js"; // Import auth routes
import sessionRoutes from "./routes/session.js"; // Import session routes
import transactionRoutes from "./routes/transaction.js"; // Import transaction routes

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(cookieParser()); // Add cookie parsing middleware
app.use(express.json());

// Routes
app.use("/agents", recordAgents); // Route for "agents"
app.use("/agents", authRoutes); // Route for login under /agents path
app.use("/session", sessionRoutes); // Route for session management
app.use("/transaction", transactionRoutes); // Route for transaction management

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});