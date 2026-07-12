import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import consola from 'consola';
import { InternalServerErrorSchema } from '../../schema/error';
import { HealthResponseSchema } from './schema';
import { getHealthStatus } from './service';

const app = new OpenAPIHono<{
  Bindings: CloudflareBindings;
}>();

const healthRoute = createRoute({
  method: 'get',
  path: '/api/v1/health',
  tags: ['System'],
  summary: 'Health Check',
  description: 'APIサーバーが適切に稼働しているかを確認するためのエンドポイント',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: HealthResponseSchema,
        },
      },
      description: 'ISO形式のタイムスタンプを含むJSONオブジェクトを返却',
    },
    500: {
      content: {
        'application/json': {
          schema: InternalServerErrorSchema,
        },
      },
      description: 'サーバーエラーが発生した場合に返却',
    },
  },
});

export const health = app.openapi(healthRoute, async (ctx) => {
  try {
    return ctx.json(getHealthStatus(), 200);
  } catch (error) {
    consola.error('ヘルスチェックに失敗しました:', error);
    return ctx.json({ message: '予期せぬエラーが発生しました。' }, 500);
  }
});
