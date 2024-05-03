import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Import our custom CSS
import './scss/styles.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
