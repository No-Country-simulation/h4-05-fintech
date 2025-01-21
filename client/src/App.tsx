import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Auth from "./components/auth/Auth";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import  Verify  from "./components/auth/Verify";
import Dashboard from "./components/profile/Dashboard";



function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Redirige la raíz ("/") a "/auth" */}
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Ruta principal de autenticación */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Subrutas de autenticación */}
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/auth/verify" element={<Verify />} />
          
          {/* Ruta 404 para manejar rutas no encontradas */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;