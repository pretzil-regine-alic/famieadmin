import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Create root using createRoot from 'react-dom/client'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
