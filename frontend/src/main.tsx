import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { client } from './client/client.gen';

if (import.meta.env.PROD) {
  // In production nginx serves the frontend and proxies /api to the
  // backend on the same origin, so calls should be relative rather than
  // pointing at the localhost address baked in by the client generator.
  client.setConfig({ baseUrl: '' });
}

const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeQuery.addEventListener('change', (event) => {
  document.documentElement.classList.toggle('dark', event.matches);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
