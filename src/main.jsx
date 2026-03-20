import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'swiper/css';
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <ThemeProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </ThemeProvider>
  </StrictMode>,
)
