import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const PendingFinancialSurvey = () => {
  const navigate = useNavigate();

  const handleStartSurvey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/financial-survey/financial-goals', { state: { started: true }});
  }

  const handleSkipSurvey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const date = new Date();
    date.setHours(date.getHours() + 24);
    const time = new Date(date).getTime();
    localStorage.setItem('skipped', JSON.stringify({ time }));
    navigate('/dashboard/home');
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
      <Card className="flex flex-col shadow-none border-none">
        <div>
          <p className="text-lightBlue font-medium mt-5 mb-4 text-base text-center">
            Recuerda completar tu perfil para poder ofrecerte un servicio más personalizado.
          </p>
        </div>
        <div className="w-full space-y-4">
          <Button 
            className="w-full h-[52px] bg-rusty text-lightBlue text-base font-normal tracking-wide"
            onClick={handleSkipSurvey}
          >
            Saltar por ahora
          </Button>
          <Button
            className="w-full h-[52px] bg-rusty text-lightBlue text-base font-normal tracking-wide"
            onClick={handleStartSurvey}
          >
            Seguir completando
          </Button>
        </div>
      </Card>
    </main>
  )
}

export default PendingFinancialSurvey;