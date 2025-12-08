import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST||"127.0.0.1",
  port: Number(process.env.REDIS_PORT || 6379),
  retryStrategy(times) {
    return Math.min(times * 50, 2000); // exponential backoff
  },
});

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("❌ Redis error:", err));

export default redis;