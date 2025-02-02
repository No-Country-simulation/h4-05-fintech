import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router";


const FinancialGoals = () => {
  const navigate = useNavigate();

  const handleStartSurvey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/financial-survey/financial-goals/1', { state: { started: true }});
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
            Super iUPi, para que podamos ofrecerte las mejores recomendaciones de inversión, necesitamos conocer tus aspiraciones financieras. ¿Nos contás un poco más?
          </p>
        </div>
        <div className="w-full space-y-4">
          <Button
            className="w-full h-[52px] bg-rusty text-lightBlue text-base font-normal tracking-wide"
            onClick={handleStartSurvey}
          >
            Completar
          </Button>
        </div>
      </Card>
    </main>
  )
}

export default FinancialGoals;