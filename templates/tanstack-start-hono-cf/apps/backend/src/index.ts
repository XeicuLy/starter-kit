import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import consola from 'consola';
import { health } from './features/health';
import { corsMiddleware } from './middleware/cors';

const app = new OpenAPIHono<{
  Bindings: CloudflareBindings;
}>();

app.use('/*', corsMiddleware);

export const routes = app.route('/', health);

routes
  .doc('/openapi.json', {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'SPROUT API Documentation',
    },
  })
  .get('/swagger', swaggerUI<{ Bindings: CloudflareBindings }>({ url: '/openapi.json' }));

consola.info('Swagger UI is available at /swagger');

export type ApiType = typeof routes;
export default routes;
