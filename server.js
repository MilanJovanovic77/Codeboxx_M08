import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // Middleware for handling cookies
import recordAgents from "./server/routes/agents.js";
import sessionRoutes from "./server/routes/session.js";
import transactionRoutes from "./server/routes/transaction.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(cookieParser()); // Use cookie parser
app.use(express.json());

// Routes
app.use("/agents", recordAgents); // Routes for managing agents
app.use("/session", sessionRoutes); // Routes for session management
app.use("/transaction", transactionRoutes); // Routes for transaction management

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});