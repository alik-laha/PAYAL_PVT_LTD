import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './components/context/contextProvider.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ContextProvider>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </ContextProvider>
  </BrowserRouter>
)
