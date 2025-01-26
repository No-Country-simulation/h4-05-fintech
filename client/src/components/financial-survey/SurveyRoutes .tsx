import { Route } from "react-router-dom"
import FinancialSurveyStart from "./StartPage"
import Question1 from "./Question1"
import Question2 from "./Question2"
import Question3 from "./Question3"
import Question4 from "./Question4"
import Question5 from "./Question5"
import Question6 from "./Question6"
import Question7 from "./Question7"
import Question8 from "./Question8"
import Question9 from "./Question9"
import SummaryPage from "./SummaryPage"
import Protected from "../protected/Protected"

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
      <Route path="summary" element={<SummaryPage />} />
    </Route>
  )
}

export default FinancialSurveyRoutes;