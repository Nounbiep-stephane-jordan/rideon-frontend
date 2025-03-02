import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/routes.jsx'
import { GlobalProvider } from './context/global.jsx'
import { WizardProgressProvider } from './context/wizardProgressContext.jsx'
import { TourProvider } from './context/tourContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <WizardProgressProvider>
        <TourProvider>
    <AppRoutes />
    </TourProvider>
    </WizardProgressProvider>
    </GlobalProvider>
  </StrictMode>,
)
