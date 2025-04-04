import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // Change to HashRouter
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter> {/* Change to HashRouter */}
      <App />
    </HashRouter>
  </StrictMode>,
)
