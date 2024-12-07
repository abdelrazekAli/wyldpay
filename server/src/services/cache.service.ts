import { connectToRedis, getRedisClient } from "../config/redis.config";

const initializeRedisClient = async () => {
  const isTestEnv = process.env.NODE_ENV === "test";

  let redisClient;

  if (isTestEnv) {
    redisClient = require("redis-mock").createClient(); // Use redis-mock in test environment
  } else {
    // Ensure connection is established before getting the client
    await connectToRedis();
    redisClient = getRedisClient();

    if (!redisClient) {
      throw new Error("Failed to initialize Redis client.");
    }
  }

  return redisClient;
};

// Set value in Cache
export const setCacheValue = async (
  key: string,
  value: string,
  expirationInSeconds: number = 60 * 60
): Promise<void> => {
  const redisClient = await initializeRedisClient();

  await redisClient.set(key, value, { EX: expirationInSeconds });
};

// Get value from Cache
export const getCachedValue = async (key: string): Promise<string | null> => {
  const redisClient = await initializeRedisClient();

  return await redisClient.get(key);
};

// Delete value from Cache
export const deleteCachedValue = async (key: string): Promise<void> => {
  const redisClient = await initializeRedisClient();

  await redisClient.del(key);
};
