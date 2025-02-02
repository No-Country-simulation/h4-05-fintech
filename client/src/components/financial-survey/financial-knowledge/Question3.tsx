import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { FinancialEducation, IFinancialSurvey } from "@/interfaces/profile.interfaces";
import { Button } from "../../ui/button";
import InputRadioCheckbox from "@/components/ui/radio";
import { Card } from "@/components/ui/card";

const Question3 = () => {
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
    navigate('/financial-survey/financial-knowledge/3', { state: { prev: true } });
  }

  return (
    <main>
      <header className="py-3 -mb-4">
        <div className="flex justify-between items-center">
          <label className="text-lightBlue" htmlFor="progress-bar">Cuestionario</label>
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
                Educación financera
              </h1>
              <p className="text-lightBlue font-medium mt-5 mb-4 text-center">
                ¿Tienes alguna formación sobre el mundo de las inversiones como instrumentos de inversión (acciones, bonos, ETFs etc)?
              </p>
            </div>
            <div className="space-y-2 grid-rows-12 mt-5 mb-4">
              <InputRadioCheckbox type="radio" name="financialEducation" label='Certificado profesional' onChange={handleChange} value={FinancialEducation.CARRERA_PROFESIONAL} />
              <InputRadioCheckbox type="radio" name="financialEducation" label='Técnico o tecnólogo' onChange={handleChange} value={FinancialEducation.TECNICO_O_TECNOLOGICO} />
              <InputRadioCheckbox type="radio" name="financialEducation" label='Carrera profesional' onChange={handleChange} value={FinancialEducation.CARRERA_PROFESIONAL} />
              <InputRadioCheckbox type="radio" name="financialEducation" label='No tengo formación' onChange={handleChange} value={FinancialEducation.NO_TENGO_FORMACION} />
            </div>
            <div>
              <Button
                className="w-full h-[52px] bg-rusty text-lightBlue text-base font-normal tracking-wide"
                onClick={handleNextQuestion}
                disabled={!formData?.financialEducation ? true : false }
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

export default Question3;