import { Route, Routes } from "react-router-dom"
import Auth from "./Auth"
import Register from "./Register"
import LoginPage from "./Login"
import Registered from "./Registered"
import VerifyPage from "./Verify"
import Unprotected from "../protected/Unprotetcted"

function AuthRoutes(): JSX.Element {
  return (
    <Routes>
        <Route element={<Unprotected />}>
        <Route path="" element={<Auth />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registered" element={< Registered />} />
        <Route path="verify" element={<VerifyPage />} />
      </Route>
    </Routes>
  )
}

export default AuthRoutes