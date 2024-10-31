import logger from "./logger.config";
import { createClient, RedisClientType } from "redis";

const RedisClient = (() => {
  let client: RedisClientType | null = null;

  const connectToRedis = async (): Promise<RedisClientType> => {
    if (client) {
      logger.info("Using existing Redis client.");
      return client;
    }

    // Create Redis client
    client = createClient({ url: process.env.REDIS_URL });

    try {
      await client.connect();
      logger.info("Connected to Redis");
    } catch (err) {
      logger.error("Could not connect to Redis cache", err);
      throw err;
    }

    return client;
  };

  return {
    connect: connectToRedis,
    getClient: client,
  };
})();

export const connectToRedis = RedisClient.connect; // Connect function to call
export const createRedisClient = RedisClient.getClient; // Getter to access redis client
