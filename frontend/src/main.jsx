import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#ffffff',
          color: '#1f1f1f',
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
          fontSize: '13.5px',
          boxShadow: '0 4px 12px rgb(0 0 0 / 0.08)',
        },
        success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
        error:   { iconTheme: { primary: '#dc2626', secondary: '#fff' } },
      }}
    />
  </React.StrictMode>
);