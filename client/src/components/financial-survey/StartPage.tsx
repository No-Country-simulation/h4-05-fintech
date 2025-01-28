import { useNavigate } from "react-router";
import { Button } from "../ui/button";

const FinancialSurveyStart = () => {
  const navigate = useNavigate();

  const handleStartSurvey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/financial-survey/1', { state: { started: true }});
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
        <h1 className="text-lightBlue font-medium mt-5 mb-4 text-base">
          Debemos completar tu perfil financiero
        </h1>
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
    </main>
  )
}

export default FinancialSurveyStart;