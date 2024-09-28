import mongoose from "mongoose";
import logger from "./logger.config";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    logger.info("DB connected");
  } catch (error: any) {
    logger.error("Could not connect to DB", error.message);
    process.exit(1);
  }
};

export default connectToDatabase;
