import { QueryClientProvider } from '@tanstack/react-query';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'

import MainRoutes from './routes';
import queryClient from './lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainRoutes />
      <Tooltip id="tooltip" place="bottom" />
    </QueryClientProvider>
  )
}

export default App
