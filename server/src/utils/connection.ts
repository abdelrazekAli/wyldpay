import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log("DB connected");
  } catch (error) {
    console.log("Could not connect to DB");
    process.exit(1);
  }
}

export default connect;
