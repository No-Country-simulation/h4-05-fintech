import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

const Protected = () => {
  const { sessionLoading, session } = useContext(AuthContext)
  const location = useLocation();

  return sessionLoading
    ? <h1 className="text-lightBlue font-medium mt-5 -mb-4 text-base">Cargando...</h1>
    : session
      ? <Outlet />
      : <Navigate to="/auth" state={{ from: location }} replace />;
};

export default Protected;