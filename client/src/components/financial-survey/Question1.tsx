import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { FinancialGoals, IFinancialSurvey } from "@/interfaces/profile.interfaces";
import { Button } from "../ui/button";

const Question1 = () => {
  const [formData, setFormData] = useState<IFinancialSurvey | null>(null);

  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, started } = location.state as { data: IFinancialSurvey, started: boolean };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      setFormData({ ...data, financialGoals: FinancialGoals.LIBERTAD_FINANCIERA });
      if (!started) navigate('/financial-survey')
    }
  }, [])

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setFormData({ ...formData!, financialGoals: FinancialGoals.LIBERTAD_FINANCIERA });
  // }
  
  const handleNextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/financial-survey/2', { state: { data: formData, prev: true } });
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
