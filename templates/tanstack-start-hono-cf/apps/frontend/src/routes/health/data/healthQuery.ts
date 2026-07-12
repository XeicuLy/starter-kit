import { queryOptions } from '@tanstack/react-query';
import { getHealthData } from '../api/health.function';

export const healthQueryOptions = () =>
  queryOptions({
    queryKey: ['health'] as const,
    queryFn: () => getHealthData(),
  });
