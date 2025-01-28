import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const FinancialSurveyStart = () => {
  const navigate = useNavigate();

  const handleStartSurvey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/financial-survey/financial-goals', { state: { started: true }});
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
            Felicidades cada vez estamos mas cerca de ofrecerte un servicio mas personalizado acorde a tu perfil y tu tolerancia al riesgo,
          </p>
        </div>
        <div className="w-full space-y-4">
          <Button className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide">
            Saltar por ahora
          </Button>
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

export default FinancialSurveyStart;