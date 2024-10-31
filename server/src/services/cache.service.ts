import { createRedisClient } from "../config/redis.config";

// Check environment
const isTestEnv = process.env.NODE_ENV === "test";
const redisClient = isTestEnv
  ? require("redis-mock").createClient() // Use redis-mock in test environment
  : createRedisClient; // Real Redis client in other environments

// Set value in Cache
export const setCacheValue = async (
  key: string,
  value: string,
  expirationInSeconds: number = 60 * 60
): Promise<void> => {
  await redisClient.set(key, value, { EX: expirationInSeconds });
};

// Get value from Cache
export const getCachedValue = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};

// Delete value from Cache
export const deleteCachedValue = async (key: string): Promise<void> => {
  await redisClient.del(key);
};
