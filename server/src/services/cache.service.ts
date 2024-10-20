import redisClient from "../config/redis.config";

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
