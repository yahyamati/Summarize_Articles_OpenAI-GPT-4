import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css'; // Make sure this line is present to import Tailwind CSS
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
