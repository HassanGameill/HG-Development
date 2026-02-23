import Redis from "ioredis";


if (!process.env.REDIS_URL) {
  throw new Error("Redis connection failed: REDIS_URL is missing");
}

console.log("Redis Connected");

export const redis = new Redis(process.env.REDIS_URL);
