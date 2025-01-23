import { useContext, useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

const Unprotected = () => {
  const { sessionLoading, session, setProtectedPage } = useContext(AuthContext)

  const protectedPageSet = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (!protectedPageSet.current) {
      protectedPageSet.current = true;
      setProtectedPage(false);
    }
  }, [])

  return sessionLoading
    ? <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-lightBlue font-medium mt-5 -mb-4 text-base">Cargando...</h1>
      </main> 
    : !session
        ? <Outlet />
        : <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default Unprotected;