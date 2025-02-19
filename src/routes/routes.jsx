import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Nav from "../component/nav/nav"
import LoginScreen from "../features/loginScreen"
import RegisterScreen from "../features/registerScreen"
import ProtectedRoute from "./protectedRoute"
import MainDashboard from "../features/dashbaord"
import OnboardingWizardConfig from "../features/onbaordingWizard/onbaordingWizardConfig"


const AppRoutes = () => {

     
     return (
          <Router>
               <Nav/>
               <Routes>
                    <Route path="/" element={<LoginScreen/>} />
                    <Route path="/login" element={<LoginScreen/>} />
                    <Route path="/register" element={<RegisterScreen/>} />

                    <Route element={<ProtectedRoute/>}>
                    <Route path="/dashboard" element={<MainDashboard/>} />
                    <Route path="/wizard-config-1" element={<OnboardingWizardConfig stage={0}/>} />
                    </Route>

               </Routes>
          </Router>
     )
}

export default AppRoutes;