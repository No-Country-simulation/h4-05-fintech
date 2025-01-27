import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { AxiosError } from "axios";

import useProtectedRoutes from "@/hooks/useInterceptors";
import { IUpdateProfileData } from "@/interfaces/profile.interfaces";
import { IApiError } from "@/api/api-errors";

import { Card } from "../ui/card";
import { Button } from "../ui/button";

const SummaryProfilePage = () => {
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, prev } = location.state as { data: IUpdateProfileData, prev: boolean };

  const { apiProtectedRoutes, setRequest } = useProtectedRoutes();

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      if (!prev) navigate('/profile/start')
    }
  }, [])
  
  const handleSubmitAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRequest(true);

    const response = apiProtectedRoutes.put('/profile/data', data);

    response
      .then(() => console.log('Perfil actualizado con éxito'))
      .catch((error: AxiosError) => {
        const errorMessage: IApiError = error.response?.data as IApiError;
        console.error(errorMessage.message);
      })
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Card>
      {Object.values(data).map((value, index) => {
        if (value instanceof Array) return <p 
          key={index} 
          className="text-lightBlue font-medium mt-5 mb-4 text-base"
        >
          {value.join(', ')}
        </p>;
        else return <p 
          key={index} 
          className="text-lightBlue font-medium mt-5 mb-4 text-base"
        >
          {value}
        </p>
      })}
      </Card>
      <Button onClick={handleSubmitAnswers}>
        Actualizar datos
      </Button>
    </main>
  )
}

export default SummaryProfilePage;