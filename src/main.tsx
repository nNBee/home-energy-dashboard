import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './pages/router.tsx';

const queryClient = new QueryClient();

async function enableMocking() {
  const shouldEnableMocking =
    import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === 'true';

  if (!shouldEnableMocking) {
    return;
  }

  const { worker } = await import('./mocks/browser.ts');

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
});
