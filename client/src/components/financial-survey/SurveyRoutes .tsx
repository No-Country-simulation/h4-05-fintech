import { Route } from "react-router-dom"
import FinancialSurveyStart from "./StartPage"
import SummaryPage from "./SummaryPage"
import Protected from "../protected/Protected"
import Question1 from "./financial-goals/Question1"
import Question2 from "./financial-knowledge/Question2"
import Question3 from "./financial-knowledge/Question3"
import Question4 from "./financial-knowledge/Question4"
import Question5 from "./financial-status/Question5"
import Question6 from "./financial-status/Question6"
import Question7 from "./financial-status/Question7"
import Question8 from "./financial-status/Question10"
import Question9 from "./financial-status/Question9"
import Question10 from "./financial-status/Question10"

function FinancialSurveyRoutes(): JSX.Element {
  return (
    <Route element={<Protected />}>
      <Route path="" element={<FinancialSurveyStart/>} />
      <Route path="1" element={<Question1 />} />
      <Route path="2" element={<Question2 />} />
      <Route path="3" element={<Question3 />} />
      <Route path="4" element={<Question4 />} />
      <Route path="5" element={<Question5 />} />
      <Route path="6" element={<Question6 />} />
      <Route path="7" element={<Question7 />} />
      <Route path="8" element={<Question8 />} />
      <Route path="9" element={<Question9 />} />
      <Route path="9" element={<Question10 />} />
      <Route path="summary" element={<SummaryPage />} />
    </Route>
  )
}

export default FinancialSurveyRoutes;