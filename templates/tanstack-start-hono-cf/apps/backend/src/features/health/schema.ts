import { z } from '@hono/zod-openapi';

export const HealthResponseSchema = z.object({
  timestamp: z.iso.date().openapi({ example: new Date().toISOString() }),
});
