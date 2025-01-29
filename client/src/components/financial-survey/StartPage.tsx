import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useEffect, useRef, useState } from "react";
import useProtectedRoutes from "@/hooks/useInterceptors";
import { IProfileData } from "@/interfaces/profile.interfaces";

const FinancialSurveyStart = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const hasFetched = useRef(false);
  const navigate = useNavigate();

  const { apiProtectedRoutes } = useProtectedRoutes();

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
  
      const response = apiProtectedRoutes.get<IProfileData>('/profile/data');
      const localData = localStorage.getItem('skipped') as string;
      const skipped = JSON.parse(localData) as { time: number };
      
      response.then(({ data }) => {
        setLoading(false);
        if (!data.surveyAnswered && skipped) {
          navigate('/financial-survey/pending', { state: { started: true }})
        } else if (data.surveyAnswered) {
          navigate('/dashboard', { state: { started: true }})
        }
      });
    }
  }, [])

  const handleStartSurvey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/financial-survey/financial-goals', { state: { started: true }});
  }

  const handleSkipSurvey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const date = new Date();
    date.setHours(date.getHours() + 24);
    const time = new Date(date).getTime();
    localStorage.setItem('skipped', JSON.stringify({ time }));
    navigate('/dashboard');
  }

  return (
    (loading
      ? <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-lightBlue font-medium mt-5 -mb-4 text-base">Cargando...</h1>
        </div>
      : <main className="min-h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <img
              src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
              alt="Logo"
              width={342}
              height={50}
            />
          </div>
          <Card className="flex flex-col shadow-none border-none">
            <div>
              <p className="text-lightBlue font-medium mt-5 mb-4 text-base text-center">
                Felicidades cada vez estamos más cerca de ofrecerte un servicio más personalizado acorde a tu perfil y tu tolerancia al riesgo.
              </p>
            </div>
            <div className="w-full space-y-4">
              <Button 
                className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
                onClick={handleSkipSurvey}
              >
                Saltar por ahora
              </Button>
              <Button
                className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
                onClick={handleStartSurvey}
              >
                Completar
              </Button>
            </div>
          </Card>
        </main>
    )
  )
}

export default FinancialSurveyStart;