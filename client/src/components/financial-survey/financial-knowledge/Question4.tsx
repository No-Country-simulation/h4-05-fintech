import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { IFinancialSurvey, InvestmentExperience } from "@/interfaces/profile.interfaces";
import { Button } from "../../ui/button";
import { Card } from "@/components/ui/card";
import InputRadioCheckbox from "@/components/ui/radio";

const Question4 = () => {
  const [selectedValues, setSelectedValues] = useState<IFinancialSurvey['investmentExperience']>([])
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const prev = location.state as boolean;
  const session = sessionStorage.getItem('survey') as string;
  
  const data = JSON.parse(session) as IFinancialSurvey;
  
  const [formData, _setFormData] = useState<IFinancialSurvey>(data);
  
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      if (!prev) navigate('/financial-survey')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValues((prevValues) => [...prevValues, e.target.value as InvestmentExperience]);
  };
  
  const handleNextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sessionStorage.setItem('survey', JSON.stringify({ ...formData, investmentExperience: selectedValues }));
    navigate('/financial-survey/financial-status', { state: { prev: true } });
  }

  return (
    <main>
      <header className="py-3 -mb-4">
        <div className="flex justify-between items-center">
          <label className="text-lightBlue" htmlFor="progress-bar">Cuestionario</label>
          <progress className="progressBar" value={3} max={10}>{3}%</progress>
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
                Conocimiento y experiencia en inversiones
              </h1>
              <p className="text-lightBlue font-medium mt-5 mb-4 text-center">
                Conocimientos y experiencia en inversiones: ¿haz manejado instrumentos como bolsa, bonos, etc.? Mayor experiencia suele correlacionar con mayor tolerancia. 
              </p>
              <p className="text-lightBlue font-medium mt-5 mb-4 text-center">
                Puedes seleccionar múltiples opciones. Si no quieres responder, puedes continuar.
              </p>
            </div>
            <div className="space-y-2 grid-rows-12 mt-5 mb-4">
              <InputRadioCheckbox type="checkbox" name="investmentExperience" label='Acciones' onChange={handleChange} value={InvestmentExperience.ACCIONES} />
              <InputRadioCheckbox type="checkbox" name="investmentExperience" label='Cedears' onChange={handleChange} value={InvestmentExperience.CDEARS} />
              <InputRadioCheckbox type="checkbox" name="investmentExperience" label='Bonos' onChange={handleChange} value={InvestmentExperience.BONOS} />
              <InputRadioCheckbox type="checkbox" name="investmentExperience" label='ETFs ( fondos cotizados en bolsa)' onChange={handleChange} value={InvestmentExperience.ETFS} />
            </div>
            <div>
              <Button
                className="w-full h-[52px] bg-rusty text-lightBlue text-base font-normal tracking-wide"
                onClick={handleNextQuestion}
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

export default Question4;