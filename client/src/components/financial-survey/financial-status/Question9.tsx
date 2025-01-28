import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { InvestmentTimesframes, IFinancialSurvey } from "@/interfaces/profile.interfaces";
import { Button } from "@/components/ui/button";
import InputRadioCheckbox from "@/components/ui/radio";
import { Card } from "@/components/ui/card";

const Question9 = () => {
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const prev = location.state as boolean;
  const session = sessionStorage.getItem('survey') as string;
  
  const data = JSON.parse(session) as IFinancialSurvey;
  
  const [formData, setFormData] = useState<IFinancialSurvey>(data);
  
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      if (!prev) navigate('/financial-survey')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData!, [e.target.name]: e.target.value });
  };
  
  const handleNextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sessionStorage.setItem('survey', JSON.stringify(formData));
    navigate('/financial-survey/financial-status/6', { state: { prev: true } });
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
            Plan de ahorros e inversión
          </h1>
          <p className="text-lightBlue font-medium mt-5 mb-4 text-center">
          ¿Cuánto tiempo planea mantener tus ahorros o inversion? Un horizonte más largo generalmente implica mayor tolerancia al riesgo.
          </p>
        </div>
        <div className="justify-end space-y-6 grid-rows-12 mt-5">
          <div className="space-y-3">
            <InputRadioCheckbox type="radio" name="investmentTimeframes" label='Largo plazo' onChange={handleChange} value={InvestmentTimesframes.LARGO} />
            <InputRadioCheckbox type="radio" name="investmentTimeframes" label='Mediano plazo' onChange={handleChange} value={InvestmentTimesframes.MEDIANO} />
            <InputRadioCheckbox type="radio" name="investmentTimeframes" label='Corto plazo' onChange={handleChange} value={InvestmentTimesframes.LARGO} />
          </div>
          <div>
          <Button
            className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
            onClick={handleNextQuestion}
            disabled={!formData?.investmentTimeframes ? true : false }
          >
            Siguiente pregunta
          </Button>
          </div>
        </div>
      </Card>
    </main>
  )
}

export default Question9;