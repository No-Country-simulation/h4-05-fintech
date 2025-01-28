import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ExpensesRatios, IFinancialSurvey} from "@/interfaces/profile.interfaces";
import { Button } from "../ui/button";

const Question9 = () => {
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
      setFormData({ ...data, expenseRatios: ExpensesRatios.OPTION_ONE });
      if (!prev) navigate('/financial-survey')
    }
  }, [])
  
  const handleFinishSurvey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sessionStorage.setItem('survey', JSON.stringify(formData));
    navigate('/financial-survey/summary', { state: { prev: true } });
  }

  return (
    <Button
      className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide"
      onClick={handleFinishSurvey}
    >
      Finalizar encuesta
    </Button>
  )
}

export default Question9;