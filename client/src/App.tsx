import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./components/layout/MainLayout";

// GRUPO DE RUTAS
import AuthRoutes from "./components/auth/AuthRoutes";
import DashboardRoutes from "./components/dashboard/DashboardRoutes";
import FinancialSurveyRoutes from "./components/financial-survey/SurveyRoutes ";

const router = createBrowserRouter([
  {
    element: <AuthProvider><MainLayout /></AuthProvider>,
    errorElement: <p>Not found</p>,
    children: [
      { path: "/auth/*", element: <AuthRoutes /> },
      { path: "/dashboard/*", element: <DashboardRoutes /> },
      { path: "/financial-survey/*", element: <FinancialSurveyRoutes /> }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />  
  );
}

export default App;