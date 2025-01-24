"use client";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ILogin } from "@/interfaces/auth,interfaces";
import useLogin from "@/hooks/useLogin";
import { ApiErrorMessages, IApiError } from "@/api/api-errors";
import { loginWithApple, loginWithGoogle } from "@/api/auth.routes";
import { OAuth2Button } from "../ui/oauth2-button";

const initilValues: ILogin = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [formData, setFormData] = useState<ILogin>(initilValues);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { setLogin, loading } = useLogin({
    onSuccess: () => navigate('/dashboard'),
    onReject: ({ response }) => {
      const errorMessage: IApiError = response?.data as IApiError;
      switch (errorMessage.message) {
        case ApiErrorMessages.USER_NOT_FOUND:
          setError("Usuario no encontrado");
          break;
        case ApiErrorMessages.INVALID_CREDENTIALS:
          setError("Contraseña inválida");
          break;
        case ApiErrorMessages.USER_BLOCKED:
          setError("Usuario bloqueado")
          break;
        default:
          break
      }
    }
  });

  const handleGoogleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginWithGoogle();
  }
  
  const handleAppleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginWithApple();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogin(formData);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/di0cvbfdb/image/upload/v1736977179/fintech/yzuwrtmgdvqbqjvgplcw.svg"
            alt="Logo"
            width={342}
            height={50}
          />
          <h1 className="text-lightBlue font-medium mt-5 -mb-4 text-base">
            Inicio de Sesión
          </h1>
        </div>
        <Card className=" border-none shadow-none">
          <form onSubmit={handleSubmit} className="space-y-2 mt-[10rem]">
            <div className="rounded-lg space-y-2 bg-[#11668233] p-3">
              <Label htmlFor="email" className="text-[#8BD0EF]">
                Correo electrónico
              </Label>
              <Input
                data-cy="email-input"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingrese su correo electronico"
                className="bg-[#BDE9FF33] text-[#8BD0EF] placeholder:text-[#8BD0EF] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
                required
              />
              <p className="text-xs text-[#8BD0EF] font-medium">
                Mínimo 8 caracteres
              </p>
            </div>
            <div className="rounded-lg space-y-2 bg-[#11668233] p-3">
              <Label htmlFor="password" className="text-[#8BD0EF]">
                Contraseña
              </Label>
              <Input
                data-cy="password-input"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="***********"
                className="bg-[#BDE9FF33] text-[#8BD0EF] placeholder:text-[#8BD0EF] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0 border-none"
                required
              />
              <p className="text-xs text-[#8BD0EF] font-medium">
                Recuperar Contraseña
              </p>
            </div>
            {loading 
              ? <Button type="submit" className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide" disabled={true}>
                  Cargando...
                </Button>
              : <Button 
                  data-cy="login-button"
                  type="submit" 
                  className="w-full h-[52px] bg-[#F9731633] text-[#BDE9FF] text-base font-normal tracking-wide">
                  Iniciar sesión
                </Button>
            }
          </form>
          {error && <p className="text-center text-red-600">{error}</p>}
          <div className="flex justify-center items-center gap-4 mt-5">
            <OAuth2Button
              data-cy="apple-button"
              label="Apple" 
              className="hover:opacity-80 transition-opacity" 
              onClick={handleAppleLogin}
            />
            <OAuth2Button
              data-cy="google-button"
              label="Google"
              className="hover:opacity-80 transition-opacity" 
              onClick={handleGoogleLogin}
            />
          </div>
        </Card>
      </div>
    </main>
  );
};

export default LoginPage;
