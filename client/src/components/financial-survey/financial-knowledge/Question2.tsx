import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { IFinancialSurvey, InvestmentKnowledge } from "@/interfaces/profile.interfaces";
import { Button } from "../../ui/button";
import { Card } from "@/components/ui/card";
import InputRadioCheckbox from "@/components/ui/radio";

const Question2 = () => {
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
    navigate('/financial-survey/financial-knowledge/2', { state: { prev: true } });
  }

  return (
    <main>
      <header className="py-3 -mb-4">
        <div className="flex justify-between items-center space-x-3">
          <label className="text-lightBlue flex justify-center items-center space-x-3">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            <p className="text-lightBlue">Cuestionario</p>
          </label>
          <progress className="progressBar" value={2} max={10}>{2}%</progress>
        </div>
      </header>
      <section className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-6">
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
                Conocimiento en inversiones
              </h1>
              <p className="text-lightBlue font-medium mt-5 mb-4 text-center">
                ¿Tienes conocimiento en instrumentos de inversiones como acciones, Cedears, bonos o ETFs? ¿Qué tanto entiendes sobre estos instrumentos de inversión?
              </p>
            </div>
            <div className="space-y-2 grid-rows-12 mt-5 mb-4">
              <InputRadioCheckbox type="radio" name="investmentKnowledge" label='No tengo idea' onChange={handleChange} value={InvestmentKnowledge.NO_TENGO_IDEA} />
              <InputRadioCheckbox type="radio" name="investmentKnowledge" label='Me suena pero no estoy seguro' onChange={handleChange} value={InvestmentKnowledge.ME_SUENA_PERO} />
              <InputRadioCheckbox type="radio" name="investmentKnowledge" label='Sé como funciona' onChange={handleChange} value={InvestmentKnowledge.SE_COMO_FUNCIONA} />
              <InputRadioCheckbox type="radio" name="investmentKnowledge" label='Invierto de forma regular' onChange={handleChange} value={InvestmentKnowledge.INVIERTO_REGULARMENTE} />
            </div>
            <div>
              <Button
                className="w-full h-[52px] rounded-xl bg-rusty text-lightBlue text-base font-normal tracking-wide"
                onClick={handleNextQuestion}
                disabled={!formData?.investmentKnowledge ? true : false }
              >
                Siguiente pregunta
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}

export default Question2;