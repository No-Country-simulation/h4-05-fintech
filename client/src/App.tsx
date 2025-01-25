import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Auth from "./components/auth/Auth";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Verify from "./components/auth/Verify";
import Dashboard from "./components/profile/Dashboard";
import Protected from "./components/protected/Protected";
import { AuthProvider } from "./context/AuthContext";
import Unprotected from "./components/protected/Unprotetcted";
import FinancialSurvey from "./components/profile/FinancialSurvey";
import Registered from "./components/auth/Registered";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <Routes>
          
            {/* Redirige la raíz ("/") a "/auth" */}
            <Route path="/" element={<Navigate to="/auth" replace />} />

            {/* Rutas neutras */}
            {/* Ruta principal de autenticación */}
            <Route path="/auth" element={<Auth />} />
  
            {/* Subrutas de autenticación */}
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login/>} />
            <Route path="/auth/registered" element={< Registered />} />
            <Route path="/auth/verify" element={<Verify />} />

            {/* Rutas no protegidas */}
            <Route element={<Unprotected/>}>
              
            </Route>

            {/* Rutas protegidas */}
            <Route element={<Protected/>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/survey" element={<FinancialSurvey/>} />
            </Route>
  
            {/* Ruta 404 para manejar rutas no encontradas */}
            <Route path="*" element={<Navigate to="/auth" replace />} />
          
          </Routes>
        </MainLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;