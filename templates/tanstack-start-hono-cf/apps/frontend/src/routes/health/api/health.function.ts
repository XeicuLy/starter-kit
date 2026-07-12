import { createServerFn } from '@tanstack/react-start';
import type { ApiType } from 'backend';
import consola from 'consola';
import { hc } from 'hono/client';

// NOTE: 環境に応じて、環境変数に設定
const API_HOST_URL = 'http://localhost:8787';

export const getHealthData = createServerFn({ method: 'GET' }).handler(async () => {
  const client = hc<ApiType>(API_HOST_URL);

  const response = await client.api.v1.health.$get();

  if (!response.ok) {
    consola.error('Failed to fetch health data', {
      status: response.status,
      statusText: response.statusText,
    });
    throw new Error('Failed to fetch health data', { cause: response.statusText });
  }

  return response.json();
});
