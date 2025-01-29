import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";

const FinancialStatus = () => {
  const navigate = useNavigate();

  const handleStartSurvey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/financial-survey/financial-status/1', { state: { started: true }});
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
          alt="Logo"
          width={342}
          height={50}
        />
      </div>
      <Card className= "flex flex-col shadow-none border-none">
        <div>
          <p className="text-lightBlue font-medium mt-5 mb-4 text-base text-center">
            Para concluir, nos gustaría entender mejor tu actitud frente al riesgo en las inversiones y tu situación financiera. Respondé estas últimas preguntas para que podamos adaptar IUPI a tus necesidades.
          </p>
        </div>
        <div className="w-full space-y-4">
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
}

export default FinancialStatus;