import mongoose from "mongoose";
import logger from "./logger.config";

const Database = (() => {
  const connectToDatabase = async () => {
    /*
     * mongoose.connection.readyState checks the status of mongoose connection
     * it returns 1 if Connected and 0 if Disconnected
     */
    if (mongoose.connection.readyState === 1) {
      logger.info("DB is already connected, reusing the existing connection.");
      return mongoose.connection;
    }

    try {
      await mongoose.connect(process.env.DB_URL as string);
      logger.info("DB connected");
      return mongoose.connection;
    } catch (error: any) {
      logger.error("Could not connect to DB", error.message);
      process.exit(1);
    }
  };

  return {
    getInstance: connectToDatabase,
  };
})();

export default Database.getInstance;
