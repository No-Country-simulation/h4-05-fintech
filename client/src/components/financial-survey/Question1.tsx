import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { FinancialGoals } from "@/interfaces/profile.interfaces";
import { Button } from "../ui/button";

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

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setFormData({ ...formData!, financialGoals: FinancialGoals.LIBERTAD_FINANCIERA });
  // }
  
  const handleNextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sessionStorage.setItem('survey', JSON.stringify({ financialGoals: FinancialGoals.LIBERTAD_FINANCIERA }));
    navigate('/financial-survey/2', { state: { prev: true } });
  }

  return (
    <Button
      className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
      onClick={handleNextQuestion}
    >
      Siguiente pregunta
    </Button>
  )
}

export default Question1;
