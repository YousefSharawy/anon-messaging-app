import { RedisCacheProvider } from "../../pkg/cache/redis.js";
import { env } from '../../lib/config/env.js';
export const cacheProvider = new RedisCacheProvider({
    host: env.redis.REDIS_HOST,
    port: env.redis.port,
    password: env.redis.password || '',
});
