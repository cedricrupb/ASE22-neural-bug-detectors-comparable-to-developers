import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ThemeContextProvider from './contexts/ThemeContex';

if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/browser');
    worker.start();
}

ReactDOM.render(
    <React.StrictMode>
        <ThemeContextProvider>
            <App />
        </ThemeContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);


