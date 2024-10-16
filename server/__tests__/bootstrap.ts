const mongoose = require("mongoose");
import connectToDatabase from "../src/config/db.config";
import { connectRedis } from "../src/config/redis.config";

beforeAll(async () => {
  await connectToDatabase();
  await connectRedis();
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});
