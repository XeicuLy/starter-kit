import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { healthQueryOptions } from './data/healthQuery';

export const Route = createFileRoute('/health')({
  loader: ({ context }) => context.queryClient.ensureQueryData(healthQueryOptions()),
  component: Health,
});

function Health() {
  const { data: healthData } = useSuspenseQuery(healthQueryOptions());
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Health Check</h1>
      <p className="mt-4 text-lg">Everything is working fine!</p>
      <pre className="mt-4 text-lg">Health Check Result: {healthData.timestamp}</pre>
    </div>
  );
}
