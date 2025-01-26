import { Route} from "react-router-dom"
import Protected from "../protected/Protected"
import Dashboard from "./Dashboard"
import OnboardingStart from "./OnboardingStart";
import UpdateProfilePage from "./UpdateProfile";

function DashboardRoutes(): JSX.Element {
  return (
    <Route element={<Protected />}>
      <Route path="" element={<Dashboard />} />
      <Route path="onboarding-start" element={<OnboardingStart />} />
      <Route path="update-profile" element={<UpdateProfilePage />} />
    </Route>
  )
}

export default DashboardRoutes;