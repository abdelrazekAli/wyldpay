const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connection.dropDatabase();
});
