import { useLocation, Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';

const Protected = ({ children }: PropsWithChildren) => {
  //TODO: leer el accesToken del Contexto Global
  const accessToken = "";
  const location = useLocation();

  return accessToken ? (
    children
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default Protected;