
import { cacheProvider } from './init.js';
export function withCache(ttl = 3600) {
    return async (req, res, next) => {
        const key = `${req.method}:${req.originalUrl}`;
        const cached = await cacheProvider.get(key);
        if (cached) {
            res.setHeader('X-cache', 'HIT');
            return res.json(JSON.stringify(cached));
        }

        const originalJson = res.json.bind(res);
        res.json = (async (body) => {
            res.setHeader('X-cache', 'MISS');
            await cacheProvider.set(key, JSON.stringify(body), ttl);
            return originalJson(body);
        });
        next();
    }
}