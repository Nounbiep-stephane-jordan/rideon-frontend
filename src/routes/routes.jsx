 
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Nav from "../component/nav/nav"
import RegisterScreen from "../features/registerScreen"
import ProtectedRoute from "./protectedRoute"
import MainDashboard from "../features/dashbaord"
import OnboardingWizardConfig from "../features/onbaordingWizard/onbaordingWizardConfig"
import LoginScreen from "../features/loginScreen"
import DashboardAdminNewView from "../features/dashboardAdminNewView"

import OnboardingWizard from "../features/onbaordingWizard/onboardingWizard"
import Spinner from "../component/spinner/spinner"
import { useGlobalVariables } from "../context/global"
const AppRoutes = () => {

      const {isAppLoading,messageToDisplay} = useGlobalVariables()
     
     return (
          <Router>
               <Nav/>
               {isAppLoading ? <Spinner text={messageToDisplay || "Loading"}/>:null}
               <Routes>
                    
 
                    <Route path="/login" element={<LoginScreen/>} />
                    <Route path="/register" element={<RegisterScreen/>} />
                    <Route path="/new" element={<DashboardAdminNewView/>} />


                    <Route element={<ProtectedRoute/>}>
                    <Route path="/" element={<MainDashboard/>} />
                    <Route path="/wizard" element={<OnboardingWizard stage={0}/>} />
                    <Route path="/wizard-config-1" element={<OnboardingWizardConfig stage={0}/>} />
                    </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
