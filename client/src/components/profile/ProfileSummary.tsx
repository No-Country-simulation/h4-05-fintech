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

  const prev = location.state as boolean;
  const session = sessionStorage.getItem('profile') as string;

  const data = JSON.parse(session) as IUpdateProfileData;

  const { apiProtectedRoutes, setRequest } = useProtectedRoutes();

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      if (!prev) navigate('/profile/start')
    }
  }, [])
  
  const handleSubmitProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRequest(true);

    const updatedProfuke: IUpdateProfileData = {...data, age: +data.age }
    const response = apiProtectedRoutes.put('/profile/data', updatedProfuke);

    response
      .then(() => {
        sessionStorage.removeItem('profile');
        navigate('/financial-survey')
      })
      .catch((error: AxiosError) => {
        const errorMessage: IApiError = error.response?.data as IApiError;
        console.error(errorMessage.message);
      })
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-lightBlue font-medium mt-5 mb-4 text-base">
        Resumen del perfil
      </h1>
      <Card className="shadow-none border-none">
        <div className="flex justify-between items-center space-x-6">
          <p className="text-lightBlue font-medium mt-5 mb-4 text-base">Nombre:</p>
          <p className="text-lightBlue font-medium mt-5 mb-4 text-base">{data.name}</p>
        </div>
        <div className="flex justify-between items-center space-x-6">
          <p className="text-lightBlue font-medium mt-5 mb-4 text-base">Apellido:</p>
          <p className="text-lightBlue font-medium mt-5 mb-4 text-base">{data.lastname}</p>
        </div>
        <div className="flex justify-between items-center space-x-6">
          <p className="text-lightBlue font-medium mt-5 mb-4 text-base">Edad:</p>
          <p className="text-lightBlue font-medium mt-5 mb-4 text-base">{data.age}</p>
        </div>
        <div className="flex justify-between items-center space-x-6">
          <p className="text-lightBlue font-medium mt-5 mb-4 text-base">Ocupación:</p>
          <p className="text-lightBlue font-medium mt-5 mb-4 text-base">{data.occupation}</p>
        </div>
      </Card>
      <Button 
        className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide" 
        onClick={handleSubmitProfile}
      >
        Actualizar datos
      </Button>
    </main>
  )
}

export default SummaryProfilePage;