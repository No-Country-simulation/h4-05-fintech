import { Button } from "../ui/button";
import useProtectedRoutes from "@/hooks/useInterceptors";
import { useState } from "react";
import { 
  ExpensesRatios,
  FinancialEducation, 
  FinancialGoals, 
  IFinancialSurvey, 
  IncomeRanges, 
  IncomeSources, 
  InvestmentKnowledge, 
  InvestmentTimesframes, 
  RiskReactions 
} from "@/interfaces/profile.interfaces";

const defaultValues: IFinancialSurvey = {
  financialGoals: FinancialGoals.JUBILACION,
  investmentKnowledge: InvestmentKnowledge.NO_TENGO_IDEA,
  financialEducation: FinancialEducation.CERTIFICADO_PROFESIONAL,
  investmentExperience: [],
  riskReactions: RiskReactions.VENDERIA_TODO,
  investmentTimeframes: InvestmentTimesframes.CORTO,
  incomeSources: IncomeSources.SALARIO,
  incomeRanges: IncomeRanges.OPTION_ONE,
  expenseRatios: ExpensesRatios.OPTION_ONE,
  investmentPurpose: null,
  age: null,
  occupation: null,
  savingsPlans: null,
  savingsRanges: null
}

const FinancialSurvey = () => {
  const [formData, setFormData] = useState<IFinancialSurvey>(defaultValues);
  const { apiProtectedRoutes } = useProtectedRoutes()

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = apiProtectedRoutes.post(
      '/profile/financial',
      formData,
    )
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
        <Button className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide">
          Completar
        </Button>
      </div>
    </main>
  )
}

export default FinancialSurvey;