const mongoose = require("mongoose");
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToRedis } from "../src/config/redis.config";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // Create an in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();

  // Connect to the in-memory MongoDB
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // connect to Redis
  await connectToRedis();

  // Drop the database to ensure a clean state
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  // Clean up the connections and stop the MongoDB server
  await mongoose.disconnect();
  await mongoServer.stop();
});
