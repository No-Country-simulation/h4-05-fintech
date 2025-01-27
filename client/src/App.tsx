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
import InicioOnbording from "./components/profile/InicioOnboarding";
import Nombre from "./components/profile/Nombre";
import Edad from "./components/profile/Edad";
import Ocupacion from "./components/profile/Ocupacion";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout>
          <Routes>

            {/* Redirige la raíz ("/") a "/auth" */}
            <Route path="/" element={<Navigate to="/auth" replace />} />

            {/* Rutas neutras */}
            <Route path="/perfil" element={<InicioOnbording />} />
            <Route path="/nombre" element={<Nombre />} />
            <Route path="/edad" element={<Edad />} />
            <Route path="/ocupacion" element={<Ocupacion />} />

            {/* Rutas no-protegidas */}
            <Route element={<Unprotected />}>
              {/* Ruta principal de autenticación */}
              <Route path="/auth" element={<Auth />} />

              {/* Subrutas de autenticación */}
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/verify" element={<Verify />} />
            </Route>

            {/* Rutas protegidas */}
            <Route element={<Protected />}>
              <Route path="/dashboard" element={<Dashboard />} />
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
