const mongoose = require("mongoose");
import connectToDatabase from "../src/config/db.config";

beforeAll(async () => {
  await connectToDatabase();
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});
