import consola from 'consola';
import { cors } from 'hono/cors';

export const corsMiddleware = cors({
  origin: (origin) => {
    if (!origin) return null;

    // NOTE: 許可するoriginを必要に応じて追加
    const ALLOWED_ORIGINS = ['http://localhost:3000'] as const;

    if (!ALLOWED_ORIGINS.includes(origin as (typeof ALLOWED_ORIGINS)[number])) {
      consola.warn(`CORS: origin ${origin} is not allowed`);
      return null;
    }

    return origin;
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'User-Agent'],
  credentials: true,
});
