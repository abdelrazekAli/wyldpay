import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  try {
    // Create an in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();

    // Connect to the in-memory MongoDB
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Drop the database to ensure a clean state
    await mongoose.connection.dropDatabase();
  } catch (error) {
    console.error("Error during test setup:", error);
    throw error; // Rethrow to fail the test setup if needed
  }
});

afterAll(async () => {
  try {
    // Clean up the connections and stop the MongoDB server
    await mongoose.disconnect();
    await mongoServer.stop();

    // Optionally, if you have a disconnect function for Redis
    // await disconnectFromRedis(); // Ensure you implement this in your Redis config
  } catch (error) {
    console.error("Error during test teardown:", error);
  }
});
