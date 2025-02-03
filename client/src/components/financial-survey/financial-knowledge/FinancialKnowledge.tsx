import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";

const FinancialKnowledge = () => {
  const navigate = useNavigate();

  const handleStartSurvey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/financial-survey/financial-knowledge/1', { state: { started: true }});
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
              ¡Perfecto! Ahora que te conocemos mejor, nos gustaría entender tu nivel de conocimiento sobre inversiones. ¿Podrías contarnos sobre tu experiencia previa?
            </p>
          </div>
          <div className="w-full space-y-4">
            <Button
              className="w-full h-[52px] rounded-xl bg-rusty text-lightBlue text-base font-normal tracking-wide"
              onClick={handleStartSurvey}
            >
              Completar
            </Button>
          </div>
        </Card>
      </section>
    </main>
  )
}

export default FinancialKnowledge;