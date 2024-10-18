const mongoose = require("mongoose");
import connectToDatabase from "../src/config/db.config";
import { connectToRedis } from "../src/config/redis.config";

beforeAll(async () => {
  await connectToDatabase();
  await connectToRedis();
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});
