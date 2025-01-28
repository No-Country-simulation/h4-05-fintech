import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { FinancialGoals, IFinancialSurvey } from "@/interfaces/profile.interfaces";
import { Button } from "../../ui/button";
import InputRadioCheckbox from "@/components/ui/radio";
import { Card } from "@/components/ui/card";

const Question1 = () => {
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const started = location.state as boolean;

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      if (!started) navigate('/financial-survey')
    }
  }, [])

  const [formData, setFormData] = useState<IFinancialSurvey | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData!, [e.target.name]: e.target.value });
  };

  const handleNextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sessionStorage.setItem('survey', JSON.stringify({ financialGoals: FinancialGoals.LIBERTAD_FINANCIERA }));
    navigate('/financial-survey/financial-knowledge', { state: { prev: true } });
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
            Objetivos financieros
          </h1>
          <p className="text-lightBlue font-medium mt-5 mb-4 text-center">
            ¿Qué meta financiera querés alcanzar?
          </p>
        </div>
        <div className="justify-end space-y-6 grid-rows-12 mt-5">
          <div className="space-y-3">
            <InputRadioCheckbox type="radio" name="financialGoals" label='Libertad financiera' onChange={handleChange} value={FinancialGoals.LIBERTAD_FINANCIERA} />
            <InputRadioCheckbox type="radio" name="financialGoals" label='Ingresos adicionales' onChange={handleChange} value={FinancialGoals.INGRESOS_ADICIONALES} />
            <InputRadioCheckbox type="radio" name="financialGoals" label='Jubilación' onChange={handleChange} value={FinancialGoals.JUBILACION} />
            <InputRadioCheckbox type="radio" name="financialGoals" label='Vacaciones' onChange={handleChange} value={FinancialGoals.VACACIONES} />
            <InputRadioCheckbox type="radio" name="financialGoals" label='Compra de vivienda' onChange={handleChange} value={FinancialGoals.VIVIENDA} />
            <InputRadioCheckbox type="radio" name="financialGoals" label='Imprevistos' onChange={handleChange} value={FinancialGoals.IMPREVISTOS} />
            <InputRadioCheckbox type="radio" name="financialGoals" label='Proyectos a largo plazo' onChange={handleChange} value={FinancialGoals.PROYECTOS_LARGO_PLAZO} />
            <InputRadioCheckbox type="radio" name="financialGoals" label='Otros' onChange={handleChange} value={FinancialGoals.OTROS} />
          </div>
          <div>
          <Button
            className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
            onClick={handleNextQuestion}
            disabled={!formData?.financialGoals ? true : false }
          >
            Siguiente pregunta
          </Button>
          </div>
        </div>
      </Card>
    </main>
  )
}

export default Question1;
