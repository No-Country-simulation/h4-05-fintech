import { Route } from "react-router-dom"
import AuthPage from "./Auth"
import RegisterPage from "./Register"
import LoginPage from "./Login"
import RegisteredPage from "./Registered"
import VerifyPage from "./Verify"
import Unprotected from "../protected/Unprotetcted"

function AuthRoutes(): JSX.Element {
  return (
    <Route element={<Unprotected />}>
      <Route path="" element={<AuthPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="registered" element={< RegisteredPage />} />
      <Route path="verify" element={<VerifyPage />} />
    </Route>
  )
}

export default AuthRoutes