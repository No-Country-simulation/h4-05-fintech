import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { IFinancialSurvey, RiskReactions } from "@/interfaces/profile.interfaces";
import { Button } from "../../ui/button";
import InputRadioCheckbox from "@/components/ui/radio";
import { Card } from "@/components/ui/card";
import { AxiosError } from "axios";
import { IApiError } from "@/api/api-errors";
import useProtectedRoutes from "@/hooks/useInterceptors";

const Question10 = () => {
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const prev = location.state as boolean;
  const session = sessionStorage.getItem('survey') as string;
  
  const data = JSON.parse(session) as IFinancialSurvey;
  
  const [formData, setFormData] = useState<IFinancialSurvey>(data);
  const { apiProtectedRoutes, setRequest } = useProtectedRoutes();
  
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      if (!prev) navigate('/financial-survey')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData!, [e.target.name]: e.target.value });
  };

  console.log(formData);

  const handleSubmitAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRequest(true);
  
    const response = apiProtectedRoutes.post('/profile/financial', formData);
  
    response
      .then(() => {
        sessionStorage.removeItem('survey');
        navigate('/dashboard');
      })
      .catch((error: AxiosError) => {
        const errorMessage: IApiError = error.response?.data as IApiError;
        console.error(errorMessage.message);
      })
    }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
          alt="Logo"
          className="w-[342px] h-[50px]"
        />
      </div>
      <Card className= "flex flex-col shadow-none border-none">
        <div className="mt-8 space-y-4 mb-4">
          <h1 className="text-lightBlue font-bold text-center text-base">
            Situacion Financiera
          </h1>
          <p className="text-lightBlue font-medium mt-5 mb-4 text-center">
            Si su cartera perdiera un 20% en un año, ¿qué haría?
          </p>
        </div>
        <div className="justify-end space-y-6 grid-rows-12 mt-5">
          <div className="space-y-3">
            <InputRadioCheckbox type="radio" name="riskReactions" label='Vendería todo' onChange={handleChange} value={RiskReactions.VENDERIA_TODO} />
            <InputRadioCheckbox type="radio" name="riskReactions" label='Mantendría todo' onChange={handleChange} value={RiskReactions.MANTENDRIA_INVERSION} />
            <InputRadioCheckbox type="radio" name="riskReactions" label='Compraría más' onChange={handleChange} value={RiskReactions.COMPRARIA_MAS} />
          </div>
          <div>
          <Button
            className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
            onClick={handleSubmitAnswers}
            disabled={!formData.riskReactions ? true : false}
          >
            Finalizar encuenta
          </Button>
          </div>
        </div>
      </Card>
    </main>
  )
}

export default Question10;