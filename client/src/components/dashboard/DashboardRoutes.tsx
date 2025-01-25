import { Route, Routes } from "react-router-dom"
import Protected from "../protected/Protected"
import Dashboard from "./Dashboard"

function DashboardRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<Protected />}>
        <Route path="" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default DashboardRoutes;