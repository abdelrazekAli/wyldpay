import { createClient } from "redis";
import logger from "./logger.config";

const redisClient = createClient({ url: process.env.REDIS_URL });

export const connectToRedis = async () => {
  try {
    await redisClient.connect();
    logger.info("Connected to Redis");
  } catch (err) {
    logger.error("Could not connect to Redis cache", err);
  }
};

export default redisClient;
