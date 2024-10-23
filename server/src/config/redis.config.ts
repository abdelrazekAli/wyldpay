import { createClient } from "redis";
import logger from "./logger.config";

const isTestEnv = process.env.NODE_ENV === "test";
const redisClient = isTestEnv
  ? require("redis-mock").createClient() // Use redis-mock in test environment
  : createClient({ url: process.env.REDIS_URL }); // Real Redis client in other environments

export const connectToRedis = async () => {
  try {
    if (!isTestEnv) {
      // Only connect if not in the test environment
      await redisClient.connect();
      logger.info("Connected to Redis");
    } else {
      logger.info("Using mock Redis client in test environment");
    }
  } catch (err) {
    logger.error("Could not connect to Redis cache", err);
  }
};

export default redisClient;
