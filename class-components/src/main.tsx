import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Please check your index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
