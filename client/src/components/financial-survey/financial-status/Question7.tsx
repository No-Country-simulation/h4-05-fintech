import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ExpensesRatios, IFinancialSurvey} from "@/interfaces/profile.interfaces";
import { Button } from "@/components/ui/button";
import InputRadioCheckbox from "@/components/ui/radio";
import { Card } from "@/components/ui/card";

const Question7 = () => {
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
    navigate('/financial-survey/financial-status/4', { state: { prev: true } });
  }

  return (
    <main>
      <header className="py-3 -mb-4">
        <div className="flex justify-between items-center">
          <label className="text-lightBlue" htmlFor="progress-bar">Cuestionario</label>
          <progress className="progressBar" value={6} max={10}>{6}%</progress>
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
                Gastos
              </h1>
              <p className="text-lightBlue font-medium mt-5 mb-4 text-center">
                ¿En qué porcentaje se encuentran tus gastos?
              </p>
            </div>
            <div className="justify-end space-y-6 grid-rows-12 mt-5">
              <div className="space-y-2">
                <InputRadioCheckbox type="radio" name="expenseRatios" label='Menos de 279.718 (salario mínimo)' onChange={handleChange} value={ExpensesRatios.OPTION_ONE} />
                <InputRadioCheckbox type="radio" name="expenseRatios" label='Entre 280.000 - 1.400.000' onChange={handleChange} value={ExpensesRatios.OPTION_TWO} />
                <InputRadioCheckbox type="radio" name="expenseRatios" label='Más de 1.400.000' onChange={handleChange} value={ExpensesRatios.OPTION_THREE} />
              </div>
              <div>
              <Button
                className="w-full h-[52px] bg-rusty text-lightBlue text-base font-normal tracking-wide"
                onClick={handleNextQuestion}
                disabled={!formData?.expenseRatios ? true : false }
              >
                Siguiente pregunta
              </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}

export default Question7;