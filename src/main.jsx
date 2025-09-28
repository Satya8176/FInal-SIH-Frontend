import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Default options
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontWeight: 'bold',
          },
          success: {
            duration: 4000,
            icon: '✅',
            style: {
              background: '#4BB543', // green background
              color: '#fff',
            },
          },
          error: {
            duration: 5000,
            icon: '❌',
            style: {
              background: '#FF4D4F', // red background
              color: '#fff',
            },
          },
        }}
      /> */}
    <App />
  </StrictMode>
);
