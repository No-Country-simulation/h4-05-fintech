import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ExpensesRatios, IFinancialSurvey} from "@/interfaces/profile.interfaces";
import { Button } from "../ui/button";

const Question9 = () => {
  const [formData, setFormData] = useState<IFinancialSurvey | null>(null);

  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, prev } = location.state as { data: IFinancialSurvey, prev: boolean };
  
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      setFormData({ ...data, expenseRatios: ExpensesRatios.OPTION_ONE });
      if (!prev) navigate('/financial-survey')
    }
  }, [])
  
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setFormData({ ...formData!, [e.target.name]: e.target.value });
  // }
    
  const handleFinishSurvey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/financial-survey/summary', { state: { data: formData, prev: true } });
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