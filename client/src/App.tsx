import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate, 
  // useRoutes 
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./components/layout/MainLayout";

// 
import Unprotected from "./components/protected/Unprotetcted";
import Protected from "./components/protected/Protected";

// Auth
import AuthPage from "./components/auth/Auth";
import RegisterPage from "./components/auth/Register";
import LoginPage from "./components/auth/Login";
import RegisteredPage from "./components/auth/Registered";
import VerifyPage from "./components/auth/Verify";
import ForgotPasswordPage from "./components/auth/ForgotPassword";
import ResetPasswordPage from "./components/auth/ResetPassword";

// Dashboard
import Dashboard from "./components/profile/Dashboard";
import UpdateProfilePage from "./components/profile/UpdateProfile";
import StartPage from "./components/profile/StartPage";
import NamesPage from "./components/profile/NamesPage";
import AgePage from "./components/profile/AgePage";
import OccupationPage from "./components/profile/OccupationPage";

// Survey
import FinancialSurveyStart from "./components/financial-survey/StartPage";
import SummaryPage from "./components/financial-survey/SummaryPage";
import SummaryProfilePage from "./components/profile/ProfileSummary";
import FinancialGoals from "./components/financial-survey/financial-goals/FinancialGoals";
import FinancialKnowledge from "./components/financial-survey/financial-knowledge/FinancialKnowledge";
import FinancialStatus from "./components/financial-survey/financial-status/FinancialStatus";

// Questions
import Question1 from "./components/financial-survey/financial-goals/Question1";
import Question2 from "./components/financial-survey/financial-knowledge/Question2";
import Question3 from "./components/financial-survey/financial-knowledge/Question3";
import Question4 from "./components/financial-survey/financial-knowledge/Question4";
import Question5 from "./components/financial-survey/financial-status/Question5";
import Question6 from "./components/financial-survey/financial-status/Question6";
import Question7 from "./components/financial-survey/financial-status/Question7";
import Question8 from "./components/financial-survey/financial-status/Question8";
import Question9 from "./components/financial-survey/financial-status/Question9";
import Question10 from "./components/financial-survey/financial-status/Question10";
import PendingFinancialSurvey from "./components/financial-survey/PendingSurvey";

// import AuthRoutes from "./components/auth/AuthRoutes";
// import DashboardRoutes from "./components/profile/DashboardRoutes";
// import FinancialSurveyRoutes from "./components/financial-survey/SurveyRoutes ";

//const routes = useRoutes([
//  { 
//    path: '/', 
//    children: [
//      { path: "/auth/*", element: <AuthRoutes />},
//      { path: "/dashboard/*", element: <DashboardRoutes />},
//      { path: "/financial-survey/*", element: <FinancialSurveyRoutes />}
//    ] 
//  }
//])

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout>
          <Routes>

            {/* Redirige la raíz ("/") a "/auth" */}
            <Route path="/" element={<Navigate to="/auth" replace />} />

            {/* Rutas neutras */}

            {/* Unprotected routes */}
            <Route element={<Unprotected />}>

              {/* Auth routes */}
              <Route path="/auth/*">
                <Route path="" element={<AuthPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="registered" element={< RegisteredPage />} />
                <Route path="verify" element={<VerifyPage />} />
                <Route path="forgot-password" element={<ForgotPasswordPage />} />
                <Route path="reset-password" element={<ResetPasswordPage />} />
              </Route>
              
            </Route>

            {/* Protected routes */}
            <Route element={<Protected />}>

              {/* Dashboard routes */}
              <Route path="/dashboard/*">
                <Route path="" element={<Dashboard />} />
                <Route path="update-profile" element={<UpdateProfilePage />} />
              </Route>

              {/* Profile routes*/}
              <Route path="/profile/*">
                <Route path="start" element={<StartPage />} />
                <Route path="names" element={<NamesPage />} />
                <Route path="age" element={<AgePage />} />
                <Route path="occupation" element={<OccupationPage />} />
                <Route path="summary" element={<SummaryProfilePage />} />
              </Route>

              {/* Financial Survey routes */}
              <Route path="/financial-survey/*">
                <Route path="" element={<FinancialSurveyStart/>} />
                <Route path="pending" element={< PendingFinancialSurvey />} />
                <Route path="financial-goals/*">
                  <Route path="" element={<FinancialGoals />} />
                  <Route path="1" element={<Question1 />} />
                </Route>
                <Route path="financial-knowledge/*">
                  <Route path="" element={<FinancialKnowledge />} />
                  <Route path="1" element={<Question2 />} />
                  <Route path="2" element={<Question3 />} />
                  <Route path="3" element={<Question4 />} />
                </Route>
                <Route path="financial-status/*">
                  <Route path="" element={<FinancialStatus />} />
                  <Route path="1" element={<Question5 />} />
                  <Route path="2" element={<Question6 />} />
                  <Route path="3" element={<Question7 />} />
                  <Route path="4" element={<Question8 />} />
                  <Route path="5" element={<Question9 />} />
                  <Route path="6" element={<Question10 />} />
                </Route>
                <Route path="summary" element={<SummaryPage />} />
              </Route>
            </Route>

            {/* Ruta 404 para manejar rutas no encontradas */}
            <Route path="*" element={<Navigate to="/auth" replace />} />

          </Routes>
        </MainLayout>
      </AuthProvider>
    </BrowserRouter>  
  );
}

export default App;
