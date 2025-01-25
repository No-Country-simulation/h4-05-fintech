import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { IFinancialSurvey, InvestmentExperience } from "@/interfaces/profile.interfaces";
import { Button } from "../ui/button";

const Question4 = () => {
  const [formData, setFormData] = useState<IFinancialSurvey | null>(null);

  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, prev } = location.state as { data: IFinancialSurvey, prev: boolean };
  
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      setFormData({ 
        ...data, 
        investmentExperience: [
          InvestmentExperience.BONOS,
          InvestmentExperience.ACCIONES
        ] 
      });
      if (!prev) navigate('/financial-survey')
    }
  }, [])
  
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setFormData({ ...formData!, [e.target.name]: e.target.value });
  // }
    
  const handleNextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/financial-survey/5', { state: { data: formData, prev: true } });
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

export default Question4;