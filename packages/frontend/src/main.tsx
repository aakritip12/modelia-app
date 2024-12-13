// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  // Comment out the StrictMode for now to avoid double mounting in development
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
);
