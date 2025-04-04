import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterScreen from "../features/registerScreen";
import ProtectedRoute from "./protectedRoute";
import MainDashboard from "../features/dashbaord";
import OnboardingWizardConfig from "../features/onbaordingWizard/onbaordingWizardConfig";
import LoginScreen from "../features/loginScreen";
import DashboardAdminNewView from "../features/dashboardAdminNewView";
import OnboardingWizard from "../features/onbaordingWizard/onboardingWizard";
import Spinner from "../component/spinner/spinner";
import { useGlobalVariables } from "../context/global";
 
import DependencyMap from "../features/fileVisualisation/dependencyMap";
import Faq from "../features/faq/faqScreen"
import FileVisualisationPhase1 from "../features/fileVisualisation/fileVisualisationPhase1";
 

 
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <MainDashboard /> },
      { path: "/wizard", element: <OnboardingWizard  /> },
      { path: "/wizard-config-1", element: <OnboardingWizardConfig stage={0} /> },
 
      { path:"/file-visualisation", element: <FileVisualisationPhase1 />},
 
      { path: "/dependency-map", element: <DependencyMap   /> },
      { path: "/faq", element: <Faq/> },
    ],
  },
  { path: "/login", element: <LoginScreen /> },
  { path: "/register", element: <RegisterScreen /> },
  { path: "/new", element: <DashboardAdminNewView /> },
]);
 
const AppRoutes = () => {
  const { isAppLoading, messageToDisplay } = useGlobalVariables();

 
  return (
    <>
      {isAppLoading ? <Spinner text={messageToDisplay || "Loading"} /> : null}
      <RouterProvider router={router} />
    </>
  );
 
};

export default AppRoutes;