import { MongoClient, ServerApiVersion } from "mongodb";

// Load environment variables
const uri = process.env.ATLAS_URI || "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectToDB() {
  try {
    // Connect the client to the server
    await client.connect();
    // Ping the database to check the connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");

    // Set the database reference to the 'employees' database
    db = client.db("employees");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

// Call the function to establish the connection
connectToDB();

// Export a function to get the database instance
export function getDb() {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
}

export default db;