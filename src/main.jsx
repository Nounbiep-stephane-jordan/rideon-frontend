import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/routes.jsx'
//import TestRoute from './routes/testRoute.jsx'
import { GlobalProvider } from './context/global.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
    <AppRoutes />
    {/* <TestRoute /> */}
    </GlobalProvider>
  </StrictMode>,
)
