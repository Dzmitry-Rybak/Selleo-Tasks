import React from 'react';
import ReactDOM from 'react-dom/client.js';
import './styles/styles.scss';
import App from './components/app/app.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);