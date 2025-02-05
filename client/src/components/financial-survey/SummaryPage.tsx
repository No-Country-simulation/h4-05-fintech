import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { AxiosError } from "axios";

import useProtectedRoutes from "@/hooks/useInterceptors";
import { IFinancialSurvey } from "@/interfaces/profile.interfaces";
import { IApiError } from "@/api/api-errors";

import { Card } from "../ui/card";
import { Button } from "../ui/button";

const SummaryPage = () => {
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const prev = location.state as boolean;
  const session = sessionStorage.getItem('survey') as string;
    
  const data = JSON.parse(session) as IFinancialSurvey;

  const { apiProtectedRoutes, setRequest } = useProtectedRoutes();

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      if (!prev) navigate('/financial-survey')
    }
  }, [])
  
  const handleSubmitAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRequest(true);

    const response = apiProtectedRoutes.post('/profile/financial', data);

    response
      .then(({ data }) => {
        console.log(data);
        sessionStorage.removeItem('survey');
      })
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
        Enviar respuestas
      </Button>
    </main>
  )
}

export default SummaryPage;