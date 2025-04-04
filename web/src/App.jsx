import { QueryClientProvider } from '@tanstack/react-query';
import MainRoutes from './routes';
import queryClient from './lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainRoutes />
    </QueryClientProvider>
  )
}

export default App
