'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function Provider({ 
    children 
}: { children: React.ReactNode }) {
  // queryClient는 컴포넌트가 다시 렌더될 때마다 새로 만들어지지 않도록 useState로 감싸는 게 안전합니다.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}